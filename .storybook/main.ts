import { mergeConfig } from "vite";

export default {
  framework: "storybook-solidjs-vite",
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    {
      name: "@storybook/addon-vitest",
      options: {
        cli: false,
      },
    },
  ],
  stories: ["../stories/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  async viteFinal(config) {
    return mergeConfig(
      {
        ...config,
        // The legacy plugin exists for the TV builds; storybook runs in a modern
        // browser and its regenerator pass cannot handle the renderer's async code.
        plugins: (config.plugins ?? [])
          .flat(Infinity)
          .filter(
            p => !(p && typeof p === "object" && "name" in p && String(p.name).startsWith("vite:legacy")),
          ),
      },
      {
        define: {
          "process.env": {},
        },
      },
    );
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    // react-docgen-typescript needs the TypeScript compiler API, which
    // TypeScript 7 (the native port) no longer ships. react-docgen parses with Babel.
    reactDocgen: "react-docgen",
  },
};
