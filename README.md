<div align="center">

<a href="https://submity-client.vercel.app/">
  <img src="https://i.ibb.co.com/rGBkmShb/submitly-logo.jpg" alt="Submitly Logo" width="250" />
</a>

#

### Smart Assignment Submission & Review Platform

A full-stack platform designed to simplify assignment submissions and streamline the review process between students and administrators. Submity enables students to submit projects with GitHub repository links, track submission statuses, and receive feedback, while administrators can manage, review, approve, or reject submissions through a centralized dashboard.

**Submit Projects. Get Reviewed. Keep Improving.**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<p>
  <a href="https://submity-client.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Frontend-Visit%20App-2563EB?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Frontend" />
  </a>
  <a href="https://submity-backend.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Backend-Visit%20API-16A34A?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Backend" />
  </a>
</p>

</div>

---

## 🚀 Overview

> **Submitly** is a modern assignment submission and review platform that connects students with administrators through a structured, transparent, and efficient workflow.

> Students can submit their projects with GitHub repository links, monitor submission progress, and receive meaningful feedback. Administrators can review submissions, evaluate project quality, and approve or reject assignments through an organized administrative interface.

### Product Goals

- Simplify assignment submission and project evaluation.
- Provide students with clear submission statuses and review feedback.
- Help administrators efficiently manage and evaluate assignments.
- Prevent duplicate active submissions for the same GitHub repository.
- Maintain a structured and consistent review workflow.
- Provide a responsive experience across desktop, tablet, and mobile devices.

### Platform Highlights

| Students | Administrators |
|---|---|
| Submit assignments with GitHub links | Access a centralized review dashboard |
| Track submission status | Search, filter, and sort submissions |
| View project submission details | Review project details and repository links |
| Receive review feedback | Approve or reject pending submissions |
| Resubmit previously rejected repositories | Provide mandatory feedback when rejecting |

---

## 🛠️ Tech Stack Architecture

| Layer | Technology | Purpose |
|---|---|---|
| Frontend Framework | **Next.js App Router** | Modern React application and routing |
| Frontend Language | **TypeScript** | Type-safe application development |
| UI Styling | **Tailwind CSS** | Responsive and maintainable styling |
| Form Management | **React Hook Form** | Efficient form handling |
| Validation | **Zod** | Schema-based data validation |
| Data Fetching | **TanStack Query** | Server-state management and caching |
| Notifications | **Sonner** | User feedback and toast notifications |
| Backend Runtime | **Node.js** | Server-side JavaScript runtime |
| Backend Framework | **Express.js** | REST API and middleware architecture |
| Backend Language | **TypeScript** | Type-safe backend development |
| Database | **PostgreSQL** | Relational data storage |
| ORM | **Prisma ORM** | Type-safe database queries and migrations |
| Authentication | **JWT** | Authentication and access control |
| Password Security | **bcrypt** | Password hashing |
| Validation | **Zod** | Request validation |
| API Security | **Rate Limiting** | Protection against excessive requests |
| Database Infrastructure | **Docker Compose** | Local PostgreSQL development environment |
| Deployment | **Vercel** | Frontend and backend hosting |

---

## 🌐 Live Deployment

Submitly is deployed on Vercel.

