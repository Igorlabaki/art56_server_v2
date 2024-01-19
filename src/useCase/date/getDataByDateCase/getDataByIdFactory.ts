import { GetDataByDateController } from './getDataByIdController';

export const getDateEventByDateFactory = () => {
/*   const prismaDataRepository = new PrismaDateEventRepository(prismaClient);
  const getDataByIdCase = new GetDataByIdCase(prismaDataRepository); */
  const getDataByDateController = new GetDataByDateController();

  return getDataByDateController;
};
