import { Request, Response } from "express";
import { DeleteImagetCase } from "./deleteImageCase";
import { PrismaImageRepository } from "../../../repository/inPrisma/prismaImageRepository";
import { prismaClient } from "../../../service/prisma";

class DeleteImageController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const { imageId } = req.params;

    const prismaImageRepository = new PrismaImageRepository(prismaClient);
    const deleteImageCase = new DeleteImagetCase(prismaImageRepository);

    try {
      const deletedImage = await deleteImageCase.execute(imageId);
      return resp.json(deletedImage);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { DeleteImageController };
