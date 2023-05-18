import {ApiError} from "../errors/ApiError.js";
import {
    deleteAutomobile,
    getAutomobileById,
    getAutomobiles,
    createAutomobile,
    updateAutomobile,
    getApprovedAutomobiles
} from '../services/automobileService.js'

class AutomobileController {
    async createAutomobile(req, res, next) {
        try {
            const automobile = await createAutomobile(req.body, req.fileNames, next);
            res.status(200).json(automobile);
        } catch (err) {
            return next(ApiError.badRequest('Error while creating automobile (controller)'));
        }
    }

    async updateAutomobile(req, res, next) {
        try {
            const updatedAutomobile = await updateAutomobile(req.body, next)
            res.status(200).json(updatedAutomobile)
        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async deleteAutomobile(req, res, next) {
        try {
            const deletedAutomobile = await deleteAutomobile(+req.params.id, next)
            res.status(200).json(deletedAutomobile)
        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async getAutomobiles(req, res, next) {
        try {
            const automobiles = await getAutomobiles(next)
            res.status(200).json(automobiles)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async getApprovedAutomobiles(req, res, next) {
        try {
            const automobiles = await getApprovedAutomobiles(next)
            res.status(200).json(automobiles)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async getAutomobileById(req, res, next) {
        try {
            const automobiles = await getAutomobileById(+req.params.id, next)
            res.status(200).json(automobiles)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

}

export default new AutomobileController()