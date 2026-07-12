# Anti-Kuddus Protocol

Section B's anonymous case-file system: a strike portal, seating chart,
syllabus digest, digital ledger, SOS alert, and fact checker — all wrapped
in a formal "case file" aesthetic with a light/dark (purple/green) theme.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
index.html                        Vite entry HTML, meta tags, font-loading notes
src/
  main.jsx                        React DOM mount
  index.css                       Tailwind layers, global type styles, keyframes, glass spec
  theme.js                        Font constants, THEMES tokens, ThemeContext
  App.jsx                         Root: auth/session flow, theme + strike state, routing
  hooks/
    usePersistentState.js         Persistent key/value storage hook + helpers
  data/
    constants.js                  Class roster, rulebook, nav items, dashboard features
  components/
    Primitives.jsx                Card, Button, Field, PageHeader, Ambient, ThemeToggle
    BootScreen.jsx                "Restoring case file…" splash
    LoginScreen.jsx                7-digit roll number authentication
    Shell.jsx                     Sidebar / topbar / mobile drawer / bottom nav layout
    Dashboard.jsx                 Impeachment meter, stats, case module grid
    StrikePortal.jsx              Anonymous report filing
    SeatingSection.jsx            3×4 desk grid with auto-sort
    SyllabusDigest.jsx            Local + Claude API syllabus summarization
    LedgerSection.jsx             Tiffin Theft / Washroom Toll trackers
    SosSection.jsx                Broadcast button + captain alert feed
    FactChecker.jsx               Rulebook verification desk
```

## Typography: Proxima Nova

The app's primary font is set to **Proxima Nova** everywhere (headings,
body copy, and the uppercase label/mono-style text alike), defined once in
`src/theme.js` and mirrored in `tailwind.config.js` / `src/index.css`:

```
'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
Helvetica, Arial, sans-serif
```

Proxima Nova is a **commercially licensed** typeface (Mark Simonson
Studio) — it isn't on Google Fonts, so it can't be pulled from a free CDN.
The app renders correctly today using the system fallback stack above. To
load the real face, pick one:

1. **Adobe Fonts** — create a web project at fonts.adobe.com, then
   uncomment and fill in the kit `<link>` at the top of `index.html`.
2. **Fonts.com / Monotype** — swap in the `<link>` snippet from your
   Monotype web-font project the same way.
3. **Self-hosted** — if you hold desktop/web licenses, drop the `.woff2`
   files into `public/fonts/` and uncomment the `@font-face` block already
   scaffolded at the top of `src/index.css`.

No other code changes are needed — every component already points at the
`Proxima Nova` family name, so it activates automatically once a source is
wired up.

## Notes

- `usePersistentState` uses Claude's sandbox `window.storage` API as a
  stand-in for `localStorage` (see comments in
  `src/hooks/usePersistentState.js`). If you're running this outside the
  Claude artifact sandbox, swap those calls for `window.localStorage`
  verbatim.
- The Syllabus Digest's "Summarize" button calls the Anthropic Messages
  API directly from the browser (`src/components/SyllabusDigest.jsx`). In
  a normal deployment you'll want to proxy that call through your own
  backend rather than exposing an API key client-side.
