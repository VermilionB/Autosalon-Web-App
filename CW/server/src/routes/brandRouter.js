import {Router} from "express"
import brandController from "../controllers/brandController.js";
import isManager from '../middleware/checkRoleMiddleware.js';


const router = new Router()

router.get('/', brandController.getBrands)
router.get('/:id', brandController.getBrandById)
router.patch('/', isManager(true),brandController.updateBrand)
router.post('/', isManager(true), brandController.createBrand)
router.delete('/:id', isManager(true),brandController.deleteBrand)

export default router