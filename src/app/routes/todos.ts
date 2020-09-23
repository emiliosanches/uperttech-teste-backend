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
        
        try {
            const todo = await AppCore.createTodo(authTokenData, {
                description,
                shortName: name
            });
            return res.status(201).json(todo)
        } catch (err) {
            if (err instanceof CoreError)
                return res.status(400).send();
            else
                return res.status(500).send();
        }
    }
)

export { router }
