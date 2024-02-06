import { IsNotEmpty , Length} from 'class-validator'

export class CreateMatterDto {

  @IsNotEmpty()
  @Length(2, 100)
  readonly libelle : string;

  readonly coefficient : number;

}
