import { IsUrl, Matches } from 'class-validator';

export class CreateMedicationDto {
  @Matches(/^[A-Z0-9_]+$/)
  code: string;

  @Matches(/^[a-zA-Z0-9-_]+$/)
  name: string;
  weight: number;

  @IsUrl()
  imageURL: string;
}
