import { ContentLengthError } from '../../errors/content-length-error';
import { NotificationContent } from './notification-content';

describe('NotificationContent', () => {
  it('should be able to create a notification content', () => {
    const content = new NotificationContent(
      'You have received a friend request',
    );

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new NotificationContent('Você')).toThrow(ContentLengthError);
  });

  it('should not be able to create a notification content with more than 240 characters', () => {
    const content = 'a'.repeat(241);
    expect(() => new NotificationContent(content)).toThrow(ContentLengthError);
  });
});
