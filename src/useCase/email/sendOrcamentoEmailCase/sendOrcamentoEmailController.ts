
import { SendOrcamentoEmailCase } from './sendOrcamentoEmailCase';
import { PrismaOrcamentoRepository } from '../../../repository/inPrisma/prismaOrcamentoRepository';
import { prismaClient } from '../../../service/prisma';
import { IOrcamentoParams } from '../../../repository/IOrcamentoRepository';
import { Request, Response } from 'express';

class SendOrcamentoEmailController {
  constructor() {}

  async handle(resp: Response, req: Request) {
    const data : IOrcamentoParams = req.body;

    const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);

    const sendOrcamentoEmailCase = new SendOrcamentoEmailCase();

    try {
      const newOrcamento = await prismaOrcamentoRepository.create(data);
      const orcamentoEmail = await sendOrcamentoEmailCase.execute({email: data.email, nome: data.nome,orcamentoId:newOrcamento?.id});
      return resp.json(newOrcamento)
    } catch (error) {
      return resp.status(400).json({error})
    }
  }
}

export { SendOrcamentoEmailController };

/* resp.json(orcamentoEmail);
resp.status(400).json({ error: error.message }); */