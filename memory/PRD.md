# MiniAtlas Quest - PRD

## Problem statement
Build a polished, mobile-first, frontend-only React web app called MiniAtlas Quest — a child-friendly digital geography learning app for ages 7-13 covering Indian states/UTs, national symbols, and 193 UN member countries with cards, flashcards, quizzes, a clickable India map, and an Explorer Passport progress system.

## Users
Children aged 7-13 (self-directed learners). No accounts, no data collection.

## Architecture
- Frontend-only React (CRA), single-page app with react-router
- All data in `/src/data/*.js` (static)
- Progress stored in `localStorage` via `ProgressContext`
- No backend, no auth, no external APIs

## Implemented (2026-02)
- 4 sections: Explore India, World Explorer, Learn & Play, Explorer Passport
- 28 states + 8 UTs + 10 national symbols + 193 UN countries
- Simplified clickable SVG India map (36 regions) with chip-fallback grid
- Detail panel with Mark Learned, Practice Capital, Favourite
- Search, region/continent filters, sorting, pagination on world
- Flashcards (4 decks, 2 directions each, practice pool)
- 4 quiz missions × (5|10) with feedback, score, best-score
- Capital Match (India/World, tap-to-match)
- 9 badges, 6 levels, animated Journey routes, reset flow
- localStorage as single source of truth, persists across refresh

## Backlog (P1/P2)
- Sound preference toggle
- Print-friendly passport summary
- Deeper animated map journey with milestone stamps

