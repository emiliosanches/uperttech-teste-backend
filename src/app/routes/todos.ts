import { Router } from '@awaitjs/express'
import { NextFunction, Request, Response } from 'express'
import { CreateTodoData } from '../../core';
import { AppCore } from '../AppCore'
import { authenticateRequest } from '../middlewares/authenticateRequest'

const router = Router();

router.getAsync(
    '/',
    authenticateRequest,
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const authTokenData = req.tokenData;
        const todos = await AppCore.getTodos(authTokenData);

        return res.status(200).json(todos);
    }
)

router.postAsync(
    '/',
    authenticateRequest,
    async (req: Request, res: Response): Promise<Response> => {
        const { description, name } = req.body;
        const authTokenData = req.tokenData;
        
        const todo = await AppCore.createTodo(authTokenData, {
            description,
            shortName: name
        });
        return res.status(201).json(todo)
    }
)

router.putAsync(
    '/:id',
    authenticateRequest,
    async (req: Request, res: Response): Promise<Response> => {
        const authTokenData = req.tokenData
        const { id } = req.params
        const { description, name } = req.body

        const todoData: Partial<CreateTodoData> = { description, shortName: name }

        await AppCore.updateTodo(authTokenData, id, todoData)

        return res.sendStatus(200)
    }
)

export { router }
