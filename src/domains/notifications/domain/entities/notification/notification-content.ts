import { ContentLengthError } from '../../errors/content-length-error';

export class NotificationContent {
  private readonly content: string;

  get value() {
    return this.content;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLength(content);

    if (!isContentLengthValid) {
      throw new ContentLengthError();
    }

    this.content = content;
  }
}
