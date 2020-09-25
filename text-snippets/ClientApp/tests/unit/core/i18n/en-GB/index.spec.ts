import enGb from '@/core/i18n/en-GB';

describe('enGb', () => {
  test('should not change unexpected', () => {
    // Assert
    expect(enGb).toMatchSnapshot();
  });
});
