import { Request, Response } from "express";
import { ListValuesCase } from "./listValueCase";
import { PrismaValueRepository } from "../../../repository/inPrisma/prismaValueRepository";
import { prismaClient } from "../../../service/prisma";

class ListValueController {
  constructor() {}

  async handle(req: Request, response: Response) {
    const { query } = req.params;

    const prismaValueRepository = new PrismaValueRepository(prismaClient);
    const listValueCase = new ListValuesCase(prismaValueRepository);

    const valueList = await listValueCase.execute(query);

    return response.json(valueList);
  }
}

export { ListValueController };
