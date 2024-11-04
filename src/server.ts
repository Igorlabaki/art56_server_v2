import cors from "cors";
import Pusher from "pusher";
import "express-async-errors";
import { authRoutes } from "./router/auth";
import express, { NextFunction, Request, Response } from "express";
import { textRoutes } from "./router/text";
import { valueRoutes } from "./router/value";
import { questionRoutes } from "./router/question";
import { imageRoutes } from "./router/image";
import { orcamentoRoutes } from "./router/orcamento";
import { dateEventRoutes } from "./router/dateEvent";
import { emailRoutes } from "./router/email";
import { despesaRoutes } from "./router/despesa";
import { notificationRoutes } from "./router/notification";

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
app.use("/email", emailRoutes);
app.use("/despesa", despesaRoutes);
app.use("/question", questionRoutes);
app.use("/dateEvent", dateEventRoutes);
app.use("/orcamento", orcamentoRoutes);
app.use("/notification", notificationRoutes);

export const pusher = new Pusher({
  appId: "1887262",
  key: "244a09e8fab17da272e0",
  secret: "6cd34f1685b8348c5a3a",
  cluster: "sa1",
  useTLS: true
}); 

app.use((error: Error, req: Request, resp: Response, next: NextFunction) => {
  return resp.json({
    status: "Error",
    message: error.message,
  });
});

 export default app;
