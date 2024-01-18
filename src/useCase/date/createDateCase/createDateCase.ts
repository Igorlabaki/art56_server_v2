
import { format } from "date-fns";
import { IDateEventParams, IDateEventRepository } from "../../../repository/IDateEventRepository";

class CreateDateEventCase {
  constructor(private dateRepository: IDateEventRepository) {}
  async execute(data: IDateEventParams) {
    const isNotAvailable = await this.dateRepository.checkAvailability({
      dataFim: data.dataFim,
      dataInicio: data.dataInicio,
    });

    if (isNotAvailable) {
      const error = new Error();
      error.message = 'Data nao disponivel.';
      throw error;
    }


    if(data.orcamentoId){   
      const checkEventDate = await this.dateRepository.checkIfHasEventDate({
       orcamentoId: data.orcamentoId,
       tipo: data?.tipo
      });
  
      const checkVisitDate = await this.dateRepository.checkIfHasVisitDate({
        orcamentoId: data.orcamentoId,
       tipo: data?.tipo
      });
  
      if (checkEventDate && data?.tipo.includes('Evento')) {
        const error = new Error();
        error.message = `Este orcamento ja tem data de evento agendada para ${format( data?.dataInicio , "dd/MM/yyyy")}. `;
        throw error;
      }
  
      if (checkVisitDate && data?.tipo.includes('Visita')) {
        const error = new Error();
        error.message = `Este orcamento ja tem data de visita agendada para ${format(data?.dataInicio , "dd/MM/yyyy")}.`;
        throw error;
      }
    }

    const newDate = await this.dateRepository.create(data);

    return newDate;
  }
}

export { CreateDateEventCase };
