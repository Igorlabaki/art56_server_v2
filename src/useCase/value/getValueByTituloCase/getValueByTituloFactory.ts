import { GetValueByTituloController } from './getValueByTituloController';

export const getValueByTituloFactory = () => {
/*   const prismaValueRepository = new PrismaValueRepository(prismaClient);
  const getValueByTituloCase = new GetValueByTituloCase(prismaValueRepository); */
  const getValueByTituloController = new GetValueByTituloController();

  return getValueByTituloController;
};
