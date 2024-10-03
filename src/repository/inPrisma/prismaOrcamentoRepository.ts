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
          ...(take && { take : Number(take) }),
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

    async trafegoCount(): Promise<any> {
      const trafegoCounts = await this.prisma.orcamento.groupBy({
        by: ['trafegoCanal'],
        _count: {
          trafegoCanal: true,
        },
      });
    
      const orcamentoCount = trafegoCounts.reduce((acc, curr) => acc + curr._count.trafegoCanal, 0);
    
      const trafegoData = {
        todos: orcamentoCount,
        google: trafegoCounts.find(item => item.trafegoCanal === 'Google')?._count.trafegoCanal || 0,
        instagram: trafegoCounts.find(item => item.trafegoCanal === 'Instagram')?._count.trafegoCanal || 0,
        tikTok: trafegoCounts.find(item => item.trafegoCanal === 'TikTok')?._count.trafegoCanal || 0,
        facebook: trafegoCounts.find(item => item.trafegoCanal === 'Facebook')?._count.trafegoCanal || 0,
        amigos: trafegoCounts.find(item => item.trafegoCanal === 'Amigos')?._count.trafegoCanal || 0,
        outros: trafegoCounts.find(item => item.trafegoCanal === 'Outros')?._count.trafegoCanal || 0,
      };
    
      return trafegoData;
    }

    async monthCount(): Promise<any> {
      const trafegoCountsByMonth = await this.prisma.$queryRaw`
        SELECT EXTRACT(MONTH FROM "dataInicio") AS month, COUNT(*) AS count
        FROM "orcamento"
        GROUP BY month
        ORDER BY month ASC;
      `;
    
      const months = Array(12).fill(0); 
      
      /* @ts-ignore */
      trafegoCountsByMonth.forEach((item: { month: number; count: number }) => {
        const monthIndex = item.month - 1;
        months[monthIndex] = item.count;
      });
    
      return months;
    }
  }
