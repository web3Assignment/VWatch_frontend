# VWatch Frontend

This repository contains the **VWatch** frontend client codebase (Vite + React + TypeScript + Tailwind CSS v4). It details the system architecture, design systems, state stores, WebSocket synchronization flows, page structures, and components. 

---

## 📂 Codebase Directory Structure

```text
src/
├── App.tsx                  # Root component (providers + router outlet)
├── App.css                  # Base application styles
├── main.tsx                 # React DOM entry point
├── index.css                # Tailwind v4 theme tokens & global CSS
│
├── assets/                  # Image and static media assets
│
├── components/              # Component layer (divided by domain)
│   ├── dashboard/
│   │   ├── CreateRoomModal.tsx
│   │   ├── JoinRoomModal.tsx
│   │   └── RoomCard.tsx
│   ├── hireme/              # Hire Me page components
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

## 🎨 Stitch UI Design System (Fonts & Colors)

The styling system is built on **Tailwind CSS v4** with a highly structured custom theme defined in `src/index.css`. Theme properties change dynamically based on the `.dark` and `.light` class tags on the `html` element.

### 1. Typography & Icons
Fonts are loaded from Google Fonts in `index.html`:
*   **Main Body & Titles Font**: `Geist` (sans-serif, weights 300 to 800).
    *   Tailwind theme classes: `font-display-lg`, `font-headline-lg`, `font-headline-md`, `font-headline-sm`, `font-body-lg`, `font-body-md`.
*   **Monospaced Text**: `JetBrains Mono` (for tags, numeric labels, room IDs, code parts, search boxes, input text).
    *   Tailwind theme classes: `font-label-mono`, `font-label-caps`.
*   **Icon Fonts**:
    *   **Material Symbols Outlined**: Loaded from Google Fonts. Used via classes like `<span className="material-symbols-outlined">icon_name</span>` (e.g., `bolt`, `movie`, `add`, `logout`, `link`).
    *   **Lucide React Icons**: Imported selectively inside React files (e.g., `MessageSquare`, `X`, `Play`, `Pause`, `Volume2`, `Search`, etc.).

### 2. Colors & Dark / Light Variables
All colors are configured in `@theme` using CSS variables mapped under `:root` (Light mode) and `html.dark` (Dark mode):

| CSS Custom Variable | Tailwind Utility Equivalent | Description / Roles |
| :--- | :--- | :--- |
| `--bg` | `bg-background` | Overall page body background color |
| `--surface` | `bg-surface` | Primary container surface |
| `--on-surface` | `text-on-surface` | High-contrast text on surfaces |
| `--on-surface-variant` | `text-on-surface-variant` | Secondary / lower-contrast text |
| `--surface-container` | `bg-surface-container` | Embedded surface container background |
| `--surface-container-high` | `bg-surface-container-high` | Elevated container surfaces |
| `--surface-container-low` | `bg-surface-container-low` | De-emphasized container backgrounds |
| `--surface-container-lowest` | `bg-surface-container-lowest` | Lowest elevation surfaces (telemetry bar) |
| `--outline` | `border-outline` | Focus rings, borders |
| `--outline-variant` | `border-outline-variant` | Subdued borders (used for grids/dividers) |
| `--primary` | `text-primary` / `bg-primary` | Main brand color (Blue highlight) |
| `--primary-container` | `bg-primary-container` | Brand highlights background |
| `--tertiary` | `text-tertiary` / `bg-tertiary` | Teal/Cyan secondary brand highlight |
| `--secondary` | `text-secondary` / `bg-secondary` | Purple tertiary accent |
| `--error` | `text-error` / `bg-error` | Error borders, warning alerts |
| `--glass-bg` | *Custom class* | Background for glassmorphism panels |
| `--glass-border` | *Custom class* | Border for glassmorphic elements |

### 3. Custom CSS Classes (`src/index.css`)
*   `.glass-card`: Apply glass background, borders, dynamic shadow (`--glass-shadow`), and `backdrop-blur(16px)`.
*   `.luminous-border`: Uses a linear gradient border (Primary + Tertiary) with xor masking to create a glowing border effect around cards.
*   `.mesh-gradient`: Background utility overlay using radial gradients to project glowing light circles.
*   `.dot-grid`: Generates a dot grid pattern background using repeating radial gradients.
*   `.custom-scrollbar`: Scrollbar overriding standard browser behavior with custom-tinted thumbs.

---

## 🧠 State Management & Websocket Listeners

VWatch depends on three global **Zustand stores** (`src/store/`) exposed through unified hooks (`src/hooks/`).

### 1. `useAuthStore` (`useAuth`)
Manages sessions, tokens, and current user profile metadata.
*   **State properties**: `user`, `isLoading`.
*   **Actions**: `login(payload)`, `register(payload)`, `logout()`, `checkAuth()`.

### 2. `useThemeStore`
Manages global theme state.
*   **State properties**: `theme` (`'light' | 'dark'`).
*   **Actions**: `toggleTheme()`.

### 3. `useRoomStore` (`useRoom`, `usePlayer`, `useParticipants`, `useChat`)
Connects, disconnects, and coordinates WebSockets via `socket.service.ts`.
*   **State properties**:
    *   `room`: Active Room metadata (ID, name, host ID).
    *   `participants`: Sorted lists of users in the room.
    *   `selfId`: Active client's User ID.
    *   `messages`: Array of ChatMessages (User chats + System updates).
    *   `playerState`: Live YouTube player telemetry (`videoId`, `state` ('playing'/'paused'/'unstarted'), `currentTime`, `timestamp`, `updatedBy`).
    *   `reactions`: Live emojis active on-screen.
*   **Incoming Socket Event Listeners (Incoming updates)**:
    *   `sync_state`: Recovers and overrides current playback coordinate/video ID from the server.
    *   `user_joined`: Fired when a new user enters, appending participants or syncing state.
    *   `user_left`: Triggers participant removal. If the host leaves, the store dispatches room closure.
    *   `role_assigned` / `participants_updated` / `participant_removed`: Modifies participant arrays and permissions.
    *   `chat_message`: Appends user or system chats.
    *   `reaction`: Dispatches floating screen reactions.
    *   `kicked`: Forces local client to immediately leave the room.
*   **Outgoing Socket Event Emitters (Triggered via hooks)**:
    *   `join_room`: Joins room WS channel.
    *   `leave_room`: Leaves room WS channel.
    *   `reaction`: Emits emoji interaction.
    *   `assign_role`: Updates user roles (Host only).
    *   `remove_participant`: Kicks user from lobby (Host only).
    *   `transfer_host`: Relinquishes lobby ownership to another peer (Host only).

---

## 📄 Page-by-Page Feature & UI Elements Specification

### 1. Landing Page (`LandingPage.tsx`)
A cinematic welcome screen introducing the application.
*   **Interactive Components**:
    *   Header (`Navbar.tsx`) with login/register links and a theme toggle button.
    *   CTA actions: Redirects to `/dashboard` if logged in, otherwise `/register` or `/login`. Also a link to `/showcase`.
    *   Decorative Interstellar mockup card showing fake live latency telemetry.
    *   Feature bento grid detailing platform capabilities (Zero-drift, role panels, custom filters).
    *   Pricing callout.
    *   Footer (`Footer.tsx`).

### 2. Login (`LoginPage.tsx`) & Register (`RegisterPage.tsx`)
*   **Interactive Components**:
    *   Forms utilizing shared `Input.tsx` (validated via fields like `username`, `emailAddress`, `password`).
    *   Authentication is handled asynchronously. Errors are displayed under inputs using custom bindings.
    *   A custom `LoadingSpinner` inside `Button` indicates login/signup status.

### 3. Dashboard (`DashboardPage.tsx`)
User portal displaying active room management metrics.
*   **Interactive Components**:
    *   **Bento Stats Grid**: Displays current Active Rooms count, Avg Sync Latency (14 ms static text), and Watch Time (28.5 hrs static text).
    *   **Lobby Modals**:
        *   `CreateRoomModal`: Prompts for `roomName`, `videoId` (YouTube URL), and `isPrivate` status.
        *   `JoinRoomModal`: Prompts for a `roomId` to join existing rooms.
    *   **Search Box**: Inputs search criteria to dynamically filter the user's room list by name or ID.
    *   **Lobby List Grid**: Renders individual `RoomCard.tsx` items.
    *   **`RoomCard` Actions**: Renders details (ID, participants count, active video). Provides a button to join the room, and hosts can delete/destroy the room with `onDelete`.

### 4. Explore Page (`ExplorePage.tsx`)
Displays public lobbies created across the platform.
*   **Interactive Components**:
    *   Real-time search bar that filters public rooms by room ID, name, or host handle.
    *   Room cards indicating public status, peer counts, host ID, and direct join buttons.

### 5. Premium Upgrade Page (`PremiumPage.tsx`)
Upgrade screen displaying product tiers.
*   **Interactive Components**:
    *   Three columns outlining features (Free, Cinema Master Pro, Event Streamer Enterprise).
    *   Call-to-action buttons redirection to register.

### 6. User Account Details Page (`AccountPage.tsx`)
*   **Interactive Components**:
    *   Displays current user metadata (`username`, `emailAddress`, `id`).
    *   Contains a 'Verified Host' badge and a direct 'Sign Out' action button.

### 7. Showcase / Proof of Work Page (`ShowcasePage.tsx`)
*   **Interactive Components**:
    *   Introduces design architecture credentials (SOLID principles, RBAC setup, dark/light theme).
    *   Launch interactive demo buttons redirecting to the main dashboard.

---

## 📺 Synchronized Watch Party Room Page (`RoomPage.tsx`)

This is the core collaborative view. It is structured into multiple key UI components:

```text
+--------------------------------------------------------------+
|                       Room Toolbar                           |
|  [Room Name] [Room ID] [User Role Badge] ... [Copy] [Leave]  |
+------------------------------------+-------------------------+
|                                    |                         |
|                                    |    Participant List     |
|                                    |    [List of users &     |
|          Video Sync Area           |     Host actions menu]  |
|                                    |                         |
|   [ Floating Reactions Overlay ]   |-------------------------|
|   [     react-youtube Player   ]   |                         |
|                                    |                         |
|   [ Playback Control Elements  ]   |       Live Chat         |
|   [ Emoji Action Bar           ]   |   [Message Feed Container]
|                                    |   [Message input / Send]|
|                                    |                         |
|                                    |                         |
+------------------------------------+-------------------------+
|                Sync Status Telemetry Footer Bar              |
+--------------------------------------------------------------+
```

### 1. Room Toolbar
*   Displays the Room title, room ID, user's current `RoleBadge` (`HOST` | `MODERATOR` | `PARTICIPANT` | `VIEWER`).
*   **Copy Link Button**: Copies the URL to clipboard with a success toast notification.
*   **Change Video Button**: Visible to Hosts and Moderators. Opens `ChangeVideoModal.tsx`.
*   **Roles Button**: Visible to Hosts. Opens `RoleManagementModal.tsx`.
*   **Leave Button**: Disconnects the user and redirects them back to `/dashboard`.

### 2. Video Sync Area & Controls (`VideoPlayer.tsx`)
This component embeds the `react-youtube` library and syncs state via WebSockets:
*   **YouTube Player Container**: 
    *   **Playback Blocker Overlay**: When `!canControl` (user is a Viewer or Participant without host permissions), an invisible `<div className="absolute inset-0 z-30 bg-transparent cursor-not-allowed">` blocks clicks on the YouTube player frame. This prevents viewers from manually scrubbing or pausing the video out of sync.
*   **Control Panel**:
    *   Renders local controls (Play/Pause, -10s, +10s, Mute/Unmute buttons). These are enabled/disabled based on the `canControl` flag (Host/Mod permissions).
*   **Floating Emojis Overlay (`FloatingReactions.tsx`)**:
    *   Displays floating emojis rising up the screen when users send a reaction. Managed by appending emoji items to the `reactions` state array.
*   **Emoji Action Bar**:
    *   A row of emojis (🔥, ❤️, 👏, 🎉, 😮, 🚀). Clicking an emoji dispatches the reaction to the room using `sendEmojiReaction()`.
*   **YouTube Search Sidebar**:
    *   A right-hand drawer inside the player card.
    *   Includes tabs (Home, Trending, Subscriptions, Library) and a search input.
    *   Fetches videos from YouTube API using the query. Clicking a search result changes the room's current active video using `changeVideo(videoId)`.

### 3. Participant List (`ParticipantList.tsx`)
*   Renders active users sorted by authority: `HOST` > `MODERATOR` > `PARTICIPANT` > `VIEWER`.
*   Displays a placeholder avatar (first letter of username) and role badge.
*   **Host Actions Menu**: If the current user is `HOST` and the peer is not themselves, clicking the `more_vert` menu icon opens action buttons:
    *   `Make Moderator` (calls `assignRole(userId, Role.MODERATOR)`)
    *   `Make Participant` (calls `assignRole(userId, Role.PARTICIPANT)`)
    *   `Make Viewer` (calls `assignRole(userId, Role.VIEWER)`)

### 4. Live Chat Panel (`ChatPanel.tsx`)
*   Displays chat messages scrollable container.
*   Groups messages into:
    *   **User messages**: Displayed on the right for local client messages, and on the left for other users. Shows username, message bubble, and formatted timestamp.
    *   **System messages**: Styled as centered text alerts (e.g., "User joined the room").
*   Includes message input box and a send button (triggers on submit).

### 5. Telemetry Footer (`SyncTelemetry.tsx`)
*   Displays connection status, active peers, room details, and playback health.
*   **Playback Logs button**: Opens `PlaybackLogsModal.tsx`, listing recent sync actions, timestamps, and who triggered them.
