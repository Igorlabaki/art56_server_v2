import { Request, Response } from 'express';
import { IPagamentoParams } from '../../../repository/IPagamentoRepository';
import { PrismaPagamentoRepository } from '../../../repository/inPrisma/prismaPagamentoRepository';
import { prismaClient } from '../../../service/prisma';
import { CreatePagamentoCase } from './createPagamentoCase';

class CreatePagamentoController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const data: IPagamentoParams = req.body;

    const prismaPagamentoRepository = new PrismaPagamentoRepository(prismaClient);
    const createPagamentoCase = new CreatePagamentoCase(prismaPagamentoRepository);

    try {
      const newPagamento = await createPagamentoCase.execute(data);
      return resp.json(newPagamento);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { CreatePagamentoController };
