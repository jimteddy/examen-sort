import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ExamenService } from './examen/examen.service';

@Controller()
export class AppController {

  constructor(
    private readonly appService : AppService,
    private readonly examenService : ExamenService,
  ){}

  @Get('/')
  @Render('home')
  async getHome(){
    const examens = await this.examenService.findAll() 
    return { examens }
  }

 
}
