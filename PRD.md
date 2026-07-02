# PRD — Caima App

## 1. Executive summary

Caima App is a web system that lets a closed group of amateur football
players organize their matches ("Caimas"), manage who plays each session,
and keep a historical record of goals and wins, both per match and
aggregated across the group.

It replaces informal/manual tracking (spreadsheets, chats, memory) with a
single source of truth accessible from any device with a browser.

## 2. Problem

A group that plays football regularly needs to:
- Coordinate who's playing each session (build the match roster)
- Reliably record individual results (goals, wins)
- Later be able to answer "who's the group's top scorer" or "how many
  matches has so-and-so played" without relying on memory or scattered
  spreadsheets

Today this is solved informally, and information gets lost over time.

## 3. Target users

| Profile | Description | Main need |
| --- | --- | --- |
| **Admin** | Group organizer (one or several). Creates Caimas, manages users, approves sign-ups, enters/closes results. | Full control over the Caima lifecycle and the user roster. |
| **Player** | Group member registered in the app. | Sign up for matches and see their own stats and the group's. |
| **Collaborator** | A player designated by an admin, per Caima, with extra permission to enter that match's stats while it's open. | Be able to enter results on the field without depending solely on the admin. |

There's no self-serve admin registration: the `isAdmin` role is assigned
manually (via Firestore/console); there's no UI flow to promote a user to
admin.

## 4. Goals and success metrics

- Reduce match-result data loss to zero (no closed Caima without its
  stats entered)
- Let any player view their full history and the global ranking without
  having to ask someone else
- Time to enter a Caima's results < a few minutes post-match

This PRD mainly documents the product's **current** state (v1, already
implemented); section 13 proposes future improvements.

## 5. Glossary

- **Caima**: an organized football match/session with a date, players, and
  stats. Modeled in Firestore as a document in the `parties` collection.
- **Caima stats**: for each accepted player, a count of `goals` and
  `victory` (wins, typically 0 or 1 depending on their team's result).
- **Admission request**: a player's request to join an open Caima, pending
  approval.
- **Collaborator**: a player enabled by an admin to enter stats for a
  specific Caima.
- **Global stats**: aggregated goals/wins/matches-played per player,
  computed only over closed Caimas.

## 6. v1 scope (implemented)

### 6.1 Authentication
- New user registration (name, username, email, password) via Firebase Auth
- Login with email/password
- Password recovery by email
- Session persisted in `localStorage`, manual logout

### 6.2 User management (admin)
- List of all registered users
- Manual user creation from the admin panel
- Editing an existing user's name/email

### 6.3 Caima management
- Create a new Caima with a date (admin only) — the creator is
  automatically added as a player
- List of all Caimas, sorted by date descending, with visible status
  (open / finished / "you're participating" / "waiting for approval")
- Request to join an open Caima (any player not already participating)
- Approve admission requests (admin or Caima creator)
- View a Caima's detail: list of players with their stats
- Assign/remove collaborators for a Caima (admin)
- Enter/edit goals and wins per player (admin or a designated
  collaborator, while the Caima is open)
- Remove a player from a Caima (admin)
- Close a Caima (admin) — stops accepting changes and makes it count
  toward global stats

### 6.4 Stats
- **Global**: sortable table (goals, wins, matches played,
  goals/match, wins/match) for all players with more than one Caima
  played, computed over closed Caimas
- **Individual** (`/user/[id]`): total goals, total wins, matches played,
  per-match averages, and a chronological history of each Caima played
  with its date, goals, and wins

## 7. Main flows

**Sign-up and first login**
1. User registers with name, username, email, and password
2. Logs in → lands on `/home`

**Organizing a Caima**
1. Admin creates a Caima, picking a date
2. Players see the Caima in the list and request to join
3. Admin/creator approves the requests
4. Admin assigns collaborators if needed
5. During/after the match, admin or collaborators enter each player's
   goals and wins
6. Admin closes the Caima → it now counts toward global stats

**Checking stats**
1. Any logged-in user sees the global ranking on `/home`
2. Any user can open a player's profile (`/user/[id]`) to see their
   detailed history

## 8. Data model

**`users`**: `id`, `uid`, `name`, `userName`, `email`, `isAdmin`

**`parties`** (Caima): `id`, `date`, `createdBy`, `isClosed`,
`players: string[]`, `admissionApplications: string[]`,
`collaborators: string[]`, `stats: { userId, goals, victory }[]`

There are no separate "team" or "venue/field" entities; a Caima is a single
event with no explicit team split beyond each player's `victory` counter.

## 9. Business rules / permissions

| Action | Admin | Caima creator | Caima collaborator | Player |
| --- | :---: | :---: | :---: | :---: |
| Create a Caima | ✅ | — | — | ❌ |
| Register/edit users | ✅ | — | — | ❌ |
| Request to join a Caima | ✅ | ✅ | ✅ | ✅ |
| Approve admission | ✅ | ✅ | ❌ | ❌ |
| Assign collaborators | ✅ | ❌ | ❌ | ❌ |
| Enter goals/wins | ✅ | ❌ (unless also a collaborator) | ✅ (while open) | ❌ |
| Remove a player from a Caima | ✅ | ❌ | ❌ | ❌ |
| Close a Caima | ✅ | ❌ | ❌ | ❌ |
| View stats (global/own) | ✅ | ✅ | ✅ | ✅ |

Note: today these permissions are only enforced in the UI (hiding/showing
controls); there are no Firestore rules versioned in the repo that enforce
them at the data layer (see section 11).

## 10. Non-functional requirements

- **Availability**: dependent on Firebase (Auth/Firestore) and Vercel
  hosting; no own SLA.
- **Performance**: global and individual stats are computed client-side by
  iterating over all closed Caimas; acceptable for the current volume
  (closed group, informal use), but won't scale to a very large history
  without server-side aggregation.
- **Security**: authentication via Firebase Auth; lacks data-layer access
  control (see risks).
- **Language**: the UI currently mixes English and Spanish; there's no
  formal internationalization (i18n). Per the language rule in
  `AGENTS.md`, new work should standardize on English.
- **Devices**: basic responsive design with Tailwind; no native mobile app.

## 11. Identified risks and gaps

- **No Firestore rules in the repo**: the permissions in the section 9
  table today rely on the UI hiding buttons; if there are no matching
  security rules configured in the Firebase console, any authenticated
  user could, in theory, write data the UI doesn't let them touch (e.g.
  close a Caima, edit someone else's stats).
- **Unguarded average calculation**: the `goals / victory` division in
  individual stats can produce `NaN` if a player has 0 wins.
- **No automated tests or CI**: changes are only validated with a manual
  `astro check`.
- **Manual admin promotion**: there's no product flow to promote a user to
  admin; it requires direct Firestore editing.
- **No user/Caima deletion**: the "Delete" button in the users table has
  no handler implemented; there's no way to remove a Caima created by
  mistake.

## 12. Out of scope (v1)

- Notifications (email/push) for new requests or Caimas
- Explicit team split within a Caima
- Stats export (CSV/PDF)
- Roles beyond admin/collaborator/player
- Native mobile app
- Internationalization

## 13. Proposed future improvements (v2+)

- Define and version Firestore security rules in the repo
- Add tests (unit tests for stores/stat calculations; e2e for the main
  flows) and CI
- Handle the 0-wins case in average calculations
- Implement user and Caima deletion (with confirmation)
- UI flow to promote/demote admins
- Notifications for admission requests and Caima closure
- Move global stats calculation to a server-side job/aggregation if the
  volume of Caimas grows significantly
