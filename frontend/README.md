# Submity — Frontend

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Environment (`.env`)
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | Your Express backend. Leave empty for pure demo mode. |
| `NEXT_PUBLIC_APP_URL` | Frontend origin (must match backend `APP_URL`). |

## Demo logins (for recruiters)
Login and signup pages, the landing page "Live demo" section and the nav all have one-click
**Student demo** and **Mentor demo** buttons. Demo sessions never call the backend; data is stored in
the browser (localStorage) so a recruiter can submit as the student, switch to the mentor, approve it,
and see the feedback come back. Manual login also works: `student@submity.demo` / `mentor@submity.demo`,
password `Demo@1234`. Real accounts use your backend.

## Structure (`src/`)
- `app/` routes: `/`, `/login`, `/signup`, `/student`, `/mentor`
- `components/submity/` all screens (landing, footer, auth, workspace, modals)
- `components/ui/` shadcn primitives
- `hooks/` `use-submissions`, `use-toast`
- `lib/` `api-client`, `demo-data`, `site` (edit your GitHub/email links in `site.ts`), `utils`
- `proxy.ts` Next 16 proxy (security headers)
