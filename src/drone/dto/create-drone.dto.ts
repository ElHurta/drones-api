import { IsEnum, IsNumber, IsString, Length, Max, Min } from "class-validator";
import { ModelEnum } from "../enums/model.enum";

export class CreateDroneDto {
    @IsString()
    @Length(1, 100)
    serialNumber: string;

    @IsEnum(ModelEnum)
    model: string;

    @IsNumber()
    @Max(500)
    @Min(1)
    weightLimit: number;

    @IsNumber()
    batteryCapacity: number;

    state: string;
}