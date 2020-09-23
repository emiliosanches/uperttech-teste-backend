import { hashPassword, User, CreateUserData } from '../entities/User'
import { Repository } from '../data/Repository'
import {
  CoreError,
  NotFoundError,
  PermissionError
} from '../entities/CoreError'
import { validateToken, AuthTokenData } from '../entities/AuthToken'

export const updateUser = (userRepository: Repository<User>) => async (
  authTokenData: AuthTokenData | undefined,
  userId: User['id'],
  userData: Partial<CreateUserData>
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

  const { password, name = user.name, email = user.email } = userData

  const userUpdateData = {
    name,
    email,
    password: password ? hashPassword(password) : user.password
  }

  try {
    await userRepository.update({ id: userId }, userUpdateData)
  } catch (error) {
    throw CoreError()
  }
}
