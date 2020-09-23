import { MockRepository } from '../../app/data/MockRepository'
import { AuthTokenData } from '../entities/AuthToken'
import { User } from '../entities/User'
import { Todo } from '../entities/Todo'
import { createTodo } from './createTodo'

describe('createTodo test', () => {
  const todoRepository = MockRepository<Todo>('todos_spec')
  const userRepository = MockRepository<User>('users_spec')

  const userData = {
    name: 'Test user',
    email: 'user@test.com',
    password: '1234'
  }
  const user = User(userData)

  const todoData = {
      shortName: 'Test Todo',
      description: 'Todo criado por meio de testes.\nLorem ipsum dolor sit amet. Consectetur...'
  }

  const createTodoUC = createTodo(todoRepository, userRepository)

  beforeAll(done => {
    userRepository.save(user).then(done)
  })

  it('Deve falhar caso o usuário não esteja autentificado', () => {
    expect(createTodoUC(undefined, todoData)).rejects.toBeDefined()
  })

  it('Deve criar um novo todo', async () => {
    const authToken: AuthTokenData = { id: user.id }

    await expect(createTodoUC(authToken, todoData)).resolves.toBeDefined()
    await expect(todoRepository.count()).resolves.toEqual(1)
  })
})
