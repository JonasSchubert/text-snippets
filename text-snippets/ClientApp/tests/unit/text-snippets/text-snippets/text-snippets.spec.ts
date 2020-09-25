import { shallowMount } from '@vue/test-utils';
import i18n from '@/core/i18n';
import vuetify from '@/core/plugins/vuetify.plugin';
import { createStore } from '@/core/store';
import { TextSnippet } from '@/text-snippets/models';
import TextSnippets from '@/text-snippets/views/TextSnippets.vue';

const store = createStore(vuetify);

// Mount the component
const wrapper = shallowMount(TextSnippets, {
  i18n,
  store,
  vuetify
});

describe('TextSnippets', () => {
  describe('computed', () => {
    describe('headers', () => {
      test('should not change unexpected', () => {
        // Arrange && Act
        const { headers } = wrapper.vm as any;

        // Assert
        expect(headers).toMatchSnapshot();
      });
    });
  });

  describe('methods', () => {
    describe('onDeleteConfirmed', () => {
      test('should call $store.dispatch', () => {
        // Arrange
        const item: TextSnippet = {
          id: 2,
          value: "42"
        } as unknown as TextSnippet;
        store.dispatch = jest.fn();

        // Act
        (wrapper.vm as any).onDeleteConfirmed(item);

        // Assert
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith('text-snippets/delete', { item });
      });
    });

    describe('requestDelete', () => {
      test('should call $refs.deleteConfirmDialog.open', () => {
        // Arrange
        const item: TextSnippet = {
          id: 2,
          value: "42"
        } as unknown as TextSnippet;
        (wrapper.vm as any).$refs = {
          deleteConfirmDialog: { open: jest.fn() }
        };

        // Act
        (wrapper.vm as any).requestDelete(item);

        // Assert
        expect((wrapper.vm as any).$refs.deleteConfirmDialog.open).toHaveBeenCalledTimes(1);
        expect((wrapper.vm as any).$refs.deleteConfirmDialog.open).toHaveBeenCalledWith({
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
          messageParams: ["42"],
          meta: item,
          title: "message.delete-title"
        });
      });
    });
  });
});
