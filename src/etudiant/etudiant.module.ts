import { Module } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { EtudiantController } from './etudiant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etudiant } from './entities/etudiant.entity';
import { ClasseModule } from 'src/classe/classe.module';
import { NoteModule } from 'src/note/note.module';
import { MatterModule } from 'src/matter/matter.module';

@Module({
  imports: [TypeOrmModule.forFeature([Etudiant]), ClasseModule, NoteModule, MatterModule, ],
  controllers: [EtudiantController],
  providers: [EtudiantService],
  exports : [EtudiantService]
})
export class EtudiantModule {}
