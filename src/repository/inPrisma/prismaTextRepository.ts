import {
  ITextParams,
  ITextRepository,
  IUpdateTextParams,
  IValidateTextAreaPositionParams,
  IValidateTextAreaTitleParams,
} from "../ITextRepository";

import { PrismaClient, Text } from "@prisma/client";

export class PrismaTextRepository implements ITextRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(textParams: ITextParams): Promise<Text | null> {
    return await this.prisma.text.create({
      data: {
        ...textParams,
      },
    });
  }

  async delete(reference: string): Promise<Text | null> {
    return await this.prisma.text.delete({
      where: {
        id: reference,
      },
    });
  }

  async getById(reference: string): Promise<Text | null> {
    return await this.prisma.text.findFirst({
      where: {
        id: reference,
      },
    });
  }

  async getByArea(reference: string): Promise<Text[] | null> {
    return await this.prisma.text.findMany({
      where: {
        area: reference,
      },
      orderBy: {
        position: "asc",
      },
    });
  }

  async validateIfExistTextAreaTitle(data: IValidateTextAreaTitleParams): Promise<Text | null> {
    return await this.prisma.text.findFirst({
      where: {
        AND: [
          {
            area: data.area,
          },
          { titulo: data.titulo },
        ],
        NOT: [
          {id: data.textId}
        ]
      },
    });
  }
  async validateIfExistTextAreaPosition(data: IValidateTextAreaPositionParams): Promise<Text | null> {
    return await this.prisma.text.findFirst({
      where: {
        AND:[
          {area: data.area},
          {position: data.position}
        ],
        NOT: [
          {id: data.textId}
        ]
      },
    });
  }

  async update({ data, textId }: IUpdateTextParams): Promise<Text | null> {
    return await this.prisma.text.update({
      where: {
        id: textId,
      },
      data: {
        ...data,
      },
    });
  }

  async list(reference:string | undefined): Promise<Text[]> {
    if(reference){
      return await this.prisma.text.findMany({
        where:{
          area:{
            contains:reference
          }
        },
        orderBy: {
          position: "asc",
        },
      });
    }else{
      return await this.prisma.text.findMany({
        orderBy: {
          position: "asc",
        },
      });
    }
  }
}
