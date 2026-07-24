# Darren's Design Website

Simple, modern marketing site for **Darren's Design** - a full-service home design and engineering company.

## What's included

- Light architectural landing page
- Company story + 7-10 day turnaround highlight
- Services list with a representative photo beside each offering
- Playable AI-style video: collage of those **same** service photos + voiceover
- Local images in `assets/images/`
- Contact inquiry form (front-end only)

## Preview locally

Open `index.html` in a browser, or run:

```bash
npx --yes serve .
```

## Deploy to Render

This is a static site. Use a **Static Site** on [Render](https://render.com).

### 1. Push to GitHub

From `i:\Kyo\Darren` in PowerShell:

```powershell
git init
git add .
git commit -m "Initial Darren's Design site"
```

Create an empty repo on GitHub, then:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Create Static Site on Render

1. Open [https://dashboard.render.com](https://dashboard.render.com) and sign in.
2. Click **New +** → **Static Site**.
3. Connect GitHub and select this repo.
4. Use these settings:
   - **Branch:** `main`
   - **Build Command:** leave blank, or `echo no-build`
   - **Publish Directory:** `.`
5. Click **Create Static Site**.

You’ll get a URL like `https://darrens-design.onrender.com`.

### 3. Custom domain (optional / GoDaddy)

In Render → your site → **Settings** → **Custom Domains**, add the domain, then add the DNS records Render shows in GoDaddy.

You can also deploy with **New +** → **Blueprint** using the included `render.yaml`.

## Notes

- Service images live in `assets/images/` and are reused in the overview video collage.
- The intro video uses the browser Speech Synthesis API - enable sound; Chrome/Edge work best.
- Contact form is front-end only until wired to email (Formspree, Getform, etc.).
