# VWatch API & WebSocket Contract

This document outlines the required Backend API for the VWatch frontend.

## REST Endpoints (Base: `/api`)

### Auth
- `POST /auth/login`
  - Body: `{ email, password }`
  - Response: `{ user: User, token: string }`
- `POST /auth/register`
  - Body: `{ username, email, password }`
  - Response: `{ user: User, token: string }`
- `GET /auth/me`
  - Headers: `Authorization: Bearer <token>`
  - Response: `User`

### Rooms
- `POST /rooms`
  - Body: `{ name, isPrivate, initialVideoUrl }`
  - Response: `Room`
- `GET /rooms/my-rooms`
  - Response: `Room[]`
- `GET /rooms/:id`
  - Response: `Room`
- `POST /rooms/:id/join`
  - Body: `{ password? }`
  - Response: `Room`

### Participants
- `GET /rooms/:id/participants`
  - Response: `Participant[]`

---

## WebSocket Events (Namespace: `/room`)

### Client Emits (Sent to Server)
- `join_room`: `{ roomId }`
- `leave_room`: `{ roomId }`
- `play`: `{ currentTime: number, videoId?: string, state: 'playing' }`
- `pause`: `{ currentTime: number, state: 'paused' }`
- `seek`: `{ currentTime: number }`
- `change_video`: `{ videoId: string, state: 'unstarted', currentTime: 0 }`
- `chat_message`: `{ roomId: string, message: ChatMessage }`
- `assign_role`: `{ userId: string, role: Role }`
- `remove_participant`: `{ userId: string }`
- `transfer_host`: `{ userId: string }`

### Server Emits (Received by Client)
- `sync_state`: `{ state: string, currentTime: number, videoId: string, timestamp: number, updatedBy: string }`
- `user_joined`: `Participant`
- `user_left`: `{ userId: string }`
- `chat_message`: `ChatMessage`
- `role_assigned`: `{ userId: string, role: Role }`
- `participant_removed`: `{ userId: string }`

## Data Models

Refer to the frontend `src/types/` directory for exact property types.
