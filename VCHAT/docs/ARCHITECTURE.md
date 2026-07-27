# System Architecture

## Frontend Stack
- React 18
- Vite
- TypeScript
- Tailwind CSS v4
- React Router v7
- Framer Motion

## Architectural Layers

1. **View Layer (Pages & Components)**
   - Responsible strictly for rendering and dispatching actions.
   - Depends on Contexts and Hooks, never directly on Services.

2. **State Management (Context & Hooks)**
   - `AuthContext`: Manages user session.
   - `RoomContext`: Manages active room state, WebSocket listeners, and player state.
   - Custom Hooks (`usePlayer`, `useParticipants`, `useChat`) expose granular actions to components.

3. **Service Abstraction (Services)**
   - `api.client.ts`: Base fetch wrapper handling auth headers and errors.
   - `auth.service.ts`: REST endpoints for login/register.
   - `room.service.ts`: REST endpoints for room CRUD.
   - `socket.service.ts`: WebSocket wrapper (Socket.io-client) for real-time events.
   - *Note: Services currently contain mock implementations. They act as boundaries. When backend is ready, only these service files change.*

4. **Types**
   - Centralized interfaces for User, Room, Participant, Chat, and Player to ensure strict payload checking across all layers.
