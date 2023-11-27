import { Request, Response } from 'express';
import { PrismaTextRepository } from '../../../repository/inPrisma/prismaTextRepository';
import { prismaClient } from '../../../service/prisma';
import { GetTextByIdCase } from './getTextByIdCase';

class GetTextByIdController {
  /* constructor(private getTextByIdCase: GetTextByIdCase) {} */

  async handle(req: Request, resp: Response) {

    const {textId} = req.params

    const prismaTextRepository = new PrismaTextRepository(prismaClient);
    const getTextByIdCase = new GetTextByIdCase(prismaTextRepository);

    try {
      const textById = await getTextByIdCase.execute(textId);
      return resp.json(textById);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetTextByIdController };
