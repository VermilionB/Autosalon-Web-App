import {Router} from "express"
import requestController from "../controllers/requestController.js";
import isManager from '../middleware/checkRoleMiddleware.js';


const router = new Router()

router.get('/', requestController.getRequests)
router.get('/:customerId', requestController.getRequestsByCustomer)
router.get('/:id', requestController.getRequestById)
router.get('/automobile/:automobileId', requestController.getRequestByAutomobileId)
router.patch('/', isManager(true),requestController.updateRequest)
router.post('/', requestController.createRequest)
router.delete('/:id', isManager(true),requestController.deleteRequest)

export default router