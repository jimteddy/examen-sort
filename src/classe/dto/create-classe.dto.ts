import { IsNotEmpty, Length} from 'class-validator'

export class CreateClasseDto {
  @IsNotEmpty()
  @Length(2, 100)
  readonly name : string;    
  
  @IsNotEmpty()
  @Length(8, 10)
  readonly periode : string;   
}
