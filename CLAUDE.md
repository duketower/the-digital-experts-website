# The Digital Experts — Project Instructions

## Project Overview
Static 5-page website for **The Digital Experts**, a digital marketing agency based in Satna, Madhya Pradesh.

**Live URL:** https://the-digital-experts-in.netlify.app
**GitHub:** https://github.com/duketower/the-digital-experts-website
**Client site:** https://thedigitalexperts.in

---

## File Structure

```
The Digital Experts/
├── CLAUDE.md           ← Project instructions (this file)
├── netlify.toml        ← Netlify config (publish dir = public/)
└── public/             ← Everything served by Netlify lives here
    ├── index.html          ← Homepage
    ├── about.html          ← About page
    ├── services.html       ← Services + pricing
    ├── portfolio.html      ← Portfolio + case studies
    ├── contact.html        ← Contact form
    └── assets/
        ├── css/
        │   └── styles.css  ← All styles (single shared file)
        ├── js/
        │   └── main.js     ← All JS skills + init (single shared file)
        └── images/         ← All image assets go here
```

**Root directory rules — strictly enforced:**
- Only `CLAUDE.md` and `netlify.toml` (and other config files like `.gitignore`) live at root
- No HTML files at root — all pages go inside `public/`
- No loose CSS, JS, or image files anywhere outside `public/assets/`
- Do not create new files at root level without explicit instruction

---

## Brand

| Token | Value |
|---|---|
| Primary Blue | `#0067FF` |
| Secondary Blue | `#005EE9` |
| Dark Navy | `#0F172A` |
| Body Text | `#364151` |
| Light Blue BG | `#E7F6FF` |
| Footer Dark | `#070614` |
| White | `#FFFFFF` |
| Heading font | IBM Plex Serif (700) |
| Body font | Inter (400/500/600) |

Logo URL: `https://thedigitalexperts.in/wp-content/uploads/2025/09/TDE-LOGO-scaled-140x56.png`

---

## Skills Used (from claude-skills/web/)

All JS skills are inlined into `assets/js/main.js` — do not add separate script files.

| Skill | Purpose |
|---|---|
| `initScrollReveal` | Fade-in elements on scroll |
| `initCounters` | Animated number counters |
| `initNavbarScroll` | Sticky navbar `.scrolled` class |
| `initHamburgerMenu` | Mobile nav toggle |
| `initSmoothScroll` | Smooth anchor scrolling |
| `initFaqAccordion` | FAQ open/close |
| `validateForm` / `showError` / `clearErrors` | Contact form validation |
| `initLiveValidation` | Clear errors as user types |
| `initPortfolioFilter` | Filter portfolio cards by category |

---

## Pages & Sections

### index.html
Navbar → Hero → Trusted By → Services (6 cards) → Stats → Process (6-D) → Portfolio preview → Testimonials → FAQ → CTA → Footer

### services.html
Navbar → Page Hero → 6 service detail sections (alternating layout) → Pricing tiers → CTA → Footer

### about.html
Navbar → Page Hero → Story + visual → Stats → Team (3 cards) → 6-D Process (full) → Why Us → CTA → Footer

### portfolio.html
Navbar → Page Hero → Filter + grid (6 cards) → 3 Case studies → Testimonials → CTA → Footer

### contact.html
Navbar → Page Hero → Contact info + form → FAQ → Footer

---

## Deployment

Hosted on **Netlify** under the Binary team.

To redeploy after changes:
```bash
netlify deploy --prod --dir="public" --site="the-digital-experts-in"
```

To sync to GitHub after changes:
```bash
git add .
git commit -m "your message"
git push
```

---

## SEO Status

- [x] Basic meta title + description on all pages
- [x] Open Graph tags on homepage
- [ ] `sitemap.xml` — not yet created
- [ ] `robots.txt` — not yet created
- [ ] Schema markup (LocalBusiness, Service, Review)
- [ ] Open Graph tags on inner pages
- [ ] Keyword-optimised headings

---

## Client Contact

- **Phone:** +91 97709 52684
- **Email:** contact@thedigitalexperts.in
- **Address:** 488, opposite Navrang Park, Siddarth Nagar, Birla Road, Satna, MP – 485001
