import prisma from "../client/client.js";
import {ApiError} from "../errors/ApiError.js"

const createOrder = async (data, next) => {
    const {customerId, managerId, automobileId, totalPrice, date} = data

    try {
        const alreadyOrderedAutomobile = await prisma.orders.findFirst({
            where: {
                automobileId
            }
        })

        if(!alreadyOrderedAutomobile) {
            return await prisma.orders.create({
                data: {
                    customerId,
                    managerId,
                    automobileId,
                    totalPrice,
                    date,
                    status: 0
                }
            })
        }
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while creating order: ${err.message}`));
    }
};


const getOrders = async (next) => {
    try {
        return await prisma.orders.findMany()
    }
    catch (err) {
        next(ApiError.internal(`[ERROR] Error while getting orders: ${err.message}`))
    }

}

const getOrderById = async (id, next) => {
    try {
        return await prisma.orders.findFirst({
            where: {
                id: +id
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while getting order by id: ${err.message}`))
    }
}

const deleteOrder = async (id, next) => {
    try {
        return await prisma.orders.delete({
            where: {
                id: +id
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while deleting order: ${err.message}`))
    }
}
const updateOrder = async (data, next) => {
    try {
        return await prisma.orders.update({
            where: {
                id: +data.id
            },
            data: {
                status: data.status
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while updating order: ${err.message}`))
    }
}

const getOrdersByCustomerId = async (customerId, next) => {
    try {
        return await prisma.orders.findMany({
            where: {
                customerId: +customerId
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while getting orders by customer: ${err.message}`))
    }
}




export {
    createOrder,
    getOrders,
    getOrderById,
    deleteOrder,
    updateOrder,
    getOrdersByCustomerId
}