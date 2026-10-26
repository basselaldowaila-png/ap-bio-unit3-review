# AP Biology: Cellular Energetics Review

A static, dependency-free study site for the existing class topics: enzyme structure, catalysis, environmental effects, cellular energy, and photosynthesis. It contains 68 multiple-choice questions, 29 flashcards, 12 free-response prompts, six interactive teaching models, and the existing exam-practice section.

## Preview

Open `index.html`, or serve the directory with `python3 -m http.server 8000` and visit `http://localhost:8000`.

## Content and structure

- `index.html`: app shell and guide/source templates.
- `js/data.js`: Unit 3 questions, flashcards, free responses, and test review.
- `js/models.js`: six interactive models with assumptions and explanation checks.
- `js/units.js`: unit registry. Only Unit 3 is registered.
- `js/app.js`: shared navigation, five-question pages, review filters, persistence, and rendering.
- `css/styles.css`: responsive layout, topic colors, keyboard focus, and reduced motion.

Original Unit 3 saved answers and drafts retain the `apbio3` and `apbio3view` keys. The original question and FRQ array positions are preserved. New questions are appended. Do not reorder existing arrays without migrating saved answer keys. New units default to isolated `apbio:<unit-id>` storage keys.

## Adding another unit later

No other units or placeholders are included. When another unit is requested:

1. Add its guide as a `<template>` containing `.topic` sections with `data-t` topic IDs. A `.big` block is used as the summary, and subsequent notes are collapsed into a disclosure.
2. Create its arrays using the existing question/card/FRQ tuple formats. Add models using a supported `kind`, or extend the model renderer with a new kind and unit-specific controls.
3. Call `registerUnit` before `app.js` loads, with a unique `id`, `label`, `title`, `topics`, `questions`, `cards`, `frqs`, and `guideTemplate`. Optional fields: `description`, `scope`, `models`, `test`, `sourcesTemplate`, `storageKey`, and `viewKey`.
4. Add topic color tokens in CSS. The shared selector automatically appears when more than one unit is registered. Optional exam practice is hidden if the unit has no `test` data. Empty cards and practice sets have explicit empty states.
5. Check the new unit at phone and desktop widths and confirm its progress does not change Unit 3 progress.

## Scientific scope

The original class labels 3.1–3.5 are retained. College Board's Fall 2025 framework groups enzymes into 3.1, environmental impacts into 3.2, cellular energy into 3.3, and photosynthesis into 3.4. This site does not claim complete Unit 3 coverage. Detailed Calvin-cycle stoichiometry and numeric free-energy exercises are marked as enrichment. See the sources and scope disclosure on the site and `CONTENT-REVIEW.md`.

## Validation

`node --check js/app.js` (repeat for other JS files) checks syntax. `tests/content-and-state.cjs` uses jsdom as a development-only dependency and verifies content structure, model controls, legacy storage, unit isolation, and empty/error states. Install jsdom outside the deployed site or in a development environment, then run the script with that module available.

`tests/browser.cjs` provides a Playwright regression script for a local server. It defaults to installed Chrome; use `CHROME_CHANNEL` to override. The full standalone browser script could not launch in the original restricted environment. Equivalent core workflows were checked through the in-app browser: all six mobile views, quiz scoring/retry/filter/pagination, model controls, draft persistence, and flashcard flipping. No browser console errors were observed. All six views had page width 360px at a 360px viewport. Wider diagrams scroll within their containers on small screens.

## Publishing

Deploy the root `index.html` plus the `css` and `js` folders through the existing GitHub Pages setup. No build step or runtime packages are needed. This local update has not yet been pushed or published; GitHub write authentication is required.
