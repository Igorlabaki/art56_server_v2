import { Request, Response } from 'express';
import { ListOrcamentoParams } from '../../../repository/IOrcamentoRepository';
import { PrismaOrcamentoRepository } from '../../../repository/inPrisma/prismaOrcamentoRepository';
import { prismaClient } from '../../../service/prisma';
import { GetTrafegoCountCase } from './getTrafegoCount';


class GetTrafegoCountController {
  constructor() {}

  async handle(req: Request, resp: Response) {

    const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
    const getTrafegoCount = new GetTrafegoCountCase(prismaOrcamentoRepository);

    try {
      const trafegoCount = await getTrafegoCount.execute();
      return resp.json(trafegoCount);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetTrafegoCountController };
