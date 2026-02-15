# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Website for "Schlüsselmomente" — a coaching/counseling business (systemische Paar- und Einzelberatung) in Freiburg, Germany. The site is in German.

## Architecture

The project has three Docker containers orchestrated via `docker-compose.yml`:

1. **`fe/`** — Static frontend served by Apache (php:8.2-apache image). Plain HTML/JS/Tailwind CSS, no framework. Pages are in `fe/public/`, source components in `fe/public/src/`.
2. **`be/`** — PHP backend (php:8.2-fpm + nginx + supervisor). Serves a single API endpoint (`POST /api/contact`) that sends emails via Mailgun (`be/sendMailGun.php`). Nginx on port 99 routes to PHP-FPM.
3. **Nginx reverse proxy** (root `dockerfile` + `nginx.conf`) — Routes `/api/*` to the backend container and everything else to the frontend container.

Content is loaded dynamically from an external Strapi CMS at `admin.schluesselmomente-freiburg.de/api` via `fe/public/src/cms-loader.js`. The CmsLoader class has hardcoded fallback data if the CMS is unreachable.

## Build & Development Commands

### Frontend (Tailwind CSS)
```bash
cd fe
npm install
npm start    # Watches fe/public/src/input.css and compiles to fe/public/dist/output.css
```

### Backend (PHP)
```bash
cd be
composer install
```

### Docker (full stack)
```bash
docker compose up --build
```

## CI/CD

GitHub Actions workflow (`.github/workflows/main.yml`):
- Triggers on push to `main` (only if `fe/public/` has changes) or manual dispatch
- Auto-bumps patch version in `fe/package.json`
- Builds and pushes Docker images to `ghcr.io`
- Updates image tag in a separate `app-of-apps` GitOps repo for deployment

## Key Files

- `fe/public/index.html` — Main landing page
- `fe/public/src/index.js` — Entry point: initializes CMS loading, mobile menu, contact form submission, reference carousel
- `fe/public/src/cms-loader.js` — Fetches content from Strapi (about sections, pricing, arbeitsweise)
- `fe/public/src/referenceCarousel.js` — Testimonial/reference carousel component
- `fe/public/src/css/style.css` — Custom CSS (beyond Tailwind)
- `be/sendMailGun.php` — Contact form handler: sends notification to business owner + confirmation to sender
- `be/message.html` / `be/confirmation.html` — HTML email templates with `{PLACEHOLDER}` substitution

## Notes

- Tailwind v4 is used (CSS-based config via `@import "tailwindcss"` in `input.css`). The `tailwind.config.js` file exists but Tailwind v4 primarily uses CSS-based configuration.
- The contact form POSTs to `/api/contact` via XHR (no page reload).
- Backend env vars: `MAILGUN_API_KEY`, `MAIL` (recipient email address).
- The frontend Dockerfile copies `fe/public/` into Apache's `/var/www/html`.
