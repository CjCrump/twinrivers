# twinrivers
# Twin Rivers Concrete — Website

Custom website built by [ChanceIT Studio](https://chanceitstudio.com) for Twin Rivers Concrete, Brighton, IL.

## Stack
- Pure HTML/CSS/JS — no framework, no build step
- All images embedded as base64 (single-file deploy)
- Google Maps embed for service area
- Math captcha + honeypot spam protection on contact form

## Deployment
Hosted on Cloudflare Pages. Auto-deploys from `main` branch.

**Live site:** https://twinriversconcrete.com

## To Deploy
1. Push changes to `main`
2. Cloudflare Pages picks it up automatically (connected via GitHub integration)

## TODO Before Launch
- [ ] Wire Formspree to contact form (add endpoint to `submitForm()` in index.html)
- [ ] Confirm DNS transfer from Wix to Cloudflare
- [ ] Add remaining project photos to gallery sections as collected

## Contact Form (Formspree — when ready)
In `index.html`, find the `submitForm()` function and add:
```js
// After validation passes, before the success message:
await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: fname+' '+lname, phone, email, service, message })
});
```

## Client
- **Owner:** Caleb Milford
- **Business:** Twin Rivers Concrete
- **Location:** Brighton, IL 62012
- **Phone:** (618) 954-8268
- **Email:** twinriversconcrete@outlook.com