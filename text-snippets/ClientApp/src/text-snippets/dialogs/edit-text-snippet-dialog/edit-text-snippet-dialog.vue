<template>
  <v-dialog v-model="showDialog" max-width="500" @keydown="onKeydown">
    <v-card>
      <v-card-title>
        <span
          class="headline"
        >{{ $t(`message.${editMode === EditMode.Add ? 'add' : 'update'}-text-snippet`) }}</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="editTextSnippetDialogForm" v-model="valid">
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  :label="$tc('message.tag', 1)"
                  :rules="rules.tag"
                  autofocus
                  clearable
                  counter="32"
                  prepend-icon="mdi-tag"
                  type="text"
                  v-model.trim="textSnippet.tag"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  :label="$tc('message.value', 1)"
                  :rules="rules.value"
                  clearable
                  counter="2048"
                  prepend-icon="mdi-message-processing"
                  type="text"
                  v-model.trim="textSnippet.value"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  :label="$tc('message.description', 1)"
                  :rules="rules.description"
                  clearable
                  counter="128"
                  prepend-icon="mdi-card-text"
                  type="text"
                  v-model.trim="textSnippet.description"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close">{{ $t('message.cancel') }}</v-btn>
        <v-btn color="primary" text @click="save" :disabled="!valid">{{ $t('message.save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { LocaleMessages } from "vue-i18n";
import { Component } from "vue-property-decorator";
import { EditMode } from "@/libs/core/enums";
import { TextSnippet } from "@/text-snippets/models";
import { ActionTypes, ModuleType } from "@/text-snippets/store/types";

const createDefaultTextSnippet = () => ({
  description: "",
  tag: "",
  value: ""
} as unknown as TextSnippet);

@Component({
  name: "edit-text-snippet-dialog"
})
export default class EditTextSnippetDialog extends Vue {
  $refs!: {
    editTextSnippetDialogForm: any;
  };

  editMode: EditMode = EditMode.Null;

  EditMode = EditMode;

  showDialog = false;

  textSnippet: TextSnippet = createDefaultTextSnippet();

  valid = false;

  get rules(): { description: any[]; tag: any[]; value: any[]; } {
    return {
      description: [
        (value: string): boolean | string | LocaleMessages => (!!value && value.trim().length > 0) || this.$t("message.required"),
        (value: string): boolean | string | LocaleMessages => !value || value.length <= 128 || this.$t("message.invalid-length")
      ],
      tag: [
        (value: string): boolean | string | LocaleMessages => (!!value && value.trim().length > 0) || this.$t("message.required"),
        (value: string): boolean | string | LocaleMessages => !value || value.length <= 32 || this.$t("message.invalid-length")
      ],
      value: [
        (value: string): boolean | string | LocaleMessages => (!!value && value.trim().length > 0) || this.$t("message.required"),
        (value: string): boolean | string | LocaleMessages => !value || value.length <= 2048 || this.$t("message.invalid-length")
      ]
    };
  }

  close(): void {
    this.textSnippet = createDefaultTextSnippet();
    this.showDialog = false;
  }

  onKeydown(keyEvent: KeyboardEvent): void {
    if (keyEvent.code === "Enter") {
      this.save();
    }
  }

  open(textSnippet?: TextSnippet): void {
    this.textSnippet = {
      ...createDefaultTextSnippet(),
      ...textSnippet
    } as TextSnippet;
    this.editMode = textSnippet ? EditMode.Update : EditMode.Add;
    this.showDialog = true;
    setTimeout(() => this.$refs.editTextSnippetDialogForm.validate(), 0);
  }

  save(): void {
    if (this.valid && this.showDialog) {
      switch (this.editMode) {
        case EditMode.Add:
          this.$store.dispatch(`${ModuleType}/${ActionTypes.add}`, { item: this.textSnippet });
          break;
        case EditMode.Update:
          this.$store.dispatch(`${ModuleType}/${ActionTypes.update}`, { item: this.textSnippet });
          break;
        default:
          break;
      }

      this.close();
    }
  }
}
</script>
