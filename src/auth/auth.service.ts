import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ClientService } from 'src/client/client.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    //private readonly clientService : ClientService,
    //private readonly jwtService : JwtService,

  ){}

  async signIn(username: string, pass: string): Promise<any> {
    //const client = await this.clientService.findOneByName(username);
    //if (client.password !== pass) throw new UnauthorizedException();
    
    //const { password, ...result } = client;
    // TODO: Generate a JWT and return it here
    // instead of the client object
    //return result;
  }

}
