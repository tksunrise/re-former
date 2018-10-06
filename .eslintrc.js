module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "jsx"
  ],
  "rules": {
    "indent": [
      "error",
      4,
      {
        "SwitchCase": 1
      }
    ],
    "max-len": [
      "error", 120
    ],
    "eol-last": [
      "error",
      "always"
    ],
    "no-trailing-spaces": "error",
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "jsx/uses-factory": [1, {"pragma": "JSX"}],
    //"jsx/factory-in-scope": [1, {"pragma": "JSX"}],
    "jsx/mark-used-vars": 1,
    "jsx/no-undef": 1,
    "react/prop-types": 0
  }
};