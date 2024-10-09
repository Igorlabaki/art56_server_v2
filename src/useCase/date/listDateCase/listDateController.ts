import { Request, Response } from 'express';
import { PrismaDateEventRepository } from '../../../repository/inPrisma/prismaDateEventRepository';
import { prismaClient } from '../../../service/prisma';
import { ListDateEventCase } from './listDateCase';
import { GetListDateEventParams } from '../../../repository/IDateEventRepository';

class ListDateController {
  constructor() {}

  async handle(req: Request, resp: Response) {

    const  query : GetListDateEventParams = req.query;

    const prismaOrcamentoRepository = new PrismaDateEventRepository(prismaClient);
    const listDateEventCase = new ListDateEventCase(prismaOrcamentoRepository);

    try {
      const listDateEvent = await listDateEventCase.execute(query);
      return resp.json(listDateEvent);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { ListDateController };
