import { Request, Response } from "express";
import { PrismaPagamentoRepository } from "../../../repository/inPrisma/prismaPagamentoRepository";
import { prismaClient } from "../../../service/prisma";
import { DeletePagamentoCase } from "./deletePagamentoCase";
import { PrismaOrcamentoRepository } from "../../../repository/inPrisma/prismaOrcamentoRepository";

class DeletePagamentoController {
  /*  constructor(private deletePagamentoCase: DeletePagamentoCase) {} */

  async handle(req: Request, resp: Response) {
    const { pagamentoId } = req.params;

    const prismaPagamentoRepository = new PrismaPagamentoRepository(prismaClient);
    const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
    const deletePagamentoCase = new DeletePagamentoCase(prismaPagamentoRepository,prismaOrcamentoRepository);

    try {
      const deletePagamento = await deletePagamentoCase.execute(pagamentoId);
      return resp.json(deletePagamento);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { DeletePagamentoController };
