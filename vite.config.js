import { resolve } from "node:path";
import { defineConfig } from "vite";

const normalizeDemoRoute = (server) => {
    server.middlewares.use((request, response, next) => {
        if (!request.url) {
            next();
            return;
        }

        const [pathname, query] = request.url.split("?");

        if (pathname !== "/demo/app") {
            next();
            return;
        }

        response.statusCode = 302;
        response.setHeader(
            "Location",
            `/demo/app/${query ? `?${query}` : ""}`,
        );
        response.end();
    });
};

export default defineConfig({
    plugins: [
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
                demoApp: resolve(import.meta.dirname, "demo/app/index.html"),
            },
        },
    },
});
