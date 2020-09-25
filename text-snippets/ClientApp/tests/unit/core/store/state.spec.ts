import { RootState } from '@/core/models';
import { createState } from '@/core/store/state';

describe('Rootstate', () => {
  test('should not change unexpected', () => {
    // Arrange && Act
    const rootState: RootState = createState();

    // Assert
    expect(rootState).toMatchSnapshot();
  });
});
