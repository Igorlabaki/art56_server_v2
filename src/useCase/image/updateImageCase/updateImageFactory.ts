import { UpdateImageController } from './updateImageController';

export const updateImageFactory = () => {
/*   const prismaImageRepository = new PrismaImageRepository(prismaClient);
  const updateImagesCase = new UpdateImageCase(prismaImageRepository); */
  const updateImageController = new UpdateImageController();

  return updateImageController;
};
