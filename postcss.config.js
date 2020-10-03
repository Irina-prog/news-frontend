/* eslint-disable import/no-extraneous-dependencies, global-require */
module.exports = {
  plugins: [
    require('postcss-import'), // для импорта normalize.css из node_modules
    require('autoprefixer'),
    require('cssnano')({ // подключили cssnano
      preset: 'default', // выбрали настройки по умолчанию
    }),
  ],
};
