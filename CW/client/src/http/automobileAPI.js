import {$host} from './index'


export const getAutomobiles = async () => {
    const {data} = await $host.get('api/automobiles')
    return data
}

export const getApprovedAutomobiles = async () => {
    const {data} = await $host.get('api/automobiles/approved')
    return data
}

export const getOneAutomobile = async (id) => {
    const {data} = await $host.get(`api/automobiles/${id}`)
    console.log(data)
    return data
}

export const createAutomobile = async (automobile, config) => {
    const {data} = await $host.post('api/automobiles', automobile, config)
    return data
}

export const updateAutomobile = async (id, approved) => {
    const {data} = await $host.patch('api/automobiles', {id, approved})
    return data
}

export const deleteAutomobile = async (id) => {
    const {data} = await $host.delete(`api/automobiles/${+id}`)
    return data
}
export const getBrands = async () => {
    const {data} = await $host.get('api/brands')
    return data
}
export const findModelsByBrand = async (brandId) => {
    const {data} = await $host.get(`api/models/brand/${brandId}`)
    return data
}

export const getFuelTypes = async () => {
    const {data} = await $host.get('api/fuelTypes')
    return data
}

export const getBodyTypes = async () => {
    const {data} = await $host.get('api/bodyTypes')
    return data
}
export const getEngineLayouts = async () => {
    const {data} = await $host.get('api/engineLayouts')
    return data
}