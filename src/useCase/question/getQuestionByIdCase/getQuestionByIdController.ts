import { Request, Response } from 'express';
import { PrismaQuestionRepository } from '../../../repository/inPrisma/prismaQuestionRepository';
import { prismaClient } from '../../../service/prisma';
import { GetQuestionByIdCase } from './getQuestionByIdCase';

class GetQuestionByIdController {
  /* constructor(private getQuestionByIdCase: GetQuestionByIdCase) {} */

  async handle(req: Request, resp: Response) {

    const {questionId} = req.params

    const prismaQuestionRepository = new PrismaQuestionRepository(prismaClient);
    const getQuestionByIdCase = new GetQuestionByIdCase(prismaQuestionRepository);

    try {
      const questionById = await getQuestionByIdCase.execute(questionId);
      return resp.json(questionById);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetQuestionByIdController };
