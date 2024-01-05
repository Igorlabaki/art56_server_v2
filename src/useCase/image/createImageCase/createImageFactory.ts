import { CreateImageController } from './createImageController';

export const creatImageFactory = () => {
  /* const prismaImageRepository = new PrismaImageRepository(prismaClient);
  const creatImagesCase = new CreateImageCase(prismaImageRepository); */
  const creatImageController = new CreateImageController();

  return creatImageController;
};
