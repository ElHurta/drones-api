import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Drone } from './drone.entity';
import { In, Repository } from 'typeorm';
import { CreateDroneDto } from './dto/create-drone.dto';
import { CreateMedicationDto } from 'src/medication/dto/create-mediaction.dto';
import { Medication } from 'src/medication/medication.entity';

@Injectable({})
export class DroneService {
  constructor(
    @InjectRepository(Drone) private droneRepository: Repository<Drone>,
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
  ) {}

  registerDrone(drone: CreateDroneDto) {
    const newDrone = this.droneRepository.create({
      ...drone,
      state: 'IDLE',
      medications: [],
    });
    return this.droneRepository.save(newDrone);
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

  async loadDrone(serialNumber: string, medicationsIds: string[]) {
    // Validate the drone
    const drone = await this.getDroneById(serialNumber);
    if (!drone) {
      return 'Drone not found!';
    }

    // Validate the medications
    const medications = await this.medicationRepository.find({
      where: { code: In(medicationsIds) },
    });

    if (medications.length !== medicationsIds.length) {
      return 'Medications not found!';
    }

    // Validate the weight limit
    const totalWeight = medications.reduce(
      (acc, medication) => acc + medication.weight,
      0,
    );

    if (totalWeight > drone.weightLimit) {
      return 'Weight limit exceeded!';
    }

    // Load the medications
    return medicationsIds.map((medicationId) => {
        this.medicationRepository.update(medicationId, {
          drone: drone,
        });
        return medicationId;
    });
  }

  checkLoadedItems(serialNumber: string) {
    return this.droneRepository.findOne({
      where: { serialNumber },
      relations: ['medications'],
      select: ['medications'],
    });
  }

  checkAvailableDrones() {
    return 'Drones available!';
  }

  checkBatteryLevel() {
    return 'Battery level checked!';
  }
}
