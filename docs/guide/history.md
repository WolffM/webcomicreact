# History

Three eras, confirmed from `git log --format='%h %ad %an %s' --date=format:'%Y-%m-%d %H:%M'
origin/main` (run 2026-11-15): one day of initial build, then — 81 days
after the last 2023 commit (169 days after day one itself) — a three-week
stretch of active rework, and then tooling-only churn across a long quiet
stretch.

## Day one

The whole app started and shipped on a single day, 2023-08-13 (a Sunday,
`date -d 2023-08-13`): `287cc39` "Initial commit", `f7a3b00` "chap1" (adding
the first 25-page story as plain Create React App boilerplate), `44e1903`
"refactor", `8723dbe` "deploy", and three commits titled "fixes"
(`59053a0`, `d72412a`, `481182f`). Two README-only commits followed weeks
apart, `66a7421` (2023-08-17) and `208b8fb` (2023-11-09), and then the repo
went quiet for 81 days (`python3 -c "from datetime import date;
print((date(2024,1,29)-date(2023,11,9)).days)"`).

## The rebuild

Nearly all of the app's substance was built in a three-week stretch,
2024-01-29 to 2024-02-17. 2024-01-29 (a Monday) ties 2024-01-31 (a
Wednesday) as the busiest day in the repo's history, both at 11 commits
(`git log --format=%ad --date=format:%Y-%m-%d | sort | uniq -c | sort -rn`):
a Navbar component landed through pull request #2 (`0d26c76`), and the
GitHub Pages workflow was created (`bd6b0a1`) — then manually disabled 4
minutes later
(`created_at`/`updated_at` on the workflow, GitHub API,
`repos/WolffM/webcomicreact/actions/workflows`, checked 2026-11-15; see
[Contributing](contributing.md#how-it-deploys)). ChakraUI was installed the
next day (`fa260cb`, 2024-01-30) and removed about 23 hours later
(`6b30b41` and `aa8d177`, 2024-01-31) once it didn't work out. A second
story arc was added as "cha2" (`b363ddb`, 2024-02-13), and on 2024-02-17
(a Saturday) the two story folders — until then literally named
`Chapter 1` and `Chapter 2` — were renamed to `AI-Arena` and `Misc`
(`dc4cf7c` "refactored main component"), with the navigation code and
`storyList` updated to match in the same day's last commit, `11b922d`
"update navs". That is also the last commit to touch anything under `src/`
or `public/` on this repo (`git log -1 -- src/ public/`, checked
2026-11-15), and the `gh-pages` branch that the live site is served from
was pushed within the same hour (`git log -1 origin/gh-pages`).

## Dormant, then tooling-only

After one more README update (`2433f21`, 2024-05-20, a Monday), the repo
went quiet for 784 days
(`python3 -c "from datetime import date; print((date(2026,7,13)-date(2024,5,20)).days)"`)
until `e6567f6` "Migrate from npm to pnpm" (pull request #9, 2026-07-13, a
Monday), which replaced `package-lock.json` with `pnpm-lock.yaml` and added
a `pnpm-workspace.yaml` dependency-cooldown policy. Seven weeks later, on
2026-08-30 (a Sunday), an org-wide sweep changed the disabled GitHub Pages
workflow's `runs-on:` to a self-hosted runner label (`56a2313`), then
reverted it 19 minutes later (`4ff116f`) once it was noticed this repo has
no self-hosted runner to serve that job — moot either way, since the
workflow has never once run (`gh run list --repo WolffM/webcomicreact`,
checked 2026-11-15; see [Contributing](contributing.md#how-it-deploys)).
No commit in this era touched `src/` or `public/assets/`.

## Trivia

See [Trivia](trivia.md) for the full list, including just how short-lived
ChakraUI was.
