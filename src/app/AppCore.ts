import {
  Core as createCore,
  User,
  Todo
} from '../core'

import { MockRepository } from './data/MockRepository'

export const AppCore = createCore({
  userRepository: MockRepository<User>('users'),
  todoRepository: MockRepository<Todo>('todos')
})
