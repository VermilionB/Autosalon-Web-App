import prisma from "../client/client.js";

class FuelTypesController {
    async getFuelTypes(req, res, next) {
        try {
            const fuelTypes = await prisma.fuel_types.findMany()
            res.status(200).json(fuelTypes)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }
}

export default new FuelTypesController()