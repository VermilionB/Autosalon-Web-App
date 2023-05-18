import {Router} from "express"
import engineLayoutsController from "../controllers/engineLayoutsController.js";


const router = new Router()

router.get('/', engineLayoutsController.getBodyTypes)

export default router