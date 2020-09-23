import { Repository } from './data/Repository'

import { AuthTokenData, AuthToken } from './entities/AuthToken'
import { User, CreateUserData } from './entities/User'
import { CoreError } from './entities/CoreError'

import {
  AuthenticationTokenReturn,
  UserAuthenticationData,
  authenticateUser
} from './usecases/authenticateUser'
import { getUsers } from './usecases/getUsers'
import { createUser } from './usecases/createUser'
import { updateUser } from './usecases/updateUser'
import { deleteUser } from './usecases/deleteUser'

import { Todo, CreateTodoData } from './entities/Todo'

import { getTodos } from './usecases/getTodos'
import { createTodo } from './usecases/createTodo'
import { updateTodo } from './usecases/updateTodo'
import { deleteTodo } from './usecases/deleteTodo'

interface Core {
  (dependencies: CoreDependencies): CoreUseCases
}

interface CoreDependencies {
  userRepository: Repository<User>
  todoRepository: Repository<Todo>
}

interface CoreUseCases {
  createUser: (userData: CreateUserData) => Promise<User>

  authenticateUser: (
    userData: UserAuthenticationData
  ) => Promise<AuthenticationTokenReturn>

  getUsers: (authTokenData: AuthTokenData | undefined) => Promise<User[]>

  updateUser: (
    authTokenData: AuthTokenData | undefined,
    userId: User['id'],
    userData: Partial<CreateUserData>
  ) => Promise<void>

  deleteUser: (
    authTokenData: AuthTokenData | undefined,
    userId: User['id']
  ) => Promise<void>

  
  createTodo: (
    AuthTokenData: AuthTokenData | undefined,
    todoData: CreateTodoData
  ) => Promise<Todo>

  getTodos: (authTokenData: AuthTokenData | undefined) => Promise<Todo[]>

  updateTodo: (
    authTokenData: AuthTokenData | undefined,
    todoId: Todo['id'],
    todoData: Partial<CreateTodoData>
  ) => Promise<void>

  deleteTodo: (
    authTokenData: AuthTokenData | undefined,
    todoId: Todo['id']
  ) => Promise<void>
}

export const Core: Core = ({
  userRepository,
  todoRepository
}) => ({
  createUser: createUser(userRepository),
  getUsers: getUsers(userRepository),
  authenticateUser: authenticateUser(userRepository),
  updateUser: updateUser(userRepository),
  deleteUser: deleteUser(userRepository),

  createTodo: createTodo(todoRepository, userRepository),
  getTodos: getTodos(todoRepository, userRepository),
  updateTodo: updateTodo(todoRepository, userRepository),
  deleteTodo: deleteTodo(todoRepository, userRepository)
})

export {
  AuthToken,
  AuthTokenData,
  CoreError,
  UserAuthenticationData,
  Repository,
  User,
  CreateUserData,
  Todo,
  CreateTodoData
}
