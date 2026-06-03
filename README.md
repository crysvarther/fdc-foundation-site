# Friend de Coup Foundation — Website

A donor-recruitment website for the **Friend de Coup (FDC) Foundation**, supporting
Mitchell High School's award-winning show choir in Mitchell, South Dakota.

It's a fast, dependency-free **static site** (plain HTML/CSS/JS) — it works by opening
the files directly and can be hosted anywhere (GitHub Pages, Netlify, Vercel, or any web host).

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Main landing page: hero, mission, impact, legacy/story, giving levels, ways to give, FAQ, contact |
| `donate.html` | Focused donation page with amount selector and impact breakdown |
| `assets/styles.css` | All styling (design system, responsive, animations) |
| `assets/script.js` | Interactions: nav, scroll reveal, count-up stats, FAQ, donate selectors |
| `assets/crest.svg` | Logo / favicon (FDC shield crest) |

## View it locally

Just double-click `index.html`, **or** run a tiny local server from this folder:

```powershell
# Python (if installed)
python -m http.server 8000
# then open http://localhost:8000
```

---

## ✅ Before you launch — things to replace

Search the files for these placeholders and swap in your real details. Anything
marked in **red** on the site (the `.todo` styling) is a placeholder.

### 1. Donation link  (most important)
The Donate buttons currently show a reminder popup. Connect them to your real provider:

- In **`donate.html`**, find the button with `href="#donate-placeholder"` and change it to
  your live URL, e.g. a **GoFundMe / Givebutter / PayPal / Stripe / school portal** link:
  ```html
  <a href="https://YOUR-DONATION-LINK" class="btn btn--gold btn--block btn--lg">Continue to Secure Checkout</a>
  ```
- The `data-donate` attribute and the placeholder handler in `assets/script.js` can then be removed.
- The "Donate" buttons in `index.html` already point to `donate.html`, so they'll flow through automatically.

> A static site can't process payments by itself — it needs a payment provider. The
> easiest path for a school group is a hosted page (Givebutter and GoFundMe are free to start).

### 2. Contact details
In **`index.html`** (the `#contact` section and footer) and **`donate.html`** footer, replace:
- Email: `info@frienddecoupfoundation.org`
- Phone: `(605) 000-0000`
- Mailing address: `Mitchell, SD 57301`
- Social links (Instagram is set to `@mitchellfrienddecoup` — update Facebook/YouTube if needed)

### 3. Contact form
The form in `index.html` is a demo (shows a thank-you popup). To collect real messages, point it at
a free form service like **Formspree** or **Netlify Forms**:
```html
<form class="form" id="give-form" action="https://formspree.io/f/YOUR_ID" method="POST">
```
and remove the `e.preventDefault()` demo handler in `assets/script.js`.

### 4. Tax / legal details
The FAQ and donate page reference **501(c)(3) status and EIN** as "to be confirmed."
Once verified, update those lines so donors know gifts are tax-deductible, and add your EIN.

### 5. Numbers & goals (optional)
Sample figures you may want to make exact:
- Hero fundraising goal (`$34,000 / $50,000` and the `data-fill="68"` progress bar in `index.html`)
- Stat bar (`41` seasons, `2000+` alumni, `50+` performers) — edit the `data-count` values
- Giving level amounts in the `#tiers` section and on `donate.html`

### 6. Photos (recommended)
The site uses an elegant text-and-color design with no photos yet. Adding real performance
photos will make it far more compelling. Drop images in `assets/` and place them in the hero,
legacy, and impact sections. (Your `FDC foundation v2.pdf` likely has usable imagery.)

---

## Content sources
Program facts (41st season, the meaning of "Friend de Coup" / Jason Kaemingk tribute, Mitchell
Area Performing Arts Center, Grand Champion tradition) are drawn from public reporting by the
*Mitchell Republic* and the program's public profiles. Verify specifics before printing.

## Hosting in 2 minutes (GitHub Pages)
1. Push this folder to a GitHub repo.
2. Repo **Settings → Pages → Build from branch → `main` / root**.
3. Your site goes live at `https://<username>.github.io/<repo>/`.
