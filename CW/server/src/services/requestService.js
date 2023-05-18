import prisma from "../client/client.js";
import {ApiError} from "../errors/ApiError.js"

const createRequest = async (data, next) => {
    const {customerId, automobileId} = data

    try {
        const requestedAutomobile = await prisma.automobiles.findFirst({
            where: {
                id: automobileId
            }
        })

        if(requestedAutomobile){
            return await prisma.requests.create({
                data: {
                    customerId: +customerId,
                    automobileId: +automobileId
                }
            })
        }
        else next(ApiError.internal(`[ERROR] No requested automobile`));

    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while creating request: ${err.message}`));
    }
};


const getRequests = async (next) => {
    try {
        return await prisma.requests.findMany()
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while getting requests: ${err.message}`))
    }

}

const getRequestById = async (id, next) => {
    try {
        return await prisma.requests.findFirst({
            where: {
                id: +id
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while getting request by id: ${err.message}`))
    }
}

const getRequestByAutomobileId = async (automobileId, next) => {
    try {
        return await prisma.requests.findFirst({
            where: {
                automobileId: +automobileId
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while getting request by id: ${err.message}`))
    }
}

const getRequestsByCustomer = async (customerId, next) => {
    try {
        return await prisma.requests.findMany({
            where: {
                customerId: +customerId
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while getting requests by customer: ${err.message}`))
    }
}

const deleteRequest = async (id, next) => {
    try {
        return await prisma.requests.delete({
            where: {
                id: +id
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while deleting request: ${err.message}`))
    }
}
const updateRequest = async (data, next) => {
    try {
        return await prisma.requests.update({
            where: {
                id: +data.id
            },
            data: {
                status: data.status
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while updating request: ${err.message}`))
    }
}


export {
    createRequest,
    getRequests,
    getRequestById,
    deleteRequest,
    updateRequest,
    getRequestsByCustomer,
    getRequestByAutomobileId
}