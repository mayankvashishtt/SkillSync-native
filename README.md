# SkillSync: AI-Powered Habit & Skill-Building Mobile App

SkillSync is a premium mobile application built with React Native (Expo) and Node.js (Express) to help users build consistent habits and track their skill progress with AI insights.

## Features
- **Authentication**: Secure JWT-based registration and login.
- **Habit Tracking**: Create, manage, and check-in to daily/weekly habits with streak tracking.
- **Skill Library**: Track progress on multiple skills with visual progress bars.
- **AI Coach**: Personalized habit insights powered by Groq (LLama 3).
- **Premium UI**: Dark-themed, modern interface with smooth animations (Moti).

## Tech Stack
- **Frontend**: React Native, Expo, Zustand, React Query, Axios, Lucide Icons, Moti.
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT.
- **AI**: Groq API (OpenAI Compatible SDK).

## Getting Started

### Prerequisites
- Node.js & npm
- Expo Go app on your phone (for mobile testing)
- MongoDB Connection String

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GROQ_API_KEY=your_groq_key
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the app directory:
   ```bash
   cd app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update `app/src/services/api.ts` with your machine's local IP address if testing on a physical device.
4. Start the Expo app:
   ```bash
   npx expo start
   ```

## Author
Mayank Vashisht
