import {ApiError} from "../errors/ApiError.js";
import {
    deleteManager, generateJwt,
    getManagerById,
    getManagers,
    loginManager,
    registerManager,
    updateManager
} from '../services/managerService.js'

class ManagerController {
    async register(req, res, next) {
        try {
            const token = await registerManager(req.body, next)
            res.json({token})
        } catch (err) {
            return next(ApiError.badRequest('Error while register'))
        }
    }

    async updateManager(req, res, next) {
        try {
            const updatedManager = await updateManager(req.body, next)
            res.status(200).json(updatedManager)
        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async deleteManager(req, res, next) {
        try {
            const deletedManager = await deleteManager(+req.params.id, next)
            res.status(200).json(deletedManager)
        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async login(req, res, next) {
        try{
            console.log(req.body)
            const token = await loginManager(req.body, next)
            res.json({token})
        } catch (err) {
            return next(ApiError.internal(`Error while login : ${err.message}`))
        }
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.name, req.user.surname, req.user.email, req.user.amountOfSoldCars, req.user.salary, req.user.address)
        return res.json({token})
    }

    async getManagers(req, res) {
        try {
            const managers = await getManagers()
            res.status(200).json(managers)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async getManagerById(req, res, next) {
        try {
            const managers = await getManagerById(+req.params.id, next)
            res.status(200).json(managers)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

}

export default new ManagerController()