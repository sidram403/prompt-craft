// ============================================================
//  PROMPT GENERATOR — Rule-based local engine
//  Generates context-aware prompts from user input
// ============================================================

// ─── Frameworks / Technologies ───────────────────────────────
export const frameworks = [
    { id: 'react', label: 'React', icon: '⚛️' },
    { id: 'nextjs', label: 'Next.js', icon: '▲' },
    { id: 'vue', label: 'Vue.js', icon: '💚' },
    { id: 'angular', label: 'Angular', icon: '🔺' },
    { id: 'nodejs', label: 'Node.js', icon: '🟩' },
    { id: 'express', label: 'Express.js', icon: '🚂' },
    { id: 'python', label: 'Python', icon: '🐍' },
    { id: 'django', label: 'Django', icon: '🎸' },
    { id: 'fastapi', label: 'FastAPI', icon: '⚡' },
    { id: 'typescript', label: 'TypeScript', icon: '🔷' },
    { id: 'javascript', label: 'JavaScript', icon: '🟡' },
    { id: 'general', label: 'General / Other', icon: '🛠️' },
];

// ─── Task Types ───────────────────────────────────────────────
export const taskTypes = [
    { id: 'add_feature', label: 'Add a Feature', icon: '🚀', color: '#6366f1' },
    { id: 'fix_bug', label: 'Fix a Bug', icon: '🐛', color: '#ef4444' },
    { id: 'refactor', label: 'Refactor Code', icon: '🔧', color: '#f59e0b' },
    { id: 'code_review', label: 'Code Review', icon: '🔍', color: '#10b981' },
    { id: 'add_tests', label: 'Write Tests', icon: '🧪', color: '#8b5cf6' },
    { id: 'api_integration', label: 'API Integration', icon: '🌐', color: '#06b6d4' },
    { id: 'performance', label: 'Optimize Performance', icon: '⚡', color: '#f97316' },
    { id: 'security', label: 'Security Audit', icon: '🔒', color: '#dc2626' },
];

// ─── Role mapping per task ────────────────────────────────────
const roleMap = {
    add_feature: 'senior software engineer specializing in building scalable features',
    fix_bug: 'expert debugging engineer with deep knowledge of runtime behavior',
    refactor: 'clean code advocate and software architect focused on maintainability',
    code_review: 'senior software engineer performing a thorough pull request review',
    add_tests: 'test-driven development expert who writes comprehensive test suites',
    api_integration: 'backend integration specialist experienced in reliable API consumption',
    performance: 'performance engineering expert skilled in profiling and optimization',
    security: 'senior application security engineer familiar with OWASP Top 10',
};

// ─── Framework context injection ──────────────────────────────
const frameworkContext = {
    react: 'React 18 with functional components and hooks (no class components)',
    nextjs: 'Next.js 14 (App Router) with React Server Components where applicable',
    vue: 'Vue 3 with Composition API and <script setup> syntax',
    angular: 'Angular 17+ with standalone components and signals',
    nodejs: 'Node.js 20 LTS with ES Modules (import/export syntax)',
    express: 'Node.js 20 with Express 4, using async/await middleware pattern',
    python: 'Python 3.11+ with type hints and dataclasses',
    django: 'Django 4.2 with Django REST Framework for API endpoints',
    fastapi: 'FastAPI 0.100+ with Pydantic v2 for data validation and async routes',
    typescript: 'TypeScript 5.0 (strict mode enabled)',
    javascript: 'Modern JavaScript (ES2022+, no transpiler assumptions)',
    general: 'the existing project stack (describe it in your context below)',
};

// ─── Constraint templates per task ───────────────────────────
const constraintTemplates = {
    add_feature: [
        'Follow existing code patterns in the project',
        'Include proper error handling and loading states',
        'Consider edge cases: empty states, null values, network failures',
        'Write self-documenting code with clear variable names',
    ],
    fix_bug: [
        'Explain the ROOT CAUSE before providing the fix',
        'Provide the minimal change required — avoid unrelated refactoring',
        'Verify the fix does not break adjacent functionality',
        'Add a comment in code explaining why the fix was necessary',
    ],
    refactor: [
        'Preserve existing behavior — this is not the time to add new features',
        'Maintain backward compatibility with existing callers',
        'Provide a before/after comparison highlighting what changed and why',
        'Run the existing tests to verify nothing breaks',
    ],
    code_review: [
        'Focus on bugs, security, and performance — not style or formatting',
        'Rate each issue: Critical / High / Medium / Low',
        'Provide the corrected code after the review',
        'Include positive feedback on parts done well',
    ],
    add_tests: [
        'Cover happy path, edge cases, and error scenarios',
        'Tests should be isolated and independent of each other',
        'Use descriptive test names that read like requirements',
        'Mock external dependencies (APIs, databases) — test logic in isolation',
    ],
    api_integration: [
        'Handle all error states: network failure, 4xx, 5xx, timeout',
        'Cancel in-flight requests when component unmounts (AbortController)',
        'Do not store sensitive tokens in localStorage (prefer httpOnly cookies)',
        'Include retry logic for transient failures (503, network errors)',
    ],
    performance: [
        'Profile before optimizing — identify the actual bottleneck first',
        'Explain the complexity (Big O) improvement for each change',
        'Do not sacrifice readability for micro-optimizations',
        'Provide before/after metrics or a way to measure the improvement',
    ],
    security: [
        'Check against OWASP Top 10',
        'Never trust user input — validate and sanitize everything',
        'Use parameterized queries, never string interpolation in SQL',
        'Return generic error messages to clients (never expose internals)',
    ],
};

