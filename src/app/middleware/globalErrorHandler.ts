/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"

// * need at least 4 parameters
export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        success: false,
        message: "something went wrong",
        error: error.message
    })
}