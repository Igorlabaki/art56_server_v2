import { INotificationRepository } from "../../../repository/INotificacaoRepository";

class GetNotificationByIdCase {
  constructor(private NotificationRepository: INotificationRepository) {}

  async execute(NotificationId: string) {
    const isNotificationExist = await this.NotificationRepository.getById(NotificationId);

    if (!isNotificationExist) {
      const error: Error = {
        name:"Error",
        message: 'This notification dont exist.',
      };

      throw error;
    }

    return isNotificationExist;
  }
}

export { GetNotificationByIdCase };
