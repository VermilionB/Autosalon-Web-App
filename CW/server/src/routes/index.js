import {Router} from "express";
import customerRouter from "./customerRouter.js";
import automobileRouter from "./automobileRouter.js";
import brandRouter from "./brandRouter.js";
import modelRouter from "./modelRouter.js";
import fuelTypesRouter from "./fuelTypesRouter.js";
import bodyTypesRouter from "./bodyTypesRouter.js";
import engineLayoutsRouter from "./engineLayoutsRouter.js";
import orderRouter from "./orderRouter.js";
import requestRouter from "./requestRouter.js";
import managerRouter from "./managerRouter.js";

const router = new Router()

router.use('/customers', customerRouter)
router.use('/managers', managerRouter)
router.use('/automobiles', automobileRouter)
router.use('/brands', brandRouter)
router.use('/models', modelRouter)
router.use('/fuelTypes', fuelTypesRouter)
router.use('/bodyTypes', bodyTypesRouter)
router.use('/engineLayouts', engineLayoutsRouter)
router.use('/orders', orderRouter)
router.use('/requests', requestRouter)

export default router