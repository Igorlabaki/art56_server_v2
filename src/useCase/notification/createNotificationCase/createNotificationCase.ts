import {
  INotificationParams,
  INotificationRepository,
} from "../../../repository/INotificacaoRepository";
class CreateNotificationCase {
  constructor(private notificationRepository: INotificationRepository) {}
  async execute(data: INotificationParams) {
    const newNotification = await this.notificationRepository.create(data);

    return newNotification;
  }
}

export { CreateNotificationCase };
