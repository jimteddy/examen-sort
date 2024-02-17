import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { NoteModule } from './note/note.module';
import { Note } from './note/entities/note.entity';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';
import { MulterConfigService } from './pipes/multer.config.service';
import { SessionCheckMiddleware } from './middlewares/session-sheck.middleware';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: 'jimik',
      password: 'jimik2007life',
      database: "examen_sort",
      entities: [Client, Examen, Classe, Etudiant, Filiere, Matter, Salle, Note],
      //entities: ['/entities/*.entity{.ts}'],
      synchronize: true,
    }),
    MulterModule.register({}),
    ClientModule,
    SalleModule,
    ClasseModule,
    EtudiantModule,
    MatterModule,
    ExamenModule,
    FiliereModule,
    NoteModule,
    //AuthModule,  
  
    ],
 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionCheckMiddleware).forRoutes({path: "*", method: RequestMethod.ALL })
  }
}

