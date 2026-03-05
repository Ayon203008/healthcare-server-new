import { Router } from "express";
import { SpecialtyRoutes } from "../modules/specialty/specialty.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.route";
const router = Router()

router.use("/specialties",SpecialtyRoutes)

router.use('/auth',AuthRoutes)

router.use("/doctors",UserRoutes)

export const IndexRoutes = router


