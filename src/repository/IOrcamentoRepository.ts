import { Orcamento } from "@prisma/client";

export interface IOrcamentoParams {
  nome: string;
  tipo: string;
  email: string;
  texto: string;
  dataFim: string | Date;
  telefone: string;
  limpeza: boolean;
  feedback?: string;
  convidados: number;
  dataInicio: string | Date;
  seguranca: boolean;
  trafegoCanal: string;
  conheceEspaco: boolean;
  recepcionista: boolean;
  valorBase: number;
  qtdHorasExtras: number;
  valorHoraExtra: number;
  aprovadoAr756?: boolean;
  total: number;
  aprovadoCliente?: boolean;
}

export interface UpdateOrcamentoParams {
  orcamentoId: string | undefined;
  data: {
    aprovadoAr756?: boolean;
    tipo: string | undefined;
    nome?: string | undefined;
    aprovadoCliente?: boolean;
    email?: string | undefined;
    texto?: string | undefined;
    dataFim?: string | Date | undefined;
    limpeza?: boolean | undefined;
    feedback?: string | undefined;
    telefone?: string | undefined;
    contato?: boolean | undefined;
    convidados?: number | undefined;
    dataInicio?: string | Date | undefined;
    seguranca?: boolean | undefined;
    trafegoCanal?: string | undefined;
    conheceEspaco?: boolean | undefined;
    recepcionista?: boolean | undefined;
    valorBase?: number | undefined;
    qtdHorasExtras?: number | undefined;
    valorHoraExtra?: number | undefined;
    total?: number | undefined;
  };
}

export interface ListOrcamentoParams {
  query?: string ,
  month?: number,
  year?: number,
  take?: number
}

export interface IOrcamentoRepository {
  monthCount: () => Promise<any | null>;
  trafegoCount: () => Promise<any | null>;
  delete: (reference: string) => Promise<Orcamento | null>;
  getById: (reference: string) => Promise<Orcamento | null>;
  create: (reference: IOrcamentoParams) => Promise<Orcamento | null>;
  list: (reference:ListOrcamentoParams) => Promise<Orcamento[] | null>;
  update: (reference: UpdateOrcamentoParams) => Promise<Orcamento | null>;
  listAprovado: (reference:ListOrcamentoParams) => Promise<Orcamento[] | null>;
}
