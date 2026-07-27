# VWatch Frontend

VWatch is a **real-time synchronized watch party platform** built with **Vite + React + TypeScript + Tailwind CSS v4**. This document covers the full frontend architecture: design system, state management, WebSocket flows, page structure, and component breakdown.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://your-api-url/api/v1
VITE_WS_URL=https://your-api-url
VITE_YOUTUBE_API_KEY=your_youtube_api_key
```

---

## Codebase Directory Structure

```text
src/
├── App.tsx                  # Root component (providers + router outlet)
├── App.css                  # Base application styles
├── main.tsx                 # React DOM entry point
├── index.css                # Tailwind v4 theme tokens & global CSS
│
├── assets/                  # Image and static media assets
│
├── components/
│   ├── dashboard/
│   │   ├── CreateRoomModal.tsx
│   │   ├── JoinRoomModal.tsx
│   │   └── RoomCard.tsx
│   ├── hireme/              # Hire Me page section components
│   ├── room/
│   │   ├── ChangeVideoModal.tsx
│   │   ├── ChatPanel.tsx
│   │   ├── FloatingReactions.tsx
│   │   ├── ParticipantList.tsx
│   │   ├── PlaybackLogsModal.tsx
│   │   ├── RoleManagementModal.tsx
│   │   ├── SyncTelemetry.tsx
│   │   ├── TransferHostModal.tsx
│   │   └── VideoPlayer.tsx
│   └── shared/
│       ├── Button.tsx
│       ├── ChatBot.tsx
│       ├── Footer.tsx
│       ├── GlassCard.tsx
│       ├── Input.tsx
│       ├── LoadingSpinner.tsx
│       ├── Modal.tsx
│       ├── Navbar.tsx
│       ├── ProtectedRoute.tsx
│       ├── RoleBadge.tsx
│       └── Toast.tsx
│
├── config/
│   └── env.ts               # Environment variable config
│
├── hooks/
│   ├── useAuth.ts
│   ├── useChat.ts
│   ├── useParticipants.ts
│   ├── usePlayer.ts
│   └── useRoom.ts
│
├── pages/
│   ├── AccountPage.tsx
│   ├── DashboardPage.tsx
│   ├── ExplorePage.tsx
│   ├── HireMePage.tsx
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── NotFoundPage.tsx
│   ├── RegisterPage.tsx
│   └── RoomPage.tsx
│
├── router/
│   └── index.tsx            # React Router DOM v7 route definitions
│
├── services/
│   ├── api.client.ts
│   ├── auth.service.ts
│   ├── participant.service.ts
│   ├── room.service.ts
│   └── socket.service.ts
│
├── store/
│   ├── useAuthStore.ts
│   ├── useRoomStore.ts
│   └── useThemeStore.ts
│
├── types/
│   ├── chat.ts
│   ├── participant.ts
│   ├── player.ts
│   ├── room.ts
│   └── user.ts
│
└── utils/
    ├── cookie.ts
    ├── room.ts
    └── youtube.ts
```

---

## UI Design System (Fonts & Colors)

The styling system is built on **Tailwind CSS v4** with a custom theme defined in `src/index.css`. Theme properties switch dynamically between light and dark mode via `.light` / `.dark` class tags on the `html` element.

### Typography

Fonts are loaded from Google Fonts in `index.html`:

| Font | Usage | Tailwind Classes |
| :--- | :--- | :--- |
| **Outfit** | Display headings & titles | `font-display-lg`, `font-headline-lg`, `font-headline-md`, `font-headline-sm` |
| **Plus Jakarta Sans** | Body text & paragraphs | `font-body-lg`, `font-body-md` |
| **JetBrains Mono** | Tags, IDs, labels, inputs | `font-label-mono`, `font-label-caps` |

### Icons

- **Material Symbols Outlined** — Loaded from Google Fonts. Used via `<span className="material-symbols-outlined">icon_name</span>`.
- **Lucide React** — Imported per component (e.g., `Bot`, `Send`, `Play`, `Pause`, `X`, `LogOut`, `Menu`).

### Color Tokens

All colors are defined in `src/index.css` under `:root` (Light) and `html.dark` (Dark):

| CSS Variable | Tailwind Utility | Light Value | Description |
| :--- | :--- | :--- | :--- |
| `--bg` | `bg-background` | `#f4ede2` | Page body background |
| `--surface` | `bg-surface` | `#ffffff` | Primary container surface |
| `--on-surface` | `text-on-surface` | `#1c1917` | High-contrast text |
| `--on-surface-variant` | `text-on-surface-variant` | `#57534e` | Secondary/muted text |
| `--surface-container` | `bg-surface-container` | `#eae2d3` | Embedded container background |
| `--outline` | `border-outline` | `rgba(28,25,23,0.1)` | Borders & focus rings |
| `--primary` | `text-primary` / `bg-primary` | `#d97706` | Brand accent (Amber) |
| `--tertiary` | `text-tertiary` / `bg-tertiary` | `#0d9488` | Teal secondary accent |
| `--secondary` | `text-secondary` / `bg-secondary` | `#6366f1` | Indigo/Purple accent |
| `--error` | `text-error` / `bg-error` | `#dc2626` | Error states |
| `--frame` | `bg-frame` | `#0c0a09` | Dark outer page chrome |
| `--cream-on-frame` | `text-cream-on-frame` | `#f5ede0` | Light text on dark frame |

