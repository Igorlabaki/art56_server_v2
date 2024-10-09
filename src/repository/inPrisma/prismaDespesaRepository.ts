import { PrismaClient, Despesa } from "@prisma/client";
import {
  AnaliseDespesa,
  DespesaEsporadica,
  DespesaRecorrente,
  IAnalizeDespesasParams,
  IDespesaParams,
  IDespesaRepository,
  IListByCategoriaDespesasParams,
  IUpdateDespesaParams,
} from "../IDespesaRepository";
import { ListDespesaCase } from "../../useCase/despesa/listDespesa/listDespesaCase";

export class PrismaDespesaRepository implements IDespesaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(despesaParams: IDespesaParams): Promise<Despesa | null> {
    return await this.prisma.despesa.create({
      data: {
        ...despesaParams,
      },
    });
  }

  async delete(reference: string): Promise<Despesa | null> {
    return await this.prisma.despesa.delete({
      where: {
        id: reference,
      },
    });
  }

  async getById(reference: string): Promise<Despesa | null> {
    return await this.prisma.despesa.findFirst({
      where: {
        id: reference,
      },
    });
  }

  async update({
    data,
    despesaId,
  }: IUpdateDespesaParams): Promise<Despesa | null> {
    return await this.prisma.despesa.update({
      where: {
        id: despesaId,
      },
      data: {
        ...data,
      },
    });
  }

  async list({query}: IListByCategoriaDespesasParams): Promise<Despesa[]> {
    if (query) {
      return await this.prisma.despesa.findMany({
        where: {
          recorrente: true,
          descricao: {
            contains: query,
          },
        },
      });
    } else {
      return await this.prisma.despesa.findMany({
        where: {
          recorrente: true,
        },
      });
    }
  }
  async getAnalize({ year }: IAnalizeDespesasParams): Promise<AnaliseDespesa> {
    const despesaList = await this.prisma.despesa.findMany({
      where: {
        OR: [
          {
            recorrente: true, // Todos os recorrentes (independente do ano)
          },
          {
            recorrente: false, // Somente os não recorrentes do ano escolhido
            dataPagamento: {
              gte: new Date(year ? year : new Date().getFullYear()),
              lt: new Date(year ? year : new Date().getFullYear(), 12, 31),
            },
          },
        ],
      },
    });

    const analysis: AnaliseDespesa = {
      total: {
        mensal: 0,
        anual: 0,
        esporadico: 0,
      },
      recorrentes: [],
      esporadicos: [],
    };

    const recorrentesMap: { [descricao: string]: DespesaRecorrente } = {};
    const esporadicosMap: { [descricao: string]: DespesaEsporadica } = {};

    despesaList.forEach((item: Despesa) => {
      let mensalValue = 0;
      let anualValue = 0;

      if (item.recorrente) {
        if (!recorrentesMap[item.descricao]) {
          recorrentesMap[item.descricao] = {
            descricao: item.descricao,
            mensal: 0,
            anual: 0,
          };
        }

        if (item.tipo === "Mensal") {
          mensalValue = item.valor;
          anualValue = item.valor * 12;
        } else if (item.tipo === "Quinzenal") {
          mensalValue = item.valor * 2;
          anualValue = item.valor * 24;
        }

        recorrentesMap[item.descricao].mensal += mensalValue;
        recorrentesMap[item.descricao].anual += anualValue;

        analysis.total.mensal += mensalValue;
        analysis.total.anual += anualValue;
      } else {
        if (!esporadicosMap[item.descricao]) {
          esporadicosMap[item.descricao] = {
            descricao: item.descricao,
            total: 0,
          };
        }

        esporadicosMap[item.descricao].total += item.valor;
        analysis.total.esporadico += item.valor;
      }
    });

    // Ordenar recorrentes por ordem decrescente anual
    analysis.recorrentes = Object.values(recorrentesMap).sort(
      (a, b) => b.anual - a.anual
    );

    // Ordenar esporádicos por ordem decrescente total
    analysis.esporadicos = Object.values(esporadicosMap).sort(
      (a, b) => b.total - a.total
    );

    return analysis;
  }
}
