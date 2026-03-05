/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";
import { envVars } from "./config/env";
import status from "http-status";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";

const app: Application = express();
// app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", IndexRoutes)

// * global errror handler

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(globalErrorHandler)

app.use(notFound)

export default app;