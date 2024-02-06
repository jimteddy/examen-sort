import { Injectable } from '@nestjs/common';
import { CreateClasseDto } from './dto/create-classe.dto';
import { UpdateClasseDto } from './dto/update-classe.dto';
import { Repository } from 'typeorm';
import { Classe } from './entities/classe.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClasseService {

  constructor(
    @InjectRepository(Classe) private readonly classeRepository: Repository<Classe>,
  ){}

  async create(createClasseDto: CreateClasseDto) : Promise<Classe> {
    try{
      const classe = this.classeRepository.create(createClasseDto)
      return await this.classeRepository.save(classe)
    }catch(error){
      return error.message
    }
  }

  findAll() : Promise<Classe[]> {
    return this.classeRepository.find()
  }

  findOne(id: number) {
    return this.classeRepository.findOne({where : {id : id}})
  }

  async update(id: number, updateClasseDto: UpdateClasseDto) {
    return await this.classeRepository.update(id, {...updateClasseDto})
  }

  async remove(id: number) {
    try{
      return await this.classeRepository.delete(id)
    }catch(error){
      return error.message
    }
  }
}
