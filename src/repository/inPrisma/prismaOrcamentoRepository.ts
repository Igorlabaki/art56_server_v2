import {
  IOrcamentoParams,
  IOrcamentoRepository,
  ListOrcamentoParams,
  MonthCountParams,
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

  async trafegoCount({year}: MonthCountParams): Promise<any> {
    const trafegoCounts = await this.prisma.orcamento.groupBy({
      by: ["trafegoCanal"],
      _count: {
        trafegoCanal: true,
      },
      where:{
        dataInicio:{
          gte: new Date(year ? year : new Date().getFullYear()),
          lt: new Date(year ? year : new Date().getFullYear(), 12, 31),
        }
      }
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

  async monthCount({year}: MonthCountParams): Promise<any> {
    const orcamentos = await this.prisma.orcamento.findMany({
      where: {
        aprovadoAr756: true,
        aprovadoCliente: true,
        dataInicio:{
          gte: new Date(year ? year : new Date().getFullYear()),
          lt: new Date(year ? year : new Date().getFullYear(), 12, 31),
        }
      },
      select: {
        total: true,
        dataInicio: true,
        trafegoCanal: true,
      },
      orderBy: {
        dataInicio: "asc",
      },
    });
  
    // Lista de todos os meses do ano
    const meses = [
      "jan.", "fev.", "mar.", "abr.", "mai.", "jun.",
      "jul.", "agos.", "set.", "out.", "nov.", "dez."
    ];
  
    // Inicializa o acumulador para todos os meses
    const result = meses.reduce((acc, mes) => {
      acc[mes] = {
        month: `${mes}`,
        count: 0,
        total: 0,
        trafego: {
          google: 0,
          tiktok: 0,
          facebook: 0,
          instagram: 0,
          outros: 0
        }
      };
      return acc;
    }, {} as Record<string, { month: string; count: number; total: number, trafego: {
      google: number,
      tiktok: number,
      facebook: number,
      instagram: number,
      outros: number
    } }>);
  
    // Inicializa o total absoluto
    const totalAbsoluto = {
      month: 'Total Absoluto',
      count: 0,
      total: 0,
      trafego: {
        google: 0,
        tiktok: 0,
        facebook: 0,
        instagram: 0,
        outros: 0
      }
    };
  
    // Percorre os orçamentos e acumula os valores
    orcamentos.forEach(orcamento => {
      const month = new Date(orcamento.dataInicio).toLocaleString("pt-BR", {
        month: "short",
      }).toLowerCase();  // Nome do mês em minúsculas para coincidir com a lista
  
      // Atualiza os valores acumulados para o mês correspondente
      result[month].count += 1;
      result[month].total += orcamento.total;
  
      // Atualiza os totais absolutos
      totalAbsoluto.count += 1;
      totalAbsoluto.total += orcamento.total;
  
      // Atualiza a contagem de tráfego com base no canal
      switch (orcamento.trafegoCanal.toLowerCase()) {
        case 'google':
          result[month].trafego.google += 1;
          totalAbsoluto.trafego.google += 1;
          break;
        case 'tiktok':
          result[month].trafego.tiktok += 1;
          totalAbsoluto.trafego.tiktok += 1;
          break;
        case 'facebook':
          result[month].trafego.facebook += 1;
          totalAbsoluto.trafego.facebook += 1;
          break;
        case 'instagram':
          result[month].trafego.instagram += 1;
          totalAbsoluto.trafego.instagram += 1;
          break;
        default:
          result[month].trafego.outros += 1;
          totalAbsoluto.trafego.outros += 1;
          break;
      }
    });
  
    // Converte o objeto acumulado em um array
    const resultArray = Object.values(result);
  
    // Adiciona o total absoluto ao final do array
    resultArray.push(totalAbsoluto);
  
    return resultArray;
  } 
}
