import { User } from '../entities/User'
import { Repository } from '../data/Repository'
import { PermissionError } from '../entities/CoreError'
import { AuthTokenData, validateToken } from '../entities/AuthToken'
import { CreateTodoData, Todo } from '../entities/Todo'

export const createTodo = (todoRepository: Repository<Todo>, userRepository: Repository<User>) => async (
    authTokenData: AuthTokenData | undefined,
    todoData: CreateTodoData
): Promise<Todo> => {
    const tokenIsValid = validateToken(userRepository);

    if (!authTokenData || !(await tokenIsValid(authTokenData))) {
        throw PermissionError('Credenciais inválidas');
    }

    const todo = Todo({
        userId: authTokenData.id,
        shortName: todoData.shortName,
        description: todoData.description
    });

    todoRepository.save(todo);

    return todo;
}