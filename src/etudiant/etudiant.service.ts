import { Injectable } from '@nestjs/common';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';
import { Repository } from 'typeorm';
import { Etudiant } from './entities/etudiant.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EtudiantService {
  
  constructor(
    @InjectRepository(Etudiant) private readonly etudiantRepository : Repository<Etudiant>
  ){}

  async create(createEtudiantDto: CreateEtudiantDto): Promise<Etudiant> {
    try{
      const etudiant = this.etudiantRepository.create(createEtudiantDto) 
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
