# Ledger — AI Powered Investor Intelligence Platform

A production-quality React 19 + TypeScript frontend for an AI/RAG-based
annual report analysis platform. Dark mode by default, full light mode,
8 pages, fully typed API layer, and realistic demo data so it's explorable
without a backend.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS · shadcn/ui-style primitives ·
Framer Motion · TanStack Query · Axios · React Router · Recharts · Sonner

## Getting started

```bash
npm install
npm run dev
```

The app runs in **demo mode** out of the box (`VITE_USE_MOCKS=true` in
`.env.example`) — every page is populated with realistic mock data for a
sample Apple Inc. 10-K, so you can click through Upload, Chat, Executive
Summary, Financial Analysis, Risk Analysis, Metrics, and the Investment
Report without any backend running.

## Wiring up a real backend

1. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to your API's
   base URL, and `VITE_USE_MOCKS=false`.
2. Implement these endpoints (see `src/services/*.ts` for exact shapes):
   - `POST /upload` — multipart file upload, returns `{ report }`
   - `GET /reports`, `GET /reports/:id`
   - `POST /chat` — `{ reportId, question }` → `{ answer, sources }`
   - `GET /analysis/summary?reportId=`
   - `GET /analysis/financial-analysis?reportId=`
   - `GET /analysis/risk-analysis?reportId=`
   - `GET /analysis/metrics?reportId=`
   - `GET /analysis/investment-report?reportId=`
3. Types for every request/response live in `src/types/`.

## Project structure

```
src/
  assets/         static assets
  components/     shared UI (Sidebar, Navbar, ChatWindow, charts, etc.)
  components/ui/  design-system primitives (button, card, tabs, ...)
  layouts/        DashboardLayout (sidebar + navbar shell)
  pages/          one file per route
  hooks/          React Query hooks + ThemeProvider
  services/       axios client + per-domain API calls + mock data
  types/          shared TypeScript interfaces
  lib/            cn() and formatting utilities
```

## Notes on scope

- shadcn/ui components are hand-implemented on top of the same Radix
  primitives shadcn uses (`@radix-ui/react-*`) rather than pulled in via
  the shadcn CLI, so the project has zero interactive setup steps —
  `npm install && npm run dev` is enough.
- "Download PDF" on the Investment Report page is UI-only, per spec —
  Markdown download and copy are fully functional.
- Every data-fetching page implements loading skeletons, an error state
  with retry, and toast notifications via Sonner.
