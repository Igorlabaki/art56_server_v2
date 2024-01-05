import { ListImagesController } from './listImagesController';

export const listImagesFactory = () => {
/*   const prismaImageRepository = new PrismaImageRepository(prismaClient);
  const listImagesCase = new ListImagesCase(prismaImageRepository); */
  const listImagesController = new ListImagesController();

  return listImagesController;
};
