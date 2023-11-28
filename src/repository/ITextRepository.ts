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

export interface IValidateTextAreaTitleParams {
  textId: string;
  area: string;
  titulo?: string | null | undefined;
}
export interface IValidateTextAreaPositionParams {
  area: string;
  textId: string;
  position: number;
}

export interface ITextRepository {
  list: (reference: string | undefined) => Promise<Text[] | null>;
  delete: (reference: string) => Promise<Text | null>;
  getById: (reference: string) => Promise<Text | null>;
  getByArea: (reference: string) => Promise<Text[] | null>;
  create: (reference: ITextParams) => Promise<Text | null>;
  update: (reference: IUpdateTextParams) => Promise<Text | null>;
  validateIfExistTextAreaTitle: (reference: IValidateTextAreaTitleParams) => Promise<Text | null>;
  validateIfExistTextAreaPosition: (reference: IValidateTextAreaPositionParams) => Promise<Text | null>;
}
