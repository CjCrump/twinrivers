# Twin Rivers Concrete — Website

Custom website built by [ChanceIT Studio](https://chanceitstudio.com) for Twin Rivers Concrete, Brighton, IL.

**Live site:** https://twinriversconcrete.com

---

## Stack
- Pure HTML / CSS / JS — no framework, no build step
- Images referenced from `images/` folder (not embedded)
- Google Maps embed for service area
- Math captcha + honeypot spam protection on contact form

## Folder Structure
```
twin-rivers-concrete/
├── index.html
├── README.md
├── .gitignore
└── images/
    ├── logo.jpg
    ├── hero.jpg                    ← hero background
    ├── patio-driveway-fountain.jpg
    ├── patio-stamp.jpg
    ├── patio-stamped.jpg
    ├── patio-pool-surround.jpg
    ├── wall-carved.jpg
    ├── wall-retaining.jpg
    ├── firepit.jpg
    ├── water-closeup.jpg
    ├── water-fountain.jpg
    ├── water-waterfall.jpg
    ├── bio-1.jpg
    ├── bio-2.jpg
    └── bio-3.jpg
```

---

## Adding a Photo to the Gallery

1. Drop the `.jpg` into the `images/` folder
2. Open `index.html` and find the gallery section you want (look for the `ADD NEW ... PHOTOS HERE` comment)
3. Copy one `gallery-thumb` block and update the `src` and `alt`:

```html
<div class="gallery-thumb" onclick="openLb(this)">
  <img src="images/your-new-photo.jpg" alt="Brief description of the job" loading="lazy">
</div>
```

4. Save, commit, push — Cloudflare auto-deploys in ~30 seconds:

```bash
git add .
git commit -m "add photo: patio job on Main St"
git push
```

---

## Deployment
Hosted on **Cloudflare Pages**, connected to this GitHub repo.
Every push to `main` triggers an automatic deploy.

---

## TODO After Caleb Approves
- [ ] Wire Formspree to contact form
  - Create free account at formspree.io
  - In `index.html`, find the `TODO: Formspree` comment in `submitForm()`
  - Add the fetch call with your form ID
- [ ] Transfer DNS from Wix to Cloudflare
  - Add `twinriversconcrete.com` as custom domain in Cloudflare Pages
  - Update nameservers on Wix registrar to Cloudflare's
- [ ] Add more project photos as Caleb sends them

---

## Client Info
| | |
|---|---|
| **Owner** | Caleb Milford |
| **Business** | Twin Rivers Concrete |
| **Location** | Brighton, IL 62012 |
| **Phone** | (618) 954-8268 |
| **Email** | twinriversconcrete@outlook.com |
| **Domain** | twinriversconcrete.com (registered on Wix) |