// ─── Output format templates per task ────────────────────────
const outputFormatTemplates = {
    add_feature: `**Output format:**
- Clearly separate each file with its filename as a header
- Include a brief "How it works" note above the code
- Add a usage example at the bottom`,
    fix_bug: `**Output format:**
1. Root Cause Analysis (2-3 sentences)
2. The Fix (minimal code change, clearly marked)
3. Explanation of why this fix works
4. (Optional) How to prevent this class of bug in the future`,
    refactor: `**Output format:**
- Show the BEFORE code (quoted/marked)
- Show the AFTER code
- Bullet list of changes made and the reason for each`,
    code_review: `**Output format:**
For each issue: | Issue | Severity | Line | Explanation | Fix |
End with the fully corrected version of the code.`,
    add_tests: `**Output format:**
- Complete test file with all imports and setup
- Group tests in \`describe\` blocks by feature area
- Each \`it()\` description should read as a requirement statement`,
    api_integration: `**Output format:**
- Separate code blocks for each file (client setup, hook/service, component usage)
- Include TypeScript types for all response shapes
- Add comments on error handling strategy`,
    performance: `**Output format:**
- Problem diagnosis (what was slow and why)
- Optimized code with comments explaining each change
- How to verify the improvement (what to measure)`,
    security: `**Output format:**
| Severity | Vulnerability | Location | Impact | Fix |
After the table: the fully corrected code with comments on each security change.`,
};

// ─── Main generator function ──────────────────────────────────
export function generatePrompt({
    taskType,
    framework,
    description,
    codeSnippet,
    errorMessage,
    additionalContext,
    wantTests,
    wantExplanation,
}) {
    const role = roleMap[taskType] || 'senior software engineer';
    const fwContext = frameworkContext[framework] || frameworkContext['general'];
    const constraints = constraintTemplates[taskType] || [];
    const outputFormat = outputFormatTemplates[taskType] || '';
    const taskLabel = taskTypes.find(t => t.id === taskType)?.label || taskType;

    let prompt = `Act as a ${role}.\n\n`;

    // ── Task description ──
    prompt += `**Task:** ${taskLabel}\n\n`;

    // ── Tech context ──
    prompt += `**Technology Context:**\n- Stack: ${fwContext}\n`;

    if (additionalContext?.trim()) {
        prompt += `- Project context: ${additionalContext.trim()}\n`;
    }
    prompt += '\n';

    // ── What to do ──
    prompt += `**Description of what I need:**\n${description.trim()}\n\n`;

    // ── Error message (for bug fixing) ──
    if (errorMessage?.trim()) {
        prompt += `**Error message / symptom:**\n\`\`\`\n${errorMessage.trim()}\n\`\`\`\n\n`;
    }

    // ── Code snippet ──
    if (codeSnippet?.trim()) {
        prompt += `**Existing code / code to work with:**\n\`\`\`\n${codeSnippet.trim()}\n\`\`\`\n\n`;
    }

    // ── Constraints ──
    if (constraints.length > 0) {
        prompt += `**Constraints & Requirements:**\n`;
        constraints.forEach(c => { prompt += `- ${c}\n`; });
        prompt += '\n';
    }

    // ── Add tests flag ──
    if (wantTests && taskType !== 'add_tests') {
        prompt += `**Additional requirement:** After delivering the solution, also write unit tests covering the happy path, edge cases, and error scenarios.\n\n`;
    }

    // ── Explanation flag ──
    if (wantExplanation) {
        prompt += `**Learning goal:** After the code, provide a concise explanation of the key concepts and decisions made — I want to understand the "why", not just the "what".\n\n`;
    }

    // ── Output format ──
    if (outputFormat) {
        prompt += outputFormat + '\n';
    }

    return prompt.trim();
}

// ─── Quality tips shown alongside generated prompt ────────────
export const qualityTips = [
    { icon: '🎭', label: 'Role Assigned', desc: 'AI is given a specific expert role' },
    { icon: '📦', label: 'Context Provided', desc: 'Framework and project context included' },
    { icon: '🎯', label: 'Task Scoped', desc: 'Clear description of what needs to be done' },
    { icon: '⚙️', label: 'Constraints Defined', desc: 'Boundaries and requirements specified' },
    { icon: '📋', label: 'Output Formatted', desc: 'Output structure explicitly defined' },
];
