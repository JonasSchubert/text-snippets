import { Module } from 'vuex';
import i18n, { defaultLocale, defaultMessages } from '@/core/i18n';
import { RootState } from '@/core/models';
import { createModule } from "@/libs/i18n/store";
import { I18nModuleConfig, I18nState } from "@/libs/i18n/models";

export const createI18nModule = (): Module<I18nState, RootState> => {
  const i18nModuleConfig: I18nModuleConfig = {
    baseUrl: '/',
    defaultLocale,
    defaultMessages,
    i18n
  };

  return createModule(i18nModuleConfig);
};
