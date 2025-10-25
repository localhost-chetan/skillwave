# Backend — Skillwave

This README explains how to run the backend for local development or for a frontend developer who needs the backend running locally (or in Docker). It includes the minimal commands your frontend colleague needs, plus a few helpful tips and troubleshooting steps.

## Quickstart (recommended)

1. Make sure Docker and Docker Compose are installed on your machine.
2. From the repository root run:

```bash
# Build and start backend (and other services) in detached mode
docker compose up --detach --build
```

- This spins up the Postgres DB and the backend service defined in `docker-compose.yaml`.
- The backend listens on port `3001` by default (or `PORT` if overridden).

## View Better Auth API docs

If you want to open the Better Auth auto-generated docs from inside the running backend container, run:

```bash
# Run this from your host shell
docker container exec backend-prod sh -c "bun open-auth-docs"
```

Notes:
- `backend-prod` is the container name used in the Compose setup. If your container has a different name, replace it accordingly.
- You can also open the docs in your browser (if the backend is accessible on localhost) at:

```
http://localhost:3001/api/auth/reference
```

## Environment variables

See `.env.example` for the variables used by the backend. At minimum, the following are relevant for running locally with Docker (the Compose file may already inject these):

- `DATABASE_URL` — connection string for Postgres (not required if Compose wires the DB directly)
- `BETTER_AUTH_SECRET` — secret for Better Auth
- `MAILGUN_DOMAIN`, and credentials used by the mailer (if you send verification emails)

If you need to override or provide custom values, place a `.env` file in the `backend/` folder or export them in your shell before running Docker.

## Useful endpoints for frontend developers

- Backend health: `GET /` — returns a simple JSON message.
- DB sanity check: `GET /db-check` — runs a small query against the database and returns the result.
- Better Auth endpoints: mounted under `/api/auth/` (e.g. `/api/auth/sign-up/email`). See the generated docs for details.

## Troubleshooting (users not being created / email signups failing)

If you hit the signup endpoint (`/api/auth/sign-up/email`) and the response is `200 OK` but no user record appears in Postgres, try the following checklist in order:

1. Check DB connectivity from the backend

```bash
# From host, try the db-check endpoint (after docker compose up):
curl -s http://localhost:3001/db-check | jq
```

- The endpoint should return `{ "message": "DB is connected!", ... }`.
- If it fails, inspect backend logs and ensure the Postgres container is running.

2. Confirm the database tables exist

- Run migrations (if your repo uses migrations):

```bash
# Run inside the backend container
docker container exec -it backend-prod sh -c "bun run db:migrate"
```

- Alternatively, connect to Postgres and inspect the tables (psql or a GUI).

3. Inspect backend logs while reproducing the signup

```bash
# Tail container logs
docker logs -f backend-prod
```

- Look for errors emitted by Better Auth or by the mailer when you POST to `/api/auth/sign-up/email`.

4. Check Better Auth configuration

- Ensure the code is passing the correct Drizzle/DB instance to Better Auth (the adapter must match the DB client used).
- Verify `requireEmailVerification`, `emailVerification.sendVerificationEmail`, and any adapter options are configured correctly.

5. Try a manual insert test

- Use `/db-check` or a quick script to insert or select rows to validate writes.

6. Verify environment variables

- `DATABASE_URL` / DB host/port/user/password must match the running Postgres instance.
- If running backend in Docker Compose, the service name (usually `postgres` or similar) should be used as the DB host from other containers.

## Common quick commands

```bash
# Show all (running & stopped) containers
docker container ls --all

# Show running containers
docker container ls

# View backend logs
docker logs -f backend-prod

# Exec into backend container to run commands interactively
docker container exec -it backend-prod sh
```

## If you still need help

- Share the output of `docker container ls` and `docker logs backend-prod` while you attempt a signup.
- Share the `GET /db-check` response.
- If you prefer, I can add a small debug route that logs Better Auth errors during signup (only for local debugging).

---

That's it — the frontend dev should be able to run Docker Compose and open the Better Auth docs or hit the API endpoints.
