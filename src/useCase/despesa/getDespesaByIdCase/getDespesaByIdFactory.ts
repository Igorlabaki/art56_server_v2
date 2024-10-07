import { GetDespesaByIdController } from "./getDespesaByIdController";

export const getDespesaByIdFactory = () => {
 /*  const prismaDespesaRepository = new PrismaDespesaRepository(prismaClient);
  const getDespesaByIdCase = new GetDespesaByIdCase(prismaDespesaRepository); */
  const getDespesaByIdController = new GetDespesaByIdController();

  return getDespesaByIdController;
};
