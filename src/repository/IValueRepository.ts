import { Values } from '@prisma/client';

export interface IValueParams {
  titulo: string;
  valor: number;
}

export interface IUpdateValueParams {
  valueId: string;
  data: {
    titulo: string;
    valor: number;
  };
}

export interface IValidateValueParams {
  valor: number;
  titulo: string;
}

export interface IValueRepository {
  delete: (reference: string) => Promise<Values | null>;
  getById: (reference: string) => Promise<Values | null>;
  getByTitulo: (reference: string) => Promise<Values | null>;
  create: (reference: IValueParams) => Promise<Values | null>;
  list: (reference: string | undefined) => Promise<Values[] | null>;
  update: (reference: IUpdateValueParams) => Promise<Values | null>;
  validateValue: (reference: IValidateValueParams) => Promise<Values | null>;
}
