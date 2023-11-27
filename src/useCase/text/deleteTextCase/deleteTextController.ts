import { Request, Response } from "express";
import { PrismaTextRepository } from "../../../repository/inPrisma/prismaTextRepository";
import { prismaClient } from "../../../service/prisma";
import { DeleteTextCase } from "./deleteTextCase";

class DeleteTextController {
  /*  constructor(private deleteTextCase: DeleteTextCase) {} */

  async handle(req: Request, resp: Response) {
    const { textId } = req.params;

    const prismaTextRepository = new PrismaTextRepository(prismaClient);
    const deleteTextCase = new DeleteTextCase(prismaTextRepository);

    try {
      const deleteText = await deleteTextCase.execute(textId);
      return resp.json(deleteText);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { DeleteTextController };
