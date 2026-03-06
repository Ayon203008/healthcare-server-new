import { ICreateDoctorPayload } from "./user.interface";
import { Specialty } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma";
import { auth } from "../../lib/auth";

const createDoctor = async (payload: ICreateDoctorPayload) => {

    // 1. Validate all specialties exist
    const specialties: Specialty[] = []
    for (const specialtyId of payload.specialties) {
        const specialty = await prisma.specialty.findUnique({
            where: { id: specialtyId }
        })
        if (!specialty) {
            throw new Error(`Specialty with id ${specialtyId} not found`)
        }
        specialties.push(specialty)
    }

    // 2. Check user doesn't already exist
    const userExists = await prisma.user.findUnique({
        where: { email: payload.doctor.email }
    })
    if (userExists) {
        throw new Error("User already exists")
    }

    // 3. Create auth user
    const userData = await auth.api.signUpEmail({
        body: {
            name: payload.doctor.name,
            email: payload.doctor.email,
            password: payload.password,
            needPasswordChanged: true
        }
    })

    // 4. Create doctor in transaction
    try {
        const result = await prisma.$transaction(async (tx) => {

            const doctor = await tx.doctor.create({
                data: {
                    userId: userData.user.id,        // ✅ fix: UserId → userId
                    name: payload.doctor.name,
                    email: payload.doctor.email,
                    contactNumber: payload.doctor.contactNumber,
                    address: payload.doctor.address,
                    registrationNumber: payload.doctor.registrationNumber,
                    experience: payload.doctor.experience,  // ✅ fix: expreience → experience
                    gender: payload.doctor.gender,
                    appointmentFee: payload.doctor.appointmentFee,
                    qualification: payload.doctor.qualification,
                    currentWorkingPlace: payload.doctor.currentWorkingPlace,
                    designation: payload.doctor.designation,
                    profilePhoto: payload.doctor.profilePhoto,
                }
            })

            await tx.doctorSpecialty.createMany({
                data: specialties.map(specialty => ({
                    doctorId: doctor.id,
                    specialtyId: specialty.id
                }))
            })

            return tx.doctor.findUnique({
                where: { id: doctor.id },
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
                    gender: true,
                    appointmentFee: true,
                    qualification: true,
                    currentWorkingPlace: true,
                    designation: true,
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
                    },
                    specialties: {              // ✅ fix: Specialties → specialties
                        select: {
                            specialty: {
                                select: {
                                    id: true,
                                    title: true
                                }
                            }
                        }
                    }
                }
            })
        })

        return result

    } catch (error) {
        await prisma.user.delete({
            where: { id: userData.user.id }
        })
        throw error
    }
}

export const userServices = {
    createDoctor
}