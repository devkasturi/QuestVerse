# QuestVerse (prototype)

A mobile-first Pune travel-exploration prototype, built with React + Vite + TypeScript + Tailwind CSS. All data is stored in `localStorage` on your device — there is no backend, no API keys and no paid services.

## Run it

```
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`). For a production build: `npm run build`.

## What's implemented

- **Splash & onboarding** — original compass logo, tagline, and a one-time interest picker (skippable).
- **Map** — search, category filters, an illustrated SVG map with zoom/pan controls, a screen-reader-friendly list view, and quest completion.
- **Explore Near Me** — requests device geolocation (with a plain-language explanation first), falls back to a manual area search if permission is denied, and lists nearby sample destinations sorted by real straight-line distance with estimated travel time by walking/driving/transit. Includes "Get Directions" (opens Google Maps) and "Save".
- **Recommended for You** — surfaces destinations matching interests chosen at onboarding or in Settings, with a one-line reason ("Because you enjoy Nature").
- **Expeditions** — join/leave guilds with confirmation dialogs, view details.
- **Discoveries** — unread indicators, mark-one/mark-all-read.
- **Events** — category filters, register/cancel, full-capacity state, clearly labelled as demo events.
- **Explorer's Journal** — profile stats, a validated entry form (title/place required), delete with confirmation, and a leaderboard of fictional users.
- **QuestVerse Assistant** — a rule-based FAQ chatbot (no live AI) with category tabs, suggested questions, free-text input matched against a fixed FAQ set, and deep links into the Map/Events tabs.
- **Accessibility & Display settings** — text-size steps, a true high-contrast palette (not a filter), a dyslexia-friendly font/spacing mode, reduced motion, and a reset-all-data option. These apply globally and persist on-device.
- Real photographs are used for three sample locations (Shaniwar Wada, Sinhagad Fort entrance, vada pav) via Wikimedia Commons, with alt text; a few similar trails reuse these as **labelled "representative photo — not the exact location"** rather than pretending to be an exact match. If an image fails to load, the app shows an icon placeholder rather than a broken image.

## What's not built yet

The original brief asked for a much larger product. To keep every stage genuinely working rather than shipping placeholders, these are intentionally deferred:

- Destination detail pages (hero image, cost/season/difficulty, nearby attractions, reviews)
- Trip planner (day-wise itinerary, budget breakdown, reorder/save/edit/delete)
- Travel gear recommendations, wishlist and packing checklist
- Travel blogs, articles and user-submitted reviews
- Offline/low-bandwidth mode with an explicit "available offline" indicator
- In-app Design Documentation viewer (the UX documents are provided as a separate file — see below — rather than a screen inside the app)

## UX / assignment documentation

The research and design deliverables the assignment brief asked for (personas, contextual inquiry plan, journey map, wireframes, heuristic evaluation template, case study) are in `docs/UX-CASE-STUDY.md`, not inside the running app. They are explicitly labelled as research hypotheses/templates, not real user data, per the brief's own instructions not to fabricate findings.

## Project structure

```
src/
  App.tsx       screens and components
  data.ts       typed sample data (trails, events, guilds, FAQ, coordinates)
  index.css     Tailwind layer + accessibility mode overrides
docs/
  UX-CASE-STUDY.md
```

## QuestVerse upgrade (this release)

New: destination pages with **Quest Tasks** (photo/caption/memory, XP, badges, levels), **Flip & Discover** facts, **Quest Quiz**, **Trip Planner** with budget/step-free filters and packing & gear checklist, personal **exploration map** and **Travel Journal**, plus new accessibility options (large targets, simplified navigation, photo captions, low-data mode, offline banner + service worker).

- **Logo:** drop your file at `public/questverse-logo.png`; a placeholder SVG shows until then.
- **Demo limits:** photos are compressed and kept in `localStorage` on this device (no cloud upload); quest completion is honour-system — there is **no GPS verification**; costs, accessibility notes and facts are sample content. Offline support is a network-first service worker (production build only).
