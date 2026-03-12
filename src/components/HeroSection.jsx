import React from 'react';
import './HeroSection.css';

const stats = [
    { value: '8', label: 'Task Categories' },
    { value: '14+', label: 'Curated Examples' },
    { value: '12', label: 'Tech Stacks' },
];

export default function HeroSection() {
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section className="hero-section" id="hero">
            {/* Background orbs */}
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
            <div className="hero-orb hero-orb-3" />
            <div className="hero-grid" />

            <div className="container hero-content">
                <div className="hero-badge animate-fade-in-up">
                    <span className="hero-badge-dot" />
                    Built for Developers who use AI tools
                </div>

                <h1 className="hero-title animate-fade-in-up delay-1">
                    Stop writing <span className="gradient-text">weak prompts</span>.<br />
                    Start getting <span className="gradient-text">real results</span>.
                </h1>

                <p className="hero-subtitle animate-fade-in-up delay-2">
                    Learn how to write highly effective AI prompts for code — whether you're adding features,
                    fixing bugs, refactoring, or reviewing code. Generate ready-to-use prompts instantly.
                </p>

                <div className="hero-actions animate-fade-in-up delay-3">
                    <button className="btn-primary hero-cta-primary" onClick={() => scrollTo('generator')}>
                        🚀 Generate My Prompt
                    </button>
                    <button className="btn-secondary" onClick={() => scrollTo('examples')}>
                        📚 Browse Examples
                    </button>
                </div>

                <div className="hero-stats animate-fade-in-up delay-4">
                    {stats.map((s, i) => (
                        <div className="hero-stat" key={i}>
                            <span className="hero-stat-value gradient-text">{s.value}</span>
                            <span className="hero-stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* Preview card */}
                <div className="hero-preview animate-fade-in-up delay-4">
                    <div className="preview-header">
                        <span className="preview-dot red" />
                        <span className="preview-dot yellow" />
                        <span className="preview-dot green" />
                        <span className="preview-title">Effective AI Prompt</span>
                    </div>
                    <div className="preview-content">
                        <p className="preview-line"><span className="preview-keyword">Act as</span> a senior React developer specializing in performance.</p>
                        <p className="preview-line"></p>
                        <p className="preview-line"><span className="preview-keyword">Task:</span> Optimize the following component that causes lag on each keystroke...</p>
                        <p className="preview-line"></p>
                        <p className="preview-line"><span className="preview-keyword">Context:</span> React 18, TypeScript, the component renders 500+ items...</p>
                        <p className="preview-line"></p>
                        <p className="preview-line"><span className="preview-keyword">Constraints:</span></p>
                        <p className="preview-line preview-indent">- Explain the root cause before the fix</p>
                        <p className="preview-line preview-indent">- Use useMemo and React.memo appropriately</p>
                        <p className="preview-line preview-indent">- Do not change the component's public API</p>
                        <p className="preview-line preview-blink">▌</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