| Component | Live URL |
|---|---|
| Frontend Application | [submity-client.vercel.app](https://submity-client.vercel.app/) |
| Backend API | [submity-backend.vercel.app](https://submity-backend.vercel.app/) |
| API Documentation | [Open Swagger Docs](https://submity-backend.vercel.app/api/docs) |

> **Note:** The Swagger documentation URL assumes the deployed backend exposes documentation at `/api/docs`, as specified for local development. If the production route differs, use the actual configured documentation URL.

---

## ✨ Core Features

### 🔐 Authentication & Authorization

- Student registration and login.
- JWT-based authentication.
- Secure password hashing with bcrypt.
- Protected routes and authenticated API requests.
- Role-based access control.
- Public registration restricted to the `STUDENT` role.
- Admin accounts created through database seeding.

### 📦 Assignment Submission

- Submit assignments with project details and GitHub repository URLs.
- View personal submissions.
- Retrieve individual submission details.
- Track submission status throughout the review process.
- Prevent duplicate active submissions for the same student and repository.
- Allow previously rejected repositories to be submitted again.

### 🧑‍💻 Administrative Review

- Dedicated administrative dashboard.
- View submission statistics.
- Browse and search student submissions.
- Filter submissions by status.
- Sort and paginate submission records.
- Inspect individual submission details.
- Approve or reject pending submissions.
- Require meaningful feedback when rejecting assignments.

### 🔎 Submission Management

- Centralized submission listing.
- Status-based filtering.
- Search using the supported query parameter.
- Configurable pagination.
- Sorting by supported fields and order.
- Individual submission details.
- Structured review status transitions.

### 🛡️ Security & Validation

- Server-side request validation with Zod.
- JWT-based authentication.
- Role-based authorization.
- bcrypt password hashing.
- API rate limiting.
- Controlled submission status transitions.
- Validation of required rejection feedback.

### 📱 Responsive User Experience

- Responsive layouts for desktop, tablet, and mobile.
- Structured student and administrator experiences.
- Clear submission status indicators.
- Form validation and user notifications.
- Consistent data-fetching and loading-state management.

---

## 👥 User Roles & Permissions

Submitly supports two primary roles.

| Role | Permissions |
|---|---|
| **STUDENT** | Register, log in, create submissions, view personal submissions, and access individual submissions according to authorization rules |
| **ADMIN** | Access administrative submission listings and statistics, inspect submissions, and review pending assignments |

### Role Security Policy

- Public signup always creates a `STUDENT` account.
- Administrator accounts are created through database seeding.
- Students cannot access administrative operations.
- Only administrators can review submissions.
- Protected endpoints require the appropriate authentication and authorization.

---

## 📡 API Endpoints

The backend exposes RESTful API endpoints for authentication, student submissions, and administrative review.

**Base URL — Local Development**

```text
http://localhost:5000
```

**Base URL — Production**

```text
https://submity-backend.vercel.app
```

### 1. Authentication

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/signup` | Register a student account |
| `POST` | `/api/auth/login` | Authenticate a user |
| `POST` | `/api/auth/logout` | Log out |
| `GET` | `/api/auth/me` | Retrieve the current authenticated user |

### 2. Student Submissions

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/submissions` | Create an assignment submission |
| `GET` | `/api/submissions/my` | Retrieve the student's own submissions |
| `GET` | `/api/submissions/:id` | Retrieve an individual submission |

### 3. Administrative Submission Management

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/admin/submissions` | List, filter, search, sort, and paginate submissions |
| `GET` | `/api/admin/submissions/stats` | Retrieve submission statistics |
| `GET` | `/api/admin/submissions/:id` | Retrieve submission details |
| `PATCH` | `/api/admin/submissions/:id/review` | Review and update a pending submission |

### Administrative Query Parameters

The administrative listing endpoint supports the following query parameters:

| Parameter | Purpose |
|---|---|
| `status` | Filter by submission status |
| `page` | Select the results page |
| `limit` | Set the number of results per page |
| `sortBy` | Select a supported sorting field |
| `order` | Specify the sorting order |
| `q` | Search using the supported search fields |

Example:

```http
GET /api/admin/submissions?status=PENDING&page=1&limit=10&sortBy=createdAt&order=desc&q=
```

> For complete request payloads, response schemas, and authentication requirements, refer to the backend implementation and configured API documentation.

---

## 🔄 Submission Workflow

Submitly follows a structured submission and review process.

```text
          Student Registration
                   |
                   v
              Student Login
                   |
                   v
          Submit Assignment
                   |
                   v
           Status: PENDING
                   |
                   v
          Admin Reviews Project
                   |
            +------+------+
            |             |
            v             v
         APPROVED      REJECTED
                          |
                          v
                  Feedback Provided
                          |
                          v
                   Student Revises
                          |
                          v
                 Resubmits Project
```

### Submission Statuses

| Status | Description |
|---|---|
| `PENDING` | Submission is awaiting administrative review |
| `APPROVED` | Submission has been approved |
| `REJECTED` | Submission has been rejected with feedback |

### Review Rules

- New submissions start with the `PENDING` status.
- Only administrators can review submissions.
- Only submissions currently in `PENDING` status can transition through the review operation.
- Rejection requires feedback containing at least 12 characters.
- Students can resubmit previously rejected repositories, subject to the active-submission policy.

---

## 📋 Project Policies

Submitly enforces the following submission and review rules.

| Policy | Description |
|---|---|
| Initial Status | Every new submission starts as `PENDING` |
| Review Permissions | Only administrators can review submissions |
| Review Eligibility | Only `PENDING` submissions can be reviewed |
| Rejection Feedback | At least 12 characters of feedback are required |
| Active Submission | One active submission per student and GitHub repository |
| Active Statuses | `PENDING` and `APPROVED` |
| Repository Resubmission | Rejected repositories may be submitted again |
| Public Registration | Public signup always creates a `STUDENT` account |
| Admin Creation | Administrator accounts are created through database seeding |

These policies help maintain a consistent and predictable assignment evaluation workflow.

---

## ⚙️ Getting Started

Follow these steps to run Submitly locally.

### Prerequisites

Install the following tools before starting:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/)

### 1. Clone the Repository

Clone your Submitly repository and navigate to its root directory.

```bash
git clone YOUR_SUBMITLY_REPOSITORY_URL
cd Submitly
```

> Replace `YOUR_SUBMITLY_REPOSITORY_URL` with your actual repository URL.

### 2. Start PostgreSQL

From the project root, run:

```bash
docker compose up -d
```

This starts the PostgreSQL service defined in your Docker Compose configuration.

### 3. Set Up the Backend

Open a terminal in the project root.

```bash
cd backend
```

Create the environment file:

```bash
cp .env.example .env
```

Install dependencies:

```bash
npm install
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx prisma db seed
```

Start the development server:

```bash
npm run dev
```

The backend should be available at:

```text
http://localhost:5000
```

API documentation:

```text
http://localhost:5000/api/docs
```

### 4. Set Up the Frontend

Open a new terminal from the project root.

```bash
cd frontend
```

Create the environment file:

```bash
cp .env.example .env.local
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend should be available at:

```text
http://localhost:3000
```

### Local Development URLs

| Service | URL |
|---|---|
| Frontend | `http://localhost:3000` |
| Backend API | `http://localhost:5000` |
| Swagger Documentation | `http://localhost:5000/api/docs` |

> **Important:** The commands above assume the project contains the specified scripts, environment templates, Docker Compose configuration, and Prisma seed configuration. Ensure your local configuration matches these instructions.

---

## 🔑 Environment Variables

Configure the environment variables required by your backend and frontend.

### Backend — `.env`

Example configuration:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/submitly?schema=public"

JWT_SECRET="replace_with_a_strong_secret"
PORT=5000
NODE_ENV="development"
```

### Frontend — `.env.local`

Configure the frontend API URL using the variable expected by your application.

For example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> **Important:** These are illustrative examples, not a verified copy of your project's environment schema. Check `backend/.env.example`, `frontend/.env.example`, and the application configuration before using them. Never commit `.env` or `.env.local` files containing secrets to GitHub.

---

## 🧰 Available Scripts

### Backend

Run the following commands from the `backend` directory.

| Command | Description |
|---|---|
| `npm run dev` | Start the backend development server |
| `npm test` | Run backend tests |
| `npm run build` | Build the backend for production |

### Frontend

Run the following commands from the `frontend` directory.

| Command | Description |
|---|---|
| `npm run dev` | Start the frontend development server |
| `npm run build` | Build the frontend for production |

---

## 🗄️ Database Architecture

Submitly uses PostgreSQL as its relational database and Prisma ORM for type-safe database access.

The database supports the platform's core workflows, including:

- User authentication and role management.
- Student assignment submissions.
- GitHub repository association.
- Submission status tracking.
- Administrative review and feedback.
- Submission statistics and listing queries.

Prisma migrations manage database schema changes, while the seed process creates the initial development data, including the administrator account.

---

## 🛡️ Security Considerations

Security is an important part of the Submitly architecture.

- **Authentication:** Protect authenticated endpoints using JWT-based authentication.
- **Authorization:** Restrict administrative operations to authorized administrators.
- **Password Security:** Store password hashes rather than plaintext passwords.
- **Input Validation:** Validate request data using Zod schemas.
- **Rate Limiting:** Limit excessive API requests.
- **Submission Integrity:** Enforce submission ownership and valid status transitions.
- **Review Integrity:** Prevent unauthorized reviews and require sufficient rejection feedback.
- **Environment Security:** Store credentials and secrets in environment variables.
- **Production Configuration:** Use strong secrets and secure deployment settings.

Always verify that these controls are enabled and correctly configured in the deployed environment.

---

## 📌 Project Information

| Property | Details |
|---|---|
| Project Name | Submitly |
| Project Type | Assignment Submission & Review Platform |
| Application Architecture | Full-Stack SaaS |
| Frontend | Next.js App Router |
| Backend | Express.js |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT |
| Password Hashing | bcrypt |
| Validation | Zod |
| Data Fetching | TanStack Query |
| Form Management | React Hook Form |
| Notifications | Sonner |
| Local Infrastructure | Docker Compose |
| Deployment | Vercel |
| Primary Users | Students and Administrators |

---

<div align="center">

<a href="https://submity-client.vercel.app/">
  <img src="https://i.ibb.co.com/rGBkmShb/submitly-logo.jpg" alt="Submitly Logo" width="180" />
</a>

### Submitly — Simplifying Assignment Reviews

**Build. Submit. Review. Improve.**

[![Live Frontend](https://img.shields.io/badge/Live%20Frontend-Visit%20Submitly-2563EB?style=for-the-badge&logo=vercel&logoColor=white)](https://submity-client.vercel.app/)

[![Live Backend](https://img.shields.io/badge/Live%20Backend-Explore%20API-16A34A?style=for-the-badge&logo=vercel&logoColor=white)](https://submity-backend.vercel.app/)

</div>
