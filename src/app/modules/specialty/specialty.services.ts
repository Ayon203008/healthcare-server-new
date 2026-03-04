import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
const createSpecialty = async (paylaod: Specialty): Promise<Specialty> => {
    const specialty = await prisma.specialty.create({
        data: paylaod
    })
    return specialty
}


const getAllSpecialty= async (): Promise<Specialty[]> => {
    const specialties = await prisma.specialty.findMany()
    return specialties
}


const deleteSpecialty= async (id:string): Promise<Specialty> => {
    const specialties = await prisma.specialty.delete({
        where: {id}
    })
    return specialties
}


export const specialtyServices = {
    createSpecialty,
    getAllSpecialty,
    deleteSpecialty
}