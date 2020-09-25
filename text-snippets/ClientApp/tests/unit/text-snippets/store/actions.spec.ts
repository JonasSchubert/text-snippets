import axios from 'axios';
import { TextSnippet } from '@/text-snippets/models';
import { createActions } from '@/text-snippets/store/actions';
import { ActionTypes } from '@/text-snippets/store/types';

jest.mock('axios');

describe('text-snippets/actions', () => {
  const actions = createActions();

  describe(`${ActionTypes.add}`, () => {
    test('should call backend as expected and commit with returned true data', async (done) => {
      // Arrange
      const item: TextSnippet = { id: '1', value: "42" } as TextSnippet;
      const commit = jest.fn();
      const dispatch = jest.fn();
      const responseData = true;
      axios.put = jest.fn(() => Promise.resolve({ data: responseData })) as any;

      // Act
      (actions[ActionTypes.add] as Function)({ commit, dispatch }, { item })
        .then(() => {
          // Assert
          expect(axios.put).toHaveBeenCalledTimes(1);
          expect(axios.put).toHaveBeenCalledWith('TextSnippets', item);
          expect(commit).toHaveBeenCalledTimes(2);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenCalledWith('load');
          done();
        });
    });

    test('should call backend as expected and commit with returned false data', async (done) => {
      // Arrange
      const item: TextSnippet = { id: '1', value: "42" } as TextSnippet;
      const commit = jest.fn();
      const dispatch = jest.fn();
      const responseData = false;
      axios.put = jest.fn(() => Promise.resolve({ data: responseData })) as any;

      // Act
      (actions[ActionTypes.add] as Function)({ commit, dispatch }, { item })
        .then(() => {
          // Assert
          expect(axios.put).toHaveBeenCalledTimes(1);
          expect(axios.put).toHaveBeenCalledWith('TextSnippets', item);
          expect(commit).toHaveBeenCalledTimes(3);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setError', {
            error: {
              message: 'Failed to add 42',
              name: 'AddFailure'
            }
          });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(0);
          done();
        });
    });

    test('should call backend and handle error', async (done) => {
      // Arrange
      const item: TextSnippet = { id: '1', value: "42" } as TextSnippet;
      const commit = jest.fn();
      const dispatch = jest.fn();
      const responseError: Error = {
        message: 'message',
        name: 'name'
      };
      axios.put = jest.fn(() => Promise.reject(responseError)) as any;

      // Act
      (actions[ActionTypes.add] as Function)({ commit, dispatch }, { item })
        .then(() => {
          // Assert
          expect(axios.put).toHaveBeenCalledTimes(1);
          expect(axios.put).toHaveBeenCalledWith('TextSnippets', item);
          expect(commit).toHaveBeenCalledTimes(3);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setError', {
            error: {
              message: 'message',
              name: 'name'
            }
          });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          done();
        });
    });
  });

  describe(`${ActionTypes.delete}`, () => {
    test('should call backend as expected and commit with returned true data', async (done) => {
      // Arrange
      const item: TextSnippet = { id: '1', value: "42" } as TextSnippet;
      const commit = jest.fn();
      const dispatch = jest.fn();
      const responseData = true;
      axios.delete = jest.fn(() => Promise.resolve({ data: responseData })) as any;

      // Act
      (actions[ActionTypes.delete] as Function)({ commit, dispatch }, { item })
        .then(() => {
          // Assert
          expect(axios.delete).toHaveBeenCalledTimes(1);
          expect(axios.delete).toHaveBeenCalledWith('TextSnippets/1');
          expect(commit).toHaveBeenCalledTimes(2);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenCalledWith('load');
          done();
        });
    });

    test('should call backend as expected and commit with returned false data', async (done) => {
      // Arrange
      const item: TextSnippet = { id: '1', value: "42" } as TextSnippet;
      const commit = jest.fn();
      const dispatch = jest.fn();
      const responseData = false;
      axios.delete = jest.fn(() => Promise.resolve({ data: responseData })) as any;

      // Act
      (actions[ActionTypes.delete] as Function)({ commit, dispatch }, { item })
        .then(() => {
          // Assert
          expect(axios.delete).toHaveBeenCalledTimes(1);
          expect(axios.delete).toHaveBeenCalledWith('TextSnippets/1');
          expect(commit).toHaveBeenCalledTimes(3);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setError', {
            error: {
              message: 'Failed to delete 42',
              name: 'DeleteFailure'
            }
          });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(0);
          done();
        });
    });

    test('should call backend and handle error', async (done) => {
      // Arrange
      const item: TextSnippet = { id: '1', value: "42" } as TextSnippet;
      const commit = jest.fn();
      const dispatch = jest.fn();
      const responseError: Error = {
        message: 'message',
        name: 'name'
      };
      axios.delete = jest.fn(() => Promise.reject(responseError)) as any;

      // Act
      (actions[ActionTypes.delete] as Function)({ commit, dispatch }, { item })
        .then(() => {
          // Assert
          expect(axios.delete).toHaveBeenCalledTimes(1);
          expect(axios.delete).toHaveBeenCalledWith('TextSnippets/1');
          expect(commit).toHaveBeenCalledTimes(3);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setError', {
            error: {
              message: 'message',
              name: 'name'
            }
          });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          done();
        });
    });
  });

  describe(`${ActionTypes.load}`, () => {
    test('should call backend as expected and commit with returned data', async (done) => {
      // Arrange
      const commit = jest.fn();
      const responseData: TextSnippet[] = [
        { id: '1', value: "42" } as TextSnippet,
        { id: '3', value: "7" } as TextSnippet,
        { id: '2', value: "10" } as TextSnippet
      ];
      axios.get = jest.fn(() => Promise.resolve({ data: responseData })) as any;

      // Act
      (actions[ActionTypes.load] as Function)({ commit })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('TextSnippets');
          expect(commit).toHaveBeenCalledTimes(4);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setList', {
            list: [
              { id: '1', value: "42" } as TextSnippet,
              { id: '3', value: "7" } as TextSnippet,
              { id: '2', value: "10" } as TextSnippet
            ]
          });
          expect(commit).toHaveBeenCalledWith('setError', { error: undefined });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          done();
        });
    });

    test('should call backend and handle error', async (done) => {
      // Arrange
      const commit = jest.fn();
      const responseError: Error = {
        message: 'message',
        name: 'name'
      };
      axios.get = jest.fn(() => Promise.reject(responseError)) as any;

      // Act
      (actions[ActionTypes.load] as Function)({ commit })
        .then(() => {
          // Assert
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith('TextSnippets');
          expect(commit).toHaveBeenCalledTimes(3);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setError', {
            error: {
              message: 'message',
              name: 'name'
            }
          });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          done();
        });
    });
  });

  describe(`${ActionTypes.update}`, () => {
    test('should call backend as expected and commit with returned true data', async (done) => {
      // Arrange
      const item: TextSnippet = { id: '1', value: "42" } as TextSnippet;
      const commit = jest.fn();
      const dispatch = jest.fn();
      const responseData = true;
      axios.post = jest.fn(() => Promise.resolve({ data: responseData })) as any;

      // Act
      (actions[ActionTypes.update] as Function)({ commit, dispatch }, { item })
        .then(() => {
          // Assert
          expect(axios.post).toHaveBeenCalledTimes(1);
          expect(axios.post).toHaveBeenCalledWith('TextSnippets', item);
          expect(commit).toHaveBeenCalledTimes(2);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenCalledWith('load');
          done();
        });
    });

    test('should call backend as expected and commit with returned false data', async (done) => {
      // Arrange
      const item: TextSnippet = { id: '1', value: "42" } as TextSnippet;
      const commit = jest.fn();
      const dispatch = jest.fn();
      const responseData = false;
      axios.post = jest.fn(() => Promise.resolve({ data: responseData })) as any;

      // Act
      (actions[ActionTypes.update] as Function)({ commit, dispatch }, { item })
        .then(() => {
          // Assert
          expect(axios.post).toHaveBeenCalledTimes(1);
          expect(axios.post).toHaveBeenCalledWith('TextSnippets', item);
          expect(commit).toHaveBeenCalledTimes(3);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setError', {
            error: {
              message: 'Failed to update 42',
              name: 'UpdateFailure'
            }
          });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          expect(dispatch).toHaveBeenCalledTimes(0);
          done();
        });
    });

    test('should call backend and handle error', async (done) => {
      // Arrange
      const item: TextSnippet = { id: '1', value: "42" } as TextSnippet;
      const commit = jest.fn();
      const dispatch = jest.fn();
      const responseError: Error = {
        message: 'message',
        name: 'name'
      };
      axios.post = jest.fn(() => Promise.reject(responseError)) as any;

      // Act
      (actions[ActionTypes.update] as Function)({ commit, dispatch }, { item })
        .then(() => {
          // Assert
          expect(axios.post).toHaveBeenCalledTimes(1);
          expect(axios.post).toHaveBeenCalledWith('TextSnippets', item);
          expect(commit).toHaveBeenCalledTimes(3);
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: true });
          expect(commit).toHaveBeenCalledWith('setError', {
            error: {
              message: 'message',
              name: 'name'
            }
          });
          expect(commit).toHaveBeenCalledWith('setIsLoading', { isLoading: false });
          done();
        });
    });
  });
});
