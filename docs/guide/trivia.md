# Trivia

- **The live site is frozen at a single 2024 build**. `11b922d` ("update
  navs", 2024-02-17) is the last commit on `main` to touch anything under
  `src/` or `public/` (`git log -1 -- src/ public/`, checked 2026-11-15).
  The `gh-pages` branch GitHub Pages actually serves hasn't moved since
  that same day either (`git log -1 origin/gh-pages`). Everything since —
  a README edit, a package-manager migration, two CI tweaks — changed the
  repo without changing the app anyone sees.

- **The two stories used to be "Chapter 1" and "Chapter 2."** `dc4cf7c`
  renamed the `public/assets/Chapter 1` and `Chapter 2` folders to
  `AI-Arena` and `Misc` on 2024-02-17, the same day `11b922d` updated the
  code's `storyList` to match. See
  [History](history.md#the-rebuild).

- **ChakraUI lasted less than a day.** It was installed in `fa260cb`
  (2024-01-30, 17:12) and both the library and its `<ChakraProvider>`
  wrapper were gone in `6b30b41` / `aa8d177` (2024-01-31, 16:30) — about 23
  hours later, by commit timestamp.

- **A CI fix landed for a workflow that has never run once.** A 2026
  sweep pointed `.github/workflows/jekyll-gh-pages.yml` at a self-hosted
  runner (`56a2313`), then reverted it 19 minutes later (`4ff116f`) once it
  was clear this repo has no such runner. Neither commit mattered in
  practice: GitHub reports the workflow as `disabled_manually`, switched
  off 4 minutes after it was created back in 2024-01-29
  (`repos/WolffM/webcomicreact/actions/workflows`, GitHub API, checked
  2026-11-15), and it has zero recorded runs
  (`gh run list --repo WolffM/webcomicreact`, checked 2026-11-15).
