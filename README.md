# Hospital Queue Management System (CareQueue HQMS)

A full-stack, real-time Hospital Queue Management System built with the **MERN** stack + **Next.js (App Router)** in pure JavaScript.

---

## 🌟 Key Features

1. **Role-Based Workflows:**
   - **Patient:** Book queue tokens (Walk-in, Elderly, Emergency), track live estimated wait times & room calls in real time.
   - **Doctor:** View active department queue, call next waiting patient, complete consultations, toggle duty status.
   - **Receptionist:** Walk-in check-in counter, issue priority tokens, manage active queues.
   - **Admin:** System analytics (total daily volume, completed consultations, avg wait time), add/manage hospital departments.

2. **Real-time Synchronization:**
   - **Socket.io** WebSocket integration for instant updates when tokens are generated, called, or completed across all client views.

3. **Concurrency-Safe Token Generation:**
   - Atomic sequence increment (`$inc`) and MongoDB session transactions ensure strictly ascending, unique daily token codes (e.g., `CARD-001`, `CARD-002`) without race conditions.

4. **Priority Queue Sorting:**
   - Automatic priority scoring (`EMERGENCY` > `ELDERLY` > `APPOINTMENT` > `WALK_IN`) ensuring urgent cases are served first.

5. **Async Notification Queue:**
   - **BullMQ + Redis** background job queue stub for sending SMS/Email notifications when tokens are near.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18+ 
- **MongoDB**: Local MongoDB instance running on `mongodb://localhost:27017` or MongoDB Atlas URI.
- **Redis** *(Optional for notification worker)*: Running on `localhost:6379`.

### 1. Installation
Run from root directory:
```bash
# Install root and workspace dependencies
npm install
```

### 2. Configure Environment Variables
Create `.env` files in both `server/` and `frontend/`:

**`server/.env`**:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/hqms
JWT_SECRET=super_secret_jwt_key_hqms_2026
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
CORS_ORIGIN=http://localhost:3000
```

**`frontend/.env.local`**:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

### 3. Run Development Servers
```bash
# Start backend Express server (Port 5000)
npm run dev:server

# Start frontend Next.js server (Port 3000)
npm run dev:frontend
```

---

## 📁 Repository Structure

```
hospital/
├── shared/               # Shared Zod schemas & constants
│   └── src/
│       ├── constants.js  # UserRole, TokenType, TokenStatus, DoctorStatus
│       ├── schemas.js    # Register, Login, Token, Department Zod schemas
│       └── index.js
├── server/               # Node.js + Express.js API & Socket Server
│   └── src/
│       ├── config/       # Env & Mongoose DB connection
│       ├── controllers/  # Auth, Dept, Doctor, Token, Queue, Analytics
│       ├── middleware/   # JWT Auth, Roles Guard, ErrorHandler
│       ├── models/       # User, Department, Doctor, Queue, Token, Appointment, Notification
│       ├── routes/       # Express REST Endpoints
│       ├── services/     # TokenGenService & QueueService
│       ├── sockets/      # Socket.io connection handlers & rooms
│       ├── workers/      # BullMQ Notification worker
│       └── app.js        # Main server entry
└── frontend/             # Next.js 14+ (App Router) Client
    └── src/
        ├── app/
        │   ├── (auth)/   # Login & Register routes
        │   ├── patient/  # Patient dashboard & token generator
        │   ├── doctor/   # Doctor call next patient portal
        │   ├── receptionist/ # Walk-in desk check-in
        │   ├── admin/    # Analytics & department management
        │   ├── layout.jsx
        │   └── page.jsx  # Live queue monitor landing page
        ├── components/   # Navbar, TokenCard, LiveQueueTable
        ├── hooks/        # useSocket real-time listener hook
        ├── lib/          # Axios API & Socket.io client
        └── store/        # Zustand useAuthStore & useQueueStore
```

---

## 🔒 Non-Functional Requirements Addressed
- **Race Condition Safety**: Uses Mongo `$inc` and unique compound index `{ departmentId: 1, date: 1, doctorId: 1 }`.
- **WebSocket Scaling**: Prepared for Socket.io Redis adapter.
- **Security**: Rate limiting, Helmet security headers, input sanitization, JWT authorization guards.
