import { Router } from '@awaitjs/express'
import { Request, Response } from 'express'
import { AppCore } from '../AppCore'
import { CoreError } from '../../core/entities/CoreError';
import { authenticateRequest } from '../middlewares/authenticateRequest'

const router = Router();

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

export { router }
