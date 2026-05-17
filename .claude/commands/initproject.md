# /initproject — Level 1 Vibecoder Starter

You're helping the user go from idea to running app **fast**. Stack is fixed: **Vite + React + TypeScript + Tailwind + Supabase**. No i18n, no SEO conventions, no over-engineering. Just ship.

Follow these phases interactively. **Resume detection first** — skip ahead if work is already done.

---

## PHASE 0 — State check (silent, every time)

Read the filesystem to figure out where to pick up. Do these checks
silently with Read/Glob/Bash — don't narrate.

| State on disk | Where to resume |
|---------------|-----------------|
| No `package.json`, no `.env` | **Phase 1** (PRD) |
| `package.json` exists, Supabase MCP not connected | **Phase 2** (MCP setup) — user likely came back after restart |
| MCP connected, no `.env` | **Phase 2.5** (collect keys, write `.env`, create client) |
| `.env` + `src/lib/supabase.ts` exist, no feature code beyond the shell | **Phase 4** (build) — re-ask for the PRD since it's not on disk |
| Feature code exists | Don't restart anything. Ask the user what to do next. |

---

## PHASE 1 — Get the PRD

Ask the user (use `AskUserQuestion`):

> **Do you have a PRD ready for your project?**
> - Yes, I have one
> - No, I need to write it

### If NO

Tell them:

```
No problem. Go to https://claude.ai and use this prompt:

  "Help me write a PRD for the following app idea: <your idea here>.
   Keep it tight: who it's for, what it does, the core features (max 5),
   and the data model. No fluff."

When you have the PRD, come back here and run /initproject again.
```

**STOP.** Do not continue. Wait for the user to come back with a PRD.

### If YES

Ask them to paste it (or give a path):

> **Drop your PRD here — paste the content, or give me a path like `./PRD.md`.**

Read it. Hold the key points in mind for Phase 4 — features to build,
data model, user flows. Don't write the PRD to disk, don't lecture the
user about it.

Then continue to Phase 2.

---

## PHASE 2 — Supabase MCP setup

Ask:

> **Do you already have a Supabase project created?**
> - Yes
> - No

### If NO

```
Go to https://supabase.com and:
  1. Sign in / create an account
  2. Click "New Project"
  3. Pick a name and a database password
  4. Wait ~2 min for it to be ready

Come back when it's done.
```

Wait for confirmation, then continue.

### Once the project exists

If the Supabase MCP is **not** yet connected, tell the user:

```
Now connect the Supabase MCP to Claude Code:

  1. Exit Claude Code:    /exit
  2. In your terminal:    claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp"
  3. Restart:             claude --dangerously-skip-permissions
  4. Inside Claude Code:  /mcp
  5. Authenticate Supabase in the browser when prompted
  6. Then run:            /initproject

I'll pick up automatically at Phase 3.
```

**STOP.** Wait for the restart.

### When MCP is available

Verify it works by calling a Supabase MCP tool (e.g. `list_projects` or `list_tables`). If it errors, tell the user to re-run `/mcp` and authenticate.

If multiple Supabase projects exist, ask which one to use.

---

## PHASE 3 — Scaffold the project

The PRD is already in mind (collected in Phase 1). Now lay down the
shell so Phase 4 has something to build on.

### Scaffold the stack

The current directory contains `.claude/` and `.git` so `npm create vite` won't work. Build it by hand.

Create `package.json`:

```json
{
  "name": "<project-name-from-dir>",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><project-name></title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `vite.config.ts`:

```ts
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
})
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "isolatedModules": true,
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src", "vite.config.ts"]
}
```

Create `src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>
)
```

Create `src/App.tsx` (temporary placeholder — replaced in Phase 4):

```tsx
export default function App() {
  return <div className="p-8">Setting up...</div>
}
```

Create `src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />
```

### Install deps

```bash
# Core
npm install react react-dom @supabase/supabase-js
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom @types/node

# Tailwind
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

# shadcn/ui foundations
npm install class-variance-authority clsx tailwind-merge tailwindcss-animate lucide-react @radix-ui/react-slot
```

### Tailwind config (shadcn-ready)

Overwrite `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

Create `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground; }
}
```

Create `src/lib/utils.ts` (the `cn` helper shadcn components rely on):

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Create `components.json` (so `npx shadcn@latest add <component>` works out of the box):

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

shadcn components are added on demand later (e.g. `npx shadcn@latest add button`) — don't pre-install any.

### Supabase client + env

Ask the user for **Supabase URL** and **anon key** (Settings → API).

Write `.env`:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Create `src/lib/supabase.ts`:

```ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

### Sanity check

Run `npm run dev` in the background and confirm the placeholder page loads. If it doesn't, debug before moving on.

---

## PHASE 4 — Build the app from the PRD

If you arrived here via Phase 0 (resuming a previous session), re-ask
the user to paste the PRD — it's not on disk. Otherwise it's already
in mind from Phase 1.

You have a clean React + Supabase + Tailwind shell. Now build the app.

**Rules:**
- Use the Supabase MCP for **all** database work. Create tables via `apply_migration` (so the SQL is versioned). Enable RLS with explicit policies.
- Keep components close to where they're used. Don't pre-architect folders you don't need yet.
- No i18n, no SEO meta dance. Add shadcn components on demand with `npx shadcn@latest add <name>` — don't pre-install a bunch.
- Iterate: build the simplest version of the core feature, run it, then add the next.
- When you make a non-trivial choice (e.g. data model shape, auth provider), say so in one line.

When the core feature works end-to-end, tell the user what's running and ask what to build next.

---

## Notes

- Always **execute** commands — don't just print them for the user to run.
- Stop and wait at the explicit STOP points (PRD missing, MCP setup, restart).
- If something fails, diagnose and fix. Don't paper over it.
- Skip every "best practice" instinct unless the user asks. This is Level 1 — speed over polish.
