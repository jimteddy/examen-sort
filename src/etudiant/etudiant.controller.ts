import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Session, Res, UseGuards, Render, NotFoundException } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { Response } from 'express';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';
import { ClasseService } from 'src/classe/classe.service';

import { SessionGuard } from 'src/guards/session.guard';
import { CreateNoteDto } from 'src/note/dto/create-note.dto';
import { Client } from 'src/client/entities/client.entity';
import { NoteService } from 'src/note/note.service';
import { MatterService } from 'src/matter/matter.service';


@UseGuards(SessionGuard)
@Controller('etudiant')
export class EtudiantController {
  constructor(
    private readonly notesService: NoteService,
    private readonly etudiantService : EtudiantService,
    private readonly matterService : MatterService,
    private readonly classeService: ClasseService 
    ) {}

  @Post('/add')
  async create(
    @Body() createEtudiantDto: CreateEtudiantDto,
    @Session() session: Record<string, any>, 
    @Res() res: Response) {
      try {
        const currentClient = session.client
        const newEtudiant = await this.etudiantService.create(createEtudiantDto, currentClient);
        res.status(201).redirect(`/classe/${createEtudiantDto.classeId}/etudiants`)
      } catch (error) {
        res.status(400).render("errors/404", {message : error.message}) 
      }
  }

  @Get(':id/notes')
  @Render('note/index')
  async getNotes(
    @Param('id', ParseIntPipe) id: number,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ){
    try {      
      const currentClient: Client = session.client

      const etudiant = await this.etudiantService.findOne(id) 
      if (!etudiant) throw new NotFoundException('Etudiant non trouvé')
      
      const notes = await this.notesService.findAllEtudiant(etudiant, currentClient);
      
      const matters = await this.matterService.findAll(currentClient)
      if(!matters) throw new NotFoundException('Matière indisponible')

      return { classe: etudiant.classe, etudiant, notes, matters}
    } catch (error) {
      res.status(404).render('errors/404', {message: error.message})
    }
  }

  @Post(':id/notes')
  async postNotes(
    @Body() createNoteDto: CreateNoteDto,
    @Param('id', ParseIntPipe) id: number,
    @Session() session: Record<string, any>,
    @Res() res: Response,
    ){
    try {
      const currentClient: Client = session.client

      const etudiant = await this.etudiantService.findOne(id)
      if(!etudiant) throw new NotFoundException()
      await this.notesService.create(createNoteDto, currentClient, etudiant)
      res.redirect(`/etudiant/${id}/notes`)
      
    } catch (error) {
      res.status(404).render('errors/404', {message: error.message})
    }
  }

  @Get()
  async findAll() {
    return await this.etudiantService.findAll();
  }

  @Get(':id/detail')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.etudiantService.findOne(id);
  }
/*
  @Post(':id/update')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEtudiantDto: UpdateEtudiantDto) {
    return this.etudiantService.update(id, updateEtudiantDto);
  }
*/
  @Post(':id/delete')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.etudiantService.remove(id);
  }
  
}
