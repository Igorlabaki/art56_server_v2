import { PrismaClient, Despesa } from '@prisma/client';
import { AnaliseDespesa, DespesaEsporadica, DespesaRecorrente, IDespesaParams, IDespesaRepository, IListByRecorrenteDespesasParams, IUpdateDespesaParams } from '../IDespesaRepository';

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

  async getAnalize(): Promise<AnaliseDespesa> {
    const list = await this.prisma.despesa.findMany();
  
    const analysis: AnaliseDespesa = {
      total: {
        mensal: 0,
        anual: 0,
        esporadico: 0,
      },
      recorrentes: [],
      esporadicos: []
    };
  
    const recorrentesMap: { [descricao: string]: DespesaRecorrente } = {};
    const esporadicosMap: { [descricao: string]: DespesaEsporadica } = {};
  
    list.forEach((item: Despesa) => {
      let mensalValue = 0;
      let anualValue = 0;
  
      if (item.recorrente) {
        if (!recorrentesMap[item.descricao]) {
          recorrentesMap[item.descricao] = { descricao: item.descricao, mensal: 0, anual: 0, total: 0 };
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
  
        // Adicionando o total de cada recorrente (mensal + anual)
        recorrentesMap[item.descricao].total = recorrentesMap[item.descricao].mensal + recorrentesMap[item.descricao].anual;
  
        // Atualizando o total geral de despesas
        analysis.total.mensal += mensalValue;
        analysis.total.anual += anualValue;
  
      } else {
        if (!esporadicosMap[item.descricao]) {
          esporadicosMap[item.descricao] = { descricao: item.descricao, total: 0 };
        }
  
        esporadicosMap[item.descricao].total += item.valor;
        analysis.total.esporadico += item.valor;
      }
    });
  
    // Atualizar o total geral anual com as despesas esporádicas
    analysis.total.anual += analysis.total.esporadico;
  
    // Ordenar recorrentes por ordem decrescente de total
    analysis.recorrentes = Object.values(recorrentesMap).sort((a, b) => b.total - a.total);
    
    // Ordenar esporádicos por ordem decrescente de total
    analysis.esporadicos = Object.values(esporadicosMap).sort((a, b) => b.total - a.total);
  
    return analysis;
  }
}
