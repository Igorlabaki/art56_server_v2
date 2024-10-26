import {
  INotificationRepository,
  IUpdateNotificationParams,
} from "../../../repository/INotificacaoRepository";

class UpdateNotificationCase {
  constructor(private NotificationRepository: INotificationRepository) {}

  async execute({ data, notificationId }: IUpdateNotificationParams) {
    const updateNotification = await this.NotificationRepository.update({
      notificationId,
      data,
    });

    return updateNotification;
  }
}

export { UpdateNotificationCase };
