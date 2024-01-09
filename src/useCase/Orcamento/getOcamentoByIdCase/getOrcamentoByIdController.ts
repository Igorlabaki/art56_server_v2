import { Request, Response } from "express";
import { PrismaOrcamentoRepository } from "../../../repository/inPrisma/prismaOrcamentoRepository";
import { prismaClient } from "../../../service/prisma";
import { GetOrcamentoByIdCase } from "./getOrcamentoByIdCase";

class GetOrcamentoByIdController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const { orcaementoId } = req.params;

    const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
    const getOrcamentoByIdCase = new GetOrcamentoByIdCase(prismaOrcamentoRepository);

    try {
      const orcamentoById = await getOrcamentoByIdCase.execute(orcaementoId);
      return resp.json(orcamentoById);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetOrcamentoByIdController };
