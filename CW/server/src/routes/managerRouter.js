import {Router} from "express"
import managerController from '../controllers/managerController.js'
import authMiddleware from "../middleware/authMiddleware.js";
import isManager from '../middleware/checkRoleMiddleware.js';

const router = new Router()

router.post('/registration', managerController.register)
router.post('/login', managerController.login)
router.get('/auth', authMiddleware, managerController.check)
router.get('/', managerController.getManagers)
router.get('/:id', managerController.getManagerById)
router.patch('/', isManager(true), managerController.updateManager)
router.delete('/:id', isManager(true), managerController.deleteManager)

export default router