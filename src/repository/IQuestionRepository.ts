import { Question } from '@prisma/client';

export interface IQuestionParams {
  question: string;
  response: string;
}

export interface IUpdateQuestionParams {
  questionId: string;
  data: {
    question: string;
    response: string;
  };
}
export interface IQuestionRepository {
  list: (reference: string | undefined) =>Promise<Question[] | null>;
  delete: (reference: string) => Promise<Question | null>;
  getById: (reference: string) => Promise<Question | null>;
  getByQuestion: (reference: string) => Promise<Question | null>;
  validateQuestion: (reference: IQuestionParams) => Promise<Question | null>;
  create: (reference: IQuestionParams) => Promise<Question | null>;
  update: (reference: IUpdateQuestionParams) => Promise<Question | null>;
}
