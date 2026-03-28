# Wagholi Highstreet Release Workflow

## Branches
- `main`: AI Studio sync branch. New generated design/code lands here first.
- `production`: live branch. Only this branch is deployed to `wagholihighstreet.in`.

## Safe Update Flow
1. Let AI Studio push its latest changes to `main`.
2. Pull `main` locally and review the diff.
3. Restore or keep the production-critical pieces if AI Studio removed them:
   - `src/LeadCaptureForm.tsx`
   - `index.html` icon metadata
   - `Dockerfile`
   - `nginx.conf`
   - `docker-compose.prod.yml`
4. Open a PR from `main` into `production`.
5. Wait for `PR Validate` to pass.
6. Merge into `production`.
7. `Deploy Production` will ship the merged `production` branch to `nivi`.

## Live Runtime
- Server: `nivi`
- App directory: `~/apps/wagholi-highstreet`
- Runtime: Docker Compose + Traefik on `proxy_net`
- Live domains:
  - `wagholihighstreet.in`
  - `www.wagholihighstreet.in`

## Manual Fallback
If GitHub Actions is unavailable, deploy manually:

```bash
ssh nivi
cd ~/apps/wagholi-highstreet
git fetch origin --prune
git checkout production
git reset --hard origin/production
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml ps
docker exec wagholi-highstreet wget -q -O - http://127.0.0.1/healthz
```

## Known Production Requirement
- Lead submissions save to Postgres immediately.
- Email notifications currently depend on `RESEND_API_KEY` in the shared Naya API environment.
