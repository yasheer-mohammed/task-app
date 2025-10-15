# TaskBoard — Full-stack Todo App (React + Tailwind + Node + MySQL)

This repository contains a ready-to-run full-stack task management app with:
- Authentication (JWT + bcrypt)
- Add/Edit/Delete tasks
- Mark complete / pending
- Filter (All / Completed / Pending)
- Pagination + Search
- Responsive UI with Tailwind

## Quickstart

1. Setup MySQL and run `backend/migrations.sql` to create the database.
2. Copy `backend/.env.example` to `backend/.env` and fill values.
3. Start backend:
   ```
   cd backend
   npm install
   npm run dev
   ```
4. Start frontend:
   ```
   cd frontend
   npm install
   # create .env from .env.example if needed
   npm run dev
   ```
5. Open the Vite URL (usually http://localhost:5173) and register/login.
