# AGENTS.md

Guide for AI agents (and human contributors) working in this repository.
Complements `README.md`; this is what you need to know to touch the code
without breaking existing conventions.

## Language rule

**All content in this repository must be written in English**: code,
identifiers, comments, commit messages, UI copy/strings, and documentation.
Do not add new Spanish (or any other language) text anywhere in the repo,
even if you find existing Spanish strings in the current UI (see
"Conventions observed" below) — those are legacy and should be treated as
technical debt, not as a pattern to keep following.

## What this project is

Caima App: a system for organizing informal football matches ("Caimas"),
managing sign-ups, and tracking stats (goals/wins) per player. See
`README.md` for functional detail and `PRD.md` for the product.

## Architecture

- **Astro** handles routing and SSR (`src/pages/*.astro`). Each page mounts
  a `screen` (`src/screens`) which in turn imports a React component as an
  interactive island (`client:load` or `client:only="react"`).
- **React** is only used for interactive parts — there's no global SPA:
  each island hydrates independently.
- **Global state**: no Context API or Redux. All shared state lives in
  `src/stores/*.ts` using `nanostores` (`atom`/`map`) + `useStore` hooks
  from `@nanostores/react`. There are two stores: `userStore.ts` and
  `partyStore.ts`.
- **Data access**: all Firebase (Auth + Firestore) calls go through the
  `Firebase` class in `src/services/firebaseConnection/class.ts`.
  Components and stores never call `firebase/firestore` directly — always
  through that class's corresponding method (`fb.<method>`).

### Store function pattern

Exported store functions always follow this shape: call `fb.<method>`,
update the corresponding `atom`/`map` with the result, and set an `xStatus`
atom (`{ status: "" | "loading" | "success" | "error", message: string }`)
so the UI can show feedback. Example: `createPartyFunction`,
`registerAdmissionApplications`, `closePartyFunction` in `partyStore.ts`. If
you add new functionality that touches Firestore, follow this same pattern
instead of handling loading/error with local component state.

### User session

After login, the user doc is cached in `localStorage` under the
`"userLogged"` key and rehydrated into the `userInfo` atom via
`getAccessToken()` (defined in `userStore.ts`). That `useEffect` fires in
every top-level component that needs to know who's logged in
(`HomeComponent`, `HeaderInfo`, `UserInformation`, etc.). If you add a new
React island that depends on `userInfo`, call `getAccessToken()` in a
`useEffect` on mount, same as the existing ones.

## Gotcha: global ambient types

`src/typesDefs/user.ts` declares `UserInterface` and `UserInfo` **with no
`import`/`export` statements** in the file. That makes TypeScript treat the
file as a global script (not a module), so those two types are available
everywhere without needing to import them (that's how they're used in
`class.ts`, `partyStore.ts`, `UsersTable.tsx`, etc.).

**Don't accidentally add an `import` or `export` to that file** — turning it
into a module would break every implicit usage of `UserInterface`/`UserInfo`
across the codebase. If you need a new type, export it explicitly the way
`src/typesDefs/party.ts` does (which properly uses `export interface ...` +
`import type` in consumers) — don't repeat the ambient pattern.

## Domain vocabulary

- "Caima" (UI) == `party` (code, `parties` collection in Firestore). A
  Caima is a match/session with a date, players, and stats.
- Keep "Caima" in new UI copy for consistency with existing strings
  ("Register New Caima", "Close Caima").

## Caima lifecycle

1. An admin creates it (`createPartyFunction`) → it's open, with the
   creator as the only player in `players`/`stats`.
2. Other users request to join (`registerAdmissionApplications` →
   `admissionApplications`).
3. The admin or the creator accepts (`acceptAdmissionApplicationFunction`)
   → the user moves from `admissionApplications` to `players` + gets a
   `stats` entry added with `goals: 0, victory: 0`.
4. The admin can mark players as `collaborators` on that Caima
   (`updateCollaboratorsListFunction`) so they can also enter stats.
5. Admin/collaborators enter goals and wins per player
   (`registerGoalsFunction`, via `PartyStatsList`).
6. The admin closes the Caima (`closePartyFunction` → `isClosed: true`).
   From then on it stops accepting changes and **only then** does it count
   toward global stats (`GeneralStatsTable` filters by `isClosed`).

## Conventions observed (follow these in new code)

- **Exports**: most components use named exports (`export { Foo }`).
  `UsersTable.tsx` is the exception with `export default`. For new
  components, prefer named exports.
- **UI language (legacy state)**: the current UI mixes English (most of
  it: "Register New Caima", "Close Caima", table labels) with a few
  Spanish strings ("Registrar Usuario", "Cerrando caima...",
  "Confirmar/Cancelar" in modals). Per the language rule above, do **not**
  add new Spanish copy — write new UI strings in English, even inside a
  file that currently has Spanish nearby. Feel free to translate existing
  Spanish strings to English if you're already touching that file/flow for
  another reason, but don't do a repo-wide sweep unless asked.
- **No fetching abstractions**: each store calls `fb.*` directly and
  updates its own atoms; there's no extra cache/query layer (no React
  Query, no SWR). Don't introduce one unless explicitly requested.

## How to validate changes

There are no automated tests and no linter configured. The only check
available is:

```sh
npm run build   # runs `astro check` (types) and then builds
```

Run this after any non-trivial change. To test functionality, `npm run dev`
requires the `PUBLIC_APP_FIREBASE_*` variables pointing at a real Firebase
project (see `README.md`).

## Known technical debt (don't silently "fix" these — may be intentional or out of scope)

- `class.ts` has a large commented-out block of a legacy Users/Tournaments
  API — looks like dead code kept for reference.
- `getUserInformationAndStatsById` (`userStore.ts`) divides
  `goals / victory` without guarding against `victory === 0` (risk of
  `NaN` in `goalsPerVictory`).
- No Firestore rules file is versioned in the repo — data security depends
  on whatever is configured manually in the Firebase console.
- No tests or CI configured.

If your task touches any of these, confirm scope with the user before
"fixing" them in passing.
