# API de Usuários — NestJS (armazenamento em memória)

## Integrantes

- André dos Santos
- André de Carvalho Prado
- Leonardo Patez Libanori
- Lucas Ribeiro Jorge

Atividade da Faculdade Impacta: API com Node.js e NestJS que permite armazenar
usuários (nome e e-mail), consultar todos, ler apenas um e excluir um usuário,
usando **apenas a memória** como armazenamento.

O armazenamento é feito pela classe [`UserStore`](src/users/user-store.ts),
implementada com o **padrão Singleton** (construtor privado + `getInstance()`),
que mantém os usuários em um array em memória. Os dados são perdidos ao
reiniciar a aplicação — comportamento esperado para este exercício.

## Como executar

```bash
npm install
npm run start        # ou: npm run start:dev (com watch)
```

A API sobe em `http://localhost:3000`.

## Endpoints

| Método | Rota         | Descrição                          |
| ------ | ------------ | ---------------------------------- |
| POST   | `/users`     | Cria um usuário (`name`, `email`)  |
| GET    | `/users`     | Lista todos os usuários            |
| GET    | `/users/:id` | Retorna um usuário pelo id         |
| DELETE | `/users/:id` | Exclui um usuário pelo id          |

### Exemplos (curl)

```bash
# Criar
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana Silva","email":"ana.silva@email.com"}'

# Listar todos
curl http://localhost:3000/users

# Buscar um
curl http://localhost:3000/users/1

# Excluir
curl -X DELETE http://localhost:3000/users/1
```

Respostas de erro: `404` quando o id não existe e `400` quando `name` ou
`email` não são enviados no corpo do POST.

## Estrutura

```
src/
├── main.ts                     # bootstrap da aplicação (porta 3000)
├── app.module.ts               # módulo raiz
└── users/
    ├── users.module.ts         # módulo de usuários
    ├── users.controller.ts     # rotas POST/GET/GET:id/DELETE
    ├── users.service.ts        # regras de negócio (usa o singleton)
    ├── user-store.ts           # classe Singleton com o array em memória
    ├── user.entity.ts          # interface User (id, name, email)
    └── dto/create-user.dto.ts  # corpo esperado no POST
```
