export interface NotificationProjection {
  id: string;
  recipientId: string;
  content: string;
  category: string;
  createdAt: Date;
}
