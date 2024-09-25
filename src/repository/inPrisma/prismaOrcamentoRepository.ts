import {
  IOrcamentoParams,
  IOrcamentoRepository,
  ListOrcamentoParams,
  UpdateOrcamentoParams,
} from '../IOrcamentoRepository';

import { PrismaClient, Orcamento } from '@prisma/client';

export class PrismaOrcamentoRepository implements IOrcamentoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(orcamentoParams: IOrcamentoParams): Promise<Orcamento | null> {
    return await this.prisma.orcamento.create({
      data: {
        ...orcamentoParams,
      },
    });
  }

  async delete(reference: string): Promise<Orcamento | null> {
    return await this.prisma.orcamento.delete({
      where: {
        id: reference,
      },
    });
  }

  async getById(reference: string): Promise<Orcamento | null> {
    return await this.prisma.orcamento.findFirst({
      where: {
        id: reference,
      },
    });
  }

  async update({ data, orcamentoId }: UpdateOrcamentoParams): Promise<Orcamento | null> {
    return await this.prisma.orcamento.update({
      where: {
        id: orcamentoId,
      },
      data: {
        ...data,
      },
    });
  }

  async list({query, month}:ListOrcamentoParams): Promise<Orcamento[]> {
      return await this.prisma.orcamento.findMany({
        where:{
          ...(query && {
            nome: {
              contains: query
            }
          }),
          ...(month ? {
              dataInicio: {
                gte: new Date(new Date().getFullYear(), month - 1, 1), // Início do mês
                lt: new Date(new Date().getFullYear(), month, 1),
              }
              } : {
                dataInicio: {
                  gte: new Date() 
                }
              }
            ),
          },
          orderBy:{
            dataInicio: "asc"
          }
      });
  }
}
