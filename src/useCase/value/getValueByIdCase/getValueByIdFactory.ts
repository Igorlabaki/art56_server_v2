import { GetValueByIdController } from './getValueByIdController';

export const getValueByIdFactory = () => {
/*   const prismaValueRepository = new PrismaValueRepository(prismaClient);
  const getValueByIdCase = new GetValueByIdCase(prismaValueRepository); */
  const getValueByIdController = new GetValueByIdController();

  return getValueByIdController;
};
