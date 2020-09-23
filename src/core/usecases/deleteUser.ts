import { Repository } from '../data/Repository'
import { User } from '../entities/User'
import {
  CoreError,
  NotFoundError,
  PermissionError
} from '../entities/CoreError'
import { AuthTokenData, validateToken } from '../entities/AuthToken'

export const deleteUser = (userRepository: Repository<User>) => async (
  authTokenData: AuthTokenData | undefined,
  userId: User['id']
): Promise<void> => {
  const tokenIsValid = validateToken(userRepository)

  if (!authTokenData || !(await tokenIsValid(authTokenData))) {
    throw PermissionError('Credenciais inválidas')
  }

  const user = await userRepository.findOne({ id: userId })

  if (!user) {
    throw NotFoundError('Usuário inexistente')
  }

  if (authTokenData.id !== user.id) {
    throw PermissionError(
      'O usuário fornecido não tem permissão para executar essa operação'
    )
  }

  try {
    await userRepository.delete({ id: user.id })
  } catch (error) {
    throw CoreError()
  }
}
