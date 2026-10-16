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
- The background video never autoplays. The absolute horizontal mouse position controls the character's head pose: left, front-facing at the center, and right. The forward-facing pose is calibrated to 40% of this clip's timeline. Only one seek is active at a time; movements during loading are applied when metadata is ready.
- The typewriter begins after 600 ms and reveals one character every 38 ms. Action pills begin their independent entrance after 400 ms.
- The mobile menu supports keyboard focus, Escape to close, and automatic closure at the desktop breakpoint.
- Copying the address announces actual success or an actionable failure. It never sends email automatically.
- Fonts are loaded directly from the external URLs in the brief. Their availability depends on the external host.
- The background is the user's supplied `Dreamina_ Create realistic talking avatars with AI avatar generator.mp4`, served locally as `public/media/mainframe-character-turn.mp4`. Its 1280×720 resolution and all 121 video frames are retained, with frequent keyframes and a fast-start container for responsive seeking; the unused audio is removed. The poster uses its front-facing pose. Mobile cropping is centered to keep the character visible.

## GitHub Pages

The public repository is `DongSheng831/mainframe`. `main` contains the source; `gh-pages` contains the compiled `dist/` contents and `.nojekyll`. Pages publishes from the root of `gh-pages`.

The build uses a relative base, including the video, poster, favicon, scripts and home link, so it works under `/mainframe/` as well as a domain root. To update Pages, build the latest source and publish the contents of `dist/` to `gh-pages`.

This public export excludes the original private hosting metadata.
