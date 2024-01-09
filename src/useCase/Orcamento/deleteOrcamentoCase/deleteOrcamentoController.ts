import { Request, Response } from "express";
import { DeleteOrcamentotCase } from "./deleteOrcamentoCase";
import { PrismaOrcamentoRepository } from "../../../repository/inPrisma/prismaOrcamentoRepository";
import { prismaClient } from "../../../service/prisma";

class DeleteOrcamentoController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const { orcamentoId } = req.params;

    const prismaOrcamentoRepository = new PrismaOrcamentoRepository(
      prismaClient
    );
    const deleteOrcamentoCase = new DeleteOrcamentotCase(
      prismaOrcamentoRepository
    );

    try {
      const deleteOrcamento = await deleteOrcamentoCase.execute(orcamentoId);
      return resp.json(deleteOrcamento);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { DeleteOrcamentoController };
