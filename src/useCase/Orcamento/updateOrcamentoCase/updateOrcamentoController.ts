import { Request, Response } from "express";
import { UpdateOrcamentoParams } from "../../../repository/IOrcamentoRepository";
import { PrismaOrcamentoRepository } from "../../../repository/inPrisma/prismaOrcamentoRepository";
import { prismaClient } from "../../../service/prisma";
import { UpdateOrcamentoCase } from "./updateOrcamentoCase";

class UpdateOrcamentoController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const data : UpdateOrcamentoParams = req.body;

    const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
    const updateOrcamentoCase = new UpdateOrcamentoCase(prismaOrcamentoRepository);

    try {
      const newOrcamneto = await updateOrcamentoCase.execute(data);
      return resp.json(newOrcamneto);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { UpdateOrcamentoController };
