import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamanDto } from './dto/create-examen.dto';
import { UpdateExamanDto } from './dto/update-examen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Examen } from './entities/examen.entity';
import { Repository } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
import { log } from 'console';

@Injectable()
export class ExamenService {

  constructor(
    @InjectRepository(Examen) private readonly examenRepository : Repository<Examen>,
  ){}

  async create(createExamanDto: CreateExamanDto, client: Client){
    try{
      const examen = this.examenRepository.create(createExamanDto)
      examen.client = client
      const newExamen = await this.examenRepository.save(examen)
      return newExamen
    }catch(error){
      return error.message
    }
  }

  async findAll(client : Client) : Promise<Examen[]> {
    try{
      const examens = await this.examenRepository.find({
        where: {client: client},
        order: {createAt: 'DESC'},
        relations : {
          client: true,
        }, })
        return examens
    }catch(error){
      throw new BadRequestException("Pas d'examen trouvé")
    }
  }

  async countAll(client: Client) : Promise<number> {
    try {
      return await this.examenRepository.countBy({client: { id: client.id}})
    } catch (error) {
      return 0
    }
  }

  async findOne(id: number) : Promise<Examen> {
    try{
      const examen = await this.examenRepository.findOne({ 
        where : {id: id},
        relations : {client: true}
      })
      if(!examen) throw new NotFoundException('Examen non trouvé')
      return examen
    }catch(error){
      throw new BadRequestException(error.message)
    }
  }

  update(id: number, updateExamanDto: UpdateExamanDto) {
    return this.examenRepository.update(id, {...updateExamanDto})
  }

  async remove(id: number) {
    try{
      return await this.examenRepository.delete(id)
    }catch(error){
      return error.message
    }
  }
}
