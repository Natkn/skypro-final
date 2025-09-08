module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended', 
    'plugin:react/recommended', 
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2018, 
    sourceType: 'module', 
    ecmaFeatures: {
      jsx: true, 
    },
  },
  rules: {
   
    'react/prop-types': 'off', 
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};