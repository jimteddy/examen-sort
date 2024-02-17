import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Render, Session, NotFoundException, Redirect, Res, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Client } from 'src/client/entities/client.entity';

import { SessionGuard } from 'src/guards/session.guard';
import { Etudiant } from 'src/etudiant/entities/etudiant.entity';

@UseGuards(SessionGuard)
@Controller('note')

export class NoteController {
  constructor(
    private readonly notesService: NoteService,
    ) {}
  
  @Post("create")  
  async create(
    @Body() createNoteDto: CreateNoteDto,
    @Session() session: Record<string, any>,
    etudiant: Etudiant,
    ) {
      try {
        const currentClient : Client = session.client
        await this.notesService.create(createNoteDto, currentClient, etudiant);
      } catch (error) {
        return error.message
      }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.remove(id);
  }

}
