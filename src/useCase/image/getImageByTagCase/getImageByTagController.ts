import { Request, Response } from "express";
import { PrismaImageRepository } from "../../../repository/inPrisma/prismaImageRepository";
import { prismaClient } from "../../../service/prisma";
import { GetImageByTagCase } from "./getImageByTagCase";

class GetImageByTagController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const { tag, responsiveMode } = req.params;

    const prismaImageRepository = new PrismaImageRepository(prismaClient);
    const getImageByTagCase = new GetImageByTagCase(prismaImageRepository);

    try {
      const imageById = await getImageByTagCase.execute({tag, responsiveMode});
      return resp.json(imageById);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { GetImageByTagController };
