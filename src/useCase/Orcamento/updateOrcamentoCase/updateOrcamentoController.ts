import { Request, Response } from "express";
import { UpdateOrcamentoParams } from "../../../repository/IOrcamentoRepository";
import { PrismaOrcamentoRepository } from "../../../repository/inPrisma/prismaOrcamentoRepository";
import { prismaClient } from "../../../service/prisma";
import { UpdateOrcamentoCase } from "./updateOrcamentoCase";
import { PrismaValueRepository } from "../../../repository/inPrisma/prismaValueRepository";

class UpdateOrcamentoController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const {orcamentoId} = req.params
    const data  = req.body;

    const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
    const prismaValueRepository = new PrismaValueRepository(prismaClient);
    const updateOrcamentoCase = new UpdateOrcamentoCase(prismaOrcamentoRepository,prismaValueRepository);

    try {
      const newOrcamneto = await updateOrcamentoCase.execute({orcamentoId, data});
      return resp.json(newOrcamneto);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { UpdateOrcamentoController };
