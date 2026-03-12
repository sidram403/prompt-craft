// ============================================================
//  LOCAL TRAINING DATA — Curated Prompt Examples for Developers
//  Prompts are written to be clear, concise, easy to read.
// ============================================================

export const categories = [
    { id: 'all', label: '✨ All', icon: '✨' },
    { id: 'feature', label: '🚀 Add Feature', icon: '🚀' },
    { id: 'bugfix', label: '🐛 Bug Fixing', icon: '🐛' },
    { id: 'refactor', label: '🔧 Refactoring', icon: '🔧' },
    { id: 'review', label: '🔍 Code Review', icon: '🔍' },
    { id: 'api', label: '🌐 API Integration', icon: '🌐' },
    { id: 'testing', label: '🧪 Testing', icon: '🧪' },
];

export const promptTemplates = [

    // ─────────────────────────────────────────────
    // FEATURE ADDITION
    // ─────────────────────────────────────────────
    {
        id: 'feat-1',
        category: 'feature',
        title: 'Build a Reusable Modal Component',
        tags: ['React', 'Component', 'Accessibility'],
        difficulty: 'Beginner',
        badPrompt: `Create a modal component in React.`,
        goodPrompt: `You are a senior React developer.

Create a reusable Modal component with these requirements:

Stack: React 18, TypeScript

Props needed:
- isOpen: boolean
- onClose: () => void
- title: string
- children: React.ReactNode
- size? : 'sm' | 'md' | 'lg'

Behavior:
- Close when clicking the backdrop
- Close when pressing Escape key
- Trap focus inside the modal (for accessibility)
- Fade-in animation on open

Output:
- Single .tsx file with the component
- A usage example in a comment at the bottom`,
        explanation: 'Clear role, exact props with TypeScript types, specific behavior requirements, and a defined output format. No ambiguity = better code.',
    },
    {
        id: 'feat-2',
        category: 'feature',
        title: 'Add Dark Mode Toggle',
        tags: ['React', 'CSS', 'localStorage', 'UX'],
        difficulty: 'Beginner',
        badPrompt: `Add dark mode to my React app.`,
        goodPrompt: `You are a React frontend developer.

Add a dark/light mode toggle to my React 18 app.

How it should work:
1. Toggle button switches between dark and light themes
2. Save the user's choice to localStorage so it persists on refresh
3. Read the user's system preference on first visit (prefers-color-scheme)
4. Apply themes using CSS variables on the <html> element (not inline styles)

Deliver:
- useDarkMode.js — custom hook that handles all the logic
- ThemeToggle.jsx — the button component with a sun/moon icon
- Show what CSS variables to add to index.css

Keep it simple — no third-party libraries needed.`,
        explanation: 'Explains the exact behavior step-by-step, specifies the implementation approach (CSS variables, not inline styles), and scopes deliverables clearly.',
    },
    {
        id: 'feat-3',
        category: 'feature',
        title: 'Search Input with Debounce',
        tags: ['React', 'Performance', 'UX', 'Hooks'],
        difficulty: 'Intermediate',
        badPrompt: `Add search to my React app.`,
        goodPrompt: `You are a React developer focused on performance.

Add a live search feature to my product listing page.

Current situation:
- ProductList.jsx shows a list of products from a products prop
- Products come from GET /api/products?search=<query>

What I need:
1. Search input at the top of the list
2. Wait 300ms after the user stops typing before calling the API (debounce) — don't spam requests on every keypress
3. Show a loading spinner while fetching
4. Show "No results found" if the API returns nothing
5. Cancel any in-progress request when the user types again (use AbortController)

Please create:
- useDebounce.js — a reusable debounce hook
- Updated ProductList.jsx with the search wired in

No external libraries — use native browser fetch.`,
        explanation: 'Describes the current state, explains WHY debounce is needed (no spam requests), lists exact UI states, and scopes what files to create.',
    },
    {
        id: 'feat-4',
        category: 'feature',
        title: 'Add JWT Login Flow',
        tags: ['Auth', 'JWT', 'React', 'Node.js'],
        difficulty: 'Advanced',
        badPrompt: `Add login to my app.`,
        goodPrompt: `You are a full-stack developer who knows authentication well.

Add JWT-based login to my React + Node.js app.

My current stack:
- Frontend: React 18, Axios, React Router v6, Zustand for state
- Backend: Node.js, Express, MongoDB with Mongoose

What to build:

Backend:
- POST /api/auth/login → check credentials, return { accessToken, refreshToken }
- POST /api/auth/refresh → swap refresh token for a new access token
- Access token valid for 15 minutes, refresh token for 7 days

Frontend:
- useAuth hook — login/logout/store token
- ProtectedRoute component — redirect to /login if not logged in
- Axios interceptor — attach token to every request, auto-refresh on 401

Important:
- Don't use Passport.js or Auth0 — build it from scratch
- Handle expired token errors gracefully

Output each file separately with the filename as a comment at the top.`,
        explanation: 'Lists the exact tech stack, splits work into clear frontend/backend sections, specifies token lifetimes, and explicitly says what NOT to use.',
    },
    {
        id: 'feat-5',
        category: 'feature',
        title: 'Infinite Scroll Pagination',
        tags: ['React', 'UX', 'API', 'Performance'],
        difficulty: 'Intermediate',
        badPrompt: `Add pagination to my list.`,
        goodPrompt: `You are a React developer.

Replace the "Load More" button on my PostList page with infinite scroll.

Current setup:
- Data comes from GET /api/posts?page=1&limit=20
- I already have a basic PostList.jsx that shows posts

What I need:
1. Detect when the user scrolls near the bottom (use Intersection Observer — no scroll event listeners)
2. Automatically fetch the next page
3. Show a loading spinner at the bottom while fetching
4. Stop loading when there are no more pages (API returns hasNextPage: false)
5. Don't re-fetch if a fetch is already in progress

Create a useInfiniteScroll(fetchFn) hook that does the heavy lifting.
Then show how to use it in PostList.jsx.`,
        explanation: 'Explains the current setup, specifies the right implementation approach (Intersection Observer), handles edge cases (no more pages, in-flight requests), and requests a reusable hook.',
    },

    // ─────────────────────────────────────────────
    // BUG FIXING
    // ─────────────────────────────────────────────
    {
        id: 'bug-1',
        category: 'bugfix',
        title: 'Fix Infinite Re-render Loop',
        tags: ['React', 'useEffect', 'Debugging'],
        difficulty: 'Intermediate',
        badPrompt: `Why is my React component re-rendering infinitely?`,
        goodPrompt: `You are a React debugging expert.

My component is stuck in an infinite re-render loop. The browser tab freezes.

Here is the problem code:

function UserProfile({ userId }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser(userId).then(data => setUser(data));
  }, [user]); // <-- this line looks wrong but I'm not sure why

  return <div>{user.name}</div>;
}

I tried removing the dependency array — that fixed the loop but then it never re-fetches when userId changes.

Please:
1. Explain exactly why [user] in the dependency array causes infinite renders
2. Show the corrected useEffect with the right dependency
3. Give me a simple rule to remember for useEffect dependencies`,
        explanation: 'Includes the actual broken code, explains the symptom, describes what was already tried, and asks for both a fix AND an explanation — turning the bug into a learning moment.',
    },
    {
        id: 'bug-2',
        category: 'bugfix',
        title: 'Fix Race Condition in Stock Update',
        tags: ['Node.js', 'MongoDB', 'Async', 'Race Condition'],
        difficulty: 'Advanced',
        badPrompt: `My async code isn't working.`,
        goodPrompt: `You are a Node.js backend developer.

I have a race condition in my order API. When two users checkout the same product at the same time, the stock goes negative (we're overselling).

The broken code:

app.post('/api/orders', async (req, res) => {
  const product = await Product.findById(req.body.productId);

  if (product.stock < req.body.quantity) {
    return res.status(400).json({ error: 'Not enough stock' });
  }

  // BUG: Another request can pass the check above before this runs
  await Product.updateOne(
    { _id: req.body.productId },
    { $inc: { stock: -req.body.quantity } }
  );

  const order = await Order.create(req.body);
  res.json(order);
});

Stack: Node.js, Express, MongoDB with Mongoose.

Please fix this using a single atomic MongoDB operation (findOneAndUpdate with a condition).
- Only deduct stock if enough is available
- Return a clear error if stock ran out during the request
- Keep the fix minimal — don't rewrite the whole route`,
        explanation: 'Shows the exact broken code with a comment explaining the bug, gives context about the real-world impact, and scopes the fix method precisely.',
    },
    {
        id: 'bug-3',
        category: 'bugfix',
        title: 'Fix Mobile Navigation Layout',
        tags: ['CSS', 'Responsive', 'Mobile', 'Flexbox'],
        difficulty: 'Beginner',
        badPrompt: `My layout looks broken on mobile.`,
        goodPrompt: `You are a CSS layout expert.

On mobile (screens under 768px), my navigation links overflow the screen horizontally instead of stacking.

Current CSS:

.navbar {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 16px 32px;
}

.nav-links {
  display: flex;
  gap: 32px;
  list-style: none;
}

What's happening: All 5 nav links show in a row, causing horizontal scroll on iPhone.

What I've tried:
- flex-wrap: wrap → links wrap but look messy
- overflow-x: hidden → just hides the links

What I need:
- Below 768px: logo on top-left, nav links stack vertically
- Above 768px: keep the existing layout
- CSS only — no JavaScript
- Add a media query to the existing CSS, don't rewrite everything`,
        explanation: 'Describes the exact visual problem, includes the real CSS, lists device/viewport, and logs what was already tried — so the AI doesn\'t suggest things that already failed.',
    },
    {
        id: 'bug-4',
        category: 'bugfix',
        title: 'Fix Cannot Read Properties of Undefined',
        tags: ['JavaScript', 'TypeError', 'Optional Chaining'],
        difficulty: 'Beginner',
        badPrompt: `How to fix cannot read properties of undefined?`,
        goodPrompt: `You are a JavaScript debugging assistant.

I'm getting this error in production:

TypeError: Cannot read properties of undefined (reading 'address')
  at OrderSummary (OrderSummary.jsx:23)

The code that crashes:

function OrderSummary({ order }) {
  return (
    <div>
      <h2>Order #{order.id}</h2>
      <p>{order.user.address.street}</p>  {/* Line 23 — crashes here */}
      <p>Total: \${order.total}</p>
    </div>
  );
}

Context:
- The order prop comes from our API
- Some orders (about 5%) are guest checkouts — they have no user object
- This only crashes for those guest orders

Please:
1. Fix line 23 to handle when order.user or order.user.address is missing
2. Show two ways to fix it: (a) optional chaining, (b) showing a fallback message instead of the address
3. Which approach do you recommend for a production app?`,
        explanation: 'Includes the full error message, exact file and line, the component code, and explains WHEN the crash happens — giving the AI everything needed to solve it correctly.',
    },
    {
        id: 'bug-5',
        category: 'bugfix',
        title: 'Fix Stale Data After Form Submit',
        tags: ['React', 'State', 'Re-render', 'useEffect'],
        difficulty: 'Intermediate',
        badPrompt: `My list doesn't update after adding an item.`,
        goodPrompt: `You are a React state management expert.

After submitting a form to add a new item, the list still shows old data until I manually refresh the page.

My setup:
- UserList.jsx fetches users via useEffect on mount
- AddUserForm.jsx has a form that calls POST /api/users
- They are sibling components (both inside Dashboard.jsx)

The issue is that after AddUserForm successfully adds a user, UserList doesn't know to re-fetch.

I don't want to use a global state library for this — I want a simple solution.

Please show me:
1. The simplest way to trigger a re-fetch in UserList when a user is added (hint: lifting state / callback prop)
2. Show the updated Dashboard.jsx, UserList.jsx, and AddUserForm.jsx with minimal changes
3. Are there better patterns for this? Briefly explain alternatives.`,
        explanation: 'Explains the component tree, identifies the root cause (sibling communication), sets a constraint (no global state), and asks for both a fix and context on alternatives.',
    },
    {
        id: 'bug-6',
        category: 'bugfix',
        title: 'Fix Slow Page Load due to N+1 Queries',
        tags: ['Node.js', 'MongoDB', 'Performance', 'Database'],
        difficulty: 'Advanced',
        badPrompt: `My API is slow.`,
        goodPrompt: `You are a Node.js and MongoDB performance expert.

My /api/posts endpoint is very slow — it takes 2-3 seconds for 50 posts. I think it's a database query issue.

Current code:

app.get('/api/posts', async (req, res) => {
  const posts = await Post.find();

  // For each post, fetch the author separately
  const result = await Promise.all(
    posts.map(async (post) => {
      const author = await User.findById(post.authorId); // runs once per post!
      return { ...post.toObject(), author };
    })
  );

  res.json(result);
});

This makes 1 query for posts + 50 queries for authors = 51 total queries. That's the N+1 problem.

Please:
1. Fix this using Mongoose .populate() to get all data in 2 queries
2. Show the updated query
3. Briefly explain why this is faster`,
        explanation: 'Names the problem (N+1), shows the broken code with a comment explaining why it\'s slow, and specifically asks for .populate() — showing the developer has some idea of the solution direction.',
    },

    // ─────────────────────────────────────────────
    // REFACTORING
    // ─────────────────────────────────────────────
    {
        id: 'refactor-1',
        category: 'refactor',
        title: 'Extract Data Fetching into a Custom Hook',
        tags: ['React', 'Custom Hooks', 'Clean Code'],
        difficulty: 'Beginner',
        badPrompt: `Refactor my React component.`,
        goodPrompt: `You are a React developer who loves clean code.

My ProductPage component is doing too much — it mixes data fetching with UI. I want to extract the fetching logic into a custom hook.

Current component:

function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/products/' + productId)
      .then(r => r.json())
      .then(data => { setProduct(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [productId]);

  if (loading) return <Spinner />;
  if (error) return <ErrorBanner message={error} />;
  return <ProductDetail product={product} />;
}

The hook should:
- Be named useProduct(productId)
- Return { product, loading, error, refetch }
- Clean up the request if the component unmounts (AbortController)

The component after refactoring should only contain the if/return JSX lines — no fetching logic.
Don't change the JSX structure.`,
        explanation: 'Shows the full component, defines the hook\'s exact API (name, params, return values), adds a missing feature (refetch), and says explicitly what NOT to change.',
    },
    {
        id: 'refactor-2',
        category: 'refactor',
        title: 'Reduce Unnecessary Re-renders with Memoization',
        tags: ['React', 'memo', 'useMemo', 'Performance'],
        difficulty: 'Advanced',
        badPrompt: `Make my React component faster.`,
        goodPrompt: `You are a React performance expert.

Every keystroke in my search input causes a visible freeze. React DevTools shows the entire Dashboard re-renders 100+ times during a search session.

Here's the component:

function Dashboard({ products, user }) {
  const [search, setSearch] = useState('');

  // This runs on EVERY render including each keystroke
  const stats = products.reduce((acc, p) => ({
    total: acc.total + p.price,
    count: acc.count + 1,
  }), { total: 0, count: 0 });

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <StatsBar stats={stats} user={user} />
      <input value={search} onChange={e => setSearch(e.target.value)} />
      <ProductGrid products={filtered} />
    </div>
  );
}

Please:
1. Wrap stats in useMemo so it only recalculates when products changes
2. Wrap filtered in useMemo so it only recalculates when products or search changes
3. Wrap StatsBar in React.memo so it doesn't re-render when only search changes
4. For each change, add a comment explaining what problem it solves`,
        explanation: 'Describes the measured symptom (100+ re-renders), shows the code with inline comments pointing to the problems, and asks for comments explaining each fix.',
    },
    {
        id: 'refactor-3',
        category: 'refactor',
        title: 'Convert Callback Hell to Async/Await',
        tags: ['JavaScript', 'Async', 'Clean Code', 'Node.js'],
        difficulty: 'Beginner',
        badPrompt: `Rewrite my callback code to async/await.`,
        goodPrompt: `You are a JavaScript developer who writes clean, modern code.

This Express route handler uses nested callbacks — it's hard to read and maintain. Rewrite it using async/await.

Current (messy) code:

app.post('/api/checkout', (req, res) => {
  User.findById(req.user.id, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });

    Cart.findOne({ userId: user._id }, (err, cart) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!cart) return res.status(404).json({ error: 'Cart not found' });

      Order.create({ user: user._id, items: cart.items }, (err, order) => {
        if (err) return res.status(500).json({ error: err.message });

        cart.remove((err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ orderId: order._id });
        });
      });
    });
  });
});

Rules for the rewrite:
- Use one try/catch block
- Keep the same business logic and response format
- Don't change the route path or HTTP method
- The result should be noticeably shorter and read top-to-bottom`,
        explanation: 'Show the exact code, give clear rules for the rewrite, and define the quality goal (shorter, top-to-bottom readable) — so the AI doesn\'t over-engineer it.',
    },
    {
        id: 'refactor-4',
        category: 'refactor',
        title: 'Split a Large Component into Smaller Ones',
        tags: ['React', 'Component Design', 'Clean Code'],
        difficulty: 'Intermediate',
        badPrompt: `My component is too big, split it up.`,
        goodPrompt: `You are a React component design expert.

My UserDashboard.jsx is 400+ lines. It handles too many things at once. Help me split it into smaller, focused components.

Current structure (simplified):

function UserDashboard() {
  // 1. Profile section — shows avatar, name, bio
  // 2. Stats section — shows post count, followers, following
  // 3. Recent posts list with like/comment counts
  // 4. Settings form — update name, email, password
  return ( ... all mixed together ... );
}

What I want:
- UserProfile.jsx — avatar + name + bio
- UserStats.jsx — follower/post counts
- RecentPosts.jsx — posts list
- SettingsForm.jsx — the form
- UserDashboard.jsx — just composes the above, no logic

Rules:
- Identify what props each new component needs
- UserDashboard should ideally be under 30 lines after the split
- Don't move the data-fetching logic yet — just split the UI`,
        explanation: 'Shows the current structure clearly, defines exactly what each new component should be, sets a size goal (30 lines), and scopes the task (UI split only, no data changes).',
    },

    // ─────────────────────────────────────────────
    // CODE REVIEW
    // ─────────────────────────────────────────────
    {
        id: 'review-1',
        category: 'review',
        title: 'Security Review of an API Endpoint',
        tags: ['Security', 'Node.js', 'SQL Injection', 'OWASP'],
        difficulty: 'Advanced',
        badPrompt: `Check my API for security issues.`,
        goodPrompt: `You are an application security expert.

Review this Express.js route for security problems. Focus only on security — not code style.

Code to review:

app.get('/api/users/:id/data', async (req, res) => {
  const { id } = req.params;
  const { fields } = req.query;

  // User controls which fields to select — dangerous?
  const user = await db.query(
    'SELECT ' + fields + ' FROM users WHERE id = ' + id
  );

  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

For each issue you find, tell me:
- What the vulnerability is (e.g., SQL Injection, IDOR)
- What an attacker could do with it
- How to fix it (show the corrected code)

Check at minimum: SQL injection, missing auth check, data exposure, input validation.

After listing the issues, show me the fully secure version of this endpoint.`,
        explanation: 'Scopes to security only, provides the actual code, asks for structured output (vulnerability + impact + fix), and requests the corrected version at the end.',
    },
    {
        id: 'review-2',
        category: 'review',
        title: 'React Component Pull Request Review',
        tags: ['React', 'PR Review', 'Accessibility', 'Best Practices'],
        difficulty: 'Intermediate',
        badPrompt: `Review my React component.`,
        goodPrompt: `You are a senior React developer doing a pull request review.

Review this component for bugs, performance issues, and accessibility. Don't comment on code style or formatting.

Component to review:

function UserTable({ users }) {
  const [sortKey, setSortKey] = useState('name');

  const sorted = users.sort((a, b) =>
    a[sortKey].localeCompare(b[sortKey])
  );

  return (
    <div onClick={() => setSortKey('email')}>
      {sorted.map((u, index) => (
        <div key={index}>
          <span>{u.name}</span>
          <span>{u.email}</span>
          <img src={u.avatar} />
        </div>
      ))}
    </div>
  );
}

For each issue, tell me:
- What the problem is
- Why it matters (bug? performance? a11y?)
- How to fix it

After the review, show me the corrected version.`,
        explanation: 'Scopes review clearly (no style), provides the component, asks for structured issue reporting, and requests the fixed version — all the essential PR review elements.',
    },
    {
        id: 'review-3',
        category: 'review',
        title: 'Review a Database Schema Design',
        tags: ['Database', 'Schema', 'MongoDB', 'Design'],
        difficulty: 'Intermediate',
        badPrompt: `Is my database schema good?`,
        goodPrompt: `You are a database design expert.

Review my MongoDB schema design for a blog platform. I'm not sure if I've structured the relationships correctly.

My current schemas:

// Post
{
  title: String,
  content: String,
  author: String,       // just the name as a string
  tags: [String],
  comments: [          // all comments embedded in the post
    { text: String, author: String, date: Date }
  ]
}

// User
{
  name: String,
  email: String,
  posts: [ObjectId]    // array of all post IDs
}

My concerns:
1. Is embedding all comments in the post document a good idea if posts get 500+ comments?
2. Is storing post IDs in the user document the right approach?
3. How should I store the author relationship properly?

Please:
- Review each concern and give a yes/no + short reason
- Suggest the improved schema
- Explain when embedding is fine vs when to use references`,
        explanation: 'Shows the actual schemas, admits the specific concerns rather than asking vaguely, and asks for concrete yes/no answers — making it easier for the AI to address the real questions.',
    },

    // ─────────────────────────────────────────────
    // API INTEGRATION
    // ─────────────────────────────────────────────
    {
        id: 'api-1',
        category: 'api',
        title: 'Fetch API Data with Error Handling',
        tags: ['React', 'Axios', 'Error Handling', 'REST'],
        difficulty: 'Beginner',
        badPrompt: `How do I call an API in React?`,
        goodPrompt: `You are a React developer.

Help me fetch data from an API in my React 18 app — with proper error handling.

API details:
- GET https://api.example.com/v1/products
- Requires a Bearer token (stored in localStorage as 'authToken')
- Returns: { data: Product[], pagination: { page, total } }

I need a useProducts(page) hook that:
1. Calls the API when page changes
2. Returns { products, loading, error, pagination }
3. Shows a loading state while fetching
4. Catches errors and returns an error message (not a crash)
5. Cancels the request if the component unmounts (cleanup)

Also set up an Axios instance (apiClient.js) that:
- Has the base URL from an env variable VITE_API_BASE_URL
- Automatically attaches the auth token to every request
- Redirects to /login if the server returns 401

No React Query — implement with standard hooks.`,
        explanation: 'Defines the API response shape, auth method, and a clear hook contract — preventing the AI from delivering a simple useEffect+fetch that misses all the production concerns.',
    },
    {
        id: 'api-2',
        category: 'api',
        title: 'Handle API Rate Limiting with Retry',
        tags: ['API', 'Rate Limiting', 'Retry', 'Node.js'],
        difficulty: 'Advanced',
        badPrompt: `Handle rate limiting in my API calls.`,
        goodPrompt: `You are a Node.js developer who knows how to handle external APIs.

I'm calling a third-party API that has a rate limit (100 requests per minute). When I hit the limit, it returns HTTP 429 with a Retry-After header (number of seconds to wait).

I need a makeRequest(url, options) wrapper function that:
1. Tries the request
2. If it gets a 429, reads the Retry-After header and waits that many seconds
3. Retries the request (up to 3 times max)
4. Throws a clear error if it fails all 3 retries
5. For any other error (5xx), retry after 2 seconds (up to 2 times)

Keep it simple — no external retry libraries needed.

Show me:
- The makeRequest function
- How to use it in a real example (calling a products API)`,
        explanation: 'Defines the exact HTTP behavior (429, Retry-After header), sets retry limits, differentiates between rate limit vs server errors, and requests a usage example.',
    },
    {
        id: 'api-3',
        category: 'api',
        title: 'Upload Files with Progress Tracking',
        tags: ['File Upload', 'Axios', 'React', 'Progress'],
        difficulty: 'Intermediate',
        badPrompt: `How to upload files in React?`,
        goodPrompt: `You are a React developer.

Add a file upload feature to my React app with a progress bar.

Requirements:
- Accept image files only (jpg, png, webp) up to 5MB
- Show a real-time upload progress bar (0% → 100%)
- Show the uploaded image preview after success
- Show a clear error if the file is too large or wrong type
- Backend endpoint is POST /api/upload (returns { url: string })

Build:
1. FileUpload.jsx — drag & drop area + file input + progress bar + preview
2. Use Axios with onUploadProgress to track real progress (not a fake animation)

HTML5 File API for validation, no external upload libraries.`,
        explanation: 'Specifies file type/size constraints, requires real progress tracking (not fake), defines the success/error states, and scopes the deliverables clearly.',
    },

    // ─────────────────────────────────────────────
    // TESTING
    // ─────────────────────────────────────────────
    {
        id: 'test-1',
        category: 'testing',
        title: 'Write Unit Tests for a Custom Hook',
        tags: ['Jest', 'React Testing Library', 'Hooks', 'Unit Testing'],
        difficulty: 'Intermediate',
        badPrompt: `Write tests for my hook.`,
        goodPrompt: `You are a React testing expert.

Write unit tests for this useCart hook using Jest and React Testing Library.

The hook:

function useCart() {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id
          ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return { items, addItem, removeItem, total };
}

Test cases to write:
1. Cart starts empty, total = 0
2. Adding a new item → appears with qty: 1
3. Adding the same item twice → qty becomes 2 (no duplicate)
4. Removing an item → it's gone from cart
5. Removing an item that doesn't exist → no error, cart unchanged
6. Total calculates correctly with multiple items (e.g. 2x $10 + 1x $5 = $25)

Use renderHook from @testing-library/react.
Each test in its own it() with a description that reads like a requirement.`,
        explanation: 'Provides the full hook code, explicitly lists 6 test cases including edge cases, and specifies the output format — ensuring comprehensive tests that actually cover the real behavior.',
    },
    {
        id: 'test-2',
        category: 'testing',
        title: 'Write API Integration Tests',
        tags: ['Jest', 'Supertest', 'Express', 'MongoDB'],
        difficulty: 'Advanced',
        badPrompt: `Write tests for my API.`,
        goodPrompt: `You are a backend testing expert.

Write integration tests for my POST /api/orders endpoint using Jest and Supertest.

What the endpoint does:
- Creates an order if the product has enough stock
- Returns 201 + { orderId } on success
- Returns 400 + { error: 'Not enough stock' } if stock is low
- Returns 401 if no auth token

Test scenarios to cover:
1. Valid order with enough stock → 201 + orderId
2. Order quantity exceeds stock → 400 + 'Not enough stock'
3. Product doesn't exist → 404 + 'Product not found'
4. No auth token → 401 + 'Unauthorized'
5. quantity = 0 → 400 + 'Invalid quantity'
6. Two simultaneous orders when only 1 item in stock → one succeeds, one fails

Setup:
- Use mongodb-memory-server for an in-memory database (no real DB needed)
- Seed test data in beforeEach, clean up in afterEach
- Use a hardcoded test JWT token (put the secret in TEST_JWT_SECRET env var)

Show the full test file with all setup and teardown.`,
        explanation: 'Uses a table-like list for test scenarios with expected status codes, specifies test infrastructure, and asks for the full file — nothing left to guess.',
    },
    {
        id: 'test-3',
        category: 'testing',
        title: 'Test a Form Component',
        tags: ['React Testing Library', 'Forms', 'User Events', 'Validation'],
        difficulty: 'Beginner',
        badPrompt: `Write tests for my form.`,
        goodPrompt: `You are a frontend testing expert.

Write tests for my LoginForm React component using React Testing Library.

The form:
- Has email and password inputs
- Shows "Email is required" if email is empty on submit
- Shows "Password must be at least 8 characters" if too short
- Calls onSubmit(email, password) prop when valid
- Shows a loading spinner while submitting
- Disables the submit button during loading

Test cases:
1. Form renders with empty fields
2. Submit with empty email → shows "Email is required" error
3. Submit with short password → shows the password error
4. Valid email + valid password → onSubmit gets called with the right values
5. While submitting (loading: true) → button is disabled and spinner is visible

Use @testing-library/user-event to simulate typing and clicking.
Use jest.fn() for the onSubmit prop so you can check if it was called.`,
        explanation: 'Lists the component\'s exact validation rules, specifies 5 concrete test cases covering validation and loading states, and says which testing utilities to use.',
    },

    // ─────────────────────────────────────────────
    // EXTRA SCENARIOS
    // ─────────────────────────────────────────────
    {
        id: 'feat-6',
        category: 'feature',
        title: 'Add Real-time Notifications with WebSocket',
        tags: ['WebSocket', 'React', 'Node.js', 'Real-time'],
        difficulty: 'Advanced',
        badPrompt: `Add real-time notifications to my app.`,
        goodPrompt: `You are a full-stack developer experienced with real-time features.

Add real-time notifications to my app using WebSocket (no Socket.io — use the native WebSocket API).

Stack: React 18 frontend, Node.js/Express backend.

What I need:

Backend (server.js):
- Set up a WebSocket server alongside Express on the same port
- When a new order is created (POST /api/orders), broadcast a notification to all connected clients
- Notification format: { type: 'new_order', orderId, customerName, amount }

Frontend:
- useNotifications hook that connects to ws://localhost:3001
- Auto-reconnect if the connection drops (retry after 3 seconds)
- Returns { notifications } — a list of the last 10 notifications
- NotificationBell.jsx — shows a bell icon with an unread count badge
- NotificationDropdown.jsx — lists recent notifications, has "Mark all read" button

One file at a time please, starting with the backend.`,
        explanation: 'Specifies native WebSocket (not Socket.io), defines the exact notification data shape, lists reconnect behavior, and requests files one at a time to avoid overwhelming output.',
    },
    {
        id: 'feat-7',
        category: 'feature',
        title: 'Build a CSV Export Feature',
        tags: ['CSV', 'React', 'Download', 'Data Export'],
        difficulty: 'Beginner',
        badPrompt: `Export my data to CSV.`,
        goodPrompt: `You are a React developer.

Add a "Export to CSV" button to my data table. When clicked, it should download the table data as a .csv file.

Current setup:
- I have a table showing user data: [ { id, name, email, role, createdAt } ]
- The data is already in a users array in state

Requirements:
1. Convert the users array to CSV format (header row + data rows)
2. Handle special characters — wrap values in quotes if they contain commas or newlines
3. Format the createdAt date as YYYY-MM-DD (not the raw ISO string)
4. Download it as users-export-2024-01-15.csv (today's date in the filename)
5. No libraries — use the Blob + createObjectURL browser API

Create:
- exportToCSV(data, filename) — a reusable utility function
- Add an Export button to the existing Table component

Show the utility function first, then the button integration.`,
        explanation: 'Defines the data shape, handles edge cases (special characters, date formatting, filename with date), specifies the browser API to use, and asks to show the utility before integration.',
    },
    {
        id: 'bugfix-extra-1',
        category: 'bugfix',
        title: 'Fix JWT Token Not Persisting on Refresh',
        tags: ['Auth', 'JWT', 'localStorage', 'React'],
        difficulty: 'Intermediate',
        badPrompt: `My login keeps logging me out on refresh.`,
        goodPrompt: `You are a React authentication developer.

After refreshing the page, my users get logged out even though they checked "Remember me". The JWT token is there in localStorage but the app doesn't use it.

My current auth setup:

// AuthContext.jsx
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // always starts as null

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser(decodeToken(token));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

The problem: useState(null) always resets to null on refresh — it never reads the existing localStorage token.

Please:
1. Fix AuthProvider to check localStorage for an existing token on load
2. Handle the case where the stored token is expired (don't restore it)
3. Show where decodeToken should check expiry
4. Keep the same login/logout API so I don't have to change other files`,
        explanation: 'Shows the exact broken code, explains the root cause clearly (useState resets), specifies constraints (same API), and asks to handle the expired token edge case.',
    },
    {
        id: 'refactor-extra-1',
        category: 'refactor',
        title: 'Replace Multiple useState with useReducer',
        tags: ['React', 'useReducer', 'State Management', 'Clean Code'],
        difficulty: 'Intermediate',
        badPrompt: `Clean up my React state.`,
        goodPrompt: `You are a React state management expert.

I have a form with too many useState calls. Help me consolidate them into useReducer.

Current code (messy):

function CheckoutForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ... validation and submit logic ...
}

Please refactor to use useReducer with:
- A single state object: { name, email, address, errors: {}, loading, submitted }
- Actions: UPDATE_FIELD, SET_ERRORS, SET_LOADING, SET_SUBMITTED
- A clean reducer function

Rules:
- Don't change what the form renders — only change the state management
- Show the full reducer + initial state
- Show how to update a field: dispatch({ type: 'UPDATE_FIELD', field: 'name', value: 'John' })`,
        explanation: 'Shows the exact messy state, defines the target state shape and action names, and sets a clear rule (no UI changes) — making the refactor scope crystal clear.',
    },
];

export const getPromptsByCategory = (categoryId) => {
    if (categoryId === 'all') return promptTemplates;
    return promptTemplates.filter(t => t.category === categoryId);
};

export const getPromptById = (id) => promptTemplates.find(t => t.id === id);
