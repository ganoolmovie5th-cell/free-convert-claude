import next from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...next,
  { ignores: [".next/**", "out/**", "node_modules/**"] },
  {
    rules: {
      // We intentionally sync from DOM/localStorage on mount (theme, history,
      // object-URL previews). This is a valid external-sync pattern.
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
