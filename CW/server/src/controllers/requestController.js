import {ApiError} from "../errors/ApiError.js";
import {
    deleteRequest,
    getRequestById,
    getRequests,
    createRequest,
    updateRequest,
    getRequestsByCustomer,
    getRequestByAutomobileId
} from '../services/requestService.js'

class RequestController {
    async createRequest(req, res, next) {
        try {
            const request = await createRequest(req.body, next);
            res.status(200).json(request);
        } catch (err) {
            return next(ApiError.badRequest('Error while creating request'));
        }
    }

    async updateRequest(req, res, next) {
        try {
            const updatedRequest = await updateRequest(req.body, next)
            res.status(200).json(updatedRequest)
        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async deleteRequest(req, res, next) {
        try {
            const deletedRequest = await deleteRequest(+req.params.id, next)
            res.status(200).json(deletedRequest)
        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async getRequests(req, res, next) {
        try {
            const requests = await getRequests(next)
            res.status(200).json(requests)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async getRequestById(req, res, next) {
        try {
            const requests = await getRequestById(+req.params.id, next)
            res.status(200).json(requests)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async getRequestsByCustomer(req, res, next) {
        try {
            const requests = await getRequestsByCustomer(+req.params.customerId, next)
            res.status(200).json(requests)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async getRequestByAutomobileId(req, res, next) {
        try {
            const requests = await getRequestByAutomobileId(+req.params.automobileId, next)
            res.status(200).json(requests)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

}

export default new RequestController()