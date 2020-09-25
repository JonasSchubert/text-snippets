import Vue from 'vue';
import Vuex, { Store, StoreOptions } from 'vuex';
import { createI18nModule } from '@/core/i18n/module-helper';
import { RootState } from '@/core/models';
import { ModuleType as LocalStorageModule } from "@/libs/local-storage/store/types";
import { createLocalStorageModule } from "@/libs/local-storage/store";
import { createModule as createTextSnippetsModule } from '@/text-snippets/store';
import { ModuleType as TextSnippetsModule } from '@/text-snippets/store/types';
import { createGetters } from './getters';
import { createMutations } from './mutations';
import { createState } from './state';

Vue.use(Vuex);

export const createStore = (vuetify: any): Store<RootState> => {
  const store: StoreOptions<RootState> = {
    getters: createGetters(),
    modules: {
      i18n: createI18nModule(),
      [LocalStorageModule]: createLocalStorageModule<RootState>('text-snippets', vuetify),
      [TextSnippetsModule]: createTextSnippetsModule()
    },
    mutations: createMutations(),
    state: createState(),
    strict: process.env.NODE_ENV !== 'production'
  };

  return new Store<RootState>(store);
};
