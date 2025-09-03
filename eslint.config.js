import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  js.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: {
        chrome: 'readonly',
        document: 'readonly',
        setTimeout: 'readonly',
      },
    },
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error',
      'no-var': 'error',
      'prefer-const': 'warn',
      'no-unused-vars': 'warn',
      'no-console': 'error',
      eqeqeq: 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'object-shorthand': ['error', 'always'],
      'prefer-template': 'error',
      'eol-last': ['error', 'always'],
    },
  },
]
