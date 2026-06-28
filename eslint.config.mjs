import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Architectural boundaries are enforced here so the Atomic Design dependency
 * direction (atoms -> molecules -> organisms -> templates) and the
 * routing/feature split can't be violated by accident.
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Atoms: zero internal dependencies.
  {
    files: ["src/components/atoms/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/components/molecules/*",
                "@/components/organisms/*",
                "@/components/templates/*",
                "@/features/*",
              ],
              message:
                "Atoms must not import from higher layers (molecules/organisms/templates/features).",
            },
          ],
        },
      ],
    },
  },

  // Molecules: may depend on atoms only.
  {
    files: ["src/components/molecules/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/components/organisms/*",
                "@/components/templates/*",
                "@/features/*",
              ],
              message: "Molecules may import atoms only.",
            },
          ],
        },
      ],
    },
  },

  // Organisms: may depend on atoms + molecules.
  {
    files: ["src/components/organisms/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/components/templates/*", "@/features/*"],
              message: "Organisms may import atoms and molecules only.",
            },
          ],
        },
      ],
    },
  },

  // Shared components must never depend on feature code.
  {
    files: ["src/components/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*"],
              message:
                "Shared components must not depend on features. Move shared UI down into components/.",
            },
          ],
        },
      ],
    },
  },

  // Features own business logic but must not reach into the routing layer.
  {
    files: ["src/features/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/app/*"],
              message: "Features must not import from the app/ routing layer.",
            },
          ],
        },
      ],
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
