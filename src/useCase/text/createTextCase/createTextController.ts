import { Request, Response } from "express";
import { CreateTextCase } from "./createTextCase";
import { prismaClient } from "../../../service/prisma";
import { validateInput } from "../../../util/validateInput";
import { ITextParams } from "../../../repository/ITextRepository";
import { PrismaTextRepository } from "../../../repository/inPrisma/prismaTextRepository";
class CreateTextController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const data: ITextParams = req.body;

    const prismaTextRepository = new PrismaTextRepository(prismaClient);
    const createTextsCase = new CreateTextCase(prismaTextRepository);

    try {
      const newText = await createTextsCase.execute(data);
      return resp.json(newText);
    } catch (error) {
      if (error instanceof Error) {
        return resp.status(400).json({ error: error.message });
      } else {
        return resp.status(400).json({ error: 'Unknown error occurred' });
      }
    }
  }
}

export { CreateTextController };
