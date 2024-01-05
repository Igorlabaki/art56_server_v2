import { Request, Response } from 'express';
import { CreateImageCase } from './createImageCase';
import { IImageParams } from '../../../repository/ImageRepository';
import { PrismaImageRepository } from '../../../repository/inPrisma/prismaImageRepository';
import { prismaClient } from '../../../service/prisma';

class CreateImageController {
  constructor() {}

  async handle(resp: Response, req: Request) {
    const data: IImageParams = req.body;

    const prismaImageRepository = new PrismaImageRepository(prismaClient);
    const createImageCase = new CreateImageCase(prismaImageRepository);
    
    try {
      const newImage = await createImageCase.execute(data);
      return resp.json(newImage);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { CreateImageController };
