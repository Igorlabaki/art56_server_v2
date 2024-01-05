import {
  IImageParams,
  IImageRepository,
  IListByTagImagesParams,
  IUpdateImageParams,
} from '../ImageRepository';

import { PrismaClient, Image } from '@prisma/client';

export class PrismaImageRepository implements IImageRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(ImageParams: IImageParams): Promise<Image | null> {
    return await this.prisma.image.create({
      data: {
        ...ImageParams,
      },
    });
  }

  async delete(reference: string): Promise<Image | null> {
    return await this.prisma.image.delete({
      where: {
        id: reference,
      },
    });
  }

  async getById(reference: string): Promise<Image | null> {
    return await this.prisma.image.findFirst({
      where: {
        id: reference,
      },
    });
  }

  async validateImage(reference: IImageParams): Promise<Image | null> {
    return await this.prisma.image.findFirst({
      where: {
        tag: reference.tag,
      },
    });
  }

  async update({ data, imageId }: IUpdateImageParams): Promise<Image | null> {
    return await this.prisma.image.update({
      where: {
        id: imageId,
      },
      data: {
        ...data,
      },
    });
  }

  async list(reference: string | undefined): Promise<Image[]> {
    if(reference){
      return await this.prisma.image.findMany({
        where:{
          tag:{
            contains:reference
          }
        },
      });
    }else{
      return await this.prisma.image.findMany();
    }
  }

  async getListByTag({ tag, responsiveMode }: IListByTagImagesParams): Promise<Image[]> {
    return await this.prisma.image.findMany({
      where: {
        AND: [{ tag }, { responsiveMode }],
      },
      orderBy: {
        position: 'asc',
      },
    });
  }
}
