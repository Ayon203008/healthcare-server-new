import { NextFunction, Request, Response, Router } from "express";
import { SpecialtyController } from "./specialty.controller";
import { cookieUtils } from "../../routes/cookie";
import { jwtUtils } from "../../utils/jwt";
const router = Router()

router.post("/", SpecialtyController.createSpecialty)

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = cookieUtils.getCookie(req, 'accessToken')
        if (!accessToken) {
            throw new Error("unauthorized")
        }
        const verifiedToken = jwtUtils.verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET as string)
        if (!verifiedToken.success) {
            throw new Error("unauthorized")
        }
        if(verifiedToken.data!.role !== "ADMIN"){
            throw new Error("unauthorized")
        }
        next()
    } catch (error) {
        next(error)
    }
}, SpecialtyController.getAllSpecialty)

router.delete("/:id", SpecialtyController.deleteSpecialty)



export const SpecialtyRoutes = router