### Custom CSS Utilities (`src/index.css`)

- `.glass-card` — Glassmorphism surface with border and shadow.
- `.luminous-border` — Gradient glowing border (Primary to Tertiary via xor mask).
- `.frame-chrome` — Dark outer chrome panel with rounded corners.
- `.panel-inset` — Recessed inset panel surface.
- `.mesh-gradient` — Radial gradient ambient glow overlay.
- `.dot-grid` — Dot-grid background pattern.
- `.custom-scrollbar` — Custom-styled thin scrollbar.
- `.animate-shimmer-text` — Animated shimmer text effect (used on footer wordmark).
- `.chatbot-dot` — Animated typing indicator dots for the chatbot.
- `.chatbot-markdown` — Styled markdown rendering inside chatbot assistant bubbles.

---

## State Management & WebSocket Architecture

VWatch uses three **Zustand** stores (`src/store/`) exposed through unified hooks (`src/hooks/`).

### 1. `useAuthStore` -> `useAuth`
Manages user sessions, JWT tokens, and profile metadata.
- **State**: `user`, `isLoading`
- **Actions**: `login(payload)`, `register(payload)`, `logout()`, `checkAuth()`

### 2. `useThemeStore`
Manages light/dark theme toggle state.
- **State**: `theme` (`'light' | 'dark'`)
- **Actions**: `toggleTheme()`

### 3. `useRoomStore` -> `useRoom`, `usePlayer`, `useParticipants`, `useChat`
Connects and coordinates all WebSocket events via `socket.service.ts`.

**State properties:**
- `room` — Active room metadata (ID, name, host ID).
- `participants` — Sorted participant list.
- `selfId` — Current client's user ID.
- `messages` — Chat message feed (user + system messages).
- `playerState` — Live YouTube player state (`videoId`, `state`, `currentTime`, `timestamp`, `updatedBy`).
- `reactions` — Active floating emoji reactions.

**Incoming Socket Events:**

| Event | Effect |
| :--- | :--- |
| `sync_state` | Syncs playback position & video ID from server |
| `user_joined` | Adds new participant to the list |
| `user_left` | Removes participant; triggers host-left closure if host |
| `role_assigned` / `participants_updated` / `participant_removed` | Updates participant roles & permissions |
| `chat_message` | Appends message to chat feed |
| `reaction` | Triggers floating emoji on screen |
| `kicked` | Forces client to leave room immediately |

**Outgoing Socket Emitters:**

| Emitter | Trigger |
| :--- | :--- |
| `join_room` | On room page mount |
| `leave_room` | On leave button click |
| `reaction` | On emoji bar click |
| `assign_role` | Host assigns role to a participant |
| `remove_participant` | Host kicks a user |
| `transfer_host` | Host transfers room ownership |

---

## Pages

### 1. Landing Page (`LandingPage.tsx`)
Cinematic welcome screen with:
- Dark outer frame chrome layout with inverted-corner cutouts for logo and nav.
- **"Enter the Platform"** pill CTA — navigates to `/dashboard` (always).
- **"Start a room"** — navigates to `/dashboard` if logged in, else `/register`.
- Animated 3D video demo card with image carousel and floating chat reactions.
- Crazy Mode toggle (bottom-right corner) that increases card animation intensity.
- `Footer.tsx` with **"Get Started Free"** — navigates to `/dashboard` if logged in, else `/register`.

### 2. Login (`LoginPage.tsx`) & Register (`RegisterPage.tsx`)
- Form-based auth using shared `Input.tsx`.
- Async authentication with inline error display.
- `LoadingSpinner` inside `Button` during submission.

### 3. Dashboard (`DashboardPage.tsx`)
- Floating capsule `Navbar` at the top.
- Welcome header with username greeting.
- **Create Room** and **Join Party** action buttons.
- Room search bar filtering by name or ID.
- Responsive grid of `RoomCard` items.
- `CreateRoomModal` and `JoinRoomModal` overlays.

### 4. Explore Page (`ExplorePage.tsx`)
- Displays all **public** rooms across the platform.
- Real-time search bar filtering by room name, ID, or host.
- Room cards with direct join buttons.

