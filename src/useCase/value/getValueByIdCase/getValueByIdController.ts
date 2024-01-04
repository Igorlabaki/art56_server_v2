import { Request, Response } from "express";
import { PrismaValueRepository } from "../../../repository/inPrisma/prismaValueRepository";
import { prismaClient } from "../../../service/prisma";
import { GetValueByIdCase } from "./getValueByIdCase";

class GetValueByIdController {
  /* constructor(private getValueByIdCase: GetValueByIdCase) {} */

  async handle(req: Request, resp: Response) {
    const { valueId } = req.params;

    const prismaValueRepository = new PrismaValueRepository(prismaClient);
    const getValueByIdCase = new GetValueByIdCase(prismaValueRepository);

    try {
      const valueById = await getValueByIdCase.execute(valueId);
      return resp.json(valueById);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetValueByIdController };
