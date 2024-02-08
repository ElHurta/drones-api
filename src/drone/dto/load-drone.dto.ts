import { IsArray } from "class-validator";
import { CreateMedicationDto } from "src/medication/dto/create-mediaction.dto";

export class LoadDroneDto {
    serialNumber: string;

    @IsArray()
    medicationsIds: [{
        code: string;
    }];
}