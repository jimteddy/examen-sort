import { Module } from '@nestjs/common';
import { ClasseService } from './classe.service';
import { ClasseController } from './classe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classe } from './entities/classe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classe]), ],
  controllers: [ClasseController],
  providers: [ClasseService],
  exports: [ClasseService, ]
})
export class ClasseModule {}
