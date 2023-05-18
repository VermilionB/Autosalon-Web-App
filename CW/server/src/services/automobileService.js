import prisma from "../client/client.js";
import {v4 as uuidv4} from 'uuid';
import path from 'path'
import {ApiError} from "../errors/ApiError.js"
import fs from 'fs'

const __dirname = path.resolve();

const createAutomobile = async (data, images, next) => {
    try {
        const {color, price, approved, modelId, power, mileage, releaseDate, engineSize, fuelType, bodyType, engineLayout, description} = data;

        const imageIds = [];
        for (const img of images) {
            const image = await prisma.images.create({
                data: {
                    image: img,
                }
            });
            imageIds.push(image.id);
        }




        const techDetail = await prisma.tech_details.create({
            data: {
                power: +power,
                mileage: +mileage,
                releaseDate: new Date(releaseDate),
                engineSize: engineSize,
                fuelTypeId: +fuelType,
                bodyTypeId: +bodyType,
                engineLayoutId: +engineLayout
            }
        });

        return await prisma.automobiles.create({
            data: {
                color: color,
                price: +price,
                approved: !!approved,
                modelId: +modelId,
                techDetailId: techDetail.id,
                images: {
                    connect: imageIds.map(id => ({id}))
                },
                description: description
            },
            include: {
                images: true
            }
        });
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while creating automobile: ${err.message}`));
    }
};


const getAutomobiles = async (next) => {
    try {
        return await prisma.automobiles.findMany({
            select: {
                id: true,
                models: {
                    select: {
                        model: true,
                        brands: {
                            select: {
                                brand: true
                            }
                        }
                    }
                },
                color: true,
                price: true,
                images: {
                    select: {
                        image:true
                    }
                },
                approved: true,
                tech_details: {
                    select: {
                        power: true,
                        mileage: true,
                        releaseDate: true,
                        engineSize: true,
                        fuel_types: {
                            select: {
                                fuelType: true
                            }
                        },
                        body_types: {
                            select: {
                                bodyType: true
                            }
                        },
                        engine_layouts: {
                            select: {
                                engineLayout: true
                            }
                        }
                    }
                },
                description: true
            }
        })
    }
    catch (err) {
        next(ApiError.internal(`[ERROR] Error while getting automobiles: ${err.message}`))
    }

}

const getApprovedAutomobiles = async (next) => {
    try {
        return await prisma.automobiles.findMany({
            where: {
                approved: true
            },
            select: {
                id: true,
                models: {
                    select: {
                        model: true,
                        brands: {
                            select: {
                                brand: true
                            }
                        }
                    }
                },
                color: true,
                price: true,
                images: {
                    select: {
                        image:true
                    }
                },
                approved: true,
                tech_details: {
                    select: {
                        power: true,
                        mileage: true,
                        releaseDate: true,
                        engineSize: true,
                        fuel_types: {
                            select: {
                                fuelType: true
                            }
                        },
                        body_types: {
                            select: {
                                bodyType: true
                            }
                        },
                        engine_layouts: {
                            select: {
                                engineLayout: true
                            }
                        }
                    }
                },
                description: true
            }
        })
    }
    catch (err) {
        next(ApiError.internal(`[ERROR] Error while getting approved automobiles: ${err.message}`))
    }

}


const getAutomobileById = async (id, next) => {
    try {
        return await prisma.automobiles.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                models: {
                    select: {
                        model: true,
                        brands: {
                            select: {
                                brand: true
                            }
                        }
                    }
                },
                color: true,
                price: true,
                images: {
                    select: {
                        image:true
                    }
                },
                approved: true,
                tech_details: {
                    select: {
                        power: true,
                        mileage: true,
                        releaseDate: true,
                        engineSize: true,
                        fuel_types: {
                            select: {
                                fuelType: true
                            }
                        },
                        body_types: {
                            select: {
                                bodyType: true
                            }
                        },
                        engine_layouts: {
                            select: {
                                engineLayout: true
                            }
                        }
                    }
                },
                description: true
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while getting automobile by id: ${err.message}`))

    }

}

const deleteAutomobile = async (id, next) => {
    try {
        return await prisma.automobiles.delete({
            where: {
                id: id
            },
            include: {
                tech_details: true
            },
            select: {
                id: true,
                techDetailId: true,
                modelId: true
            }
        })
    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while deleting automobile: ${err.message}`))
    }
}
const updateAutomobile = async (data, next) => {
    try {
        return await prisma.automobiles.update({
            where: {id: +data.id},
            data: {
                approved: data.approved
            }
        })


    } catch (err) {
        next(ApiError.internal(`[ERROR] Error while updating automobile: ${err.message}`))
    }
}




export {
    createAutomobile,
    getAutomobiles,
    getAutomobileById,
    deleteAutomobile,
    updateAutomobile,
    getApprovedAutomobiles
}