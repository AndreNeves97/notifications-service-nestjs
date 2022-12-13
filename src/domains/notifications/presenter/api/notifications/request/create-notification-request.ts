import { IsString, IsUUID, Length, IsNotEmpty } from 'class-validator';

export class CreateNotificationRequest {
  @IsUUID()
  @IsNotEmpty()
  recipientId: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
