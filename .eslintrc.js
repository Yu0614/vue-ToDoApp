module.exports = {
  root: true,

  env: {
    node: true
  },

  parserOptions: {
    ecmaVersion: 2020
  },

  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        mocha: true
      }
    }
  ],

  extends: [
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-strongly-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier/@typescript-eslint",
  ],
  plugins: [
    "vue",
  ],
  rules: {
    // default rules
    "no-unreachable": "error", 
    "no-mixed-operators": "error",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-confusing-arrow": ["error", { "allowParens": false }],
    "no-tabs": "error",
    "no-extra-semi": "error",

    // semi colons
    "semi": ["error", "always"],
    "semi-style": ["error", "last"],
    "semi-spacing": ["error", {"after": true, "before": false}],

    // line length
    "max-len": ["error", {"code": 180, "ignoreUrls": true}],

    // indent
    "indent": ["error", 4],

    // quotes
    "quotes": [
      "error",
      "single",
      { "avoidEscape": true, "allowTemplateLiterals": false }
    ],

    // html
    "vue/html-self-closing": [
      "error",
      {
        "html": {
          "void": "any"
        }
      }
    ],
    "vue/html-closing-bracket-newline": [2, {"multiline": "never"}],
    "vue/html-indent": "error"
  },
};
