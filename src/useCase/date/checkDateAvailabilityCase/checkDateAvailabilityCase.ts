import { IDateEventRepository, ValidateDateParam } from "../../../repository/IDateEventRepository";

class CheckDateAvailabilityCase {
  constructor(private dateRepository: IDateEventRepository) {}

  async execute(data: ValidateDateParam) {
    const isNotAvailable = await this.dateRepository.checkAvailability({
      dataFim: data.dataFim,
      dataInicio: data.dataInicio,
    });

    if (isNotAvailable) {
      return {
        message: 'Data nao disponível.',
      };
    }

    return {
      message: 'Data disponível.',
    };
  }
}

export { CheckDateAvailabilityCase };
