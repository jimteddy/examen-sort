import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Render,Res, Session, Redirect } from '@nestjs/common';
import { Response } from 'express'
import { ExamenService } from './examen.service';
import { CreateExamanDto } from './dto/create-examen.dto';
import { UpdateExamanDto } from './dto/update-examen.dto';
import { Client } from 'src/client/entities/client.entity';

@Controller('examen')
export class ExamenController {
  constructor(private readonly examenService: ExamenService) { }

  @Get()
  @Render('examen/all')
  findAll() {
    return this.examenService.findAll();
  }

  @Get('/add')
  @Render('examen/add')
  getExamen() { }

  @Post('/add')
  @Redirect('/examen')
  postExamen(@Body() createExamanDto: CreateExamanDto, @Session() session: Record<string, any>) {
    const currentClient: Client = session.client
    this.examenService.create(createExamanDto, currentClient)
  }

  @Get('detail/:id')
  @Render('examen/detail')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const examen = await this.examenService.findOne(id);
      return { examen }
    } catch (error) {
      res.status(404).render("errors/404", { message : error.message})
    }

  }

  @Patch('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExamanDto: UpdateExamanDto) {
    return this.examenService.update(id, updateExamanDto);
  }

  @Delete('remove/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.examenService.remove(id);
  }


}
