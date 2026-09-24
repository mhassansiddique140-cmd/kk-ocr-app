# TaxDesk PK

A website for an online tax-filing and consultancy service in Pakistan. It has:

- **Services**: salaried and business returns, NTN, sales tax, company registration, FBR notices and more
- **Income tax calculator**: salaried and business slabs for FY 2024-25 and FY 2025-26, including the surcharge above Rs 10M, plus a quick salary check in the hero section
- **Pricing plans**, **How it works** and **FAQ** sections
- **Order form**: opens a WhatsApp chat with the customer's details already filled in (the site stores nothing)
- Layouts for mobile and desktop, with no build step or dependencies

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
npm start        # serves on http://localhost:3000
npm test         # unit tests for the tax calculator
```

## Customise

| What | Where |
|---|---|
| WhatsApp number, email, services, prices, plans, FAQs | `js/config.js` |
| Tax slabs (update after each Federal Budget) | `js/tax-rules.js` |
| Colours and branding | `:root` variables in `css/styles.css` |

The newest tax year should be the **first** key in `TAX_RULES`, because the hero's quick calculator uses it.

## Deploy

It's a static site, so you can host it free on GitHub Pages, Netlify, Vercel or Cloudflare Pages by pointing any of them at the repo root.

> The tax figures are estimates. Check slabs against the current Finance Act / FBR before going live.
