import { Request, Response } from "express";

import { prismaClient } from "../../../service/prisma";
import { DeleteDespesatCase } from "./deleteDespesaCase";
import { PrismaDespesaRepository } from "../../../repository/inPrisma/prismaDespesaRepository";

class DeleteDespesaController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const { despesaId } = req.params;

    const prismaDespesaRepository = new PrismaDespesaRepository(prismaClient);
    const deleteDespesaCase = new DeleteDespesatCase(prismaDespesaRepository);

    try {
      const deletedDespesa = await deleteDespesaCase.execute(despesaId);
      return resp.json(deletedDespesa);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { DeleteDespesaController };
