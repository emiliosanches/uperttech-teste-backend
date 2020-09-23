import { MockRepository } from '../../app/data/MockRepository'
import { AuthTokenData } from '../entities/AuthToken'
import { Todo } from '../entities/Todo'
import { User } from '../entities/User'
import { updateTodo } from './updateTodo'

describe('updateTodo test', () => {
    const todoRepository = MockRepository<Todo>('todos_spec')
    const userRepository = MockRepository<User>('users_spec')

    const user = User({
        name: 'Test user',
        email: 'user@test.com',
        password: '1234'
    })

    const todoUserId = user.id;

    const todo = Todo({
        description: 'Todo teste para alteração',
        shortName: 'Teste',
        userId: todoUserId
    })

    const updateTodoData = {
        description: 'Descrição alterada para o todo teste'
    }

    beforeAll(done => {
        userRepository.save(user).then(() => {
            todoRepository.save(todo).then(done)
        });
    })

  const updateTodoUC = updateTodo(todoRepository, userRepository)

  it('Deve falhar caso o usuário não esteja autentificado', async () => {
    await expect(
      updateTodoUC(undefined, todo.id, updateTodoData)
    ).rejects.toBeDefined()
  })

  it('Deve atualizar um usuário', async () => {
    const authToken: AuthTokenData = { id: todoUserId }

    await expect(
      updateTodoUC(authToken, todo.id, updateTodoData)
    ).resolves.toBeUndefined()

    const updatedTodo = await todoRepository.findOne({ id: todo.id })

    // TODO: Testar atributo atualizado
    expect(updatedTodo?.description).toBe(updateTodoData.description)
  })
})
