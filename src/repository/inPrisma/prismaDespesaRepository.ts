import { PrismaClient, Despesa } from '@prisma/client';
import { IDespesaParams, IDespesaRepository, IListByRecorrenteDespesasParams, IUpdateDespesaParams } from '../IDespesaRepository';

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

  async update({ data, despesaId }: IUpdateDespesaParams  ): Promise<Despesa | null> {
    return await this.prisma.despesa.update({
      where: {
        id: despesaId,
      },
      data: {
        ...data,
      },
    });
  }

  async list(reference: string | undefined): Promise<Despesa[]> {
    if(reference){
      return await this.prisma.despesa.findMany({
        where:{
          recorrente: true
        },
      });
    }else{
      return await this.prisma.despesa.findMany();
    }
  }
}
