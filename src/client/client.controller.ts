import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Redirect, UseInterceptors, ClassSerializerInterceptor, Session, Res, ParseIntPipe, HttpCode } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

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
  async postLogin(@Body() body: LoginDto, @Session() session: Record<string, any>, @Res() res: Response){
    try{
      await this.clientService.postLogin(body).then((client) =>{
        session.client = client
        session.connected = true
      })
      
    }catch(error){
      res.status(404).render("errors/404", { message : error.message})
    }
  }
 
  @Post("/logout")
  @Redirect('/client/login')
  async postLogout(@Session() session: Record<string, any>){
    //console.log(session);
    await session.destroy(error => {});
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.remove(id);
  }
}
