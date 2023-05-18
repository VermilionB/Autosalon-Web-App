import {$host} from './index'


export const getAllRequests = async () => {
    const {data} = await $host.get('api/requests')
    return data
}

export const getRequestsByCustomer = async (customerId) => {
    const {data} = await $host.get(`api/requests/${+customerId}`)
    console.log(data)
    return data
}

export const findRequestId = async (automobileId) => {
    const {data} = await $host.get(`api/requests/automobile/${automobileId}`)
    return data
}

export const createRequest = async (request) => {
    const {data} = await $host.post('api/requests', request)
    return data
}

export const updateRequest = async (result) => {
    const {data} = await $host.put('api/requests', result)
    return data
}

export const deleteRequest = async (id) => {
    const {data} = await $host.delete(`api/requests/${+id}`)
    return data
}