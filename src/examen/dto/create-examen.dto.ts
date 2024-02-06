import {IsNotEmpty, IsDate, IsString} from 'class-validator'

export class CreateExamanDto {

  @IsNotEmpty()
  readonly libelle : string;    

  @IsString()
  readonly description : string;    

  readonly dateDebut : Date;    

  readonly dateFin : Date;  
}
