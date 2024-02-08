import { Module } from '@nestjs/common';
import { DroneController } from './drone.controller';
import { DroneService } from './drone.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drone } from './drone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drone])],
  controllers: [DroneController],
  providers: [DroneService],
})
export class DroneModule {}
