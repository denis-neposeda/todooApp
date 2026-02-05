import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
  {
    ignores: ["dist"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^react-dom"],
            ["^@?\\w"],
            ["^~"],
            ["^\\u0000"],
            ["^\\.\\./"],
            ["^\\./"],
            ["\\.(css|scss|sass|less)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
);
