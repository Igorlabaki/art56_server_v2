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

  async getAnalize(): Promise<any> {
    const list = await this.prisma.despesa.findMany();
  
    const analysis = {
      total: {
        mensal: 0,
        anual: 0,
        esporadico: 0
      },
      recorrentes: {},
      esporadicos: {}
    };
  
    // Percorre a lista de despesas
    list.forEach((item: Despesa) => {
      let mensalValue = 0;
      let anualValue = 0;
  
      if (item.recorrente) {
        // Define o tipo de recorrência
        if (!analysis.recorrentes[item.descricao]) {
          analysis.recorrentes[item.descricao] = { mensal: 0, anual: 0 };
        }
  
        if (item.tipo === "Mensal") {
          mensalValue = item.valor;
          anualValue = item.valor * 12;
        } else if (item.tipo === "Quinzenal") {
          mensalValue = item.valor * 2;
          anualValue = item.valor * 24;
        }
  
        // Atualiza os valores recorrentes
        analysis.recorrentes[item.descricao].mensal += mensalValue;
        analysis.recorrentes[item.descricao].anual += anualValue;
  
        analysis.total.mensal += mensalValue;
        analysis.total.anual += anualValue;
  
      } else {
        // Despesa esporádica (não recorrente)
        if (!analysis.esporadicos[item.descricao]) {
          analysis.esporadicos[item.descricao] = { total: 0 };
        }
  
        analysis.esporadicos[item.descricao].total += item.valor;
        analysis.total.esporadico += item.valor;
      }
    });
  
    return analysis;
  }
}
