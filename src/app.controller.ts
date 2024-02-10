import { Controller, Get, Render, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { ExamenService } from './examen/examen.service';
import { Client } from './client/entities/client.entity';

@Controller()
export class AppController {

  constructor(
    private readonly appService : AppService,
  ){}

  @Get('/')
  @Render('home')
  async getHome(@Session() session: Record<string, any>){
    const currentClient: Client = session.client
    const examens = await this.appService.getExamenAll(currentClient)
    const classes = await this.appService.getClasseAll(currentClient)
    return { examens , classes }
  }

}
