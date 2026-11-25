# Cura — landing page

Static site for **Cura**, a modern discovery market in Delray Beach, Florida.
Plain HTML, CSS and JavaScript with no build step, ready for GitHub and Vercel.

```
index.html              the page
assets/css/styles.css   motion, hover and responsive rules
assets/js/main.js       form submission and the "Bring Your Brand" preselect
assets/images/          optimized WebP photography
assets/brand/           favicon, touch icon, social share image
vercel.json             caching and security headers
```

## Before you deploy: connect the form

The contact form posts to [Formspree](https://formspree.io) (free tier works).

1. Create a form at formspree.io and copy its ID (it looks like `xyzabcd`).
2. In `index.html`, replace `YOUR_FORM_ID` in
   `action="https://formspree.io/f/xgakrbnz"` with your ID.
3. Submissions arrive in your inbox. "I’m a" tells you whether it’s a shopper or a brand.

Until this is done, the form shows a "not connected yet" message instead of sending.

## Deploy

1. Create a new GitHub repository and push this folder:
   ```
   git init
   git add .
   git commit -m "Cura landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR-ACCOUNT/cura-site.git
   git push -u origin main
   ```
2. In Vercel: **Add New → Project → Import** the repository.
   Framework preset: **Other**. Leave build command and output directory empty.
3. Click **Deploy**. Every push to `main` redeploys automatically.
4. Add your domain under **Project → Settings → Domains**.

## Domain

The site is set up for **https://curagrocer.com**: canonical URL, social share
image, structured data, `sitemap.xml` and `robots.txt` all point there.
In Vercel, add `curagrocer.com` and `www.curagrocer.com` under **Settings → Domains**
and follow the DNS records Vercel shows. Then submit `https://curagrocer.com/sitemap.xml`
in Google Search Console.

## Updating content

- Swap a photo: replace the file in `assets/images/` keeping the same name, or update its `src`.
- Hours, address and opening date live in the Visit section of `index.html`
  and in the structured data block in the `<head>`.

Photography and renderings are conceptual brand imagery; the footer note says so.
