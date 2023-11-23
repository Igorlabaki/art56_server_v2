import { Text } from '@prisma/client';

export interface ITextParams {
  area: string;
  text: string;
  titulo?: string | null;
  position: number;
}

export interface IUpdateTextParams {
  textId: string;
  data: {
    area: string;
    text: string;
    position: number;
    titulo?: string | null;
  };
}

export interface IValidateTextParams {
  area: string;
  titulo?: string | null;
}

export interface ITextRepository {
  list: () => Promise<Text[] | null>;
  delete: (reference: string) => Promise<Text | null>;
  getById: (reference: string) => Promise<Text | null>;
  getByArea: (reference: string) => Promise<Text[] | null>;
  validateText: (reference: IValidateTextParams) => Promise<Text | null>;
  create: (reference: ITextParams) => Promise<Text | null>;
  update: (reference: IUpdateTextParams) => Promise<Text | null>;
}
