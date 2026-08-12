# Portfolio agent guide

## Project overview

This repository builds Aaryan Mishra's static portfolio at https://aaryanmishra.com/. It uses Vite, TypeScript, and Tailwind CSS and deploys to GitHub Pages.

## Key files

- `index.html`: Portfolio home page.
- `routes/voice-isolation/index.html`: Eigen voice-isolation case study.
- `routes/speech-app/index.html`: On-device speech-enhancement case study and audio demo.
- `src/style.css`: Shared visual styles.
- `src/demo-app.ts`: Audio-player behavior.
- `public/llms.txt`: Agent-oriented site index.
- `public/**/*.md`: Clean Markdown counterparts to public portfolio pages.
- `vite.config.js`: Multi-page build and clean-route output configuration.
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow.

## Commands

- `npm run dev`: Start the Vite development server.
- `npm run build`: Type-check and create the production build in `dist/`.
- `npm run preview`: Preview the production build.

Always run `npm run build` after changing source files or public agent-facing files. Confirm that `dist/llms.txt`, `dist/robots.txt`, and the Markdown counterparts are present.

## Content conventions

- Use `https://aaryanmishra.com/` as the canonical public origin. Do not use the redirecting `mshra.github.io` origin.
- Keep first-person contribution claims faithful to the corresponding HTML case study.
- Distinguish Aaryan's individual work from company or team outcomes.
- Keep HTML and its Markdown counterpart consistent when changing portfolio claims or metrics.
- Maintain one `h1` per HTML page followed by hierarchical `h2` sections.
- Keep the primary content available in static HTML without requiring client-side JavaScript.
- Treat `/speech-app/` as canonical; `/demo/` is a compatibility alias.

## Deployment

GitHub Pages deployment runs on version tags matching `v*` or through manual workflow dispatch. Do not create a tag or publish a deployment unless the user explicitly requests it.
