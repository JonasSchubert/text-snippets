import { TextSnippetsState } from '@/text-snippets/models';

export const createState = (): TextSnippetsState => ({
  error: undefined,
  isLoading: false,
  list: []
});
