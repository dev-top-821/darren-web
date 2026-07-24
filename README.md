# Darren's Design Website

Simple, modern marketing site for **Darren's Design** - a full-service home design and engineering company.

**Repository:** [github.com/dev-top-821/darren-web](https://github.com/dev-top-821/darren-web)

## What's included

- Light architectural landing page
- Company story + 7-10 day turnaround highlight
- Services list with a representative photo beside each offering
- Playable AI-style video: collage of those **same** service photos + voiceover
- Local images in `assets/images/`
- Contact links for phone and email

## Preview locally

Open `index.html` in a browser, or run:

```bash
npx --yes serve .
```

## Deploy to Render

This is a static site. The code is already on GitHub - deploy it as a **Static Site** on [Render](https://render.com).

1. Open [https://dashboard.render.com](https://dashboard.render.com) and sign in.
2. Click **New +** → **Static Site**.
3. Connect GitHub and select **`dev-top-821/darren-web`**.
4. Use these settings:
   - **Branch:** `main`
   - **Build Command:** leave blank, or `echo no-build`
   - **Publish Directory:** `.`
5. Click **Create Static Site**.

You'll get a URL like `https://darren-web.onrender.com`.

## Connect a GoDaddy domain to Render

### 1. Add the domain in Render

1. Open your static site in the [Render Dashboard](https://dashboard.render.com).
2. Go to **Settings** → **Custom Domains**.
3. Click **Add Custom Domain**.
4. Add both (recommended):
   - `yourdomain.com`
   - `www.yourdomain.com`
5. Render will show the DNS records to create. Keep that page open.

### 2. Update DNS in GoDaddy

1. Sign in at [GoDaddy](https://dcc.godaddy.com/).
2. Open your domain → **DNS** → **DNS Records**.
3. Remove old conflicting records for `@` and `www` (old A / CNAME / forwarding) if they point elsewhere.
4. Add what Render shows. Typical setup:

| Type | Name/Host | Value | TTL |
| --- | --- | --- | --- |
| **A** | `@` | `216.24.57.1` (or the IP Render shows) | 1 Hour |
| **CNAME** | `www` | `your-service.onrender.com` | 1 Hour |

5. Save.

Also remove any **AAAA** records for `@` / `www` if present - they can break SSL.

### 3. Wait for SSL

- DNS can take a few minutes to a few hours.
- Back in Render, the domain status should move to **Verified** / **Certificate issued**.
- Visit `https://yourdomain.com` and `https://www.yourdomain.com`.

### Tips

- Prefer both apex + `www` in Render so either URL works.
- If GoDaddy has **Domain Forwarding** enabled to another site, turn it off or it can fight the DNS setup.
- If Render still says DNS not configured, double-check the Host and Value match **exactly** what Render listed.

You can also deploy with **New +** → **Blueprint** using the included `render.yaml`.

## Project structure

```
darren-web/
├── index.html
├── styles.css
├── script.js
├── render.yaml
└── assets/images/
```

## Notes

- Service images live in `assets/images/` and are reused in the overview video collage.
- The intro video uses the browser Speech Synthesis API - enable sound; Chrome/Edge work best.
- Contact: tap **1-510-600-1134** to call, or **darrensdesign01@gmail.com** to open mail.
