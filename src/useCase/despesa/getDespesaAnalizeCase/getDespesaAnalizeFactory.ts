import { GetDespesaAnalizeController } from "./getDespesaAnalizeController";

export const getDespesaAnalizeFactory = () => {
 /*  const prismaDespesaRepository = new PrismaDespesaRepository(prismaClient);
  const getDespesaAnalizeCase = new GetDespesaAnalizeCase(prismaDespesaRepository); */
  const getDespesaAnalizeController = new GetDespesaAnalizeController();

  return getDespesaAnalizeController;
};
