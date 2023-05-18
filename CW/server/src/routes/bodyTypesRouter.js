import {Router} from "express"
import bodyTypesController from "../controllers/bodyTypesController.js";


const router = new Router()

router.get('/', bodyTypesController.getBodyTypes)

export default router