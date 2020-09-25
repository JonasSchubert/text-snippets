import { TextSnippet, TextSnippetsState } from '@/text-snippets/models';
import { createMutations } from '@/text-snippets/store/mutations';
import { MutationTypes } from '@/text-snippets/store/types';

describe('text-snippets/mutations', () => {
  let state: TextSnippetsState;
  const mutations = createMutations();

  beforeEach(() => {
    state = {
      error: undefined,
      isLoading: false,
      list: []
    };
  });

  describe(`${MutationTypes.setError}`, () => {
    test('should set error', () => {
      // Arrange
      const error: Error = {
        message: 'message',
        name: 'name'
      };

      // Act
      mutations[MutationTypes.setError](state, { error });

      // Assert
      expect(state.error).toMatchSnapshot({
        message: 'message',
        name: 'name'
      });
    });
  });

  describe(`${MutationTypes.setIsLoading}`, () => {
    test('should set isLoading', () => {
      // Arrange
      const isLoading = true;

      // Act
      mutations[MutationTypes.setIsLoading](state, { isLoading });

      // Assert
      expect(state.isLoading).toBeTruthy();
    });
  });

  describe(`${MutationTypes.setList}`, () => {
    test('should set list', () => {
      // Arrange
      const list: TextSnippet[] = [
        { id: '1' } as TextSnippet
      ];

      // Act
      mutations[MutationTypes.setList](state, { list });

      // Assert
      expect(state.list).toMatchSnapshot([
        { id: '1' }
      ]);
    });
  });
});
