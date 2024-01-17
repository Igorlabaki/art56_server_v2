import { GetDataByIdController } from './getDataByIdController';

export const getDateEventByIdFactory = () => {
/*   const prismaDataRepository = new PrismaDateEventRepository(prismaClient);
  const getDataByIdCase = new GetDataByIdCase(prismaDataRepository); */
  const getDataByIdController = new GetDataByIdController();

  return getDataByIdController;
};
