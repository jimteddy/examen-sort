import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClasseDto } from './dto/create-classe.dto';
import { UpdateClasseDto } from './dto/update-classe.dto';
import { Repository } from 'typeorm';
import { Classe } from './entities/classe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/client/entities/client.entity';

@Injectable()
export class ClasseService {

  constructor(
    @InjectRepository(Classe) private readonly classeRepository: Repository<Classe>,
  ) { }

  async create(client: Client, createClasseDto: CreateClasseDto): Promise<Classe> {
    try {
      const classe = this.classeRepository.create(createClasseDto)
      classe.client = client
      return await this.classeRepository.save(classe)
    } catch (error) {
      return error.message
    }
  }

  async findAll(client: Client): Promise<Classe[]> {
    const classes = await this.classeRepository.find({
      where: { client: client },
      order: { createAt: 'DESC' },
      relations: {
        client: true
      }
    })
    return classes
  }

  async countAll(client: Client) {
    try {
      const responses = await this.classeRepository.findAndCount({
        where: { client: { id: client.id } },
        relations: { 
          client: true,
          etudiants: true , 
        },
        select : {
          id: true,
          name:  true,
          periode: true,
          etudiants : {
            id: true
          },
          client: {
            id: true
          }
        }
      })
      let effectifTotal = 0
      responses[0].forEach((classe) => {
       effectifTotal += classe.etudiants.length
      })
      return { nbrClasses: responses[1], effectifTotal }
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  findOne(id: number) {
    return this.classeRepository.findOne({ where: { id: id } })
  }

  async update(id: number, updateClasseDto: UpdateClasseDto) {
    return await this.classeRepository.update(id, { ...updateClasseDto })
  }

  async remove(id: number) {
    try {
      return await this.classeRepository.delete(id)
    } catch (error) {
      return error.message
    }
  }

  async getClasseEtudiant(id: number) {
    const classe: Classe = await this.classeRepository.findOne({
      where: { id: id },
      relations: {
        etudiants: true,
      },
    })
    return { classe }
  }

}
