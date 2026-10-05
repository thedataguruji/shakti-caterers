# Shakti Caterers — Online Ordering Website

Full-stack ordering site for Shakti Caterers (authentic Indian mithai,
Vadodara): product catalogue, cart, Razorpay payment, mobile+OTP customer
login, order tracking, and an admin panel for staff to update order status.

Stack: Next.js 14 (App Router, TypeScript) + Prisma + PostgreSQL + Tailwind CSS.

## Running it locally (step by step)

You need [Node.js 20+](https://nodejs.org) and [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.

```bash
# 1. Copy the example environment file
cp .env.example .env

# 2. Start a local Postgres database in the background
docker compose up -d

# 3. Install dependencies
npm install

# 4. Create the database tables
npx prisma migrate dev --name init

# 5. Seed the 4 products, an admin user, and default settings
npm run seed

# 6. Start the app
npm run dev
```

Open:
- **Storefront**: http://localhost:3000
- **Admin panel**: http://localhost:3000/admin/login — login with
  `admin@shakticaterers.example` / `ChangeMe@12345` (or whatever you set as
  `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` before seeding).

## Trying the full order flow

1. Browse **Our Sweets**, add a product to your cart with a quantity in kg.
2. Go to **Cart**, fill in your name, mobile number, address, and pincode.
3. Click **Proceed to Pay**. This app is wired to Razorpay **TEST mode** —
   use any of Razorpay's published test cards, e.g. card number
   `4111 1111 1111 1111`, any future expiry, any CVV, and any OTP Razorpay's
   test modal asks for.
4. After payment, you land on the order confirmation page. Note the order
   number shown there.
5. Go to **Track Order** and look it up with that order number + the mobile
   number you entered — or log in at **My Account** with that same mobile
   number (see OTP note below) to see it under "My Orders".
6. As the business owner, log into `/admin/login`, find the order on the
   dashboard, open it, and change its status (Confirmed → Packed → Shipped →
   Delivered). Refresh the customer-facing tracking page to see the update.

### About OTP login

No real SMS is sent in this local/demo setup — that would need a paid SMS
provider account. Instead, when you request an OTP at `/account/login`, the
6-digit code is:
- printed to the terminal where `npm run dev` is running (`[DEV OTP] ...`), and
- shown directly on the login page itself in a "Dev mode" banner.

To go live with real SMS later: implement the provider call inside
`lib/otp/sendOtp.ts` (that's the only file that needs to change) and set
`DEV_EXPOSE_OTP=false` in `.env`.

### About Razorpay

The `.env.example` ships with placeholder TEST-mode-shaped keys that will
**not** actually process payments. To test real Razorpay TEST mode checkout:
1. Sign up at https://razorpay.com and switch to **Test Mode** in the dashboard.
2. Copy your Test Key ID and Key Secret into `.env` as `RAZORPAY_KEY_ID`,
   `RAZORPAY_KEY_SECRET`, and `NEXT_PUBLIC_RAZORPAY_KEY_ID`.
3. Restart `npm run dev`.

To go live later, swap in your live keys — no code changes needed.

## Sharing this with a friend

The simplest option is to run the steps above on your machine and have your
friend use it over the same local network, or share your screen.

If you want a temporary public link without deploying anywhere:
```bash
npx ngrok http 3000
```
This gives you a public URL that tunnels to your local server — good for a
quick demo, not for production use.

For a longer-lived shareable deployment, you could push this repo to a free
[Vercel](https://vercel.com) project with a free [Neon](https://neon.tech)
Postgres database (set the same environment variables there). That's a
separate step and isn't required to use this app locally.

## Deploying for real later

Standard GoDaddy shared/cPanel hosting cannot run Node.js or PostgreSQL —
this app needs a Node-friendly host. Options: a VPS (including a GoDaddy VPS
plan), Railway, Render, or similar.

1. Build the production image: `docker build -t shakti-caterers .`
2. Run it with your production `.env` values (real Postgres URL, real
   Razorpay live keys, a strong `SESSION_SECRET`, `DEV_EXPOSE_OTP=false`,
   and a real SMS provider wired into `lib/otp/sendOtp.ts`).
3. Run `npx prisma migrate deploy` against the production database once
   before first boot.
4. Point your GoDaddy-registered domain's DNS at wherever the app is hosted.

## Project structure

- `app/` — pages and API routes (Next.js App Router)
- `components/` — shared UI, layout, product, cart, order, and admin components
- `lib/` — Prisma client, auth/session helpers, OTP, pricing, Razorpay, validation
- `prisma/schema.prisma` — database schema
- `prisma/seed.ts` — seeds the 4 products, admin user, and default settings
