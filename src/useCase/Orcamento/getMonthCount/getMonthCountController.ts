import { Request, Response } from 'express';
import { ListOrcamentoParams, MonthCountParams } from '../../../repository/IOrcamentoRepository';
import { PrismaOrcamentoRepository } from '../../../repository/inPrisma/prismaOrcamentoRepository';
import { prismaClient } from '../../../service/prisma';
import { GetMonthCountCase } from './getMonthCount';


class GetMonthCountController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const year : MonthCountParams = req.query;
    const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
    const getMonthCount = new GetMonthCountCase(prismaOrcamentoRepository);

    try {
      const monthCount = await getMonthCount.execute(year);
      return resp.json(monthCount);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetMonthCountController };
