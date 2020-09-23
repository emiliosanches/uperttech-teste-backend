<h2 align="center">Teste para candidatos à vaga de Estagiário em Desenvolvimento Back-end</h2>

Nesse teste analisaremos seu conhecimento nas tecnologias solicitadas, organização e agilidade de desenvolvimento, trabalhando em uma API REST NodeJS escrita em TypeScript.

### Instruções

Você deverá implementar as funcionalidades pendentes da API de uma aplicação de `To-do list` (gestão de tarefas pessoais). Nela, um usuário (`User`) poderá criar, visualizar, editar e deletar suas tarefas (`Todo`s).

Você é livre para escolher quais atributos um `Todo` deve ter. Ele deve possuir no mínimo os seguintes atributos:

```typescript
interface Todo {
  id: string // ID da tarefa
  userId: string // Usuário que criou a tarefa
  // O resto é por sua conta :)
}
```

Você não precisa se preocupar no _como_ implementar as funcionalidades. A arquitetura do projeto já foi definida e já existem implementações semelhantes para a entidade `User` (mais detalhes na sessão [Tarefas](#tarefas)). Sua função é imitar as implementações que já foram feitas, adaptando aquilo que for necessário.

Detalhes da estrutura/arquitetura utilizada estão em [estrutura.md](./docs/estrutura.md).

### Critérios avaliados

- Capacidade de reconhecer padrões no código e adaptá-los.
- Legibilidade e padronização do código

### Tarefas

- Configuração do projeto

  - [ ] Criar o arquivo `.env` utilizando como base o `.env.example`

- Criação das entidades

  - [ ] Criar a entidade `Todo`

    - Arquivo [src/core/entities/Todo.ts](./src/core/entities/Todo.ts)
    - Veja [entidade `User`](./src/core/entities/User.ts)
    - Um `Todo` deve ter alguma referência ao `User` que o criou e um _id_ para ser referenciado. Fora isso, você pode escolher os atributos que achar necessário

- Criação dos casos de uso

  - [ ] Criar o caso de uso createTodo

    - Arquivo [src/core/usecases/createTodo.ts](./src/core/usecases/createTodo.ts)
    - Veja [caso de uso `createUser`](./src/core/usecases/createUser.ts)
    - Os dados do token de autentificação contém o _id_ do usuário que fez a requisição. Utilize ele no _userId_ do seu `Todo`

  - [ ] Criar o caso de uso getTodos

    - Arquivo [src/core/usecases/getTodos.ts](./src/core/usecases/getTodos.ts)
    - Veja [caso de uso `getUsers`](./src/core/usecases/getUsers.ts)
    - Você deve exibir apenas os `Todo`s do usuário cujo id foi passado no token de autentificação

  - [ ] Criar o caso de uso updateTodo

    - Arquivo [src/core/usecases/updateTodo.ts](.src/core/usecases/updateTodo.ts)
    - Veja [caso de uso `updateUser`](./src/core/usecases/updateUser.ts)
    - Um usuário só pode atualizar os `Todo`s criados/pertencentes a ele

  - [ ] Criar o caso de uso deleteTodo

    - Arquivo [src/core/usecases/deleteTodo.ts](./src/core/usecases/deleteTodo.ts)
    - Veja [caso de uso `deleteUser`](./src/core/usecases/deleteUser.ts)
    - Um usuário só pode deletar os `Todo`s criados/pertencentes a ele

- Criação das rotas de acesso

  - [ ] Criar a rota de criação de um Todo (`POST /v1/todos`)

    - Arquivo [src/app/routes/todos.ts](./src/app/routes/todos.ts)
    - Veja [`app/routes/users.ts`](./src/app/routes/users.ts)

  - [ ] Criar a rota exibição dos Todos (`GET /v1/todos`)

    - Arquivo [src/app/routes/todos.ts](./src/app/routes/todos.ts)
    - Veja [`app/routes/users.ts`](./src/app/routes/users.ts)

  - [ ] Criar a rota atualização de um Todo (`PUT /v1/todos/:id`)

    - Arquivo [src/app/routes/todos.ts](./src/app/routes/todos.ts)
    - Veja [`app/routes/users.ts`](./src/app/routes/users.ts)

  - [ ] Criar a rota deleção de um Todo (`DELETE /v1/todos/:id`)
    - Arquivo [src/app/routes/todos.ts](./src/app/routes/todos.ts)
    - Veja [`app/routes/users.ts`](./src/app/routes/users.ts)

#### Bônus

- [ ] Corrigir os arquivos de teste respectivos de cada caso de uso ([createTodo.spec.ts](./src/core/usecases/createTodo.spec.ts), [getTodos.spec.ts](./src/core/usecases/getTodos.spec.ts), etc)
- [ ] Alguma funcionalidade extra do seu interesse

### Entrega

Você deverá criar um fork desse repositório, desenvolver as funcionalidades propostas e submetê-lo através do e-mail contato@uperttech.com.

Recomendamos que você execute o processo de lint (`yarn lint`) e teste o projeto (`yarn test`) antes de submetê-lo. Alguns arquivos de teste automatizado já foram criados. Recomendamos a utilização do [Insomnia](https://insomnia.rest/download/) para testes manuais.

### Dúvidas

Quaisquer dúvidas que você venha a ter podem ser submetidas nas issues do repositório ou via e-mail (contato@uperttech.com). Consulte as issues para ver se alguém já não teve a mesma dúvida.
