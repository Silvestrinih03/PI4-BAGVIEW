import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

/**
 * Módulo de autenticação que gerencia a autenticação de usuários.
 * Este módulo importa o UsersModule para gerenciar usuários e o JwtModule
 * para gerar e validar tokens JWT.
 */
@Module({
  imports: [
    UsersModule, // Módulo responsável pela gestão de usuários
    JwtModule.register({
      secret: '123456qwerty', // Chave secreta para assinatura do token
      signOptions: { expiresIn: '60m' }, // Opções de expiração do token
    }),
  ],
  controllers: [AuthController], // Controlador responsável pelas rotas de autenticação
  providers: [AuthService], // Serviço que contém a lógica de autenticação
})
export class AuthModule {} // Exporta o módulo de autenticação
