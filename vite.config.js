import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const cleanRouteOutputs = [
  {
    source: "routes/speech-app/index.html",
    destinations: ["speech-app/index.html", "demo/index.html"],
  },
  {
    source: "routes/voice-isolation/index.html",
    destinations: ["voice-isolation/index.html"],
  },
];

const emitCleanRouteHtml = () => {
  let outputDirectory;

  return {
    name: "emit-clean-route-html",
    apply: "build",
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      cleanRouteOutputs.forEach(({ source, destinations }) => {
        const sourcePath = resolve(outputDirectory, source);

        destinations.forEach((destination) => {
          const destinationPath = resolve(outputDirectory, destination);
          mkdirSync(dirname(destinationPath), { recursive: true });
          copyFileSync(sourcePath, destinationPath);
        });
      });
    },
  };
};

const normalizeSpeechAppRoute = (server) => {
  server.middlewares.use((request, response, next) => {
    if (!request.url) {
      next();
      return;
    }

    const [pathname, query] = request.url.split("?");

    if (pathname === "/voice-isolation/") {
      request.url = `/routes/voice-isolation/index.html${query ? `?${query}` : ""}`;
      next();
      return;
    }

    if (pathname === "/demo/" || pathname === "/speech-app/") {
      request.url = `/routes/speech-app/index.html${query ? `?${query}` : ""}`;
      next();
      return;
    }

    if (
      pathname !== "/demo" &&
      pathname !== "/speech-app" &&
      pathname !== "/voice-isolation"
    ) {
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
    emitCleanRouteHtml(),
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
        voiceIsolation: resolve(
          import.meta.dirname,
          "routes/voice-isolation/index.html",
        ),
      },
    },
  },
});
