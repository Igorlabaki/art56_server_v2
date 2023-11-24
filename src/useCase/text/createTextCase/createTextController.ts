import { Request, Response } from "express";
import { CreateTextCase } from "./createTextCase";
import { prismaClient } from "../../../service/prisma";
import { validateInput } from "../../../util/validateInput";
import { ITextParams } from "../../../repository/ITextRepository";
import { PrismaTextRepository } from "../../../repository/inPrisma/prismaTextRepository";
class CreateTextController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const { area, position, text, titulo }: ITextParams = req.body;

    // Validate input
    validateInput([!!area, !!position, !!text, !!titulo]);

    const prismaTextRepository = new PrismaTextRepository(prismaClient);
    const createTextsCase = new CreateTextCase(prismaTextRepository);

    const newText = await createTextsCase.execute({
      area,
      position,
      text,
      titulo,
    });

    return resp.json(newText);
  }
}

export { CreateTextController };
