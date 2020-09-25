import axios from 'axios';
import Vue from 'vue';
import { Store } from 'vuex';
import App from './App.vue';
import i18n from './core/i18n';
import { RootState } from './core/models';
import vuetifyPlugin from './core/plugins/vuetify.plugin';
import router from './core/router';
import { createStore } from './core/store';
import { createAxiosPlugin } from './libs/core/plugins/axios.plugin';
import controlsPlugin from './libs/core/plugins/controls.plugin';
import './registerServiceWorker';

const baseUrl = process.env.NODE_ENV === 'production' ? 'text-snippets/api/v1/' : 'http://localhost:5000/text-snippets/api/v1/';
const axiosPlugin = createAxiosPlugin(baseUrl);

const store: Store<RootState> = createStore(vuetifyPlugin);

Vue.config.devtools = process.env.NODE_ENV !== 'production';
Vue.config.productionTip = false;

Vue.use(axiosPlugin, { axios, store });
Vue.use(controlsPlugin);

new Vue({
  i18n,
  router,
  store,
  vuetify: vuetifyPlugin,
  render: (h) => h(App),
}).$mount('#app');
