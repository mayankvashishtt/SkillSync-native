# SkillSync: The Ultimate Interview Guide & Technical Deep-Dive

This guide explains the architecture, concepts, and components used in the **SkillSync** project. It is designed to help you explain the "How" and "Why" behind every technical decision during an interview.

---

## 🏗️ 1. Project Architecture (High Level)
SkillSync follows a **Clean Architecture** pattern across the stack:
- **Mobile (Frontend)**: React Native (Expo) + TypeScript + Zustand (State) + Axios (API).
- **Server (Backend)**: Node.js + Express + MongoDB + Groq AI (Llama 3).
- **Tunneling**: Ngrok for public exposure (cross-network testing).

---

## 📱 2. React Native & Mobile Concepts

### A. Functional Components & Hooks
We use **Functional Components (FC)** exclusively. Why? They are more readable, allow better reuse of logic via custom hooks, and are the standard in modern React.

**Key Hooks Used:**
1.  **`useState`**: Used for local UI state (e.g., input fields in `login.tsx`).
2.  **`useEffect`**: Used for side effects like fetching data when a screen mounts (`index.tsx`).
3.  **`useAuthStore` / `useHabitStore`**: Custom hooks from **Zustand** to access global state.
4.  **`useRouter` (Expo Router)**: Replaces traditional `navigation.navigate` with a more web-like declarative API.

### B. Navigation (Expo Router)
We use **File-based Routing**. This is a premium feature of Expo:
- **`app/_layout.tsx`**: The Root Provider. It wraps the app in a `QueryClientProvider` and handles the **Auth Guard** (redirecting to Login if no token exists).
- **`(auth)` group**: Contains Login and Register. Using parentheses `()` hides the folder from the URL path.
- **`(tabs)` group**: Implements the Bottom Tab Bar using **Lucide Icons**.

### C. Styling & Design System
We don't use ad-hoc styles. We built a **Theme Engine** (`app/src/theme/theme.ts`):
- **Flexbox**: React Native uses Flexbox by default (flex-direction is `column` by default).
- **Design Tokens**: Centralized colors (Indigo, Slate), spacing, and typography. This ensures UI consistency across 100+ screens.
- **Premium UI**: Used `MotiView` from the **Moti** library for declarative animations (entering, exiting, scaling).

---

## 🧠 3. State Management (Zustand)
**Why not Redux?**
- Redux is heavy with boilerplate (Actions, Reducers, Sagas).
- **Zustand** is simpler, faster, and gives us custom hooks directly out of the box.

**Persistence:**
Inside `useAuthStore.ts`, we use `persist` middleware with `AsyncStorage`. This ensures that when a user closes the app, their login session stays active.

---

## 🌐 4. Backend & API Strategy

### A. Express + MongoDB
- **JWT Authentication**: We use `bcryptjs` for hashing passwords and `jsonwebtoken` for generating secure session tokens.
- **Middleware**: I wrote a `protect` middleware that intercepts requests, verifies the JWT, and attaches the `user` object to the `req`. If the token is invalid, it returns `401 Unauthorized`.

### B. AI Integration (Groq)
We utilized the **Groq SDK** to run **Llama 3**.
- **The Prompt**: We send the user's current habits and goals to the AI.
- **The Result**: Returns 3 personalized, motivating tips. This adds "Value-Add" logic to the app instead of just being a simple database tracker.

---

## ⚓ 5. Interview "War Stories" (Challenges Fixed)
In an interview, you'll be asked: *"What was a technical challenge you faced?"*

### Challenge 1: The macOS Port 5000 / 403 Forbidden Conflict
**Problem**: The backend was returning `403 Forbidden` on macOS even though CORS was correct.
**Solution**: Discovered that macOS **AirPlay Receiver** uses Port 5000. I migrated the backend to **Port 5001** and updated the Ngrok tunnel, which immediately resolved the conflict.

### Challenge 2: ESM/tslib Destructuring Error in Expo Web
**Problem**: In the browser, the app crashed with `Cannot destructure property '__extends' of 'tslib.default'`.
**Solution**: This is a bundling conflict between ESM and CommonJS. I fixed it by:
1.  Adding a **Babel alias** specifically for `tslib`.
2.  Configuring `metro.config.js` to resolve `.mjs` extensions.
3.  Injecting the `@babel/plugin-transform-modules-commonjs` plugin.

---

## 📝 6. Key Components Breakdown

### `login.tsx` / `register.tsx`
- **Concept**: Controlled Components.
- **Logic**: Uses Axios Interceptors to handle auth headers.
- **UI**: Uses `MotiView` for the slide-up entrance animation.

### `Dashboard (index.tsx)`
- **Concept**: Data Fetching + Global State.
- **Logic**: Uses `fetchHabits` from the store.
- **Components**: `FlatList` for performance (prevents rendering off-screen items).

### `api.ts (Service Layer)`
- **Concept**: Centralized Networking.
- **Logic**: Base URL configuration + Response Interceptors for loud logging in development.

---

## ✅ 7. Interview Summary (The "Elevator Pitch")
"SkillSync is a full-stack mobile application that uses **React Native** for cross-platform efficiency and **Node.js** for a scalable backend. I implemented global state management using **Zustand**, secure **JWT-based auth**, and integrated a **Groq AI engine** to provide personalized coaching. I also handled complex deployment issues like network tunneling and port conflicts to ensure high reliability during testing."
