import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { Etudiant } from 'src/etudiant/entities/etudiant.entity';
import { Client } from 'src/client/entities/client.entity';
import { MatterService } from 'src/matter/matter.service';

@Injectable()
export class NoteService {

  constructor(
    @InjectRepository(Note) private readonly noteRepository : Repository<Note>,
    private readonly matterService : MatterService,

  ){}

  async create(createNoteDto: CreateNoteDto, client : Client, etudiant: Etudiant) : Promise<Note> {
    try {
      const {note, matter} = createNoteDto;
      const trueMatter = await this.matterService.findOne(client, matter)
      if(!trueMatter) throw new NotFoundException()

      const testNote = await this.noteRepository.findOne({
        where: {matter: {id: trueMatter.id}, etudiant: {id: etudiant.id}, client: {id: client.id}}
      })
      if(testNote){
        await this.noteRepository.update(testNote.id, { note: note})
        return this.noteRepository.findOneBy({ id: testNote.id})
      }else{
        const newNote = this.noteRepository.create({
        note: note,
        matter: trueMatter,
        client: client,
        etudiant: etudiant
      }); 
        return await this.noteRepository.save(newNote);
      }
    } catch (error) {
      throw new UnauthorizedException()
    }
  }

  async findAllEtudiant(etudiant : Etudiant, client : Client) : Promise<Note[]> {
    try {      
      const notes = await this.noteRepository.find({
        where : { client : {id: client.id}, etudiant: {id: etudiant.id} },
        relations: ["matter", ],
        select: {
          matter: {
            id: true,
            coefficient: true,
            libelle: true
          }
        }
      })
      return notes;
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async findAll(client : Client) : Promise<Note[]> {
    try {
      const notes = await this.noteRepository.find({
        where : { client : client, },
        relations : {
          etudiant: true
        },
      })
      return notes;
    } catch (error) {
      throw new NotFoundException()
    }
  }

  async findOne(id: number) {
    return await this.noteRepository.findOne({
      where: { id: id},
    }) ;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return this.noteRepository.update(id, {note: updateNoteDto.note})
  }

  async remove(id: number) {
    return await this.noteRepository.delete({
      id: id
    })
  }
  
}
