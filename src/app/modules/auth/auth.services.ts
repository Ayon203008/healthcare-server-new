import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { tokenUtils } from "../../utils/token";
interface IRegisterPatientPayload {
    name: string,
    email: string,
    password: string
}

const registerPatient = async (payload: IRegisterPatientPayload) => {
    const { name, email, password } = payload
    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
        }
    })
    if (!data.user) {
        throw new Error("User not created")
    }

    // * Todo : create patient
    const patient = await prisma.$transaction(async(tx)=>{
        const patientTx=  await tx.patient.create({
            data: {
                userId: data.user.id,
                name:payload.name,
                email:payload.email
            }
        })
        return patientTx
    })
        const accessToken=tokenUtils.getAccessToken({
        userId:data.user.id,
        role:data.user.role,
        status:data.user.status,
        needPasswordChanged:data.user.needPasswordChanged,
        isDeleted:data.user.isDeleted,
        email:data.user.email,
        name:data.user.name,
    })


    const refreshaToken=tokenUtils.getRefreshToken({
        userId:data.user.id,
        role:data.user.role,
        status:data.user.status,
        needPasswordChanged:data.user.needPasswordChanged,
        isDeleted:data.user.isDeleted,
        email:data.user.email,
        name:data.user.name,
    })

    return {
        ...data,
        patient,
        accessToken,
        refreshaToken
    }

}

interface ILoginPayload {
    email: string,
    password: string
}

const loginUser=async(payload:ILoginPayload)=>{
    const {email,password}=payload
    const data = await auth.api.signInEmail({
        body: {
            email,
            password,
        }
    })


    const accessToken=tokenUtils.getAccessToken({
        userId:data.user.id,
        role:data.user.role,
        status:data.user.status,
        needPasswordChanged:data.user.needPasswordChanged,
        isDeleted:data.user.isDeleted,
        email:data.user.email,
        name:data.user.name,
    })


    const refreshaToken=tokenUtils.getRefreshToken({
        userId:data.user.id,
        role:data.user.role,
        status:data.user.status,
        needPasswordChanged:data.user.needPasswordChanged,
        isDeleted:data.user.isDeleted,
        email:data.user.email,
        name:data.user.name,
    })


    return {
        ...data,
        accessToken,
        refreshaToken
    }
}

export const authServices = {
    registerPatient,
    loginUser
}