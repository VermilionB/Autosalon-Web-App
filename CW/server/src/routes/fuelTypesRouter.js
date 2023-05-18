import {Router} from "express"
import brandController from "../controllers/fuelTypesController.js";


const router = new Router()

router.get('/', brandController.getFuelTypes)

export default router