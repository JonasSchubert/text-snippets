import { routes } from '@/core/router/routes';

describe('routes', () => {
  test('should not change unexpected', () => {
    // Assert
    expect(routes).toMatchSnapshot();
  });

  test('should lazy load all but the first component and have defined path and name', () => {
    // Arrange
    for (let index = 0; index < routes.length; index += 1) {
      // Act
      const route = routes[index];

      // Assert
      expect(typeof route.component).toBe('function');
      expect(route.meta).toBeDefined();
      expect(route.name).toBeDefined();
      expect(route.path).toBeDefined();
    }
  });
});
