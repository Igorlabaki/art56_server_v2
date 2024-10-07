import { Request, Response } from 'express';
import { PrismaDespesaRepository } from '../../../repository/inPrisma/prismaDespesaRepository';
import { prismaClient } from '../../../service/prisma';
import { ListDespesaCase } from './listDespesaCase';

class ListDespesasController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const { query } = req.params;

    const prismaDespesaRepository = new PrismaDespesaRepository(prismaClient);
    const listDespesaCase = new ListDespesaCase(prismaDespesaRepository);

    const despesaList = await listDespesaCase.execute(query);

    return resp.json(despesaList);
  }
}

export { ListDespesasController };
