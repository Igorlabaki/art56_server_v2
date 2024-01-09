import { Request, Response } from 'express';
import { ListOrcamentoCase } from './listOrcamentoCase';
import { ListOrcamentoParams } from '../../../repository/IOrcamentoRepository';
import { PrismaOrcamentoRepository } from '../../../repository/inPrisma/prismaOrcamentoRepository';
import { prismaClient } from '../../../service/prisma';


class ListOrcamentoController {
  constructor() {}

  async handle(req: Request, resp: Response) {

    const data : ListOrcamentoParams = req.body;

    const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
    const listOrcamentoCase = new ListOrcamentoCase(prismaOrcamentoRepository);

    try {
      const orcamentoList = await listOrcamentoCase.execute(data);
      return resp.json(orcamentoList);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { ListOrcamentoController };
