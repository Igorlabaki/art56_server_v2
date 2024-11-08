import { Request, Response } from "express";
import { PrismaPagamentoRepository } from "../../../repository/inPrisma/prismaPagamentoRepository";
import { prismaClient } from "../../../service/prisma";
import { GetPagamentoByOrcamentoCase } from "./getPagamentoByOrcamentoCase";

class GetPagamentoByOrcamentoController {
  /* constructor(private getPagamentoByOrcamentoCase: GetPagamentoByOrcamentoCase) {} */

  async handle(req: Request, resp: Response) {
    const { orcamentoId } = req.params;

    const prismaPagamentoRepository = new PrismaPagamentoRepository(prismaClient);
    const getPagamentoByOrcamentoCase = new GetPagamentoByOrcamentoCase(prismaPagamentoRepository);

    try {
      const pagamentoByOrcamento = await getPagamentoByOrcamentoCase.execute(orcamentoId);
      return resp.json(pagamentoByOrcamento);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetPagamentoByOrcamentoController };
