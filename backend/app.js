import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.config.js";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import superAdminRouter from "./routes/superadmin/superadmin.routes.js";

dotenv.config();

const app = express();

connectToDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(helmet());

app.use("/sadmin", superAdminRouter);

export default app;
