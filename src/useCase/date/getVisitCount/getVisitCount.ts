import { DateEvent } from "@prisma/client";
import { IDateEventRepository } from "../../../repository/IDateEventRepository";
import { MonthCountParams } from "../../../repository/IOrcamentoRepository";

type DateEventComOrcamento = DateEvent & {
  orcamento?: {
    aprovadoCliente: boolean;
    aprovadoAr756: boolean;
  };
};

class GetVisitCountCase {
  constructor(private DataEventRepository: IDateEventRepository) {}

  async execute(data: MonthCountParams) {
    const visitCount = await this.DataEventRepository.visitCount(data);

    const totalVisitas = visitCount.length;
    const visitasQueViraramEvento = visitCount.filter(
      (visita: DateEventComOrcamento) =>
        visita?.orcamento?.aprovadoCliente && visita?.orcamento?.aprovadoAr756
    ).length;
    const visitasQueNaoViraramEvento = totalVisitas - visitasQueViraramEvento;

    const porcentagens = {
      visitasQueViraramEvento: (visitasQueViraramEvento / totalVisitas) * 100,
      visitasQueNaoViraramEvento:
        (visitasQueNaoViraramEvento / totalVisitas) * 100,
    };

    return porcentagens;
  }
}

export { GetVisitCountCase };
