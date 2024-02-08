import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DroneService } from './drone.service';
import { CreateDroneDto } from './dto/create-drone.dto';
import { CreateMedicationDto } from 'src/medication/dto/create-mediaction.dto';
import { LoadDroneDto } from './dto/load-drone.dto';

@Controller('drone')
export class DroneController {
  constructor(private dronService: DroneService) {}

  // Registering a Drone
  @Post('register-drone')
  registerDrone(@Body() drone: CreateDroneDto) {
    return this.dronService.registerDrone(drone);
  }

  // Getting all drones
  @Get('get-all-drones')
  getAllDrones() {
    return this.dronService.getAllDrones();
  }

  // Loading a Drone with medication items
  @Put('load-drone')
  loadDrone(@Body() loadedDrone: LoadDroneDto) {
    const { serialNumber, medicationsIds } = loadedDrone;
    const idsToLoad = medicationsIds.map((medication) => medication.code);
    return this.dronService.loadDrone(serialNumber, idsToLoad);
  }

  // Checking loaded medication items loaded for a given drone
  @Get('check-loaded-items/:serialNumber')
  async checkLoadedItems(@Param('serialNumber') serialNumber: string) {
    return this.dronService.checkLoadedItems(serialNumber).then((drone) => {
      return drone.medications;
    });
  }

  // Checking available drones for loading
  @Get('check-available-drones')
  checkAvailableDrones() {
    return this.dronService.checkAvailableDronesForLoading();
  }

  // Checking drone battery level for a given drone
  @Get('check-battery-level/:serialNumber')
  checkBatteryLevel(@Param('serialNumber') serialNumber: string) {
    return this.dronService.checkDroneBatteryLevel(serialNumber);
  }
}
