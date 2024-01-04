import { Request, Response } from "express";
import { PrismaValueRepository } from "../../../repository/inPrisma/prismaValueRepository";
import { prismaClient } from "../../../service/prisma";
import { GetValueByTituloCase } from "./getValueByTituloCase";

class GetValueByTituloController {
  /* constructor(private getValueByTituloCase: GetValueByTituloCase) {} */

  async handle(req: Request, resp: Response) {
    const { titulo } = req.params;

    const prismaValueRepository = new PrismaValueRepository(prismaClient);
    const getValueByTituloCase = new GetValueByTituloCase(prismaValueRepository);

    try {
      const valueByTitulo = await getValueByTituloCase.execute(titulo);
      return resp.json(valueByTitulo);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetValueByTituloController };
