import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Redirect, Render, Session, UseGuards } from '@nestjs/common';
import { MatterService } from './matter.service';
import { CreateMatterDto } from './dto/create-matter.dto';
import { UpdateMatterDto } from './dto/update-matter.dto';
import { Client } from 'src/client/entities/client.entity';

import { SessionGuard } from 'src/guards/session.guard';

@UseGuards(SessionGuard)
@Controller('matter')
export class MatterController {
  constructor(private readonly matterService: MatterService) {}

  @Post('/add')
  @Redirect('/matter')
  async create(@Body() createMatterDto: CreateMatterDto, @Session() session: Record<string, any>) {
    const currentClient = session.client
    return await this.matterService.create(currentClient, createMatterDto);
  }

  @Get()
  @Render('matter/index')
  async findAll(@Session() session: Record<string, any>) {
    const currentClient = session.client
    const matters = await this.matterService.findAll(currentClient);
    return { matters }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Session() session: Record<string, any>) {
    const currentClient = session.client
    return this.matterService.findOne(currentClient, id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMatterDto: UpdateMatterDto) {
    return this.matterService.update(id, updateMatterDto);
  }

  @Delete(':id')
  @Redirect('/matter')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.matterService.remove(id);
  }
}
