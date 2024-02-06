import { Injectable } from '@nestjs/common';
import { CreateSalleDto } from './dto/create-salle.dto';
import { UpdateSalleDto } from './dto/update-salle.dto';
import { Repository } from 'typeorm';
import { Salle } from './entities/salle.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SalleService {

  constructor(
    @InjectRepository(Salle) private readonly salleRepository: Repository<Salle>
  ){}

  async create(createSalleDto: CreateSalleDto): Promise<Salle> {
    try{
      const salle = this.salleRepository.create({...createSalleDto})
      return await this.salleRepository.save(salle)
    }catch(error){
      return error.message
    }
  }

  findAll(): Promise<Salle[]> {
    return this.salleRepository.find()
  }

  findOne(id: number) {
    return this.salleRepository.findOne({ where : {id: id}})
  }

  update(id: number, updateSalleDto: UpdateSalleDto) {
    return this.salleRepository.update(id, {...updateSalleDto});
  }

  async remove(id: number) {
    try{
      return await this.salleRepository.delete(id)
    }catch(error){
      return `This action removes a #${id} salle`;
    }
  }
}
