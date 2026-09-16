# UniOulu ICT Study Paths Event Management Platform

An enterprise-grade academic event management platform facilitating bilateral collaboration between the Faculty of Information Technology and Electrical Engineering (ITEE) at the University of Oulu (Finland) and partner universities across Vietnam.

---

## Project Overview & Problem Statement

Academic partnerships across international institutions face significant logistical friction: fragmented event coordination, inconsistent communication channels, lack of centralized event archives, and cumbersome access control between administrators, faculty liaisons, and student attendees.

The UniOulu ICT Study Paths platform solves these challenges by providing:
- A single source of truth for academic events, symposia, research workshops, and student exchanges.
- End-to-end event lifecycle management: draft creation, rich-text agenda composition, poster asset hosting, scheduling, publication, and completion archiving.
- Secure, role-based access control (RBAC) separating administrative workflows from public attendee experiences.
- A modern showcase for official university merchandise, institutional liaisons, and collaborative research initiatives.

---

## Features & Capabilities

### 1. Public Portal & Showcase
- Hero section highlighting the Finland–Vietnam Strategic Impact Initiative with video integration.
- Dynamic Event Discovery: Keyword search with client-side filtering and sticky scroll-stacking layouts.
- Event Deep-Dives: Full event overviews, multi-session schedules, speaker bios, and venue/location details.
- Faculty Leadership & Students: Highlighted faculty profiles and student guild connections.
- Institutional Merchandise Marquee: Infinite horizontal marquee showcasing official university merchandise.

### 2. Event Administration & Management
- Structured Multi-Step Creation: Basic info, rich-text overview, schedule timeline, and poster image upload.
- Full Lifecycle Control: Update event details, toggle statuses (Upcoming, Ongoing, Finished), or delete events.
- WYSIWYG Content Authoring: Rich text editor powered by Plate.js supporting headings, lists, formatting, and media.
- Storage Integration: Direct upload and retrieval of poster assets via Supabase Storage.

### 3. Identity, Security & Role-Based Access Control
- Authentication flows: Sign up, email verification codes, login, logout, password recovery, and password resets.
- Role-based authorization: System-level roles (Admin vs. Standard User) safeguarding administrative panels.
- Users Management Portal: Administrative control to view users, inspect activity, and adjust user privileges.
- Row Level Security (RLS): Database-level isolation securing tables against unauthorized reads and mutations.

---

## Tech Stack & Prerequisites

### Core Technologies

| Layer | Technology | Purpose |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) | Server Components, Server Actions, Dynamic Routing |
| Frontend Library | React 19 | UI component architecture |
| Language | TypeScript 5 | Strict static typing and contract validation |
| Styling | Tailwind CSS 4 | Utility-first responsive design and styling |
| Animations | Framer Motion | Smooth component mount and drawer transitions |
| Rich Text Editor | Plate.js | WYSIWYG editor for event descriptions |
| Icons | Material UI Icons | Standard SVG icon set |
| Database & Auth | Supabase (PostgreSQL, SSR) | Relational database, Auth, Storage, and Row Level Security |

### Prerequisites

Ensure the following environments are installed locally:
- Node.js: v20.x or higher
- npm: v10.x or higher
- Supabase CLI (optional, for local schema migration and type generation)

---

## Repository Structure

```
event-management-app/
├── app/
│   ├── actions/                       # Next.js Server Actions partitioned by domain & method
│   │   ├── authentication/            # Auth actions: login, signup, signout, verification
│   │   ├── events/                    # Event actions: get, post, put, delete
│   │   └── profiles/                  # User profile and role management actions
│   ├── auth/                          # Supabase OAuth callback route handler
│   ├── components/                    # Global shared layout and UI components
│   │   ├── Footer.tsx                 # Site-wide footer with branding and navigation
│   │   ├── HomeEventsClient.tsx       # Interactive client event list and search
│   │   ├── MerchandiseMarquee.tsx     # Infinite loop merchandise showcase
│   │   ├── Navbar.tsx                 # Desktop floating glassmorphic navigation bar
│   │   ├── NavbarMobile.tsx           # Mobile floating pill and animated drawer
│   │   ├── NavbarServer.tsx           # Responsive navigation wrapper
│   │   └── RichTextEditor.tsx         # Plate.js rich text editor component
│   ├── context/                       # React Context providers (Loader, Notifications)
│   ├── events/                        # Event-specific route segments
│   │   ├── [id]/                      # Single event public details page
│   │   │   ├── edit/                  # Event modification client interface
│   │   │   └── components/            # Event hero, location, schedule, overview cards
│   │   └── create/                    # Event creation wizard interface
│   ├── events-management/             # Admin events dashboard, filters, and management table
│   ├── users-management/              # Admin user accounts and role permissions dashboard
│   ├── login/                         # User authentication entry page
│   ├── sign-up/                       # Registration and account verification routes
│   ├── forget-password/               # Password reset request flow
│   ├── reset-password/                # Secure password update flow
│   ├── types/                         # TypeScript definitions (database schema, domain models)
│   ├── utils/                         # Supabase client/server utilities and middleware helpers
│   ├── globals.css                    # Tailwind CSS imports and global style definitions
│   ├── layout.tsx                     # Root layout with typography, theme providers, and shell
│   └── page.tsx                       # Homepage server component
├── public/                            # Static assets (images, team portraits, merchandise)
├── supabase/                          # Supabase database migrations, policies, and queries
├── middleware.ts                      # Next.js edge middleware for Supabase session refreshing
├── package.json                       # Project manifest, dependencies, and build scripts
└── tsconfig.json                      # TypeScript compiler configuration
```

---

## Installation & Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd event-management-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run Database Migrations (Supabase)

Apply SQL migrations located in `supabase/migrations` to your Supabase project using the Supabase Dashboard SQL Editor or via the CLI:

```bash
supabase db push
```

### 5. Generate TypeScript Types (Optional)

Synchronize database schema types to `app/types/database.types.ts`:

```bash
npm run generate:types
```

### 6. Start the Development Server

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

---

## Available Scripts

- `npm run dev`: Launches Next.js in development mode with Turbopack.
- `npm run build`: Compiles the application and generates optimized static and server-rendered routes.
- `npm run start`: Runs the production server after building.
- `npm run lint`: Executes ESLint to check for syntax and styling compliance.
- `npm run generate:types`: Generates TypeScript interfaces directly from local Supabase schema.

---

## Contribution & License

### Contribution Guidelines
1. Fork the repository and create a feature branch (`git checkout -b feat/your-feature`).
2. Adhere to the Conventional Commits specification (`feat:`, `fix:`, `refactor:`, `style:`).
3. Ensure static type verification passes (`npx tsc --noEmit`) before opening a pull request.
4. Test cross-device responsiveness across desktop and mobile breakpoints.

### License
Distributed under institutional academic collaboration terms by the Faculty of Information Technology and Electrical Engineering (ITEE), University of Oulu, Finland.
