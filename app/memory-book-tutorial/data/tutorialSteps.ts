/**
 * PURPOSE:
 * Structured tutorial step definitions for the Memory Book development setup guide.
 * All content is in English, covering repository cloning, Node.js LTS, Docker, pnpm,
 * dependency installation, Supabase CLI local database setup, and dev server validation.
 */

export interface CommandSnippet {
  label?: string
  os?: 'all' | 'macos' | 'windows' | 'linux'
  command: string
  description?: string
  output?: string
}

export interface CalloutItem {
  type: 'tip' | 'info' | 'warning' | 'important'
  title: string
  message: string
}

export interface PlatformGuide {
  platform: string
  os: 'macos' | 'windows' | 'linux' | 'all'
  instructions: string
  badge?: string
  commands?: CommandSnippet[]
}

export interface MethodOption {
  id: string
  title: string
  badge?: string
  description?: string
  websiteUrl?: string
  websiteButtonText?: string
  platformGuides?: PlatformGuide[]
  commands?: CommandSnippet[]
  bulletPoints?: string[]
}

export interface StepSection {
  title: string
  description?: string
  subtext?: string
  commands?: CommandSnippet[]
  callouts?: CalloutItem[]
  bulletPoints?: string[]
  options?: MethodOption[]
}

export interface KeyConceptExplanation {
  name: string
  role: string
  explanation: string
}

export interface CodingTask {
  taskNumber: number
  file: string
  usedBy: string
  purpose: string
  keyConcepts: KeyConceptExplanation[]
  starterCode: string
  solutionCode: string
  solutionExplanation: string
}

