import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import * as pgSession from 'connect-pg-simple';
import * as pg from 'pg';

import { localsData } from './middlewares/localsData'
import { SessionGuard } from './guards/session.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setViewEngine('ejs');
 
  const pgPool = new pg.Pool({
    host : "localhost",
    port: 5432,
    user: 'jimik',
    password: 'jimik2007life',
    database: 'examen_sort',
  });
  const pgStore =  pgSession(session)
  const store = new pgStore({
    pool: pgPool,
    tableName: 'client_sessions',
    createTableIfMissing: true,
  }) ; 

  app.use(
    session({
      secret: "my-secret-code",
      resave: false,
      saveUninitialized: false,
      cookie: {maxAge : 1 * 1 * 60 * 60 * 1000 }, // j * h * m * s * t //> 1h
      store: store
    })
    );
    
    //app.useGlobalGuards(new SessionGuard())
    app.use(localsData) 

    await app.listen(3000);
  }

bootstrap();
  