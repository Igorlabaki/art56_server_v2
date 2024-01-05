import { Request, Response } from "express";
import { PrismaImageRepository } from "../../../repository/inPrisma/prismaImageRepository";
import { prismaClient } from "../../../service/prisma";
import { GetImageByIdCase } from "./getImageByIdCase";

class GetImageByIdController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const { imageId } = req.params;

    const prismaImageRepository = new PrismaImageRepository(prismaClient);
    const getImageByIdCase = new GetImageByIdCase(prismaImageRepository);

    try {
      const imageById = await getImageByIdCase.execute(imageId);
      return resp.json(imageById);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetImageByIdController };
