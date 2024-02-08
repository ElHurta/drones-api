import { Module } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { MedicationController } from './medication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from './medication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medication])],
  providers: [MedicationService],
  controllers: [MedicationController],
})
export class MedicationModule {}
