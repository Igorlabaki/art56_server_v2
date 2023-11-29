import { Response, Request } from "express";
import { UpdateQuestionCase } from "./updateQuestionCase";
import { prismaClient } from "../../../service/prisma";
import { validateInput } from "../../../util/validateInput";
import { PrismaQuestionRepository } from "../../../repository/inPrisma/prismaQuestionRepository";

class UpdateQuestionController {
  async handle(req: Request, resp: Response) {
    const { questionId } = req.params;
    const { question, response } = req.body;

    validateInput([!!questionId]);

    const prismaQuestionRepository = new PrismaQuestionRepository(prismaClient);
    const updateQuestionsCase = new UpdateQuestionCase(
      prismaQuestionRepository
    );

    try {
      const updateQuestion = await updateQuestionsCase.execute({
        questionId,
        data: {
          question,
          response,
        },
      });
      return resp.json(updateQuestion);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { UpdateQuestionController };
