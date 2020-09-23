import { MockRepository } from '../../app/data/MockRepository'
import { AuthTokenData } from '../entities/AuthToken'
import { Todo } from '../entities/Todo'
import { User } from '../entities/User';
import { deleteTodo } from './deleteTodo'

describe('deleteTodo test', () => {
    const todoRepository = MockRepository<Todo>('todos_spec')
    const userRepository = MockRepository<User>('users_spec')

    const user = User({
        name: 'Test user',
        email: 'user@test.com',
        password: '1234'
    })

    const todoUserId = user.id;

    const todo = Todo({
        description: 'Todo teste para exclusão',
        shortName: 'Teste',
        userId: todoUserId
    })
    
    beforeAll(done => {
        userRepository.save(user).then(() => {
            todoRepository.save(todo).then(done)
        });
    })

    const deleteTodoUC = deleteTodo(todoRepository, userRepository)
    
    it('Deve falhar caso o usuário não esteja autentificado', () => {
        expect(deleteTodoUC(undefined, todo.id)).rejects.toBeDefined()
    })

    it('Deve deletar um todo', async () => {
        const authToken: AuthTokenData = { id: todoUserId }

        await expect(deleteTodoUC(authToken, todo.id)).resolves.toBeUndefined()
        await expect(todoRepository.find()).resolves.toStrictEqual([])
    })
})
