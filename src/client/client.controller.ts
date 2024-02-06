import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Redirect, UseInterceptors, ClassSerializerInterceptor, Session } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get("/signup")
  @Render('client/signup')
  getSignup(){ }

  @Post("/signup")
  @Redirect('/client/login')
  async postSignup(@Body() body: SignupDto){
    return await this.clientService.postSignup(body)
  }
  
  @Get("/login")
  @Render('client/login')
  getLogin(){}
  
  @UseInterceptors(ClassSerializerInterceptor)
  @Post("/login")
  @Redirect('/')
  async postLogin(@Body() body: LoginDto, @Session() session: Record<string, any>){
    const client = await this.clientService.postLogin(body)
    session.client = client
    session.connected = true
  }

  @Post("/logout")
  @Redirect('login')
  postLogout(@Session() session: Record<string, any>){
    session.destroy(error => {});
  }


  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
