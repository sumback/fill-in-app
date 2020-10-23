module.exports = {
  rules: {
    'semi': [2, 'always'],
    'quotes': [2, 'single', 'avoid-escape'],
    'space-before-function-paren': ['error', 'never'],
    'no-console': 'off',
    'no-unused-vars': 'off',
    'vue/max-attributes-per-line': 'off',
    '@typescript-eslint/ban-ts-comment': 1,
    '@typescript-eslint/no-unused-vars': ['warn'],
    'prettier/prettier': [
      'error',
      {
        semi: true,
        useTabs: false,
        trailingComma: 'none',
        arrowParens: 'always',
        endOfLine:'auto',
        singleQuote: true
      }
    ]
  },
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: false,
      jsx: false
    },
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
    project: './tsconfig.json'
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    'plugin:vue/recommended',
    'prettier',
    'prettier/vue',
    'prettier/@typescript-eslint',
    '@nuxtjs/eslint-config-typescript'
  ],
  plugins: ['vue', '@typescript-eslint','eslint-plugin-prettier'],
  ignorePatterns: ['.eslintrc.js']
};
