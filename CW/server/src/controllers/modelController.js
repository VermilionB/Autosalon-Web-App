import {ApiError} from "../errors/ApiError.js";
import {
    deleteModel,
    getModelById,
    getModels,
    createModel,
    updateModel, getModelsByBrandId
} from '../services/modelService.js'
class ModelController {
    async createModel(req, res, next) {
        try {
            const model = await createModel(req.body, next);
            res.status(200).json(model);
        } catch (err) {
            return next(ApiError.badRequest('Error while creating model'));
        }
    }

    async updateModel(req, res, next) {
        try {
            const updatedModel = await updateModel(req.body, next)
            res.status(200).json(updatedModel)
        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async deleteModel(req, res, next) {
        try {
            const deletedModel = await deleteModel(+req.params.id, next)
            res.status(200).json(deletedModel)
        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async getModels(req, res, next) {
        try {
            const models = await getModels(next)
            res.status(200).json(models)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async getModelById(req, res, next) {
        try {
            const models = await getModelById(+req.params.id, next)
            res.status(200).json(models)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async getModelsByBrandId(req, res, next) {
        try {
            const models = await getModelsByBrandId(+req.params.id, next)
            res.status(200).json(models)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }
}

export default new ModelController()