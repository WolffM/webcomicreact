---
title: Web Comic React
summary: >-
  A small React single-page app that reads a webcomic one page at a time,
  with left/right arrow keys or on-screen click zones to turn pages and a
  dropdown to switch between story arcs. No sign-in, no backend — it is a
  static bundle and a folder of images, for anyone who can reach the site.
features:
  - name: Page viewer
    summary: 'Read a story arc page by page with arrow keys or the on-screen click zones.'
  - name: Story switcher
    summary: 'Jump between the two story arcs from a dropdown menu.'
trivia:
  - 'The app and its images have not changed since `11b922d` on 2024-02-17 — every commit after it touched only the README, tooling, or CI config (`git log -1 -- src/ public/`, run 2026-11-15).'
  - 'Its two story folders were literally named `Chapter 1` and `Chapter 2` until `dc4cf7c` renamed them to `AI-Arena` and `Misc`, the same day the app was last touched.'
  - 'ChakraUI was installed (`fa260cb`) and completely removed about 23 hours later (`6b30b41`) — the shortest-lived dependency in the repo''s history.'
  - 'A 2026 fleet-wide sweep rewrote the GitHub Pages workflow to run on self-hosted infrastructure (`56a2313`), then reverted it 19 minutes later (`4ff116f`) as a mistake — that workflow has been disabled since 4 minutes after it was created in 2024 and has recorded zero runs (GitHub Actions API, checked 2026-11-15).'
---

# Web Comic React

Web Comic React serves one webcomic, "Checkmate Productions," as a single
React page. It has no server component: a `fetch` loop pulls numbered PNGs
straight out of `public/assets/<story>/`, and the whole app is a handful of
files built with Create React App.

- [Features](features.md): the page viewer and the story switcher — what
  each does and its limits.
- [Contributing](contributing.md): running it locally, the architecture,
  what gates exist (and what doesn't), and how it actually gets deployed.
- [History](history.md): the one-day MVP, the week it was rebuilt, and the
  long quiet stretch since.
- [Trivia](trivia.md)

## Trivia

The live site at `wolffm.github.io/webcomicreact` has been serving the exact
same build since 2024-02-17 — see [History](history.md#dormant-then-tooling-only)
for how a 784-day gap and a package-manager migration both happened without
changing a single pixel of it.
