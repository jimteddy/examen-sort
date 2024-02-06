import { Module } from '@nestjs/common';
import { CompteService } from './compte.service';
import { CompteController } from './compte.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compte } from './entities/compte.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Compte])],
  controllers: [CompteController],
  providers: [CompteService],
})
export class CompteModule {}
