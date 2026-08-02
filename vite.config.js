import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const normalizeDemoRoute = (server) => {
  server.middlewares.use((request, response, next) => {
    if (!request.url) {
      next();
      return;
    }

    const [pathname, query] = request.url.split("?");

    if (pathname === "/demo/") {
      request.url = `/routes/demo/index.html${query ? `?${query}` : ""}`;
      next();
      return;
    }

    if (pathname !== "/demo") {
      next();
      return;
    }

    response.statusCode = 302;
    response.setHeader("Location", `/demo/${query ? `?${query}` : ""}`);
    response.end();
  });
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      name: "normalize-demo-route",
      configureServer: normalizeDemoRoute,
      configurePreviewServer: normalizeDemoRoute,
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        demo: resolve(import.meta.dirname, "routes/demo/index.html"),
      },
    },
  },
});
