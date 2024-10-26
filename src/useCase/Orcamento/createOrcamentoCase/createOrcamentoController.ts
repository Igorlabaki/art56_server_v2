import { Request, Response } from 'express';
import { IOrcamentoParams } from '../../../repository/IOrcamentoRepository';
import { CreateOrcamentoCase } from './createOrcamentoCase';
import { PrismaOrcamentoRepository } from '../../../repository/inPrisma/prismaOrcamentoRepository';
import { prismaClient } from '../../../service/prisma';
import { PrismaNotificationRepository } from '../../../repository/inPrisma/prismaNotificationRepository';

class CreateOrcamentoController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const data : IOrcamentoParams = req.body;

    const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
    const prismaNotificationRepository = new PrismaNotificationRepository(prismaClient);
    const createOrcamentosCase = new CreateOrcamentoCase(prismaOrcamentoRepository,prismaNotificationRepository);

    try {
      const newOrcamneto = await createOrcamentosCase.execute(data);
      return resp.json(newOrcamneto);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { CreateOrcamentoController };
