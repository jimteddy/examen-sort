import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Session } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';
import { log } from 'console';
import { ClasseService } from 'src/classe/classe.service';

@Controller('etudiant')
export class EtudiantController {
  constructor(
    private readonly etudiantService: EtudiantService,
    //private readonly classeService: ClasseService 
    ) {}

  @Post('/add')
  create(@Body() createEtudiantDto: CreateEtudiantDto, @Session() session: Record<string, any>) {
    const currentClient = session.client
    return this.etudiantService.create(createEtudiantDto, currentClient);
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
