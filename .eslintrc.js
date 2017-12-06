module.exports = {
  "extends": "airbnb",
  "plugins": [
      "react",
      "jsx-a11y",
      "import"
  ],
  "env": {
    "node": true,
  },
  "rules": {
    "import/prefer-default-export": 0,
    "no-console": 0,
    "no-unused-vars": ["error", {
      "varsIgnorePattern": "chai|should",
      "ignoreRestSiblings": true,
    }],
  },
  "globals": {
    "describe": true,
    "before": true,
    "it": true,
    "expect": true,
    "after": true,
    "beforeEach": true,
    "afterEach": true,
  },
  "parser": "babel-eslint",
};

