import { IsNotEmpty } from "class-validator";

export class CreateFiliereDto {

  @IsNotEmpty()
  readonly libelle : string;  
  
}
