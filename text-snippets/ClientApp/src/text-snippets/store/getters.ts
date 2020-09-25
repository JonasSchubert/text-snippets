import { GetterTree } from 'vuex';
import { RootState } from '@/core/models';
import { TextSnippet, TextSnippetsState } from '@/text-snippets/models';
import { GetterTypes } from './types';

export const createGetters = (): GetterTree<TextSnippetsState, RootState> => ({
  [GetterTypes.error]: (state: TextSnippetsState): Error | undefined => state.error,
  [GetterTypes.isLoading]: (state: TextSnippetsState): boolean => state.isLoading,
  [GetterTypes.list]: (state: TextSnippetsState): TextSnippet[] => state.list
});
