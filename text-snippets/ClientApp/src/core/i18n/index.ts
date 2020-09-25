import Vue from 'vue';
import VueI18n from 'vue-i18n';

import enGb from './en-GB';

Vue.use(VueI18n);

export const defaultLocale = 'en-GB';
export const defaultMessages = { [defaultLocale]: enGb };

const i18n = new VueI18n({
  fallbackLocale: defaultLocale,
  locale: defaultLocale,
  messages: defaultMessages,
  silentTranslationWarn: process.env.NODE_ENV === 'production'
});

export default i18n;
