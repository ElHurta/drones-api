import { Body, Controller, Get, Post } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { CreateMedicationDto } from './dto/create-mediaction.dto';

@Controller('medication')
export class MedicationController {
  constructor(private medicationService: MedicationService) {}

  // Registering a Medication
  @Post('register-medication')
  registerMedication(@Body() medication: CreateMedicationDto) {
    return this.medicationService.registerMedication(medication);
  }

  // Getting all medication
  @Get('get-all-medication')
  getAllMedication() {
    return this.medicationService.getAllMedication();
  }
}
