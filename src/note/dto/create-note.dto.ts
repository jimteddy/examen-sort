import { IsNotEmpty, IsNumber } from 'class-validator'


export class CreateNoteDto {

  @IsNotEmpty({message : "Entrer une note"})
  readonly note : number;
  
  @IsNotEmpty({message : "La note doit avoir une matière"})
  readonly matter : number;

}
