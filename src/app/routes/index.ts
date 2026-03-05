import { Router } from "express";
import { SpecialtyRoutes } from "../modules/specialty/specialty.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
const router = Router()

router.use("/specialties",SpecialtyRoutes)

router.use('/auth',AuthRoutes)

export const IndexRoutes = router


