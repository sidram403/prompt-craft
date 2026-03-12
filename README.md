# ⚡ PromptCraft — Developer Prompt Engineering Platform

> **Write better AI prompts. Get better code.**  
> A free, open-source platform that teaches developers how to prompt AI coding tools effectively — powered entirely by locally trained data. No external AI API. No subscriptions. No tracking.

---

## 🧠 What is PromptCraft?

Most developers use AI tools like ChatGPT, Claude, Cursor, or GitHub Copilot every day. But they get mediocre results because they write weak prompts.

**PromptCraft solves this.** It shows developers:
- ❌ What a **weak prompt** looks like (what most people write)
- ✅ What an **effective prompt** looks like (what gets real results)
- 💡 **Why** the effective version works better
- ⚡ A **prompt generator** that builds a structured, ready-to-use prompt from your description

Everything runs **100% locally** — no API keys, no AI calls, no internet required after loading.

---

## 🚀 How It Works

```
User opens the site
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│                    PromptCraft UI                        │
│                                                         │
│  ┌─────────────────┐     ┌───────────────────────────┐  │
│  │  Prompt         │     │  Examples Browser         │  │
│  │  Generator      │     │                           │  │
│  │                 │     │  Category Tabs:           │  │
│  │  1. Task Type   │     │  🚀 Feature  🐛 Bug Fix   │  │
│  │  2. Framework   │     │  🔧 Refactor 🔍 Review    │  │
│  │  3. Description │     │  🌐 API      🧪 Testing   │  │
│  │  4. Options     │     │                           │  │
│  │                 │     │  Each card shows:         │  │
│  │  [Generate] ──► │     │  ❌ Weak prompt           │  │
│  │                 │     │  ✅ Effective prompt       │  │
│  │  Structured     │     │  💡 Why it works          │  │
│  │  prompt output  │     │                           │  │
│  │  [📋 Copy]      │     │  [📋 Copy]                │  │
│  └─────────────────┘     └───────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
        │
        ▼
User copies prompt → pastes into Claude / ChatGPT / Cursor / Copilot
        │
        ▼
   Better output. Faster development.
```

### Prompt Generation Flow

```
User Input
    │
    ├── Task Type (Add Feature / Fix Bug / Refactor / Review / Tests / API / Performance / Security)
    ├── Framework (React / Next.js / Vue / Angular / Node.js / Express / Python / Django / FastAPI...)
    ├── Description (what they need in plain words)
    └── Options (error message, code snippet, want tests, want explanation)
         │
         ▼
  ┌──────────────────────────────────────┐
  │        Local Prompt Engine           │
  │  (src/data/promptGenerator.js)       │
  │                                      │
  │  Role Map        → "Act as a..."     │
  │  Framework Map   → Stack context     │
  │  Constraint Map  → Task-specific     │
  │  Output Format   → Structure rules   │
  └──────────────────────────────────────┘
         │
         ▼
  Structured Prompt Output
  (Role + Context + Task + Constraints + Output Format)
         │
         ▼
  [Copy to Clipboard → Paste into any AI tool]
```

---

## 📦 Local Training Data Architecture

This is the core of PromptCraft. All intelligence is **hand-crafted, locally stored data** — no AI generates these prompts.

```
src/data/
├── promptTemplates.js     ← 22+ curated example pairs (bad vs good prompts)
└── promptGenerator.js     ← Rule-based engine that generates prompts from user input
```

### `promptTemplates.js` — Training Examples

Each example is a manually crafted training record covering a real developer scenario:

```js
{
  id: 'bug-1',
  category: 'bugfix',           // feature | bugfix | refactor | review | api | testing
  title: 'Fix Infinite Re-render Loop',
  tags: ['React', 'useEffect', 'Debugging'],
  difficulty: 'Intermediate',   // Beginner | Intermediate | Advanced

  badPrompt:  `Why is my React component re-rendering infinitely?`,

  goodPrompt: `You are a React debugging expert.

My component is stuck in an infinite re-render loop...
[full context, actual code, what was tried, specific ask]`,

  explanation: 'Includes actual code, explains symptom, describes what was tried...'
}
```

### `promptGenerator.js` — Local Rule Engine

The generator combines 4 building blocks, all stored locally:

| Building Block | What it does |
|---|---|
| **Role Map** | Maps task type → expert role (e.g., "Fix Bug" → "expert debugging engineer") |
| **Framework Context** | Maps framework → full stack description (e.g., "react" → "React 18 with functional components and hooks") |
| **Constraint Templates** | Maps task type → quality constraints (different rules for bugs vs features vs reviews) |
| **Output Format Templates** | Maps task type → output structure (e.g., bug fix = "Root cause → Fix → Explanation") |

