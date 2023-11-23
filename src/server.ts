import cors from "cors";
import "express-async-errors";
import { authRoutes } from "./router/auth";
import express, { NextFunction, Request, Response } from "express";
import { textRoutes } from "./router/text";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/text", textRoutes);

app.use((error: Error, req: Request, resp: Response, next: NextFunction) => {
  return resp.json({
    status: "Error",
    message: error.message,
  });
});

app.listen(3333, () => console.log("Server is running on port 3333"));
