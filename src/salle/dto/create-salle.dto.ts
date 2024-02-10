import {IsNumber, IsNotEmpty, Length, isNumber} from 'class-validator'

export class CreateSalleDto {

  @IsNotEmpty({message : "Entrer le nom de la salle"})
  @Length(1, 100)
  readonly name : string;    

  readonly capacity : number;

}
