import prisma from "../client/client.js";
import {ApiError} from "../errors/ApiError.js"

const createModel = async (data, next) => {
    try {
        const brand = await prisma.brands.findFirst({
            where: {
                id: +data.brandId
            }
        })

        return await prisma.models.create({
            data: {
                model: data.model,
                brand: {
                    connect: {
                        id: brand.id
                    }
                }
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while creating model: ${err.message}`));
    }
};


const getModels = async (next) => {
    try {
        return await prisma.models.findMany()
    }
    catch (err) {
        next(ApiError.internal(`[ERROR] Error while getting models: ${err.message}`))
    }

}

const getModelById = async (id, next) => {
    try {
        return await prisma.models.findFirst({
            where: {
                id: +id
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while getting model by id: ${err.message}`))
    }
}

const deleteModel = async (id, next) => {
    try {
        return await prisma.models.delete({
            where: {
                id: +id
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while deleting model: ${err.message}`))
    }
}
const updateModel = async (data, next) => {
    try {
        return await prisma.models.update({
            where: {
                id: +data.id
            },
            data: {
                model: data.model
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while updating model: ${err.message}`))
    }
}

const getModelsByBrandId = async (id, next) => {
    try {
        return await prisma.models.findMany({
            where: {
                brandId: +id
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while getting models by brand id: ${err.message}`))
    }
}


export {
    createModel,
    getModels,
    getModelById,
    deleteModel,
    updateModel,
    getModelsByBrandId
}