# 🎓 Twygo Courses - Training Platform

This is a course platform project focused on backend (Node.js + Express + Prisma) and frontend (Vite + React + Chakra UI) integration, using PostgreSQL as the database and Docker for orchestration.

---

## 🚀 Technologies Used

### 🔧 Backend
- Node.js 20 (Alpine)
- Express.js
- Prisma ORM
- PostgreSQL
- TypeScript

### 💻 Frontend
- React + Vite
- TypeScript
- Chakra UI
- Axios
- React Router DOM

### 🐳 DevOps
- Docker
- Docker Compose
- Nginx (to serve the frontend)

---

## 📦 Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## ▶️ How to Run the Project

> After cloning the repository, **no manual configuration is required**.

### 1. Clone the project

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### 2. Run the project with Docker

```bash
docker-compose up --build
```

This command will:

- Automatically install all dependencies (frontend and backend)
- Run database migrations (via Prisma)
- Compile the projects
- Start all services

---

## 🌐 Endpoints

- **Frontend:** http://localhost:3000  
- **Backend (API):** http://localhost:4000/api  
- **Database (PostgreSQL):** localhost:5433

---

## 📁 Where to Place the Videos

The backend expects video files to be located at:

```
/api/videos
```

> This folder is automatically copied into the Docker container at `/dist/videos`. The original plan was to allow external sources like YouTube or S3, but due to increased complexity, a simpler approach was chosen for this project.

---

## 🧭 How to Provide the Video Paths

In the course creation or edit form (frontend), provide **only the video file names**, for example:

```
introduction.mp4, module1-lesson2.mp4
```

### ❗ Important

Do **not** include the full path (e.g., `videos/introduction.mp4`) — only the filenames. The system will automatically resolve them from the correct directory inside the backend container (`/dist/videos`).

---

## 🗂️ Project Structure

```
/api           -> Node.js backend (Express + Prisma)
/front         -> React frontend (Vite)
/videos        -> (put your videos here before building)
/docker-compose.yml
```

---

## 🧪 Testing

The frontend includes unit tests using `vitest` + `@testing-library/react`.

To run locally (outside Docker):

```bash
cd front
npm install
npm run test
```

---

## 🧹 Reset Everything (including the database)

```bash
docker-compose down -v
docker-compose up --build
```