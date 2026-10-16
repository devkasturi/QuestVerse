# TrailMate — UX Case Study & Assignment Documentation

> **Note on status.** Everything in this document is either (a) an actual design decision made in the shipped prototype, clearly marked **[Implemented]**, or (b) a research artefact — personas, interview questions, journey map, wireframes, heuristic template — explicitly marked **[Hypothesis / Template — not yet validated with real users]**. Nothing below should be read as real user research. Where the original brief asked for illustrative examples, they are marked as such and are meant to be replaced with real data.

---

## 1. Problem Statement & Target Users

Pune has dense, walkable heritage, food and nature destinations, but discovering them today means piecing together Google reviews, scattered blogs and word of mouth. TrailMate's problem statement: **local explorers lack one place that turns "what's nearby and worth doing" into a trackable, game-like habit**, without becoming a generic booking site.

Target users (see personas below): budget-conscious students, first-time/occasional local travellers, and users with accessibility or connectivity constraints.

## 2. Why This Product Is Needed

Existing map apps optimise for point-to-point navigation, not exploration or a sense of progress. Existing travel blogs are static and not personalised or trackable. TrailMate's differentiator is combining **discovery + light gamification (XP, quests, guilds) + a personal journal**, scoped tightly to one city so the content can stay genuine rather than generic.

## 3. Scope & Assumptions

- Single city (Pune) prototype; not a booking platform; no real payments.
- No backend — all state is per-device `localStorage`. Assumption: acceptable for a prototype/assignment; a real product would need an account system.
- Geolocation is used only for a one-time "nearby" lookup, never continuous background tracking.
- Sample destinations, events, prices and ratings are demo data, explicitly labelled as such throughout the UI — this was a hard requirement from the brief and is treated as non-negotiable.

---

## 4. User Personas — **[Hypothesis — research hypotheses until validated with real users]**

### Persona A — "Budget Student Explorer"
- **Name / age:** Priya Deshmukh, 20, second-year engineering student in Pune.
- **Background:** Lives in a hostel, tight monthly budget, explores mostly on weekends with friends.
- **Goals:** Find free or cheap things to do within a short auto/bus ride; not feel like a tourist being sold to.
- **Behaviours:** Checks Instagram and friend recommendations before Google; decides plans same-day.
- **Frustrations:** Travel sites assume a travel budget she doesn't have; most "things to do" content is written for tourists, not locals.
- **Needs:** Distance and cost filters up front; a way to track what she's already done so she doesn't repeat it.
- **Devices / access:** Budget Android phone, spotty hostel wifi, mobile data used sparingly.
- **Design decisions this informs [Implemented]:** distance-based "Explore Near Me" with a walking-speed estimate; demo prices always labelled; no forced sign-up before browsing.

### Persona B — "First-Time Local Traveller"
- **Name / age:** Rohan Iyer, 34, relocated to Pune for work six months ago.
- **Background:** New to the city, wants structured guidance rather than open-ended browsing.
- **Goals:** A short list of "safe, well-reviewed, easy to reach" options rather than an overwhelming map.
- **Behaviours:** Prefers lists and clear category filters over free exploration; reads descriptions fully before deciding.
- **Frustrations:** Illustrated/stylised maps are charming but hard to use for actual navigation decisions.
- **Needs:** A plain-text list alternative to the map; clear "how do I get there" actions.
- **Design decisions this informs [Implemented]:** the "Show list" toggle next to the illustrated map; "Get Directions" opens real map/routing rather than relying on the illustrated map for navigation; FAQ chatbot's "How do I plan a weekend trip?" and "How can I reach this destination?" answers.

### Persona C — "Accessibility- and Connectivity-Constrained User"
- **Name / age:** Meera Kulkarni, 58, low vision, uses a screen reader occasionally and prefers larger text.
- **Background:** Lives in an area with inconsistent mobile network coverage.
- **Goals:** Use the app without needing to see fine detail or load heavy content reliably.
- **Behaviours:** Increases OS text size; relies on labelled buttons rather than icon-only controls; avoids apps that break under high contrast.
- **Frustrations:** Apps that encode meaning only in colour or only in a map; broken layouts under larger text.
- **Needs:** True high-contrast (not a colour filter), scalable text, motion reduction, meaningful alt text, and information (distance, status) available as text, not only as a graphic.
- **Design decisions this informs [Implemented]:** dedicated Accessibility & Display panel (text-size steps, real palette-swap high-contrast mode, dyslexia-friendly font/spacing, reduced motion); every icon-only button has an `aria-label`; nearby-destination distance and rating are always printed as text next to any icon; status (joined/registered/unread) is shown as a word, never colour alone.

---

## 5. Contextual Inquiry Plan — **[Template — no interviews have been conducted]**

**Research objective:** Understand how people currently discover local places, plan short local trips, and prepare to travel, so TrailMate's flows match real behaviour rather than assumptions.

