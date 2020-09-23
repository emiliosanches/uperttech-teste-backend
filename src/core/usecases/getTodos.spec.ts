import { MockRepository } from '../../app/data/MockRepository'
import { AuthTokenData } from '../entities/AuthToken'
import { Todo } from '../entities/Todo'
import { User } from '../entities/User'
import { getTodos } from './getTodos'

describe('getTodos test', () => {
    const todoRepository = MockRepository<Todo>('todos_spec')
    const userRepository = MockRepository<User>('users_spec')

    const todoUserId = 'userid'
    const todo = Todo({
        description: 'Teste para listagem de Todos',
        shortName: 'Teste',
        userId: todoUserId
    })

    beforeAll(done => {
        todoRepository.save(todo).then(done)
    })

    const getTodosUC = getTodos(todoRepository, userRepository)

    it('Deve falhar caso o usuário não esteja autentificado', () => {
        expect(getTodosUC(undefined)).rejects.toBeDefined()
    })

    it('Deve retornar os todos cadastrados', () => {
        const authToken: AuthTokenData = { id: todoUserId }

        expect(getTodosUC(authToken)).resolves.toEqual([todo])
  })
})
