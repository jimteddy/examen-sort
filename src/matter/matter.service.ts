import { Injectable } from '@nestjs/common';
import { CreateMatterDto } from './dto/create-matter.dto';
import { UpdateMatterDto } from './dto/update-matter.dto';
import { Repository } from 'typeorm';
import { Matter } from './entities/matter.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MatterService {

  constructor(
    @InjectRepository(Matter) private readonly matterRepository : Repository<Matter>,
  ){}

  async create(createMatterDto: CreateMatterDto) : Promise<Matter> {
    try{
      const matter = this.matterRepository.create(createMatterDto)
      return await this.matterRepository.save(matter)
    }catch(error){
      return error.message
    }
  }

  async findAll() : Promise<Matter[]> {
    return await this.matterRepository.find()
  }

  async findOne(id: number): Promise<Matter> {
    return await this.matterRepository.findOne({ where : {id: id}})
  }

  update(id: number, updateMatterDto: UpdateMatterDto) {
    return this.matterRepository.update(id, {...updateMatterDto})
  }

  async remove(id: number) {
    try{
      return await this.matterRepository.delete(id)
    }catch(error){
      return error.message
    }
  }
}
