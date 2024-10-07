import { Request, Response } from 'express';

import { prismaClient } from '../../../service/prisma';
import { CreateDespesaCase } from './despesaOrcamentoCase';
import { IDespesaParams } from '../../../repository/IDespesaRepository';
import { PrismaDespesaRepository } from '../../../repository/inPrisma/prismaDespesaRepository';

class CreateDespesaController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const data : IDespesaParams = req.body;

    const prismaDespesaRepository = new PrismaDespesaRepository(prismaClient);
    const createDespesasCase = new CreateDespesaCase(prismaDespesaRepository);

    try {
      const newDespesa = await createDespesasCase.execute(data);
      return resp.json(newDespesa);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { CreateDespesaController };
