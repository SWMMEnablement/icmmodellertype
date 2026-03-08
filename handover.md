# ICM Modeller Type Quiz — Handover Document

## 1. Overview

The **ICM Modeller Type Quiz** is a personality-assessment web app for InfoWorks ICM (Integrated Catchment Modelling) professionals. Users answer scenario-based questions to discover their modelling personality type across four dimensions, then receive personalised insights, growth tips, team dynamics analysis, and learning resources.

**Live URL:** https://icmmodellertype.lovable.app

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 + shadcn/ui (Radix primitives) |
| Animations | Framer Motion |
| Routing | React Router DOM v6 |
| State Management | React hooks (useState, useCallback) + TanStack React Query |
| Backend | Lovable Cloud (Supabase) — edge functions only |
| AI Chatbot | Lovable AI via `icm-chat` edge function |
| Code Highlighting | highlight.js |
| Image Export | html-to-image |
| Markdown | react-markdown |

---

## 3. Project Structure

```
src/
├── pages/
│   ├── Index.tsx              # Main quiz flow (welcome → quiz → results)
│   ├── Documentation.tsx      # Docs page with type explorer, compare tool, quiz methodology
│   └── NotFound.tsx
├── components/
│   ├── WelcomeScreen.tsx      # Landing / start screen with mode selection
│   ├── QuestionCard.tsx       # Individual question display with 4 options (A/B/C/D)
│   ├── ProgressBar.tsx        # Quiz progress indicator
│   ├── ResultCard.tsx         # Full results page with all sections
│   ├── ShareableResultCard.tsx# Downloadable/shareable result image card
│   ├── QuickCompareSection.tsx# Side-by-side type comparison with share capability
│   ├── TeamDynamicsSection.tsx# Team collaboration insights
│   ├── AchievementsSection.tsx# Gamification badges and achievements
│   ├── PersonalizedTipsSection.tsx # Growth tips based on type
│   ├── ICMChatbot.tsx         # AI chatbot for ICM questions
│   ├── MarkdownRenderer.tsx   # Rich markdown rendering with syntax highlighting
│   ├── NavLink.tsx            # Navigation link component
│   └── SampleQuestion.tsx     # Sample question preview
├── data/
│   ├── questions.ts           # 20 quiz questions (5 per dimension × 4 dimensions)
│   ├── personalities.ts       # All personality type definitions + type resolution logic
│   ├── teamDynamics.ts        # Collaboration dynamics between types
│   ├── achievements.ts        # Achievement/badge definitions and conditions
│   ├── learningResources.ts   # Curated learning paths per type
│   └── personalizedTips.ts    # Growth tips per type
├── hooks/
│   ├── useQuizHistory.ts      # localStorage-based quiz history tracking
│   ├── use-mobile.tsx         # Mobile detection hook
│   └── use-toast.ts           # Toast notification hook
├── integrations/supabase/     # Auto-generated Supabase client (DO NOT EDIT)
└── components/ui/             # shadcn/ui primitives
```

### Backend (Edge Functions)

```
supabase/functions/
└── icm-chat/index.ts          # AI chatbot endpoint with rate limiting (20 req/min)
```

---

## 4. Core Concepts

### 4.1 Quiz Dimensions

The quiz measures four dimensions, each with four possible answer styles:

| Dimension | Code | Option A | Option B | Option C (Hybrid) | Option D (Context) |
|---|---|---|---|---|---|
| **Modeling Approach** | MA | Detail-Focused (D) | Big-Picture (B) | Context-Adaptive (H) | Context-Dependent (MA_CTX) |
| **Workflow Style** | WS | Automated (A) | Manual (M) | Hybrid Workflow (X) | Context-Dependent (WS_CTX) |
| **Problem Solving** | PS | Systematic (S) | Intuitive (I) | Integrated Approach (Y) | Context-Dependent (PS_CTX) |
| **Data Quality** | DQ | Perfectionist (P) | Pragmatic (R) | Risk-Based Quality (Z) | Context-Dependent (DQ_CTX) |

### 4.2 Personality Types

There are **16 core types** (e.g., DASP, BASR, BMIP) formed from combinations of the four A/B dimensions, plus **5 special types**:

- **HYBRID_INTEGRATOR** — 12+ hybrid answers (strong hybrid)
- **HYBRID_ADAPTIVE** — 8–11 hybrid answers (moderate)
- **HYBRID_FLEXIBLE** — 5–7 hybrid answers (flexible)
- **CONTEXT_MASTER** — 10+ context-dependent answers
- **CONTEXT_NAVIGATOR** — 6–9 context-dependent answers

Type resolution order: Context types → Hybrid types → Core 4-letter types (via `resolveType` and `getHybridType` in `personalities.ts`).

