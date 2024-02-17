import { Injectable } from '@nestjs/common';
import { ExamenService } from './examen/examen.service';
import { Client } from './client/entities/client.entity';
import { ClasseService } from './classe/classe.service';
import { SalleService } from './salle/salle.service';
import { Etudiant } from './etudiant/entities/etudiant.entity';
import { EtudiantService } from './etudiant/etudiant.service';

@Injectable()
export class AppService {
  constructor(
    private readonly examenService : ExamenService,
    private readonly classeService : ClasseService,
    private readonly salleService : SalleService,
    //private readonly etudiantService : EtudiantService,
  ){}

  async getExamenAll(client : Client){
    return await this.examenService.findAll(client) 
  }

  async countExamenAll(client : Client){
    return await this.examenService.countAll(client) 
  }

  async getClasseAll(client : Client){
    return await this.classeService.findAll(client)
  }

  async countClasseAll(client : Client){
    return await this.classeService.countAll(client)
  }

  async getSalleAll(client : Client){
    return await this.salleService.findAll(client)
  }
  
  async countSalleAll(client : Client){
    return await this.salleService.countAll(client)
  }
  
}