export interface TutorialStep {
  id: number
  stepNumber: number
  badge: string
  title: string
  shortTitle: string
  summary: string
  estimatedTime: string
  category?: 'setup' | 'task'
  sections: StepSection[]
  codingTask?: CodingTask
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 1,
    stepNumber: 1,
    badge: 'Account & Repository',
    title: 'GitHub Authentication, Git CLI & Repository Cloning',
    shortTitle: 'GitHub & Git',
    summary:
      'Set up your GitHub account, install the Git command-line tools, authenticate via CLI, and clone the Memory Book repository.',
    estimatedTime: '3-5 mins',
    sections: [
      {
        title: '1. Create or Sign In to Your GitHub Account',
        description:
          'To collaborate and access code repositories, you need an active GitHub account.',
        bulletPoints: [
          'Visit https://github.com and log in with your credentials.',
          'If you do not have an account yet, click "Sign up" and complete the verification process.',
        ],
      },
      {
        title: '2. Install Git and GitHub CLI',
        description:
          'Ensure Git and the official GitHub CLI (gh) are installed on your machine so you can manage version control and authentication smoothly.',
        commands: [
          {
            label: 'macOS (Homebrew)',
            os: 'macos',
            command: 'brew install git gh',
            description: 'Install both Git and GitHub CLI via Homebrew package manager.',
          },
          {
            label: 'Windows (winget)',
            os: 'windows',
            command: 'winget install --id Git.Git -e && winget install --id GitHub.cli -e',
            description: 'Install Git and GitHub CLI via Windows Package Manager.',
          },
          {
            label: 'Linux (Debian / Ubuntu)',
            os: 'linux',
            command: 'sudo apt update && sudo apt install -y git gh',
            description: 'Install Git and GitHub CLI from the standard apt repository.',
          },
        ],
      },
      {
        title: '3. Configure Git Identity (Username & Email)',
        description:
          'Configure your Git committer name and email address. Git attaches this information to every commit you make so GitHub can properly attribute your code contributions.',
        commands: [
          {
            label: 'Global Configuration (Recommended)',
            command: `git config --global user.name "username"
git config --global user.email "example@gmail.com"`,
            description:
              'Sets your default name and email across all Git repositories on your computer. Replace "username" and "example@gmail.com" with your real details.',
          },
          {
            label: 'Local Repository Configuration (Optional)',
            command: `git config user.name "username"
git config user.email "example@gmail.com"`,
            description:
              'Sets your committer name and email specifically for the active repository only (without the --global flag).',
          },
        ],
        callouts: [
          {
            type: 'tip',
            title: 'Verify Your Git Config',
            message:
              'To confirm your settings have been saved, run: git config user.name && git config user.email. The terminal will print your configured username and email address.',
          },
        ],
      },
      {
        title: '4. Authenticate with GitHub CLI',
        description:
          'Log in to your GitHub account directly from your terminal using the interactive GitHub CLI prompt. This eliminates the need for manual personal access token (PAT) configuration.',
        commands: [
          {
            label: 'Login Command',
            command: 'gh auth login',
            description:
              'Select "GitHub.com" -> "HTTPS" -> "Yes" for Git credentials -> "Login with a web browser". Copy the one-time code shown in terminal and authorize in your browser.',
            output: `? What account do you want to log into? GitHub.com
? What is your preferred protocol for Git operations on this host? HTTPS
? Authenticate Git with your GitHub credentials? Yes
? How would you like to authenticate GitHub CLI? Login with a web browser
! First copy your one-time code: 1234-ABCD
- Press Enter to open github.com/login/device in your browser...
✓ Authentication complete.
- gh config set -h github.com git_protocol https
✓ Configured git protocol
✓ Logged in as your-username`,
          },
        ],
      },
      {
        title: '5. Clone the Memory Book Repository',
        description:
          'Clone the official Memory Book project into your preferred workspace directory.',
        commands: [
          {
            label: 'Clone Repository',
            command: 'git clone https://github.com/NguyenKhangPhuc/memory-book.git',
            description: 'Downloads the complete source code, git history, and submodules.',
            output: `Cloning into 'memory-book'...
remote: Enumerating objects: 382, done.
remote: Counting objects: 100% (382/382), done.
remote: Compressing objects: 100% (240/240), done.
remote: Total 382 (delta 156), reused 350 (delta 130)
Receiving objects: 100% (382/382), 1.20 MiB | 4.80 MiB/s, done.
Resolving deltas: 100% (156/156), done.`,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    stepNumber: 2,
    badge: 'Runtime Environment',
    title: 'Install the Latest Node.js LTS Environment',
    shortTitle: 'Node.js LTS',
    summary:
      'Install the current Long Term Support (LTS) release of Node.js required to execute Next.js 16 and modern JavaScript tooling.',
    estimatedTime: '2-4 mins',
    sections: [
      {
        title: '1. Recommended Node.js Version',
        description:
          'Memory Book requires Node.js v20.x or higher (Node.js 22.x LTS is strongly recommended for optimal performance with Next.js 16 and React 19).',
        bulletPoints: [
          'Node.js 22.x LTS provides active LTS support, faster startup times, and native ECMAScript module stability.',
          'Using a version manager such as fnm or nvm makes switching between project versions effortless.',
        ],
      },
      {
        title: '2. Installation Methods (Choose an Approach)',
        description:
          'You can download the official graphical installer directly from the Node.js website, or install via terminal using a version manager / package manager.',
        options: [
          {
            id: 'website',
            title: 'Option A: Direct Download from Official Website (Recommended GUI)',
            badge: 'Official Installer',
            description:
              'Download the official prebuilt installer directly from the Node.js website. Ideal for standard installation without learning CLI package managers.',
            websiteUrl: 'https://nodejs.org/en/download',
            websiteButtonText: 'Visit nodejs.org Downloads',
            bulletPoints: [
              'Make sure to choose the "LTS" (Long Term Support) tab (e.g., Node.js 22.x LTS).',
              'The installer automatically bundles and configures both Node.js and npm in your system PATH.',
            ],
            platformGuides: [
              {
                platform: 'macOS',
                os: 'macos',
                badge: '.pkg Installer',
                instructions:
                  'Download the macOS Installer (.pkg). Open the downloaded package and follow the guided wizard. It installs Node.js and npm into /usr/local/bin automatically.',
              },
              {
                platform: 'Windows',
                os: 'windows',
                badge: '.msi Installer (64-bit)',
                instructions:
                  'Download the Windows Installer (.msi). Run the wizard, accept the license, and leave all defaults checked — including the "Add to PATH" option.',
              },
              {
                platform: 'Linux',
                os: 'linux',
                badge: 'Prebuilt Binaries',
                instructions:
                  'Download Prebuilt Binaries (.tar.xz) from the download page and extract into /usr/local, or use the terminal package repository in Option B.',
              },
            ],
          },
          {
            id: 'terminal',
            title: 'Option B: Terminal / Version Manager (CLI)',
            badge: 'CLI & Version Managers',
            description:
              'Install Node.js using fnm/nvm version manager or your system package manager (Homebrew, winget, or NodeSource).',
            commands: [
              {
                label: 'Using fnm / nvm (Recommended for Developers - All OS)',
                os: 'all',
                command: 'nvm install --lts && nvm use --lts',
                description:
                  'Installs the newest LTS version and switches your active shell to use it.',
              },
              {
                label: 'macOS (Homebrew)',
                os: 'macos',
                command: 'brew install node@22 && brew link node@22',
                description: 'Installs Node.js 22 LTS via Homebrew.',
              },
              {
                label: 'Windows (winget)',
                os: 'windows',
                command: 'winget install OpenJS.NodeJS.LTS',
                description:
                  'Installs the official Node.js LTS MSI package via Windows Package Manager.',
              },
              {
                label: 'Linux (Debian / Ubuntu via NodeSource)',
                os: 'linux',
                command:
                  'curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt install -y nodejs',
                description: 'Installs Node.js 22 LTS directly via NodeSource PPA.',
              },
            ],
          },
        ],
      },
      {
        title: '3. Verify Your Node.js & npm Installation',
        description: 'Check that Node.js and its bundled npm binary are properly linked in your PATH.',
        commands: [
          {
            label: 'Verify Version',
            command: 'node -v && npm -v',
            description: 'Prints installed Node.js and npm versions.',
            output: `v22.14.0
10.9.2`,
          },
        ],
        callouts: [
          {
            type: 'info',
            title: 'Node Version Check',
            message:
              'Ensure the output is at least v20.0.0. If you see an older version (e.g., v18 or v16), run "nvm use 22" or update your system PATH.',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    stepNumber: 3,
    badge: 'Container Virtualization',
    title: 'Install Docker & Docker Compose',
    shortTitle: 'Docker Setup',
    summary:
      'Install Docker Engine and Docker Compose to power the local Supabase stack (PostgreSQL, GoTrue Auth, Storage, and Studio).',
    estimatedTime: '5-8 mins',
    sections: [
      {
        title: '1. Why Docker is Essential for Local Development',
        description:
          'Supabase uses Docker under the hood to mirror production cloud features locally. When you run local Supabase, Docker spins up a complete microservice architecture:',
        bulletPoints: [
          'PostgreSQL 17 database instance with pgvector and extensions.',
          'GoTrue Authentication service for session handling.',
          'Realtime server, Storage engine, and Kong API gateway.',
          'Local Supabase Studio web dashboard (accessible at localhost:54323).',
        ],
      },
      {
        title: '2. Installation Methods (Choose an Approach)',
        description:
          'You can download the Docker Desktop installer directly from the official Docker website, or install via terminal package managers.',
        options: [
          {
            id: 'website',
            title: 'Option A: Direct Download from Official Website (Docker Desktop GUI)',
            badge: 'Official Installer',
            description:
              'Download Docker Desktop directly from the Docker portal. Includes Docker Engine, Docker CLI, Docker Compose v2, and the visual desktop management dashboard.',
            websiteUrl: 'https://www.docker.com/products/docker-desktop/',
            websiteButtonText: 'Visit docker.com Downloads',
            bulletPoints: [
              'Docker Desktop provides a convenient graphical dashboard to inspect containers, images, and volumes.',
              'Docker Compose is bundled natively with Docker Desktop — no separate installation needed.',
            ],
            platformGuides: [
              {
                platform: 'macOS',
                os: 'macos',
                badge: '.dmg Package',
                instructions:
                  'Click "Download for Mac" — choose "Mac with Apple Chip" (Apple Silicon M1/M2/M3/M4) or "Mac with Intel chip". Open Docker.dmg and drag the Docker icon to your Applications folder.',
              },
              {
                platform: 'Windows',
                os: 'windows',
                badge: '.exe Installer',
                instructions:
                  'Click "Download for Windows" (Docker Desktop Installer.exe). During installation, ensure the option "Use WSL 2 instead of Hyper-V" is checked for best performance. Restart your machine if prompted.',
              },
              {
                platform: 'Linux',
                os: 'linux',
                badge: '.deb / .rpm Package',
                instructions:
                  'Download the official Docker Desktop package (.deb for Ubuntu/Debian or .rpm for Fedora) from the Docker docs, or install Docker Engine via terminal in Option B.',
              },
            ],
          },
          {
            id: 'terminal',
            title: 'Option B: Terminal / Package Manager (CLI)',
            badge: 'CLI / Package Managers',
            description:
              'Install Docker Desktop or Docker Engine directly through terminal commands without downloading from a browser.',
            commands: [
              {
                label: 'macOS (Homebrew Cask)',
                os: 'macos',
                command: 'brew install --cask docker',
                description: 'Downloads and installs Docker Desktop for macOS via Homebrew.',
              },
              {
                label: 'Windows (winget)',
                os: 'windows',
                command: 'winget install Docker.DockerDesktop',
                description: 'Installs Docker Desktop with WSL 2 backend via Windows Package Manager.',
              },
              {
                label: 'Linux (Debian / Ubuntu)',
                os: 'linux',
                command: 'sudo apt update && sudo apt install -y docker.io docker-compose-plugin',
                description: 'Installs Docker Engine and the modern Docker Compose v2 plugin via apt.',
              },
            ],
          },
        ],
        callouts: [
          {
            type: 'important',
            title: 'Launch Docker Daemon',
            message:
              'After installation, open Docker Desktop and wait until the status indicator turns green ("Engine running"). On Linux, ensure the service is active with: sudo systemctl start docker',
          },
        ],
      },
      {
        title: '3. Verify Docker & Docker Compose',
        description: 'Run the commands below to confirm the Docker daemon is responding.',
        commands: [
          {
            label: 'Check Docker Status',
            command: 'docker --version && docker compose version',
            description: 'Outputs the installed Docker and Docker Compose versions.',
            output: `Docker version 27.5.1, build 9f9e405
Docker Compose version v2.32.4`,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    stepNumber: 4,
    badge: 'Package Manager',
    title: 'Install the pnpm Package Manager',
    shortTitle: 'pnpm',
    summary:
      'Install pnpm, the fast, disk space-efficient package manager required by the Memory Book workspace.',
    estimatedTime: '1-2 mins',
    sections: [
      {
        title: '1. Why pnpm is Required',
        description:
          'Memory Book defines "pnpm@11.3.0" in its packageManager manifest. pnpm utilizes content-addressable storage with hard links, preventing duplicate node_modules across projects while ensuring strict dependency resolution.',
      },
      {
        title: '2. Installation Methods',
        description:
          'You can install pnpm via Node.js Corepack, the official standalone script, or npm:',
        commands: [
          {
            label: 'Method A: Corepack (Standard with Node.js)',
            os: 'all',
            command: 'corepack enable && corepack prepare pnpm@latest --activate',
            description:
              'Activates Node’s built-in package manager orchestrator to manage pnpm automatically.',
          },
          {
            label: 'Method B: Global npm Install (Alternative)',
            os: 'all',
            command: 'npm install -g pnpm',
            description: 'Installs pnpm globally across your system.',
          },
          {
            label: 'Method C: macOS (Homebrew)',
            os: 'macos',
            command: 'brew install pnpm',
            description: 'Installs pnpm via Homebrew.',
          },
          {
            label: 'Method D: Windows (PowerShell)',
            os: 'windows',
            command: 'iwr https://get.pnpm.io/install.ps1 -useb | iex',
            description: 'Executes the official standalone Windows PowerShell installation script.',
          },
        ],
      },
      {
        title: '3. Verify pnpm Installation',
        description: 'Ensure the pnpm executable is available globally in your terminal.',
        commands: [
          {
            label: 'Verify Version',
            command: 'pnpm -v',
            description: 'Displays the current version of pnpm.',
            output: `11.3.0`,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    stepNumber: 5,
    badge: 'Dependencies',
    title: 'Navigate to Repository & Install Dependencies',
    shortTitle: 'Dependencies',
    summary:
      'Change directory into the cloned project and install all required frontend and backend npm packages.',
    estimatedTime: '2-3 mins',
    sections: [
      {
        title: '1. Navigate into the Project Root',
        description:
          'Enter the directory where you cloned the repository in Step 1.',
        commands: [
          {
            label: 'Change Directory',
            command: 'cd memory-book',
            description: 'Move into the memory-book project folder.',
          },
        ],
      },
      {
        title: '2. Install Dependencies with pnpm',
        description:
          'Run the install command to download all packages specified in package.json and verify checksums against pnpm-lock.yaml.',
        commands: [
          {
            label: 'Install Packages',
            command: 'pnpm install',
            description:
              'Installs Next.js 16, React 19, Tailwind CSS v4, Framer Motion, react-pageflip, and Supabase client libraries.',
            output: `Lockfile is up to date, resolution step is skipped
Packages: +428
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 428, reused 428, downloaded 0, added 428, done

Done in 4.2s`,
          },
        ],
        callouts: [
          {
            type: 'tip',
            title: 'Frozen Lockfile Tip',
            message:
              'In continuous integration (CI) or production setups, run "pnpm install --frozen-lockfile" to guarantee 100% reproducible builds matching pnpm-lock.yaml.',
          },
        ],
      },
    ],
  },
  {
    id: 6,
    stepNumber: 6,
    badge: 'Database & Backend',
    title: 'Set Up Supabase CLI & Local Database',
    shortTitle: 'Supabase CLI',
    summary:
      'Install Supabase CLI, start local Docker containers, apply database migrations with db reset, and configure local environment variables.',
    estimatedTime: '4-6 mins',
    sections: [
      {
        title: '1. Install Supabase CLI',
        description:
          'The Supabase CLI lets you manage PostgreSQL migrations, local authentication, and seed data directly from your terminal. Since you already installed Node.js and pnpm in earlier steps, installing globally via npm or pnpm is the fastest cross-platform method.',
        commands: [
          {
            label: 'Method A: Via npm (Recommended & Cross-Platform)',
            os: 'all',
            command: 'npm install -g supabase',
            description: 'Installs the Supabase CLI globally on any platform with Node.js.',
          },
          {
            label: 'Method B: Via pnpm (Fast Global Install)',
            os: 'all',
            command: 'pnpm add -g supabase',
            description: 'Installs the Supabase CLI globally using the pnpm package manager.',
          },
          {
            label: 'Method C: macOS / Linux (Homebrew)',
            os: 'macos',
            command: 'brew install supabase/tap/supabase',
            description: 'Alternative installation via Homebrew package tap.',
          },
          {
            label: 'Method D: Windows (Scoop)',
            os: 'windows',
            command: 'scoop bucket add supabase https://github.com/supabase/scoop-bucket.git && scoop install supabase',
            description: 'Alternative installation on Windows via Scoop.',
          },
          {
            label: 'Method E: Via npx (No Global Install Needed)',
            os: 'all',
            command: 'npx supabase --version',
            description: 'Run Supabase commands on-demand without installing globally.',
          },
        ],
        callouts: [
          {
            type: 'tip',
            title: 'Verify Supabase CLI Installation',
            message:
              'Once installed, verify that the CLI is accessible in your PATH by running: supabase --version. It should print the installed version (e.g. 2.x.x).',
          },
        ],
      },
      {
        title: '2. Start Local Supabase Stack',
        description:
          'Launch local Supabase services in Docker. Ensure your Docker daemon is active before running this command.',
        commands: [
          {
            label: 'Start Containers',
            command: 'supabase start',
            description:
              'Pulls and boots up Docker images for PostgreSQL, Studio, Storage, Auth, and Kong gateway.',
            output: `Started supabase local development setup.
         API URL: http://127.0.0.1:54321
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  publishable key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhbGVudGluZS1tZW1vcnktYm9vayIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzg4MzcwMDAwLCJleHAiOjIwOTM5NDYwMDB9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
          },
        ],
        callouts: [
          {
            type: 'important',
            title: 'Publishable Key Notice',
            message:
              'Take note of the "publishable key" (also referenced as anon key) printed in your terminal. This is the safe public API key used by client-side browser requests to authenticate with your local Supabase instance.',
          },
        ],
      },
      {
        title: '3. Reset Local Database and Apply Migrations',
        description:
          'Apply all SQL migrations located in supabase/migrations/ to create tables, enable Row Level Security (RLS) policies, and configure storage buckets.',
        commands: [
          {
            label: 'Reset Database',
            command: 'supabase db reset',
            description:
              'Recreates the local public schema, applies all migration scripts, and seeds initial test data.',
            output: `Resetting local database...
Applying migration 20260902081732_table_rls_setting_up.sql...
Finished supabase db reset on branch main.`,
          },
        ],
      },
      {
        title: '4. Configure Environment Variables (.env.local)',
        description:
          'Create a .env.local file in the project root to connect the Next.js app to your local Supabase instance:',
        commands: [
          {
            label: 'Create .env.local',
            command: `cat << 'EOF' > .env.local
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-local-publishable-key-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-publishable-key-here
EOF`,
            description:
              'Replace the publishable key value with the key printed from "supabase start".',
          },
        ],
        callouts: [
          {
            type: 'info',
            title: 'Supabase Studio Access',
            message:
              'You can manage tables and upload images visually by opening the local Supabase Studio dashboard at http://127.0.0.1:54323 in your browser.',
          },
        ],
      },
    ],
  },
  {
    id: 7,
    stepNumber: 7,
    badge: 'Run & Verify',
    title: 'Run Development Server & Verify Application',
    shortTitle: 'Run & Verify',
    summary:
      'Start the local Next.js development server with pnpm dev, open the application in your browser, and verify all features.',
    estimatedTime: '2-3 mins',
    sections: [
      {
        title: '1. Start Next.js Development Server',
        description:
          'Launch the Next.js Turbo / webpack development compiler with Hot Module Replacement (HMR).',
        commands: [
          {
            label: 'Start Dev Server',
            command: 'pnpm dev',
            description: 'Runs next dev on port 3000.',
            output: `  ▲ Next.js 16.3.4
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Starting...
 ✓ Ready in 1.4s`,
          },
        ],
      },
      {
        title: '2. Open in Browser & Verify',
        description: 'Navigate to the local web application to inspect the flipbook interface:',
        bulletPoints: [
          'Open http://localhost:3000 in Chrome, Safari, or Firefox.',
          'Verify that the interactive 3D memory flipbook renders properly on screen.',
          'Try creating a memory collection or flipping through the sample pages.',
          'Check the browser developer console (F12) to ensure there are no unhandled connection errors.',
        ],
      },
      {
        title: '3. Troubleshooting Common Pitfalls',
        description: 'If you encounter unexpected issues, check the following checklist:',
        callouts: [
          {
            type: 'warning',
            title: 'Port 3000 or 54321 Already in Use',
            message:
              'If port 3000 is occupied by another application, pass a different port: pnpm dev -p 3001. If port 54321 is in use, run "supabase stop" then restart.',
          },
          {
            type: 'warning',
            title: 'Docker Daemon Not Running',
            message:
              'If supabase start fails with "Cannot connect to the Docker daemon", open Docker Desktop and wait until it finishes booting before retrying.',
          },
          {
            type: 'tip',
            title: 'Generating TypeScript Database Types',
            message:
              'Whenever you modify the database schema, run: pnpm generate:types to refresh app/types/database.types.ts automatically.',
          },
        ],
      },
    ],
  },
  {
    id: 8,
    stepNumber: 8,
    category: 'task',
    badge: 'Coding Task 1',
    title: 'Task 1: Create Collection (task-1.ts)',
    shortTitle: 'Task 1: Create',
    summary:
      'Map form inputs to the database payload, execute the createNewCollection Server Action in Supabase, and handle UI notifications and state updates.',
    estimatedTime: '5-10 mins',
    codingTask: {
      taskNumber: 1,
      file: 'components/tasks/task-1.ts',
      usedBy: 'CreateCollectionModal.tsx (app/components/CreateCollectionModal.tsx)',
      purpose:
        'Bridges user input from the collection modal to the Supabase database. It constructs an insert payload, calls the createNewCollection Server Action, handles potential errors, and returns a new CollectionWithItems object to update UI state immediately.',
      keyConcepts: [
        {
          name: 'data: CreateCollectionFormInputs',
          role: 'Pre-Validated Form Input Object',
          explanation:
            'Contains user inputs from React Hook Form. Optional fields (description, dates) need sanitizing before database insertion.',
        },
        {
          name: 'payload: CollectionInsert',
          role: 'Database Schema Contract',
          explanation:
            'Matches the Supabase table schema. Converts empty optional fields to SQL NULL and initializes poster_url to null.',
        },
        {
          name: 'poster_url: null',
          role: 'Initial Asset State',
          explanation:
            'Initializes collection metadata without a cover image. Poster uploads are handled separately in Task 7.',
        },
        {
          name: 'createNewCollection(payload)',
          role: 'Next.js Server Action Execution',
          explanation:
            'Secure server action that inserts the record into Supabase with server-side Row Level Security (RLS) enforcement.',
        },
        {
          name: 'res?.error & Error Handling',
          role: 'Resilience and User Feedback',
          explanation:
            'Catches database or network errors, alerts the user via showNotification, and prevents the modal from closing on failure.',
        },
        {
          name: 'createdCol: CollectionWithItems',
          role: 'Client-Side Model Representation',
          explanation:
            'Attaches collection_items: [] to the returned record to fulfill the CollectionWithItems interface without an extra query.',
        },
        {
          name: 'Optimistic Fallback (Mock/Offline)',
          role: 'Graceful Degradation',
          explanation:
            'Constructs a fallback object with a temporary timestamp ID if the server returns no data in mock/offline mode.',
        },
        {
          name: 'onCreated?(createdCol)',
          role: 'Parent React State Synchronization',
          explanation:
            'Notifies parent components to prepend the new collection to client state for instant UI reactivity.',
        },
      ],
      starterCode: `/**
 * ============================================================================
 * Task 1: Create Collection
 * ============================================================================
 *
 * @file task-1.ts
 * @module components/tasks/task-1
 *
 * @description
 * This task handles creating a new memory collection in the application.
 * Form validation (such as ensuring the collection name is provided) is handled
 * declaratively upfront by React Hook Form (\`register\`, \`required\`).
 * This function receives the pre-validated form data, constructs the database
 * payload, invokes a Next.js Server Action to persist the collection in Supabase,
 * and returns a fully formed CollectionWithItems object ready for client-side state updates.
 *
 * NOTE: Initial creation does not include a poster image; cover images are uploaded
 * and managed separately via Task 7 (\`editCollectionPoster\`).
 *
 * @usedBy
 * - \`CreateCollectionModal.tsx\` (\`app/components/CreateCollectionModal.tsx\`)
 *   Invoked inside \`handleSubmit(onSubmit)\` when the user submits the creation form.
 */

import { CollectionInsert, CollectionWithItems } from '../../types/collection'
import { createNewCollection } from '../../actions/collection'

/**
 * Form input values received from the React Hook Form collection creation modal.
 * Upstream validation (e.g. required name) is handled by React Hook Form.
 */
export interface CreateCollectionFormInputs {
  /** The title/name of the collection (required, validated by React Hook Form) */
  name: string
  /** An optional description or romantic note for this collection */
  description?: string
  /** Optional start date string in YYYY-MM-DD format */
  start_time?: string
  /** Optional end date string in YYYY-MM-DD format */
  end_time?: string
}

/**
 * Creates a new collection by mapping form inputs to a database payload, executing
 * the Server Action, and returning a valid CollectionWithItems object.
 *
 * @param {CreateCollectionFormInputs} data - Pre-validated form data from React Hook Form.
 * @param {(newCollection: CollectionWithItems) => void} [onCreated] - Optional callback to update parent state.
 * @param {(message: string) => void} [showNotification] - Optional notification trigger for success and error alerts.
 * @returns {Promise<CollectionWithItems>} The newly created collection object with an initialized items array.
 *
 * @example
 * \`\`\`ts
 * const newCol = await createCollection(
 *   { name: "Trip to Paris", start_time: "2026-06-01" },
 *   (col) => setCollections(prev => [col, ...prev]),
 *   showNotification
 * );
 * \`\`\`
 */
export async function createCollection(
  data: CreateCollectionFormInputs,
  onCreated?: (newCollection: CollectionWithItems) => void,
  showNotification?: (message: string) => void
): Promise<CollectionWithItems> {
  try {
    /**
     * --------------------------------------------------------------------------
     * Step 1: Map form inputs to database payload
     * --------------------------------------------------------------------------
     * Specification:
     * - Form validation (ensuring name is present) is handled upfront by React Hook Form.
     * - Map pre-validated form inputs to the \`CollectionInsert\` database schema.
     * - Convert empty/undefined strings to \`null\` for clean database storage.
     * - Initialize \`poster_url\` to \`null\` (cover photos are uploaded via Task 7).
     */
    // Map form inputs to database fields; set poster_url to null initially.
    const payload: CollectionInsert = {
      // Assign the validated collection name.
      name: data.name,
      // Provide optional description or fallback to null.
      description: null, // TODO: Map data.description or fallback to null
      // Provide optional start date or fallback to null.
      start_time: null, // TODO: Map data.start_time or fallback to null
      // Provide optional end date or fallback to null.
      end_time: null, // TODO: Map data.end_time or fallback to null
      // Initialize cover photo as null (managed via Task 7).
      poster_url: null,
    }

    /**
     * --------------------------------------------------------------------------
     * Step 2: Persist collection to Supabase via Server Action
     * --------------------------------------------------------------------------
     * Specification:
     * - Invoke \`createNewCollection(payload)\` running securely on the server.
     * - Check for server errors; log to console, trigger user toast notification,
     *   and throw an Error to abort on failure.
     */
    // Call server action createNewCollection to persist the collection row in Supabase.
    const res = await createNewCollection(payload)

    // Check if the server returned an error during creation.
    if (res?.error) {
      // Log server error details to the console for debugging.
      console.error('Failed to create collection in database:', res.error)
      // Notify the user of the creation failure via toast notification.
      showNotification?.('Failed to create collection: ' + res.error)
      // Throw error to interrupt execution and enter catch block.
      throw new Error(res.error)
    }

    /**
     * --------------------------------------------------------------------------
     * Step 3: Construct collection object, trigger notifications, and notify parent state
     * --------------------------------------------------------------------------
     * Specification:
     * - If the database record succeeds, attach empty \`collection_items: []\` to satisfy \`CollectionWithItems\`.
     * - If offline/demo mode without DB data, generate an optimistic fallback with a timestamp ID.
     * - Display a success toast notification via \`showNotification\`.
     * - Invoke the \`onCreated\` callback with the new collection if provided.
     * - Return the created \`CollectionWithItems\` object to the caller.
     */
    // Declare variable to hold the final created collection object.
    let createdCol: CollectionWithItems

    // Check if the database record was returned successfully.
    if (res?.data) {
      // Attach an empty items array to satisfy the CollectionWithItems type.
      createdCol = {
        ...res.data,
        collection_items: [],
      }
    } else {
      // Log warning when server returns no data (e.g., local mock or offline mode).
      console.warn('Server insertion did not return data. Generating client fallback:', res?.error)
      // Construct fallback optimistic collection with a timestamp-based ID.
      createdCol = {
        id: 'col-' + Date.now(),
        name: payload.name ?? null,
        description: payload.description ?? null,
        start_time: payload.start_time ?? null,
        end_time: payload.end_time ?? null,
        poster_url: null,
        created_at: new Date().toISOString(),
        collection_items: [],
      }
    }

    // Display a success toast notification to the user.
    showNotification?.('Collection created successfully!')

    // Check if an onCreated callback was supplied by the caller.
    if (onCreated) {
      // Invoke callback to pass the new collection to parent state.
      onCreated(createdCol)
    }

    // Return the newly created collection object.
    return createdCol
  } catch (error) {
    // Extract error message string or provide a fallback error text.
    const errorMsg = error instanceof Error ? error.message : 'Failed to create collection.'
    // Show error notification toast with the failure reason.
    showNotification?.(errorMsg)
    // Re-throw error so calling components can handle form state accordingly.
    throw error
  }
}`,
      solutionCode: `/**
 * ============================================================================
 * Task 1: Create Collection
 * ============================================================================
 *
 * @file task-1.ts
 * @module components/tasks/task-1
 *
 * @description
 * This task handles creating a new memory collection in the application.
 * Form validation (such as ensuring the collection name is provided) is handled
 * declaratively upfront by React Hook Form (\`register\`, \`required\`).
 * This function receives the pre-validated form data, constructs the database
 * payload, invokes a Next.js Server Action to persist the collection in Supabase,
 * and returns a fully formed CollectionWithItems object ready for client-side state updates.
 *
 * NOTE: Initial creation does not include a poster image; cover images are uploaded
 * and managed separately via Task 7 (\`editCollectionPoster\`).
 *
 * @usedBy
 * - \`CreateCollectionModal.tsx\` (\`app/components/CreateCollectionModal.tsx\`)
 *   Invoked inside \`handleSubmit(onSubmit)\` when the user submits the creation form.
 */

import { CollectionInsert, CollectionWithItems } from '../../types/collection'
import { createNewCollection } from '../../actions/collection'

/**
 * Form input values received from the React Hook Form collection creation modal.
 * Upstream validation (e.g. required name) is handled by React Hook Form.
 */
export interface CreateCollectionFormInputs {
  /** The title/name of the collection (required, validated by React Hook Form) */
  name: string
  /** An optional description or romantic note for this collection */
  description?: string
  /** Optional start date string in YYYY-MM-DD format */
  start_time?: string
  /** Optional end date string in YYYY-MM-DD format */
  end_time?: string
}

/**
 * Creates a new collection by mapping form inputs to a database payload, executing
 * the Server Action, and returning a valid CollectionWithItems object.
 *
 * @param {CreateCollectionFormInputs} data - Pre-validated form data from React Hook Form.
 * @param {(newCollection: CollectionWithItems) => void} [onCreated] - Optional callback to update parent state.
 * @param {(message: string) => void} [showNotification] - Optional notification trigger for success and error alerts.
 * @returns {Promise<CollectionWithItems>} The newly created collection object with an initialized items array.
 *
 * @example
 * \`\`\`ts
 * const newCol = await createCollection(
 *   { name: "Trip to Paris", start_time: "2026-06-01" },
 *   (col) => setCollections(prev => [col, ...prev]),
 *   showNotification
 * );
 * \`\`\`
 */
export async function createCollection(
  data: CreateCollectionFormInputs,
  onCreated?: (newCollection: CollectionWithItems) => void,
  showNotification?: (message: string) => void
): Promise<CollectionWithItems> {
  try {
    /**
     * --------------------------------------------------------------------------
     * Step 1: Map form inputs to database payload
     * --------------------------------------------------------------------------
     * Specification:
     * - Form validation (ensuring name is present) is handled upfront by React Hook Form.
     * - Map pre-validated form inputs to the \`CollectionInsert\` database schema.
     * - Convert empty/undefined strings to \`null\` for clean database storage.
     * - Initialize \`poster_url\` to \`null\` (cover photos are uploaded via Task 7).
     */
    // Map form inputs to database fields; set poster_url to null initially.
    const payload: CollectionInsert = {
      // Assign the validated collection name.
      name: data.name,
      // Provide optional description or fallback to null.
      description: data.description || null,
      // Provide optional start date or fallback to null.
      start_time: data.start_time || null,
      // Provide optional end date or fallback to null.
      end_time: data.end_time || null,
      // Initialize cover photo as null (managed via Task 7).
      poster_url: null,
    }

    /**
     * --------------------------------------------------------------------------
     * Step 2: Persist collection to Supabase via Server Action
     * --------------------------------------------------------------------------
     * Specification:
     * - Invoke \`createNewCollection(payload)\` running securely on the server.
     * - Check for server errors; log to console, trigger user toast notification,
     *   and throw an Error to abort on failure.
     */
    // Call server action createNewCollection to persist the collection row in Supabase.
    const res = await createNewCollection(payload)

    // Check if the server returned an error during creation.
    if (res?.error) {
      // Log server error details to the console for debugging.
      console.error('Failed to create collection in database:', res.error)
      // Notify the user of the creation failure via toast notification.
      showNotification?.('Failed to create collection: ' + res.error)
      // Throw error to interrupt execution and enter catch block.
      throw new Error(res.error)
    }

    /**
     * --------------------------------------------------------------------------
     * Step 3: Construct collection object, trigger notifications, and notify parent state
     * --------------------------------------------------------------------------
     * Specification:
     * - If the database record succeeds, attach empty \`collection_items: []\` to satisfy \`CollectionWithItems\`.
     * - If offline/demo mode without DB data, generate an optimistic fallback with a timestamp ID.
     * - Display a success toast notification via \`showNotification\`.
     * - Invoke the \`onCreated\` callback with the new collection if provided.
     * - Return the created \`CollectionWithItems\` object to the caller.
     */
    // Declare variable to hold the final created collection object.
    let createdCol: CollectionWithItems

    // Check if the database record was returned successfully.
    if (res?.data) {
      // Attach an empty items array to satisfy the CollectionWithItems type.
      createdCol = {
        ...res.data,
        collection_items: [],
      }
    } else {
      // Log warning when server returns no data (e.g., local mock or offline mode).
      console.warn('Server insertion did not return data. Generating client fallback:', res?.error)
      // Construct fallback optimistic collection with a timestamp-based ID.
      createdCol = {
        id: 'col-' + Date.now(),
        name: payload.name ?? null,
        description: payload.description ?? null,
        start_time: payload.start_time ?? null,
        end_time: payload.end_time ?? null,
        poster_url: null,
        created_at: new Date().toISOString(),
        collection_items: [],
      }
    }

    // Display a success toast notification to the user.
    showNotification?.('Collection created successfully!')

    // Check if an onCreated callback was supplied by the caller.
    if (onCreated) {
      // Invoke callback to pass the new collection to parent state.
      onCreated(createdCol)
    }

    // Return the newly created collection object.
    return createdCol
  } catch (error) {
    // Extract error message string or provide a fallback error text.
    const errorMsg = error instanceof Error ? error.message : 'Failed to create collection.'
    // Show error notification toast with the failure reason.
    showNotification?.(errorMsg)
    // Re-throw error so calling components can handle form state accordingly.
    throw error
  }
}`,
      solutionExplanation:
        'In Step 1 of createCollection, the optional form fields must be mapped to the database payload. If a user leaves description, start_time, or end_time empty in the form, data.description || null evaluates to null. This prevents empty strings from corrupting the database date/text fields and ensures clean PostgreSQL null values.',
    },
    sections: [
      {
        title: 'Task Overview & File Target',
        description:
          'Open components/tasks/task-1.ts in your project. Complete the implementation of createCollection by mapping the optional form fields to the Supabase payload.',
      },
    ],
  },
  {
    id: 9,
    stepNumber: 9,
    category: 'task',
    badge: 'Coding Task 2',
    title: 'Task 2: Edit Collection (task-2.ts)',
    shortTitle: 'Task 2: Edit',
    summary:
      'Construct a targeted partial update payload, invoke the updateCollection Server Action in Supabase, and produce a merged CollectionWithItems record that preserves existing poster and nested items.',
    estimatedTime: '5-10 mins',
    codingTask: {
      taskNumber: 2,
      file: 'components/tasks/task-2.ts',
      usedBy: 'EditCollectionModal.tsx (app/components/EditCollectionModal.tsx)',
      purpose:
        'Updates an existing collection\'s text metadata (name, description, dates) while preserving existing poster URLs and items. It constructs a partial update payload scoped to collection.id, calls updateCollection, handles errors, and returns a merged CollectionWithItems object to update UI state without re-fetching.',
      keyConcepts: [
        {
          name: 'collection: CollectionWithItems',
          role: 'Baseline Model State',
          explanation:
            'The existing collection record. Supplies collection.id for row targeting and baseline nested relations to preserve.',
        },
        {
          name: 'data: EditCollectionFormInputs',
          role: 'Pre-Validated Form Input Object',
          explanation:
            'Validated inputs from the edit dialog. Cleared optional fields (|| null) are mapped to SQL NULL.',
        },
        {
          name: 'updatePayload',
          role: 'Targeted Database Mutation Contract',
          explanation:
            'Scopes the database update to collection.id alongside sanitized text and date fields.',
        },
        {
          name: 'updateCollection(updatePayload)',
          role: 'Next.js Server Action Execution',
          explanation:
            'Next.js Server Action that safely executes the PostgreSQL UPDATE with Supabase Row Level Security.',
        },
        {
          name: 'res?.error & Exception Handling',
          role: 'Resilience and User Feedback',
          explanation:
            'Logs failures, alerts the user with showNotification, and throws an error to keep the dialog open on failure.',
        },
        {
          name: 'updatedCollection: CollectionWithItems',
          role: 'Merged Immutable Client State',
          explanation:
            'Merges the original collection with the updated payload and existing relations for immediate UI rendering.',
        },
        {
          name: 'onSuccess?(updatedCollection)',
          role: 'Parent State Synchronization Callback',
          explanation:
            'Passes the merged collection back to parent components for instant optimistic state updates.',
        },
        {
          name: "showNotification?.('Collection updated successfully!')",
          role: 'Success Toast Feedback',
          explanation:
            'Displays an immediate toast alert confirming changes were persisted.',
        },
      ],
      starterCode: `/**
 * ============================================================================
 * Task 2: Edit Collection
 * ============================================================================
 *
 * @file task-2.ts
 * @module components/tasks/task-2
 *
 * @description
 * This task handles editing the textual metadata of an existing collection
 * (title/name, description, start time, end time).
 * Upstream field validation (such as requiring a name) is handled declaratively
 * by React Hook Form (\`register\`, \`required\`).
 * This function receives the pre-validated form data, constructs a partial update
 * payload targeting the collection's primary key (\`id\`), sends the update to Supabase
 * via a Next.js Server Action, and produces a merged CollectionWithItems object that
 * preserves existing nested items and poster attachments.
 *
 * NOTE: This function specifically manages collection metadata (text fields and dates),
 * NOT the collection poster image file upload (which is handled separately in Task 7).
 *
 * @usedBy
 * - \`EditCollectionModal.tsx\` (\`app/components/EditCollectionModal.tsx\`)
 *   Invoked inside \`handleSubmit(onSubmit)\` when the user updates collection details in the edit dialog.
 */

import { CollectionWithItems } from '../../types/collection'
import { updateCollection } from '../../actions/collection'

/**
 * Form inputs for updating an existing collection.
 * Upstream validation is handled by React Hook Form.
 */
export interface EditCollectionFormInputs {
  /** Updated collection name or title (required, validated by React Hook Form) */
  name: string
  /** Updated description or notes (optional) */
  description?: string
  /** Updated start date string in YYYY-MM-DD format (optional) */
  start_time?: string
  /** Updated end date string in YYYY-MM-DD format (optional) */
  end_time?: string
}

/**
 * Updates an existing collection's textual metadata and returns the merged collection object.
 *
 * @param {CollectionWithItems} collection - The existing collection object being edited.
 * @param {EditCollectionFormInputs} data - Pre-validated form fields from React Hook Form.
 * @param {(updatedCollection: CollectionWithItems) => void} [onSuccess] - Optional callback triggered with the updated collection.
 * @param {(message: string) => void} [showNotification] - Optional notification trigger for success and error alerts.
 * @returns {Promise<CollectionWithItems>} The merged collection object containing the updated fields.
 *
 * @example
 * \`\`\`ts
 * const updated = await editCollection(
 *   currentCollection,
 *   { name: "Summer in Lapland", description: "Updated summer notes" },
 *   (updatedCol) => replaceCollectionInState(updatedCol),
 *   showNotification
 * );
 * \`\`\`
 */
export async function editCollection(
  collection: CollectionWithItems,
  data: EditCollectionFormInputs,
  onSuccess?: (updatedCollection: CollectionWithItems) => void,
  showNotification?: (message: string) => void
): Promise<CollectionWithItems> {
  try {
    /**
     * --------------------------------------------------------------------------
     * Step 1: Construct partial update payload
     * --------------------------------------------------------------------------
     * Specification:
     * - Form validation (ensuring name is present) is handled upfront by React Hook Form.
     * - Target the specific collection by its unique identifier (\`collection.id\`).
     * - Map updated fields (\`name\`, \`description\`, \`start_time\`, \`end_time\`),
     *   falling back empty fields to \`null\` to clear previous values in the database.
     */
    // Construct the partial update payload with the collection ID and form inputs.
    // Specify the target collection primary key ID to update.
    // Set the updated collection title or name.
    // Set updated description or default to null if cleared.
    // Set updated start date string or default to null.
    // Set updated end date string or default to null.
    // TODO: Construct the partial update payload object here

    /**
     * --------------------------------------------------------------------------
     * Step 2: Invoke Server Action to update collection in database
     * --------------------------------------------------------------------------
     * Specification:
     * - Execute \`updateCollection(updatePayload)\` to run an UPDATE query in Supabase.
     * - Inspect the server response; log error, display toast notification,
     *   and throw an Error if the update failed.
     */
    // Invoke server action updateCollection to update the collection row in Supabase.
    // Check whether the database update returned an error.
    // Log update failure to the console for debugging.
    // Display failure toast alert to the user.
    // Throw error to jump into catch block.
    // TODO: Call server action updateCollection and handle error response here

    /**
     * --------------------------------------------------------------------------
     * Step 3: Merge updated fields, display success toast, and notify parent state
     * --------------------------------------------------------------------------
     * Specification:
     * - Merge updated fields into the existing \`collection\` object to retain intact
     *   relations (\`poster_url\`, \`collection_items\`).
     * - Trigger a user-facing success notification via \`showNotification\`.
     * - Invoke \`onSuccess\` callback with the merged collection if provided.
     * - Return the updated \`CollectionWithItems\` record.
     */
    // Merge updated fields with existing items and poster to preserve state.
    // Display a success toast notification to the user.
    // Check if an onSuccess callback was provided.
    // Invoke callback to pass merged collection to parent component.
    // Return the updated collection object to caller.
    // TODO: Merge updated fields, display toast notification, call onSuccess, and return updatedCollection

    const updatedCollection: CollectionWithItems = undefined as any
    return updatedCollection
  } catch (error) {
    // Determine the error message string from caught error.
    const errorMsg = error instanceof Error ? error.message : 'Failed to update collection.'
    // Show error notification toast to alert the user.
    showNotification?.(errorMsg)
    // Re-throw caught error to allow calling component to handle failure.
    throw error
  }
}`,
      solutionCode: `/**
 * ============================================================================
 * Task 2: Edit Collection
 * ============================================================================
 *
 * @file task-2.ts
 * @module components/tasks/task-2
 *
 * @description
 * This task handles editing the textual metadata of an existing collection
 * (title/name, description, start time, end time).
 * Upstream field validation (such as requiring a name) is handled declaratively
 * by React Hook Form (\`register\`, \`required\`).
 * This function receives the pre-validated form data, constructs a partial update
 * payload targeting the collection's primary key (\`id\`), sends the update to Supabase
 * via a Next.js Server Action, and produces a merged CollectionWithItems object that
 * preserves existing nested items and poster attachments.
 *
 * NOTE: This function specifically manages collection metadata (text fields and dates),
 * NOT the collection poster image file upload (which is handled separately in Task 7).
 *
 * @usedBy
 * - \`EditCollectionModal.tsx\` (\`app/components/EditCollectionModal.tsx\`)
 *   Invoked inside \`handleSubmit(onSubmit)\` when the user updates collection details in the edit dialog.
 */

import { CollectionWithItems } from '../../types/collection'
import { updateCollection } from '../../actions/collection'

/**
 * Form inputs for updating an existing collection.
 * Upstream validation is handled by React Hook Form.
 */
export interface EditCollectionFormInputs {
  /** Updated collection name or title (required, validated by React Hook Form) */
  name: string
  /** Updated description or notes (optional) */
  description?: string
  /** Updated start date string in YYYY-MM-DD format (optional) */
  start_time?: string
  /** Updated end date string in YYYY-MM-DD format (optional) */
  end_time?: string
}

/**
 * Updates an existing collection's textual metadata and returns the merged collection object.
 *
 * @param {CollectionWithItems} collection - The existing collection object being edited.
 * @param {EditCollectionFormInputs} data - Pre-validated form fields from React Hook Form.
 * @param {(updatedCollection: CollectionWithItems) => void} [onSuccess] - Optional callback triggered with the updated collection.
 * @param {(message: string) => void} [showNotification] - Optional notification trigger for success and error alerts.
 * @returns {Promise<CollectionWithItems>} The merged collection object containing the updated fields.
 *
 * @example
 * \`\`\`ts
 * const updated = await editCollection(
 *   currentCollection,
 *   { name: "Summer in Lapland", description: "Updated summer notes" },
 *   (updatedCol) => replaceCollectionInState(updatedCol),
 *   showNotification
 * );
 * \`\`\`
 */
export async function editCollection(
  collection: CollectionWithItems,
  data: EditCollectionFormInputs,
  onSuccess?: (updatedCollection: CollectionWithItems) => void,
  showNotification?: (message: string) => void
): Promise<CollectionWithItems> {
  try {
    /**
     * --------------------------------------------------------------------------
     * Step 1: Construct partial update payload
     * --------------------------------------------------------------------------
     * Specification:
     * - Form validation (ensuring name is present) is handled upfront by React Hook Form.
     * - Target the specific collection by its unique identifier (\`collection.id\`).
     * - Map updated fields (\`name\`, \`description\`, \`start_time\`, \`end_time\`),
     *   falling back empty fields to \`null\` to clear previous values in the database.
     */
    // Construct the partial update payload with the collection ID and form inputs.
    const updatePayload = {
      // Specify the target collection primary key ID to update.
      id: collection.id,
      // Set the updated collection title or name.
      name: data.name,
      // Set updated description or default to null if cleared.
      description: data.description || null,
      // Set updated start date string or default to null.
      start_time: data.start_time || null,
      // Set updated end date string or default to null.
      end_time: data.end_time || null,
    }

    /**
     * --------------------------------------------------------------------------
     * Step 2: Invoke Server Action to update collection in database
     * --------------------------------------------------------------------------
     * Specification:
     * - Execute \`updateCollection(updatePayload)\` to run an UPDATE query in Supabase.
     * - Inspect the server response; log error, display toast notification,
     *   and throw an Error if the update failed.
     */
    // Invoke server action updateCollection to update the collection row in Supabase.
    const res = await updateCollection(updatePayload)

    // Check whether the database update returned an error.
    if (res?.error) {
      // Log update failure to the console for debugging.
      console.error('Failed to update collection in database:', res.error)
      // Display failure toast alert to the user.
      showNotification?.('Failed to update collection: ' + res.error)
      // Throw error to jump into catch block.
      throw new Error(res.error)
    }

    /**
     * --------------------------------------------------------------------------
     * Step 3: Merge updated fields, display success toast, and notify parent state
     * --------------------------------------------------------------------------
     * Specification:
     * - Merge updated fields into the existing \`collection\` object to retain intact
     *   relations (\`poster_url\`, \`collection_items\`).
     * - Trigger a user-facing success notification via \`showNotification\`.
     * - Invoke \`onSuccess\` callback with the merged collection if provided.
     * - Return the updated \`CollectionWithItems\` record.
     */
    // Merge updated fields with existing items and poster to preserve state.
    const updatedCollection: CollectionWithItems = {
      ...res.data!,
      poster_url: res.data?.poster_url ?? null,
      collection_items: collection.collection_items ?? [],
    }

    // Display a success toast notification to the user.
    showNotification?.('Collection updated successfully!')

    // Check if an onSuccess callback was provided.
    if (onSuccess) {
      // Invoke callback to pass merged collection to parent component.
      onSuccess(updatedCollection)
    }

    // Return the updated collection object to caller.
    return updatedCollection
  } catch (error) {
    // Determine the error message string from caught error.
    const errorMsg = error instanceof Error ? error.message : 'Failed to update collection.'
    // Show error notification toast to alert the user.
    showNotification?.(errorMsg)
    // Re-throw caught error to allow calling component to handle failure.
    throw error
  }
}`,
      solutionExplanation:
        'In Task 2, updating an existing collection requires scoping the PostgreSQL mutation to `collection.id`. By mapping optional fields with `data.field || null`, cleared inputs are explicitly set to SQL NULL. When constructing the return value, spreading `...collection` and `...updatePayload` while preserving `poster_url` and `collection_items` ensures uninterrupted client-side state without needing another database query.',
    },
    sections: [
      {
        title: 'Task Overview & File Target',
        description:
          'Open components/tasks/task-2.ts in your project. Complete the implementation of editCollection by constructing updatePayload with the collection primary key ID, invoking updateCollection, and merging the updated fields.',
      },
    ],
  },
  {
    id: 10,
    stepNumber: 10,
    category: 'task',
    badge: 'Coding Task 3',
    title: 'Task 3: Create Memory (task-3.ts)',
    shortTitle: 'Task 3: Memory',
    summary:
      'Assemble the collection item insert payload, persist the memory record in Supabase via createNewCollectionItem, and handle optional image uploading to Supabase Storage.',
    estimatedTime: '5-10 mins',
    codingTask: {
      taskNumber: 3,
      file: 'components/tasks/task-3.ts',
      usedBy: 'CreateMemoryItemModal.tsx (app/components/CreateMemoryItemModal.tsx)',
      purpose:
        'Creates an individual memory item and handles its optional photo attachment. It inserts the memory row into Supabase via createNewCollectionItem, uploads any attached photo via updateCollectionItemPoster, notifies the user, and triggers onSuccess for immediate UI rendering.',
      keyConcepts: [
        {
          name: 'collectionId: string',
          role: 'Foreign Key Parent Identifier',
          explanation:
            'Parent collection ID linking this memory to its parent book via the collection_id foreign key.',
        },
        {
          name: 'data: CreateMemoryFormInputs',
          role: 'Pre-Validated Form Input Object',
          explanation:
            'Validated inputs from CreateMemoryItemModal. Cleared optional fields are mapped to SQL NULL, and order defaults to 1.',
        },
        {
          name: 'posterFile: File | null',
          role: 'Optional Media Binary Attachment',
          explanation:
            'Optional photo attachment uploaded to Supabase Storage using the newly generated memory ID.',
        },
        {
          name: 'payload: CollectionItemInsert',
          role: 'Database Schema Insertion Contract',
          explanation:
            'Database insertion schema mapping collection_id, name, dates, order, and initializing image_url to null.',
        },
        {
          name: 'createNewCollectionItem(payload)',
          role: 'Next.js Server Action Execution',
          explanation:
            'Next.js Server Action inserting the memory record into Supabase with server-side RLS enforcement.',
        },
        {
          name: 'res?.error || !res?.data Error Handling',
          role: 'Atomic Failure Guard',
          explanation:
            'Validates row creation, alerts the user on failure, and halts execution before attempting photo upload.',
        },
        {
          name: 'updateCollectionItemPoster(newItem, posterFile)',
          role: 'Supabase Storage Asset Dispatcher',
          explanation:
            'Uploads the photo to the Supabase Storage bucket and sets the returned public URL on newItem.image_url.',
        },
        {
          name: 'onSuccess?(newItem)',
          role: 'Parent State Synchronization Callback',
          explanation:
            'Callback passing the new memory item to parent components for immediate state and 3D book rendering.',
        },
        {
          name: "showNotification?.('Memory item created successfully!')",
          role: 'Success Toast Feedback',
          explanation:
            'Displays an immediate toast alert confirming successful memory creation.',
        },
      ],
      starterCode: `/**
 * ============================================================================
 * Task 3: Create Memory (Collection Item)
 * ============================================================================
 *
 * @file task-3.ts
 * @module components/tasks/task-3
 *
 * @description
 * This task handles creating a new individual memory item within a collection.
 * Upstream field validation (such as requiring a name and parsing order numbers)
 * is managed declaratively by React Hook Form (\`register\`, \`required\`, \`valueAsNumber\`).
 * This function receives the pre-validated form inputs, links the memory with its
 * parent collection via \`collection_id\`, inserts the record into Supabase, and optionally
 * uploads an accompanying photo to Supabase Storage if an image file is provided.
 *
 * @usedBy
 * - \`CreateMemoryItemModal.tsx\` (\`app/components/CreateMemoryItemModal.tsx\`)
 *   Invoked inside \`handleSubmit(onSubmit)\` when the user fills out the memory creation form.
 */

import { CollectionItem, CollectionItemInsert } from '../../types/collection_item'
import { createNewCollectionItem, updateCollectionItemPoster } from '../../actions/collection_items'

/**
 * Form inputs for creating a new memory item.
 * Upstream validation is handled by React Hook Form.
 */
export interface CreateMemoryFormInputs {
  /** The title of this memory moment (required, validated by React Hook Form) */
  name: string
  /** Romantic narrative, thoughts, or notes about the moment (optional) */
  description?: string
  /** The date this memory occurred in YYYY-MM-DD format (optional) */
  memory_date?: string
  /** Page order index for chronological display in the book (optional, managed by React Hook Form) */
  order?: number
}

/**
 * Creates a new memory item associated with a collection, optionally uploading an image.
 *
 * @param {string} collectionId - The primary key of the parent collection this memory belongs to.
 * @param {CreateMemoryFormInputs} data - Pre-validated form fields and metadata from React Hook Form.
 * @param {File | null} [posterFile=null] - An optional photo file to upload and attach to this memory.
 * @param {(item: CollectionItem) => void} [onSuccess] - Optional callback to notify parent components.
 * @param {(message: string) => void} [showNotification] - Optional notification trigger for success and error alerts.
 * @returns {Promise<CollectionItem>} The newly created memory item with its database ID and image URL.
 *
 * @example
 * \`\`\`ts
 * const memory = await createMemory(
 *   "col-123",
 *   { name: "First Coffee Date", description: "At the corner cafe", memory_date: "2025-02-14", order: 1 },
 *   imageFile,
 *   (newItem) => setMemories(prev => [...prev, newItem]),
 *   showNotification
 * );
 * \`\`\`
 */
export async function createMemory(
  collectionId: string,
  data: CreateMemoryFormInputs,
  posterFile: File | null = null,
  onSuccess?: (item: CollectionItem) => void,
  showNotification?: (message: string) => void
): Promise<CollectionItem> {
  try {
    /**
     * --------------------------------------------------------------------------
     * Step 1: Assemble database insert payload
     * --------------------------------------------------------------------------
     * Specification:
     * - Form validation (ensuring memory name is entered) is handled upfront by React Hook Form.
     * - Bind the memory moment to its parent collection via \`collection_id\`.
     * - Map form fields into \`CollectionItemInsert\`, defaulting \`order\` to 1.
     * - Initialize \`image_url\` to \`null\` prior to optional media file upload.
     */
    // Assemble the database payload linking this memory to its parent collection.
    // Assign foreign key of the parent collection.
    // Assign the validated memory title/name.
    // Provide optional description or fallback to null.
    // Assign optional memory date or fallback to null.
    // Set page display order, defaulting to page 1 if omitted.
    // Initialize image URL as null before optional file upload.
    // TODO: Assemble the database payload (payload: CollectionItemInsert) here

    /**
     * --------------------------------------------------------------------------
     * Step 2: Insert memory record into Supabase
     * --------------------------------------------------------------------------
     * Specification:
     * - Call Server Action \`createNewCollectionItem(payload)\` to insert into \`collection_items\` table.
     * - Validate database response; if error or missing data, display toast notification,
     *   log error, and throw Error.
     * - Store newly created memory item with its generated ID.
     */
    // Call server action createNewCollectionItem to insert the row in Supabase.
    // Check if the server action failed or did not return inserted data.
    // Formulate error message from response or fallback string.
    // Log database error to the developer console.
    // Display error notification toast to the user.
    // Throw error to abort creation and enter catch block.
    // TODO: Call server action createNewCollectionItem and validate response here

    /**
     * --------------------------------------------------------------------------
     * Step 3: Upload optional image attachment, notify parent state, and trigger notification
     * --------------------------------------------------------------------------
     * Specification:
     * - If \`posterFile\` is provided, upload image to Supabase Storage via \`updateCollectionItemPoster\`.
     * - Update local memory record representation with the saved storage path on success.
     * - Display a success toast alert to user via \`showNotification\`.
     * - Notify parent state via \`onSuccess\` callback if provided.
     * - Return the completed \`CollectionItem\` record.
     */
    // Store the newly created memory record returned from database.
    let newItem: CollectionItem = undefined as any

    // Check if an image attachment file was provided by the user.
    // TODO: Uncomment the code block below to enable image uploading:
    /*
    if (posterFile) {
      // Upload image to storage bucket using item ID as directory prefix.
      const resPoster = await updateCollectionItemPoster(newItem, posterFile)
      // Verify storage upload succeeded and returned a storage path.
      if (resPoster?.data && !resPoster.error) {
        // Update local memory item representation with the uploaded image path.
        newItem = {
          ...newItem,
          image_url: resPoster.data,
        }
      // Handle scenario where memory was created but file upload encountered an error.
      } else if (resPoster?.error) {
        // Log warning that record was created but image upload failed.
        console.warn('Memory record created, but image upload failed:', resPoster.error)
      }
    }
    */

    // Display a success toast notification to the user.
    // Check if an onSuccess callback was provided.
    // Log new item and notify parent component with the completed record.
    // Return the newly created memory item to the caller.
    // TODO: Display success toast notification, notify parent state via onSuccess, and return newItem
    return newItem
  } catch (error) {
    // Extract error message string from caught error object.
    const errorMsg = error instanceof Error ? error.message : 'Failed to create memory item.'
    // Display failure toast notification with the error details.
    showNotification?.(errorMsg)
    // Re-throw error so the calling modal can retain form input for retry.
    throw error
  }
}`,
      solutionCode: `/**
 * ============================================================================
 * Task 3: Create Memory (Collection Item)
 * ============================================================================
 *
 * @file task-3.ts
 * @module components/tasks/task-3
 *
 * @description
 * This task handles creating a new individual memory item within a collection.
 * Upstream field validation (such as requiring a name and parsing order numbers)
 * is managed declaratively by React Hook Form (\`register\`, \`required\`, \`valueAsNumber\`).
 * This function receives the pre-validated form inputs, links the memory with its
 * parent collection via \`collection_id\`, inserts the record into Supabase, and optionally
 * uploads an accompanying photo to Supabase Storage if an image file is provided.
 *
 * @usedBy
 * - \`CreateMemoryItemModal.tsx\` (\`app/components/CreateMemoryItemModal.tsx\`)
 *   Invoked inside \`handleSubmit(onSubmit)\` when the user fills out the memory creation form.
 */

import { CollectionItem, CollectionItemInsert } from '../../types/collection_item'
import { createNewCollectionItem, updateCollectionItemPoster } from '../../actions/collection_items'

/**
 * Form inputs for creating a new memory item.
 * Upstream validation is handled by React Hook Form.
 */
export interface CreateMemoryFormInputs {
  /** The title of this memory moment (required, validated by React Hook Form) */
  name: string
  /** Romantic narrative, thoughts, or notes about the moment (optional) */
  description?: string
  /** The date this memory occurred in YYYY-MM-DD format (optional) */
  memory_date?: string
  /** Page order index for chronological display in the book (optional, managed by React Hook Form) */
  order?: number
}

/**
 * Creates a new memory item associated with a collection, optionally uploading an image.
 *
 * @param {string} collectionId - The primary key of the parent collection this memory belongs to.
 * @param {CreateMemoryFormInputs} data - Pre-validated form fields and metadata from React Hook Form.
 * @param {File | null} [posterFile=null] - An optional photo file to upload and attach to this memory.
 * @param {(item: CollectionItem) => void} [onSuccess] - Optional callback to notify parent components.
 * @param {(message: string) => void} [showNotification] - Optional notification trigger for success and error alerts.
 * @returns {Promise<CollectionItem>} The newly created memory item with its database ID and image URL.
 *
 * @example
 * \`\`\`ts
 * const memory = await createMemory(
 *   "col-123",
 *   { name: "First Coffee Date", description: "At the corner cafe", memory_date: "2025-02-14", order: 1 },
 *   imageFile,
 *   (newItem) => setMemories(prev => [...prev, newItem]),
 *   showNotification
 * );
 * \`\`\`
 */
export async function createMemory(
  collectionId: string,
  data: CreateMemoryFormInputs,
  posterFile: File | null = null,
  onSuccess?: (item: CollectionItem) => void,
  showNotification?: (message: string) => void
): Promise<CollectionItem> {
  try {
    /**
     * --------------------------------------------------------------------------
     * Step 1: Assemble database insert payload
     * --------------------------------------------------------------------------
     * Specification:
     * - Form validation (ensuring memory name is entered) is handled upfront by React Hook Form.
     * - Bind the memory moment to its parent collection via \`collection_id\`.
     * - Map form fields into \`CollectionItemInsert\`, defaulting \`order\` to 1.
     * - Initialize \`image_url\` to \`null\` prior to optional media file upload.
     */
    // Assemble the database payload linking this memory to its parent collection.
    const payload: CollectionItemInsert = {
      // Assign foreign key of the parent collection.
      collection_id: collectionId,
      // Assign the validated memory title/name.
      name: data.name,
      // Provide optional description or fallback to null.
      description: data.description || null,
      // Assign optional memory date or fallback to null.
      memory_date: data.memory_date || null,
      // Set page display order, defaulting to page 1 if omitted.
      order: data.order ?? 1,
      // Initialize image URL as null before optional file upload.
      image_url: null,
    }

    /**
     * --------------------------------------------------------------------------
     * Step 2: Insert memory record into Supabase
     * --------------------------------------------------------------------------
     * Specification:
     * - Call Server Action \`createNewCollectionItem(payload)\` to insert into \`collection_items\` table.
     * - Validate database response; if error or missing data, display toast notification,
     *   log error, and throw Error.
     * - Store newly created memory item with its generated ID.
     */
    // Call server action createNewCollectionItem to insert the row in Supabase.
    const res = await createNewCollectionItem(payload)

    // Check if the server action failed or did not return inserted data.
    if (res?.error || !res?.data) {
      // Formulate error message from response or fallback string.
      const errorMessage = res?.error ?? 'Failed to create memory item in the database.'
      // Log database error to the developer console.
      console.error(errorMessage)
      // Display error notification toast to the user.
      showNotification?.(errorMessage)
      // Throw error to abort creation and enter catch block.
      throw new Error(errorMessage)
    }

    /**
     * --------------------------------------------------------------------------
     * Step 3: Upload optional image attachment, notify parent state, and trigger notification
     * --------------------------------------------------------------------------
     * Specification:
     * - If \`posterFile\` is provided, upload image to Supabase Storage via \`updateCollectionItemPoster\`.
     * - Update local memory record representation with the saved storage path on success.
     * - Display a success toast alert to user via \`showNotification\`.
     * - Notify parent state via \`onSuccess\` callback if provided.
     * - Return the completed \`CollectionItem\` record.
     */
    // Store the newly created memory record returned from database.
    let newItem: CollectionItem = res.data

    // Check if an image attachment file was provided by the user.
    if (posterFile) {
      // Upload image to storage bucket using item ID as directory prefix.
      const resPoster = await updateCollectionItemPoster(newItem, posterFile)
      // Verify storage upload succeeded and returned a storage path.
      if (resPoster?.data && !resPoster.error) {
        // Update local memory item representation with the uploaded image path.
        newItem = {
          ...newItem,
          image_url: resPoster.data,
        }
      // Handle scenario where memory was created but file upload encountered an error.
      } else if (resPoster?.error) {
        // Log warning that record was created but image upload failed.
        console.warn('Memory record created, but image upload failed:', resPoster.error)
      }
    }

    // Display a success toast notification to the user.
    showNotification?.('Memory item created successfully!')

    // Check if an onSuccess callback was provided.
    if (onSuccess) {
      // Log new item and notify parent component with the completed record.
      console.log(newItem)
      onSuccess(newItem)
    }

    // Return the newly created memory item to the caller.
    return newItem
  } catch (error) {
    // Extract error message string from caught error object.
    const errorMsg = error instanceof Error ? error.message : 'Failed to create memory item.'
    // Display failure toast notification with the error details.
    showNotification?.(errorMsg)
    // Re-throw error so the calling modal can retain form input for retry.
    throw error
  }
}`,
      solutionExplanation:
        'In Task 3, the creation workflow links the memory to its parent collection using collection_id: collectionId. In Step 1, order is defaulted to 1 using data.order ?? 1. In Step 2, createNewCollectionItem persists the row to Supabase. In Step 3, if a posterFile exists, updateCollectionItemPoster uploads the photo to Supabase Storage and attaches the public URL to newItem.image_url before returning the finalized record.',
    },
    sections: [
      {
        title: 'Task Overview & File Target',
        description:
          'Open components/tasks/task-3.ts in your project. Assemble the CollectionItemInsert payload with collection_id, invoke createNewCollectionItem, handle the optional posterFile upload to Supabase Storage, and trigger the success callback.',
      },
    ],
  },
  {
    id: 11,
    stepNumber: 11,
    category: 'task',
    badge: 'Coding Task 4',
    title: 'Task 4: Edit Memory (task-4.ts)',
    shortTitle: 'Task 4: Edit Mem',
    summary:
      'Assemble the partial update payload, invoke updateCollectionItem in Supabase, safeguard existing media attachments, and notify parent state with isEdit = true.',
    estimatedTime: '5-10 mins',
    codingTask: {
      taskNumber: 4,
      file: 'components/tasks/task-4.ts',
      usedBy: 'EditMemoryItemModal.tsx (app/components/EditMemoryItemModal.tsx)',
      purpose:
        'Updates an existing memory\'s text metadata and flipbook sequence order (name, description, memory_date, order). It sends a partial update payload via updateCollectionItem, preserves existing photo attachments, and triggers onSuccess(updatedItem, true) to replace the item in place.',
      keyConcepts: [
        {
          name: 'itemToEdit: CollectionItem',
          role: 'Existing Memory Baseline State',
          explanation:
            'The original memory record. Supplies itemToEdit.id for row targeting and baseline values.',
        },
        {
          name: 'data: EditMemoryFormInputs',
          role: 'Pre-Validated Form Input Object',
          explanation:
            'Validated inputs from React Hook Form. Cleared optional fields (|| null) are mapped to SQL NULL.',
        },
        {
          name: 'payload (partial update object)',
          role: 'Targeted Mutation Payload Contract',
          explanation:
            'Constructs the update object with id: itemToEdit.id, text fields, and order, scoping changes to this row.',
        },
        {
          name: 'updateCollectionItem(payload)',
          role: 'Next.js Server Action Execution',
          explanation:
            'Next.js Server Action updating the row in Supabase with server-side RLS enforcement.',
        },
        {
          name: 'res?.error || !res?.data Error Handling',
          role: 'Failure Guard & User Notification',
          explanation:
            'Alerts the user on failure and throws an error to prevent closing the modal.',
        },
        {
          name: 'updatedItem: CollectionItem',
          role: 'Safeguarded Merged Entity',
          explanation:
            'Constructs the updated memory while preserving image_url: res.data.image_url intact.',
        },
        {
          name: 'onSuccess?(updatedItem, true)',
          role: 'Parent State Replacement Callback',
          explanation:
            'Passes the updated memory with isEdit = true so parents replace the item in place rather than duplicating.',
        },
        {
          name: "showNotification?.('Memory item updated successfully!')",
          role: 'Success Toast Feedback',
          explanation:
            'Displays an immediate toast alert confirming successful update.',
        },
      ],
      starterCode: `/**
 * ============================================================================
 * Task 4: Edit Memory (Collection Item)
 * ============================================================================
 *
 * @file task-4.ts
 * @module components/tasks/task-4
 *
 * @description
 * This task handles updating an existing memory item's textual details and metadata
 * (name/title, notes/description, date of memory, and page display order).
 * Upstream field validation (such as requiring a name) is handled declaratively
 * by React Hook Form (\`register\`, \`required\`, \`valueAsNumber\`).
 * This function receives the pre-validated form inputs, sends a partial update to
 * Supabase via a Next.js Server Action, and returns the updated record while keeping
 * existing media attachments intact.
 *
 * NOTE: This function specifically manages text details and order, NOT image/photo
 * file replacements (which is handled separately in Task 8).
 *
 * @usedBy
 * - \`EditMemoryItemModal.tsx\` (\`app/components/EditMemoryItemModal.tsx\`)
 *   Invoked inside \`handleSubmit(onSubmit)\` when the user edits a memory's text or date.
 */

import { CollectionItem } from '../../types/collection_item'
import { updateCollectionItem } from '../../actions/collection_items'

/**
 * Form inputs for updating an existing memory item.
 * Upstream validation is handled by React Hook Form.
 */
export interface EditMemoryFormInputs {
  /** Updated title of this memory moment (required, validated by React Hook Form) */
  name: string
  /** Updated romantic narrative, thoughts, or notes (optional) */
  description?: string
  /** Updated memory date string in YYYY-MM-DD format (optional) */
  memory_date?: string
  /** Updated sequence order for the flip book page display (optional) */
  order?: number
}

/**
 * Updates an existing memory item's textual metadata and page order in the database.
 *
 * @param {CollectionItem} itemToEdit - The current memory item being modified.
 * @param {EditMemoryFormInputs} data - Pre-validated form fields from React Hook Form.
 * @param {(item: CollectionItem, isEdit: boolean) => void} [onSuccess] - Optional callback triggered on successful update.
 * @param {(message: string) => void} [showNotification] - Optional notification trigger for success and error alerts.
 * @returns {Promise<CollectionItem>} The updated memory item record.
 *
 * @example
 * \`\`\`ts
 * const updated = await editMemory(
 *   currentMemory,
 *   { name: "Second Date at the Beach", description: "Watching the sunset", order: 2 },
 *   (item) => replaceItemInState(item),
 *   showNotification
 * );
 * \`\`\`
 */
export async function editMemory(
  itemToEdit: CollectionItem,
  data: EditMemoryFormInputs,
  onSuccess?: (item: CollectionItem, isEdit: boolean) => void,
  showNotification?: (message: string) => void
): Promise<CollectionItem> {
  try {
    /**
     * --------------------------------------------------------------------------
     * Step 1: Assemble partial update payload
     * --------------------------------------------------------------------------
     * Specification:
     * - Form validation (ensuring memory name is present) is handled upfront by React Hook Form.
     * - Target the specific memory item via its identifier (\`itemToEdit.id\`).
     * - Map updated fields (\`name\`, \`description\`, \`memory_date\`, \`order\`),
     *   falling back empty fields to \`null\` to clear previous values in the database.
     */
    // Assemble the partial update payload with item ID and edited fields.
    // Target the existing memory item ID to update.
    // Update memory name/title from validated form input.
    // Update narrative description or set to null if empty.
    // Update memory date or set to null if empty.
    // Update book page display order index.
    // TODO: Assemble the partial update payload object here

    /**
     * --------------------------------------------------------------------------
     * Step 2: Call Server Action to update database record
     * --------------------------------------------------------------------------
     * Specification:
     * - Execute \`updateCollectionItem(payload)\` to run an UPDATE query in Supabase.
     * - Verify update response; if error or missing data, display toast alert,
     *   log error, and throw Error.
     */
    // Call server action updateCollectionItem to update the record in Supabase.
    // Check if the update query returned an error or missing data.
    // Derive error message from response or fallback text.
    // Log update failure to the console.
    // Display toast notification alerting user to the failure.
    // Throw error to break execution into catch block.
    // TODO: Call server action updateCollectionItem and handle error response here

    /**
     * --------------------------------------------------------------------------
     * Step 3: Merge returned data, display success toast, and notify parent state
     * --------------------------------------------------------------------------
     * Specification:
     * - Safeguard existing \`image_url\` while merging returned data into updated memory item.
     * - Display a success toast notification via \`showNotification\`.
     * - Invoke \`onSuccess(updatedItem, true)\` callback to notify parent components of edit.
     * - Return the updated \`CollectionItem\` record.
     */
    // Merge updated fields while safeguarding existing image_url.
    // Display success toast notification upon successful update.
    // Check if an onSuccess callback was provided by parent component.
    // Notify parent component that item was updated (isEdit = true).
    // Return the updated memory item record.
    // TODO: Merge updated fields, display success toast, call onSuccess, and return updatedItem

    const updatedItem: CollectionItem = undefined as any
    return updatedItem
  } catch (error) {
    // Extract message from caught error object.
    const errorMsg = error instanceof Error ? error.message : 'Failed to update memory item.'
    // Show error toast notification to the user.
    showNotification?.(errorMsg)
    // Re-throw error so caller can handle form submission state.
    throw error
  }
}`,
      solutionCode: `/**
 * ============================================================================
 * Task 4: Edit Memory (Collection Item)
 * ============================================================================
 *
 * @file task-4.ts
 * @module components/tasks/task-4
 *
 * @description
 * This task handles updating an existing memory item's textual details and metadata
 * (name/title, notes/description, date of memory, and page display order).
 * Upstream field validation (such as requiring a name) is handled declaratively
 * by React Hook Form (\`register\`, \`required\`, \`valueAsNumber\`).
 * This function receives the pre-validated form inputs, sends a partial update to
 * Supabase via a Next.js Server Action, and returns the updated record while keeping
 * existing media attachments intact.
 *
 * NOTE: This function specifically manages text details and order, NOT image/photo
 * file replacements (which is handled separately in Task 8).
 *
 * @usedBy
 * - \`EditMemoryItemModal.tsx\` (\`app/components/EditMemoryItemModal.tsx\`)
 *   Invoked inside \`handleSubmit(onSubmit)\` when the user edits a memory's text or date.
 */

import { CollectionItem } from '../../types/collection_item'
import { updateCollectionItem } from '../../actions/collection_items'

/**
 * Form inputs for updating an existing memory item.
 * Upstream validation is handled by React Hook Form.
 */
export interface EditMemoryFormInputs {
  /** Updated title of this memory moment (required, validated by React Hook Form) */
  name: string
  /** Updated romantic narrative, thoughts, or notes (optional) */
  description?: string
  /** Updated memory date string in YYYY-MM-DD format (optional) */
  memory_date?: string
  /** Updated sequence order for the flip book page display (optional) */
  order?: number
}

/**
 * Updates an existing memory item's textual metadata and page order in the database.
 *
 * @param {CollectionItem} itemToEdit - The current memory item being modified.
 * @param {EditMemoryFormInputs} data - Pre-validated form fields from React Hook Form.
 * @param {(item: CollectionItem, isEdit: boolean) => void} [onSuccess] - Optional callback triggered on successful update.
 * @param {(message: string) => void} [showNotification] - Optional notification trigger for success and error alerts.
 * @returns {Promise<CollectionItem>} The updated memory item record.
 *
 * @example
 * \`\`\`ts
 * const updated = await editMemory(
 *   currentMemory,
 *   { name: "Second Date at the Beach", description: "Watching the sunset", order: 2 },
 *   (item) => replaceItemInState(item),
 *   showNotification
 * );
 * \`\`\`
 */
export async function editMemory(
  itemToEdit: CollectionItem,
  data: EditMemoryFormInputs,
  onSuccess?: (item: CollectionItem, isEdit: boolean) => void,
  showNotification?: (message: string) => void
): Promise<CollectionItem> {
  try {
    /**
     * --------------------------------------------------------------------------
     * Step 1: Assemble partial update payload
     * --------------------------------------------------------------------------
     * Specification:
     * - Form validation (ensuring memory name is present) is handled upfront by React Hook Form.
     * - Target the specific memory item via its identifier (\`itemToEdit.id\`).
     * - Map updated fields (\`name\`, \`description\`, \`memory_date\`, \`order\`),
     *   falling back empty fields to \`null\` to clear previous values in the database.
     */
    // Assemble the partial update payload with item ID and edited fields.
    const payload = {
      // Target the existing memory item ID to update.
      id: itemToEdit.id,
      // Update memory name/title from validated form input.
      name: data.name,
      // Update narrative description or set to null if empty.
      description: data.description || null,
      // Update memory date or set to null if empty.
      memory_date: data.memory_date || null,
      // Update book page display order index.
      order: data.order,
    }

    /**
     * --------------------------------------------------------------------------
     * Step 2: Call Server Action to update database record
     * --------------------------------------------------------------------------
     * Specification:
     * - Execute \`updateCollectionItem(payload)\` to run an UPDATE query in Supabase.
     * - Verify update response; if error or missing data, display toast alert,
     *   log error, and throw Error.
     */
    // Call server action updateCollectionItem to update the record in Supabase.
    const res = await updateCollectionItem(payload)

    // Check if the update query returned an error or missing data.
    if (res?.error || !res?.data) {
      // Derive error message from response or fallback text.
      const errorMsg = res?.error ?? 'Failed to update memory item in the database.'
      // Log update failure to the console.
      console.error(errorMsg)
      // Display toast notification alerting user to the failure.
      showNotification?.(errorMsg)
      // Throw error to break execution into catch block.
      throw new Error(errorMsg)
    }

    /**
     * --------------------------------------------------------------------------
     * Step 3: Merge returned data, display success toast, and notify parent state
     * --------------------------------------------------------------------------
     * Specification:
     * - Safeguard existing \`image_url\` while merging returned data into updated memory item.
     * - Display a success toast notification via \`showNotification\`.
     * - Invoke \`onSuccess(updatedItem, true)\` callback to notify parent components of edit.
     * - Return the updated \`CollectionItem\` record.
     */
    // Merge updated fields while safeguarding existing image_url.
    const updatedItem: CollectionItem = {
      ...res.data,
      image_url: res.data.image_url,
    }

    // Display success toast notification upon successful update.
    showNotification?.('Memory item updated successfully!')

    // Check if an onSuccess callback was provided by parent component.
    if (onSuccess) {
      // Notify parent component that item was updated (isEdit = true).
      onSuccess(updatedItem, true)
    }

    // Return the updated memory item record.
    return updatedItem
  } catch (error) {
    // Extract message from caught error object.
    const errorMsg = error instanceof Error ? error.message : 'Failed to update memory item.'
    // Show error toast notification to the user.
    showNotification?.(errorMsg)
    // Re-throw error so caller can handle form submission state.
    throw error
  }
}`,
      solutionExplanation:
        'In Task 4, updating an existing memory targets itemToEdit.id. In Step 1, data.order is passed directly while optional text/date fields fall back to null via data.field || null. In Step 2, updateCollectionItem runs the PostgreSQL UPDATE. In Step 3, image_url: res.data.image_url ensures existing uploaded photos are preserved, and onSuccess(updatedItem, true) signals parent state to replace the edited item in place.',
    },
    sections: [
      {
        title: 'Task Overview & File Target',
        description:
          'Open components/tasks/task-4.ts in your project. Assemble the update payload with itemToEdit.id, execute updateCollectionItem, safeguard image_url, and invoke onSuccess with isEdit = true.',
      },
    ],
  },
  {
    id: 12,
    stepNumber: 12,
    category: 'task',
    badge: 'Coding Task 5',
    title: 'Task 5: Search Collections (task-5.ts)',
    shortTitle: 'Task 5: Search',
    summary:
      'Implement a pure, case-insensitive client search utility that filters memory collections by matching user queries against title and description fields.',
    estimatedTime: '5-10 mins',
    codingTask: {
      taskNumber: 5,
      file: 'components/tasks/task-5.ts',
      usedBy: 'CollectionListSection.tsx (app/components/CollectionListSection.tsx)',
      purpose:
        'Provides a pure, case-insensitive in-memory search function for collections without triggering database queries. Used inside useMemo in CollectionListSection, it sanitizes user input and filters collections matching by title (name) or description.',
      keyConcepts: [
        {
          name: 'collections: CollectionWithItems[]',
          role: 'Source Data Array',
          explanation:
            'Active array of collections in client memory, enabling fast client-side filtering without DB overhead.',
        },
        {
          name: 'query: string',
          role: 'Raw Search String',
          explanation:
            'Raw search string entered by the user in CollectionToolbar.',
        },
        {
          name: 'Defensive Input Guard (!collections || collections.length === 0)',
          role: 'Null Safety & Runtime Protection',
          explanation:
            'Immediately returns [] if the array is missing or empty, avoiding runtime errors.',
        },
        {
          name: 'normalizedQuery: string',
          role: 'Sanitized Query Token',
          explanation:
            "Constructed via (query || '').trim().toLowerCase() to enable clean, case-insensitive substring matching.",
        },
        {
          name: "Fast-Path Exit (normalizedQuery === '')",
          role: 'Optimization & Reference Preservation',
          explanation:
            'Returns the original array reference when the query is blank, bypassing unnecessary iterations and re-renders.',
        },
        {
          name: 'Array.prototype.filter',
          role: 'Immutable Array Derivation',
          explanation:
            'Iterates through collections and returns a new filtered array without mutating the source list.',
        },
        {
          name: 'nameMatch & descriptionMatch',
          role: 'Dual Substring Matching Predicates',
          explanation:
            'Safely checks .toLowerCase().includes(normalizedQuery) on title and optional description without crashing on null.',
        },
        {
          name: 'nameMatch || descriptionMatch',
          role: 'Disjunctive Search Condition',
          explanation:
            'Retains the collection if the search query matches either its title or its description.',
        },
      ],
      starterCode: `/**
 * ============================================================================
 * Task 5: Search Collections by Title or Description
 * ============================================================================
 *
 * @file task-5.ts
 * @module components/tasks/task-5
 *
 * @description
 * This task provides a pure filtering utility that searches an array of collections
 * by matching a user's search query against collection titles (\`name\`) and \`description\`
 * text in a case-insensitive manner.
 *
 * @usedBy
 * - \`CollectionListSection.tsx\` (\`app/components/CollectionListSection.tsx\`)
 *   Used inside the \`useMemo\` filter pipeline whenever the user types into the
 *   search bar in \`CollectionToolbar\`.
 */

import { CollectionWithItems } from '../../types/collection'

/**
 * Filters a list of collections matching a query string in either their title (\`name\`)
 * or their \`description\`.
 *
 * @param {CollectionWithItems[]} collections - The source array of collections to search through.
 * @param {string} query - The search string entered by the user.
 * @returns {CollectionWithItems[]} A new array containing only the matching collections.
 *
 * @example
 * \`\`\`ts
 * const allCollections = [...];
 * const results = searchByTitleOrDescription(allCollections, "Lapland");
 * console.log(\`Found \${results.length} matches\`);
 * \`\`\`
 */
export function searchByTitleOrDescription(
  collections: CollectionWithItems[],
  query: string
): CollectionWithItems[] {
  /**
   * --------------------------------------------------------------------------
   * Step 1: Validate input and handle empty collections
   * --------------------------------------------------------------------------
   * Specification:
   * - Guard against empty, null, or undefined collection arrays.
   * - Immediately return an empty array \`[]\` to avoid runtime evaluation errors.
   */
  // Check if collection array is empty or undefined.
  // Return an empty array immediately when no collections exist.
  if (!collections || collections.length === 0) {
    // Return an empty array immediately when no collections exist.
    return []
  }
  /**
   * --------------------------------------------------------------------------
   * Step 2: Sanitize and normalize search query
   * --------------------------------------------------------------------------
   * Specification:
   * - Strip leading and trailing whitespace using \`.trim()\`.
   * - Convert query string to lowercase for case-insensitive matching.
   * - Fast-path exit: return the unfiltered \`collections\` array if query is empty.
   */
  // Trim whitespace and convert query to lowercase for case-insensitive matching.
  // Check if the normalized query is empty.
  // Return the original collection array directly if no search keyword is given.
  const normalizedQuery = (query || '').trim().toLowerCase()

  // Check if the normalized query is empty.
  if (normalizedQuery === '') {
    // Return the original collection array directly if no search keyword is given.
    return collections
  }
  /**
   * --------------------------------------------------------------------------
   * Step 3: Filter collections using case-insensitive substring matching
   * --------------------------------------------------------------------------
   * Specification:
   * - Iterate across collection entries using \`Array.prototype.filter\`.
   * - Check if \`collection.name\` contains \`normalizedQuery\`.
   * - Check if \`collection.description\` contains \`normalizedQuery\`.
   * - Return only collections satisfying at least one match condition.
   */
  // Filter collections array based on matching title or description.
  // Check if collection name exists and contains search term.
  // Check if collection description exists and contains search term.
  // Keep collection in filtered results if name or description matches.
  // TODO: Filter collections array based on matching title or description and return results

  return []
}`,
      solutionCode: `/**
 * ============================================================================
 * Task 5: Search Collections by Title or Description
 * ============================================================================
 *
 * @file task-5.ts
 * @module components/tasks/task-5
 *
 * @description
 * This task provides a pure filtering utility that searches an array of collections
 * by matching a user's search query against collection titles (\`name\`) and \`description\`
 * text in a case-insensitive manner.
 *
 * @usedBy
 * - \`CollectionListSection.tsx\` (\`app/components/CollectionListSection.tsx\`)
 *   Used inside the \`useMemo\` filter pipeline whenever the user types into the
 *   search bar in \`CollectionToolbar\`.
 */

import { CollectionWithItems } from '../../types/collection'

/**
 * Filters a list of collections matching a query string in either their title (\`name\`)
 * or their \`description\`.
 *
 * @param {CollectionWithItems[]} collections - The source array of collections to search through.
 * @param {string} query - The search string entered by the user.
 * @returns {CollectionWithItems[]} A new array containing only the matching collections.
 *
 * @example
 * \`\`\`ts
 * const allCollections = [...];
 * const results = searchByTitleOrDescription(allCollections, "Lapland");
 * console.log(\`Found \${results.length} matches\`);
 * \`\`\`
 */
export function searchByTitleOrDescription(
  collections: CollectionWithItems[],
  query: string
): CollectionWithItems[] {
  /**
   * --------------------------------------------------------------------------
   * Step 1: Validate input and handle empty collections
   * --------------------------------------------------------------------------
   * Specification:
   * - Guard against empty, null, or undefined collection arrays.
   * - Immediately return an empty array \`[]\` to avoid runtime evaluation errors.
   */
  // Check if collection array is empty or undefined.
  if (!collections || collections.length === 0) {
    // Return an empty array immediately when no collections exist.
    return []
  }

  /**
   * --------------------------------------------------------------------------
   * Step 2: Sanitize and normalize search query
   * --------------------------------------------------------------------------
   * Specification:
   * - Strip leading and trailing whitespace using \`.trim()\`.
   * - Convert query string to lowercase for case-insensitive matching.
   * - Fast-path exit: return the unfiltered \`collections\` array if query is empty.
   */
  // Trim whitespace and convert query to lowercase for case-insensitive matching.
  const normalizedQuery = (query || '').trim().toLowerCase()

  // Check if the normalized query is empty.
  if (normalizedQuery === '') {
    // Return the original collection array directly if no search keyword is given.
    return collections
  }

  /**
   * --------------------------------------------------------------------------
   * Step 3: Filter collections using case-insensitive substring matching
   * --------------------------------------------------------------------------
   * Specification:
   * - Iterate across collection entries using \`Array.prototype.filter\`.
   * - Check if \`collection.name\` contains \`normalizedQuery\`.
   * - Check if \`collection.description\` contains \`normalizedQuery\`.
   * - Return only collections satisfying at least one match condition.
   */
  // Filter collections array based on matching title or description.
  return collections.filter((collection) => {
    // Check if collection name exists and contains search term.
    const nameMatch = collection.name
      ? collection.name.toLowerCase().includes(normalizedQuery)
      : false

    // Check if collection description exists and contains search term.
    const descriptionMatch = collection.description
      ? collection.description.toLowerCase().includes(normalizedQuery)
      : false

    // Keep collection in filtered results if name or description matches.
    return nameMatch || descriptionMatch
  })
}`,
      solutionExplanation:
        'In Task 5, searchByTitleOrDescription filters collections in memory using Array.prototype.filter. It checks if collection.name contains normalizedQuery, and if collection.description (if present) contains normalizedQuery. Using nameMatch || descriptionMatch ensures any collection matching either field is returned.',
    },
    sections: [
      {
        title: 'Task Overview & File Target',
        description:
          'Open components/tasks/task-5.ts in your project. Implement searchByTitleOrDescription using collections.filter to evaluate nameMatch and descriptionMatch against normalizedQuery.',
      },
    ],
  },
  {
    id: 13,
    stepNumber: 13,
    category: 'task',
    badge: 'Coding Task 6',
    title: 'Task 6: Sort Collections by Criteria (task-6.ts)',
    shortTitle: 'Task 6: Sort',
    summary:
      'Implement onSortChange to update sorting state and reset pagination to page 1, and implement sortCollections with 8 immutable sorting criteria including date timestamps, alphabetical locale comparisons, memory counts, and missing-date handling.',
    estimatedTime: '10-15 mins',
    codingTask: {
      taskNumber: 6,
      file: 'components/tasks/task-6.ts',
      usedBy: 'CollectionToolbar.tsx & CollectionListSection.tsx',
      purpose:
        'Handles sorting and pagination resets for collections. When a user selects a sort option, onSortChange updates state and resets pagination to page 1. Inside CollectionListSection, sortCollections returns an immutably sorted copy supporting 8 criteria: creation dates, titles (localeCompare), item counts, and event start dates.',
      keyConcepts: [
        {
          name: 'onSortChange(newSort, setSortBy, setCurrentPage)',
          role: 'Sort Event & Pagination Reset Handler',
          explanation:
            'Updates active sort state and resets currentPage to 1 to avoid stranded or empty pagination views.',
        },
        {
          name: 'setSortBy: (sort: SortOption) => void',
          role: 'React State Dispatcher for Sort Option',
          explanation:
            'React state setter for sort criteria, triggering list re-computation in useMemo.',
        },
        {
          name: 'setCurrentPage: (page: number) => void',
          role: 'Pagination State Dispatcher',
          explanation:
            'React state setter resetting pagination to page 1 when sort order changes.',
        },
        {
          name: 'sortCollections(collections, sortBy)',
          role: 'Pure Immutable Sorting Engine',
          explanation:
            'Pure sorting function that shallow-copies the array and applies targeted comparators across 8 sort modes.',
        },
        {
          name: 'const sorted = [...collections]',
          role: 'Immutable Array Copy',
          explanation:
            'Creates a shallow clone so Array.prototype.sort() does not mutate React props or state.',
        },
        {
          name: 'timeB - timeA & timeA - timeB (Epoch Milliseconds)',
          role: 'Timestamp Epoch Differencing',
          explanation:
            'Converts ISO timestamps to Unix epoch milliseconds (getTime()) for chronological ordering.',
        },
        {
          name: 'nameA.localeCompare(nameB)',
          role: 'Alphabetical String Locale Comparison',
          explanation:
            'Performs locale-sensitive alphabetical sorting supporting accents, casing, and international characters.',
        },
        {
          name: 'countB - countA & countA - countB (Memory Item Count)',
          role: 'Nested Relation Cardinality Sorting',
          explanation:
            'Sorts collections by memory count using collection_items?.length || 0.',
        },
        {
          name: 'Missing Date Sink Logic (start_date_asc / start_date_desc)',
          role: 'Null-Safe Date Comparison',
          explanation:
            'Gracefully sinks collections with null or missing start_time to the end of the list without breaking sort stability.',
        },
      ],
      starterCode: `/**
 * ============================================================================
 * Task 6: Sort Collections by Various Criteria
 * ============================================================================
 *
 * @file task-6.ts
 * @module components/tasks/task-6
 *
 * @description
 * This task manages sorting and pagination resets for collections.
 * It contains two functions:
 * 1. \`onSortChange\`: Handles changing the active sort criteria and resetting pagination to page 1.
 * 2. \`sortCollections\`: Pure function that sorts a collections array based on a selected criterion
 *    without mutating the original array.
 *
 * @usedBy
 * - \`CollectionToolbar.tsx\` (\`app/components/CollectionToolbar.tsx\`)
 *   Invoked when the user selects a sort option in the sorting dropdown.
 * - \`CollectionListSection.tsx\` (\`app/components/CollectionListSection.tsx\`)
 *   Invoked within the \`useMemo\` computation pipeline after filtering.
 */

import { CollectionWithItems } from '../../types/collection'

/**
 * Supported sorting criteria for the collection list:
 * - \`created_at_desc\`: Newest first (default)
 * - \`created_at_asc\`: Oldest first
 * - \`name_asc\`: Alphabetical A to Z
 * - \`name_desc\`: Alphabetical Z to A
 * - \`items_desc\`: Most memories first
 * - \`items_asc\`: Fewest memories first
 * - \`start_date_asc\`: Event start date earliest first
 * - \`start_date_desc\`: Event start date latest first
 */
export type SortOption =
  | 'created_at_desc'
  | 'created_at_asc'
  | 'name_asc'
  | 'name_desc'
  | 'items_desc'
  | 'items_asc'
  | 'start_date_asc'
  | 'start_date_desc'

/**
 * Handles sort criteria change by updating the state and resetting pagination back to page 1.
 *
 * @param {SortOption} newSort - The newly selected sorting option.
 * @param {(sort: SortOption) => void} setSortBy - State setter function for the active sort criteria.
 * @param {(page: number) => void} setCurrentPage - State setter function for the current page number.
 *
 * @example
 * \`\`\`ts
 * onSortChange('name_asc', setSortBy, setCurrentPage);
 * \`\`\`
 */
export function onSortChange(
  newSort: SortOption,
  setSortBy: (sort: SortOption) => void,
  setCurrentPage: (page: number) => void
): void {
  /**
   * --------------------------------------------------------------------------
   * Step 1: Update active sort criteria state
   * --------------------------------------------------------------------------
   * Specification:
   * - Invoke \`setSortBy(newSort)\` to notify React of the newly selected sorting mode.
   */
  // Update state with the newly selected sorting option.
  // TODO: Update state with the newly selected sorting option (setSortBy)

  /**
   * --------------------------------------------------------------------------
   * Step 2: Reset pagination to initial page
   * --------------------------------------------------------------------------
   * Specification:
   * - Call \`setCurrentPage(1)\` to return view to page 1, preventing stranded empty pages.
   */
  // Reset pagination back to page 1 to prevent empty pages on re-sort.
  // TODO: Reset pagination back to page 1 (setCurrentPage)
}

/**
 * Pure function that returns a new array of collections sorted according to the chosen criterion.
 *
 * @param {CollectionWithItems[]} collections - The array of collections to sort.
 * @param {SortOption} sortBy - The criterion by which to order the collections.
 * @returns {CollectionWithItems[]} A new, sorted array of collections.
 *
 * @example
 * \`\`\`ts
 * const sorted = sortCollections(collections, 'items_desc');
 * \`\`\`
 */
export function sortCollections(
  collections: CollectionWithItems[],
  sortBy: SortOption
): CollectionWithItems[] {
  /**
   * --------------------------------------------------------------------------
   * Step 1: Handle trivial cases and create immutable shallow copy
   * --------------------------------------------------------------------------
   * Specification:
   * - If \`collections\` has 1 or 0 elements, return it immediately to avoid overhead.
   * - Create a shallow copy \`[...collections]\` to guarantee immutability and protect props.
   */
  // Check if collections list has 1 or fewer items to skip sorting.
  if (!collections || collections.length <= 1) {
    // Return original array or empty array if null/undefined.
    return collections || []
  }

  // Create shallow copy of array to maintain immutability and avoid mutating props.
  const sorted = [...collections]

  /**
   * --------------------------------------------------------------------------
   * Step 2: Execute sorting comparator based on selected option
   * --------------------------------------------------------------------------
   * Specification:
   * - In-place sort the cloned array using \`Array.prototype.sort\`.
   * - Branch across 8 sorting modes via \`switch (sortBy)\`:
   *   * \`created_at_desc\` / \`created_at_asc\`: Numerical comparison on timestamp epochs.
   *   * \`name_asc\` / \`name_desc\`: String locale comparison via \`String.prototype.localeCompare\`.
   *   * \`items_desc\` / \`items_asc\`: Difference comparison on \`collection_items.length\`.
   *   * \`start_date_asc\` / \`start_date_desc\`: Date comparisons with missing-date sink logic.
   *   * \`default\`: Preserve original order (return 0).
   */
  // Sort array in-place using comparator based on active sort option.
  sorted.sort((a, b) => {
    // Determine comparator logic corresponding to selected sortBy option.
    switch (sortBy) {
      // Sort collections by newest creation timestamp first.
      case 'created_at_desc': {
        // Parse creation date of collection A into epoch milliseconds.
        const timeA = a.created_at ? new Date(a.created_at).getTime() : 0
        // Parse creation date of collection B into epoch milliseconds.
        const timeB = b.created_at ? new Date(b.created_at).getTime() : 0
        // Calculate descending difference so newer dates appear first.
        return timeB - timeA
      }

      // Sort collections by oldest creation timestamp first.
      case 'created_at_asc': {
        // Parse creation date of collection A into epoch milliseconds.
        // Parse creation date of collection B into epoch milliseconds.
        // Calculate ascending difference so older dates appear first.
        // TODO: Implement created_at_asc comparison
        return 0
      }

      // Sort collections alphabetically by name from A to Z.
      case 'name_asc': {
        // Retrieve name of collection A or empty string fallback.
        // Retrieve name of collection B or empty string fallback.
        // Compare names in ascending alphabetical order.
        // TODO: Implement name_asc comparison
        return 0
      }

      // Sort collections alphabetically by name from Z to A.
      case 'name_desc': {
        // Retrieve name of collection A or empty string fallback.
        // Retrieve name of collection B or empty string fallback.
        // Compare names in descending alphabetical order.
        // TODO: Implement name_desc comparison
        return 0
      }

      // Sort collections by memory count in descending order.
      case 'items_desc': {
        // Count number of memory items in collection A.
        // Count number of memory items in collection B.
        // Return descending difference so collections with most items appear first.
        // TODO: Implement items_desc comparison
        return 0
      }

      // Sort collections by memory count in ascending order.
      case 'items_asc': {
        // Count number of memory items in collection A.
        // Count number of memory items in collection B.
        // Return ascending difference so collections with fewest items appear first.
        // TODO: Implement items_asc comparison
        return 0
      }

      // Sort collections by event start date in ascending order (earliest first).
      case 'start_date_asc': {
        // Keep order if both collections have no start date.
        // Place collection without start date after collection with date.
        // Place collection with start date before collection without date.
        // Compare start timestamps in ascending order.
        // TODO: Implement start_date_asc comparison
        return 0
      }

      // Sort collections by event start date in descending order (latest first).
      case 'start_date_desc': {
        // Keep order if both collections have no start date.
        // Place collection without start date after collection with date.
        // Place collection with start date before collection without date.
        // Compare start timestamps in descending order.
        // TODO: Implement start_date_desc comparison
        return 0
      }

      // Return 0 as default to preserve original order for unrecognized sort keys.
      default:
        return 0
    }
  })

  /**
   * --------------------------------------------------------------------------
   * Step 3: Return sorted collections array
   * --------------------------------------------------------------------------
   * Specification:
   * - Return the newly ordered array without modifying the source collection.
   */
  // Return the newly sorted array of collections.
  return sorted
}
`,
      solutionCode: `/**
 * ============================================================================
 * Task 6: Collection Sorting & Sort Change Handler
 * ============================================================================
 *
 * @file task-6.ts
 * @module components/tasks/task-6
 *
 * @description
 * This task manages sorting collections according to user-selected criteria.
 * It provides:
 * 1. \`onSortChange\`: An event handler that updates the active sort criteria and
 *    resets current pagination back to page 1.
 * 2. \`sortCollections\`: A pure, immutable sorting engine that sorts an array of
 *    collections by creation date, title, memory count, or start date.
 *
 * @usedBy
 * - \`CollectionToolbar.tsx\` (\`app/components/CollectionToolbar.tsx\`)
 * - \`CollectionListSection.tsx\` (\`app/components/CollectionListSection.tsx\`)
 *   Invoked when the user selects a sort option from the sorting dropdown menu.
 */

import { CollectionWithItems } from '../../types/collection'
import { SortOption } from '../CollectionToolbar'

/**
 * Handles a sort option change event: updates the sorting state and resets pagination.
 *
 * @param {SortOption} newSort - The newly selected sorting option value.
 * @param {(sort: SortOption) => void} setSortBy - State setter function for the active sort criteria.
 * @param {(page: number) => void} setCurrentPage - State setter function for the current page number.
 *
 * @example
 * \`\`\`ts
 * onSortChange('name_asc', setSortBy, setCurrentPage);
 * \`\`\`
 */
export function onSortChange(
  newSort: SortOption,
  setSortBy: (sort: SortOption) => void,
  setCurrentPage: (page: number) => void
): void {
  /**
   * --------------------------------------------------------------------------
   * Step 1: Update active sort criteria state
   * --------------------------------------------------------------------------
   * Specification:
   * - Invoke \`setSortBy(newSort)\` to notify React of the newly selected sorting mode.
   */
  // Update state with the newly selected sorting option.
  setSortBy(newSort)

  /**
   * --------------------------------------------------------------------------
   * Step 2: Reset pagination to initial page
   * --------------------------------------------------------------------------
   * Specification:
   * - Call \`setCurrentPage(1)\` to return view to page 1, preventing stranded empty pages.
   */
  // Reset pagination back to page 1 to prevent empty pages on re-sort.
  setCurrentPage(1)
}

/**
 * Pure function that returns a new array of collections sorted according to the chosen criterion.
 *
 * @param {CollectionWithItems[]} collections - The array of collections to sort.
 * @param {SortOption} sortBy - The criterion by which to order the collections.
 * @returns {CollectionWithItems[]} A new, sorted array of collections.
 *
 * @example
 * \`\`\`ts
 * const sorted = sortCollections(collections, 'items_desc');
 * \`\`\`
 */
export function sortCollections(
  collections: CollectionWithItems[],
  sortBy: SortOption
): CollectionWithItems[] {
  /**
   * --------------------------------------------------------------------------
   * Step 1: Handle trivial cases and create immutable shallow copy
   * --------------------------------------------------------------------------
   * Specification:
   * - If \`collections\` has 1 or 0 elements, return it immediately to avoid overhead.
   * - Create a shallow copy \`[...collections]\` to guarantee immutability and protect props.
   */
  // Check if collections list has 1 or fewer items to skip sorting.
  if (!collections || collections.length <= 1) {
    // Return original array or empty array if null/undefined.
    return collections || []
  }

  // Create shallow copy of array to maintain immutability and avoid mutating props.
  const sorted = [...collections]

  /**
   * --------------------------------------------------------------------------
   * Step 2: Execute sorting comparator based on selected option
   * --------------------------------------------------------------------------
   * Specification:
   * - In-place sort the cloned array using \`Array.prototype.sort\`.
   * - Branch across 8 sorting modes via \`switch (sortBy)\`:
   *   * \`created_at_desc\` / \`created_at_asc\`: Numerical comparison on timestamp epochs.
   *   * \`name_asc\` / \`name_desc\`: String locale comparison via \`String.prototype.localeCompare\`.
   *   * \`items_desc\` / \`items_asc\`: Difference comparison on \`collection_items.length\`.
   *   * \`start_date_asc\` / \`start_date_desc\`: Date comparisons with missing-date sink logic.
   *   * \`default\`: Preserve original order (return 0).
   */
  // Sort array in-place using comparator based on active sort option.
  sorted.sort((a, b) => {
    // Determine comparator logic corresponding to selected sortBy option.
    switch (sortBy) {
      // Sort collections by newest creation timestamp first.
      case 'created_at_desc': {
        // Parse creation date of collection A into epoch milliseconds.
        const timeA = a.created_at ? new Date(a.created_at).getTime() : 0
        // Parse creation date of collection B into epoch milliseconds.
        const timeB = b.created_at ? new Date(b.created_at).getTime() : 0
        // Calculate descending difference so newer dates appear first.
        return timeB - timeA
      }

      // Sort collections by oldest creation timestamp first.
      case 'created_at_asc': {
        // Parse creation date of collection A into epoch milliseconds.
        const timeA = a.created_at ? new Date(a.created_at).getTime() : 0
        // Parse creation date of collection B into epoch milliseconds.
        const timeB = b.created_at ? new Date(b.created_at).getTime() : 0
        // Calculate ascending difference so older dates appear first.
        return timeA - timeB
      }

      // Sort collections alphabetically by name from A to Z.
      case 'name_asc': {
        // Retrieve name of collection A or empty string fallback.
        const nameA = a.name || ''
        // Retrieve name of collection B or empty string fallback.
        const nameB = b.name || ''
        // Compare names in ascending alphabetical order.
        return nameA.localeCompare(nameB)
      }

      // Sort collections alphabetically by name from Z to A.
      case 'name_desc': {
        // Retrieve name of collection A or empty string fallback.
        const nameA = a.name || ''
        // Retrieve name of collection B or empty string fallback.
        const nameB = b.name || ''
        // Compare names in descending alphabetical order.
        return nameB.localeCompare(nameA)
      }

      // Sort collections by memory count in descending order.
      case 'items_desc': {
        // Count number of memory items in collection A.
        const countA = a.collection_items?.length || 0
        // Count number of memory items in collection B.
        const countB = b.collection_items?.length || 0
        // Return descending difference so collections with most items appear first.
        return countB - countA
      }

      // Sort collections by memory count in ascending order.
      case 'items_asc': {
        // Count number of memory items in collection A.
        const countA = a.collection_items?.length || 0
        // Count number of memory items in collection B.
        const countB = b.collection_items?.length || 0
        // Return ascending difference so collections with fewest items appear first.
        return countA - countB
      }

      // Sort collections by event start date in ascending order (earliest first).
      case 'start_date_asc': {
        // Keep order if both collections have no start date.
        if (!a.start_time && !b.start_time) return 0
        // Place collection without start date after collection with date.
        if (!a.start_time) return 1
        // Place collection with start date before collection without date.
        if (!b.start_time) return -1
        // Compare start timestamps in ascending order.
        return new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
      }

      // Sort collections by event start date in descending order (latest first).
      case 'start_date_desc': {
        // Keep order if both collections have no start date.
        if (!a.start_time && !b.start_time) return 0
        // Place collection without start date after collection with date.
        if (!a.start_time) return 1
        // Place collection with start date before collection without date.
        if (!b.start_time) return -1
        // Compare start timestamps in descending order.
        return new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
      }

      // Return 0 as default to preserve original order for unrecognized sort keys.
      default:
        return 0
    }
  })

  /**
   * --------------------------------------------------------------------------
   * Step 3: Return sorted collections array
   * --------------------------------------------------------------------------
   * Specification:
   * - Return the newly ordered array without modifying the source collection.
   */
  // Return the newly sorted array of collections.
  return sorted
}
`,
      solutionExplanation:
        'In Task 6, onSortChange sets the new sort criterion via setSortBy(newSort) and resets the view with setCurrentPage(1). In sortCollections, a shallow clone [...collections] is sorted via a switch (sortBy) statement: timestamps use numeric epoch subtraction (new Date(ts).getTime()), names use localeCompare for linguistic accuracy, item counts compare collection_items.length, and start_time comparators safely sink null/missing dates to the end before subtracting epoch timestamps.',
    },
    sections: [
      {
        title: 'Task Overview & File Target',
        description:
          'Open components/tasks/task-6.ts in your project. Implement onSortChange to update sort criteria and reset page index, and complete the switch cases in sortCollections to support all 8 sorting modes.',
      },
    ],
  },
  {
    id: 14,
    stepNumber: 14,
    category: 'task',
    badge: 'Coding Task 7',
    title: 'Task 7: Edit Collection Poster (task-7.ts)',
    shortTitle: 'Task 7: Poster',
    summary:
      'Manage uploading, replacing, or removing a collection cover poster image by validating file formats, invoking the updateCollectionPoster Server Action to sync with Supabase Storage, generating optimistic preview URLs, and cleaning up storage assets.',
    estimatedTime: '10-15 mins',
    codingTask: {
      taskNumber: 7,
      file: 'components/tasks/task-7.ts',
      usedBy: 'EditCollectionModal.tsx (app/components/EditCollectionModal.tsx)',
      purpose:
        'Handles uploading, replacing, or deleting a collection\'s cover poster. It validates MIME types, triggers updateCollectionPoster to upload or delete assets in Supabase Storage (\'attachments\'), creates an optimistic preview, and updates database records and parent state.',
      keyConcepts: [
        {
          name: 'collection: CollectionWithItems',
          role: 'Baseline Collection Entity',
          explanation:
            'Supplies collection.id to target the PostgreSQL row and set storage folder pathing.',
        },
        {
          name: 'file: File | null',
          role: 'Input Media Payload',
          explanation:
            'Image file from file picker or drag-and-drop. Triggers upload if present, or deletion if null.',
        },
        {
          name: 'validTypes: [PNG, JPEG, JPG, WEBP]',
          role: 'Client-Side MIME Validation Whitelist',
          explanation:
            'Validates image formats on the client before upload to prevent rejected network requests.',
        },
        {
          name: 'updateCollectionPoster(collection, file)',
          role: 'Next.js Server Action with Supabase Storage',
          explanation:
            'Server Action uploading the file to Supabase Storage, removing old assets, and updating poster_url.',
        },
        {
          name: 'URL.createObjectURL(file)',
          role: 'Optimistic Browser Preview URL',
          explanation:
            'Generates a zero-latency local blob preview URL for instant UI display while uploading.',
        },
        {
          name: 'Case A: File Upload / Replacement',
          role: 'Image Attachment Workflow',
          explanation:
            'Uploads the file, sets optimistic poster_url, displays a toast notification, and invokes onSuccess.',
        },
        {
          name: 'Case B: File Removal / Deletion',
          role: 'Media Purge Workflow',
          explanation:
            'Calls the server action with null to purge the file from storage and reset poster_url to null.',
        },
        {
          name: 'onSuccess?(updatedCollection)',
          role: 'Parent React State Synchronizer',
          explanation:
            'Updates parent components with the new or cleared collection state.',
        },
      ],
      starterCode: `/**
 * ============================================================================
 * Task 7: Edit Collection Poster
 * ============================================================================
 *
 * @file task-7.ts
 * @module components/tasks/task-7
 *
 * @description
 * This task handles updating or removing the cover poster image for a collection.
 * It manages:
 * 1. Uploading a new image file (\`File\`) to the Supabase Storage bucket (\`attachments\`).
 * 2. Deleting old storage files to prevent orphan files and save storage quota.
 * 3. Updating the collection record's \`poster_url\` in the database.
 * 4. Clearing/removing the poster when \`file\` is \`null\`.
 *
 * @usedBy
 * - \`EditCollectionModal.tsx\` (\`app/components/EditCollectionModal.tsx\`)
 *   Invoked when the user drags and drops a new poster, chooses a file via the
 *   file picker, or clicks the "Delete/Remove Poster" button.
 */

import { CollectionWithItems } from '../../types/collection'
import { updateCollectionPoster } from '../../actions/collection'

/**
 * Updates or removes the poster cover image for a collection.
 *
 * @param {CollectionWithItems} collection - The collection whose poster is being modified.
 * @param {File | null} file - The new image file to upload, or \`null\` to clear the existing poster.
 * @param {(updatedCollection: CollectionWithItems) => void} [onSuccess] - Optional callback triggered on success.
 * @param {(message: string) => void} [showNotification] - Optional notification trigger for success and error alerts.
 * @returns {Promise<CollectionWithItems>} The updated collection object with the new or cleared \`poster_url\`.
 *
 * @example
 * \`\`\`ts
 * // Upload a new poster
 * const updated = await editCollectionPoster(currentCol, selectedFile, (col) => updateState(col), showNotification);
 *
 * // Clear/remove the existing poster
 * const cleared = await editCollectionPoster(currentCol, null, (col) => updateState(col), showNotification);
 * \`\`\`
 */
export async function editCollectionPoster(
  collection: CollectionWithItems,
  file: File | null,
  onSuccess?: (updatedCollection: CollectionWithItems) => void,
  showNotification?: (message: string) => void
): Promise<CollectionWithItems> {
  try {
    /**
     * --------------------------------------------------------------------------
     * Step 1: Validate target collection existence
     * --------------------------------------------------------------------------
     * Specification:
     * - Verify that \`collection\` reference and \`collection.id\` are defined.
     * - If invalid, trigger toast error notification and abort execution.
     */
    // Check if target collection is valid and contains an ID.
    if (!collection || !collection.id) {
      // Define error message for missing collection reference.
      const errorMsg = 'Invalid collection: A collection with a valid ID is required to update its poster.'
      // Show error toast notification to user.
      showNotification?.(errorMsg)
      // Throw error to cancel execution.
      throw new Error(errorMsg)
    }

    /**
     * --------------------------------------------------------------------------
     * Step 2: Handle Case A - File Upload / Replacement (when file is provided)
     * --------------------------------------------------------------------------
     * Specification:
     * - Validate client-side image MIME types (PNG, JPG, WEBP).
     * - Call Server Action \`updateCollectionPoster(collection, file)\` to upload to Supabase Storage.
     * - Create an optimistic browser object URL (\`URL.createObjectURL(file)\`).
     * - Assemble updated collection, trigger success toast, and invoke \`onSuccess\`.
     * - Return updated collection object.
     */
    // Check if user provided a file to upload or replace poster.
    if (file != null) {
      // Define supported image MIME types for client-side validation.
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
      // Verify uploaded file format against valid MIME types list.
      if (!validTypes.includes(file.type.toLowerCase())) {
        // Define format rejection error message.
        const errorMsg = 'Unsupported file format. Please upload PNG, JPG, or WEBP images.'
        // Display toast error notification to the user.
        showNotification?.(errorMsg)
        // Throw error to abort file upload.
        throw new Error(errorMsg)
      }

      // Call server action updateCollectionPoster to upload to storage and update DB.

      // Check if server upload returned an error.

      // Log storage upload error to console.

      // Show failure toast notification to the user.

      // Throw error to break out of execution.



      // Create client-side object URL for immediate optimistic UI preview.
      const previewUrl = URL.createObjectURL(file)

      // Assemble updated collection state containing new preview URL.
      const updatedCollection: CollectionWithItems = undefined as any

      // Show success toast notification upon successful poster update.
      showNotification?.('Collection poster updated successfully!')

      // Check if onSuccess callback was provided.
      if (onSuccess) {
        // Invoke callback to pass updated collection to parent state.
      }

      // Return the updated collection object.
      return updatedCollection
    }

    /**
     * --------------------------------------------------------------------------
     * Step 3: Handle Case B - File Removal / Deletion (when file is null)
     * --------------------------------------------------------------------------
     * Specification:
     * - Invoke \`updateCollectionPoster(collection, null)\` to purge cloud asset and set DB column to null.
     * - Assemble cleared collection with \`poster_url: null\`.
     * - Trigger removal success toast notification via \`showNotification\`.
     * - Notify parent state via \`onSuccess\` callback if provided.
     * - Return cleared collection object.
     */
    // Handle case when file is null: call server action to delete poster and set column null.
    // Check if removal server action returned an error.
    // Log storage removal error to console.
    // Show failure toast notification to user.
    // Throw error to enter catch block.
    // Assemble updated collection state with poster_url cleared to null.
    // Show success toast notification indicating poster removal.
    // Check if onSuccess callback was provided.
    // Invoke callback to notify parent state of poster removal.
    // Return the cleared collection object.
    // TODO: Implement Case B (delete / remove poster file) here

    const clearedCollection: CollectionWithItems = undefined as any
    return clearedCollection
  } catch (error) {
    // Extract error message string from caught error object.
    const errorMsg = error instanceof Error ? error.message : 'Failed to update collection poster.'
    // Display error toast notification to alert the user.
    showNotification?.(errorMsg)
    // Re-throw error to let calling modal handle failure.
    throw error
  }
}
`,
      solutionCode: `/**
 * ============================================================================
 * Task 7: Edit Collection Poster
 * ============================================================================
 *
 * @file task-7.ts
 * @module components/tasks/task-7
 *
 * @description
 * This task handles updating or removing the cover poster image for a collection.
 * It manages:
 * 1. Uploading a new image file (\`File\`) to the Supabase Storage bucket (\`attachments\`).
 * 2. Deleting old storage files to prevent orphan files and save storage quota.
 * 3. Updating the collection record's \`poster_url\` in the database.
 * 4. Clearing/removing the poster when \`file\` is \`null\`.
 *
 * @usedBy
 * - \`EditCollectionModal.tsx\` (\`app/components/EditCollectionModal.tsx\`)
 *   Invoked when the user drags and drops a new poster, chooses a file via the
 *   file picker, or clicks the "Delete/Remove Poster" button.
 */

import { CollectionWithItems } from '../../types/collection'
import { updateCollectionPoster } from '../../actions/collection'

/**
 * Updates or removes the poster cover image for a collection.
 *
 * @param {CollectionWithItems} collection - The collection whose poster is being modified.
 * @param {File | null} file - The new image file to upload, or \`null\` to clear the existing poster.
 * @param {(updatedCollection: CollectionWithItems) => void} [onSuccess] - Optional callback triggered on success.
 * @param {(message: string) => void} [showNotification] - Optional notification trigger for success and error alerts.
 * @returns {Promise<CollectionWithItems>} The updated collection object with the new or cleared \`poster_url\`.
 *
 * @example
 * \`\`\`ts
 * // Upload a new poster
 * const updated = await editCollectionPoster(currentCol, selectedFile, (col) => updateState(col), showNotification);
 *
 * // Clear/remove the existing poster
 * const cleared = await editCollectionPoster(currentCol, null, (col) => updateState(col), showNotification);
 * \`\`\`
 */
export async function editCollectionPoster(
  collection: CollectionWithItems,
  file: File | null,
  onSuccess?: (updatedCollection: CollectionWithItems) => void,
  showNotification?: (message: string) => void
): Promise<CollectionWithItems> {
  try {
    /**
     * --------------------------------------------------------------------------
     * Step 1: Validate target collection existence
     * --------------------------------------------------------------------------
     * Specification:
     * - Verify that \`collection\` reference and \`collection.id\` are defined.
     * - If invalid, trigger toast error notification and abort execution.
     */
    // Check if target collection is valid and contains an ID.
    if (!collection || !collection.id) {
      // Define error message for missing collection reference.
      const errorMsg = 'Invalid collection: A collection with a valid ID is required to update its poster.'
      // Show error toast notification to user.
      showNotification?.(errorMsg)
      // Throw error to cancel execution.
      throw new Error(errorMsg)
    }

    /**
     * --------------------------------------------------------------------------
     * Step 2: Handle Case A - File Upload / Replacement (when file is provided)
     * --------------------------------------------------------------------------
     * Specification:
     * - Validate client-side image MIME types (PNG, JPG, WEBP).
     * - Call Server Action \`updateCollectionPoster(collection, file)\` to upload to Supabase Storage.
     * - Create an optimistic browser object URL (\`URL.createObjectURL(file)\`).
     * - Assemble updated collection, trigger success toast, and invoke \`onSuccess\`.
     * - Return updated collection object.
     */
    // Check if user provided a file to upload or replace poster.
    if (file != null) {
      // Define supported image MIME types for client-side validation.
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
      // Verify uploaded file format against valid MIME types list.
      if (!validTypes.includes(file.type.toLowerCase())) {
        // Define format rejection error message.
        const errorMsg = 'Unsupported file format. Please upload PNG, JPG, or WEBP images.'
        // Display toast error notification to the user.
        showNotification?.(errorMsg)
        // Throw error to abort file upload.
        throw new Error(errorMsg)
      }

      // Call server action updateCollectionPoster to upload to storage and update DB.
      const res = await updateCollectionPoster(collection, file)
      // Check if server upload returned an error.
      if (res?.error) {
        // Log storage upload error to console.
        console.error('Failed to upload collection poster:', res.error)
        // Show failure toast notification to the user.
        showNotification?.('Failed to update poster: ' + res.error)
        // Throw error to break out of execution.
        throw new Error(res.error)
      }

      // Create client-side object URL for immediate optimistic UI preview.
      const previewUrl = URL.createObjectURL(file)

      // Assemble updated collection state containing new preview URL.
      const updatedCollection: CollectionWithItems = {
        ...collection,
        poster_url: previewUrl,
      }

      // Show success toast notification upon successful poster update.
      showNotification?.('Collection poster updated successfully!')

      // Check if onSuccess callback was provided.
      if (onSuccess) {
        // Invoke callback to pass updated collection to parent state.
        onSuccess(updatedCollection)
      }

      // Return the updated collection object.
      return updatedCollection
    }

    /**
     * --------------------------------------------------------------------------
     * Step 3: Handle Case B - File Removal / Deletion (when file is null)
     * --------------------------------------------------------------------------
     * Specification:
     * - Invoke \`updateCollectionPoster(collection, null)\` to purge cloud asset and set DB column to null.
     * - Assemble cleared collection with \`poster_url: null\`.
     * - Trigger removal success toast notification via \`showNotification\`.
     * - Notify parent state via \`onSuccess\` callback if provided.
     * - Return cleared collection object.
     */
    // Handle case when file is null: call server action to delete poster and set column null.
    const res = await updateCollectionPoster(collection, null)
    // Check if removal server action returned an error.
    if (res?.error) {
      // Log storage removal error to console.
      console.error('Failed to clear collection poster:', res.error)
      // Show failure toast notification to user.
      showNotification?.('Failed to remove poster: ' + res.error)
      // Throw error to enter catch block.
      throw new Error(res.error)
    }

    // Assemble updated collection state with poster_url cleared to null.
    const clearedCollection: CollectionWithItems = {
      ...collection,
      poster_url: null,
    }

    // Show success toast notification indicating poster removal.
    showNotification?.('Collection poster removed successfully!')

    // Check if onSuccess callback was provided.
    if (onSuccess) {
      // Invoke callback to notify parent state of poster removal.
      onSuccess(clearedCollection)
    }

    // Return the cleared collection object.
    return clearedCollection
  } catch (error) {
    // Extract error message string from caught error object.
    const errorMsg = error instanceof Error ? error.message : 'Failed to update collection poster.'
    // Display error toast notification to alert the user.
    showNotification?.(errorMsg)
    // Re-throw error to let calling modal handle failure.
    throw error
  }
}
`,
      solutionExplanation:
        'Task 7 bifurcates into two branches depending on whether file is provided: when file is present (Case A), it validates image MIME types, calls updateCollectionPoster(collection, file), creates an optimistic preview via URL.createObjectURL(file), and updates state. When file is null (Case B), it invokes updateCollectionPoster(collection, null) to purge the storage asset and sets poster_url to null.',
    },
    sections: [
      {
        title: 'Task Overview & File Target',
        description:
          'Open components/tasks/task-7.ts in your project. Implement editCollectionPoster to handle both image uploading/replacement (Case A) and poster removal/deletion (Case B) using the updateCollectionPoster server action.',
      },
    ],
  },
  {
    id: 15,
    stepNumber: 15,
    category: 'task',
    badge: 'Coding Task 8',
    title: 'Task 8: Edit Memory Poster (task-8.ts)',
    shortTitle: 'Task 8: Photo',
    summary:
      'Upload, replace, or remove photo attachments for individual memory items by integrating with Supabase Storage, dispatching the updateCollectionItemPoster Server Action, creating optimistic preview URLs, and triggering UI updates with isEdit status flags.',
    estimatedTime: '10-15 mins',
    codingTask: {
      taskNumber: 8,
      file: 'components/tasks/task-8.ts',
      usedBy: 'EditMemoryItemModal.tsx & MemoryBookModal.tsx',
      purpose:
        'Manages uploading, replacing, or deleting photos attached to individual memories. It validates image formats, calls updateCollectionItemPoster to sync with Supabase Storage, creates optimistic preview URLs, and triggers onSuccess(item, isEdit) to update parent state.',
      keyConcepts: [
        {
          name: 'item: CollectionItem',
          role: 'Baseline Memory Record',
          explanation:
            'Target memory providing item.id for row targeting and storage bucket folder pathing.',
        },
        {
          name: 'file: File | null',
          role: 'Input Photo Payload',
          explanation:
            'Image file to upload, or null when deleting the current photo.',
        },
        {
          name: 'validTypes: [PNG, JPEG, JPG, WEBP]',
          role: 'Client-Side MIME Whitelist',
          explanation:
            'Client-side MIME whitelist validating image formats before starting upload.',
        },
        {
          name: 'updateCollectionItemPoster(item, file)',
          role: 'Next.js Server Action with Supabase Storage',
          explanation:
            'Server Action uploading the file to Supabase Storage, removing old photos, and updating image_url.',
        },
        {
          name: 'URL.createObjectURL(file)',
          role: 'Optimistic Browser Preview URL',
          explanation:
            'Creates a local blob URL for instant photo preview before cloud upload finishes.',
        },
        {
          name: 'isEdit: boolean parameter in onSuccess',
          role: 'UI Transformation Flag',
          explanation:
            'Flag indicating whether a photo was updated (true) or deleted (false) so parent components adjust layout.',
        },
        {
          name: 'Case A (file != null)',
          role: 'Photo Upload / Replacement Pipeline',
          explanation:
            'Validates file, executes upload, creates preview URL, triggers onSuccess(updatedItem, true), and displays toast.',
        },
        {
          name: 'Case B (file == null)',
          role: 'Photo Removal / Deletion Pipeline',
          explanation:
            'Purges remote file, sets image_url to null, triggers onSuccess(clearedItem, false), and displays removal toast.',
        },
      ],
      starterCode: `/**
 * ============================================================================
 * Task 8: Edit Memory Poster (Photo Attachment)
 * ============================================================================
 *
 * @file task-8.ts
 * @module components/tasks/task-8
 *
 * @description
 * This task manages uploading, replacing, or deleting the photo/image attachment
 * belonging to a specific memory item.
 * It interacts with the Next.js Server Action (\`updateCollectionItemPoster\`) to:
 * 1. Store the uploaded file in Supabase Storage (\`attachments\` bucket).
 * 2. Delete the previously associated file from storage (if any).
 * 3. Update the memory's \`image_url\` column in the \`collection_items\` table.
 * 4. Support clearing/deleting the image when \`file\` is \`null\`.
 *
 * @usedBy
 * - \`EditMemoryItemModal.tsx\` (\`app/components/EditMemoryItemModal.tsx\`)
 *   Invoked when replacing or removing a photo within the memory edit dialog.
 * - \`MemoryBookModal.tsx\` (\`app/components/MemoryBookModal.tsx\`)
 *   Invoked directly from the book flip page when dragging & dropping a new photo
 *   or clicking "Remove" / "Change Image" on the active page.
 */

import { CollectionItem } from '../../types/collection_item'
import { updateCollectionItemPoster } from '../../actions/collection_items'

/**
 * Updates or removes the photo attachment of a memory item.
 *
 * @param {CollectionItem} item - The memory item whose photo is being modified.
 * @param {File | null} file - The new photo file to upload, or \`null\` to delete the existing photo.
 * @param {(updatedItem: CollectionItem, isEdit: boolean) => void} [onSuccess] - Optional callback to update UI state.
 * @param {(message: string) => void} [showNotification] - Optional notification trigger for success and error alerts.
 * @returns {Promise<CollectionItem>} The updated memory item record with the new or cleared image URL.
 *
 * @example
 * \`\`\`ts
 * // Upload / Replace photo
 * const updated = await editMemoryPoster(currentMemory, newImageFile, (item) => syncMemory(item), showNotification);
 *
 * // Delete photo
 * const cleared = await editMemoryPoster(currentMemory, null, (item) => syncMemory(item), showNotification);
 * \`\`\`
 */
export async function editMemoryPoster(
  item: CollectionItem,
  file: File | null,
  onSuccess?: (updatedItem: CollectionItem, isEdit: boolean) => void,
  showNotification?: (message: string) => void
): Promise<CollectionItem> {
  try {
    /**
     * --------------------------------------------------------------------------
     * Step 1: Validate target memory item existence
     * --------------------------------------------------------------------------
     * Specification:
     * - Verify that \`item\` reference and \`item.id\` are defined.
     * - If missing, display a toast notification and throw Error to abort.
     */
    // Check if target memory item is valid and has an ID.
    if (!item || !item.id) {
      // Define error message for missing item reference.
      const errorMsg = 'Invalid memory item: A memory item with a valid ID is required to update its image.'
      // Show error toast notification to user.
      showNotification?.(errorMsg)
      // Throw error to abort photo update.
      throw new Error(errorMsg)
    }

    /**
     * --------------------------------------------------------------------------
     * Step 2: Handle Case A - Photo Upload / Replacement (when file is provided)
     * --------------------------------------------------------------------------
     * Specification:
     * - Validate client-side image MIME types (PNG, JPG, WEBP).
     * - Call Server Action \`updateCollectionItemPoster(item, file)\` to upload file.
     * - Generate optimistic browser object URL (\`URL.createObjectURL(file)\`).
     * - Trigger success toast and invoke \`onSuccess(updatedItem, true)\`.
     * - Return the updated \`CollectionItem\` record.
     */
    // Check if user provided an image file to upload or replace photo.
    if (file != null) {
      // Define supported image MIME types for client-side validation.
      // Verify uploaded file type against permitted list.
      // Define format rejection error message.
      // Display toast error notification to the user.
      // Throw error to abort file upload.
      // Call server action updateCollectionItemPoster to upload to storage and update DB.
      // Check if server upload returned an error.
      // Log image upload error to console.
      // Show failure toast notification to the user.
      // Throw error to break out of execution.
      // Create client-side object URL for immediate optimistic UI preview.
      // Assemble updated memory item state with new preview URL.
      // Show success toast notification upon successful photo update.
      // Check if onSuccess callback was provided.
      // Invoke callback to pass updated item to parent state (isEdit = true).
      // Return the updated memory item record.
      // TODO: Implement Case A (upload / replace photo attachment) here

      const updatedItem: CollectionItem = undefined as any
      return updatedItem
    }

    /**
     * --------------------------------------------------------------------------
     * Step 3: Handle Case B - Photo Removal / Deletion (when file is null)
     * --------------------------------------------------------------------------
     * Specification:
     * - Invoke \`updateCollectionItemPoster(item, null)\` to purge cloud file and set DB column to null.
     * - Assemble cleared memory item with \`image_url: null\`.
     * - Trigger photo removal success toast notification via \`showNotification\`.
     * - Notify parent state via \`onSuccess(clearedItem, false)\` callback if provided.
     * - Return cleared \`CollectionItem\` record.
     */
    // Handle case when file is null: call server action to delete photo from storage.
    // Check if removal server action returned an error.
    // Log storage removal error to console.
    // Show failure toast notification to user.
    // Throw error to enter catch block.
    // Assemble updated memory item state with image_url cleared to null.
    // Show success toast notification indicating photo removal.
    // Check if onSuccess callback was provided.
    // Invoke callback to notify parent state that image was removed (isEdit = false).
    // Return the cleared memory item object.
    // TODO: Implement Case B (delete / remove photo attachment) here

    const clearedItem: CollectionItem = undefined as any
    return clearedItem
  } catch (error) {
    // Extract error message string from caught error object.
    const errorMsg = error instanceof Error ? error.message : 'Failed to update memory photo.'
    // Display error toast notification to alert the user.
    showNotification?.(errorMsg)
    // Re-throw error to let calling modal handle failure.
    throw error
  }
}
`,
      solutionCode: `/**
 * ============================================================================
 * Task 8: Edit Memory Poster (Photo Attachment)
 * ============================================================================
 *
 * @file task-8.ts
 * @module components/tasks/task-8
 *
 * @description
 * This task manages uploading, replacing, or deleting the photo/image attachment
 * belonging to a specific memory item.
 * It interacts with the Next.js Server Action (\`updateCollectionItemPoster\`) to:
 * 1. Store the uploaded file in Supabase Storage (\`attachments\` bucket).
 * 2. Delete the previously associated file from storage (if any).
 * 3. Update the memory's \`image_url\` column in the \`collection_items\` table.
 * 4. Support clearing/deleting the image when \`file\` is \`null\`.
 *
 * @usedBy
 * - \`EditMemoryItemModal.tsx\` (\`app/components/EditMemoryItemModal.tsx\`)
 *   Invoked when replacing or removing a photo within the memory edit dialog.
 * - \`MemoryBookModal.tsx\` (\`app/components/MemoryBookModal.tsx\`)
 *   Invoked directly from the book flip page when dragging & dropping a new photo
 *   or clicking "Remove" / "Change Image" on the active page.
 */

import { CollectionItem } from '../../types/collection_item'
import { updateCollectionItemPoster } from '../../actions/collection_items'

/**
 * Updates or removes the photo attachment of a memory item.
 *
 * @param {CollectionItem} item - The memory item whose photo is being modified.
 * @param {File | null} file - The new photo file to upload, or \`null\` to delete the existing photo.
 * @param {(updatedItem: CollectionItem, isEdit: boolean) => void} [onSuccess] - Optional callback to update UI state.
 * @param {(message: string) => void} [showNotification] - Optional notification trigger for success and error alerts.
 * @returns {Promise<CollectionItem>} The updated memory item record with the new or cleared image URL.
 *
 * @example
 * \`\`\`ts
 * // Upload / Replace photo
 * const updated = await editMemoryPoster(currentMemory, newImageFile, (item) => syncMemory(item), showNotification);
 *
 * // Delete photo
 * const cleared = await editMemoryPoster(currentMemory, null, (item) => syncMemory(item), showNotification);
 * \`\`\`
 */
export async function editMemoryPoster(
  item: CollectionItem,
  file: File | null,
  onSuccess?: (updatedItem: CollectionItem, isEdit: boolean) => void,
  showNotification?: (message: string) => void
): Promise<CollectionItem> {
  try {
    /**
     * --------------------------------------------------------------------------
     * Step 1: Validate target memory item existence
     * --------------------------------------------------------------------------
     * Specification:
     * - Verify that \`item\` reference and \`item.id\` are defined.
     * - If missing, display a toast notification and throw Error to abort.
     */
    // Check if target memory item is valid and has an ID.
    if (!item || !item.id) {
      // Define error message for missing item reference.
      const errorMsg = 'Invalid memory item: A memory item with a valid ID is required to update its image.'
      // Show error toast notification to user.
      showNotification?.(errorMsg)
      // Throw error to abort photo update.
      throw new Error(errorMsg)
    }

    /**
     * --------------------------------------------------------------------------
     * Step 2: Handle Case A - Photo Upload / Replacement (when file is provided)
     * --------------------------------------------------------------------------
     * Specification:
     * - Validate client-side image MIME types (PNG, JPG, WEBP).
     * - Call Server Action \`updateCollectionItemPoster(item, file)\` to upload file.
     * - Generate optimistic browser object URL (\`URL.createObjectURL(file)\`).
     * - Trigger success toast and invoke \`onSuccess(updatedItem, true)\`.
     * - Return the updated \`CollectionItem\` record.
     */
    // Check if user provided an image file to upload or replace photo.
    if (file != null) {
      // Define supported image MIME types for client-side validation.
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
      // Verify uploaded file type against permitted list.
      if (!validTypes.includes(file.type.toLowerCase())) {
        // Define format rejection error message.
        const errorMsg = 'Unsupported image format. Please upload PNG, JPG, or WEBP images.'
        // Display toast error notification to the user.
        showNotification?.(errorMsg)
        // Throw error to abort file upload.
        throw new Error(errorMsg)
      }

      // Call server action updateCollectionItemPoster to upload to storage and update DB.
      const res = await updateCollectionItemPoster(item, file)
      // Check if server upload returned an error.
      if (res?.error) {
        // Log image upload error to console.
        console.error('Failed to update memory image in storage:', res.error)
        // Show failure toast notification to the user.
        showNotification?.('Failed to update image: ' + res.error)
        // Throw error to break out of execution.
        throw new Error(res.error)
      }

      // Create client-side object URL for immediate optimistic UI preview.
      const previewUrl = URL.createObjectURL(file)

      // Assemble updated memory item state with new preview URL.
      const updatedItem: CollectionItem = {
        ...item,
        image_url: previewUrl,
      }

      // Show success toast notification upon successful photo update.
      showNotification?.('Memory photo updated successfully!')

      // Check if onSuccess callback was provided.
      if (onSuccess) {
        // Invoke callback to pass updated item to parent state (isEdit = true).
        onSuccess(updatedItem, true)
      }

      // Return the updated memory item record.
      return updatedItem
    }

    /**
     * --------------------------------------------------------------------------
     * Step 3: Handle Case B - Photo Removal / Deletion (when file is null)
     * --------------------------------------------------------------------------
     * Specification:
     * - Invoke \`updateCollectionItemPoster(item, null)\` to purge cloud file and set DB column to null.
     * - Assemble cleared memory item with \`image_url: null\`.
     * - Trigger photo removal success toast notification via \`showNotification\`.
     * - Notify parent state via \`onSuccess(clearedItem, false)\` callback if provided.
     * - Return cleared \`CollectionItem\` record.
     */
    // Handle case when file is null: call server action to delete photo from storage.
    const res = await updateCollectionItemPoster(item, null)
    // Check if removal server action returned an error.
    if (res?.error) {
      // Log storage removal error to console.
      console.error('Failed to remove memory image from storage:', res.error)
      // Show failure toast notification to user.
      showNotification?.('Failed to remove image: ' + res.error)
      // Throw error to enter catch block.
      throw new Error(res.error)
    }

    // Assemble updated memory item state with image_url cleared to null.
    const clearedItem: CollectionItem = {
      ...item,
      image_url: null,
    }

    // Show success toast notification indicating photo removal.
    showNotification?.('Memory photo removed successfully!')

    // Check if onSuccess callback was provided.
    if (onSuccess) {
      // Invoke callback to notify parent state that image was removed (isEdit = false).
      onSuccess(clearedItem, false)
    }

    // Return the cleared memory item object.
    return clearedItem
  } catch (error) {
    // Extract error message string from caught error object.
    const errorMsg = error instanceof Error ? error.message : 'Failed to update memory photo.'
    // Display error toast notification to alert the user.
    showNotification?.(errorMsg)
    // Re-throw error to let calling modal handle failure.
    throw error
  }
}
`,
      solutionExplanation:
        'In Task 8, editMemoryPoster handles photo attachments for individual memories: when file is provided (Case A), it validates image MIME types, invokes updateCollectionItemPoster(item, file), generates an optimistic preview URL via URL.createObjectURL(file), and fires onSuccess(updatedItem, true) with isEdit = true so the parent updates the existing item in place. When file is null (Case B), it invokes updateCollectionItemPoster(item, null) to purge the cloud storage file, clears image_url to null, and fires onSuccess(clearedItem, false) with isEdit = false.',
    },
    sections: [
      {
        title: 'Task Overview & File Target',
        description:
          'Open components/tasks/task-8.ts in your project. Implement editMemoryPoster to handle photo attachments (Case A with isEdit = true) and photo removal (Case B with isEdit = false) using updateCollectionItemPoster.',
      },
    ],
  },
]
