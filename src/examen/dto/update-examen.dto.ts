import { PartialType } from '@nestjs/mapped-types';
import { CreateExamanDto } from './create-examen.dto';

export class UpdateExamanDto extends PartialType(CreateExamanDto) {}
