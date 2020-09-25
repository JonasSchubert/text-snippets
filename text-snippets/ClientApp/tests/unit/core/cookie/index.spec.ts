import { appName, daysTilExpired, keys } from '@/core/cookie';

describe('cookie/appName', () => {
  test('should not change unexpected', () => {
    // Assert
    expect(appName).toMatchSnapshot();
  });
});

describe('cookie/daysTilExpired', () => {
  test('should not change unexpected', () => {
    // Assert
    expect(daysTilExpired).toMatchSnapshot();
  });
});

describe('cookie/keys', () => {
  test('should not change unexpected', () => {
    // Assert
    expect(keys).toMatchSnapshot();
  });
});
