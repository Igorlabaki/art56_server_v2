import { Request, Response } from 'express';
import { ValidateDateParam } from '../../../repository/IDateEventRepository';
import { CheckDateAvailabilityCase } from './checkDateAvailabilityCase';
import { PrismaDateEventRepository } from '../../../repository/inPrisma/prismaDateEventRepository';
import { prismaClient } from '../../../service/prisma';


class CheckDateAvailabilityController {
  constructor() {}

  async handle(req: Request, resp: Response) {

    const data : ValidateDateParam = req.body

    const prismaDateEventRepository = new PrismaDateEventRepository(prismaClient);
    const checkDateAvailabilityCase = new CheckDateAvailabilityCase(prismaDateEventRepository);

    try {
      const dateEventIsAvailable = await checkDateAvailabilityCase.execute(data);
      return resp.json(dateEventIsAvailable);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }

  }
}

export { CheckDateAvailabilityController };
