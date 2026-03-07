/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import status from "http-status"
import z from "zod"


interface TErrorSources {
    path: string,
    message: string
}




// * need at least 4 parameters
export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {

    const statusCode: number = status.INTERNAL_SERVER_ERROR
    const message: string = "Internal server error"


    res.status(statusCode).json({
        success: false,
        message: "something went wrong",
        error: error.message
    })
}