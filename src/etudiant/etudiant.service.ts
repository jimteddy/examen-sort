import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';
import { Repository } from 'typeorm';
import { Etudiant } from './entities/etudiant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClasseService } from 'src/classe/classe.service';
import { Client } from 'src/client/entities/client.entity';
//import * as eventEmitter from ''

@Injectable()
export class EtudiantService {
  
  constructor(
    @InjectRepository(Etudiant) private readonly etudiantRepository : Repository<Etudiant>,
    private readonly classeService : ClasseService
  ){}

  async create(createEtudiantDto: CreateEtudiantDto, client: Client): Promise<Etudiant> {
    try{
      const {noms, prenoms, sexe, lieuNaissance, dateNaissance, classeId} = createEtudiantDto

      const classe = await this.classeService.findOne(classeId)
      if(!classe) throw new UnauthorizedException()

      const etudiant: Etudiant = this.etudiantRepository.create({
        noms, prenoms, sexe, dateNaissance, lieuNaissance, classe, client
      }) 
      return await this.etudiantRepository.save(etudiant)
    }catch(error){
      return error
    }
  }

  findAll(): Promise<Etudiant[]> {
    return this.etudiantRepository.find()
  }

  findOne(id: number): Promise<Etudiant> {
    return this.etudiantRepository.findOne({ where : { id: id}})
  }

  async calMoyen(id: number): Promise<number> {
    const etudiant = await this.findOne(id)
    let nbrMatter = etudiant.notes.length
    let noteEtudiant = 0 
    etudiant.notes.forEach((note) => {
      noteEtudiant += note.note
    })
    return noteEtudiant / nbrMatter
  }

  update(id: number, updateEtudiantDto: UpdateEtudiantDto) {
    return this.etudiantRepository.update(id, {...updateEtudiantDto})
  }

  async remove(id: number) {
    try{
      return await this.etudiantRepository.delete(id)
    }catch(error){
      return error.message
    }
  }
}
