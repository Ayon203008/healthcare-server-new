import { Router } from "express";
import { SpecialtyRoutes } from "../modules/specialty/specialty.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.route";
import { DoctorRoutes } from "../modules/doctor/doctor.routes";

const router = Router()

router.use("/specialties",SpecialtyRoutes)

router.use('/auth',AuthRoutes)

router.use("/users",UserRoutes)

router.use("/doctors",DoctorRoutes)

export const IndexRoutes = router


