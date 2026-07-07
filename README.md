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

- In **`donate.html`**, find the button with `href="#donate-placeholder"` and change it to your
  live URL (e.g. **Givebutter / GoFundMe / PayPal / Stripe** or a **Mitchell Music Boosters** giving page):
  ```html
  <a href="https://YOUR-DONATION-LINK" class="btn btn--gold btn--block btn--lg">Continue to Secure Checkout</a>
  ```
- Then remove the `data-donate` attribute and the placeholder handler in `assets/script.js`.
- The Donate buttons in `index.html` already point to `donate.html`, so they flow through automatically.

> A static site can't process payments by itself — it needs a payment provider. The easiest path for a
> school group is a hosted page (Givebutter and GoFundMe are free to start). Because giving runs through the
> Mitchell Music Boosters 501(c)(3), confirm the receipt/acknowledgment flow with them.

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

## Hosting in 2 minutes (GitHub Pages)
1. Push this folder to a GitHub repo.
2. Repo **Settings → Pages → Build from branch → `main` / root**.
3. Your site goes live at `https://<username>.github.io/<repo>/` (or point `fdc-foundation.org` at it).

## Content sources
Program facts (the "Friend de Coup" / Jason Kaemingk tribute, 40+ year history, Mitchell Area Performing
Arts Center, Grand Champion tradition) are drawn from public reporting by the *Mitchell Republic*. Mission,
contact, tax, and Opportunities come from the FDC Foundation Committee's own brochure.
