import { Despesa } from "@prisma/client";
import { AnaliseDespesa, DespesaEsporadica, DespesaRecorrente, IAnalizeDespesasParams, IDespesaRepository } from "../../../repository/IDespesaRepository";

class GetDepesaAnalizeCase {
  constructor(private depesaRepository: IDespesaRepository) {}

  async execute(year: IAnalizeDespesasParams) {
    const depesaAnalize = await this.depesaRepository.getAnalize(year);

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

    depesaAnalize?.forEach((item: Despesa) => {
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

export { GetDepesaAnalizeCase };
