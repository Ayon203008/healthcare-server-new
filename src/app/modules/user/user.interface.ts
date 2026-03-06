import { Gender } from "../../../generated/prisma/client"

export interface IDoctor {
    name: string
    email: string
    contactNumber?: string
    address?: string
    registrationNumber: string
    experience: number
    gender: Gender
    appointmentFee: number
    qualification: string
    currentWorkingPlace: string
    designation: string
    profilePhoto?: string
}

export interface ICreateDoctorPayload {
    password: string
    doctor: IDoctor
    specialties: string[]
}