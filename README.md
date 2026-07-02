# Caima App

A web system for organizing informal football matches ("Caimas") among a
closed group of players: it manages sign-ups for each match, tracks goals
and wins, and keeps historical stats (both individual and group-wide).

## Main features

**Authentication** (Firebase Auth: email/password)
- User registration and login
- Password recovery by email

**Admins**
- Create new Caimas (matches) with a date
- Register and edit users manually
- Accept admission requests to a Caima
- Assign collaborators per Caima (players allowed to enter stats while the
  match is open)
- Enter/edit goals and wins for each player
- Remove players from a Caima
- Close a Caima (stops accepting changes and makes it count toward global
  stats)

**Players**
- View the list of Caimas (open and closed)
- Request to join an open Caima
- View the group's global stats ranking (goals, wins, matches played; only
  players with more than one match are listed)
- View their own historical stats page (`/user/[id]`): totals, per-match
  averages, and a history of Caimas played

**Collaborators** (assigned by an admin for a specific Caima)
- Enter goals and wins for that Caima's players while it's still open

## Tech stack

- [Astro 4](https://astro.build) (SSR, `output: "server"`) as the main framework and router
- [React 18](https://react.dev) as interactive islands (`client:load` / `client:only="react"`)
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Firebase](https://firebase.google.com) (Authentication + Firestore) as the backend
- [nanostores](https://github.com/nanostores/nanostores) + `@nanostores/react` for global state shared between islands
- `react-data-table-component`, `react-datepicker`, `@radix-ui/react-dialog` for UI
- TypeScript
- `@astrojs/vercel/serverless` adapter for deployment on Vercel

## Project structure

```text
/
├── public/                         # Static assets
├── src/
│   ├── components/                 # React components (islands) and UI helpers
│   ├── layouts/                    # Shared Astro layout (Layout.astro)
│   ├── pages/                      # Astro routes: index, home, sign-in, party/[id], user/[id]
│   ├── screens/                    # Per-page screen composition (Astro)
│   ├── services/firebaseConnection # Firebase class (init + all data access)
│   ├── stores/                     # Global state (nanostores): userStore, partyStore
│   ├── typesDefs/                  # Shared types (user, party, table)
│   └── utils/                      # Utilities (e.g. TimeStampsToDate)
└── package.json
```

## Prerequisites

- Node.js 18+ and npm
- A Firebase project with **Authentication** (Email/Password provider) and
  **Firestore** enabled

## Environment variables

Astro exposes any variable prefixed with `PUBLIC_` to the client. Create a
`.env` file at the project root (not committed) with your Firebase web
project's credentials:

```env
PUBLIC_APP_FIREBASE_API_KEY=
PUBLIC_APP_FIREBASE_AUTH_DOMAIN=
PUBLIC_APP_FIREBASE_PROJECT_ID=
PUBLIC_APP_FIREBASE_STORAGE_BUCKET=
PUBLIC_APP_FIREBASE_MESSAGING_SENDER_ID=
PUBLIC_APP_FIREBASE_APP_ID=
```

These are Firebase's public web SDK credentials (not server secrets), but
they are required: the app instantiates Firebase when the stores load, so
`npm run dev` won't work correctly without them.

## Install and develop

```sh
npm install
npm run dev       # http://localhost:4321
```

## Commands

| Command                     | Action                                                     |
| :--------------------------- | :---------------------------------------------------------- |
| `npm install`                | Installs dependencies                                       |
| `npm run dev` / `npm start`  | Starts the dev server at `localhost:4321`                   |
| `npm run build`               | Runs `astro check` (type checking) then builds to `./dist/` |
| `npm run preview`             | Serves the production build locally                         |
| `npm run astro ...`           | Runs Astro CLI commands                                     |

## Data model (Firestore)

**`users` collection**
- `id`, `uid` (link to Firebase Auth), `name`, `userName`, `email`, `isAdmin`

**`parties` collection** (a "Caima")
- `id`, `date`, `createdBy`, `isClosed`
- `players: string[]` — ids of users accepted into the match
- `admissionApplications: string[]` — ids of users who requested to join
- `collaborators: string[]` — ids of players allowed to enter stats
- `stats: { userId, goals, victory }[]` — one entry per accepted player

Global and individual stats are computed on the client from closed Caimas
(`isClosed: true`); there is no server-side aggregation.

## Deployment

The project is configured to deploy on Vercel (`output: "server"` +
`@astrojs/vercel/serverless`). You need to set the `PUBLIC_APP_FIREBASE_*`
environment variables in the Vercel project.

## Project status / known limitations

- No automated test suite
- No linter/formatter configured (`astro check` only validates types)
- No Firestore rules file versioned in the repo; review and maintain
  security rules directly in the Firebase console
