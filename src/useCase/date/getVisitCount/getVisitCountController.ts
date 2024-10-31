import { Request, Response } from 'express';
import { ListOrcamentoParams, MonthCountParams } from '../../../repository/IOrcamentoRepository';
import { PrismaOrcamentoRepository } from '../../../repository/inPrisma/prismaOrcamentoRepository';
import { prismaClient } from '../../../service/prisma';
import { GetVisitCountCase } from './getVisitCount';
import { PrismaDateEventRepository } from '../../../repository/inPrisma/prismaDateEventRepository';



class GetVisitCountController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const query : MonthCountParams = req.query;
    const prismaDateEventRepository = new PrismaDateEventRepository(prismaClient);
    const getVisitCount = new GetVisitCountCase(prismaDateEventRepository);

    try {
      const visitCount = await getVisitCount.execute(query);
      return resp.json(visitCount);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetVisitCountController };
