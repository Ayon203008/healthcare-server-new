import { Request, Response } from "express"
import { catchAsync } from "../../shared/catchAsync"
import { sendResponse } from "../../shared/sendResponse"
import { doctorServices } from "./doctor.services"

const getAllDoctor=catchAsync(async (req: Request, res: Response) => {
    const result = await doctorServices.getAllDoctors()
    sendResponse(res,{
        httpStatusCode: 200,
        success: true,
        data: result,
        message:"doctor fetched successfully"
    })
})


export const doctorController = {
    getAllDoctor
}