import { Request, Response } from "express";

import { prismaClient } from "../../../service/prisma";
import { GetDepesaByIdCase } from "./getDespesaByIdCase";
import { PrismaDespesaRepository } from "../../../repository/inPrisma/prismaDespesaRepository";

class GetDespesaByIdController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const { despesaId } = req.params;

    const prismaDespesaRepository = new PrismaDespesaRepository(prismaClient);
    const getDespesaByIdCase = new GetDepesaByIdCase(prismaDespesaRepository);

    try {
      const despesaById = await getDespesaByIdCase.execute(despesaId);
      return resp.json(despesaById);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetDespesaByIdController };
