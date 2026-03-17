# KVBA Website — kvba.org

**Kalamazoo Valley Blues Association** — Keeping the Blues Alive

---

## Site Structure

```
KVBA website/
├── index.html          ← Home page (hero, events, gallery, about)
├── events.html         ← Upcoming events calendar
├── membership.html     ← Membership tiers & join info
├── preserve.html       ← Preserve the Blues, education, scholarship
├── bands.html          ← Community & local bands, venues
├── about.html          ← About KVBA, board, nonprofit, in memoriam
├── assets/
│   ├── css/
│   │   └── style.css   ← All styles
│   ├── js/
│   │   └── main.js     ← Navigation, lightbox, scroll effects
│   ├── images/         ← All gallery & page photos
│   └── video/
│       └── hero.mp4    ← Background video for homepage hero
└── README.md           ← This file
```

---

## Video Setup (One-Time Step)

The hero video could not be automatically copied due to a sync lock. Do this once manually:

1. Find **`sample video.mp4`** in the root of this folder
2. Copy it to **`assets/video/hero.mp4`**

That's it — the homepage will then show the video as a full-screen background.

---

## Deploying to GitHub Pages

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in (create a free account if needed)
2. Click **"New repository"**
3. Name it `kvba-website` (or `kvba.org`)
4. Make it **Public**
5. Click **"Create repository"**

### Step 2 — Upload the Files

**Option A — Using GitHub.com (easiest, no tools needed):**
1. Open your new repository on GitHub
2. Click **"uploading an existing file"**
3. Drag the entire contents of this `KVBA website` folder into the upload area
4. Click **"Commit changes"**

**Option B — Using GitHub Desktop:**
1. Download [GitHub Desktop](https://desktop.github.com)
2. Clone your new repository to your computer
3. Copy all files from this folder into the cloned repository folder
4. In GitHub Desktop, commit and push

**Option C — Using Git in Terminal:**
```bash
cd "KVBA website"
git init
git add .
git commit -m "Initial KVBA website"
git remote add origin https://github.com/YOUR-USERNAME/kvba-website.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **"Deploy from a branch"**
5. Choose **`main`** branch and **`/ (root)`** folder
6. Click **Save**

Your site will be live at: `https://YOUR-USERNAME.github.io/kvba-website/`

### Step 4 — Connect Your Custom Domain (kvba.org)

1. In GitHub Pages settings, enter `kvba.org` in the **Custom domain** field
2. Click **Save**
3. Log in to your domain registrar (wherever kvba.org DNS is managed — likely Bluehost)
4. Add these DNS records:

| Type  | Host | Value              |
|-------|------|--------------------|
| A     | @    | 185.199.108.153    |
| A     | @    | 185.199.109.153    |
| A     | @    | 185.199.110.153    |
| A     | @    | 185.199.111.153    |
| CNAME | www  | YOUR-USERNAME.github.io |

5. DNS changes take up to 24 hours. Once propagated, `kvba.org` will load your new site.

---

## Updating the Site

### Adding/Editing Events

Open `events.html` in any text editor (Notepad, TextEdit, VS Code). Find the events section and copy/paste an existing event card block, updating the date, name, time, and venue.

### Updating Content

All pages are standard HTML files. Open them in any text editor and edit the text between the HTML tags.

### Adding Photos to the Gallery

1. Copy new `.jpg` or `.jpeg` photos into `assets/images/`
2. Open `index.html` and add a new `<div class="gallery-item">` block pointing to your new image

### Updating Social Media Links

Search for `https://facebook.com` and `https://instagram.com` across all HTML files and replace with your actual KVBA social media URLs.

### Updating the Contact Email

Search for `info@kvba.org` across all HTML files and update if needed.

---

## Future Ideas

- Add a **contact form** using [Formspree](https://formspree.io) (free tier works great with GitHub Pages)
- Add **online membership payments** via [Stripe](https://stripe.com) or [PayPal](https://paypal.com)
- Build an **event calendar** using Google Calendar embed
- Add a **newsletter signup** via Mailchimp

---

## Photo Credits

Photos in `assets/images/Photo Credit These to Gerald Brooks/` are credited to **Gerald Brooks**. Please ensure proper attribution when using these images publicly.

---

Built with ♥ for the blues — kvba.org
