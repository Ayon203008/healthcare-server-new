import { NextFunction, Request, Response } from "express"
import z from "zod"

export const validateRequest = (zodShema: z.ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const parsedResult = zodShema.safeParse(req.body)
        if (!parsedResult.success) {
            next(parsedResult.error)
        }
        req.body = parsedResult.data
        next()
    }
}
