import React, { useState } from 'react';
import './PromptCard.css';

const difficultyBadge = {
    Beginner: 'badge-green',
    Intermediate: 'badge-orange',
    Advanced: 'badge-red',
};

const categoryColors = {
    feature: '#6366f1',
    bugfix: '#ef4444',
    refactor: '#f59e0b',
    review: '#10b981',
    api: '#06b6d4',
    testing: '#8b5cf6',
};

export default function PromptCard({ prompt, index }) {
    const [showGood, setShowGood] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(showGood ? prompt.goodPrompt : prompt.badPrompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
        }
    };

    const accentColor = categoryColors[prompt.category] || 'var(--accent-primary)';

    return (
        <div
            className="prompt-card animate-fade-in-up glass-card"
            style={{ animationDelay: `${index * 0.08}s`, '--accent': accentColor }}
        >
            {/* Card Header */}
            <div className="pc-header">
                <div className="pc-meta">
                    <h3 className="pc-title">{prompt.title}</h3>
                    <div className="pc-tags">
                        {prompt.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="badge badge-gray">{tag}</span>
                        ))}
                        <span className={`badge ${difficultyBadge[prompt.difficulty] || 'badge-gray'}`}>
                            {prompt.difficulty}
                        </span>
                    </div>
                </div>
            </div>

            {/* Toggle Bar */}
            <div className="pc-toggle-bar">
                <button
                    className={`pc-toggle-btn ${!showGood ? 'active bad' : ''}`}
                    onClick={() => setShowGood(false)}
                >
                    ❌ Weak Prompt
                </button>
                <button
                    className={`pc-toggle-btn ${showGood ? 'active good' : ''}`}
                    onClick={() => setShowGood(true)}
                >
                    ✅ Effective Prompt
                </button>
            </div>

            {/* Prompt Content */}
            <div className={`pc-prompt-box ${showGood ? 'good' : 'bad'}`}>
                <div className="pc-prompt-label">
                    {showGood ? '✅ What you SHOULD write:' : '❌ What most devs write:'}
                </div>
                <pre className="pc-prompt-text">{showGood ? prompt.goodPrompt : prompt.badPrompt}</pre>
            </div>

            {/* Explanation (only when showing good) */}
            {showGood && (
                <div className="pc-explanation animate-fade-in">
                    <span className="pc-explanation-icon">💡</span>
                    <p>{prompt.explanation}</p>
                </div>
            )}

            {/* Actions */}
            <div className="pc-actions">
                <button className={`pc-copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                    {copied ? '✅ Copied!' : '📋 Copy Prompt'}
                </button>
                {!showGood && (
                    <button className="pc-reveal-btn" onClick={() => setShowGood(true)}>
                        See Effective Version →
                    </button>
                )}
            </div>
        </div>
    );
}
