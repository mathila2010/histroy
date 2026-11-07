# History Companion 2.0

An interactive study platform for the Sri Lankan **Grade 10, Grade 11 and O/L History** syllabus,
rebuilt from the original single-file *O/L History Companion* with Next.js, React, TypeScript and Tailwind CSS.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000 while editing
npm run build      # writes a static site to ./out
npm start          # serves ./out (or upload ./out to any static host)
```

A ready-built copy is already in `out/`. It must be served over HTTP (not opened as a file):
`npx serve out`, then open the address it prints. To host it in a sub-folder (for example
`https://example.com/history/`), build with `NEXT_PUBLIC_BASE_PATH=/history npm run build`.

## What's inside

| Page | Features |
|---|---|
| **Time Travel 3D** (`/time-travel/`) | Six living 3D worlds – Anuradhapura, Polonnaruwa, the Kandyan Kingdom, the colonial coast, the Industrial Revolution and the World Wars. Time dial and year jump, cinematic time-tunnel transitions, clickable landmarks with lesson-sourced panels, guided tour, quality settings and a no-3D picture mode |
| **Chapters** (`/`) | Grade 10 and Grade 11 shelves, chapter cards with image, description and progress, continue-where-you-left-off |
| **Chapter** (`/chapters/g10-1/` …) | Breadcrumbs, section rail with read ticks, illustrated notes, definitions, expandable explanations, fact-check notes, all 33 original activities, key takeaways, real-world applications, key dates, flashcards, quiz, mark complete, previous/next |
| **Timeline** | All 87 dates, grouped into periods, filter by grade / chapter / keyword, expandable details |
| **Flashcards** | Deck by grade or chapter, flip, shuffle, “Know it / Again”, revise difficult cards only; marks are saved |
| **Glossary** | 162 terms and definitions, search, A–Z, grade and chapter filters, links to where each is taught |
| **Gallery** | All 80 textbook images in 9 categories, lightbox with captions, chapter links, keyboard and swipe |
| **Practice test** | Mixed, grade or chosen-chapter tests; feedback, explanations, score, review, retry missed, history |
| **My progress** | Reading %, chapters complete, flashcards known, quiz scores, chapters not yet revised, test history, reset |

Global search (press `/`) covers chapter titles, lesson headings, terms, definitions, dates and pictures.
Progress is stored in the browser's localStorage – no accounts. Progress saved by the original
single-file version is imported automatically on the same device and browser.

## Time Travel (3D)

Built with Three.js, React Three Fiber and Drei. Every model, texture and effect is generated in code
(no downloaded 3D files), so the worlds load instantly and work offline.

* **Worlds** – `src/three/scenes/*.tsx`, one file per period: terrain, atmosphere preset (sun, sky, fog,
  light), buildings, people, animals and effects.
* **Landmarks** – `src/three/eras.ts`. Each landmark's text is taken from the lesson notes and links to the
  chapter section, flashcards and quiz. To add one, add an entry with a marker position and camera view,
  and wrap the matching 3D object in `<Interactive id="…">`.
* **Living details** – `src/three/world.tsx`: wind-blown palms, trees and grass, animated water and
  waterfalls, flocking birds, drifting clouds, GPU smoke, fire, mist and fireflies, walking people,
  elephants and waving flags.
* **Architecture kit** – `src/three/architecture.tsx`: stupas, pillared halls, Kandyan roofs, sailing ships,
  steamships, mills, beam engine, locomotive, pit-head, blast furnace, aircraft, barrage balloons.
* **Time travel** – `src/three/director.ts`: camera flights and the travel sequence (lift-off → time
  tunnel → descent), with a rolling year counter.
* **Performance** – quality is chosen automatically (High: shadows + bloom; Balanced; Battery saver for
  phones) and steps down if the frame rate drops; the 3D code downloads only on the Time Travel page.
  Devices without WebGL get the picture mode, which keeps the time dial, landmarks and lesson links.
  Reduced-motion settings replace flights with quick fades.

Every chapter page shows a “Step into this period” card, and lesson sections that have a 3D landmark
end with an “Explore in 3D” link straight to it.

## Project structure

```
src/
  app/                    pages (App Router); search-index.json is generated at build time
  components/             UI components (header, search, lightbox, flashcards, quiz, …)
  content/
    chapters/g10-1.json   one file per chapter – sections, takeaways, flashcards, quiz, events
    notes/g10-1.json      the notes HTML for each section (build-time only)
    images.json           image captions, alt text, gallery category, chapter
    definitions.json      definition boxes (used by the glossary)
  three/                  Time Travel 3D: eras, scenes, world kit, architecture, camera director
  lib/
    content.ts            content loader and helpers (add new chapter files here)
    progress.tsx          progress store (localStorage)
    widgets/legacy.js     the original interactive activities, unchanged logic
  styles/                 design tokens, components, chapter-content styles
public/images/            optimised WebP images (+ thumbs/)
scripts/extract-original.mjs   re-extracts content from source/history-companion-original.html
```

### Editing content

* **Add a flashcard, quiz question or timeline event:** edit that chapter's JSON file in
  `src/content/chapters/`. Quiz `answer` is the index (0–3) of the correct option.
  Timeline `year` is a number used for sorting (negative for B.C.); `scope` is `g10`, `g11` or `world`.
* **Edit lesson notes:** change the HTML in `src/content/notes/<chapter>.json`.
* **Add a chapter:** create its JSON files in `chapters/` and `notes/` and add one import line in
  `src/lib/content.ts` and `src/lib/notes.ts`.
* **Add an image:** put `name.webp` in `public/images/` (and a 560px copy in `public/images/thumbs/`),
  then add an entry to `src/content/images.json`.

## Content notes

* All lesson text, dates, tables, captions, activities, flashcards and quiz questions come unchanged
  from the original site (verified chapter by chapter against it).
* **Fact-check notes** keep the textbook date and add the widely accepted date; they now carry a reminder
  to use the textbook answer in the exam.
* **Added in this version** (organisational, not new history): gallery categories; captions for the 15
  images that had none in the original, taken from each chapter's own image caption; the textbook figure
  captions for the atomic-bomb and International Court of Justice photos (Grade 11 textbook Fig 8.15 and
  Fig 8.23); and one descriptive caption for the old print of Kandy, marked “Caption added in this version”.
  These three images were embedded in the original but never shown.
