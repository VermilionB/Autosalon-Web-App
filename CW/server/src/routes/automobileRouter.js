import {Router} from "express"

import automobileController from '../controllers/automobileController.js'
import {checkMultipart} from "../middleware/checkMultipart.js";
import {upload} from "../middleware/uploadImagesMiddleware.js";

const router = new Router()


router.get('/', automobileController.getAutomobiles)
router.get('/approved', automobileController.getApprovedAutomobiles)
router.get('/:id', automobileController.getAutomobileById)
router.patch('/', automobileController.updateAutomobile)
router.post('/', checkMultipart, upload, automobileController.createAutomobile)
router.delete('/:id', automobileController.deleteAutomobile)

export default router