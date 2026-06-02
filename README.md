# Replix

AI-powered review response tool for local businesses. Paste any Google or Yelp review, pick a tone, get a polished reply in seconds.

## Stack

- React + Vite
- Claude API (Anthropic)
- Stripe (payments)
- Firebase (auth — plug in your config)

## Getting started

```bash
npm install
cp .env.example .env.local
# Add your API keys to .env.local
npm run dev
```

## Roadmap

- [ ] Firebase auth integration
- [ ] Stripe checkout (live)
- [ ] Google Business API sync
- [ ] Response history (DB)
- [ ] White-label agency mode
