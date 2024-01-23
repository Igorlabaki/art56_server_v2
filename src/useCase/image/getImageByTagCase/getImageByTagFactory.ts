import { GetImageByTagController } from "./getImageByTagController";

export const getImageByTagFactory = () => {
 /*  const prismaImageRepository = new PrismaImageRepository(prismaClient);
  const getImageByIdCase = new GetImageByIdCase(prismaImageRepository); */
  const getImageByTagController = new GetImageByTagController();

  return getImageByTagController;
};
