import { TextSnippet } from './text-snippet';

export interface TextSnippetsState {
  error?: Error;
  isLoading: boolean;
  list: TextSnippet[];
}
