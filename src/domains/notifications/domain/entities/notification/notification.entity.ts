import { BaseEntity } from '@core/domain/entities/base-entity';
import { Replace } from '@core/helpers/types/replace';
import { randomUUID } from 'node:crypto';
import { NotificationContent } from './notification-content';

export interface NotificationProps {
  id: string;
  recipientId: string;
  content: NotificationContent;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
}

export interface OptionalConstructorArgs {
  id?: string;
  createdAt?: Date;
}

export class Notification extends BaseEntity<NotificationProps> {
  constructor(props: Replace<NotificationProps, OptionalConstructorArgs>) {
    super({
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    });
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set content(content: NotificationContent) {
    this.props.content = content;
  }

  public get content(): NotificationContent {
    return this.props.content;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category(): string {
    return this.props.category;
  }

  public read() {
    this.props.readAt = new Date();
  }

  public unread() {
    this.props.readAt = null;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
