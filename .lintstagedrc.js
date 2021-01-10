module.exports = {
  '{src, test}/**/*.{ts, js}': [
    'prettier --write',
    'eslint --fix'
  ],
};
