import React from 'react';
import './TipsSection.css';

const tips = [
    {
        icon: '🎭',
        title: 'Always Assign a Role',
        description: 'Start with "Act as a senior [technology] developer". This anchors the AI\'s perspective and dramatically improves response quality.',
        example: '"Act as a React performance expert..."',
        color: '#6366f1',
    },
    {
        icon: '📦',
        title: 'Provide Full Context',
        description: 'Tell the AI your tech stack, framework version, existing patterns, and project constraints. Never assume it knows your setup.',
        example: '"Stack: React 18, TypeScript 5, Zustand..."',
        color: '#8b5cf6',
    },
    {
        icon: '🎯',
        title: 'Be Specific, Not Vague',
        description: '"Fix my bug" vs "Fix the cart total calculation that deducts discounts multiple times" — specificity yields solutions.',
        example: '"The bug occurs when qty > 1 and a 20% discount is applied..."',
        color: '#06b6d4',
    },
    {
        icon: '⚙️',
        title: 'Define Your Constraints',
        description: 'Specify what NOT to do. "No external libraries", "maintain the public API", "don\'t refactor unrelated code" prevents over-engineering.',
        example: '"Do NOT use Lodash. Maintain backward compatibility."',
        color: '#f59e0b',
    },
    {
        icon: '📋',
        title: 'Specify the Output Format',
        description: 'Tell the AI exactly how you want the response structured — separate files, table format, before/after comparison, etc.',
        example: '"Return each file with its name as a header comment."',
        color: '#10b981',
    },
    {
        icon: '🔗',
        title: 'Include Actual Code / Errors',
        description: 'Paste the real error messages and the relevant code. Generic descriptions produce generic solutions.',
        example: '"Error: TypeError: Cannot read \'address\' of undefined at line 23..."',
        color: '#ef4444',
    },
    {
        icon: '🪜',
        title: 'Break Down Complex Tasks',
        description: 'Don\'t ask for an entire authentication system in one prompt. Break it into: schema, endpoints, frontend hook, protected routes.',
        example: '"Step 1: Only implement the login endpoint..."',
        color: '#f97316',
    },
    {
        icon: '🔄',
        title: 'Iterate, Don\'t Restart',
        description: 'Use follow-up prompts to refine. "Now add error handling to that" is more efficient than rewriting the entire prompt.',
        example: '"Good. Now add TypeScript types to all the function signatures."',
        color: '#a855f7',
    },
    {
        icon: '🧠',
        title: 'Ask for the "Why"',
        description: 'Request explanations alongside code. "Explain your reasoning" surfaces potential gotchas and helps you understand tradeoffs.',
        example: '"After the code, explain each optimization and when it helps."',
        color: '#14b8a6',
    },
];

export default function TipsSection() {
    return (
        <section className="section tips-section" id="tips">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">💡 Best Practices</span>
                    <h2 className="section-title">
                        The <span className="gradient-text">Golden Rules</span> of Prompt Engineering
                    </h2>
                    <p className="section-subtitle">
                        Master these principles and you'll consistently get production-quality code from any AI tool.
                    </p>
                </div>

                <div className="tips-grid">
                    {tips.map((tip, i) => (
                        <div
                            key={i}
                            className="tip-card glass-card animate-fade-in-up"
                            style={{ '--tip-color': tip.color, animationDelay: `${i * 0.07}s` }}
                        >
                            <div className="tip-icon-wrap">
                                <span className="tip-icon">{tip.icon}</span>
                            </div>
                            <div className="tip-content">
                                <h3 className="tip-title">{tip.title}</h3>
                                <p className="tip-desc">{tip.description}</p>
                                <div className="tip-example">
                                    <span className="tip-example-label">Example:</span>
                                    <code>{tip.example}</code>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
