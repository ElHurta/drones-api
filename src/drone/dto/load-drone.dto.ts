import { CreateMedicationDto } from "src/medication/dto/create-mediaction.dto";

export class LoadDroneDto {
    serialNumber: string;
    medicationsToLoad: CreateMedicationDto[];
}