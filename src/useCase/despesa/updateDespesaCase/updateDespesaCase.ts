import { IDespesaRepository, IUpdateDespesaParams } from "../../../repository/IDespesaRepository";

class UpdateDespesaCase {
  constructor(private DespesaRepository: IDespesaRepository) {}

  async execute({ data, despesaId }: IUpdateDespesaParams) {
    /* const entityExists = await this.DespesaRepository.validateDespesa({...data}) */
    /* 
        if(entityExists){
            const error : ErrorMessage = {
                errorMessage: "Ja existe um valor com este titulo."
            }

            return error
        } */

    const updateDespesa = await this.DespesaRepository.update({ despesaId, data });

    return updateDespesa;
  }
}

export { UpdateDespesaCase };
