// Import `shallowMount` from Vue Test Utils and the component being tested
import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueI18n from 'vue-i18n';
import Vuex, { Store } from 'vuex';
import vuetify from '@/core/plugins/vuetify.plugin';
import App from '@/App.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);

const i18n = new VueI18n({});
const store: Store<any> = new Store({});

// helper function that mounts and returns the rendered component
const getMountedComponent = (Component: any, propsData: any) => shallowMount(Component, {
  i18n,
  localVue,
  propsData,
  store,
  vuetify
});

describe('App', () => {
  test('sets the correct default data when mounted', () => {
    // Assert
    const defaultData = getMountedComponent(App, {}).vm.$data;
    expect(defaultData.version).toBeDefined();
  });

  // Mount an instance and inspect the render output
  test('renders the App correct', () => {
    // Assert
    expect(getMountedComponent(App, {}).html()).toBe(`<v-app-stub id=\"app\">
  <app-bar>
    <app-bar-btn dark="" icon="mdi-home" text="message.home" to="/"></app-bar-btn>
    <app-bar-btn dark="" icon="mdi-message-processing" text="message.text-snippet" to="/text-snippets"></app-bar-btn>
  </app-bar>
  <app-content></app-content>
  <app-footer version="20.09.25-0">
    <v-spacer-stub></v-spacer-stub>
  </app-footer>
  <app-snackbar></app-snackbar>
</v-app-stub>`);
  });
});
