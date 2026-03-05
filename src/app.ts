import express, { Application } from "express";
import { IndexRoutes } from "./app/routes";

const app: Application = express();
// app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1",IndexRoutes)



export default app;