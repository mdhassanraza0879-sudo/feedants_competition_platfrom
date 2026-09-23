# Feedants Competition Platform — Full Stack Technical Assignment

A production-ready, full-stack implementation of the **Feedants Competition Details Module**, engineered to pixel-accurate fidelity with the design reference and backed by a robust Node.js/Express + TypeScript REST API and MongoDB data models.

---

## 📸 Overview & Design Matching

This application replicates the Feedants Competition Details screen (`Feedants Classical Dance`), complete with live countdown timers, concurrency-safe atomic registration (preventing overbooking beyond 20/20), dynamic state calculation based on real timestamps, submission workflows, bilingual localization (English / हिंदी), and an interactive Evaluator User-Switcher for testing registered and unregistered user journeys with zero friction.

### Key Highlights
- **100% Dynamic Data**: No hardcoded stats, dates, prizes, spots, or judges. All content is delivered from the MongoDB database via REST APIs.
- **Race Condition & Overbooking Prevention**: Employs atomic conditional updates (`findOneAndUpdate` with `$lt: maxParticipants`) and compound unique indexes (`userId + competitionId`) to strictly prevent overbooking (e.g., preventing state from ever becoming `21/20`).
- **Dynamic Lifecycle States**: Real-time status transitions across `UPCOMING`, `REGISTRATION_OPEN`, `REGISTRATION_FULL`, `REGISTRATION_CLOSED`, `LIVE`, and `COMPLETED`.
- **Live Dynamic Countdown**: Computes exact days, hours, minutes, and seconds from the target deadline (`01d : 06h : 28m : 32s`), updating every second.
- **Zero-Config Database Fallback**: Comes with `mongodb-memory-server` support out-of-the-box. If a local MongoDB instance is not running, it automatically boots an in-memory MongoDB instance with pre-seeded data, eliminating database setup roadblocks for reviewers.
- **Dual Platform Support**: Runs on Expo Mobile (iOS/Android) as well as Expo Web (`npm run web`).

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React Native, Expo SDK 51, TypeScript, React Native Web, Expo Vector Icons |
| **Backend** | Node.js (v20+), Express.js, TypeScript, ts-node-dev |
| **Database** | MongoDB, Mongoose ODM, mongodb-memory-server (zero-config dev runner) |
| **Architecture** | Monorepo structure, Layered Architecture (Controllers, Services, Models, Routes, Middlewares) |
| **Data Validation** | Mongoose Schema Validators, Custom ObjectId & Business Logic Middleware |

---

## 📁 Project Structure

```
feedants-competition-platform/
│
├── backend/
│   ├── src/
│   │   ├── config/             # Environment variables and MongoDB connection
│   │   ├── controllers/        # Express request/response handlers
│   │   ├── middleware/         # Centralized error handler & ObjectId validator
│   │   ├── models/             # Mongoose schemas: User, Competition, Registration, Winner, etc.
│   │   ├── routes/             # REST API routes (/api/competitions, /api/users, /api/seed)
│   │   ├── seeds/              # Database seeder with assignment data (Feedants Classical Dance)
│   │   ├── services/           # Concurrency-safe registration, submissions & status logic
│   │   ├── utils/              # Dynamic status calculator & standardized API responses
│   │   └── server.ts           # Express server entry point & auto-seeder
│   ├── test-concurrency.ts     # Automated test suite simulating 25 concurrent registration requests
│   ├── .env.example            # Environment template
│   ├── package.json
│   └── tsconfig.json
│
├── mobile/
│   ├── src/
│   │   ├── components/         # Reusable UI components matching reference design
│   │   │   ├── Header.tsx               # Top back button + ENG/हिंदी language toggle
│   │   │   ├── CompetitionHeader.tsx    # Title, tags (Dance, Multi-Win), "Registered" badge
│   │   │   ├── CompetitionStats.tsx     # Prize Pool ₹1,500, Fee ₹99, Spots left progress bar
│   │   │   ├── JudgeCard.tsx            # Hassan Raza avatar, role, experience, Intro video
│   │   │   ├── CountdownTimer.tsx       # Live dynamic countdown: 01d : 06h : 28m : 32s
│   │   │   ├── ImportantDates.tsx       # 2x2 grid (Register Before, Submission Starts/Ends, Result)
│   │   │   ├── WinnersSection.tsx       # Previous winners horizontal video carousel
│   │   │   ├── CompetitionTabs.tsx      # Tabbed About (expandable), Judging Parameters & Rules
│   │   │   ├── RewardsSection.tsx       # 1st-6th breakdown (₹550 to ₹80) & paid disclaimer
│   │   │   ├── TrustAndInfoCards.tsx    # Prize explanation, Refund policy, Razorpay badge
│   │   │   ├── ReferralCard.tsx         # Refer & Earn discount, copy link, Refer Now ₹10
│   │   │   ├── ReviewsSection.tsx       # "Hear From Our Users" with testimonials modal
│   │   │   ├── BottomActionBar.tsx      # Dynamic sticky action button
│   │   │   ├── BottomNav.tsx            # Home, Explore, (+), Competitions, Profile
│   │   │   ├── SubmissionModal.tsx      # Dance entry upload modal with validations
│   │   │   └── UserSwitcherModal.tsx    # Evaluator switcher between registered & new user
│   │   ├── constants/          # Brand colors (#007A78 teal palette), translations (ENG/हिंदी)
│   │   ├── hooks/              # useCountdown for live countdown timer
│   │   ├── screens/            # CompetitionDetailsScreen (full module)
│   │   ├── services/           # api.ts (Axios API client with network handling)
│   │   └── types/              # TypeScript interfaces for models & API responses
│   ├── App.tsx                 # Root React Native application entry
│   ├── app.json
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore                  # Git ignore rules
└── README.md                   # Full documentation
```

