import { UpdateTextCase } from "./updateTextCase";
import { IUpdateTextParams } from "../../../repository/ITextRepository";
import { Response, Request } from "express";
import { PrismaTextRepository } from "../../../repository/inPrisma/prismaTextRepository";
import { prismaClient } from "../../../service/prisma";
import { validateInput } from "../../../util/validateInput";

class UpdateTextController {
  async handle(req: Request, resp: Response) {
    const { textId } = req.params

    const { area, text, position, titulo } = req.body;

    validateInput([!!textId])

    const prismaTextRepository = new PrismaTextRepository(prismaClient);
    const updateTextsCase = new UpdateTextCase(prismaTextRepository);

    const updateText = await updateTextsCase.execute( {
      textId,
      data: {
        area, text, position, titulo
      }
    } );

    return resp.json(updateText);
  }
}

export { UpdateTextController };
