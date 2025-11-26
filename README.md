# COA-Hub Frontend

A modern Next.js 15 application built with React 19, TypeScript, and Tailwind CSS, providing the user interface for the COA Hub platform with Google OAuth authentication.

## Tech Stack

- **Framework:** Next.js 15.4.4 (App Router)
- **React:** 19.1.0
- **TypeScript:** 5
- **UI Library:** shadcn/ui with Radix UI primitives
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand 5.0.8
- **Data Fetching:** TanStack React Query v5.90.5
- **Authentication:** NextAuth.js v5.0.0-beta.29
- **Forms:** React Hook Form + Zod validation
- **Build Tool:** Turbopack (development)

## Prerequisites

- **Node.js** (LTS version, v18+ recommended)
- **npm** package manager
- **COA Hub Backend** running on http://localhost:3000
- **Google OAuth credentials** (same as backend)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/SAMAHAN-Systems-Development/coa-hub-frontend
cd coa-hub-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Windows
copy .env.example .env.local

# Linux/Mac
cp .env.example .env.local
```

Add the following environment variables:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generated-secret>

# Google OAuth 
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### Generate NextAuth Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and use it for `NEXTAUTH_SECRET`.

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The page will auto-reload when you make changes to the code.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create optimized production build |
| `npm start` | Run production server |
| `npm run lint` | Check for linting issues |
| `npm run format` | Auto-format code with Prettier |
| `npm run format:check` | Verify code formatting |

## Project Structure

```
coa-hub-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/              # Admin dashboard
│   │   ├── api/                # API routes (NextAuth)
│   │   ├── blastzone/          # Blast zone page
│   │   ├── login/              # Login page
│   │   ├── page.tsx            # Home page
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── auth/               # Authentication components
│   │   ├── layout/             # Layout components
│   │   ├── shared/             # Shared UI components
│   │   └── ui/                 # shadcn/ui components
│   ├── lib/
│   │   ├── api/                # API client functions
│   │   ├── config/             # Configuration
│   │   ├── hooks/              # Custom React hooks
│   │   ├── stores/             # Zustand state stores
│   │   ├── types/              # TypeScript types
│   │   ├── zod/                # Zod validation schemas
│   │   └── utils.ts            # Utility functions
│   ├── hooks/                  # Additional custom hooks
│   ├── providers/              # Context providers
│   ├── auth.ts                 # NextAuth configuration
│   └── middleware.ts           # Next.js middleware
├── public/                     # Static assets
├── .env.local                  # Environment variables (not committed)
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## Development Workflow

### 1. Start Backend First
Ensure the backend API is running before starting the frontend:

```bash
cd ../coa-hub-backend
npm run start:dev
```

### 2. Start Frontend
In a separate terminal:

```bash
cd coa-hub-frontend
npm run dev
```

### 3. Code Quality
Before committing changes:

```bash
# Check formatting
npm run format:check

# Auto-fix formatting
npm run format

# Check linting
npm run lint
```

## Building for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

### Run Production Build Locally

```bash
npm start
```

The production server runs on http://localhost:3000.

### Build Output
- **Static pages** - Pre-rendered at build time
- **Dynamic pages** - Rendered on-demand
- **API routes** - Serverless functions

## Adding UI Components

This project uses shadcn/ui. To add new components:

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add form
```

Components are added to `src/components/ui/` and can be customized.

## Styling Guidelines

### Tailwind CSS
Use utility classes for styling:

```tsx
<div className="flex items-center gap-4 rounded-lg bg-slate-100 p-4">
  <Button variant="outline">Click me</Button>
</div>
```

### Custom Styles
Global styles in `src/app/globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }
}
```

## Troubleshooting

### Backend Connection Failed
- Verify backend is running on http://localhost:3000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Inspect network requests in browser DevTools

### Google OAuth Errors
- Ensure `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` match backend
- Verify redirect URI in Google Console: `http://localhost:3000/api/auth/callback/google`
- Check `NEXTAUTH_URL` is set correctly

### Environment Variables Not Loading
- Ensure `.env.local` is in the root directory
- Restart development server after changes
- Check for syntax errors in `.env.local`

### Port Already in Use
- Stop other processes using port 3000
- Or change port: `npm run dev -- -p 3001`

### Build Errors
- Clear Next.js cache: `rm -rf .next`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npx tsc --noEmit`

### Hydration Errors
- Ensure server and client render the same content
- Check for invalid HTML nesting
- Avoid using browser-only APIs during SSR

## Code Formatting

Prettier configuration in `.prettierrc`:
- Semi-colons: Yes
- Quotes: Double
- Tab width: 2 spaces
- Trailing commas: ES5
- Print width: 80

## Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

### Component Libraries
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Tailwind CSS](https://tailwindcss.com/docs)

### State Management
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [TanStack Query](https://tanstack.com/query/latest)

### Authentication
- [NextAuth.js Documentation](https://next-auth.js.org/)