# KVBA Website — kvba.org

**Kalamazoo Valley Blues Association** — Keeping the Blues Alive in Southwest Michigan.

Static HTML/CSS/JS site hosted on GitHub Pages at [kvba.org](https://kvba.org). DNS is managed through Cloudflare. No build tools or frameworks — just files.

---

## Site Structure

```
KVBA website/
├── index.html              ← Home page (hero video, featured events, gallery)
├── events.html             ← Upcoming events (live from Google Sheets CSV)
├── bluesfest.html          ← Blues Fest 2026 — Save the Date (July 10–11)
├── golf.html               ← Golf Outing event page & registration
├── membership.html         ← Membership tiers & join form (Square)
├── sponsorship.html        ← Festival sponsorship tiers & Square purchase links
├── scholarship.html        ← KVBA Scholarship program info
├── scholarship-apply.html  ← Scholarship application form (Formspree)
├── bands.html              ← Community bands & local venues
├── preserve.html           ← Preserve the Blues, education, volunteer
├── about.html              ← About KVBA, board, 501(c)3 docs, in memoriam
├── CNAME                   ← Custom domain config for GitHub Pages (kvba.org)
├── assets/
│   ├── css/
│   │   └── style.css       ← All styles (dark theme, light sections, responsive)
│   ├── js/
│   │   └── main.js         ← Nav, dropdowns, lightbox, scroll effects,
│   │                          mailto copy helper, GA4 event tracking
│   ├── images/             ← All page images and logos
│   │   └── sponsorship-tiers-2026.png  ← Sponsorship tier chart (updated 2026)
│   └── video/
│       └── hero.mp4        ← Background video for homepage hero
└── Files/
    └── 2026 golf registration.doc  ← Downloadable golf registration form
```

---

## Key Integrations

| Service | Purpose |
|---------|---------|
| GitHub Pages | Static site hosting |
| Cloudflare | DNS management & SSL |
| Google Analytics (G-MRCHQHKWJD) | Traffic & event tracking |
| Formspree (mnjgyvrz) | Scholarship application emails → lisa@kvba.org |
| Square | Membership & sponsorship payments |
| Google Sheets CSV | Live events data on events.html |

---

## Navigation Structure

```
Home
Events ▾
  └── Upcoming Events
  └── Blues Fest 2026
  └── Golf Outing
Support Us ▾
  └── Membership
  └── Sponsorship
Community ▾
  └── Community Bands
  └── Preserve the Blues
  └── Scholarship
About
[Join KVBA] ← CTA button
```

---

## Deploying Changes

Push to `main` — GitHub Pages deploys automatically within ~60 seconds.

```bash
git add .
git commit -m "your message"
git push origin main
```

If the push is rejected with "fetch first":
```bash
git pull origin main --rebase
git push origin main
```

---

## Development Notes

- **No build step** — edit HTML/CSS/JS directly and push to `main`
- **Fonts** — Bebas Neue (headings) + Inter (body) via Google Fonts
- **Dark/light sections** — `.section-light` class inverts CSS variables for cream-background sections; gradient uses pixel-based stops (40px) so text never overlaps the fade zone
- **Mobile nav** — hamburger menu at ≤920px; dropdowns become accordions
- **Accessibility** — minimum font size 0.93rem, WCAG AA contrast ratios, line-height 1.75
- **Email links** — JS automatically adds copy-to-clipboard buttons to all mailto links for users without a configured mail client
- **GA4 events** — tracks mailto clicks, file downloads, Square tier clicks, and outbound links

---

## Photo Credits

Photos in `assets/images/Photo Credit These to Gerald Brooks/` are credited to **Gerald Brooks**. Please ensure proper attribution when using these images publicly.

---

Built with ♥ for the blues — kvba.org
