import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalleDto } from './dto/create-salle.dto';
import { UpdateSalleDto } from './dto/update-salle.dto';
import { Repository } from 'typeorm';
import { Salle } from './entities/salle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/client/entities/client.entity';


@Injectable()
export class SalleService {

  constructor(
    @InjectRepository(Salle) private readonly salleRepository: Repository<Salle>
  ) { }

  async create(createSalleDto: CreateSalleDto, client: Client): Promise<Salle> {
    try {
      const salle = this.salleRepository.create({ ...createSalleDto })
      salle.client = client
      return await this.salleRepository.save(salle)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAll(client: Client): Promise<Salle[]> {
    return await this.salleRepository.find({
      where: { client: client }
    })
  }

  async countAll(client: Client) {
    try {
      const responses = await this.salleRepository.findAndCount({
        where: { client: { id: client.id } }
      })
      const nbrSalle = responses[1]
      let capacityTotal = 0
      responses[0].forEach((salle) => {
        capacityTotal += salle.capacity
      })
      return { nbrSalle, capacityTotal }
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  findOne(id: number) {
    return this.salleRepository.findOne({ where: { id: id } })
  }

  update(id: number, updateSalleDto: UpdateSalleDto) {
    return this.salleRepository.update(id, { ...updateSalleDto });
  }

  async remove(id: number) {
    try {
      return await this.salleRepository.delete(id)
    } catch (error) {
      return `This action removes a #${id} salle`;
    }
  }
}
