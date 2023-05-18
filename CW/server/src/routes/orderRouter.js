import {Router} from "express"
import orderController from "../controllers/orderController.js";
import isManager from '../middleware/checkRoleMiddleware.js';

const router = new Router()

router.get('/', orderController.getOrders)
router.get('/:id', orderController.getOrderById)
router.patch('/', isManager(true), orderController.updateOrder)
router.post('/', orderController.createOrder)
router.delete('/:id',orderController.deleteOrder)
router.get('/customer/:customerId', orderController.getOrdersByCustomerId)

export default router