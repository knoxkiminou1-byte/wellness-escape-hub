# Wellness Escape - Vitality Reset

A premium ocean luxury wellness program platform featuring video lessons, coaching calls, Work It assignments, and habit tracking. Created by Marti Shaw for women over 40.

## Overview

This application provides a complete 4-week wellness coaching program experience:

- **Vitality Reset** - The flagship 4-week program with 8 video lessons and 4 private coaching sessions
- **Work It** - Weekly assignments and accountability tracking with journaling prompts
- **Habit Tracker** - Weekly habit tracking with progress visualization
- **Calendly Integration** - Embedded scheduling for coaching calls
- **Stripe Payments** - One-time $497 purchase with paywall protection

## Setup Secrets

Configure these environment variables for full functionality:

| Variable | Description | Required |
|----------|-------------|----------|
| `STRIPE_SECRET_KEY` | Stripe secret key (starts with `sk_`) | Yes for payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (starts with `whsec_`) | Yes for payment confirmation |
| `STRIPE_PRICE_ID` | Stripe price ID (`price_...`) or product ID (`prod_...`) | Yes for payments |
| `VITE_CALENDLY_URL` | Calendly scheduling URL | Optional (defaults to wellnessescapecoach-info) |
| `VITE_DEV_UNLOCK` | Set to `true` to bypass payment checks for testing | Optional (default: false) |
| `DATABASE_URL` | PostgreSQL connection string | Auto-configured by Replit (memory fallback if missing) |

### Stripe Setup Notes

- If `STRIPE_PRICE_ID` starts with `price_`, it's used directly
- If `STRIPE_PRICE_ID` starts with `prod_`, the system creates a $497 one-time price automatically
- Marti's product ID: `prod_TbU9WfQBY9JX3a` (works with both formats)

### Calendly Setup

Default URL: `https://calendly.com/wellnessescapecoach-info`

For specific event types, use URLs like: `https://calendly.com/wellnessescapecoach-info/30min`

## Project Architecture

### Directory Structure
```
/wellness-escape-hub
├── client/                 # Frontend React application
│   └── src/
│       ├── components/     # UI components and Shadcn components
│       ├── hooks/          # Custom React hooks (useAuth, etc.)
│       ├── lib/            # Utility functions, content modules
│       │   ├── vitality-reset-content.ts  # Program content
│       │   ├── workItContent.ts           # Work It assignments
│       │   ├── safeStorage.ts             # Safe localStorage wrapper
│       │   └── queryClient.ts             # API client
│       ├── data/           # Static data files
│       └── pages/          # Route pages
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── billing.ts         # Stripe integration
│   ├── db.ts              # Database connection
│   ├── storage.ts         # Data storage layer
│   └── vite.ts            # Vite dev server config
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Drizzle ORM schema
└── public/                 # Static assets
    └── branding/          # Logo and brand assets
```

### Technology Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Shadcn UI
- **Routing**: wouter (lightweight router)
- **State**: TanStack Query (React Query)
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Payments**: Stripe Checkout
- **Scheduling**: Calendly embed

## Design System

### Ocean Luxury Theme
- **Primary**: Ocean teal (#2596be)
- **Background**: Soft sand and off-white gradients
- **Cards**: Glassmorphism with backdrop blur
- **Typography**: Inter (body), Playfair Display (headings)

### Key CSS Classes
- `.ocean-gradient` - Main gradient background
- `.ocean-gradient-hero` - Hero section gradient
- `.glass-card` - Glassmorphism card styling
- `.premium-card` - Elevated card with shadows
- `.page-container` - Page wrapper with bottom nav spacing
- `.page-header` - Sticky header styling
- `.bottom-nav` - Fixed bottom navigation

## Program Structure

### The 5 Pillars
1. **Prioritize** - Focus on what actually works
2. **Optimize** - Nutrition and hydration
3. **Work It** - Movement that honors where you are
4. **Energize** - Recovery, sleep, stress management
5. **Radiate** - Confidence and integration

### 4-Week Flow
- **Week 1**: Foundation & Clarity
- **Week 2**: Movement & Momentum (key momentum week)
- **Week 3**: Energize & Recover
- **Week 4**: Radiate & 90-Day Vision

### Bottom Navigation
- Home - Dashboard overview
- Program - Video lessons and weeks
- Work It - Weekly assignments
- Schedule - Calendly booking
- Habits - Weekly habit tracker
- Account - Profile settings

## Access Control

- **Preview allowed**: Landing, Program overview (locked badges on weeks)
- **Requires purchase**: Week details, Session videos, Work It, Habits, Schedule
- **Redirect behavior**: Locked content redirects to Purchase page

## Running the Project

The app runs via the "Start application" workflow: `npm run dev`

This starts both the Express backend and Vite frontend on port 5000.

### Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Push database schema changes

## Content Updates

### Program Content
Edit `client/src/lib/vitality-reset-content.ts` for:
- Week titles and descriptions
- Session video URLs
- Journal prompts
- Coaching session info

### Work It Assignments
Edit `client/src/lib/workItContent.ts` for:
- Weekly objectives
- Action steps
- Reflection prompts
- Journal prompts

## User Preferences

- Ocean luxury aesthetic throughout
- Marti's authentic voice in all copy
- Admin role determined by email containing "marti"
- Graceful fallbacks when env variables missing
