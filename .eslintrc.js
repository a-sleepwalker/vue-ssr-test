module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    //IDE default format
    'indent': ['off'],
    'eqeqeq': 'error',
    'no-undef': 'off',
    'new-cap': ['off'],
    'no-unused-vars': 'error',
    'object-curly-spacing': ['error', 'never'],
    'semi': ['error', 'always', {'omitLastInOneLineBlock': true}],
    'space-before-function-paren': [
      'error',
      {'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always'}],
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