**Research questions:**
1. What triggers the decision to explore somewhere new locally?
2. What sources do people consult, and in what order?
3. How do people decide between destinations once they have a shortlist?
4. What causes people to abandon a plan?
5. How is packing/preparation actually done, if at all, for a short local trip?

**Participant selection criteria:** Adults (18+) who have taken at least one leisure trip or local outing in the past 3 months; mix of students, working professionals and at least one participant who identifies as having an accessibility or connectivity constraint.

**Suggested sample:** 5–6 participants — 2 students, 2 working professionals, 1–2 participants representing accessibility/connectivity constraints.

**Consent statement (illustrative):** *"I am conducting research to improve a travel-exploration app prototype. I'd like to observe you doing a real task related to planning or discovering a local trip, and ask follow-up questions. Participation is voluntary, you may stop at any time, and any notes will be anonymised."*

**Ethical considerations:** Voluntary participation, right to withdraw, anonymise notes, no recording without explicit separate consent, avoid observing anything the participant does not intend to share (e.g., financial details visible on their screen).

**Observation protocol:** Ask the participant to carry out a real, self-chosen task ("plan something you'd actually do this weekend") using their normal tools, while thinking aloud. Observer takes notes only; does not intervene unless asked.

**Interview questions (open-ended, ≥10):**
1. Walk me through the last time you decided to go somewhere new nearby — what happened first?
2. What apps, sites or people do you check, and in what order?
3. How do you decide between two options that both look fine?
4. Tell me about a time a plan fell apart — what caused it?
5. How do you figure out what to pack or bring?
6. How do you decide whether something is worth the cost?
7. Do you ever explore alone vs with others — does that change how you plan?
8. What's frustrating about the tools you currently use?
9. How do you keep track of places you've already been?
10. If you lost network access mid-trip, what would you need to have already saved?
11. How do you decide it's safe or reasonable to do something (e.g. a trek) alone?

**Task observation sheet (columns):** Action taken · Tool/app used · Time spent · Interruptions · Workarounds observed · Difficulty encountered · Participant's own words.

**Findings template (columns):** Observed behaviour · Frequency (how many participants) · Related TrailMate screen · Design opportunity · Priority.

---

## 6. User Journey Map — **[Hypothesis, built for Persona A]**

Stages, mapped to TrailMate features:

| Stage | User action | Touchpoint | Thought | Emotion | Pain point | Opportunity |
|---|---|---|---|---|---|---|
| 1. Deciding to travel | Free Saturday, wants to do something | Own habit / friends | "I should go somewhere" | Curious | No trigger to start | Weekly XP/streak notification nudges without being pushy |
| 2. Discovering destinations | Opens TrailMate | Map + Explore Near Me | "What's actually near me?" | Mildly hopeful | Too many generic options elsewhere | Distance + interest filters up front |
| 3. Comparing destinations | Filters by category/distance | Category chips, sample ratings | "Which is worth it?" | Slightly overwhelmed | Ratings/costs often fake or stale on other apps | Ratings and costs explicitly labelled as demo, so trust isn't falsely implied |
| 4. Planning | Picks 1–2 places | Trail detail card | "How do I get there, what's the XP" | Motivated | No real day plan yet (gap) | *(Trip planner not yet built — noted limitation)* |
| 5. Preparing | Checks what to bring | FAQ chatbot ("What should I pack?") | "Am I ready?" | Slightly anxious | No packing checklist yet (gap) | *(Gear/packing checklist not yet built — noted limitation)* |
| 6. Experiencing | Visits, completes quest | Map, "Complete quest" | "This is fun, I'm making progress" | Satisfied | — | XP and completion feedback |
| 7. Recording & sharing | Logs it | Journal entry form | "I want to remember this" | Proud | — | Journal + leaderboard |

Emotional curve (simple description, since this is a text document): starts neutral → dips slightly during comparison (choice overload) → dips again at the planning/preparing gap (features not yet built) → rises sharply during the visit and after logging it in the Journal.

---

## 7. Logo & Interaction Design — **[Implemented]**

**Logo:** an original mark — a compass ring with a trail-marker diamond through the centre and a dashed path arcing across it, rendered as inline SVG (no external logo file, no resemblance to an existing commercial mark).

**Icon system (Lucide, consistent meaning):**
- Compass → explore/start action
- MapPin/Navigation → location and directions
- Swords → expeditions/guilds
- Bell → discoveries/notifications
- Landmark → historical/heritage
- Trees → nature
- UtensilsCrossed → food
- Camera → photography and photo placeholders
- BookOpen → journal
- Settings (gear) → accessibility/display settings
- MessageCircle → TrailMate Assistant chatbot

