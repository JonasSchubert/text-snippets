import { MutationTree } from 'vuex';
import { RootState } from '@/core/models';
import { MutationTypes } from './types';

export const createMutations = (): MutationTree<RootState> => ({
  [MutationTypes.decreaseRequests]: (state: RootState): void => { state.requests -= 1; },
  [MutationTypes.increaseRequests]: (state: RootState): void => { state.requests += 1; }
});
