import {
  IValueParams,
  IValueRepository,
  IUpdateValueParams,
  IValidateValueParams,
} from '../IValueRepository';

import { PrismaClient, Values } from '@prisma/client';
export class PrismaValueRepository implements IValueRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(valueParams: IValueParams): Promise<Values | null> {
    return await this.prisma.values.create({
      data: {
        ...valueParams,
      },
    });
  }

  async delete(reference: string): Promise<Values | null> {
    return await this.prisma.values.delete({
      where: {
        id: reference,
      },
    });
  }

  async getById(reference: string): Promise<Values | null> {
    return await this.prisma.values.findFirst({
      where: {
        id: reference,
      },
    });
  }

  async getByTitulo(reference: string): Promise<Values | null> {
    return await this.prisma.values.findFirst({
      where: {
        titulo: reference,
      },
    });
  }

  async validateValue(data: IValidateValueParams): Promise<Values | null> {
    return await this.prisma.values.findFirst({
      where: {
        titulo: data.titulo,
      },
    });
  }

  async update({ data, valueId }: IUpdateValueParams): Promise<Values | null> {
    return await this.prisma.values.update({
      where: {
        id: valueId,
      },
      data: {
        ...data,
      },
    });
  }

  async list(reference: string | undefined): Promise<Values[]> {
    if(reference){
      return await this.prisma.values.findMany({
        where:{
          titulo:{
            contains:reference
          }
        },
        orderBy: {
          titulo: "asc",
        },
      });
    }else{
      return await this.prisma.values.findMany({
        orderBy: {
          titulo: "asc",
        },
      });
    }
  }
}
