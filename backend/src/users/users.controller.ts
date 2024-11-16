import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CadastroDto } from 'src/cadastro/cadastroDto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CadastroDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Patch('adicionarvoo')
  async addFlightToUser(@Body() body: { email: string; numVoo: string }) {
    return this.usersService.addFlightToUser(body.email, body.numVoo);
  }

}
