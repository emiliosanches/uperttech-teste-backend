import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { Repository } from '../data/Repository'
import { JWT_SECRET } from '../../config/env'
import { User } from './User'

export type AuthTokenData = {
  id: string
}

type AuthToken = string

export const AuthToken = ({
  tokenData,
  expiresIn = '12h'
}: {
  tokenData: AuthTokenData
  expiresIn: string
}): AuthToken =>
  jwt.sign(tokenData, JWT_SECRET, {
    expiresIn
  })

export const verifyToken = (token: AuthToken): Promise<AuthTokenData> =>
  promisify(jwt.verify)(token, JWT_SECRET) as Promise<AuthTokenData>

export const validateToken = (userRepository: Repository<User>) => async (
  tokenData: AuthTokenData
): Promise<boolean> => {
  if (!tokenData) {
    return false
  }

  const user = await userRepository.findOne({ id: tokenData.id })

  if (!user) {
    return false
  }

  return true
}
