import { Response, Request } from "express";
import { UpdateTextCase } from "./updateTextCase";
import { prismaClient } from "../../../service/prisma";
import { validateInput } from "../../../util/validateInput";
import { PrismaTextRepository } from "../../../repository/inPrisma/prismaTextRepository";

class UpdateTextController {
  async handle(req: Request, resp: Response) {
    const { textId } = req.params

    const { area, text, position, titulo } = req.body;

    validateInput([!!textId])

    const prismaTextRepository = new PrismaTextRepository(prismaClient);
    const updateTextsCase = new UpdateTextCase(prismaTextRepository);

    try {
      const updateText = await updateTextsCase.execute( {
        textId,
        data: {
          area, text, position, titulo
        }
      });
      return resp.json(updateText);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { UpdateTextController };
