import prisma from "../client/client.js";
import jwt from "jsonwebtoken";
import {ApiError} from "../errors/ApiError.js";
import bcrypt from "bcrypt";
import jwt_decode from "jwt-decode";

const generateJwt = (id, name, surname, email, isManager = false) => {
    return jwt.sign(
        {id, email, name, surname, isManager},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

const refreshJwt = (previousToken) => {
    const token = jwt_decode(previousToken)
    return generateJwt(token.id, token.name, token.surname, token.email, token.isManager)
}

const generateNullToken = () => {
    return jwt.sign(
        {existingCustomer: false},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

const registerCustomer = async (data, next, nextCalled) => {
    try {
        const {email, password, phone, surname, name} = data
        const existingCustomer = await prisma.user_auths.findFirst({
            where: {
                email: email
            }
        })

        if (!existingCustomer) {
            const hashPassword = await bcrypt.hash(password, 10)
            const userAuth = await prisma.user_auths.create({
                data: {
                    email: email,
                    password: hashPassword,
                    phone: phone,
                }
            })

            const customer = await prisma.customers.create({
                data: {
                    surname: surname,
                    name: name,
                    userAuthId: userAuth.id
                }
            })

            console.log(customer, userAuth)

            return generateJwt(customer.id, customer.name, customer.surname, userAuth.email)
        }
        else {
            nextCalled.value = true
            return next(ApiError.badRequest('User with such email already exists'))
        }
    } catch (err) {
        return next(ApiError.internal('Failed to register customer'))
    }
}

const loginCustomer = async (data, next, nextCalled) => {
    const {email, password} = data

    const existingUserAuth = await prisma.user_auths.findFirst({
        where: {
            email: email
        }
    })

    if(!existingUserAuth) {
        nextCalled.value = true
        return next(ApiError.internal('Customer not found'))
    }

    let comparePassword = bcrypt.compareSync(password, existingUserAuth.password)
    if (!comparePassword) {
        nextCalled.value = true
        return next(ApiError.internal('Incorrect password'))

    }

    const existingCustomer = await prisma.customers.findFirst({
        where: {
            userAuthId: existingUserAuth.id
        },
        select: {
            id: true,
            name: true,
            surname: true
        }
    })


    if (!existingCustomer) return generateNullToken()
    console.log(existingCustomer, ' customer')

    return generateJwt(existingCustomer.id, existingCustomer.name, existingCustomer.surname, existingUserAuth.email)
}


const getCustomers = async () => {
    return await prisma.customers.findMany()
}

const getCustomerById = async (id, next) => {
    try {
        return await prisma.customers.findUnique({
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
                }
            }
        })
    } catch (err) {
        return next(ApiError.internal(`[ERROR] Error while getting customer by id: ${err.message}`))

    }

}

const deleteCustomer = async (id, next) => {
    try {
        const deletedCustomer = await prisma.customers.delete({
            where: {
                id: id
            }
        })

        const deletedUserAuth = await prisma.user_auths.delete({
            where: {
                id: deletedCustomer.user_auths.id
            }
        })

        console.log(deletedCustomer, deletedUserAuth)

        return {
            customer: deletedCustomer,
            userAuth: deletedUserAuth
        }
    } catch (err) {
        return next(ApiError.internal(`[ERROR] Error while deleting customer: ${err.message}`))
    }
}
const updateCustomer = async (data, next) => {
    try {
        const {id, email, password, phone, surname, name} = data
        const existingCustomer = await prisma.user_auths.findFirst({
            where: {
                id: id
            }
        })

        if (existingCustomer) {
            const userAuth = await prisma.user_auths.update({
                where: {
                    id: id
                },
                data: {
                    email: email,
                    password: password,
                    phone: phone,
                }
            })

            return await prisma.customers.update({
                where: {
                    id: userAuth.id
                },
                data: {
                    surname: surname,
                    name: name,
                }
            })
        } else next(ApiError.internal(`[ERROR] No customer with such email`))
    } catch (err) {
        return next(ApiError.internal(`[ERROR] Error while updating customer: ${err.message}`))
    }

}


export {
    registerCustomer,
    loginCustomer,
    getCustomers,
    getCustomerById,
    deleteCustomer,
    updateCustomer,
    generateJwt,
    refreshJwt
}