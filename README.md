# icmmodellertype

A browser-based application for working with InfoWorks ICM model-type workflows, built with React, TypeScript, Vite, shadcn-ui, Tailwind CSS, and Supabase.

## Overview

icmmodellertype is an actively developed repository in the SWMMEnablement organization that has grown well beyond its original Lovable-generated scaffold. The repository structure shows a modern TypeScript frontend, Supabase-backed project infrastructure, environment configuration, and project-specific handover documentation.

The visible development history suggests that the application includes domain-specific workflow support and a scenario simulator, making it more than a static reference or simple data-entry interface.

## Repository structure

```text
icmmodellertype/
├── public/                  # Static frontend assets
├── src/                     # Main application source code
├── supabase/                # Supabase configuration and backend support
├── .env                     # Environment variables
├── handover.md              # Project handover and app notes
├── README.md                # Project documentation
├── package.json             # Dependencies and scripts
├── package-lock.json        # npm lockfile
├── bun.lock                 # Bun lockfile
├── bun.lockb                # Bun binary lockfile
├── components.json          # shadcn-ui config
├── eslint.config.js         # ESLint config
├── index.html               # Vite entry page
├── postcss.config.js        # PostCSS config
├── tailwind.config.ts       # Tailwind setup
├── tsconfig.app.json        # App TypeScript config
├── tsconfig.json            # Root TypeScript config
├── tsconfig.node.json       # Node/tooling TypeScript config
└── vite.config.ts           # Vite configuration
```

## Tech stack

- React
- TypeScript
- Vite
- shadcn-ui
- Tailwind CSS
- Supabase
- ESLint
- npm and/or Bun

## Development workflow

### Prerequisites

- Node.js 18+ recommended
- npm
- Supabase project or local Supabase environment if backend features are required

### Install dependencies

```bash
git clone https://github.com/SWMMEnablement/icmmodellertype.git
cd icmmodellertype
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Configuration

This repository includes both an `.env` file and a `supabase/` directory, which indicates that local setup likely requires environment variables and backend configuration in addition to the normal frontend toolchain.

## Project notes

The visible commit history shows active feature development, including a scenario simulator and implementation work in the Supabase layer. The included `handover.md` file should be reviewed alongside the source code to understand the app’s workflow, main components, and intended extension points.

## Recommended next documentation improvements

To make this repository much easier for engineers and contributors to understand, the next documentation pass should add:

- A one-sentence description of the exact model-type workflow the app supports
- A summary of the main screens or routes in `src/`
- Notes on how Supabase is used in the app
- A description of the scenario simulator and its inputs/outputs
- Screenshots or GIFs of the UI
- Deployment details for the intended hosting environment
- A GitHub About description and topics

## Status

This repository is an active custom application rather than a template. Replacing the Lovable README is an important step toward making the project understandable, maintainable, and useful to new visitors.
