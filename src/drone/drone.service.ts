import { Injectable } from "@nestjs/common";

@Injectable({})
export class DroneService {
    constructor() {}

    registerDrone() {
        return "Drone registered successfully!";
    }

    loadDrone() {
        return "Drone loaded successfully!";
    }

    checkLoadedItems() {
        return "Items loaded successfully!";
    }

    checkAvailableDrones() {
        return "Drones available!";
    }

    checkBatteryLevel() {
        return "Battery level checked!";
    }
}