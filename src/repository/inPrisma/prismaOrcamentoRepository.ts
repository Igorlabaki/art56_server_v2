import {
  IOrcamentoParams,
  IOrcamentoRepository,
  ListOrcamentoParams,
  ListOrcamentoResponse,
  MonthCountParams,
  TrafegoCount,
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
      include: {
        pagamentos: true,
        Data: true,
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
    nome,
    email,
    month,
    year,
    take,
  }: ListOrcamentoParams): Promise<ListOrcamentoResponse[]> {
    return await this.prisma.orcamento.findMany({
      where: {
        ...(nome && {
          nome: {
            contains: nome,
          },
        }),
        ...(email && {
          email: {
            contains: email,
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
      select: {
        id: true,
        nome: true,
        email: true,
        dataInicio: true,
        total: true,
      },
    });
  }

  async listAprovado({
    email,
    nome,
    month,
    year,
  }: ListOrcamentoParams): Promise<Orcamento[]> {
    return await this.prisma.orcamento.findMany({
      where: {
        ...(nome && {
          nome: {
            contains: nome,
          },
        }),
        ...(email && {
          email: {
            contains: email,
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
      include: {
        pagamentos: true,
      },
    });
  }

  async trafegoCount({ year }: MonthCountParams): Promise<any> {
    const trafegoCounts = await this.prisma.orcamento.groupBy({
      by: ["trafegoCanal"],
      _count: {
        trafegoCanal: true,
      },
      where: {
        dataInicio: {
          gte: new Date(year ? year : new Date().getFullYear()),
          lt: new Date(year ? year : new Date().getFullYear(), 12, 31),
        },
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

    const trafegoList = Object.keys(trafegoData)?.map((key) => ({
      name: key,
      value: trafegoData[key as keyof TrafegoCount],
    }));

    // Ordenando baseado no valor de 'todos'
    const sortedSources = trafegoList.sort(
      (a, b) => b.value / trafegoData?.todos - a.value / trafegoData?.todos
    );

    return { todos: trafegoData.todos, sortedSources };
  }

  async monthCount({ year }: MonthCountParams): Promise<any> {
    const orcamentos = await this.prisma.orcamento.findMany({
      where: {
        dataInicio: {
          gte: new Date(year ? year : new Date().getFullYear()),
          lt: new Date(year ? year : new Date().getFullYear(), 12, 31),
        },
      },
      select: {
        total: true,
        dataInicio: true,
        trafegoCanal: true,
        convidados: true,
        aprovadoAr756: true,
      },
      orderBy: {
        dataInicio: "asc",
      },
    });

    const meses = [
      "jan.",
      "fev.",
      "mar.",
      "abr.",
      "mai.",
      "jun.",
      "jul.",
      "ago.",
      "set.",
      "out.",
      "nov.",
      "dez.",
    ];

    const resultAprovados = meses.reduce((acc, mes) => {
      acc[mes] = {
        month: `${mes}`,
        count: 0,
        total: 0,
        convidados: 0,
        aprovados: 0,
        trafego: {
          airbnb: 0,
          google: 0,
          tiktok: 0,
          facebook: 0,
          instagram: 0,
          outros: 0,
        },
      };
      return acc;
    }, {} as Record<string, typeof totalAbsoluto>);

    const resultTodos = meses.reduce((acc, mes) => {
      acc[mes] = {
        month: `${mes}`,
        count: 0,
        total: 0,
        convidados: 0,
        aprovados: 0,
        trafego: {
          airbnb: 0,
          google: 0,
          tiktok: 0,
          facebook: 0,
          instagram: 0,
          outros: 0,
        },
      };
      return acc;
    }, {} as Record<string, typeof totalAbsoluto>);

    const totalAbsoluto = {
      month: "Total Absoluto",
      count: 0,
      total: 0,
      convidados: 0,
      aprovados: 0,
      trafego: {
        airbnb: 0,
        google: 0,
        tiktok: 0,
        facebook: 0,
        instagram: 0,
        outros: 0,
      },
    };

    const totalAprovado = {
      month: "Total Aprovado",
      count: 0,
      total: 0,
      convidados: 0,
      aprovados: 0,
      trafego: {
        airbnb: 0,
        google: 0,
        tiktok: 0,
        facebook: 0,
        instagram: 0,
        outros: 0,
      },
    };

    orcamentos.forEach((orcamento) => {
      const month = new Date(orcamento.dataInicio)
        .toLocaleString("pt-BR", { month: "short" })
        .toLowerCase();

      if (orcamento?.aprovadoAr756) {
        resultAprovados[month].count += 1;
        resultAprovados[month].convidados += orcamento.convidados;
        resultAprovados[month].total += orcamento.total;

        totalAprovado.count += 1;
        totalAprovado.total += orcamento.total;
        totalAprovado.convidados += orcamento.convidados;
      }

      resultTodos[month].count += 1;
      resultTodos[month].convidados += orcamento.convidados;
      resultTodos[month].total += orcamento.total;

      // Atualiza os totais absolutos corretamente (sem usar [month])
      totalAbsoluto.count += 1;
      totalAbsoluto.total += orcamento.total;
      totalAbsoluto.convidados += orcamento.convidados;

      // Trafego para todos os orçamentos
      switch (orcamento.trafegoCanal.toLowerCase()) {
        case "google":
          resultTodos[month].trafego.google += 1;
          totalAbsoluto.trafego.google += 1;
          break;
        case "tiktok":
          resultTodos[month].trafego.tiktok += 1;
          totalAbsoluto.trafego.tiktok += 1;
          break;
        case "facebook":
          resultTodos[month].trafego.facebook += 1;
          totalAbsoluto.trafego.facebook += 1;
          break;
        case "instagram":
          resultTodos[month].trafego.instagram += 1;
          totalAbsoluto.trafego.instagram += 1;
          break;
        case "airbnb":
          resultTodos[month].trafego.airbnb += 1;
          totalAbsoluto.trafego.airbnb += 1;
          break;
        default:
          resultTodos[month].trafego.outros += 1;
          totalAbsoluto.trafego.outros += 1;
          break;
      }

      // Trafego para orçamentos aprovados
      if (orcamento.aprovadoAr756) {
        switch (orcamento.trafegoCanal.toLowerCase()) {
          case "google":
            resultAprovados[month].trafego.google += 1;
            totalAprovado.trafego.google += 1;
            break;
          case "airbnb":
            resultTodos[month].trafego.airbnb += 1;
            totalAbsoluto.trafego.airbnb += 1;
            break;
          case "tiktok":
            resultAprovados[month].trafego.tiktok += 1;
            totalAprovado.trafego.tiktok += 1;
            break;
          case "facebook":
            resultAprovados[month].trafego.facebook += 1;
            totalAprovado.trafego.facebook += 1;
            break;
          case "instagram":
            resultAprovados[month].trafego.instagram += 1;
            totalAprovado.trafego.instagram += 1;
            break;
          default:
            resultAprovados[month].trafego.outros += 1;
            totalAprovado.trafego.outros += 1;
            break;
        }
      }
    });

    const resultArray = Object.values(resultTodos);
    const resultAprovadosArray = Object.values(resultAprovados);

    // Adiciona os totais no final dos arrays (sem usar push() para retorno de valor)
    resultArray.push(totalAbsoluto);
    resultAprovadosArray.push(totalAprovado);

    return { total: resultArray, aprovados: resultAprovadosArray };
  }
}
