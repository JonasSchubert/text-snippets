import { GetterTree } from 'vuex';
import { RootState } from '@/core/models';
import { GetterTypes } from './types';

export const createGetters = (): GetterTree<RootState, RootState> => ({
  [GetterTypes.isAnythingLoading]: (state: RootState): boolean => state.requests > 0
});
