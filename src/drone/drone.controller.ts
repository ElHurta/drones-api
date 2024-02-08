import { Controller, Get, Post, Put } from "@nestjs/common";
import { DroneService } from "./drone.service";

@Controller('drone')
export class DroneController {
    constructor(private dronService : DroneService) {}

    // Registering a Drone
    @Post('register-drone')
    registerDrone() {
        return this.dronService.registerDrone();
    }

    // Loading a Drone with medication items
    @Put('load-drone')
    loadDrone() {
        return this.dronService.loadDrone();
    }
    
    // Checking loaded medication items loaded for a given drone
    @Get('check-loaded-items')
    checkLoadedItems() {
        return this.dronService.checkLoadedItems();
    }

    // Checking available drones for loading
    @Get('check-available-drones')
    checkAvailableDrones() {
        return this.dronService.checkAvailableDrones();
    }

    // Checking drone battery level for a given drone
    @Get('check-battery-level')
    checkBatteryLevel() {
        return this.dronService.checkBatteryLevel();
    }
}