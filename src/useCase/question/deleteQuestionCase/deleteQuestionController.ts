import { Request, Response } from "express";
import { PrismaQuestionRepository } from "../../../repository/inPrisma/prismaQuestionRepository";
import { prismaClient } from "../../../service/prisma";
import { DeleteQuestionCase } from "./deleteQuestionCase";

class DeleteQuestionController {
  /*  constructor(private deleteQuestionCase: DeleteQuestionCase) {} */

  async handle(req: Request, resp: Response) {
    const { questionId } = req.params;

    const prismaQuestionRepository = new PrismaQuestionRepository(prismaClient);
    const deleteQuestionCase = new DeleteQuestionCase(prismaQuestionRepository);

    try {
      const deleteQuestion = await deleteQuestionCase.execute(questionId);
      return resp.json(deleteQuestion);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { DeleteQuestionController };
