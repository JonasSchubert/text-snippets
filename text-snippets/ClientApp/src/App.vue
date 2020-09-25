<template>
  <v-app>
    <app-bar :is-anything-loading="isAnythingLoading">
      <app-bar-btn
        dark
        v-for="(route, index) in visibleRoutes"
        :icon="route.meta.icon"
        :key="`Route_${route.name}_${index}`"
        :text="$tc(route.meta.text, 1)"
        :to="route.path"
      />
    </app-bar>

    <app-content />
    <app-footer :version="version">
      <v-spacer />
    </app-footer>
    <app-snackbar />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { routes } from "./core/router/routes";
import { GetterTypes as GlobalGetters } from "./core/store/types";
import { ActionTypes as TextSnippetsActions, ModuleType as TextSnippetsModule } from "./text-snippets/store/types";
import { ActionTypes as I18nActions } from "./libs/i18n/store/types";
import {
  ActionTypes as LocaleStorageActions,
  ModuleType as LocaleStorageModule,
} from "./libs/local-storage/store/types";
import { version } from "../package.json";

@Component({
  name: "app",
  computed: {
    ...mapGetters([GlobalGetters.isAnythingLoading])
  },
})
export default class App extends Vue {
  $router!: any;

  // eslint-disable-next-line class-methods-use-this
  get visibleRoutes(): any[] {
    return routes.filter((route: any) => route.meta.inNavigationBar);
  }

  version: string = version;

  created(): void {
    this.$store.dispatch(`i18n/${I18nActions.getAvailableLocales}`);
    this.$store.dispatch(`${LocaleStorageModule}/${LocaleStorageActions.loadHistory}`);
    this.$store.dispatch(`${LocaleStorageModule}/${LocaleStorageActions.loadSettings}`);
    this.$store.dispatch(`${TextSnippetsModule}/${TextSnippetsActions.load}`);
  }
}
</script>