### 4.3 Quiz Modes

- **Self-Assessment** (`self`) — "I do this…" phrasing
- **Manager Assessment** (`manager`) — "My team member does this…" phrasing

### 4.4 Scoring

Each question has 5 answers per dimension. The quiz tracks scores for all trait codes (D, B, H, A, M, X, S, I, Y, P, R, Z, MA_CTX, WS_CTX, PS_CTX, DQ_CTX). The highest-scoring trait per dimension determines the type code. Users can go back and change answers.

---

## 5. Key Features

### 5.1 Results Page (`ResultCard.tsx`)

After completing the quiz, users see:

1. **Type card** — Name, description, colour-coded badge
2. **Strengths** — Key strengths of their type
3. **Growth areas** — Suggested development areas
4. **Recommended tools** — ICM-specific tool suggestions
5. **Quick Compare** — Select any other type for side-by-side comparison with collaboration insights, synergies, friction points, and shareable comparison image
6. **Team Dynamics** — How their type interacts with all other types
7. **Personalized Tips** — Actionable growth tips
8. **Learning Resources** — Filtered by experience level (Graduate → Senior → Principal → Director)
9. **Achievements** — Gamification badges earned across quiz attempts
10. **Shareable card** — Download result as PNG image

### 5.2 Documentation Page (`/docs`)

Tabbed interface with:
- **All Types** — Browse all personality types with details
- **Compare Types** — Select any two types and view detailed collaboration dynamics (synergies, friction, roles, tips)
- **Quiz Methodology** — How the quiz works, dimensions explained

### 5.3 AI Chatbot (`ICMChatbot.tsx`)

- Floating chat widget available on all pages
- Powered by Lovable AI via the `icm-chat` edge function
- Rate-limited to 20 requests/minute per IP
- Renders responses with full markdown + syntax highlighting
- Context-aware: knows about ICM modelling concepts

### 5.4 Quiz History & Achievements

- Stored in `localStorage` (no user accounts required)
- Tracks all past results, unique types discovered, streaks
- Achievements unlocked based on conditions (e.g., "Explorer" for 3+ unique types, "Consistent" for same result twice)
- Tiered badges: Bronze → Silver → Gold → Platinum

---

## 6. Data Flow

```
WelcomeScreen → (mode selection) → QuestionCard × 20 → Score Calculation → Type Resolution → ResultCard
                                        ↑ (back button)                          ↓
                                                                          localStorage (history)
```

1. User selects quiz mode (self/manager)
2. 20 questions presented one at a time with 4 options each
3. Scores accumulated per trait code
4. After Q20: hybrid/context check → core type resolution → personality lookup
5. Result saved to localStorage history
6. Achievements evaluated against full history

---

## 7. Styling & Design System

- **Theme:** Dark mode primary with teal/cyan accent palette
- **Design tokens:** Defined in `src/index.css` as CSS custom properties (HSL format)
- **All colours** referenced via Tailwind semantic classes (`bg-primary`, `text-foreground`, etc.)
- **Background:** Custom ICM network background image (`src/assets/icm-network-bg.png`)
- **Animations:** Framer Motion for page transitions, card reveals, and micro-interactions

---

## 8. Environment & Configuration

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Lovable Cloud API URL (auto-configured) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Anon key for client-side access (auto-configured) |

**Important files (auto-generated, DO NOT edit):**
- `src/integrations/supabase/client.ts`
- `src/integrations/supabase/types.ts`
- `supabase/config.toml`
- `.env`

---

## 9. Database

The project currently has **no database tables**. All quiz data is stored client-side in `localStorage`. The Supabase integration is used solely for edge functions (AI chatbot).

---

## 10. Deployment

- **Hosting:** Lovable (publish via Share → Publish)
- **Edge functions:** Auto-deployed on push
- **Custom domain:** Configurable via Project → Settings → Domains

---

## 11. Known Considerations

1. **No authentication** — Quiz history is device-local only; clearing browser data loses history
2. **No server-side persistence** — Results are not saved to any database
3. **Rate limiting** on chatbot is in-memory (resets on edge function cold start)
4. **SEO:** `index.html` has duplicate `<title>` tags that should be cleaned up
5. **Quiz data** in `public/data/quiz-questions.json` appears to be a duplicate/alternate source not used by the app (app uses `src/data/questions.ts`)

---

## 12. Extension Points

- **Add authentication** to persist quiz history across devices
- **Database tables** for storing results, enabling leaderboards or team dashboards
- **Team Analysis** dashboard for managers to view aggregate team personality distributions
- **API integration** with InfoWorks ICM for contextual tool recommendations
- **Internationalisation** (i18n) for multi-language support
