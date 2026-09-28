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
    shortTitle: 'GitHub & Git CLI',
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
    shortTitle: 'Docker & Compose',
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
    shortTitle: 'Install pnpm',
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
    shortTitle: 'Install Dependencies',
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
    shortTitle: 'Supabase Setup',
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
    shortTitle: 'Task 1: Collection',
    summary:
      'Map form inputs to the database payload, execute the createNewCollection Server Action in Supabase, and handle UI notifications and state updates.',
    estimatedTime: '5-10 mins',
    codingTask: {
      taskNumber: 1,
      file: 'components/tasks/task-1.ts',
      usedBy: 'CreateCollectionModal.tsx (app/components/CreateCollectionModal.tsx)',
      purpose:
        'The primary objective of Task 1 is to bridge user form input from the collection creation modal with the persistent database layer in Supabase. When a user submits the "Create Collection" modal in the Memory Book UI, React Hook Form validates the mandatory fields (such as collection name) and hands the validated object to createCollection. This function constructs a clean Supabase database insert payload, calls the Next.js Server Action createNewCollection, handles network or permission errors gracefully, and returns a fully formed CollectionWithItems object to immediately update client state.',
      keyConcepts: [
        {
          name: 'data: CreateCollectionFormInputs',
          role: 'Pre-Validated Form Input Object',
          explanation:
            'Contains user inputs captured by React Hook Form. Upstream declarative validation guarantees that data.name is already non-empty. Optional fields like description, start_time, and end_time may be undefined or empty strings, so they must be sanitized before database insertion.',
        },
        {
          name: 'payload: CollectionInsert',
          role: 'Database Schema Contract',
          explanation:
            'Matches the Supabase PostgreSQL table definition. Optional fields that are empty or undefined must be converted to null so the database stores clean SQL NULL values instead of empty strings. The cover photo (poster_url) is initialized to null because image uploads are handled separately in Task 7.',
        },
        {
          name: 'poster_url: null',
          role: 'Initial Asset State',
          explanation:
            'Initial collection creation only creates the textual and date metadata. The cover poster image is uploaded separately via Task 7 (editCollectionPoster) after the collection record exists in the database.',
        },
        {
          name: 'createNewCollection(payload)',
          role: 'Next.js Server Action Execution',
          explanation:
            'A secure server-side function that interacts directly with Supabase via the server client. Because it runs on the server, it enforces Row Level Security (RLS) policies and prevents database credentials or direct database access tokens from being exposed to the client browser.',
        },
        {
          name: 'res?.error & Error Handling',
          role: 'Resilience and User Feedback',
          explanation:
            'Database operations can fail due to network interruptions, validation constraints, or authorization issues. Checking res?.error logs the technical message to the browser console, displays a friendly toast notification to the user via showNotification, and throws an error to abort execution so the modal does not falsely close.',
        },
        {
          name: 'createdCol: CollectionWithItems',
          role: 'Client-Side Model Representation',
          explanation:
            'Because a freshly created collection has no items yet, attaching collection_items: [] fulfills the CollectionWithItems TypeScript interface. This allows client components to immediately render the collection card without triggering another round-trip query to the server.',
        },
        {
          name: 'Optimistic Fallback (Mock/Offline)',
          role: 'Graceful Degradation',
          explanation:
            'If the server returns no data (such as during offline development or mock demonstration environments), a fallback object with a timestamp ID (col-Date.now()) is constructed so the application remains interactive without crashing.',
        },
        {
          name: 'onCreated?(createdCol)',
          role: 'Parent React State Synchronization',
          explanation:
            'Invoking this callback notifies the parent component (CollectionListSection) to prepend the new collection to its active state list. This provides instantaneous reactivity without needing a full browser refresh.',
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
        'The primary objective of Task 2 is to allow users to update an existing collection\'s textual metadata (name, description, start time, end time) while keeping existing relations intact (such as poster_url and collection_items). When a user submits changes in the "Edit Collection" dialog, React Hook Form validates the mandatory fields and passes the values to editCollection. This function constructs a partial update payload bound to the collection\'s primary key (`id`), invokes the Next.js Server Action updateCollection, sanitizes cleared optional fields with SQL NULL, handles errors, and returns a merged CollectionWithItems object to immediately update parent React state without re-querying the database.',
      keyConcepts: [
        {
          name: 'collection: CollectionWithItems',
          role: 'Baseline Model State',
          explanation:
            'The active in-memory collection object before edits. It provides collection.id required to target the specific PostgreSQL database row. It also holds existing nested relations—specifically collection_items and poster_url—which must be retained when producing the updated collection record.',
        },
        {
          name: 'data: EditCollectionFormInputs',
          role: 'Pre-Validated Form Input Object',
          explanation:
            'Supplied by React Hook Form from the edit dialog. The required name field is guaranteed to be non-empty. Optional fields (description, start_time, end_time) may be undefined or empty strings if cleared by the user, so evaluating data.field || null ensures clean database storage with SQL NULL instead of stale text or empty strings.',
        },
        {
          name: 'updatePayload',
          role: 'Targeted Database Mutation Contract',
          explanation:
            'Specifies the primary key (id: collection.id) alongside the updated textual fields. Unlike an insert operation which creates a new entity, this payload scopes the Supabase PostgreSQL UPDATE query strictly to this collection record.',
        },
        {
          name: 'updateCollection(updatePayload)',
          role: 'Next.js Server Action Execution',
          explanation:
            'A secure asynchronous server action that executes the UPDATE query directly in Supabase. Because it runs securely on the server, it enforces Row Level Security (RLS) policies without exposing private database credentials to the client browser.',
        },
        {
          name: 'res?.error & Exception Handling',
          role: 'Resilience and User Feedback',
          explanation:
            'Catches server-side database rejections (such as network dropouts or permission failures), logs diagnostic info via console.error, triggers an instant user-facing toast alert via showNotification, and throws an Error to abort the flow so the edit modal remains open without losing form state.',
        },
        {
          name: 'updatedCollection: CollectionWithItems',
          role: 'Merged Immutable Client State',
          explanation:
            'Constructed by spreading ...collection, overriding with ...updatePayload, preserving poster_url: res.data?.poster_url ?? null, and retaining collection_items: collection.collection_items ?? []. This allows client components to immediately display the updated title and dates without making another network round-trip.',
        },
        {
          name: 'onSuccess?(updatedCollection)',
          role: 'Parent State Synchronization Callback',
          explanation:
            'A callback that sends the updated collection object to the parent React component (e.g., CollectionListSection or CollectionDetailView), enabling immediate local state replacement and optimistic UI updates without a full page reload.',
        },
        {
          name: "showNotification?.('Collection updated successfully!')",
          role: 'Success Toast Feedback',
          explanation:
            'Provides direct visual confirmation to the user that their changes were successfully persisted to the database.',
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
        'The primary objective of Task 3 is to manage the creation and media attachment workflow for an individual memory moment within a collection book. When a user submits the "New Memory" modal dialog, React Hook Form validates the inputs (ensuring the memory name is present and parsing the page order). The createMemory function performs a critical two-phase persistence sequence: First, it binds the memory to its parent collection via the foreign key collection_id: collectionId, constructs a typed CollectionItemInsert payload, and invokes the Next.js Server Action createNewCollectionItem to insert the row into Supabase. Second, if the user selected a photo (posterFile: File), it invokes updateCollectionItemPoster to upload the binary file to Supabase Storage under the item\'s directory prefix and updates the memory\'s image_url. Finally, it displays a success toast notification and passes the completed record to onSuccess(newItem) for immediate optimistic UI rendering.',
      keyConcepts: [
        {
          name: 'collectionId: string',
          role: 'Foreign Key Parent Identifier',
          explanation:
            'The primary key ID of the parent collection. Assigning collection_id: collectionId binds this memory item to the correct memory book in PostgreSQL, enforcing relational data integrity and ensuring the memory renders on the correct book pages.',
        },
        {
          name: 'data: CreateMemoryFormInputs',
          role: 'Pre-Validated Form Input Object',
          explanation:
            'Captures values entered by the user in CreateMemoryItemModal. Upstream declarative validation guarantees that data.name is non-empty. Optional fields (description, memory_date) are mapped with || null to store clean SQL NULL values instead of empty strings, while order defaults to 1 if omitted.',
        },
        {
          name: 'posterFile: File | null',
          role: 'Optional Media Binary Attachment',
          explanation:
            'An optional browser File object representing the user\'s selected photo. Initial creation handles database insertion first to generate an immutable item ID; once the ID exists, the file is uploaded to storage using that ID as the storage path prefix.',
        },
        {
          name: 'payload: CollectionItemInsert',
          role: 'Database Schema Insertion Contract',
          explanation:
            'Matches the Supabase PostgreSQL collection_items table definition. Maps collection_id, name, sanitized description, memory_date, order (defaulting to 1 via data.order ?? 1), and initializes image_url to null prior to the storage upload step.',
        },
        {
          name: 'createNewCollectionItem(payload)',
          role: 'Next.js Server Action Execution',
          explanation:
            'An asynchronous server action that inserts the memory row into Supabase directly from the Next.js server environment, guaranteeing database credentials are not exposed to the client browser and enforcing RLS security.',
        },
        {
          name: 'res?.error || !res?.data Error Handling',
          role: 'Atomic Failure Guard',
          explanation:
            'Validates that the database insertion succeeded and returned a full record with its generated primary key ID. If it failed, it logs the error, triggers an instant user-facing toast alert via showNotification, and throws an Error to abort without proceeding to the file upload phase.',
        },
        {
          name: 'updateCollectionItemPoster(newItem, posterFile)',
          role: 'Supabase Storage Asset Dispatcher',
          explanation:
            'A server action that uploads the raw image file to the memory-book Supabase Storage bucket. Upon completion, it returns the public/signed storage URL in resPoster.data, which is immediately merged into newItem.image_url.',
        },
        {
          name: 'onSuccess?(newItem)',
          role: 'Parent State Synchronization Callback',
          explanation:
            'Invokes the parent component callback (e.g. MemoryListSection or FlipBookViewer) with the finalized CollectionItem. This allows the newly created memory page to appear instantly in the 3D book without requiring a page refresh.',
        },
        {
          name: "showNotification?.('Memory item created successfully!')",
          role: 'Success Toast Feedback',
          explanation:
            'Notifies the user with a confirmation toast that their memory has been recorded and saved.',
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
    shortTitle: 'Task 4: Edit Memory',
    summary:
      'Assemble the partial update payload, invoke updateCollectionItem in Supabase, safeguard existing media attachments, and notify parent state with isEdit = true.',
    estimatedTime: '5-10 mins',
    codingTask: {
      taskNumber: 4,
      file: 'components/tasks/task-4.ts',
      usedBy: 'EditMemoryItemModal.tsx (app/components/EditMemoryItemModal.tsx)',
      purpose:
        'The primary objective of Task 4 is to manage updating an existing memory moment\'s textual metadata and flipbook sequence order (name, description, memory_date, order). When a user submits changes in the "Edit Memory" modal dialog, React Hook Form validates the mandatory fields (ensuring the name is present and parsing order). The editMemory function targets the specific memory via its identifier itemToEdit.id, sanitizes cleared optional fields with SQL NULL (data.field || null), and calls the Next.js Server Action updateCollectionItem to persist changes into Supabase. Crucially, this function specifically manages text and ordering details without altering or resetting existing image attachments (image_url: res.data.image_url). Upon success, it triggers onSuccess(updatedItem, true) with isEdit = true, instructing the parent component to replace the item in place rather than creating a duplicate.',
      keyConcepts: [
        {
          name: 'itemToEdit: CollectionItem',
          role: 'Existing Memory Baseline State',
          explanation:
            'The original in-memory memory item record. It supplies itemToEdit.id to scope the database UPDATE query and provides baseline properties that are not modified by the textual form.',
        },
        {
          name: 'data: EditMemoryFormInputs',
          role: 'Pre-Validated Form Input Object',
          explanation:
            'Values received from React Hook Form. The name field is guaranteed to be valid. Optional fields (description, memory_date) are mapped with || null so the database explicitly writes SQL NULL values instead of preserving stale text or empty strings.',
        },
        {
          name: 'payload (partial update object)',
          role: 'Targeted Mutation Payload Contract',
          explanation:
            'Constructs an update object with id: itemToEdit.id, name, sanitized description, memory_date, and order: data.order. Scopes the Supabase UPDATE query strictly to this single row.',
        },
        {
          name: 'updateCollectionItem(payload)',
          role: 'Next.js Server Action Execution',
          explanation:
            'An asynchronous server-side action that communicates directly with Supabase using server credentials, ensuring Row Level Security policies are respected without exposing database tokens to the client browser.',
        },
        {
          name: 'res?.error || !res?.data Error Handling',
          role: 'Failure Guard & User Notification',
          explanation:
            'Checks if the database operation failed. In case of an error or missing returned data, logs the error, triggers an instant toast alert via showNotification, and throws an Error to abort so the edit modal remains open.',
        },
        {
          name: 'updatedItem: CollectionItem',
          role: 'Safeguarded Merged Entity',
          explanation:
            'Constructs the updated memory entity from ...res.data while explicitly ensuring image_url: res.data.image_url is retained. This allows immediate client UI rendering without another database query.',
        },
        {
          name: 'onSuccess?(updatedItem, true)',
          role: 'Parent State Replacement Callback',
          explanation:
            'Notifies the parent component (e.g. MemoryListSection or FlipBookViewer) with the updated record and an isEdit = true flag. This signals the parent to replace the existing item at its index instead of appending it as a new duplicate.',
        },
        {
          name: "showNotification?.('Memory item updated successfully!')",
          role: 'Success Toast Feedback',
          explanation:
            'Displays an immediate toast alert confirming the memory was updated.',
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
        'The primary objective of Task 5 is to implement a fast, responsive in-memory search utility that filters collection entities without initiating costly database network roundtrips. In the UI, as users type search keywords into the CollectionToolbar input field, CollectionListSection passes the active collections array and search query to searchByTitleOrDescription within a React useMemo optimization pipeline. The function first guards against empty or uninitialized arrays. Next, it sanitizes the query by trimming leading/trailing whitespace and converting it to lowercase, with a fast-path return when the query is blank. Finally, it uses Array.prototype.filter to return collections whose name or description includes the normalized search keyword in a case-insensitive manner.',
      keyConcepts: [
        {
          name: 'collections: CollectionWithItems[]',
          role: 'Source Data Array',
          explanation:
            'The active array of collection models stored in client memory. Passing this in enables instant client-side filtering without placing load on the Supabase database.',
        },
        {
          name: 'query: string',
          role: 'Raw Search String',
          explanation:
            'The search term entered by the user in the search toolbar, which may include whitespace or mixed letter casing.',
        },
        {
          name: 'Defensive Input Guard (!collections || collections.length === 0)',
          role: 'Null Safety & Runtime Protection',
          explanation:
            'Guards against uninitialized, null, or empty array references by immediately returning an empty array [], avoiding TypeError exceptions.',
        },
        {
          name: 'normalizedQuery: string',
          role: 'Sanitized Query Token',
          explanation:
            "Constructed via (query || '').trim().toLowerCase(). Trimming prevents accidental trailing spaces from failing matches, while lowercasing allows case-insensitive search ('lapland' matches 'Lapland').",
        },
        {
          name: "Fast-Path Exit (normalizedQuery === '')",
          role: 'Optimization & Reference Preservation',
          explanation:
            'If the query is empty, returning collections directly preserves the original array reference, bypassing filter loops and preventing superfluous React re-renders in useMemo.',
        },
        {
          name: 'Array.prototype.filter',
          role: 'Immutable Array Derivation',
          explanation:
            'Iterates over every collection item and constructs a fresh array containing only items that evaluate the predicate to true.',
        },
        {
          name: 'nameMatch & descriptionMatch',
          role: 'Dual Substring Matching Predicates',
          explanation:
            'Safely verifies if collection.name or collection.description exist before calling .toLowerCase().includes(normalizedQuery), gracefully handling optional null descriptions without crashing.',
        },
        {
          name: 'nameMatch || descriptionMatch',
          role: 'Disjunctive Search Condition',
          explanation:
            'Ensures a collection is retained in the search results if the search term matches either its primary title OR its romantic notes/description.',
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
        'Task 6 manages sorting and pagination resets across the memory book collection gallery. When a user changes the sorting dropdown in CollectionToolbar, onSortChange updates the active sort state and resets current pagination to page 1 to prevent stranded empty pages. Next, inside the useMemo pipeline of CollectionListSection, sortCollections takes the filtered collection array and a selected SortOption, creates an immutable shallow copy, and executes an in-place sort using targeted comparators for 8 distinct modes: created_at_desc, created_at_asc, name_asc, name_desc, items_desc, items_asc, start_date_asc, and start_date_desc (with graceful null sinks for missing event dates).',
      keyConcepts: [
        {
          name: 'onSortChange(newSort, setSortBy, setCurrentPage)',
          role: 'Sort Event & Pagination Reset Handler',
          explanation:
            'Receives the newly selected SortOption and invokes setSortBy(newSort) to update React state. Crucially, it executes setCurrentPage(1) to return the user to the first page. If a user is viewing page 4 of a collection list and changes the sort order, failing to reset to page 1 could display an empty page or cause visual disorientation.',
        },
        {
          name: 'setSortBy: (sort: SortOption) => void',
          role: 'React State Dispatcher for Sort Option',
          explanation:
            'A React useState setter function that records the currently active sort criterion, triggering a reactive re-render and re-computation of the collection list in useMemo.',
        },
        {
          name: 'setCurrentPage: (page: number) => void',
          role: 'Pagination State Dispatcher',
          explanation:
            'A React useState setter function for the current page index. Resetting to 1 guarantees that the pagination window aligns with the newly sorted dataset from the beginning.',
        },
        {
          name: 'sortCollections(collections, sortBy)',
          role: 'Pure Immutable Sorting Engine',
          explanation:
            'Takes the source collection array and chosen SortOption criterion. It guards against empty or single-element inputs with an early return, creates a shallow copy via [...collections] to protect props and state from in-place mutation, and sorts according to the chosen comparator.',
        },
        {
          name: 'const sorted = [...collections]',
          role: 'Immutable Array Copy',
          explanation:
            'JavaScript\'s Array.prototype.sort mutates the underlying array in place. In React, mutating props or state directly violates immutability principles, which can break memoization (such as useMemo or React.memo) and introduce subtle bugs. Creating a shallow clone guarantees pure function behavior.',
        },
        {
          name: 'timeB - timeA & timeA - timeB (Epoch Milliseconds)',
          role: 'Timestamp Epoch Differencing',
          explanation:
            'Converts ISO timestamp strings (created_at) into numeric Unix epoch milliseconds via new Date(ts).getTime(). Descending (timeB - timeA) places newer timestamps first, while ascending (timeA - timeB) puts older items first.',
        },
        {
          name: 'nameA.localeCompare(nameB)',
          role: 'Alphabetical String Locale Comparison',
          explanation:
            'Provides internationalized, locale-sensitive alphabetical sorting for titles. It correctly handles accent marks, diacritics, and case variations across languages instead of naive ASCII comparison (< or >).',
        },
        {
          name: 'countB - countA & countA - countB (Memory Item Count)',
          role: 'Nested Relation Cardinality Sorting',
          explanation:
            'Compares collection_items?.length || 0 across collections, sorting by how many memories/moments have been cataloged in each book.',
        },
        {
          name: 'Missing Date Sink Logic (start_date_asc / start_date_desc)',
          role: 'Null-Safe Date Comparison',
          explanation:
            'Because event start_time is optional, comparing undefined or null dates directly produces NaN, corrupting sort stability. If both are missing, it returns 0. If only one collection lacks a date, it returns 1 (or -1) so undated collections sink gracefully to the end of the list.',
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
]
