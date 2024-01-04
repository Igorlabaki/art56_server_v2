import { Request, Response } from "express";
import { IUpdateValueParams } from "../../../repository/IValueRepository";
import { validateInput } from "../../../util/validateInput";
import { UpdateValueCase } from "./updateValueCase";
import { PrismaValueRepository } from "../../../repository/inPrisma/prismaValueRepository";
import { prismaClient } from "../../../service/prisma";


class UpdateValueController {
  constructor() {}

  async handle(req: Request, resp: Response) {
    const { valueId } = req.params;
    const { titulo, valor } = req.body;

    validateInput([!!valueId]);

    const prismaValueRepository = new PrismaValueRepository(prismaClient);
    const updateValueCase = new UpdateValueCase(
      prismaValueRepository
    );

    try {
      const updateValue = await updateValueCase.execute({
        valueId,
        data: {
          titulo,
          valor,
        },
      });
      return resp.json(updateValue);
    } catch (error) {
      return resp.status(400).json({ error: error.message });
    }
  }
}

export { UpdateValueController };
