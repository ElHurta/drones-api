import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medication } from './medication.entity';
import { Repository } from 'typeorm';
import { CreateMedicationDto } from './dto/create-mediaction.dto';

@Injectable({})
export class MedicationService {
  constructor(
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
  ) {}

  registerMedication(medication: CreateMedicationDto) {
    const newMedication = this.medicationRepository.create(medication);
    return this.medicationRepository.save(newMedication);
  }

  getAllMedication() {
    return this.medicationRepository.find({
      relations: ['drone'],
    });
  }
}
