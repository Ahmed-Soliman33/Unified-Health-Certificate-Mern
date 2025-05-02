import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./controller/errorController";
import AppError from "./utils/AppError";
import userRouter from "./routes/userRouter";

const app = express();

// Middlewares
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "24mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(cors({ credentials: true, origin: true }));

// Routers
app.use("/users", userRouter);

// Error Handler Middleware
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);
export default app;
