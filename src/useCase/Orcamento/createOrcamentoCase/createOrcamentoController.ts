import { Request, Response } from 'express';
import { IOrcamentoParams } from '../../../repository/IOrcamentoRepository';
import { CreateOrcamentoCase } from './createOrcamentoCase';
import { PrismaOrcamentoRepository } from '../../../repository/inPrisma/prismaOrcamentoRepository';
import { prismaClient } from '../../../service/prisma';

class CreateOrcamentoController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const data : IOrcamentoParams = req.body;

    const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
    const createOrcamentosCase = new CreateOrcamentoCase(prismaOrcamentoRepository);

    try {
      const newOrcamneto = await createOrcamentosCase.execute(data);
      return resp.json(newOrcamneto);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { CreateOrcamentoController };
