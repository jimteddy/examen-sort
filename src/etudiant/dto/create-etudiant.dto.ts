import { IsNotEmpty, IsNumber, Length} from 'class-validator'

export class CreateEtudiantDto {

  @IsNotEmpty()
  @Length(1, 150)
  readonly noms : string;
  
  @IsNotEmpty()
  @Length(1, 150)
  readonly prenoms : string;

  readonly sexe : string;

  readonly moyenne : number;
}
