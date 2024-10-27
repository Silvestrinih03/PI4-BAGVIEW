import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: { email: string; password: string }): Promise<User> {
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
}
