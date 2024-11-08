import { Request, Response } from "express";
import { IUpdatePagamentoParams } from "../../../repository/IPagamentoRepository";
import { validateInput } from "../../../util/validateInput";
import { UpdatePagamentoCase } from "./updatePagamentoCase";
import { PrismaPagamentoRepository } from "../../../repository/inPrisma/prismaPagamentoRepository";
import { prismaClient } from "../../../service/prisma";

class UpdatePagamentoController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const { pagamentoId } = req.params;
    const { dataPagamento, value } = req.body;

    validateInput([!!pagamentoId]);

    const prismaPagamentoRepository = new PrismaPagamentoRepository(
      prismaClient
    );
    const updatePagamentoCase = new UpdatePagamentoCase(
      prismaPagamentoRepository
    );

    try {
      const updatePagamento = await updatePagamentoCase.execute({
        pagamentoId,
        data: {
          value,
          dataPagamento,
        },
      });
      return resp.json(updatePagamento);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { UpdatePagamentoController };
