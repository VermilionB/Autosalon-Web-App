import {ApiError} from "../errors/ApiError.js";
import {
    deleteBrand,
    getBrandById,
    getBrands,
    createBrand,
    updateBrand
} from '../services/brandService.js'

class BrandController {
    async createBrand(req, res, next) {
        try {
            const brand = await createBrand(req.body, next);
            res.status(200).json(brand);
        } catch (err) {
            return next(ApiError.badRequest('Error while creating brand'));
        }
    }

    async updateBrand(req, res, next) {
        try {
            const updatedBrand = await updateBrand(req.body, next)
            res.status(200).json(updatedBrand)
        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async deleteBrand(req, res, next) {
        try {
            const deletedBrand = await deleteBrand(+req.params.id, next)
            res.status(200).json(deletedBrand)
        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async getBrands(req, res, next) {
        try {
            const brands = await getBrands(next)
            res.status(200).json(brands)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

    async getBrandById(req, res, next) {
        try {
            const brands = await getBrandById(+req.params.id, next)
            res.status(200).json(brands)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }

}

export default new BrandController()