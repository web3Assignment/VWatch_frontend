# VWatch Project Rules

## Development Guidelines
- **SOLID Principles**: All new features must adhere to SOLID principles.
  - S: Separate concerns (e.g., hooks for state, services for API).
  - O: Components should be open for extension but closed for modification.
  - L: Type definitions should be robust.
  - I: Don't force components to depend on props they don't use.
  - D: Depend on abstractions (e.g., `RoomContext` instead of direct `socket.io` calls).
- **Code Style**:
  - Humanoid code (simple, readable, standard React patterns).
  - No AI-style redundant comments or over-engineering.
  - Strict TypeScript typings for all payloads and state.

## Design System
- **Theme**: We use a dual dark/light theme approach, defaulting to dark mode based on the Stitch SyncRoom design.
- **Tokens**: Stick to the CSS variables defined in `src/index.css`.
- **Animations**: Use `framer-motion` for all micro-interactions (modals, toasts, page transitions).
