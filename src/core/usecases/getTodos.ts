import { Todo } from "../entities/Todo";
import { User } from "../entities/User";
import { validateToken } from "../entities/AuthToken";
import { PermissionError } from "../entities/CoreError";
import { AuthTokenData } from '../entities/AuthToken';
import { Repository } from "../data/Repository";

export const getTodos = (todoRepository: Repository<Todo>, userRepository: Repository<User>) => async (
    authTokenData: AuthTokenData | undefined
): Promise<Todo[]> => {
    const tokenIsValid = validateToken(userRepository);

    if (!authTokenData || !(await tokenIsValid(authTokenData))) {
        throw PermissionError('Credenciais inválidas');
    }

    const todos = await todoRepository.find({
        userId: authTokenData.id
    })

    return todos;
}