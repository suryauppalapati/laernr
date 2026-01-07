import path from "node:path";

import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import {
  configs,
  plugins,
  rules,
} from "eslint-config-airbnb-extended";
import { rules as prettierConfigRules } from "eslint-config-prettier";
import betterTailwind from "eslint-plugin-better-tailwindcss";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import unusedImports from "eslint-plugin-unused-imports";

const gitignorePath = path.resolve(
  ".",
  ".gitignore"
);

// --- JavaScript Config ---
const jsConfig = [
  {
    name: "js/config",
    ...js.configs.recommended,
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
        node: {
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
          ],
        },
      },
    },
  },
  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended,
];

// --- Next.js Config ---
const nextConfig = [
  plugins.react,
  plugins.reactHooks,
  plugins.reactA11y,
  plugins.next,
  ...configs.next.recommended,
  {
    rules: {
      "react/require-default-props":
        "off",
      "react/function-component-definition":
        "off",
      "arrow-body-style": "off",
      "import-x/prefer-default-export":
        "off",
      // Console statements - warn in development, will be removed in production build
      "no-console": [
        "warn",
        { allow: ["warn", "error"] },
      ],
    },
  },
];

// --- Import Order Config ---
const importOrderConfig = [
  {
    name: "import/order/config",
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      // Unused variables - warn
      "@typescript-eslint/no-unused-vars":
        "warn",
      "unused-imports/no-unused-imports":
        "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Import order rules
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            [
              "parent",
              "sibling",
              "index",
            ],
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes:
            ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/newline-after-import": [
        "error",
        { count: 1 },
      ],
      "import/no-duplicates": "error",
    },
  },
];

// --- TypeScript Config ---
const typescriptConfig = [
  plugins.typescriptEslint,
  ...configs.base.typescript,
  rules.typescript
    .typescriptEslintStrict,
  ...configs.next.typescript,
  {
    rules: {
      "@typescript-eslint/explicit-module-boundary-types":
        "off",
      "@typescript-eslint/consistent-type-imports":
        "off",
    },
  },
];

// --- Better TailwindCSS Config ---
const tailwindConfig = [
  {
    name: "better-tailwindcss/config",
    plugins: {
      "better-tailwindcss":
        betterTailwind,
    },
    rules: {
      "better-tailwindcss/enforce-consistent-line-wrapping":
        "off",
      "better-tailwindcss/enforce-consistent-class-order":
        [
          "warn",
          {
            entryPoint:
              "./app/globals.css",
          },
        ],

      "better-tailwindcss/enforce-consistent-variable-syntax":
        "warn",
      "better-tailwindcss/enforce-consistent-important-position":
        "warn",
      "better-tailwindcss/enforce-shorthand-classes":
        "off",
      "better-tailwindcss/no-duplicate-classes":
        "error",
      "better-tailwindcss/no-unnecessary-whitespace":
        "error",
      "better-tailwindcss/no-conflicting-classes":
        "off",
      "better-tailwindcss/no-deprecated-classes":
        "warn",
    },
    settings: {
      tailwindcss: {
        callees: ["clsx", "cn", "cva"],
        classAttributes: [
          "className",
          "class",
        ],
      },
      betterTailwind: {
        entryPoint: "app/globals.css",
      },
    },
  },
];

// --- Prettier Config ---
const prettierConfig = [
  {
    name: "prettier/config",
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfigRules,
      "prettier/prettier": "off",
    },
  },
];

// --- Combined Config Export ---
export default [
  includeIgnoreFile(gitignorePath),
  ...jsConfig,
  ...nextConfig,
  ...typescriptConfig,
  ...tailwindConfig,
  ...prettierConfig,
  ...importOrderConfig,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "next-env.d.ts",
    ],
  },
];
