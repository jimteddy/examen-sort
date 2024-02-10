import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Render, Redirect, Session } from '@nestjs/common';
import { SalleService } from './salle.service';
import { CreateSalleDto } from './dto/create-salle.dto';
import { UpdateSalleDto } from './dto/update-salle.dto';
import { log } from 'console';
import { Client } from 'src/client/entities/client.entity';

@Controller('salle')
export class SalleController {
  constructor(private readonly salleService: SalleService) {}

  @Post('/add')
  @Redirect('/salle')
  create(@Body() createSalleDto: CreateSalleDto, @Session() session: Record<string, any>) {
    const currentClient: Client = session.client
    return this.salleService.create(createSalleDto, currentClient);
  }

  @Get()
  @Render('salle/index')
  async findAll() {
    const salles = await this.salleService.findAll();
    return {salles}
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.salleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSalleDto: UpdateSalleDto) {
    return this.salleService.update(id, updateSalleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.salleService.remove(id);
  }
}
