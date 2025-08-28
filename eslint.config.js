import js from '@eslint/js'
import prettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  prettier,
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
    rules: {
      'no-var': 'error',
      'prefer-const': 'warn',
      'no-unused-vars': 'warn',
      'no-console': 'error',
      eqeqeq: 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'object-shorthand': ['error', 'always'],
      'prefer-template': 'error',
    },
  },
]
