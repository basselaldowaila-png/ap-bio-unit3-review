# AGENTS.md

Guide for AI coding agents (Codex, Claude Code, etc.) working on this project.

## What this is

A static study website for **AP Biology Unit 3 (Cellular Energetics), topics 3.1–3.5**:
3.1 Enzyme Structure, 3.2 Enzyme Catalysis, 3.3 Environmental Impacts on Enzyme Function,
3.4 Cellular Energy, 3.5 Photosynthesis.

Four views, switched by the tab bar: Study Guide, Practice Questions, Flashcards, Free Response.
Topic chips filter every view.

## Structure

```
index.html       Page markup. The Study Guide notes live here as <section class="topic" data-t="3.x">.
css/styles.css   All styles. Design tokens are in the first :root block.
js/data.js       Content: Q (multiple choice), CARDS (flashcards), FRQ (free response).
js/app.js        Rendering, tabs, sliding tab pill, quiz scoring, flashcards, localStorage.
```

No build step, no dependencies, no framework. Plain HTML/CSS/JS.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Conventions

- **Content edits go in `js/data.js`.** Formats:
  - `Q`: `[topic, question, [A, B, C, D], correctIndex, explanation]` (correctIndex is 0-based)
  - `CARDS`: `[topic, term, definition]`
  - `FRQ`: `[topic, prompt, modelAnswer]`
  - `topic` is a string: `"3.1"` … `"3.5"`.
- **Topic colors**: any element with `data-t="3.x"` gets that topic's accent through `--leaf` / `--leaf-soft`
  (see the `[data-t=...]` rules in `css/styles.css`). Use these tokens instead of hardcoded colors.
  3.1 blue, 3.2 purple, 3.3 orange, 3.4 pink, 3.5 green. Correct/wrong use `--good` / `--bad`.
- **Theme**: white background, light only. Apple-style look: system font, 44px minimum tap targets,
  rounded cards, frosted sticky tab bar.
- **Tab bar** uses the "tabs sliding" pattern (`.t-tabs`, `.t-tab`, `.t-tabs-pill`). After changing tabs,
  keep `moveTo()` in `js/app.js` in sync.
- Keep the `prefers-reduced-motion` rules.
- Text on screen is written for high-school AP students: short, plain sentences. Keep science accurate to the
  College Board AP Biology CED.
- `localStorage` key `apbio3` stores quiz answers and FRQ drafts; `apbio3view` stores the last tab.
  Wrap storage access in try/catch.

## Checking your work

- The page must not scroll sideways at 360px width.
- No console errors.
- Quiz: answering shows the explanation and updates the score line.

## Expanded review architecture

There are now six views: Guide, Models, Questions, Cards, FRQ, Test Prep. Guide content is in `guide-unit3`, a template in `index.html`. The app clones the selected unit's guide and source templates. `js/units.js` registers unit data before `app.js`; only Unit 3 currently exists. `js/models.js` owns interactive model renderers. See README for the future-unit contract and validation commands. Preserve the original Unit 3 array positions to retain saved answers; append new content. The original class topic numbering intentionally remains, with current-framework mapping disclosed on the site.

## Cache busting

GitHub Pages caches files for 10 minutes. `index.html` loads CSS and JS with `?v=<version>`. When you change any CSS or JS file, bump that version in every `<link>` and `<script>` tag in `index.html`, or phones may run old JS against new HTML and show empty views.

## Videos tab

`js/videos.js` holds Gabe Poser's (PoseKnows Biology) Unit 3 videos: link id, Mr. Poser's topic number, chapters
(`[seconds, label]`), key points (may contain `<b>`/`<i>`), vocab and quick-check questions. Key points are our own
summaries of each video, not transcripts. Mr. Poser uses current College Board numbering (his 3.1 = this site's 3.1 + 3.2;
his 3.5 cellular respiration is filed here as topic "3.6", teal). It is the default view for new visitors.

## Hard questions

`js/hard.js` holds AP-exam-level MCQs (data, experiments, predictions). They are appended to `Q` with `q[5]='hard'`,
and their options are rotated so correct answers spread across A–D. The quiz opens in "Hard (AP exam level)" mode.
Add new hard questions to the end of `HARD_Q` so saved answers keep their positions.

## Focused practice sets

`js/sets.js` adds two hard sets shown in the Quiz "Practice set" menu: `ENZYME_Q` (enzymes only, no amino acids) and `CARRIER_Q` (ATP, ADP, NADH, NADPH, FADH₂ and their jobs). Each question is written with the correct answer first; the loader rotates options and tags `q[6]` with the set name. The quiz opens on the Enzymes set. The student was told amino acids are not on their test, so keep amino acids out of questions.

## Multiple units (Unit 3 and Unit 4)

Units are registered in `js/units.js`. Each unit has its own data, `videos`, `defaultQuizMode`, `videoIntro`,
storage keys, and guide/sources templates in `index.html`. The app sets `<html data-unit="…">` when a unit is selected;
Unit 4 is purple (`html[data-unit="unit4"]` and `[data-t="4.x"]` rules in `css/styles.css`), Unit 3 stays blue.
The Models tab and the "Explore" learning-path step hide when a unit has no models; Test Prep hides when `test` is null.
Quiz practice-set options only show if the current unit has questions for them.
Unit 4 content: `js/unit4-data.js` (TOPICS_U4, Q_U4, CARDS_U4, FRQ_U4) and `js/unit4-videos.js` (VIDEOS_U4).
Keep MCQ choices similar in length so the correct answer is not the longest one.

## Models (both units)

Unit 4 models live in `js/unit4-models.js` as `UNIT4_MODELS`. New model kinds register in `MODEL_KINDS`
(signaltypes, pathway, glucose, mitosis, checkpoint); `mountModel()` in `js/models.js` calls them, so every model
uses the same card layout. Links to outside simulations are `WEB_MODELS_U3` / `WEB_MODELS_U4` (shown under
"From the web" in the Models tab). Only add web links you have checked load.

## Unit picker

The top-right unit picker is an underlined title button (`#unitToggle`) that opens `#unitMenu`. A hidden `#unitSelect`
is kept in sync for compatibility.
