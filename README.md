# Man Amongst the Clouds — Website

A [Next.js](https://nextjs.org) website for _Man Amongst the Clouds_, a literary fantasy novel by Justin Cronk, published by Stillfire Press.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file with the following:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_live_or_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend (email)
RESEND_API_KEY=re_...

# Download token signing
DOWNLOAD_SECRET=a-random-secret-string

# Site URL
NEXT_PUBLIC_SITE_URL=https://manamongsttheclouds.com
```

## Build

```bash
npm run build
```

This first runs `scripts/build-epub.mjs` to compile the EPUB, then runs `next build`.

## Deploy

Deployed on [Vercel](https://vercel.com). Push to `main` to trigger a production deploy.
