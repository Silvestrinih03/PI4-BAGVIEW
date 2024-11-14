# BagView

![Frontend](https://img.shields.io/badge/Frontend-Angular%2018.2.8-red)
![Backend](https://img.shields.io/badge/Backend-NestJS-blue)
![License](https://img.shields.io/badge/License-MIT-green)

BagView é uma solução simples e acessível para o rastreamento de bagagens em tempo real. Este projeto permite que os usuários monitorem suas malas durante uma viagem utilizando tags, com atualizações de localização em tempo real e notificações.

## Índice

- [BagView](#bagview)
  - [Índice](#índice)
  - [Visão Geral](#visão-geral)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Funcionalidades](#funcionalidades)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Instalação](#instalação)
    - [Frontend](#frontend-1)
    - [Backend](#backend-1)
  - [Testes](#testes)
    - [Frontend](#frontend-2)
    - [Backend](#backend-2)
  - [Autores](#autores)
  - [Licença](#licença)

## Visão Geral

BagView oferece uma maneira eficiente de monitorar suas bagagens durante viagens, garantindo que você esteja sempre informado sobre a localização de suas malas e recebendo notificações importantes em pontos-chave do trajeto.

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- `frontend`: Aplicação Angular.
- `backend`: API NestJS.

## Funcionalidades

- **Rastreamento de Bagagens em Tempo Real**: Monitore a localização de suas malas durante toda a viagem.
- **Associação de Número de Voo**: Rastreie qual mala está em qual voo, facilitando a gestão das bagagens.
- **Notificações**: Receba alertas quando a bagagem chegar a pontos-chave como embarque e desembarque.

## Tecnologias Utilizadas

### Frontend

- Angular 18
- TypeScript
- HTML/CSS

### Backend

- NestJS
- MongoDB
- TypeScript

## Instalação

### Frontend

Para configurar o frontend, siga os passos abaixo:

1. Navegue até a pasta `frontend`:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
   ```bash
   npm install -g @angular/cli
   ```

### Backend

Para configurar o backend, siga os passos abaixo:

1. Navegue até a pasta `backend`:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
   ```bash
   npm install -g @nestjs/cli
   ```
   ```bash
   npm install @nestjs/passport passport
   ```
   ```bash
   npm install @nestjs/common
   ```

## Testes

Para executar a aplicação rode o comando na raiz do projeto:

```bash
npm start
```


## Autores

PI4 - Grupo 9

1. Gustavo Kenji
2. Júlia Dias
3. Manoela Fernanda
4. Marcela Franco
5. Nicole Silvestrini

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o [arquivo LICENSE](./LICENSE) na raiz do projeto para obter mais detalhes.