### Covered Categories & Cases

| Category | Cases Covered |
|---|---|
| 🚀 **Add Feature** | Modal component, dark mode, debounced search, JWT auth, infinite scroll, real-time WebSocket, CSV export |
| 🐛 **Bug Fixing** | Re-render loop, race condition, CSS mobile layout, null reference error, stale data, N+1 queries, JWT persistence |
| 🔧 **Refactoring** | Extract custom hook, memoization, async/await conversion, split large component, useReducer |
| 🔍 **Code Review** | Security audit, React PR review, database schema review |
| 🌐 **API Integration** | REST with error handling, rate limiting + retry, file upload with progress |
| 🧪 **Testing** | Unit tests for hooks, API integration tests, form component tests |

**Total: 22+ curated examples, 8 generator task types, 12 supported frameworks**

---

## 🛠️ Tech Stack

```
Frontend:  React 18 + Vite
Styling:   Vanilla CSS (dark theme, glassmorphism, CSS variables)
Data:      100% local JavaScript files — no database, no backend, no API
```

---

## 🏃 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/promptcraft.git
cd promptcraft

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — that's it.

---

## 🤝 Contributing

**PromptCraft is built on community knowledge.** The more examples and cases we add, the better it helps developers.

> 🎯 **The goal:** Make this the largest free, AI-independent library of effective developer prompts — maintained by developers, for developers.

### How to Contribute

1. **Fork** this repository
2. **Add your training data** or fix something
3. **Open a pull request** with a description of what you added

### What You Can Contribute

#### ➕ Add New Prompt Examples (`src/data/promptTemplates.js`)

Add a new entry to the `promptTemplates` array:

```js
{
  id: 'your-unique-id',           // e.g., 'feat-8', 'bug-7', 'refactor-5'
  category: 'feature',            // feature | bugfix | refactor | review | api | testing
  title: 'Short, clear title',
  tags: ['React', 'TypeScript'],
  difficulty: 'Intermediate',     // Beginner | Intermediate | Advanced

  // What most developers write (keep it vague — the bad example)
  badPrompt: `Add a feature to my app.`,

  // What they SHOULD write (specific, contextual, structured)
  goodPrompt: `You are a [role].

[Clear description of what's needed]
[Context about the current setup]
[Specific requirements numbered 1, 2, 3...]
[Constraints: what NOT to do]
[Expected output format]`,

  explanation: 'Why the good prompt works better (1-2 sentences).',
}
```

#### ➕ Add New Generator Task Types (`src/data/promptGenerator.js`)

```js
// 1. Add to taskTypes array
{ id: 'your_task', label: 'Your Task', icon: '🎯', color: '#hexcolor' }

// 2. Add to roleMap
roleMap['your_task'] = 'expert role description for this task type'

// 3. Add to constraintTemplates
constraintTemplates['your_task'] = ['Constraint 1', 'Constraint 2']

// 4. Add to outputFormatTemplates
outputFormatTemplates['your_task'] = `**Output format:**\n- Format instruction`
```

#### ➕ Add More Frameworks (`src/data/promptGenerator.js`)

```js
// In frameworks array:
{ id: 'svelte', label: 'Svelte', icon: '🔥' }

// In frameworkContext:
frameworkContext['svelte'] = 'Svelte 5 with runes ($state, $derived, $effect)'
```

#### 🐛 Fix or Improve Existing Prompts

If you know a better way to prompt for an existing case — edit the `goodPrompt` or `explanation` field directly.

### Contribution Guidelines

- Keep prompts **clear and simple** — no jargon-heavy language
- Every `goodPrompt` must include: **role + context + specific ask + constraints**
- Test your prompt by pasting it into an AI tool and verifying it produces better output than the bad version
- One PR = one new example or one focused fix

---

## 🌟 Vision

> **PromptCraft should be the Wikipedia of developer prompt engineering** — free, open, community-maintained, and completely independent of any AI company or paid service.

- ✅ No AI API calls — all data is locally stored
- ✅ No subscriptions or paywalls
- ✅ No tracking or analytics
- ✅ Works offline after the first page load
- ✅ Community-trained by developers, not machine-generated

Every prompt in this library is written by **real developers** who have tested what works and what doesn't when working with AI coding tools. This platform will never depend on calling an external AI to generate its content — the knowledge lives here, in the codebase, contributed by the community.

**If you've found a prompt pattern that consistently gives you great results — share it here.**

---

## 📄 License

MIT — free to use, fork, and build on.

---

*Built by developers, for developers. If PromptCraft helped you, give it a ⭐ and share it with your team.*
