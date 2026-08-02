import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const normalizeSpeechAppRoute = (server) => {
  server.middlewares.use((request, response, next) => {
    if (!request.url) {
      next();
      return;
    }

    const [pathname, query] = request.url.split("?");

    if (pathname === "/demo/" || pathname === "/speech-app/") {
      request.url = `/routes/speech-app/index.html${query ? `?${query}` : ""}`;
      next();
      return;
    }

    if (pathname !== "/demo" && pathname !== "/speech-app") {
      next();
      return;
    }

    response.statusCode = 302;
    response.setHeader("Location", `${pathname}/${query ? `?${query}` : ""}`);
    response.end();
  });
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      name: "normalize-speech-app-route",
      configureServer: normalizeSpeechAppRoute,
      configurePreviewServer: normalizeSpeechAppRoute,
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        speechApp: resolve(import.meta.dirname, "routes/speech-app/index.html"),
      },
    },
  },
});
