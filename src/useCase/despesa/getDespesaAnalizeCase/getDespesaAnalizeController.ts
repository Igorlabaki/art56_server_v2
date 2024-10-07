import { Request, Response } from "express";

import { prismaClient } from "../../../service/prisma";
import { GetDepesaAnalizeCase } from "./getDespesaAnalizeCase";
import { PrismaDespesaRepository } from "../../../repository/inPrisma/prismaDespesaRepository";

class GetDespesaAnalizeController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const { despesaId } = req.params;

    const prismaDespesaRepository = new PrismaDespesaRepository(prismaClient);
    const getDespesaAnalizeCase = new GetDepesaAnalizeCase(prismaDespesaRepository);

    try {
      const despesaAnalize = await getDespesaAnalizeCase.execute();
      return resp.json(despesaAnalize);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetDespesaAnalizeController };
