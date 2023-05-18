import {ApiError} from "../errors/ApiError.js";
import {
    deleteCustomer, refreshJwt,
    getCustomerById,
    getCustomers,
    loginCustomer,
    registerCustomer,
    updateCustomer
} from '../services/customerService.js'

class CustomerController {
    async register(req, res, next) {
        let nextCalled = {value : false }

        try {
            const token = await registerCustomer(req.body, next, nextCalled)
            if (!nextCalled.value) res.json({token})
        } catch (err) {
            return next(ApiError.badRequest('Error while register'))
        }
    }

    async updateCustomer(req, res, next) {
        try {
            const updatedCustomer = await updateCustomer(req.body, next)
            res.status(200).json(updatedCustomer)
        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async deleteCustomer(req, res, next) {
        try {
            const deletedCustomer = await deleteCustomer(+req.params.id, next)
            res.status(200).json(deletedCustomer)
        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async login(req, res, next) {
        let nextCalled = {value : false }
        try{
            const token = await loginCustomer(req.body, next, nextCalled)
            if (!nextCalled.value) res.json({token})
        } catch (err) {
            return next(ApiError.internal(`Error while login : ${err.message}`))
        }
    }

    async check(req, res, next) {
        const token = refreshJwt(req.headers.authorization.split(' ')[1])
        return res.json({token})
    }

    async getCustomers(req, res) {
        try {
            const customers = await getCustomers()
            res.status(200).json(customers)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async getCustomerById(req, res, next) {
        try {
            const customers = await getCustomerById(+req.params.id, next)
            res.status(200).json(customers)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

}

export default new CustomerController()