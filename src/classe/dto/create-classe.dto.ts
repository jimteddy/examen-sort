import { IsNotEmpty, Length} from 'class-validator'

export class CreateClasseDto {
  @IsNotEmpty()
  @Length(2, 100)
  readonly name : string;    
  
  readonly annee : string;   
}
