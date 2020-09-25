// eslint-disable-next-line
const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'axios': path.resolve('./node_modules/axios'),
        'vue': path.resolve('./node_modules/vue')
      }
    }
  },
  publicPath: '/',
  transpileDependencies: [
    'vuetify',
  ],
};
