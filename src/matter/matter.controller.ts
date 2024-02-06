import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MatterService } from './matter.service';
import { CreateMatterDto } from './dto/create-matter.dto';
import { UpdateMatterDto } from './dto/update-matter.dto';

@Controller('matter')
export class MatterController {
  constructor(private readonly matterService: MatterService) {}

  @Post()
  create(@Body() createMatterDto: CreateMatterDto) {
    return this.matterService.create(createMatterDto);
  }

  @Get()
  findAll() {
    return this.matterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.matterService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMatterDto: UpdateMatterDto) {
    return this.matterService.update(id, updateMatterDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.matterService.remove(id);
  }
}
