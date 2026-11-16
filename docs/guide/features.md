# Features

There is no tier system anywhere in this repo: no auth, no gated route, no
server at all. It is a static bundle, so every feature below is open to
anyone who loads the page.

## Page viewer

`DynamicRouteComponent` in `src/App.js` renders one page of the current
story as an `<img>`. You can move between pages three ways:

- the left or right arrow key,
- clicking the invisible left-40%-of-screen or right-40%-of-screen zones
  (`.prev-button-container` / `.next-button-container` in `src/App.css`),
  which cover the full page height.

On mount (and on every story switch) the app fetches `/assets/<story>/1.png`,
`2.png`, `3.png`, … in order, stopping once it has tried `MAX_IMAGES - 1`
(29) indices, and shows whichever of those actually came back as an image.
There is no page counter, no "jump to page," and no state kept between
visits — reloading always starts a story over at page 1.

**Limits and a couple of rough edges found while reading the code (not fixed
here):**

- The loop that fetches pages (`src/App.js:59-76`) never stops early when a
  page is missing — `fetchImage` (`src/App.js:81-101`) catches its own fetch
  errors and returns an empty list instead of throwing, so the outer
  `catch` that would set `imageExists = false` is effectively unreachable.
  In practice every story load tries all 29 indices regardless of how many
  pages the story actually has: the `Misc` story has 8 pages (`ls
  public/assets/Misc | wc -l`, run 2026-11-15), so loading it fires 21
  fetches for pages that don't exist.
- The keyboard-navigation effect (`src/App.js:17-32`) reads `images` inside
  `handleKeyPress` but its dependency array only lists `currentImageIndex`
  (line 32). Right after a story switch, `images` has not been reset and
  the effect has no reason to re-run, so the arrow keys briefly check the
  *previous* story's page count until the first on-screen click forces the
  effect (and its closure) to re-register with the current one.

## Story switcher

`Navbar` (`src/layout/Navbar.js`) is a single MUI `Button` that opens a
`Menu` listing the two story arcs, `AI-Arena` and `Misc`. Picking one calls
`navigate('/<story>')`, which changes the URL and resets to page 1.

The list of stories is the hardcoded `storyList` array in `src/App.js`
(`const storyList = ['AI-Arena', 'Misc'];`) — adding a third arc means
editing that array (and `Navbar.js`'s menu items to match) and redeploying;
the dropdown has no way to discover what's actually in `public/assets/`.

## Trivia

The two story names in the dropdown today, `AI-Arena` and `Misc`, used to be
plain `Chapter 1` and `Chapter 2` folders — see
[History](history.md#the-rebuild) for when and why they were renamed.
