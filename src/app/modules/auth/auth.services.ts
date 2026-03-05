import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
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
    return {
        ...data,
        patient
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

    return data
}

export const authServices = {
    registerPatient,
    loginUser
}