**Interaction styles demonstrated:** tap-to-select category chips (`aria-pressed`), live search filtering, list/map view toggle, SVG map zoom and marker selection (mouse and keyboard), a validated form (journal entry) with inline error text, confirmation dialogs (leave guild, delete entry, reset data), toast success messages, disabled state (a full event's Register button), pressed/selected states on chips and tabs, and visible focus rings on every interactive element for keyboard users.

---

## 8. Design for Diverse Users — **[Implemented]**

- **Rural / low-connectivity:** lightweight bundle, no required network calls to function (sample data is local); a manual place-name search avoids needing GPS/network location entirely.
- **Low vision:** three text-size steps; a genuine high-contrast palette swap (not a CSS filter) verified to keep buttons, chips and alerts distinguishable without colour alone.
- **Motor impairments:** all touch targets are at least 44px tall; no drag-only interactions (list reordering elsewhere in the brief was intentionally not implemented rather than shipped as a drag-only gesture).
- **Screen readers:** every icon-only control has an `aria-label`; map information is duplicated as plain text; live regions announce toasts (`role="status"`) and validation errors (`role="alert"`).
- **Simple-language preference:** the dyslexia-friendly mode switches to a plain sans-serif with generous line height and paragraph spacing.
- Accessibility preferences persist on-device and can be reset from the same panel.

*(Explicit offline-mode caching with an "available offline" indicator was scoped out of this build — see README limitations.)*

---

## 9. Wireframes — **[Template — text-described low-fidelity layout, not pixel art]**

Six required screens, described as block layout (content hierarchy over decoration):

1. **Home/Map:** [search bar] [settings icon] → [Explore Near Me panel] → [category chips row] → [map/list toggle + zoom controls] → [map or list] → [bottom nav].
2. **Destination details:** [photo block] → [title + rating] → [description block] → [action row: complete / save / directions] — *(fuller detail page with cost/season/nearby attractions not yet built)*.
3. **Expedition details:** [icon + name + joined badge] → [tagline] → [members/pool/level row] → [expandable "current activity"] → [join/leave + view buttons].
4. **Trip planner:** *(not yet built — planned layout: [destination + dates header] → [day tabs] → [reorderable activity list] → [running cost total] → [save/edit/delete]).*
5. **Gear recommendations:** *(not yet built — planned layout: [category filter row] → [product card grid: image, name, price, rating] → [wishlist/cart icons] → [packing checklist panel]).*
6. **Explorer's Journal:** [profile card: name, level, XP bar] → [stat tiles grid] → [new-entry form] → [entry list] → [leaderboard] → [settings link].

**Key layout decisions:** bottom tab bar kept to five items to match the reference screenshots and avoid overcrowding (chatbot and settings are surfaced as a floating button and an inline gear icon instead of extra tabs); forms are single-column for small screens; every screen keeps its primary action as a full-width button at thumb height.

---

## 10. Heuristic Evaluation Template — **[Template, with one illustrative example]**

| Heuristic | Observed issue | Screen | Severity (0–4) | Evidence | Suggested redesign | Justification |
|---|---|---|---|---|---|---|
| 1. Visibility of system status | *(example)* Registering for an event gave no immediate confirmation before this was fixed | Events | 2 | Screenshot / recording | Add a toast + button label change on success | Users need feedback that their action registered |
| 2. Match between system and real world | | | | | | |
| 3. User control and freedom | | | | | | |
| 4. Consistency and standards | | | | | | |
| 5. Error prevention | | | | | | |
| 6. Recognition rather than recall | | | | | | |
| 7. Flexibility and efficiency of use | | | | | | |
| 8. Aesthetic and minimalist design | | | | | | |
| 9. Help users recognise, diagnose and recover from errors | | | | | | |
| 10. Help and documentation | | | | | | |

**How to prioritise redesigns:** fix severity-4 (blocks task, no workaround) and severity-3 (major, workaround exists but painful) issues first; log severity 1–2 for a later polish pass; severity 0 (cosmetic only) is optional.

*(This is a blank template for evaluating a real classmate prototype — no actual classmate prototype has been evaluated here.)*

---

## 11. Information Architecture & Navigation — **[Implemented]**

Flat, five-tab structure (Map, Expeditions, Discoveries, Events, Journal) chosen to match the reference screenshots and keep navigation shallow — every core feature is one tap from anywhere. The chatbot and accessibility settings are deliberately kept out of the tab bar (a floating action button and an inline icon, respectively) so the five-tab pattern isn't diluted, per the upgrade brief's explicit instruction not to overcrowd the bottom navigation.

## 12. Limitations & Future Improvements

- No trip planner, gear/packing module, blogs/reviews, or dedicated destination detail pages yet — the highest-value next additions.
- No offline caching layer yet.
- Sample data covers 7 trails/4 events/4 guilds — enough to demonstrate every interaction, not a full destination catalogue.
- Only 3 of 7 trail photos are of the literal correct location (clearly labelled); a production version would need a proper photo per destination.
- No real backend — a real product would need accounts and server-side persistence instead of per-device `localStorage`.
