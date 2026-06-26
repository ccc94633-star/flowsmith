# AGENTS.md

## Project

FlowSmith is a Vue 3 + Vite portfolio and AI tools project.

The project currently uses JavaScript Vue single-file components, not TypeScript yet.
AI features are handled through serverless API files under `api/`.

This project currently uses manual hash-based routing in `src/App.vue`.
As the project grows, prefer migrating to Vue Router before adding many more tool pages.

## Commands

- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`

## Collaboration Mode

The user is learning Vue development with Codex.

Before editing files, Codex must:

1. Explain what it plans to do.
2. Explain why the change is needed.
3. Wait for user approval.

## Engineering Rules

- Use Vue 3 Composition API with `<script setup>`.
- For new Vue projects, use Vue Router for page routing by default.
- Do not hand-roll route switching with `window.location.hash` unless the project is a tiny prototype.
- For this project, prefer migrating to Vue Router before adding several more tool pages.
- Follow the existing project structure before adding new folders.
- Keep AI API endpoints in `api/`.
- Keep reusable UI in `src/components`.
- Keep page-level features in `src/views`.
- Keep AI tool card data in the shared project cards array. When adding a new AI tool, add one item to that same data array so the home page and related UI can keep growing from one source of truth.
- Do not add dependencies without explaining why.
- Prefer small, understandable changes because the user is learning.
- After code changes, run `npm run build` when relevant.

## Done Means

- The feature works in the browser.
- The production build passes.
- Codex explains which files changed.
- Codex explains what the user should review or test manually.
