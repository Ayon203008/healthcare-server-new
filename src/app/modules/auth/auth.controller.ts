import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authServices } from "./auth.services";
import { sendResponse } from "../../shared/sendResponse";


const registerPatient = catchAsync(async (req: Request, res: Response) => {
    const payload=req.body
    console.log(payload)
    const result = await authServices.registerPatient(payload)
    sendResponse(res,{
        httpStatusCode: 201,
        success: true,
        data: result,
        message:"patient created successfully"
    })
})


const loginPatient = catchAsync(async(req:Request,res:Response)=>{
    const paylaod=req.body
    const result = await authServices.loginUser(paylaod)
    sendResponse(res,{
        httpStatusCode: 200,
        success: true,
        data: result,
        message:"patient login successfully"
    })
})


export const AuthController = {
    registerPatient,
    loginPatient
}