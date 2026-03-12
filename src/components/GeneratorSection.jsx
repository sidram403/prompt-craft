import React, { useState } from 'react';
import { taskTypes, frameworks, generatePrompt, qualityTips } from '../data/promptGenerator';
import './GeneratorSection.css';

export default function GeneratorSection() {
    const [taskType, setTaskType] = useState('add_feature');
    const [framework, setFramework] = useState('react');
    const [description, setDescription] = useState('');
    const [codeSnippet, setCodeSnippet] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [additionalContext, setAdditionalContext] = useState('');
    const [wantTests, setWantTests] = useState(false);
    const [wantExplanation, setWantExplanation] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [generated, setGenerated] = useState('');
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [charCount, setCharCount] = useState(0);

    const selectedTask = taskTypes.find(t => t.id === taskType);

    const handleGenerate = () => {
        if (!description.trim()) return;
        setIsGenerating(true);
        setGenerated('');
        // Simulated typing effect
        setTimeout(() => {
            const result = generatePrompt({
                taskType, framework, description, codeSnippet,
                errorMessage, additionalContext, wantTests, wantExplanation
            });
            setGenerated(result);
            setCharCount(result.length);
            setIsGenerating(false);
        }, 700);
    };

    const handleCopy = async () => {
        if (!generated) return;
        try {
            await navigator.clipboard.writeText(generated);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch { }
    };

    const handleClear = () => {
        setGenerated('');
        setDescription('');
        setCodeSnippet('');
        setErrorMessage('');
        setAdditionalContext('');
        setCopied(false);
        setCharCount(0);
    };

    const showError = taskType === 'fix_bug';
    const showCode = ['fix_bug', 'refactor', 'code_review', 'performance', 'security'].includes(taskType);

    return (
        <section className="section gen-section" id="generator">
            <div className="gen-bg-orb" />
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">⚡ Instant Generation</span>
                    <h2 className="section-title">
                        Generate Your <span className="gradient-text">Perfect Prompt</span>
                    </h2>
                    <p className="section-subtitle">
                        Tell us what you need, and we'll craft a structured, effective prompt
                        you can paste directly into any AI coding tool.
                    </p>
                </div>

                <div className="gen-layout">
                    {/* ── Left: Form ── */}
                    <div className="gen-form glass-card">
                        <div className="gen-form-inner">

                            {/* Step 1: Task Type */}
                            <div className="gen-step">
                                <label className="gen-label">
                                    <span className="gen-step-num">1</span>
                                    What do you want to do?
                                </label>
                                <div className="task-type-grid">
                                    {taskTypes.map(t => (
                                        <button
                                            key={t.id}
                                            className={`task-type-btn ${taskType === t.id ? 'active' : ''}`}
                                            style={{ '--task-color': t.color }}
                                            onClick={() => setTaskType(t.id)}
                                        >
                                            <span className="task-icon">{t.icon}</span>
                                            <span className="task-label">{t.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Step 2: Framework */}
                            <div className="gen-step">
                                <label className="gen-label">
                                    <span className="gen-step-num">2</span>
                                    Technology / Framework
                                </label>
                                <select
                                    className="gen-select"
                                    value={framework}
                                    onChange={e => setFramework(e.target.value)}
                                >
                                    {frameworks.map(f => (
                                        <option key={f.id} value={f.id}>{f.icon} {f.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Step 3: Description */}
                            <div className="gen-step">
                                <label className="gen-label">
                                    <span className="gen-step-num">3</span>
                                    Describe what you need
                                    <span className="gen-label-hint">Be specific — the more detail, the better</span>
                                </label>
                                <textarea
                                    className="gen-textarea"
                                    rows={4}
                                    placeholder={getPlaceholder(taskType)}
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>

                            {/* Optional Fields */}
                            {showError && (
                                <div className="gen-step animate-fade-in">
                                    <label className="gen-label">
                                        Error Message / Symptom
                                        <span className="gen-label-hint">Optional but highly recommended</span>
                                    </label>
                                    <textarea
                                        className="gen-textarea gen-textarea-sm"
                                        rows={3}
                                        placeholder="Paste error message or describe the symptom (e.g., 'TypeError: Cannot read properties of undefined...')"
                                        value={errorMessage}
                                        onChange={e => setErrorMessage(e.target.value)}
                                    />
                                </div>
                            )}

                            {showCode && (
                                <div className="gen-step animate-fade-in">
                                    <label className="gen-label">
                                        Code Snippet
                                        <span className="gen-label-hint">Optional — paste relevant code</span>
                                    </label>
                                    <textarea
                                        className="gen-textarea gen-textarea-code"
                                        rows={5}
                                        placeholder="// Paste the relevant code here..."
                                        value={codeSnippet}
                                        onChange={e => setCodeSnippet(e.target.value)}
                                    />
                                </div>
                            )}

                            {/* Advanced Options */}
                            <div className="gen-step">
                                <button
                                    className="gen-advanced-toggle"
                                    onClick={() => setShowAdvanced(o => !o)}
                                >
                                    {showAdvanced ? '▼' : '▶'} Advanced Options
                                </button>

                                {showAdvanced && (
                                    <div className="gen-advanced animate-fade-in">
                                        <div className="gen-step">
                                            <label className="gen-label">Additional Context</label>
                                            <textarea
                                                className="gen-textarea gen-textarea-sm"
                                                rows={2}
                                                placeholder="e.g., 'We use Redux for state, the component renders in a modal, 10k users affected'"
                                                value={additionalContext}
                                                onChange={e => setAdditionalContext(e.target.value)}
                                            />
                                        </div>
                                        <div className="gen-checkboxes">
                                            <label className="gen-checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={wantTests}
                                                    onChange={e => setWantTests(e.target.checked)}
                                                />
                                                <span>Also generate tests for the solution</span>
                                            </label>
                                            <label className="gen-checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={wantExplanation}
                                                    onChange={e => setWantExplanation(e.target.checked)}
                                                />
                                                <span>Request a "why" explanation (learning mode)</span>
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                className="btn-primary gen-generate-btn"
                                onClick={handleGenerate}
                                disabled={!description.trim() || isGenerating}
                            >
                                {isGenerating ? (
                                    <><span className="gen-spinner" /> Crafting prompt...</>
                                ) : (
                                    <><span>{selectedTask?.icon}</span> Generate Prompt</>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* ── Right: Output ── */}
                    <div className="gen-output-area">
                        {!generated && !isGenerating && (
                            <div className="gen-output-empty glass-card">
                                <div className="gen-empty-icon">✨</div>
                                <h3>Your prompt will appear here</h3>
                                <p>Fill in the form and click <strong>Generate Prompt</strong> to get a structured,
                                    effective prompt you can paste into Claude, ChatGPT, Copilot, or Cursor.</p>
                                <div className="gen-features">
                                    {qualityTips.map(tip => (
                                        <div key={tip.label} className="gen-feature-item">
                                            <span>{tip.icon}</span>
                                            <div>
                                                <strong>{tip.label}</strong>
                                                <small>{tip.desc}</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {isGenerating && (
                            <div className="gen-loading glass-card">
                                <div className="gen-loading-bars">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="gen-loading-bar" style={{ animationDelay: `${i * 0.1}s` }} />
                                    ))}
                                </div>
                                <p>Crafting your perfect prompt...</p>
                            </div>
                        )}

                        {generated && !isGenerating && (
                            <div className="gen-output glass-card animate-fade-in">
                                {/* Output Header */}
                                <div className="gen-output-header">
                                    <div className="gen-output-info">
                                        <span className="gen-output-badge">
                                            {selectedTask?.icon} {selectedTask?.label}
                                        </span>
                                        <span className="gen-char-count">{charCount} characters</span>
                                    </div>
                                    <div className="gen-output-actions">
                                        <button className="gen-clear-btn" onClick={handleClear}>Clear</button>
                                        <button
                                            className={`btn-primary gen-copy-btn ${copied ? 'copied' : ''}`}
                                            onClick={handleCopy}
                                        >
                                            {copied ? '✅ Copied!' : '📋 Copy Prompt'}
                                        </button>
                                    </div>
                                </div>

                                {/* Quality Badges */}
                                <div className="gen-quality-badges">
                                    {qualityTips.map(tip => (
                                        <span key={tip.label} className="badge badge-purple">
                                            {tip.icon} {tip.label}
                                        </span>
                                    ))}
                                </div>

                                {/* Generated Prompt */}
                                <pre className="gen-output-text code-block">{generated}</pre>

                                {/* CTA */}
                                <div className="gen-output-cta">
                                    <p>🎯 Copy this prompt and paste it into <strong>Claude</strong>, <strong>ChatGPT</strong>, <strong>Cursor</strong>, or <strong>GitHub Copilot</strong> for best results.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

function getPlaceholder(taskType) {
    const placeholders = {
        add_feature: 'e.g., Add a dark mode toggle that persists the user\'s preference to localStorage and applies the theme across the entire app using CSS variables',
        fix_bug: 'e.g., The shopping cart total shows incorrect amounts when users apply a discount code — it deducts the discount multiple times',
        refactor: 'e.g., The UserDashboard component is 600 lines long and mixes data fetching, business logic, and UI — split it into smaller, focused components',
        code_review: 'e.g., Review this Express API endpoint that handles file uploads — check for security vulnerabilities and performance issues',
        add_tests: 'e.g., Write comprehensive tests for the payment processing module, covering successful payments, failed charges, and network timeouts',
        api_integration: 'e.g., Integrate the Stripe API for one-time payments — implement checkout, success, and failure handling with proper error messages',
        performance: 'e.g., The product listing page takes 3+ seconds to load — it renders 200 items and re-renders on every state change',
        security: 'e.g., Audit this user authentication flow for vulnerabilities — check for SQL injection, XSS, CSRF, and insecure token storage',
    };
    return placeholders[taskType] || 'Describe what you need in detail...';
}
