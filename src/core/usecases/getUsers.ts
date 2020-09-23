import { User } from '../entities/User'
import { Repository } from '../data/Repository'
import { PermissionError } from '../entities/CoreError'
import { AuthTokenData, validateToken } from '../entities/AuthToken'

export const getUsers = (userRepository: Repository<User>) => async (
  authTokenData: AuthTokenData | undefined
): Promise<User[]> => {
  const tokenIsValid = validateToken(userRepository)

  if (!authTokenData || !(await tokenIsValid(authTokenData))) {
    throw PermissionError('Credenciais inválidas')
  }

  const users = await userRepository.find()

  return users
}
