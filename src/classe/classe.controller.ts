import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Render, Redirect, UploadedFile, UseInterceptors, Session, UseGuards } from '@nestjs/common';
import { ClasseService } from './classe.service';
import { CreateClasseDto } from './dto/create-classe.dto';
import { UpdateClasseDto } from './dto/update-classe.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { log } from 'console';
import { Client } from 'src/client/entities/client.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { SessionGuard } from 'src/guards/session.guard';

@UseGuards(SessionGuard)
@Controller('classe')
export class ClasseController {
  constructor(private readonly classeService: ClasseService) {}

  @Post('/add')
  @Redirect('/classe')
  create(@Session() session: Record<string, any>, @Body() createClasseDto: CreateClasseDto) {
    const currentClient: Client = session.client
    return this.classeService.create(currentClient, createClasseDto);
  }

  @Get()
  @Render('classe/index')
  async findAll(@Session() session: Record<string, any>) {
    const currentClient: Client = session.client
    const classes = await this.classeService.findAll(currentClient)
    const nombre = 0
    return { classes, nombre }
  }

  @Post('/upload')
  @Redirect("/classe/upload")
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: "./files",
      filename: (req, file, callback) => {
        //const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        //const ext = extname(file.originalname)
        const filename = `${file.originalname}`
        callback(null, filename)
      },
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File, ){
    log(file)
  }

  @Get('/upload')
  @Render("classe/file")
  getUploadFile(){
  
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classeService.findOne(id);
  }



  @Get(':id/etudiants')
  @Render('etudiant/index')
  async getClasseEtudiant(@Param('id', ParseIntPipe) id: number){
    try {
      const {classe} = await this.classeService.getClasseEtudiant(id)      
      return { classe }
    } catch (error) {
      return error.message
    }
    
  }

  @Post(':id/update')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClasseDto: UpdateClasseDto) {
    return this.classeService.update(id, updateClasseDto);
  }

  @Get(':id/delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.classeService.remove(id);
  }
}
