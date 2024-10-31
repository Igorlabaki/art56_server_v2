import { DateEvent } from '@prisma/client';
import { MonthCountParams } from './IOrcamentoRepository';
export interface IDateEventParams {
  tipo: string;
  titulo: string;
  dataInicio: string | Date;
  dataFim: string | Date;
  orcamentoId?: string;
}

export interface UpdateDateEventParams {
  dateEventId: string;
  data: {
    tipo?: string;
    titulo?: string;
    dataFim?: string | Date;
    dataInicio?: string | Date;
    orcamentoId?: string | null;
  };
}

export interface ValidateDateParam {
  dataInicio: string | Date;
  dataFim: string | Date;
}

export interface ValidateIfHasDateDateParam {
  tipo: string;
  orcamentoId: string | null;
}

export interface GetByDateParams{
  date: string
}

export interface GetListDateEventParams{
  year?: number;
  tipo?: string;
}



export interface IDateEventRepository {
  delete: (reference: string) => Promise<DateEvent | null>;
  getById: (reference: string) => Promise<DateEvent | null>;
  visitCount: (reference: MonthCountParams) => Promise<any | null>;
  create: (reference: IDateEventParams) => Promise<DateEvent | null>;
  getByDate: (reference: GetByDateParams) => Promise<DateEvent | null>;
  list: (reference: GetListDateEventParams) =>Promise<DateEvent[] | null>;
  update: (reference: UpdateDateEventParams) => Promise<DateEvent | null>;
  checkAvailability: (reference: ValidateDateParam) => Promise<DateEvent | null>;
  checkIfHasEventDate: (reference: ValidateIfHasDateDateParam) => Promise<DateEvent | null>;
  checkIfHasVisitDate: (reference: ValidateIfHasDateDateParam) => Promise<DateEvent | null>;
}
