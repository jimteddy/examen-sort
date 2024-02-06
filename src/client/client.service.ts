import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { log } from 'console';
import { LoginDto } from './dto/login.dto';
//import * as bcrypt from 'bcrypt'


@Injectable()
export class ClientService {


  constructor(
    @InjectRepository(Client) private readonly clientRepository : Repository<Client>,
  ){}

  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client';
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }

  async postSignup(signupDto : SignupDto): Promise<string>{
    try{
      const {password} = signupDto
      //const hash = await bcrypt.hash(password, 10)
      const client = this.clientRepository.create({...signupDto})
      await this.clientRepository.save(client)
      return "Client crée avec succès"
    }catch(error){
      throw new ConflictException(error.message)
    }
  }

  async postLogin(loginDto: LoginDto) {
    try{
      const {password, email} = loginDto;
      const client = await this.clientRepository.findOne({where : {email : email}})
      if (!client) throw new NotFoundException('Client non trouvé')
      //const pwdTest = await bcrypt.compare(password, client.password)
      const pwdTest = password === client.password
      if(!pwdTest) throw new UnauthorizedException("Mot de passe invalide")
      return client
    }catch(error){
      return error.message
    }
  }

}