### 5. Account Page (`AccountPage.tsx`)
- Shows current user's `username`, `emailAddress`, and `id`.
- Verified Host badge.
- Sign Out button.

### 6. Hire Me Page (`HireMePage.tsx`)
- Multi-section portfolio page using modular section components (`Hero`, `ExperienceSection`, `SkillsSection`, `ProcessTimeline`, `EngineeringPractices`, `HireCTA`).
- Each section wrapped in a `SectionPanel` card on a dark frame background.

### 7. 404 Not Found (`NotFoundPage.tsx`)
- Fallback route for unrecognized paths.

---

## Watch Party Room Page (`RoomPage.tsx`)

```text
+--------------------------------------------------------------+
|                       Room Toolbar                           |
|  [Room Name] [Room ID] [Role Badge] ... [Copy] [Leave]       |
+------------------------------------+-------------------------+
|                                    |                         |
|                                    |    Participant List     |
|          Video Sync Area           |    [Sorted by role]     |
|                                    |    [Host action menu]   |
|   [ Floating Reactions Overlay ]   |-------------------------|
|   [     react-youtube Player   ]   |       Live Chat         |
|   [ Playback Controls          ]   |   [Message feed]        |
|   [ Emoji Action Bar           ]   |   [Input + Send]        |
+------------------------------------+-------------------------+
|           Sync Status Telemetry Footer Bar                   |
+--------------------------------------------------------------+
```

### Room Toolbar
- Displays room name, room ID, and user's `RoleBadge` (`HOST` | `MODERATOR` | `PARTICIPANT` | `VIEWER`).
- **Copy Link** — Copies room URL to clipboard with a toast notification.
- **Change Video** — Visible to Hosts/Moderators. Opens `ChangeVideoModal.tsx`.
- **Roles** — Visible to Hosts. Opens `RoleManagementModal.tsx`.
- **Leave** — Disconnects WebSocket and redirects to `/dashboard`.

### Video Sync Area (`VideoPlayer.tsx`)
- Embeds the `react-youtube` player.
- **Playback Blocker Overlay** — An invisible div over the player prevents Viewers/Participants from clicking the player when `!canControl`.
- **Control Panel** — Play/Pause, -10s, +10s, Mute/Unmute. Enabled only for Hosts/Mods.
- **Floating Reactions** (`FloatingReactions.tsx`) — Emoji rises up the screen on reaction.
- **Emoji Action Bar** — Clicking an emoji triggers `sendEmojiReaction()`.
- **YouTube Search Sidebar** — Tabs (Home, Trending, Subscriptions, Library), search input, results list. Video selection calls `changeVideo(videoId)` — only if `canControl`.

### Participant List (`ParticipantList.tsx`)
- Sorted by authority: `HOST` > `MODERATOR` > `PARTICIPANT` > `VIEWER`.
- Avatar shows first letter of username + role badge.
- **Host Action Menu** (three-dot icon) — Assign role or remove participant.

### Live Chat Panel (`ChatPanel.tsx`)
- Scrollable message feed with auto-scroll on new messages.
- User messages: right-aligned (self) / left-aligned (others) with timestamp.
- System messages: centered pill notifications.
- Message input with Enter-to-send and a send button.

### Sync Telemetry Footer (`SyncTelemetry.tsx`)
- Displays connection status, active peer count, room ID, and playback health.
- **Playback Logs** button opens `PlaybackLogsModal.tsx` showing recent sync events.

---

## AI Chatbot (`ChatBot.tsx`)

A floating chatbot assistant available on all pages:
- **Bot button** (bottom-right, fixed) — bounces when closed to draw attention.
- Opens a full chat panel (full-screen on mobile, 360x520px popup on desktop).
- Sends messages to `/api/v1/chat` with conversation history for context.
- Supports Markdown rendering in assistant replies.
- Clear conversation button in the header.

---

## Routing (`router/index.tsx`)

| Path | Component | Protected |
| :--- | :--- | :--- |
| `/` | `LandingPage` | No |
| `/login` | `LoginPage` | No |
| `/register` | `RegisterPage` | No |
| `/dashboard` | `DashboardPage` | Yes |
| `/room/:roomId` | `RoomPage` | Yes |
| `/explore` | `ExplorePage` | Yes |
| `/account` | `AccountPage` | Yes |
| `/hire-me` | `HireMePage` | No |
| `*` | `NotFoundPage` | No |

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| Vite + React 19 | Build tool & UI framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Utility-first styling with custom theme tokens |
| Zustand | Global state management |
| React Router DOM v7 | Client-side routing |
| Socket.IO Client | Real-time WebSocket events |
| react-youtube | YouTube player embed |
| Framer Motion | Animations (landing page card) |
| Lucide React | Icon library |
| ReactMarkdown | Markdown rendering in chatbot |