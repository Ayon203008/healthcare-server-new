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
    // const patient = await prisma.$transaction(async(tx)=>{
    //     a
    // })
    return data

}

export const authServices = {
    registerPatient
}