<template>
  <v-row class="fill-height" no-gutters>
    <v-col>
      <v-card height="100%">
        <v-toolbar extension-height="10" flat>
          <v-subheader>{{ $tc("message.text-snippet", list.length) }}</v-subheader>
          <v-spacer></v-spacer>
          <v-text-field
            :label="$t('message.search')"
            append-icon="mdi-magnify"
            dense
            hide-details
            single-line
            v-model="search"
          ></v-text-field>

          <template v-slot:extension>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-fab-transition>
                  <v-btn
                    @click="addItem"
                    absolute
                    bottom
                    class="mr-1"
                    color="accent"
                    fab
                    right
                    small
                    v-on="on"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-fab-transition>
              </template>
              <span>{{ $t("message.add") }}</span>
            </v-tooltip>
          </template>
        </v-toolbar>

        <v-data-table
          :footer-props="{
            'items-per-page-options': [5, 15, 25, 50]
          }"
          :headers="headers"
          :items="list"
          :items-per-page="25"
          :loading="isLoading"
          :search="search"
          :sort-by="['dateTimeAdded']"
          :sort-desc="[false]"
          dense
          multi-sort
        >
          <template v-slot:item.value="{ item }">
            {{ item.value }}
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon ripple @click="copyToClipboard(item.value)" v-on="on">
                  <v-icon>mdi-content-copy</v-icon>
                </v-btn>
              </template>
              <span>{{ $t("message.copy-to-clipboard") }}</span>
            </v-tooltip>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2" small v-on="on" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
              </template>
              <span>{{ $t("message.update") }}</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon color="error" small v-on="on" @click="requestDelete(item)">mdi-delete</v-icon>
              </template>
              <span>{{ $t("message.delete") }}</span>
            </v-tooltip>
          </template>
        </v-data-table>

        <confirm-dialog ref="deleteConfirmDialog" @confirm="onDeleteConfirmed"></confirm-dialog>
        <edit-text-snippet-dialog ref="editTextSnippetDialog"></edit-text-snippet-dialog>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { snackbar } from '@/libs/core/controls/app-snackbar/snackbar';
import { ConfirmDialogConfig } from "@/libs/core/dialogs/confirm-dialog";
import EditTextSnippetDialog from "@/text-snippets/dialogs/edit-text-snippet-dialog/edit-text-snippet-dialog.vue";
import { TextSnippet } from "@/text-snippets/models";
import { ActionTypes, GetterTypes, ModuleType } from "@/text-snippets/store/types";

@Component({
  name: "text-snippets",
  components: {
    "edit-text-snippet-dialog": EditTextSnippetDialog
  },
  computed: {
    ...mapGetters(ModuleType, [GetterTypes.isLoading, GetterTypes.list])
  }
})
export default class TextSnippets extends Vue {
  $refs!: {
    deleteConfirmDialog: any;
    editTextSnippetDialog: any;
  };

  public search = "";

  get headers(): any[] {
    return [
      { text: this.$tc("message.tag", 1), value: "tag", sortable: true },
      { text: this.$tc("message.value", 1), value: "value", sortable: true },
      { text: this.$tc("message.description", 1), value: "description", sortable: true },
      { text: this.$t("message.date-time-added"), value: "dateTimeAdded", sortable: true },
      { text: this.$t("message.date-time-updated"), value: "dateTimeUpdated", sortable: true },
      { text: "", value: "actions", sortable: false }
    ];
  }

  public addItem(): void {
    (this.$refs.editTextSnippetDialog as any).open();
  }

  // eslint-disable-next-line class-methods-use-this
  public copyToClipboard(value: string): void {
    navigator.clipboard
      .writeText(value)
      .then(() => snackbar.info({ message: "message.copy-to-clipboard-success" }))
      .catch(() => snackbar.warning({ message: "message.copy-to-clipboard-failure" }));
  }

  public editItem(item: TextSnippet): void {
    (this.$refs.editTextSnippetDialog as any).open(item);
  }

  public onDeleteConfirmed(item: TextSnippet): void {
    this.$store.dispatch(`${ModuleType}/${ActionTypes.delete}`, { item });
  }

  public requestDelete(item: TextSnippet): void {
    const config: ConfirmDialogConfig<TextSnippet> = {
      buttons: {
        cancel: {
          text: "message.cancel"
        },
        confirm: {
          text: "message.delete",
          textColor: "error"
        }
      },
      message: "message.delete-message",
      messageParams: [item.value.toString()],
      meta: item,
      title: "message.delete-title"
    };
    this.$refs.deleteConfirmDialog.open(config);
  }
}
</script>
