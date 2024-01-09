module.exports = {
  env: {
    browser: true,
    es6:     true,
    node:    true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma:      'React',
      version:     'detect',
    },
  },
  globals: {
    Atomics:           'readonly',
    SharedArrayBuffer: 'readonly',
    __API_URL__:       true,
    __ENV__:           true,
    __VERSION__:       'readonly',
  },
  parser:        '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType:  'module',
  },
  plugins: ['react', 'react-hooks'],
  rules:   {
    quotes:                        ['error', 'single'],
    semi:                          ['error', 'never'],
    indent:                        ['error', 2],
    'jsx-quotes':                  ['error', 'prefer-single'],
    'max-len':                     ['error', { code: 100 }],
    'no-trailing-spaces':          ['error'],
    'react/display-name':          [0],
    'react-hooks/rules-of-hooks':  'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types':            [0],
    'react/react-in-jsx-scope':    'off',
    'no-multi-spaces':             [
      1,
      {
        exceptions: {
          ImportDeclaration:  true,
          PropertyAssignment: false,
          TSTypeAnnotation:   true,
          VariableDeclarator: true,
        },
      },
    ],
    'key-spacing': [
      2,
      {
        multiLine: {
          align: 'value',
        },
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays:    'always-multiline', //only-multiline
        exports:   'always-multiline',
        functions: 'only-multiline',
        imports:   'always-multiline',
        objects:   'always-multiline',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': [0],
  },
}