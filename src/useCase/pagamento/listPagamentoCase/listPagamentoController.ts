import { Request, Response } from "express";
import { ListPagamentosCase } from "./listPagamentoCase";
import { PrismaPagamentoRepository } from "../../../repository/inPrisma/prismaPagamentoRepository";
import { prismaClient } from "../../../service/prisma";

class ListPagamentoController {
  constructor() {}

  async handle(req: Request, response: Response) {
    const { query } = req.params;

    const prismaPagamentoRepository = new PrismaPagamentoRepository(prismaClient);
    const listPagamentoCase = new ListPagamentosCase(prismaPagamentoRepository);

    const pagamentoList = await listPagamentoCase.execute(query);

    return response.json(pagamentoList);
  }
}

export { ListPagamentoController };
