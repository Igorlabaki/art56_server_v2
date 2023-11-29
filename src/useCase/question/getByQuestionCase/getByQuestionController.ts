import { Response, Request } from "express";
import { prismaClient } from "../../../service/prisma";

import { PrismaQuestionRepository } from "../../../repository/inPrisma/prismaQuestionRepository";
import { GetByQuestionCase } from "./getByQuestionCase";

class GetByQuestionController {
  /* constructor(private getQuestionByAreaCase: GetQuestionByAreaCase) {} */

  async handle(req: Request, resp: Response) {
    const { question } = req.params;

    const prismaRepository = new PrismaQuestionRepository(prismaClient);
    const getQuestionByAreaCase = new GetByQuestionCase(prismaRepository);

    try {
      const questionByQuestion = await getQuestionByAreaCase.execute(question);
      return resp.json(questionByQuestion);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetByQuestionController };
