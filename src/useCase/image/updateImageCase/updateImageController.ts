import { Request, Response } from 'express';
import { UpdateImageCase } from './updateImageCase';
import { validateInput } from '../../../util/validateInput';
import { PrismaImageRepository } from '../../../repository/inPrisma/prismaImageRepository';
import { prismaClient } from '../../../service/prisma';

class UpdateImageController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const { imageId } = req.params;
    const { area, imageUrl, position, tag, responsiveMode } = req.body;

    validateInput([!!imageId]);

    const prismaImageRepository = new PrismaImageRepository(prismaClient);
    const updateImagesCase = new UpdateImageCase(
      prismaImageRepository
    );

    try {
      const updateImage = await updateImagesCase.execute({data: { area, imageUrl, position, tag, responsiveMode }, imageId});
      return resp.json(updateImage);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { UpdateImageController };
