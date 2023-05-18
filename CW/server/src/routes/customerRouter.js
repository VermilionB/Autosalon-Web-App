import {Router} from "express"
import customerController from '../controllers/customerController.js'
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router()

router.post('/registration', customerController.register)
router.post('/login', customerController.login)
router.get('/auth', authMiddleware, customerController.check)
router.get('/', customerController.getCustomers)
router.get('/:id', customerController.getCustomerById)
router.patch('/', customerController.updateCustomer)
router.delete('/:id', customerController.deleteCustomer)

export default router