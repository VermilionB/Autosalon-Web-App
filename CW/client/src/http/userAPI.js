import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, phone, surname, name) => {
    console.log({email, password, phone, surname, name})
    const {data} = await $host.post('api/customers/registration', {email, password, phone, surname, name})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/customers/login', {email, password})

    if (jwt_decode(data.token).existingCustomer === false) {
        const {data} = await $host.post('api/managers/login', {email, password})
        localStorage.setItem('token', data.token)

        console.log(data)
        console.log(jwt_decode(data.token))

        return jwt_decode(data.token)
    }
    else {
        console.log(data)
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }
}

export const check = async () => {
    const {data} = await $authHost.get('api/customers/auth' )
    const isManager = jwt_decode(data.token).isManager
    console.log(isManager)

    if (data && !isManager) {
        console.log(data)
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }
    else {
        const {data} = await $authHost.get('api/managers/auth' )
        console.log(data)
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }
}

export const getAllManagers = async () => {
    const {data} = await $host.get('api/managers')
    return data
}

export const getAllCustomers = async () => {
    const {data} = await $host.get('api/customers')
    return data
}