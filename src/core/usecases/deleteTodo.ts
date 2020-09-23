import { Todo } from "../entities/Todo";
import { User } from "../entities/User";
import { Repository } from "../data/Repository";
import { AuthTokenData, validateToken } from "../entities/AuthToken";
import { PermissionError, NotFoundError } from "../entities/CoreError";

export const deleteTodo = (todoRepository: Repository<Todo>, userRepository: Repository<User>) => async (
    authTokenData: AuthTokenData | undefined,
    todoId: Todo['id']
): Promise<void> => {
    const tokenIsValid = validateToken(userRepository);

    if (!authTokenData || !(await tokenIsValid(authTokenData)))
        throw PermissionError("Credenciais inválidas");

    const todo = await todoRepository.findOne({
        id: todoId
    });

    if (!todo) {
        throw NotFoundError("O todo informado não foi encontrado.")
    }

    if (todo.userId !== authTokenData.id) {
        throw PermissionError("O usuário fornecido não tem permissão para executar essa operação")
    }

    todoRepository.delete({
        id: todoId
    })
}