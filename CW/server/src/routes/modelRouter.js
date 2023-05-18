// import {Router} from "express"
// import brandController from "../controllers/brandController.js";
//
// const router = new Router()
//
// router.get('/', brandController.getBrands)
// router.get('/:id', brandController.getBrandById)
// router.patch('/', brandController.updateBrand)
// router.post('/', brandController.createBrand)
// router.delete('/:id', brandController.deleteBrand)
//
// export default router

//make router for models by example of brandRouter.js
import {Router} from "express"
import modelController from "../controllers/modelController.js";

const router = new Router()

router.get('/', modelController.getModels)
router.get('/:id', modelController.getModelById)
router.patch('/', modelController.updateModel)
router.post('/', modelController.createModel)
router.delete('/:id', modelController.deleteModel)
router.get('/brand/:id', modelController.getModelsByBrandId)
export default router