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

  async list({ query }: IListByCategoriaDespesasParams): Promise<Despesa[]> {
    return await this.prisma.despesa.findMany({
      where: {
        ...(query && {
          descricao: {
            contains: query,
          },
        }),
      },
    });
  }

  async getAnalize({
    year,
  }: IAnalizeDespesasParams): Promise<Despesa[] | null> {
    return await this.prisma.despesa.findMany({
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
  }
}
