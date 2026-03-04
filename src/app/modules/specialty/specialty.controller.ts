/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Request, Response } from "express";
import { specialtyServices } from "./specialty.services";
import { catchAsync } from "../../shared/catchAsync";

const createSpecialty = catchAsync(
    async(req:Request,res:Response)=>{
        const result =await specialtyServices.createSpecialty(req.body)
        res.status(200).json({
            success: true,
            data: result
        })
    }
)

// * dont need of error  handeling anymore after using this function

const getAllSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const result = await specialtyServices.getAllSpecialty()
        res.status(200).json({
            success: true,
            data: result
        })
    }
)

const deleteSpecialty = catchAsync(
    async(req:Request,res:Response)=>{
        const {id}=req.params
        const result =await specialtyServices.deleteSpecialty(id as string)
        res.status(200).json({
            success: true,
            data: result
        })
    }
)

export const SpecialtyController = {
    createSpecialty,
    getAllSpecialty,
    deleteSpecialty
}