import { ListDespesasController } from "./listDespesaController";

export const listDespesaFactory = () => {
/*   const prismaImageRepository = new PrismaImageRepository(prismaClient);
  const listDespesaCase = new ListDespesaCase(prismaImageRepository); */
  const listDespesaController = new ListDespesasController();

  return listDespesaController;
};
