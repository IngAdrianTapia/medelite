import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

const hooks = reactHooks.configs.flat?.recommended ?? reactHooks.configs.recommended;

export default tseslint.config(
  { ignores: ["dist", "dist-ssr", "dev-dist", "node_modules", "coverage"] },
  js.configs.recommended,
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        URL: "readonly",
      },
    },
  },
  ...tseslint.configs.strict,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...(hooks.rules ?? {}),
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
);
