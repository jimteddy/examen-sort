import { Injectable } from '@nestjs/common';
import { ExamenService } from './examen/examen.service';
import { Client } from './client/entities/client.entity';
import { ClasseService } from './classe/classe.service';

@Injectable()
export class AppService {
  constructor(
    private readonly examenService : ExamenService,
    private readonly classeService : ClasseService,
  ){}

  async getExamenAll(client : Client){
    return await this.examenService.findAll(client) 
  }

  async getClasseAll(client : Client){
    return await this.classeService.findAll(client)
  }
}
