import { Notification } from '../entities/notification/notification.entity';

export abstract class NotificationsRepository {
  abstract findAll(): Promise<Array<Notification>>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;

  abstract create(notification: Notification): Promise<void>;
  abstract save(notification: Notification): Promise<void>;
}
