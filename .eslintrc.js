module.exports = {
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'vetur.validation.template': 0,
    'vue/require-default-prop': 'off',
    quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
  },
};
