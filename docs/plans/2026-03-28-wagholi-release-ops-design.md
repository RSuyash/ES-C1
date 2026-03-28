# Wagholi Release Ops Design

## Goal
Keep AI Studio free to keep updating `main` while protecting `wagholihighstreet.in` from accidental broken pushes.

## Approved Model
- `main` stays as the AI Studio sync branch.
- `production` is the only live branch.
- Pull requests into `production` must build successfully before merge.
- Pushes to `production` auto-deploy to `nivi`.

## Live-Critical Files
- `src/LeadCaptureForm.tsx`
- `index.html`
- `Dockerfile`
- `nginx.conf`
- `docker-compose.prod.yml`

## Promotion Flow
1. AI Studio updates `main`.
2. Human reviews and fixes any live-critical breakage.
3. PR from `main` to `production`.
4. GitHub validates build and container build.
5. Merge to `production`.
6. GitHub deploys `production` to `nivi`.

## Why This Model
- AI Studio can continue to move fast on `main`.
- Production stays stable and reviewable.
- The deploy path remains simple and matches the current live runtime on `nivi`.
