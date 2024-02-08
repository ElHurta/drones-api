import { Module } from '@nestjs/common';
import { DroneController } from './drone.controller';
import { DroneService } from './drone.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drone } from './drone.entity';
import { Medication } from 'src/medication/medication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drone, Medication])],
  controllers: [DroneController],
  providers: [DroneService],
})
export class DroneModule {}
