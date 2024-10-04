import {
  IOrcamentoParams,
  IOrcamentoRepository,
  ListOrcamentoParams,
  UpdateOrcamentoParams,
} from "../IOrcamentoRepository";

import { PrismaClient, Orcamento } from "@prisma/client";

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

  async update({
    data,
    orcamentoId,
  }: UpdateOrcamentoParams): Promise<Orcamento | null> {
    return await this.prisma.orcamento.update({
      where: {
        id: orcamentoId,
      },
      data: {
        ...data,
      },
    });
  }

  async list({
    query,
    month,
    year,
    take,
  }: ListOrcamentoParams): Promise<Orcamento[]> {
    return await this.prisma.orcamento.findMany({
      where: {
        ...(query && {
          nome: {
            contains: query,
          },
        }),
        ...(month
          ? {
              dataInicio: {
                gte: new Date(
                  year ? year : new Date().getFullYear(),
                  month - 1,
                  1
                ), // Início do mês
                lt: new Date(year ? year : new Date().getFullYear(), month, 1),
              },
            }
          : {
              dataInicio: {
                gte: new Date(year ? year : new Date().getFullYear()),
                lt: new Date(year ? year : new Date().getFullYear(), 12, 31),
              },
            }),
        aprovadoAr756: false,
        aprovadoCliente: false,
      },
      ...(take && { take: Number(take) }),
      orderBy: {
        dataInicio: "asc",
      },
    });
  }

  async listAprovado({
    query,
    month,
    year,
  }: ListOrcamentoParams): Promise<Orcamento[]> {
    return await this.prisma.orcamento.findMany({
      where: {
        ...(query && {
          nome: {
            contains: query,
          },
        }),
        ...(month
          ? {
              dataInicio: {
                gte: new Date(
                  year ? year : new Date().getFullYear(),
                  month - 1,
                  1
                ), // Início do mês
                lt: new Date(year ? year : new Date().getFullYear(), month, 1),
              },
            }
          : {
              dataInicio: {
                gte: new Date(year ? year : new Date().getFullYear()),
                lt: new Date(year ? year : new Date().getFullYear(), 12, 31),
              },
            }),
        aprovadoAr756: true,
        aprovadoCliente: true,
      },
      orderBy: {
        dataInicio: "asc",
      },
    });
  }

  async trafegoCount(): Promise<any> {
    const trafegoCounts = await this.prisma.orcamento.groupBy({
      by: ["trafegoCanal"],
      _count: {
        trafegoCanal: true,
      },
    });

    const orcamentoCount = trafegoCounts.reduce(
      (acc, curr) => acc + curr._count.trafegoCanal,
      0
    );

    const trafegoData = {
      todos: orcamentoCount,
      google:
        trafegoCounts.find((item) => item.trafegoCanal === "Google")?._count
          .trafegoCanal || 0,
      instagram:
        trafegoCounts.find((item) => item.trafegoCanal === "Instagram")?._count
          .trafegoCanal || 0,
      tikTok:
        trafegoCounts.find((item) => item.trafegoCanal === "TiTok")?._count
          .trafegoCanal || 0,
      facebook:
        trafegoCounts.find((item) => item.trafegoCanal === "Facebook")?._count
          .trafegoCanal || 0,
      amigos:
        trafegoCounts.find((item) => item.trafegoCanal === "Amigos")?._count
          .trafegoCanal || 0,
      outros:
        trafegoCounts.find((item) => item.trafegoCanal === "Outros")?._count
          .trafegoCanal || 0,
    };

    return trafegoData;
  }

  async monthCount(): Promise<any> {
    const orcamentos = await this.prisma.orcamento.findMany({
      where: {
        aprovadoAr756: true,
        aprovadoCliente: true,
      },
      select: {
        total: true,
        dataInicio: true,
        trafegoCanal: true,
      },
    });
  
    const result = orcamentos.reduce((acc, orcamento) => {
      const month = new Date(orcamento.dataInicio).toLocaleString("pt-BR", {
        month: "short",
        year: "numeric",
      });
  
      // Inicializa o mês no acumulador, se ainda não existir
      if (!acc[month]) {
        acc[month] = { 
          month: month, 
          count: 0, 
          total: 0, 
          trafego: {
            google: 0,
            tiktok: 0,
            facebook: 0,
            instagram: 0,
            outros: 0,
            amigos: 0
          }
        };
      }
  
      // Atualiza a contagem total e o valor total
      acc[month].count += 1;
      acc[month].total += orcamento.total;
  
      // Atualiza a contagem de tráfego com base no canal
      switch (orcamento.trafegoCanal.toLowerCase()) {
        case 'google':
          acc[month].trafego.google += 1;
          break;
        case 'tiktok':
          acc[month].trafego.tiktok += 1;
          break;
        case 'facebook':
          acc[month].trafego.facebook += 1;
          break;
        case 'instagram':
          acc[month].trafego.instagram += 1;
          break;
        case 'amigos':
          acc[month].trafego.instagram += 1;
          break;
        default:
          acc[month].trafego.outros += 1;
          break;
      }
  
      return acc;
    }, {} as Record<string, { month: string; count: number; total: number, trafego: {
      google: number,
      tiktok: number,
      facebook: number,
      amigos: number,
      instagram: number,
      outros: number
    } }>);
  
    // Converte o objeto acumulado em um array
    return Object.values(result);
  }
}
