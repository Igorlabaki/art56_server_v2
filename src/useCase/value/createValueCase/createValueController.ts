import { Request, Response } from 'express';
import { IValueParams } from '../../../repository/IValueRepository';
import { PrismaValueRepository } from '../../../repository/inPrisma/prismaValueRepository';
import { prismaClient } from '../../../service/prisma';
import { CreateValueCase } from './createValueCase';

class CreateValueController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const data: IValueParams = req.body;

    const prismaTextRepository = new PrismaValueRepository(prismaClient);
    const createValueCase = new CreateValueCase(prismaTextRepository);

    try {
      const newValue = await createValueCase.execute(data);
      return resp.json(newValue);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { CreateValueController };
