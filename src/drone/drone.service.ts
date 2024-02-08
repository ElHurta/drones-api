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
    const newDrone = this.droneRepository.create(drone);
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

  async loadDrone(serialNumber: string, medicationsToLoad: CreateMedicationDto[]) {
    // Validate the drone
    const drone = await this.getDroneById(serialNumber);
    if (!drone) {
        return 'Drone not found!';
    }

    // Validate the medications
    const medications = await this.medicationRepository.findBy({
            code: In(medicationsToLoad.map((medication) => medication.code)),
    });

    if (medications.length !== medicationsToLoad.length) {
        return 'Medication not found!';
    }


    // Validate the weight limit
    const totalWeight = medicationsToLoad.reduce(
        (total, medication) => total + medication.weight,
        0,
    );

    if (totalWeight > drone.weightLimit) {
        return 'Weight limit exceeded!';
    }
    
    // Load the medications
    const medicationsToSave = medicationsToLoad.map((medication) => {
        this.medicationRepository.update(medication.code, {
            drone: drone,
        });
        return medication;
    });
  }

  checkLoadedItems() {
    return 'Items loaded successfully!';
  }

  checkAvailableDrones() {
    return 'Drones available!';
  }

  checkBatteryLevel() {
    return 'Battery level checked!';
  }
}
