import { Request, Response } from 'express';
import { UpdateDespesaCase } from './updateDespesaCase';
import { validateInput } from '../../../util/validateInput';
import { PrismaDespesaRepository } from '../../../repository/inPrisma/prismaDespesaRepository';
import { prismaClient } from '../../../service/prisma';
import { IDespesaParams } from '../../../repository/IDespesaRepository';

class UpdateDespesaController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const { despesaId } = req.params;
    const dataDespesa : IDespesaParams = req.body;

    validateInput([!!despesaId]);

    const prismaDespesaRepository = new PrismaDespesaRepository(prismaClient);
    const updateDespesasCase = new UpdateDespesaCase(
      prismaDespesaRepository
    );

    try {
      const updateDespesa = await updateDespesasCase.execute({data: dataDespesa, despesaId});
      return resp.json(updateDespesa);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { UpdateDespesaController };
