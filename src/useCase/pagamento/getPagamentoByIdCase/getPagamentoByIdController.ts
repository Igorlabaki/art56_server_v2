import { Request, Response } from "express";
import { PrismaPagamentoRepository } from "../../../repository/inPrisma/prismaPagamentoRepository";
import { prismaClient } from "../../../service/prisma";
import { GetPagamentoByIdCase } from "./getPagamentoByIdCase";

class GetPagamentoByIdController {
  /* constructor(private getPagamentoByIdCase: GetPagamentoByIdCase) {} */

  async handle(req: Request, resp: Response) {
    const { pagamentoId } = req.params;

    const prismaPagamentoRepository = new PrismaPagamentoRepository(prismaClient);
    const getPagamentoByIdCase = new GetPagamentoByIdCase(prismaPagamentoRepository);

    try {
      const pagamentoById = await getPagamentoByIdCase.execute(pagamentoId);
      return resp.json(pagamentoById);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetPagamentoByIdController };
