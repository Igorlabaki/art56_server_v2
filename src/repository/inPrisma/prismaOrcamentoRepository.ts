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

  async list({query, month, year,take}:ListOrcamentoParams): Promise<Orcamento[]> {
      return await this.prisma.orcamento.findMany({
        where:{
          ...(query && {
            nome: {
              contains: query
            }
          }),
          ...(month ? {
              dataInicio: {
                gte: new Date(year ? year : new Date().getFullYear(), month - 1, 1), // Início do mês
                lt: new Date(year ? year : new Date().getFullYear(), month, 1),
              }
              } : {
                dataInicio: {
                  gte: new Date(year ? year : new Date().getFullYear()),
                  lt: new Date(year ? year : new Date().getFullYear(), 12, 31),
                }
              }
            ),
          aprovadoAr756: false,
          aprovadoCliente: false
          },
          take: take && take,
          orderBy:{
            dataInicio: "asc"
          }
      });
    }

  async listAprovado({query, month, year}:ListOrcamentoParams): Promise<Orcamento[]> {
      return await this.prisma.orcamento.findMany({
        where:{
          ...(query && {
            nome: {
              contains: query
            }
          }),
          ...(month ? {
              dataInicio: {
                gte: new Date(year ? year : new Date().getFullYear(), month - 1, 1), // Início do mês
                lt: new Date(year ? year : new Date().getFullYear(), month, 1),
              }
              } : {
                dataInicio: {
                  gte: new Date(year ? year : new Date().getFullYear()),
                  lt: new Date(year ? year : new Date().getFullYear(), 12, 31),
                }
              }
            ),
          aprovadoAr756: true,
          aprovadoCliente: true
          },
          orderBy:{
            dataInicio: "asc"
          }
      });
    }

    async trafegoCount(): Promise<any>{
      const orcamentoCount = await this.prisma.orcamento.count()

      const googleCount = await this.prisma.orcamento.count({
        where: {
          trafegoCanal: 'Google'
        }
      });

      const instagramCount = await this.prisma.orcamento.count({
        where: {
          trafegoCanal: 'Instagram'
        }
      });

      const tikTokCount = await this.prisma.orcamento.count({
        where: {
          trafegoCanal: 'TiTok'
        }
      });

      const facebookCount = await this.prisma.orcamento.count({
        where: {
          trafegoCanal: 'Facebook'
        }
      });

      const amigosCount = await this.prisma.orcamento.count({
        where: {
          trafegoCanal: 'Amigos'
        }
      });

      const outrosCount = await this.prisma.orcamento.count({
        where: {
          trafegoCanal: 'Outros'
        }
      });

      return {todos: orcamentoCount,google: googleCount,instagram: instagramCount,tikTok: tikTokCount, facebook: facebookCount,amigos: amigosCount, outros: outrosCount}
    }
  }
