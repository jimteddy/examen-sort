import { Module } from '@nestjs/common';
import { FiliereService } from './filiere.service';
import { FiliereController } from './filiere.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filiere } from './entities/filiere.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Filiere])],
  controllers: [FiliereController],
  providers: [FiliereService],
})
export class FiliereModule {}
