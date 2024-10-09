import {
  GetByDateParams,
  GetListDateEventParams,
  IDateEventParams,
  IDateEventRepository,
  UpdateDateEventParams,
  ValidateDateParam,
  ValidateIfHasDateDateParam,
} from '../IDateEventRepository';

import { PrismaClient, DateEvent } from '@prisma/client';

export class PrismaDateEventRepository implements IDateEventRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(dateParams: IDateEventParams): Promise<DateEvent | null> {
    if(dateParams.orcamentoId){
      const dateEvent = await this.prisma.dateEvent.create({
        data: {
          dataFim: dateParams.dataFim,
          dataInicio: dateParams.dataInicio,
          tipo: dateParams.tipo,
          titulo: dateParams.titulo,
          orcamento: {
            connect: {
              id: dateParams.orcamentoId
            }
          }
        },
      });

      if(dateParams.tipo === "Evento"){
        await this.prisma.orcamento.update({
          where: {
            id: dateParams.orcamentoId,
          },
          data: {
            aprovadoCliente: true,
            aprovadoAr756: true,
          },
        });
      }

      return dateEvent;
    }

    const dateEvent = await this.prisma.dateEvent.create({
      data: {
        dataFim: dateParams.dataFim,
        dataInicio: dateParams.dataInicio,
        tipo: dateParams.tipo,
        titulo: dateParams.titulo,
      },
    });
    return dateEvent;
  }

  async delete(reference: string): Promise<DateEvent | null> {
    const dateEvent = await this.prisma.dateEvent.delete({
      where: {
        id: reference,
      },
    });

    if (dateEvent.orcamentoId) {
      await this.prisma.orcamento.update({
        where: {
          id: dateEvent.orcamentoId,
        },
        data: {
          aprovadoCliente: false,
          aprovadoAr756: false,
        },
      });
    }

    return dateEvent;
  }

  async getById(reference: string): Promise<DateEvent | null> {
    return await this.prisma.dateEvent.findFirst({
      where: {
        id: reference,
      },
      include: {
        orcamento: true,
      },
    });
  }

  async getByDate(reference: GetByDateParams): Promise<DateEvent | null> {
    return await this.prisma.dateEvent.findFirst({
      where: {
        dataInicio: {
          in: [new Date(`${reference}T00:00:00.000Z`), new Date(`${reference}T23:59:59.999Z`)],
        },
      },
      include: {
        orcamento: true,
      },
    });
  }

  async checkAvailability({ dataFim, dataInicio }: ValidateDateParam): Promise<DateEvent | null> {
    return await this.prisma.dateEvent.findFirst({
      where: {
        dataFim: { gte: dataInicio }, // Verifica se a data de fim é maior ou igual à data de início
        dataInicio: { lte: dataFim }, // Verifica se a data de início é menor ou igual à data de fim
      },
    });
  }

  async checkIfHasEventDate(reference: ValidateIfHasDateDateParam): Promise<DateEvent | null> {
    return await this.prisma.dateEvent.findFirst({
      where: {
        orcamentoId: reference.orcamentoId,
        tipo: 'Evento',
      },
    });
  }

  async checkIfHasVisitDate(reference: ValidateIfHasDateDateParam): Promise<DateEvent | null> {
    return await this.prisma.dateEvent.findFirst({
      where: {
        orcamentoId: reference.orcamentoId,
        tipo: 'Visita',
      },
    });
  }

  async update({ data, dateEventId }: UpdateDateEventParams): Promise<DateEvent | null> {
    return await this.prisma.dateEvent.update({
      where: {
        id: dateEventId,
      },
      data: {
        ...data,
      },
    });
  }

  async list({tipo,year}:GetListDateEventParams): Promise<DateEvent[]> {
    if(tipo){
      return await this.prisma.dateEvent.findMany({
        where: {
          tipo:{
            contains:tipo
          },
          dataInicio: {
            gte: new Date(year ? year : new Date().getFullYear()),
            lt: new Date(year ? year : new Date().getFullYear(), 12, 31),
          },
        },
        include: {
          orcamento: true,
        },
        orderBy: {
          dataInicio: 'asc',
        },
      });
    }else{
      return await this.prisma.dateEvent.findMany({
        where: {
          dataInicio: {
            gte: new Date(),
          },
        },
        include: {
          orcamento: true,
        },
        orderBy: {
          dataInicio: 'asc',
        },
      });
    }
  }
}