---

## ⚡ Prerequisites

- **Node.js**: `v18.x` or higher (tested on `v26.x` and `v20.x`)
- **npm**: `v9.x` or higher
- **MongoDB**: Optional! If you have local MongoDB or MongoDB Atlas, set `MONGODB_URI` in `backend/.env`. If you do not have MongoDB installed, the backend automatically uses the built-in `mongodb-memory-server` without any configuration required.

---

## 🚀 Quick Start & Installation

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd feedants-competition-platform
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create/check `backend/.env`:
```env
PORT=5000
NODE_ENV=development
# Use "memory" for automatic zero-config in-memory MongoDB, or your MongoDB connection string
MONGODB_URI=memory
CLIENT_ORIGIN=*
```

Start the backend server:
```bash
npm run dev
```

> **Auto-Seeding**: Upon first startup, the server automatically detects an empty database and seeds the full competition data (*Feedants Classical Dance*, judge *Manju Dubey*, previous winners, rewards breakdown, and sample users).

Verify backend health at: [http://localhost:5000/health](http://localhost:5000/health)

---

### 3. Mobile / Web App Setup
Open a new terminal window:
```bash
cd mobile
npm install
```

#### Run in Web Browser (Recommended for quick testing):
```bash
npm run web
```
This starts the Metro bundler and opens the application in your browser (typically `http://localhost:8081`).

#### Run on Physical Device or Emulator:
```bash
npx expo start
```
Scan the QR code using the **Expo Go** app on Android or iOS.

---

## 🧪 Concurrency & Race Condition Verification

The technical assignment specifically mandates that overbooking (such as `21 / 20`) must never occur under heavy concurrent load.

To verify this, run our dedicated automated concurrency test:
```bash
cd backend
npm run test:concurrency
```

### What This Test Does:
1. Seeds the database with 1 initial registration (leaving 18 spots available).
2. Spawns **25 concurrent registration requests** simultaneously using `Promise.all`.
3. Verifies that exactly 18 succeed and 7 are rejected with `409 Conflict: Registration is full`.
4. Confirms that `registeredParticipants` in MongoDB never exceeds `20/20`.
5. Verifies duplicate registration prevention and unauthorized submission rejection.

---

## 🛡️ Concurrency & Registration Architecture

### The Problem
If multiple requests read `registeredParticipants = 19` concurrently, multiple requests could attempt to register, causing the count to increment to `21` or `22` (overbooking).

### The Solution
We implemented a multi-layered atomic reservation mechanism in `backend/src/services/registrationService.ts`:

1. **Unique Compound Index**:
   ```typescript
   RegistrationSchema.index({ userId: 1, competitionId: 1 }, { unique: true });
   ```
   Guarantees at the database engine level that the same user cannot register twice.

2. **Atomic Conditional Update**:
   ```typescript
   const updatedCompetition = await Competition.findOneAndUpdate(
     {
       _id: competitionId,
       registeredParticipants: { $lt: competition.maxParticipants }, // Strict atomic check
       registrationDeadline: { $gt: new Date() }                    // Deadline validation
     },
     {
       $inc: { registeredParticipants: 1 }                          // Atomic increment
     },
     { new: true }
   );
   ```
   Because MongoDB document writes are atomic, only requests that execute while `registeredParticipants < 20` will succeed. Once 20 is reached, all subsequent operations return `null`.

3. **Automatic Rollback**:
   If the subsequent `Registration` document creation fails, an atomic rollback (`$inc: -1`) is executed to ensure data consistency.

---

## 📡 REST API Endpoints

### 1. Competitions
- **`GET /api/competitions`**
  - Returns list of all competitions with dynamic status and spots left.
- **`GET /api/competitions/:id`**
  - Returns competition details, judge information, dates, rules, judging parameters, and current user registration/submission state (pass `?userId=<id>`).
- **`GET /api/competitions/:id/winners`**
  - Returns previous winners carousel data.
- **`GET /api/competitions/:id/rewards`**
  - Returns reward breakdown for all positions (1st through 6th).
- **`GET /api/competitions/:id/reviews`**
  - Returns participant reviews and ratings.

### 2. Registration
- **`POST /api/competitions/:id/register`**
  - Concurrency-safe registration.
  - Body: `{ "userId": "...", "paymentMethod": "RAZORPAY_DEMO" }`
  - Returns: Updated spots, confirmation details, transaction ID.
- **`GET /api/competitions/:id/registration?userId=...`**
  - Checks if a specific user is registered.

### 3. Submissions
- **`POST /api/competitions/:id/submissions`**
  - Submits a performance video.
  - Validates: user is registered, submission window is active, required fields provided.
  - Body: `{ "userId": "...", "title": "...", "videoUrl": "...", "description": "..." }`
- **`GET /api/competitions/:id/submissions?userId=...`**
  - Retrieves existing submission for the user.

### 4. Utilities
- **`GET /api/users`**
  - Returns demo users (`Priya Patel` and `Rahul Sharma`) for testing.
- **`POST /api/seed`**
  - Resets and re-seeds database on demand.
- **`GET /health`**
  - Server health check.

---

## 🎨 UI Sections Matching Reference Screenshot

| # | Screen Section | Implementation |
|---|---|---|
| 1 | **Header & Language** | "Go back" navigation + functional ENG / हिंदी toggle pills |
| 2 | **Competition Header** | Title, "Dance" & "Multi-Win" pill tags, "Winners get certificate" badge, "Registered" pill with checkmark |
| 3 | **Stats & Spots** | Prize Pool (₹ 1,500 in bold teal), Entry Fee (₹ 99), "Only 19 spots left", progress bar with "1 / 20 Booked" |
| 4 | **Judge Card** | Judge photo (Manju Dubey), role, experience, circular "Intro Video" play button |
| 5 | **Countdown Banner** | Hourglass icon, "Registration closes in", real ticking timer `01d : 06h : 28m : 32s`, "Hurry up!" |
| 6 | **Important Dates** | 2x2 bordered grid: Register Before, Submission Starts, Submission Ends, Result Date |
| 7 | **Previous Winners** | Horizontal scroll of winner cards with dance thumbnails and play overlay |
| 8 | **Interactive Tabs** | "About Competition" (expandable), "Judging Parameters" (with % weightages), "Rules & Eligibility" |
| 9 | **Rewards Breakdown** | 1st to 6th position breakdown (₹550, ₹300, ₹240, ₹200, ₹130, ₹80) + official paid disclaimer |
| 10 | **Trust Cards** | "How will you receive prize money?", "Refund policy", "Secure payments powered by Razorpay" |
| 11 | **Referral Card** | Megaphone icon, "Refer & Earn more discount", copy link button with clipboard feedback, "You earn ₹10" |
| 12 | **Reviews Section** | "Hear From Our Users" expandable modal with ratings and testimonials + "Ad Here" banner |
| 13 | **Sticky Action Bar** | Contextual button: "Upload Submission / Registered" or "Register Now - ₹99" |
| 14 | **Bottom Navigation** | Home, Explore, (+) Create, Competitions (active teal), Profile |

---

## 💡 Important Technical Decisions

1. **In-Memory Database with Dual Support**:
   Recognizing that evaluators may run on diverse environments without a local MongoDB service, we engineered an automatic fallback to `mongodb-memory-server` alongside standard `MONGODB_URI` connection strings.
2. **Server-Driven Dynamic State**:
   Competition lifecycle status (`UPCOMING`, `REGISTRATION_OPEN`, `REGISTRATION_FULL`, `REGISTRATION_CLOSED`, `LIVE`, `COMPLETED`) is calculated on the server using active timestamps, avoiding client-side clock drift.
3. **Compound Indexing for Registrations**:
   The unique index `{ userId: 1, competitionId: 1 }` ensures that even in distributed multi-instance deployments, double-booking the same user is physically impossible at the database engine level.
4. **Interactive Evaluator Switcher**:
   Added an on-screen switcher to let reviewers toggle between **Priya Patel** (pre-registered user) and **Rahul Sharma** (unregistered user) with one tap to inspect both UI states without manual database manipulation.

---

## ⚖️ Trade-offs & Assumptions

- **Video Storage**: For demonstration purposes, video submissions accept video streaming URLs (YouTube/Vimeo/Drive). In full production, this would integrate with AWS S3 / Cloudflare R2 via presigned upload URLs.
- **Payment Processing**: The flow simulates Razorpay payments. Production integration would include Razorpay Webhook verification (`razorpay_signature` validation) before confirming registration.
- **Authentication**: Demo user switching was implemented instead of a full JWT login barrier so evaluators can immediately experience the core competition screen without tedious signup steps.

---

## 🔮 Future Production Enhancements

- **Push Notifications**: Expo Push Notifications for countdown alerts ("1 hour left to submit").
- **Direct Video Upload**: Direct S3 multipart upload with HLS transcoding for seamless video playback.
- **Leaderboard & Live Judging**: Interactive judge scoring interface with real-time tallying of judging parameter weightages.

---

## 📦 GitHub Submission Commands

To commit and push this repository to GitHub:

```bash
git init
git add .
git commit -m "feat: complete Feedants competition details full-stack assignment"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```
