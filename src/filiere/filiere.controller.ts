import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Render, Redirect, UseGuards } from '@nestjs/common';
import { FiliereService } from './filiere.service';
import { CreateFiliereDto } from './dto/create-filiere.dto';
import { UpdateFiliereDto } from './dto/update-filiere.dto';

import { SessionGuard } from 'src/guards/session.guard';

@UseGuards(SessionGuard)
@Controller('filiere')
export class FiliereController {
  constructor(private readonly filiereService: FiliereService) {}

  @Post('/add')
  @Redirect('/filiere')
  create(@Body() createFiliereDto: CreateFiliereDto) {
    return this.filiereService.create(createFiliereDto);
  }

  @Get()
  @Render('filiere/index')
  async findAll() {
    const filieres = await this.filiereService.findAll();
    return { filieres }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.filiereService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateFiliereDto: UpdateFiliereDto) {
    return this.filiereService.update(id, updateFiliereDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.filiereService.remove(id);
  }
}
