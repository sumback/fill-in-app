module.exports = {
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
    vueFeatures: {
      filter: true,
      interpolationAsNonHTML: false,
    },
  },
  extends: ['eslint:recommended', 'plugin:vue/base', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'vue/script-setup-uses-vars': 'error',
    'vetur.validation.template': 0,
    'vue/multi-word-component-names': 0,
    'vue/require-default-prop': 'off',
    quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
  },
};
