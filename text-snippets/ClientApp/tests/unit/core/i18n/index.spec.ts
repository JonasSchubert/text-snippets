import { defaultLocale } from '@/core/i18n';

describe('defaultLocale', () => {
  test('should not change unexpected', () => {
    // Assert
    expect(defaultLocale).toBe('en-GB');
  });
});
