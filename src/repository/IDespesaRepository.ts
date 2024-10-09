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
  query?: string;
}

export interface IAnalizeDespesasParams {
  year?: number | undefined;
}

export interface IDespesaRepository {
  delete: (reference: string) => Promise<Despesa | null>;
  getById: (reference: string) => Promise<Despesa | null>;
  create: (reference: IDespesaParams) => Promise<Despesa | null>;
  update: (reference: IUpdateDespesaParams) => Promise<Despesa | null>;
  getAnalize: (year: IAnalizeDespesasParams) => Promise<AnaliseDespesa | null>;
  list: (reference: IListByCategoriaDespesasParams) => Promise<Despesa[] | null>;
}
