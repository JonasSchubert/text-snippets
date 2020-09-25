export const routes = [
  {
    path: '/',
    name: 'Home',
    component: (): any => import('@/libs/core/views/Home.vue'),
    meta: {
      allowLocaleStorage: true,
      icon: 'mdi-home',
      inNavigationBar: true,
      text: 'message.home'
    }
  },
  {
    path: '/text-snippets',
    name: 'TextSnippets',
    component: (): any => import('@/text-snippets/views/TextSnippets.vue'),
    meta: {
      allowLocaleStorage: true,
      icon: 'mdi-message-processing',
      inNavigationBar: true,
      text: 'message.text-snippet'
    }
  },
  {
    path: '*',
    name: '404',
    component: (): any => import('@/libs/core/views/NotFound.vue'),
    meta: {
      allowLocaleStorage: false,
      inNavigationBar: false
    }
  }
];
