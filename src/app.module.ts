import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientModule } from './client/client.module';
import { Client } from './client/entities/client.entity';
import { SalleModule } from './salle/salle.module';
import { ClasseModule } from './classe/classe.module';
import { EtudiantModule } from './etudiant/etudiant.module';
import { MatterModule } from './matter/matter.module';
import { ExamenModule } from './examen/examen.module';
import { FiliereModule } from './filiere/filiere.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Examen } from './examen/entities/examen.entity';
import { Classe } from './classe/entities/classe.entity';
import { Etudiant } from './etudiant/entities/etudiant.entity';
import { Filiere } from './filiere/entities/filiere.entity';
import { Matter } from './matter/entities/matter.entity';
import { Salle } from './salle/entities/salle.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: 'jimik',
      password: 'jimik2007life',
      database: "examen_sort",
      entities: [Client, Examen, Classe, Etudiant, Filiere, Matter, Salle],
      //entities: ['**/entities/*.entity{.ts}'],
      synchronize: true,
    }),
    ClientModule,
    SalleModule,
    ClasseModule,
    EtudiantModule,
    MatterModule,
    ExamenModule,
    FiliereModule,
    //AuthModule,   
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

