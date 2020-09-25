import { BaseState } from "@/libs/core/models";
import { I18nState } from "@/libs/i18n/models";
import { LocalStorageState } from "@/libs/local-storage/models";
import { TextSnippetsState } from '@/text-snippets/models';

export interface RootState extends BaseState {
  i18n?: I18nState;
  localStorage?: LocalStorageState;
  textSnippets?: TextSnippetsState;
}
