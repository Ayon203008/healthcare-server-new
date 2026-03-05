import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { userServices } from "./user.services";
import { sendResponse } from "../../shared/sendResponse";

const createDoctor=catchAsync(async (req: Request, res: Response) => {
    const paylaod=req.body
    const result = await userServices.createDoctor(paylaod)
    sendResponse(res,{
        httpStatusCode: 201,
        success: true,
        data: result,
        message:"doctor created successfully"
    })
})

export const userController = {
    createDoctor
}
