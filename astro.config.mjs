import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://mshra.github.io",
  integrations: [sitemap()],
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
