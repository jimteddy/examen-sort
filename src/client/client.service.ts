import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { log } from 'console';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'


@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client) private readonly clientRepository : Repository<Client>,
  ){}

  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client';
  }

  async findOne(id: number) : Promise<Client> {
    return await this.clientRepository.findOne({
      where: {id: id}
    });
  }
  async findOneByName(username: string) : Promise<Client> {
    return await this.clientRepository.findOne({
      where: {username: username}
    });
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }

  async postSignup(signupDto : SignupDto): Promise<Client>{
    try{
      const {password, username, email} = signupDto
      const hash = await bcrypt.hash(password, 10)
      const client = this.clientRepository.create({password: hash, username, email})
      return this.clientRepository.save(client)
    }catch(error){
      throw new ConflictException(error.message)
    }
  }

  async postLogin(loginDto: LoginDto) : Promise<Client> {
    try{
      const {password, email} = loginDto;
      const client = await this.clientRepository.findOne({where : {email : email}})
      if (!client) throw new NotFoundException('Client non trouvé')
      const pwdTest = await bcrypt.compare(password, client.password)
      if(!pwdTest) throw new UnauthorizedException("Mot de passe invalide")
      return client
    }catch(error){
      throw new UnauthorizedException(error.message)
    }
  }

}
