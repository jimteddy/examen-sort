import { Injectable } from '@nestjs/common';
import { CreateMatterDto } from './dto/create-matter.dto';
import { UpdateMatterDto } from './dto/update-matter.dto';
import { Repository } from 'typeorm';
import { Matter } from './entities/matter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/client/entities/client.entity';
import { EtudiantService } from 'src/etudiant/etudiant.service';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class MatterService {

  constructor(
    @InjectRepository(Matter) private readonly matterRepository : Repository<Matter>,
    private readonly serviceService : ClientService,
  ){}

  async create(client: Client, createMatterDto: CreateMatterDto) : Promise<Matter> {
    try{
      const clien = await this.serviceService.findOne(client.id)
      const matter = this.matterRepository.create(createMatterDto)
      matter.client = clien
      return await this.matterRepository.save(matter)
    }catch(error){
      return error.message
    }
  }

  async findAll(client: Client) : Promise<Matter[]> {
    return await this.matterRepository.find({
      where: {client: {id: client.id}}
    })
  }

  async findOne(client: Client, id: number): Promise<Matter> {
    return await this.matterRepository.findOne({ 
      where : {id: id, client: {id: client.id}}
    })
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
