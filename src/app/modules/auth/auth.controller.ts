import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authServices } from "./auth.services";
import { sendResponse } from "../../shared/sendResponse";
import { tokenUtils } from "../../utils/token";


const registerPatient = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    console.log(payload)
    const result = await authServices.registerPatient(payload)


    const { accessToken, refreshaToken, token, ...rest } = result
    tokenUtils.setAccessTokenCookie(res, accessToken)
    tokenUtils.setRefreshtokenCookie(res, refreshaToken)
    tokenUtils.setBetterAuthSessionCookie(res, token as string)

    sendResponse(res, {
        httpStatusCode: 201,
        success: true,
        data: {
            token,
            accessToken,
            refreshaToken,
            ...rest
        },
        message: "patient created successfully"
    })
})


const loginPatient = catchAsync(async (req: Request, res: Response) => {
    const paylaod = req.body
    const result = await authServices.loginUser(paylaod)

    const { accessToken, refreshaToken, token, ...rest } = result
    tokenUtils.setAccessTokenCookie(res, accessToken)
    tokenUtils.setRefreshtokenCookie(res, refreshaToken)
    tokenUtils.setBetterAuthSessionCookie(res, token)

    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        data: {
            token,
            accessToken,
            refreshaToken,
            ...rest,

        },
        message: "patient login successfully"
    })
})


export const AuthController = {
    registerPatient,
    loginPatient
}