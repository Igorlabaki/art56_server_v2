import {
  IQuestionParams,
  IQuestionRepository,
  IUpdateQuestionParams,
  IValidateQuestionParams,
} from '../IQuestionRepository';

import { PrismaClient, Question } from '@prisma/client';

export class PrismaQuestionRepository implements IQuestionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(questionParams: IQuestionParams): Promise<Question | null> {
    return await this.prisma.question.create({
      data: {
        ...questionParams,
      },
    });
  }

  async delete(reference: string): Promise<Question | null> {
    return await this.prisma.question.delete({
      where: {
        id: reference,
      },
    });
  }

  async getById(reference: string): Promise<Question | null> {
    return await this.prisma.question.findFirst({
      where: {
        id: reference,
      },
    });
  }

  async getByQuestion(reference: string): Promise<Question | null> {
    return await this.prisma.question.findFirst({
      where: {
        question: reference,
      },
    });
  }

  async validateQuestion(data: IValidateQuestionParams): Promise<Question | null> {
    return await this.prisma.question.findFirst({
      where: {
        AND: [
          {
            question: data.question,
          },
        ],
        NOT: [
          {id: data.questionId}
        ]
      },
    });
  }

  async update({ data, questionId }: IUpdateQuestionParams): Promise<Question | null> {
    return await this.prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        ...data,
      },
    });
  }

  async list(reference:string | undefined): Promise<Question[]> {
    if(reference){
      return await this.prisma.question.findMany({
        where:{
          question:{
            contains:reference
          }
        },
      });
    }else{
      return await this.prisma.question.findMany();
    }
  }
}
