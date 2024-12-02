import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { CadastroDto } from 'src/cadastro/cadastroDto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CadastroDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(email: string): Promise<User | null> {
    console.log('Buscando usuário com email:', email);
    try {
      const user = await this.userModel.findOne({ 
        email: { $regex: new RegExp(`^${email}$`, 'i') } 
      }).exec();
      console.log('Usuário encontrado:', JSON.stringify(user, null, 2));
      return user;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    console.log('Buscando todos os usuários');
    try {
      const users = await this.userModel.find().exec();
      console.log('Usuários encontrados:', JSON.stringify(users, null, 2));
      return users;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  }

  async updateByEmail(email: string, dadosAtualizacao: Partial<User>): Promise<User> {
    console.log('Atualizando usuário com email:', email);
    console.log('Dados para atualização:', dadosAtualizacao);
    
    try {
      const usuarioAtualizado = await this.userModel.findOneAndUpdate(
        { email: { $regex: new RegExp(`^${email}$`, 'i') } },
        { $set: dadosAtualizacao },
        { new: true } // Retorna o documento atualizado
      ).exec();

      if (!usuarioAtualizado) {
        throw new Error('Usuário não encontrado');
      }

      console.log('Usuário atualizado:', JSON.stringify(usuarioAtualizado, null, 2));
      return usuarioAtualizado;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }

}
