import { Router } from 'express'
import { body, param } from 'express-validator'
import { TaskController } from '../controllers/Task.controller'
import { handleInputErrors } from '../middleware/validations'
import { authMiddleware } from '../middleware/auth'

const router = Router()


router.post('/',
    authMiddleware,
    body('taskName').trim().notEmpty().withMessage('Task\'s name is required'),
    body('description').trim().notEmpty().withMessage('Task\'s description is required'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/',
    authMiddleware,
    TaskController.getAllTasks
)

router.put('/:taskId',
    authMiddleware,
    param('taskId').isMongoId().withMessage('Invalid ID'),
    body('taskName').trim().notEmpty().withMessage('Task\'s name is required'),
    body('description').trim().notEmpty().withMessage('Description task is required'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:taskId',
    authMiddleware,
    param('taskId').isMongoId().withMessage('Invalid ID'),
    handleInputErrors,
    TaskController.deleteTaskById
)

export default router