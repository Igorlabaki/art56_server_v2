import { GetImageByIdController } from "./getImageByIdController";

export const getImageByIdFactory = () => {
 /*  const prismaImageRepository = new PrismaImageRepository(prismaClient);
  const getImageByIdCase = new GetImageByIdCase(prismaImageRepository); */
  const getImageByIdController = new GetImageByIdController();

  return getImageByIdController;
};
