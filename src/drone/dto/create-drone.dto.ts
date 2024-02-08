import { CreateMedicationDto } from "src/medication/dto/create-mediaction.dto";

export class CreateDroneDto {
    serialNumber: string;
    model: string;
    weightLimit: number;
    batteryCapacity: string;
    state: string;
    medications: CreateMedicationDto[];
}