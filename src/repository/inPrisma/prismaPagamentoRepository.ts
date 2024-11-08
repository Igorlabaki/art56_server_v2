import {
  IPagamentoParams,
  IPagamentoRepository,
  IUpdatePagamentoParams,
} from "../IPagamentoRepository";

import { PrismaClient, Pagamentos } from "@prisma/client";
export class PrismaPagamentoRepository implements IPagamentoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(pagamentoParams: IPagamentoParams): Promise<Pagamentos | null> {
    return await this.prisma.pagamentos.create({
      data: {
        ...pagamentoParams,
      },
    });
  }

  async delete(reference: string): Promise<Pagamentos | null> {
    return await this.prisma.pagamentos.delete({
      where: {
        id: reference,
      },
    });
  }

  async getById(reference: string): Promise<Pagamentos | null> {
    return await this.prisma.pagamentos.findFirst({
      where: {
        id: reference,
      },
    });
  }

  async getByOrcamentoId(reference: string): Promise<Pagamentos | null> {
    return await this.prisma.pagamentos.findFirst({
      where: {
        orcamentoId: reference,
      },
    });
  }

  async update({
    data,
    pagamentoId,
  }: IUpdatePagamentoParams): Promise<Pagamentos | null> {
    return await this.prisma.pagamentos.update({
      where: {
        id: pagamentoId,
      },
      data: {
        ...data,
      },
    });
  }

  async list(reference: string | undefined): Promise<Pagamentos[]> {
    return await this.prisma.pagamentos.findMany();
  }
}
