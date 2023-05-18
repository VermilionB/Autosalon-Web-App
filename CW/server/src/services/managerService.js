import prisma from "../client/client.js";
import jwt from "jsonwebtoken";
import {ApiError} from "../errors/ApiError.js";
import bcrypt from "bcrypt";

const generateJwt = (id, name, surname, email, amountOfSoldCars, salary, address) => {
    return jwt.sign(
        {id, email, name, surname, amountOfSoldCars, salary, address, isManager: true},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}



const loginManager = async (data, next) => {
    const {email, password} = data

    const existingUserAuth = await prisma.user_auths.findFirst({
        where: {
            email: email
        }
    })

    if(!existingUserAuth) {
        return next(ApiError.internal('Manager not found'))
    }

    let comparePassword = bcrypt.compareSync(password, existingUserAuth.password)
    if (!comparePassword) {
        return next(ApiError.internal('Incorrect password'))
    }

    const existingManager = await prisma.managers.findFirst({
        where: {
            userAuthId: existingUserAuth.id
        },
        select: {
            id: true,
            name: true,
            surname: true,
            amountOfSoldCars: true,
            salary: true,
            address: true
        }
    })

    console.log(existingManager, '>>>>> manager')

    return generateJwt(existingManager.id, existingManager.name, existingManager.surname, existingUserAuth.email, existingManager.amountOfSoldCars, existingManager.salary, existingManager.address)
}


const getManagers = async () => {
    return await prisma.managers.findMany()
}

const getManagerById = async (id, next) => {
    try {
        return await prisma.managers.findUnique({
            where: {
                id: id
            },
            select: {
                name: true,
                surname: true,
                user_auths: {
                    select: {
                        email: true,
                        password: true
                    }
                },
                amountOfSoldCars: true,
                salary: true,
                address: true
            }
        })
    } catch (err) {
        return next(ApiError.internal(`[ERROR] Error while getting manager by id: ${err.message}`))

    }

}

const deleteManager = async (id, next) => {
    try {
        const deletedManager = await prisma.managers.delete({
            where: {
                id: id
            }
        })

        const deletedUserAuth = await prisma.user_auths.delete({
            where: {
                id: deletedManager.user_auths.id
            }
        })

        console.log(deletedManager, deletedUserAuth)

        return {
            manager: deletedManager,
            userAuth: deletedUserAuth
        }
    } catch (err) {
        return next(ApiError.internal(`[ERROR] Error while deleting manager: ${err.message}`))
    }
}
const updateManager = async (data, next) => {
    try {
        const {id, email, password, phone, surname, name, amountOfSoldCars, salary, address} = data
        const existingManager = await prisma.user_auths.findFirst({
            where: {
                id: id
            }
        })

        if (existingManager) {
            const userAuth = await prisma.user_auths.update({
                where: {
                    id: id
                },
                data: {
                    email: email,
                    password: password,
                    phone: phone
                }
            })

            return await prisma.managers.update({
                where: {
                    id: userAuth.id
                },
                data: {
                    surname: surname,
                    name: name,
                    amountOfSoldCars: amountOfSoldCars,
                    salary: salary,
                    address: address
                }
            })
        } else next(ApiError.internal(`[ERROR] No manager with such email`))
    } catch (err) {
        return next(ApiError.internal(`[ERROR] Error while updating manager: ${err.message}`))
    }

}

const registerManager = async (data, next) => {
    try {
        const {email, password, phone, surname, name, amountOfSoldCars, salary, address} = data
        const existingManager = await prisma.user_auths.findFirst({
            where: {
                email: email
            }
        })

        if (!existingManager) {
            const hashPassword = await bcrypt.hash(password, 10)
            const userAuth = await prisma.user_auths.create({
                data: {
                    email: email,
                    password: hashPassword,
                    phone: phone,
                }
            })

            const manager = await prisma.managers.create({
                data: {
                    surname: surname,
                    name: name,
                    amountOfSoldCars: amountOfSoldCars,
                    salary: salary,
                    address: address,
                    userAuthId: userAuth.id
                }
            })

            console.log(manager, userAuth)

            return generateJwt(manager.id, manager.name, manager.surname, userAuth.email, manager.amountOfSoldCars, manager.salary, manager.address)
        }
        else {
            return next(ApiError.badRequest('User with such email already exists'))
        }
    } catch (err) {
        return next(ApiError.internal('Failed to register customer'))
    }
}


export {
    registerManager,
    loginManager,
    getManagers,
    getManagerById,
    deleteManager,
    updateManager,
    generateJwt
}