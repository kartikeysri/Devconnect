# DevConnect

A developer-focused social platform where users share text posts, blogs and code snippets, follow each other, and discover trending content. Built with a **Spring Boot REST API** secured by **JWT**, a **PostgreSQL** database, and a **React + Vite** frontend.

**Live demo:** https://devconnect-gold-chi.vercel.app/

---

## Features

- **JWT authentication** – stateless register/login with BCrypt-hashed passwords; all routes except auth and health check are protected.
- **Smart sign-up suggestions** – generates available usernames and email ideas from the user's first and last name, checking uniqueness against the database.
- **Posts in three formats** – `TEXT`, `BLOG` and `CODE` post types.
- **Paginated feed** – page/size query params with validation (max 50 per page).
- **Likes and comments** – one like per user per post, enforced by a database unique constraint.
- **Follow / unfollow** – follower graph with duplicate follows prevented at the database level.
- **Trending** – top 10 posts ranked by likes in the last 24 hours, plus top 10 hashtags extracted from recent posts.
- **Search** – paginated search across users and posts.
- **User profiles** – view any profile by username; edit your own.
- **Centralized error handling** – a global exception handler returns consistent JSON errors.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Backend | Java 21, Spring Boot 3.5, Spring Web, Spring Security, Spring Data JPA (Hibernate), Bean Validation, Lombok |
| Auth | JWT (jjwt), BCrypt |
| Database | PostgreSQL (Supabase) |
| Frontend | React 18, Vite, React Router, Axios, Tailwind CSS, Framer Motion |
| DevOps | Docker (multi-stage build), Render (API), Vercel (frontend) |

## Architecture

```
React (Vercel)  ──HTTPS + JWT──▶  Spring Boot API (Render, Docker)  ──JPA──▶  PostgreSQL (Supabase)
```

The backend follows a layered structure:

```
src/main/java/com/example/authsystem/
├── controller/    REST endpoints
├── service/       Business logic (interfaces + impl/)
├── repository/    Spring Data JPA repositories, custom JPQL queries
├── entity/        JPA entities: User, Post, Comment, PostLike, Follow
├── dto/           Request/response objects
├── security/      JWT filter, token service, entry point, UserDetailsService
├── config/        Security and CORS configuration
└── exception/     Global exception handling
```

**Database design highlights**

- Indexes on `posts(created_at)` and `posts(type, created_at)` for fast feed queries.
- Index on `post_likes(post_id, created_at)` to support the 24-hour trending query.
- Unique constraints on `(user_id, post_id)` for likes and `(follower_id, following_id)` for follows.
- Trending posts are computed with a single aggregate JPQL query projected straight into a DTO, avoiding N+1 loading.

## API Endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Log in, returns JWT |
| POST | `/api/auth/suggestions` | No | Username and email suggestions |
| GET | `/api/health` | No | Health check |
| POST | `/api/posts` | Yes | Create a post |
| GET | `/api/posts?page=0&size=10` | Yes | Paginated feed |
| POST | `/api/posts/{postId}/likes` | Yes | Like a post |
| POST | `/api/posts/{postId}/comments` | Yes | Comment on a post |
| GET | `/api/users/{username}` | Yes | View a profile |
| PUT | `/api/users/profile` | Yes | Update your profile |
| POST | `/api/users/follow` | Yes | Follow a user |
| POST | `/api/users/unfollow` | Yes | Unfollow a user |
| GET | `/api/search/users` | Yes | Search users |
| GET | `/api/search/posts` | Yes | Search posts |
| GET | `/api/trending` | Yes | Trending posts and hashtags |

Authenticated requests send the token as `Authorization: Bearer <token>`.

## Running Locally

**Prerequisites:** Java 21, Maven, Node.js 18+, PostgreSQL

1. **Create the database**

   ```sql
   CREATE DATABASE devconnect;
   ```

2. **Start the backend** (from the repository root)

   ```bash
   mvn spring-boot:run
   ```

   The API runs on `http://localhost:8080`. Tables are created automatically by Hibernate.

3. **Start the frontend**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   The app runs on `http://localhost:5173`.

Or run both together from the root with `npm run dev`.

### Environment Variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5432/devconnect` | Database URL |
| `SPRING_DATASOURCE_USERNAME` | `postgres` | Database user |
| `SPRING_DATASOURCE_PASSWORD` | `postgres` | Database password |
| `JWT_SECRET` | dev-only value | Base64 signing key – **always set in production** |
| `JWT_EXPIRATION` | `86400000` (24 h) | Token lifetime in ms |
| `APP_CORS_ALLOWED_ORIGINS` | localhost + Vercel URL | Allowed frontend origins |
| `PORT` | `8080` | Server port |

## Deployment

- **Frontend:** Vercel, with `frontend/` as the project root.
- **Backend:** Render, built from the `Dockerfile` (multi-stage Maven → JRE 21 image), health-checked at `/api/health`.
- **Database:** Supabase PostgreSQL via the session pooler.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the full step-by-step guide.

## Author

**Kartikey Srivastava** – Backend Developer (Java / Spring Boot)
[LinkedIn](https://www.linkedin.com/in/kartikey-srivastava-33a9741a0) · [GitHub](https://github.com/kartikeysri)
