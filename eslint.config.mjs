// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      // Allow single-word component names for pages
      "vue/multi-word-component-names": [
        "warn",
        {
          ignores: ["index", "default"],
        },
      ],
    },
  }
);
