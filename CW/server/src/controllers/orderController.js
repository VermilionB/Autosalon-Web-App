import {ApiError} from "../errors/ApiError.js";
import {
    deleteOrder,
    getOrderById,
    getOrders,
    createOrder,
    updateOrder,
    getOrdersByCustomerId
} from '../services/orderService.js'

class OrderController {
    async createOrder(req, res, next) {
        try {
            const order = await createOrder(req.body, next);
            res.status(200).json(order);
        } catch (err) {
            return next(ApiError.badRequest('Error while creating order'));
        }
    }

    async updateOrder(req, res, next) {
        try {
            const updatedOrder = await updateOrder(req.body, next)
            res.status(200).json(updatedOrder)
        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const deletedOrder = await deleteOrder(+req.params.id, next)
            res.status(200).json(deletedOrder)
        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async getOrders(req, res, next) {
        try {
            const orders = await getOrders(next)
            res.status(200).json(orders)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async getOrderById(req, res, next) {
        try {
            const orders = await getOrderById(+req.params.id, next)
            res.status(200).json(orders)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async getOrdersByCustomerId(req, res, next) {
        try {
            const orders = await getOrdersByCustomerId(+req.params.customerId, next)
            res.status(200).json(orders)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

}

export default new OrderController()