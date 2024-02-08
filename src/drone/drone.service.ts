import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Drone } from './drone.entity';
import { In, Repository } from 'typeorm';
import { CreateDroneDto } from './dto/create-drone.dto';
import { Medication } from 'src/medication/medication.entity';
import { DroneStateEnum } from './enums/droneState.enum';

@Injectable({})
export class DroneService {
  constructor(
    @InjectRepository(Drone) private droneRepository: Repository<Drone>,
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
  ) {}

  registerDrone(drone: CreateDroneDto) {
    return this.droneRepository.upsert({
      ...drone,
      state: DroneStateEnum.IDLE,
    }, ['serialNumber']);
    //return this.droneRepository.save(newDrone);
  }

  getAllDrones() {
    return this.droneRepository.find({ relations: ['medications'] });
  }

  getDroneById(serialNumber: string) {
    return this.droneRepository.findOne({
      where: { serialNumber },
      relations: ['medications'],
    });
  }

  checkDroneBatteryLevel(serialNumber: string) {
    return this.droneRepository.findOne({
      where: { serialNumber },
      select: ['batteryCapacity'],
    });
  }

  checkLoadedItems(serialNumber: string) {
    return this.droneRepository.findOne({
      where: { serialNumber },
      relations: ['medications'],
      select: ['medications'],
    });
  }

  checkAvailableDronesForLoading() {
    return this.droneRepository.find({
      where: { state: 'IDLE' },
      select: ['serialNumber'],
    });
  }

  async loadDrone(serialNumber: string, medicationsIds: string[]) {
    // Validate the drone
    const drone = await this.getDroneById(serialNumber);
    if (!drone) {
      return new HttpException('Drone not found!', 404);
    }

    // Validate the medications
    const medications = await this.medicationRepository.find({
      where: { code: In(medicationsIds) },
      relations: ['drone'],
    });

    if (medications.length !== medicationsIds.length) {
      return 'Medications not found!';
    }

    // If any of the medications is already loaded, return an error
    const loadedMedications = medications.filter((medication) => medication.drone);
    if (loadedMedications.length > 0) {
      return 'Medications already loaded!';
    }

    // Validate the weight limit
    const totalWeight = medications.reduce(
      (acc, medication) => acc + medication.weight,
      0,
    );

    if (totalWeight > drone.weightLimit) {
      return new BadRequestException('Weight limit exceeded!');
    }

    // Validate the battery level
    const batteryLevel = (await this.checkDroneBatteryLevel(serialNumber)).batteryCapacity;

    if (batteryLevel < 25) {
      return 'Battery level too low!';
    }

    // Validate the state of the drone, it should be IDLE
    if (drone.state !== DroneStateEnum.IDLE) {
      return 'Drone is not in IDLE state!';
    }

    // Change the state of the drone
    this.droneRepository.update(drone.serialNumber, {
      state: DroneStateEnum.LOADING,
    });

    // Load the medications
    medicationsIds.map((medicationId) => {
      this.medicationRepository.update(medicationId, {
        drone: drone,
      });
      return medicationId;
    });

    // Change the state of the drone
    this.droneRepository.update(drone.serialNumber, {
      state: DroneStateEnum.LOADED,
    });

    return 'Drone loaded successfully!';
  }
}
