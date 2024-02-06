import { Injectable } from '@nestjs/common';
import { CreateFiliereDto } from './dto/create-filiere.dto';
import { UpdateFiliereDto } from './dto/update-filiere.dto';
import { Filiere } from './entities/filiere.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FiliereService {

  constructor(
    @InjectRepository(Filiere) private readonly filiereRepository: Repository<Filiere>,
  ){}

  async create(createFiliereDto: CreateFiliereDto) : Promise<Filiere> {
    try{
      const filiere = this.filiereRepository.create(createFiliereDto)
      return await this.filiereRepository.save(filiere)
    }catch(error){
      return error.message
    }
  }

  findAll() : Promise<Filiere[]> {
    return this.filiereRepository.find()
  }

  findOne(id: number) : Promise<Filiere> {
    return this.filiereRepository.findOneBy({id: id})
  }

  update(id: number, updateFiliereDto: UpdateFiliereDto) {
    return this.filiereRepository.update(id, {...updateFiliereDto})
  }

  async remove(id: number) {
    try{
      return await this.filiereRepository.delete(id)
    }catch(error){
      return error.message
    }
  }
}
