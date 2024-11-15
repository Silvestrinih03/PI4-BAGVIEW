import { Controller, Patch, Body, Post } from '@nestjs/common';
import { AlugarService } from './alugar.service';
import { AlugarDto } from './alugarDto';

@Controller('alugar')
export class AlugarController {
  constructor(private alugarService: AlugarService) {}

  @Patch('alugarTag')
  async alugarTag(@Body() alugarDto: AlugarDto) {
    return this.alugarService.alugarTag(alugarDto);
  }
}
