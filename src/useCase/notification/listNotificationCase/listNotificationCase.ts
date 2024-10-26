import { INotificationRepository } from "../../../repository/INotificacaoRepository";

class ListNotificationsCase {
  constructor(private NotificationRepository: INotificationRepository) {}

  async execute(query: string | undefined) {
    const NotificationList = await this.NotificationRepository.list(query);

    return NotificationList;
  }
}

export { ListNotificationsCase };
