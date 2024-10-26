import { INotificationRepository } from "../../../repository/INotificacaoRepository";

class DeleteNotificationCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(reference: string) {

    const validateIfExistNotificationExist = await this.notificationRepository.getById(reference);

    if (!validateIfExistNotificationExist) {
      const error: Error = {
        name:"Error",
        message: 'This notification dont exist.',
      };

      throw error;
    }

    const deleteNotification = await this.notificationRepository.delete(reference);

    return deleteNotification;
  }
}

export { DeleteNotificationCase };
