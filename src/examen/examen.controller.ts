import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Render,Res, Session, Redirect, UseGuards } from '@nestjs/common';
import { Response } from 'express'
import { ExamenService } from './examen.service';
import { CreateExamanDto } from './dto/create-examen.dto';
import { UpdateExamanDto } from './dto/update-examen.dto';
import { Client } from 'src/client/entities/client.entity';
import { Examen } from './entities/examen.entity';

import { SessionGuard } from 'src/guards/session.guard';

@UseGuards(SessionGuard)
@Controller('examen')
export class ExamenController {
  constructor(private readonly examenService: ExamenService) { }

  @Post('/add')
  @Redirect('/examen')
  async postExamen(@Body() createExamanDto: CreateExamanDto, @Session() session: Record<string, any>) {
    const currentClient: Client = session.client
    const examen = await this.examenService.create(createExamanDto, currentClient)
  }

  @Get()
  @Render('examen/index')
  async findAll(@Session() session: Record<string, any>) {
    const currentClient: Client = session.client
    const examens: Examen[] = await this.examenService.findAll(currentClient)
    return {examens}
  }

  @Get(':id')
  @Render('examen/detail')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const examen = await this.examenService.findOne(id);
      return { examen }
    } catch (error) {
      res.status(404).render("errors/404", { message : error.message})
    }
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExamanDto: UpdateExamanDto) {
    return this.examenService.update(id, updateExamanDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.examenService.remove(id);
  }
  
}
