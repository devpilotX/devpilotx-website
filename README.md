# devpilotx-website

The source for [devpilotx.com](https://devpilotx.com), the studio site for DevPilotX.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Resend (transactional email)
- Hosted on Hostinger (frontend) and a Linux VPS (database + private dashboard at profile.devpilotx.com)

## Local development

```bash
pnpm install
cp .env.example .env
pnpm prisma generate
pnpm prisma migrate dev
pnpm dev
```

## License

MIT.
