import { Notification } from '../entities/notification/notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findAll(): Promise<Array<Notification>>;
}
