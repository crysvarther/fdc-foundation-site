# FDC Foundation — Website

> **🌐 Live:** https://crysvarther.github.io/fdc-foundation-site/ &nbsp;·&nbsp; Repo: `crysvarther/fdc-foundation-site` (GitHub Pages, `main` branch, root).
> To update the live site: `git add -A && git commit -m "…" && git push` — it redeploys in ~1 minute.


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
| `assets/logo/` | Widescreen (16:9) TV logo built from the Hall of Fame emblem: dark and light 1920x1080 stills, a 3840x2160 still, and 7-second animated MP4s at 1080p and 4K (letters converge into the lockup) |
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

## Domain & DNS

The domain `fdc-foundation.org` is registered at **GoDaddy** (nameservers `ns23/ns24.domaincontrol.com`).
The site is served by GitHub Pages, and the `CNAME` file in this repo pins the canonical hostname to
`www.fdc-foundation.org`.

### Current state (verified 2026-09-06)

**The website records are correct — the web side of DNS is healthy.**

| Record | Value | Status |
|---|---|---|
| `fdc-foundation.org` **A** | `185.199.108.153`, `.109.153`, `.110.153`, `.111.153` | ✅ correct — all four GitHub Pages IPs |
| `www.fdc-foundation.org` **CNAME** | `crysvarther.github.io` | ✅ correct — matches the `CNAME` file |

If the site itself looks down, the cause is almost certainly **not** DNS. Check
**Settings → Pages** (custom domain still set to `www.fdc-foundation.org`, "Enforce HTTPS" ticked)
and the most recent Pages deployment.

### If one device shows `DNS_PROBE_FINISHED_NXDOMAIN`

`NXDOMAIN` means "this domain does not exist." When the domain demonstrably *does* exist
everywhere else, that error is a claim made by **whatever is answering DNS for that one device** —
it is not a statement about the domain.

Verified 2026-09-06: 45/45 queries across Google (`8.8.8.8`), Cloudflare (`1.1.1.1`) and Quad9
(`9.9.9.9`) returned the correct records, with fresh full TTLs (not cached), and GoDaddy's
authoritative servers answered correctly on direct query. The `.org` registry delegation is intact.
The zone is unsigned (no DNSSEC), so a validation failure cannot be the cause either.

Note the negative-cache window is short: the SOA `MINIMUM` is **600 seconds**, so a stale
"does not exist" answer expires on its own within 10 minutes. Anything persisting longer than
that is not ordinary DNS caching — it is something on the device or its network.

Work through these in order on the affected device:

1. **Turn off any VPN or DNS-filtering app.** Android shows a small key icon in the status bar when
   a VPN is active. Ad-blockers and parental-control apps (AdGuard, Blokada, NextDNS, carrier
   "family" filters) install themselves as a local VPN and answer `NXDOMAIN` for anything they
   block or have not yet categorised — a young nonprofit domain is a common false positive.
2. **Check Android → Settings → Network & internet → Private DNS.** Set it to *Automatic* or *Off*
   and retry.
3. **Try `www.fdc-foundation.org`** as well as the bare domain. `www` is the canonical hostname;
   if `www` loads and the apex does not, the problem is narrower than a dead domain.
4. **Switch networks** — mobile data vs. Wi-Fi. If it works on one and not the other, the fault is
   that network's resolver, not the domain.
5. **Confirm globally** at [dnschecker.org](https://dnschecker.org) before changing any DNS record.

**Do not "fix" this by editing DNS records at GoDaddy.** The records are correct; changing them to
chase a single device's error will break the site for everyone else.

### ⚠️ Email is the actual DNS problem

`info@fdc-foundation.org` is published in **7 places** across `index.html`, `donate.html`, and
`hall-of-fame.html`, but the domain has **no `MX` record**, so it cannot receive mail.

This fails in a particularly quiet way. With no `MX`, sending mail servers fall back to the domain's
`A` record and try to deliver to `185.199.108.153` — a GitHub Pages web server that does not answer
on the SMTP port. The message doesn't bounce immediately; it sits in the sender's queue and bounces
days later, if at all. **A donor who emails the foundation gets silence, and so does the foundation.**

There is also a mismatch on outbound mail: a `DMARC` record is published at `p=quarantine`
(`v=DMARC1; p=quarantine; adkim=r; aspf=r; …` — GoDaddy's default), but there is **no `SPF` record**
and no DKIM. Any mail sent as `@fdc-foundation.org` therefore fails both checks and is quarantined
into recipients' spam folders by that policy.

### Fixing it

Email requires a mailbox provider — DNS alone cannot receive mail, the same way a street number on a
post office box doesn't create the box. Pick a provider first (GoDaddy's own Microsoft 365 plans,
Google Workspace, Zoho Mail, Proton, Fastmail…), then add **the `MX`, `SPF`, and `DKIM` values that
provider gives you** in **GoDaddy → My Products → Domain → DNS**. Do not copy MX hostnames from
anywhere else; they are specific to the provider and wrong values fail the same way as none.

Order of operations:

1. Choose the mailbox provider and create the `info@` mailbox.
2. Add the provider's `MX` records at the apex (`@`).
3. Add the provider's `SPF` `TXT` record at `@` (exactly one SPF record per domain).
4. Add the provider's `DKIM` record.
5. Leave the existing `DMARC` at `p=quarantine` only *after* steps 3–4 are live and verified —
   until SPF and DKIM pass, that policy is actively junking the foundation's own mail.
6. Send a test message both ways before relying on it.

**Do not touch the `A` or `CNAME` records above while doing this.** They serve the website; changing
them takes the site down. Mail records (`MX`, `TXT`) and web records (`A`, `CNAME`) coexist on the
same domain independently.

### Two optional hardening items

- **IPv6 for the apex.** GitHub Pages now publishes IPv6 addresses, but only `A` records exist here.
  Adding the four `AAAA` records (`2606:50c0:8000::153`, `8001::153`, `8002::153`, `8003::153`) at `@`
  lets IPv6-only clients reach the apex directly. Dual-stack clients are unaffected today.
- **Verify the domain with GitHub.** There is no `_github-pages-challenge-crysvarther` `TXT` record.
  Adding the one GitHub generates in **Settings → Pages → Verify domain** prevents anyone else from
  claiming `fdc-foundation.org` on GitHub Pages if this repo is ever renamed or deleted.
---

## Content sources
Program facts (the "Friend de Coup" / Jason Kaemingk tribute, 40+ year history, Mitchell Area Performing
Arts Center, Grand Champion tradition) are drawn from public reporting by the *Mitchell Republic*. Mission,
contact, tax, and Opportunities come from the FDC Foundation Committee's own brochure.
