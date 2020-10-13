module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 11,
  },
  ignorePatterns: ['dist', '**/vendor/*'],
  rules: {
    'no-underscore-dangle': 'off',
  },
};
