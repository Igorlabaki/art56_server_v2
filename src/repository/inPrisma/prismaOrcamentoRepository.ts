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
        tikTok: trafegoCounts.find(item => item.trafegoCanal === 'TiTok')?._count.trafegoCanal || 0,
        facebook: trafegoCounts.find(item => item.trafegoCanal === 'Facebook')?._count.trafegoCanal || 0,
        amigos: trafegoCounts.find(item => item.trafegoCanal === 'Amigos')?._count.trafegoCanal || 0,
        outros: trafegoCounts.find(item => item.trafegoCanal === 'Outros')?._count.trafegoCanal || 0,
      };
    
      return trafegoData;
    }

    async monthCount(): Promise<any> {
      const orcamentosPorMes = await this.prisma.orcamento.groupBy({
        by: ['dataInicio'],
        _count: {
          id: true,
        },
        where: {
          dataInicio: {
            gte: new Date(new Date().getFullYear(), 0, 1), // Início do ano atual
          },
        },
        orderBy: {
          dataInicio: 'asc',
        },
      });
      
      const orcamentosPorMesFormatado = orcamentosPorMes.map((orcamento) => {
        return {
          mes: orcamento.dataInicio.getMonth() + 1, // Adiciona 1 para transformar 0 (Janeiro) em 1
          quantidade: orcamento._count.id,
        };
      });
      return {orcamentosPorMesFormatado}
      /* const orcamentos = await this.prisma.orcamento.findMany({
        where:{
          aprovadoAr756: true,
          aprovadoCliente: true,
        },
        select: {
          dataInicio: true,
          total: true,
        },
      });
    
      const result = orcamentos.reduce((acc, orcamento) => {
        const month = new Date(orcamento.dataInicio).toLocaleString('pt-BR', {
          month: 'long',
          year: 'numeric',
        });
        
        // Verifica se o mês já existe no acumulador
        if (!acc[month]) {
          acc[month] = { month: month, count: 0, total: 0 };
        }
        
        // Atualiza os valores acumulados
        acc[month].count += 1; // conta os orçamentos
        acc[month].total += orcamento.total; // soma os totais
    
        return acc;
      }, {} as Record<string, { month: string; count: number; total: number }>);
    
      // Converte o objeto acumulado em um array
      return Object.values(result);*/
    } 
  }
