
import { SendOrcamentoEmailCase } from './sendOrcamentoEmailCase';
import { PrismaOrcamentoRepository } from '../../../repository/inPrisma/prismaOrcamentoRepository';
import { prismaClient } from '../../../service/prisma';
import { IOrcamentoParams } from '../../../repository/IOrcamentoRepository';
import { Request, Response } from 'express';
import { CreateOrcamentoCase } from '../../Orcamento/createOrcamentoCase/createOrcamentoCase';

class SendOrcamentoEmailController {
  constructor() {}

  async handle(resp: Response, req: Request) {
    const data : IOrcamentoParams = req.body;
    const prismaOrcamentoRepository = new PrismaOrcamentoRepository(prismaClient);
    const createOrcamentoCase = new CreateOrcamentoCase(prismaOrcamentoRepository)
    const sendOrcamentoEmailCase = new SendOrcamentoEmailCase();

    try {
      const newOrcamento = await createOrcamentoCase.execute(data);
      await sendOrcamentoEmailCase.execute({email: data.email, nome: data.nome,orcamentoId:newOrcamento?.id});
      return resp.json(newOrcamento)
    } catch (error) {
      return resp.status(400).json({error})
    }
  }
}

export { SendOrcamentoEmailController };

/* resp.json(orcamentoEmail);
resp.status(400).json({ error: error.message }); */