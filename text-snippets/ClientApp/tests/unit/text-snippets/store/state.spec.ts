import { TextSnippetsState } from '@/text-snippets/models';
import { createState } from '@/text-snippets/store/state';

describe('text-snippets/state', () => {
  test('should not change unexpected', () => {
    // Arrange && Act
    const textSnippetsState: TextSnippetsState = createState();

    // Assert
    expect(textSnippetsState).toMatchSnapshot();
  });
});
