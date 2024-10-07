import { Despesa, Prisma } from "@prisma/client";

export interface IDespesaParams {
  descricao: string;
  valor: number;
  dataPagamento: any;
  tipo: string;
  categoria: string;
  recorrente: boolean;
}

export interface IUpdateDespesaParams {
  despesaId: string;
  data: {
    descricao: string;
    valor: number;
    dataPagamento: any;
    tipo: string;
    categoria: string;
    recorrente: boolean;
  };
}

export interface DespesaRecorrente  {
  descricao: string;
  mensal: number;
  anual: number;
};

export interface DespesaEsporadica  {
  descricao: string;
  total: number;
};

export interface AnaliseDespesa  {
  recorrentes: DespesaRecorrente[];
  esporadicos: DespesaEsporadica[];
  total: {
    mensal: number;
    anual: number;
    esporadico: number;
  };
};

export interface IListByCategoriaDespesasParams {
  categoria: string;
}

export interface IListByRecorrenteDespesasParams {
  recorrente: Boolean;
}

export interface IDespesaRepository {
  getAnalize: () => Promise<AnaliseDespesa | null>;
  delete: (reference: string) => Promise<Despesa | null>;
  getById: (reference: string) => Promise<Despesa | null>;
  create: (reference: IDespesaParams) => Promise<Despesa | null>;
  list: (reference: string | undefined) => Promise<Despesa[] | null>;
  update: (reference: IUpdateDespesaParams) => Promise<Despesa | null>;
}
