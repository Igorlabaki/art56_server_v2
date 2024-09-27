import { Request, Response } from 'express';
import { ListOrcamentoAprovadoCase } from './listOrcamentoAprovadoCase';
import { ListOrcamentoParams } from '../../../repository/IOrcamentoRepository';
import { PrismaOrcamentoRepository } from '../../../repository/inPrisma/prismaOrcamentoRepository';
import { prismaClient } from '../../../service/prisma';


class ListOrcamentoAprovadoController {
  constructor() {}

  async handle(req: Request, resp: Response) {

    const query : ListOrcamentoParams = req.params;

    const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
    const listOrcamentoAprovadoCase = new ListOrcamentoAprovadoCase(prismaOrcamentoRepository);

    try {
      const orcamentoAprovadoList = await listOrcamentoAprovadoCase.execute(query);
      return resp.json(orcamentoAprovadoList);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { ListOrcamentoAprovadoController };
