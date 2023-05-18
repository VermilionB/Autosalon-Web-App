import prisma from "../client/client.js";
import {ApiError} from "../errors/ApiError.js"

const createBrand = async (data, next) => {
    try {
        return await prisma.brands.create({
            data: {
                brand: data.brand
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while creating brand: ${err.message}`));
    }
};


const getBrands = async (next) => {
    try {
        return await prisma.brands.findMany()
    }
    catch (err) {
        next(ApiError.internal(`[ERROR] Error while getting brands: ${err.message}`))
    }

}

const getBrandById = async (id, next) => {
    try {
        return await prisma.brands.findFirst({
            where: {
                id: +id
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while getting brand by id: ${err.message}`))
    }
}

const deleteBrand = async (id, next) => {
    try {
        return await prisma.brands.delete({
            where: {
                id: +id
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while deleting brand: ${err.message}`))
    }
}
const updateBrand = async (data, next) => {
    try {
        return await prisma.brands.update({
            where: {
                id: +data.id
            },
            data: {
                brand: data.brand
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while updating brand: ${err.message}`))
    }
}




export {
    createBrand,
    getBrands,
    getBrandById,
    deleteBrand,
    updateBrand
}