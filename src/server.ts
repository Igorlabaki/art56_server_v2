import cors from "cors";
import "express-async-errors";
import { authRoutes } from "./router/auth";
import express, { NextFunction, Request, Response } from "express";
import { textRoutes } from "./router/text";
import { valueRoutes } from "./router/value";
import { questionRoutes } from "./router/question";
import { imageRoutes } from "./router/image";
import { orcamentoRoutes } from "./router/orcamento";

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
app.use("/value", valueRoutes);
app.use("/image", imageRoutes);
app.use("/question", questionRoutes);
app.use("/orcamento", orcamentoRoutes);

app.use((error: Error, req: Request, resp: Response, next: NextFunction) => {
  return resp.json({
    status: "Error",
    message: error.message,
  });
});

 export default app;
