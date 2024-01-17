import { Request, Response } from 'express';
import { PrismaDateEventRepository } from '../../../repository/inPrisma/prismaDateEventRepository';
import { prismaClient } from '../../../service/prisma';
import { UpdateDateEventCase } from './updateDateCase';

class UpdateDateEventController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const {dateEventId} = req.params
    const data  = req.body;

    const prismaDateEventRepository = new PrismaDateEventRepository(prismaClient);
    const updateDateEventCase = new UpdateDateEventCase(prismaDateEventRepository);

    try {
      const updatedDateEvent = await updateDateEventCase.execute({dateEventId, data});
      return resp.json(updatedDateEvent);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { UpdateDateEventController };
