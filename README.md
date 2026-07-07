# FDC Foundation — Website

A donor-recruitment website for the **FDC Foundation** (Friend de Coup Foundation),
supporting the students of Mitchell High School's Friend de Coup show choir in Mitchell, South Dakota.

**Building confidence. Creating leaders. Leaving a legacy.**

It's a fast, dependency-free **static site** (plain HTML/CSS/JS) — it works by opening the
files directly and can be hosted anywhere (GitHub Pages, Netlify, Vercel, or any web host).

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Landing page: hero, mission, the three Opportunities, impact, legacy/story, photo gallery, giving levels, ways to give, FAQ, contact |
| `donate.html` | Focused donation page with amount selector and impact breakdown |
| `assets/styles.css` | All styling (purple/black/cyan brand system, responsive, animations) |
| `assets/script.js` | Interactions: nav, scroll reveal, count-up stats, FAQ, donate selectors |
| `assets/crest.svg` | Logo / favicon (FDC shield crest) |
| `assets/img/` | Optimized performance photos (Photography by Wilson, South Titan Classic 2026) |

## Real info already baked in
- Mission, tagline, and the three Opportunities (Founding Donor / Sponsor a Student / Support the Program)
- Contact: phone **605-350-5866 (Darren)** & **605-770-0844 (Chris)**, email **info@fdc-foundation.org**, **Mitchell, SD**, website **www.fdc-foundation.org**
- Tax line: donations are tax-deductible through the partnership with the **Mitchell Music Boosters**, a registered **501(c)(3)** nonprofit
- 9 real performance photos throughout

## View it locally
Double-click `index.html`, **or** run the bundled local server from this folder:
```powershell
powershell -ExecutionPolicy Bypass -File .claude/serve.ps1 -Port 8123
# then open http://localhost:8123
```

---

## ✅ The one thing left before launch: the donation link

The Donate buttons currently show a reminder popup. Connect them to your real provider:

**It's now a one-line change.** Open **`assets/script.js`**, find the line near the top:
```js
const DONATE_URL = "";
```
and paste your live donation page URL between the quotes, e.g.:
```js
const DONATE_URL = "https://givebutter.com/your-fdc-page";
```
That's it — every "Donate" and "Continue to Secure Checkout" button now opens your provider, and the
donor's selected amount + frequency are passed along automatically (as `?amount=` and `?frequency=`)
when the provider supports them. Until you set it, the buttons show a friendly "not connected yet" reminder.

> A static site can't process payments by itself — it needs a payment provider. The easiest path for a
> school group is a hosted page (**Givebutter** and **GoFundMe** are free to start). Because giving runs
> through the Mitchell Music Boosters 501(c)(3), confirm the receipt/acknowledgment flow with them.
> If your provider errors on the `?amount=` parameter, set `DONATE_PASS_AMOUNT = false` right below `DONATE_URL`.

### Optional polish
- **Contact form** (`index.html`) is a demo (shows a popup). To collect real messages, point it at a free
  service like **Formspree**: `<form ... action="https://formspree.io/f/YOUR_ID" method="POST">` and remove
  the `e.preventDefault()` demo handler in `assets/script.js`.
- **Numbers** you may want to make exact: stat bar (`40+` years, `50+` students) and the giving-tier amounts.
- **More / different photos:** see below.

---

## Working with photos

Source photos live in your Dropbox (`Photography by Wilson / South Titan Classic 2026 / Mitchell HS Friend de Coup`)
and are **not** in this repo. The 9 web images in `assets/img/` were resized/compressed from the originals.

To regenerate or add more, use the bundled resizer (uses built-in Windows .NET — no extra software):
```powershell
# Resize every image in a source folder into a destination folder, max 1700px wide, quality 82
powershell -ExecutionPolicy Bypass -File .claude/resize.ps1 `
  -Src "C:\path\to\source\photos" -Dst ".\assets\img" -MaxW 1700 -Quality 82
```
Then reference the new file in `index.html` / `donate.html`. Current images (all `.jpg` in `assets/img/`):
`hero-soloist`, `energy`, `energy-yellow`, `ensemble`, `ensemble-purple`, `duo`, `solo-action`, `ballad`,
`portrait-1/2/3`, `gallery-4/5/6/7`, and `hall-of-fame` (the FDC Hall of Fame emblem).

---

## Hosting on GitHub Pages (free)

This repo is already prepared for GitHub Pages (relative paths + a `.nojekyll` file so nothing is skipped).

**One-time setup:**
1. Create a free account at [github.com](https://github.com) if you don't have one.
2. Create a new **empty** repository (e.g. `fdc-foundation-site`) — don't add a README/gitignore, this repo has them.
3. In this folder, connect it and push (replace `USERNAME`/`REPO`):
   ```bash
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```
   (GitHub will prompt you to sign in the first time — use a browser or a Personal Access Token.)
4. On GitHub: **Settings → Pages → Build and deployment → Source: "Deploy from a branch" → Branch: `main` / `/ (root)` → Save.**
5. Wait ~1 minute. Your site is live at **`https://USERNAME.github.io/REPO/`**.

**Updating the live site later:** make your edits, then:
```bash
git add -A && git commit -m "Update site" && git push
```
Pages redeploys automatically within a minute.

**Custom domain (`www.fdc-foundation.org`):** in **Settings → Pages → Custom domain**, enter your domain,
then add the DNS records GitHub shows you at your domain registrar. GitHub will provision HTTPS for free.

> Prefer drag-and-drop? [Netlify](https://app.netlify.com/drop) lets you drag this folder onto the page and
> get an instant live URL — no git required. Same files work on either host.

## Content sources
Program facts (the "Friend de Coup" / Jason Kaemingk tribute, 40+ year history, Mitchell Area Performing
Arts Center, Grand Champion tradition) are drawn from public reporting by the *Mitchell Republic*. Mission,
contact, tax, and Opportunities come from the FDC Foundation Committee's own brochure.
