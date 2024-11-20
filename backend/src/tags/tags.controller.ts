import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TagsService } from './tags.service';


@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  async findAll() {
    return this.tagsService.findAll();
  }

  // Nova rota para buscar tags com filtros JSON
  @Post('filter')
  async findByFilters(@Body() filters: Record<string, any>) {
    return this.tagsService.findByFilters(filters);
  }
}