import jwt from "jsonwebtoken"

export default function (req,res,next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (token === "null") {
            return res.status(401).json({message: "Unauthorized"})
        }
        req.user = jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch (e) {
        res.status(401).json({message: "Unauthorized"})
    }
}