import React, { useState } from 'react';
import { categories, getPromptsByCategory } from '../data/promptTemplates';
import PromptCard from './PromptCard';
import './ExamplesSection.css';

export default function ExamplesSection() {
    const [activeCategory, setActiveCategory] = useState('all');
    const prompts = getPromptsByCategory(activeCategory);

    return (
        <section className="section" id="examples">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">📚 Learn by Example</span>
                    <h2 className="section-title">
                        See the <span className="gradient-text">Difference</span>
                    </h2>
                    <p className="section-subtitle">
                        Browse real examples comparing weak prompts vs. highly effective ones,
                        with explanations of why each technique works.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="category-tabs">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`cat-tab ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.label.replace(/^.{1,3}\s/, '')}</span>
                        </button>
                    ))}
                </div>

                {/* Prompt Cards Grid */}
                <div className="prompts-grid">
                    {prompts.map((prompt, i) => (
                        <PromptCard key={prompt.id} prompt={prompt} index={i} />
                    ))}
                </div>

                {prompts.length === 0 && (
                    <div className="empty-state">
                        <span>🔍</span>
                        <p>No examples for this category yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
