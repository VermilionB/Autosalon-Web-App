import prisma from "../client/client.js";

class BodyTypesController {
    async getBodyTypes(req, res, next) {
        try {
            const bodyTypes = await prisma.body_types.findMany()
            res.status(200).json(bodyTypes)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }
}

export default new BodyTypesController()