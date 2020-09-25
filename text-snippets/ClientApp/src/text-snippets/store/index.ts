import { Module } from 'vuex';
import { RootState } from '@/core/models';
import { TextSnippetsState } from '@/text-snippets/models';
import { createActions } from './actions';
import { createGetters } from './getters';
import { createMutations } from './mutations';
import { createState } from './state';

export const createModule = (): Module<TextSnippetsState, RootState> => ({
  namespaced: true,
  actions: createActions(),
  getters: createGetters(),
  mutations: createMutations(),
  state: createState()
});
