import { MutationTree } from 'vuex';
import { TextSnippet, TextSnippetsState } from '@/text-snippets/models';
import { MutationTypes } from './types';

export const createMutations = (): MutationTree<TextSnippetsState> => ({
  [MutationTypes.setError]: (state: TextSnippetsState, { error }: { error: Error }): void => { state.error = error; },
  [MutationTypes.setIsLoading]: (state: TextSnippetsState, { isLoading }: { isLoading: boolean }): void => { state.isLoading = isLoading; },
  [MutationTypes.setList]: (state: TextSnippetsState, { list }: { list: TextSnippet[] }): void => { state.list = list; }
});
