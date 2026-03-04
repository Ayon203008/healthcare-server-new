/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { specialtyServices } from "./specialty.services";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

const createSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const result = await specialtyServices.createSpecialty(req.body)
        sendResponse(res,{
            httpStatusCode: 201,
            success: true,
            data: result,
            message:"specialty created successfully"
        })
    }
)


// * dont need of error  handeling anymore after using this function

const getAllSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const result = await specialtyServices.getAllSpecialty()
        sendResponse(res,{
            httpStatusCode: 200,
            success: true,
            data: result,
            message:"specialty get successfully"
        })
    }
)


const deleteSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params
        const result = await specialtyServices.deleteSpecialty(id as string)
        sendResponse(res,{
            httpStatusCode: 200,
            success: true,
            data: result,
            message:"specialty deleted successfully"
        })
    }
)


export const SpecialtyController = {
    createSpecialty,
    getAllSpecialty,
    deleteSpecialty
}