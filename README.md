# BagView

BagView é uma solução simples e acessível para o rastreamento de bagagens em tempo real. Este projeto permite que os usuários monitorem suas malas durante uma viagem usando tags, com atualizações de localização em tempo real e notificações.

## Estrutura do Projeto

O projeto é dividido em duas partes principais:

- `frontend`: Aplicação Angular.
- `backend`: API NestJS.

## Funcionalidades

- **Rastreamento de bagagens em tempo real:** Monitore a localização de suas malas durante toda a viagem.
- **Associação de número de voo:** Permite rastrear qual mala está em qual voo, facilitando a gestão das bagagens.
- **Notificações:** Receba notificações quando a bagagem chega a determinados pontos-chave (embarque, desembarque, etc.).

## Frontend

O frontend é desenvolvido utilizando Angular versão 18.2.8.

### Configuração

Para configurar o frontend, siga os passos abaixo:

1. Navegue até a pasta `frontend`:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

### Executando o Frontend

Para iniciar o servidor de desenvolvimento, execute:

```bash
ng serve
```

Acesse `http://localhost:4200/` no seu navegador. A aplicação será recarregada automaticamente se você alterar qualquer um dos arquivos fonte.

### Testes

Para executar os testes unitários, utilize:

```bash
ng test
```

Para executar os testes end-to-end, utilize:

```bash
ng e2e
```

## Backend

O backend é uma aplicação NestJS utilizando Prisma como ORM e MongoDB como banco de dados.

### Configuração

Para configurar o backend, siga os passos abaixo:

1. Navegue até a pasta `backend`:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:

   - Crie um arquivo `.env` na raiz da pasta `backend`.
   - Adicione a URL de conexão do seu banco de dados MongoDB:

   ```dotenv
   DATABASE_URL="mongodb+srv://bagview:bagview2024@bagtrackingcluster.dcmh6.mongodb.net/?retryWrites=true&w=majority&appName=bagTrackingCluster"
   ```

### Executando o Backend

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run start:dev
```

O servidor estará rodando em `http://localhost:3000`.

### Testes

Para executar os testes, utilize:

```bash
npm run test
```

Para executar os testes end-to-end, utilize:

```bash
npm run test:e2e
```

## Tecnologias Utilizadas

### Frontend

- Angular 18
- TypeScript
- HTML/CSS

### Backend

- NestJS
- Prisma
- MongoDB
- TypeScript

# PI3 - Grupo 9

1. Gustavo Kenji
2. Júlia Dias
3. Manoela Fernanda
4. Marcela Franco
5. Nicole Silvestrini

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o [arquivo LICENSE](./LICENSE) na raiz do projeto para obter mais detalhes.
