# Web Comic React

Web Comic React serves one webcomic, "Checkmate Productions," as a single
React page. It has no server component: a `fetch` loop pulls numbered PNGs
straight out of `public/assets/<story>/`, and the whole app is a handful of
files built with Create React App.

![The first page of the AI-Arena story arc, the default view when the app
loads: an illustrated colosseum ruin beside a
river](../../public/assets/AI-Arena/1.png)

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
