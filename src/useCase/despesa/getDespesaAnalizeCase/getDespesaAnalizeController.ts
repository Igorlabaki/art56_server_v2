import { Request, Response } from "express";

import { prismaClient } from "../../../service/prisma";
import { GetDepesaAnalizeCase } from "./getDespesaAnalizeCase";
import { PrismaDespesaRepository } from "../../../repository/inPrisma/prismaDespesaRepository";
import { IAnalizeDespesasParams } from "../../../repository/IDespesaRepository";

class GetDespesaAnalizeController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const year : IAnalizeDespesasParams = req.query;

    const prismaDespesaRepository = new PrismaDespesaRepository(prismaClient);
    const getDespesaAnalizeCase = new GetDepesaAnalizeCase(prismaDespesaRepository);

    try {
      const despesaAnalize = await getDespesaAnalizeCase.execute(year);
      return resp.json(despesaAnalize);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetDespesaAnalizeController };
