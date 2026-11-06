This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

Cloudflare handles builds and deployment for this project.

## Local demo shopping and panel

The app includes a complete browser-local demo flow: product variants and stock limits, favorites, cart quantities, coupon `GILAN10` (10%), delivery address, simulated checkout, order history, cancellation, and buy again. Shipping is $5 below a $100 merchandise subtotal and free at or above it. The catalog retains USD pricing. Checkout never accepts card details or collects money.

Opening the authenticated panel initializes three saved places, two planned trips, two product favorites, and three sample orders with different delivery states. Initialization is idempotent and preserves existing profile edits, trips, saved places, and orders. Order/profile data is scoped by the mock account's phone number; the guest cart, coupon, and product favorites belong to the browser. Data survives refresh. Mock authentication uses session storage and expires when the tab closes.

Data access boundaries:

- `src/services/local-store.ts`: browser storage adapter and change subscriptions.
- `src/services/commerce.service.ts`: typed cart, pricing, checkout, order snapshots, order actions, and demo order fixtures.
- `src/services/panel.service.ts`: panel data, updates, and one-time sample initialization.
- `src/hooks/useCommerce.ts`: reactive read models, including updates from other tabs.

Components call the services rather than managing persistence. To connect an API, retain the typed domain models and hook snapshots, replace local reads/writes with an API-backed cache, and notify subscribers after changes. Mutations currently use synchronous local storage; an asynchronous API adapter should expose pending/error states and await the mutation before reporting success. Prices, stock, authentication, order ownership, and payment status must be verified by the future server, rather than trusted from this demo browser state.

Order items store the name, selected variant, and unit price at checkout so later catalog edits do not change historical invoices. Cart migration supports the earlier `{id, quantity}` format. Failed account writes restore the basket.

Run `npm run test:commerce` for tests covering cart migration, variant stock limits, price/discount/shipping totals, idempotent fixtures, account isolation, checkout validation, failure rollback, cancellation, repeat purchases, and persisted coupons.

## Demo roles and admin panel

Both roles use the shared phone/password/verification-code flow at `/login`. The assigned administrator phone is `09017867178` (canonical `+989017867178`), with the public demo password `Gilaneh!2026Admin`. Correct credentials and a verified, unexpired demo OTP are required before an admin session is created. Admins land on `/admin`; normal users land on `/panel`. An admin-only button in the user panel opens management. The old `/admin/login` URL redirects to the shared login, and username-based admin login is removed. Public signup cannot claim the assigned administrator account or choose its own role.

The admin panel includes overview, catalog editing, order management, users, and shop settings. Catalog edits are reflected in the storefront, product details, and basket; historical order prices remain unchanged. Orders can move from preparing to shipped or cancelled, and from shipped to delivered. Users can be activated/suspended; the fixed admin account cannot be disabled through the user list. The shop notice and display name appear in the cart.

Role and session policy live in `src/services/role-policy.ts`, authentication in `src/services/auth.service.ts`, and protected mutations in `src/services/admin.service.ts`. Run `npm run test:admin` for role, password/OTP, expiry, account activation, catalog, and order-transition tests.

These are public demo credentials and a displayed mock OTP in a static frontend. Browser roles do not provide production security. The future API must keep credentials and role assignments off the client, verify real authentication factors, and enforce authorization on every admin operation. Only an already-authorized owner or backend process should assign admin roles.
