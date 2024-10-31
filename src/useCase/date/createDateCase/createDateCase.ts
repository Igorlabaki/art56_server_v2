
import { format } from "date-fns";
import { IDateEventParams, IDateEventRepository } from "../../../repository/IDateEventRepository";
import { INotificationRepository } from "../../../repository/INotificacaoRepository";

class CreateDateEventCase {
  constructor(private dateRepository: IDateEventRepository,private notificationRepository: INotificationRepository) {}
  async execute(data: IDateEventParams) {
    
    const isNotAvailable = await this.dateRepository.checkAvailability({
      dataFim: data.dataFim,
      dataInicio: data.dataInicio,
    });

    if (isNotAvailable) {
      const error: Error = {
        name:"Error",
        message: 'Data nao disponivel.',
      };
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
        const error: Error = {
          name:"Error",
          message: `Este orcamento ja tem data de evento agendada para ${format( data?.dataInicio , "dd/MM/yyyy")}. `,
        };
        throw error;
      }
  
      if (checkVisitDate && data?.tipo.includes('Visita')) {
        const error: Error = {
          name:"Error",
          message: `Este orcamento ja tem data de visita agendada para ${format(data?.dataInicio , "dd/MM/yyyy")}.`,
        };
        throw error;
      }
    }

    const newDate = await this.dateRepository.create(data);

    if(newDate && newDate.orcamentoId){
      await this.notificationRepository.create({
        orcamentoId: newDate?.orcamentoId,
        content: `Um(a) ${newDate.tipo} foi marcado(a), para data  ${format(data?.dataInicio , "dd/MM/yyyy")}`,
        type: newDate.tipo === "Evento" ?  "EVENTO" : "VISITA" 
      });
    }else if(newDate){
      await this.notificationRepository.create({
        content: `${newDate.titulo} foi marcado(a), para data ${format(data?.dataInicio , "dd/MM/yyyy")}`,
        type: "ALERTA" 
      });
    }

    return newDate;
  }
}

export { CreateDateEventCase };
