import { v4 } from 'uuid'

export interface Todo {
    readonly id: string
    userId: string
    shortName: string
    description: string
}

export type CreateTodoData = Pick<Todo, 'shortName' | 'description'>

export const Todo = ({ userId, shortName, description }: Omit<Todo, 'id'>): Todo => ({
    id: v4(),
    userId,
    shortName,
    description
})
