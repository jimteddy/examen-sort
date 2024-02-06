import {IsNumber, IsNotEmpty, Length} from 'class-validator'

export class CreateSalleDto {

  @IsNotEmpty()
  @Length(1, 100)
  readonly name : string;    

  @IsNotEmpty()
  @IsNumber()
  readonly capacity : number;

  readonly favorite : boolean;  
}
