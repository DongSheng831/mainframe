# Mainframe®

A single-screen creative agency landing page built with React, TypeScript, Vite, and Tailwind CSS. No UI or icon libraries are used.

## Run

```sh
npm install
npm run dev
```

## Verify and build

```sh
npm test
npm run build
npm run preview
```

The build type-checks the application and outputs the static site to `dist/`.

## Content and interaction

- `src/content.ts` holds all navigation and action destinations. As requested, these temporarily open an email draft with a relevant subject; replace their `href` values when real destinations are supplied.
- The background video never autoplays and starts at its first frame. Horizontal mouse movement advances or reverses the video using cumulative movement distance, sensitivity 0.8, and one seek in flight at a time.
- The typewriter begins after 600 ms and reveals one character every 38 ms. Action pills begin their independent entrance after 400 ms.
- The mobile menu supports keyboard focus, Escape to close, and automatic closure at the desktop breakpoint.
- Copying the address announces actual success or an actionable failure. It never sends email automatically.
- The original fonts are bundled as local WOFF2 files with `font-display: swap`. Page rendering no longer waits for external font stylesheets; font attribution is retained in `src/assets/fonts/NOTICE.txt`.
- The background is the user's supplied `Dreamina_ Create realistic talking avatars with AI avatar generator.mp4`, optimized as `public/media/mainframe-character-web.mp4`: 960×540, 24 fps, frequent keyframes and a fast-start container. It is 1,729,790 bytes, down from 4,996,796 bytes. The first-frame WebP poster is 74,776 bytes, down from a 190,157-byte JPEG, and is preloaded with high priority. Mobile cropping remains centered.
- The cumulative mouse-scrubbing behavior and sensitivity are unchanged. These asset optimizations reduce transfer size and remove third-party runtime requests; they do not eliminate connectivity delays to GitHub Pages itself.

## GitHub Pages

The public repository is `DongSheng831/mainframe`. `main` contains the source; `gh-pages` contains the compiled `dist/` contents and `.nojekyll`. Pages publishes from the root of `gh-pages`.

The build uses a relative base, including the video, poster, favicon, scripts and home link, so it works under `/mainframe/` as well as a domain root. To update Pages, build the latest source and publish the contents of `dist/` to `gh-pages`.

This public export excludes the original private hosting metadata.
