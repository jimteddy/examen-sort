import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Redirect, Render } from '@nestjs/common';
import { MatterService } from './matter.service';
import { CreateMatterDto } from './dto/create-matter.dto';
import { UpdateMatterDto } from './dto/update-matter.dto';

@Controller('matter')
export class MatterController {
  constructor(private readonly matterService: MatterService) {}

  @Post('/add')
  @Redirect('/matter')
  async create(@Body() createMatterDto: CreateMatterDto) {
    return await this.matterService.create(createMatterDto);
  }

  @Get()
  @Render('matter/index')
  async findAll() {
    const matters = await this.matterService.findAll();
    return { matters }
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
  @Redirect('/matter')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.matterService.remove(id);
  }
}
