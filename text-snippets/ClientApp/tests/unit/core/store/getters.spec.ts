import { RootState } from '@/core/models';
import { createGetters } from '@/core/store/getters';
import { GetterTypes } from '@/core/store/types';
import { LocalStorageState } from "@/libs/local-storage/models";
import { I18nState } from "@/libs/i18n/models";
import { TextSnippetsState } from '@/text-snippets/models';

describe('getters', () => {
  const getters = createGetters();

  describe(`${GetterTypes.isAnythingLoading}`, () => {
    test('should return true for requests bigger then 0', () => {
      // Arrange
      const state: RootState = {
        i18n: {} as I18nState,
        localStorage: {} as LocalStorageState,
        requests: 5,
        textSnippets: {} as TextSnippetsState
      };

      // Act
      const actual = getters[GetterTypes.isAnythingLoading](state, getters, state, {});

      // Assert
      expect(actual).toBeTruthy();
    });

    test('should return false for requests equal to 0', () => {
      // Arrange
      const state: RootState = {
        i18n: {} as I18nState,
        localStorage: {} as LocalStorageState,
        requests: 0,
        textSnippets: {} as TextSnippetsState
      };

      // Act
      const actual = getters[GetterTypes.isAnythingLoading](state, getters, state, {});

      // Assert
      expect(actual).toBeFalsy();
    });
  });
});
