import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TagsService } from './tags.service';


@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  async findAll() {
    return this.tagsService.findAll();
  }

}