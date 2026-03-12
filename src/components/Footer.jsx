import React from 'react';
import './Footer.css';

export default function Footer() {
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <footer className="footer">
            <div className="container footer-inner">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <span>⚡</span>
                        <span>Prompt<strong>Craft</strong></span>
                    </div>
                    <p>Help developers write better AI prompts for coding tasks — faster iteration, better output, more learning.</p>
                </div>

                <div className="footer-links">
                    <div className="footer-link-group">
                        <span className="footer-link-heading">Navigate</span>
                        <button onClick={() => scrollTo('examples')}>Examples</button>
                        <button onClick={() => scrollTo('generator')}>Generator</button>
                        <button onClick={() => scrollTo('tips')}>Tips</button>
                    </div>
                    <div className="footer-link-group">
                        <span className="footer-link-heading">AI Tools</span>
                        <a href="https://claude.ai" target="_blank" rel="noreferrer">Claude</a>
                        <a href="https://chat.openai.com" target="_blank" rel="noreferrer">ChatGPT</a>
                        <a href="https://cursor.sh" target="_blank" rel="noreferrer">Cursor</a>
                        <a href="https://github.com/features/copilot" target="_blank" rel="noreferrer">GitHub Copilot</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <span>Built to help developers prompt smarter, ship faster.</span>
            </div>
        </footer>
    );
}
