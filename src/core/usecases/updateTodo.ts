import { Todo } from "../entities/Todo";
import { User } from "../entities/User";
import { Repository } from "../data/Repository";
import { AuthTokenData, validateToken } from "../entities/AuthToken";
import { PermissionError } from "../entities/CoreError";

export const updateTodo = (todoRepository: Repository<Todo>, userRepository: Repository<User>) => async (
    authTokenData: AuthTokenData | undefined,
    todoId: Todo['id'],
    updateTodoData: Partial<Omit<Todo, 'id' | 'userId'>>
): Promise<void> => {
    const tokenIsValid = validateToken(userRepository);

    if (!authTokenData || !(await tokenIsValid(authTokenData)))
        throw PermissionError("Credenciais inválidas");
    
    todoRepository.update({
        id: todoId
    }, updateTodoData)
}