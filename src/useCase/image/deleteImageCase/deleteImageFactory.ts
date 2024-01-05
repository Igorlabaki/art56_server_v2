import { DeleteImageController } from './deleteImageController';

export const deleteImageFactory = () => {
/*   const prismaImageRepository = new PrismaImageRepository(prismaClient);
  const deleteImagesCase = new DeleteImagetCase(prismaImageRepository); */
  const deleteImageController = new DeleteImageController();

  return deleteImageController;
};
