import { Request, Response } from 'express';
import { PrismaImageRepository } from '../../../repository/inPrisma/prismaImageRepository';
import { prismaClient } from '../../../service/prisma';
import { ListImagesCase } from './listImagesCase';

class ListImagesController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const { query } = req.params;

    const prismaImageRepository = new PrismaImageRepository(prismaClient);
    const listImageCase = new ListImagesCase(prismaImageRepository);

    const questionList = await listImageCase.execute(query);

    return resp.json(questionList);
  }
}

export { ListImagesController };
