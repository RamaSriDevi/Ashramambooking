import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RecordsService } from './records.service';
import { Record } from './record.entity';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  create(@Body() data: Record) {
    return this.recordsService.create(data);
  }

  @Get()
  findAll() {
    return this.recordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recordsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Record>) {
    return this.recordsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recordsService.remove(id);
  }
}
