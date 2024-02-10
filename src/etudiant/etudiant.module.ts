import { Module } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { EtudiantController } from './etudiant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etudiant } from './entities/etudiant.entity';
import { ClasseModule } from 'src/classe/classe.module';

@Module({
  imports: [TypeOrmModule.forFeature([Etudiant]), ClasseModule],
  controllers: [EtudiantController],
  providers: [EtudiantService],
})
export class EtudiantModule {}
