import { ICreateDoctorPayload } from "./user.interface";
import { Specialty } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma";
import { auth } from "../../lib/auth";
const createDoctor = async (paylod: ICreateDoctorPayload) => {
    const specialties: Specialty[] = []

    for (const specialtyId of paylod.speacialties) {
        const specilaty = await prisma.specialty.findUnique({
            where: {
                id: specialtyId
            }
        })
        if (!specilaty) {
            throw new Error("specialty not found")
        }
        specialties.push(specilaty)
    }
    const userExits = await prisma.user.findUnique({
        where: {
            email: paylod.doctor.email
        }
    })

    if (userExits) {
        throw new Error("User already exits")
    }

    const userData = await auth.api.signUpEmail({
        body: {
            name: paylod.doctor.name,
            email: paylod.doctor.email,
            password: paylod.doctor.password,
            needPasswordChanged: true
        }
    })

    try {
        const result = await prisma.$transaction(async (tx) => {
            const doctor = await tx.doctor.create({
                data: {
                    UserId: userData.user.id,
                    ...paylod.doctor,
                }
            })
            const doctorSpecialtyData = specialties.map(specialty => {
                return {
                    doctorId: doctor.id,
                    specialtyId: specialty.id
                }
            })
            await tx.doctorSpecialty.createMany({
                data: doctorSpecialtyData
            })

            const doctordata = await tx.doctor.findUnique({
                where: {
                    id: doctor.id
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profilePhoto: true,
                    contactNumber: true,
                    address: true,
                    isDeleted: true,
                    deletedAt: true,
                    registrationNumber: true,
                    expreience: true,
                    gender: true,
                    appointmentFee: true,
                    qualification: true,
                    currentWorkingPlace: true,
                    designation: true,
                    avaregeRating: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            emailVerified: true,
                            role: true,
                            status: true,                      
                            image: true,
                            createdAt: true,
                            updatedAt: true
                        }
                    }
                    ,
                    doctorSpecialties: {
                        select: {
                            specialty: {
                                select: {
                                    title: true,
                                    id: true
                                }
                            }
                        }
                    }
                }
            })
            return doctordata
        })
        return result
    } catch (error) {
        console.log(error)
        await prisma.user.delete({
            where: {
                id: userData.user.id
            }
        })
    }
}

export const userServices = {
    createDoctor
}