import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Drone } from "./drone.entity";
import { Repository } from "typeorm";
import { CreateDroneDto } from "./dto/create-drone.dto";

@Injectable({})
export class DroneService {
    constructor(@InjectRepository(Drone) private droneRepository : Repository<Drone>){}

    registerDrone(drone: CreateDroneDto) {
        const newDrone = this.droneRepository.create(drone);
        return this.droneRepository.save(newDrone);
    }

    getAllDrones() {
        return this.droneRepository.find({relations: ['medications']});
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