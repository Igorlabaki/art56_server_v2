import { Pagamentos } from '@prisma/client';

export interface IPagamentoParams {
  dataPagamento: string;
  value: number;
  orcamentoId:string;
}

export interface IUpdatePagamentoParams {
  pagamentoId: string;
  data: {
    dataPagamento: string;
    value: number;
  };
}

export interface IPagamentoRepository {
  delete: (reference: string) => Promise<Pagamentos | null>;
  getById: (reference: string) => Promise<Pagamentos | null>;
  getByOrcamentoId: (reference: string) => Promise<Pagamentos | null>;
  create: (reference: IPagamentoParams) => Promise<Pagamentos | null>;
  list: (reference: string | undefined) => Promise<Pagamentos[] | null>;
  update: (reference: IUpdatePagamentoParams) => Promise<Pagamentos | null>;
}
