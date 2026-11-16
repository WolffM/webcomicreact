# Contributing

## Running it locally

The repo uses pnpm (`pnpm-lock.yaml`, `pnpm-workspace.yaml` — see
[History](history.md#dormant-then-tooling-only)); the README still shows
`npm` commands from before that migration, but the same scripts work with
either:

```sh
pnpm install
pnpm start      # react-scripts dev server, http://localhost:3000
```

It's a [Create React App](https://create-react-app.dev/) project — there is
no backend to run, no env vars to set, and no account to sign in with.
`pnpm-workspace.yaml` sets a 7-day minimum age on newly published external
package versions before pnpm will install them (`minimumReleaseAge: 10080`,
in minutes); this repo has no `@wolffm/*` dependency, so the carve-out for
those packages never applies here.

## Architecture map

Everything lives under `src/`:

- `src/index.js` mounts `<App />` into `#root`.
- `src/App.js` is almost the whole app: it defines the router (one route
  for `/:story`, one for `/`, both rendering the same component), the page-
  fetch loop, and the keyboard/click navigation described in
  [Features](features.md#page-viewer).
- `src/layout/Navbar.js` is the MUI dropdown described in
  [Features](features.md#story-switcher).
- `src/App.css` and `src/layout/Navbar.css` hold all of the app's styling —
  there is no design-token system or shared theme; colors and sizes are
  plain CSS values.

Comic pages themselves aren't code: they're PNGs checked straight into
`public/assets/<story>/<n>.png`, served as static files.

## Tests and gates

`package.json` has the Create React App default `"test": "react-scripts
test"` script, but the repo has zero test files (`find . -iname
"*.test.js" -o -iname "*.spec.js"`, excluding `node_modules`, returns
nothing) — there is nothing for that script to run. There is no separate
lint or format command either; the only linting is the `eslintConfig`
block in `package.json` (`react-app` / `react-app/jest`), which CRA applies
implicitly while `pnpm start` or `pnpm build` run, not as its own gate.

There is no CI that gates merges: the only workflow in the repo
(`.github/workflows/jekyll-gh-pages.yml`) is about deployment, not checks —
see below.

## How it deploys

GitHub Pages for this repo is configured to serve the `gh-pages` git branch
directly (`"build_type":"legacy","source":{"branch":"gh-pages"}` — GitHub
REST API, `repos/WolffM/webcomicreact/pages`, checked 2026-11-15), not
through GitHub Actions. That branch is updated by hand by running:

```sh
pnpm run deploy   # predeploy: pnpm run build; deploy: gh-pages -d build
```

(the `gh-pages` package pushes the `build/` output straight to the
`gh-pages` branch). Its last commit is from 2024-02-17 (`git log -1
origin/gh-pages`), which is 1,002 days before 2026-11-15
(`python3 -c "from datetime import date; print((date(2026,11,15) -
date(2024,2,17)).days)"`) — the live site has been serving that same build
for the entire interval covered in [History](history.md).

The repo also carries `.github/workflows/jekyll-gh-pages.yml`, which
triggers on every push to `main` and, if it ran, would build the raw repo
as a Jekyll site and publish it through `actions/deploy-pages` — a
completely different (and wrong, for a CRA app) pipeline from the one
above. It doesn't run: GitHub reports its state as `disabled_manually`,
manually turned off 4 minutes after it was created on 2024-01-29
(`created_at`/`updated_at` on `repos/WolffM/webcomicreact/actions/workflows`,
checked 2026-11-15), and it has recorded zero runs ever (`gh run list
--repo WolffM/webcomicreact`, checked 2026-11-15). Two 2026 commits
(`56a2313`, `4ff116f`) edited its `runs-on:` line back and forth — see
[History](history.md#dormant-then-tooling-only) — without it ever having
run once.

## Known issues

Found while reading the code; not fixed here.
[Features](features.md#page-viewer) describes what each one looks like to
someone using the app.

- The page-fetch loop (`src/App.js:59-76`) never stops early when a page is
  missing. `fetchImage` (`src/App.js:81-101`) catches its own fetch errors
  and returns an empty list instead of throwing, so the outer `catch` that
  would set `imageExists = false` never runs. Every story load tries all 29
  indices regardless of how many pages exist.
- The keyboard-navigation effect (`src/App.js:17-32`) reads `images` inside
  `handleKeyPress`, but its dependency array only lists `currentImageIndex`
  (line 32). Right after a story switch, `images` hasn't been reset yet, so
  the effect has no reason to re-run. The arrow keys briefly check the
  *previous* story's page count. The first on-screen click forces the
  effect, and its closure, to re-register with the current story.

## Trivia

The deploy workflow nobody has ever seen run still got a same-day fix and
revert in 2026; see [Trivia](trivia.md) for the full story.
