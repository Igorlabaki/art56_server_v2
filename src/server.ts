import cors from "cors";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { Server as SocketIOServer } from "socket.io";
import http from "http"; // Para criar o servidor HTTP necessário para o Socket.IO

// Importação das rotas
import { authRoutes } from "./router/auth";
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
const server = http.createServer(app); // Criação do servidor HTTP
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  },
});

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
}));
app.use(express.json());

// Uso das rotas
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

// Middleware de erro
app.use((error: Error, req: Request, resp: Response, next: NextFunction) => {
  return resp.json({
    status: "Error",
    message: error.message,
  });
});

// Configuração do WebSocket
io.on("connection", (socket) => {
  console.log("Novo cliente conectado:", socket.id);

  // Quando um novo orçamento for criado, emita uma atualização para todos os clientes
  socket.on("novoOrcamento", (data) => {
    console.log("novo orcamenot", data)
    io.emit("atualizacaoNotificacao", data); // Envia para todos os clientes conectados
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Exportação do servidor com WebSocket configurado
export { server, io };
