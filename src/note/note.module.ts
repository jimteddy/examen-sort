import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { EtudiantModule } from 'src/etudiant/etudiant.module';
import { ClasseModule } from 'src/classe/classe.module';
import { MatterModule } from 'src/matter/matter.module';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), ClasseModule, MatterModule],
  controllers: [NoteController],
  providers: [NoteService],
  exports: [NoteService]
})
export class NoteModule {}
