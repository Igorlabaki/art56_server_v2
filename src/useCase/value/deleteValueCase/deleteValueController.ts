import { Request, Response } from "express";
import { PrismaValueRepository } from "../../../repository/inPrisma/prismaValueRepository";
import { prismaClient } from "../../../service/prisma";
import { DeleteValueCase } from "./deleteValueCase";

class DeleteValueController {
  /*  constructor(private deleteValueCase: DeleteValueCase) {} */

  async handle(req: Request, resp: Response) {
    const { valueId } = req.params;

    const prismaValueRepository = new PrismaValueRepository(prismaClient);
    const deleteValueCase = new DeleteValueCase(prismaValueRepository);

    try {
      const deleteValue = await deleteValueCase.execute(valueId);
      return resp.json(deleteValue);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { DeleteValueController };
