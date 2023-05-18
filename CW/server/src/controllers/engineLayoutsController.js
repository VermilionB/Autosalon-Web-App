import prisma from "../client/client.js";

class EngineLayoutsController {
    async getBodyTypes(req, res, next) {
        try {
            const engineLayouts = await prisma.engine_layouts.findMany()
            res.status(200).json(engineLayouts)

        } catch (err) {
            console.error(err.message);
            res.status(500).json({message: err.message});
        }
    }
}

export default new EngineLayoutsController()