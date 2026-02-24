# The Digital Experts — Website

Static 5-page website for **The Digital Experts**, a digital marketing agency based in Satna, Madhya Pradesh.

**Live site:** https://thedigitalexperts.in
**Netlify deploy:** https://the-digital-experts-in.netlify.app
**GitHub:** https://github.com/duketower/the-digital-experts-website

---

## Pages

| File | Description |
|------|-------------|
| `public/index.html` | Homepage — hero, services overview, stats, testimonials |
| `public/about.html` | About the agency — team, story, values |
| `public/services.html` | Services & pricing |
| `public/portfolio.html` | Portfolio & case studies |
| `public/contact.html` | Contact form |

---

## Tech Stack

- **HTML / CSS / Vanilla JS** — no frameworks, no build tools
- **Fonts:** IBM Plex Serif + Inter via Google Fonts CDN
- **Icons:** Font Awesome 6 via CDN
- **Hosting:** Netlify (publish directory: `public/`)

---

## File Structure

```
The Digital Experts/
├── CLAUDE.md           ← Project instructions for Claude Code
├── netlify.toml        ← Netlify config (publish dir = public/)
├── .gitignore
└── public/
    ├── index.html
    ├── about.html
    ├── services.html
    ├── portfolio.html
    ├── contact.html
    └── assets/
        ├── css/
        │   └── styles.css
        ├── js/
        │   └── main.js
        └── images/
```

---

## Running Locally

No build step required. Open any HTML file directly in your browser:

```bash
open public/index.html
```

Or use a simple local server (optional):

```bash
npx serve public
# then visit http://localhost:3000
```

---

## Deployment

Deployed via Netlify. Push to `main` triggers an automatic deploy.
Netlify publish directory is set to `public/` via `netlify.toml`.
