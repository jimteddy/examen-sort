import { Injectable } from '@nestjs/common';
import { CreateCompteDto } from './dto/create-compte.dto';
import { UpdateCompteDto } from './dto/update-compte.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Compte } from './entities/compte.entity';
import { Repository } from 'typeorm';
import { log } from 'console';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CompteService {

  constructor(
    @InjectRepository(Compte)
    private compteRepository : Repository<Compte>,

  ){}

  create(createCompteDto: CreateCompteDto) {
    return this.compteRepository.create({...createCompteDto})
  }

  findAll() {
    return this.compteRepository.find();
  }

  findOne(id: number) {
    return this.compteRepository.findOneBy({id})
  }

  update(id: number, updateCompteDto: UpdateCompteDto) {
    return this.compteRepository.update({id}, {...updateCompteDto})
  }

  remove(id: number) {
    return this.compteRepository.delete(id)
  }
}
