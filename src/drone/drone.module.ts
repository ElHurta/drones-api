import { Module } from "@nestjs/common";
import { DroneController } from "./drone.controller";
import { DroneService } from "./drone.service";

@Module({
  imports: [],
  controllers: [DroneController],
  providers: [DroneService],
})
export class DroneModule {}