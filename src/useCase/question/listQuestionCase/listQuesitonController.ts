import { Request, Response } from "express";

import { prismaClient } from "../../../service/prisma";
import { PrismaQuestionRepository } from "../../../repository/inPrisma/prismaQuestionRepository";
import { ListQuestionCase } from "./listQuestionCase";

class ListQuestionController {
  async handle(req: Request, response: Response) {
    const { query } = req.params;

    const prismaQuestionRepository = new PrismaQuestionRepository(prismaClient);
    const listQuestionCase = new ListQuestionCase(prismaQuestionRepository);

    const questionList = await listQuestionCase.execute(query);

    return response.json(questionList);
  }
}

export { ListQuestionController };
