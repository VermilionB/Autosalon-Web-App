import {$authHost, $host} from './index'

export const makeOrder = async (order) => {
    const {data} = $host.post('api/orders', order)
    return data
}

export const getAllOrders = async () => {
    const {data} = await $host.get('api/orders')
    return data
}

export const updateOrder = async (id, status) => {
    const {data} = await $authHost.patch('api/orders', {id, status})
    return data
}

export const deleteOrder = async (id) => {
    const {data} = await $host.delete(`api/orders/${+id}`)
    return data
}

export const getOrdersByCustomer = async (customerId) => {
    const {data} = await $host.get(`api/orders/customer/${+customerId}`)
    return data
}