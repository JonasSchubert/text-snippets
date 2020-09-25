export interface DefaultState<T> {
  error?: Error;
  isLoading: boolean;
  list: T[];
  selection?: T;
}
