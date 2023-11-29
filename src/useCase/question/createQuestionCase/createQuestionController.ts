import { Request, Response } from "express";
import { prismaClient } from "../../../service/prisma";
import { validateInput } from "../../../util/validateInput";
import { IQuestionParams } from "../../../repository/IQuestionRepository";
import { PrismaQuestionRepository } from "../../../repository/inPrisma/prismaQuestionRepository";
import { CreateQuestionCase } from "./createQuestionCase";
class CreateQuestionController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const data: IQuestionParams = req.body;

    const prismaQuestionRepository = new PrismaQuestionRepository(prismaClient);
    const createQuestionsCase = new CreateQuestionCase(prismaQuestionRepository);

    try {
      const newQuestion = await createQuestionsCase.execute(data);
      return resp.json(newQuestion);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { CreateQuestionController };
