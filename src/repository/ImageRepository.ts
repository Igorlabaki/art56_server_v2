import { Image, Prisma } from '@prisma/client';

export interface IImageParams {
  area: string;
  imageUrl: string;
  position: number;
  tag: string;
  responsiveMode: string;
}

export interface IUpdateImageParams {
  imageId: string;
  data: {
    area: string;
    imageUrl: string;
    position: number;
    tag: string;
    responsiveMode: string;
  };
}

export interface IListImagesParams {
  area?: string;
}

export interface IListByTagImagesParams {
  tag?: string;
  responsiveMode?: string;
}
export interface IListTagImagesParams {
  tag: string | Prisma.StringFilter | undefined;
}

export interface IImageRepository {
  delete: (reference: string) => Promise<Image | null>;
  getById: (reference: string) => Promise<Image | null>;
  update: (reference: IUpdateImageParams) => Promise<Image | null>;
  list: (reference: string | undefined) => Promise<Image[] | null>;
  create: (reference: IImageParams) => Promise<Image | null>;
  validateImage: (reference: IImageParams) => Promise<Image | null>;
  getListByTag: (reference: IListByTagImagesParams) => Promise<Image[] | null>;
}
