import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    const links = [
        { label: 'Examples', id: 'examples' },
        { label: 'Generator', id: 'generator' },
        { label: 'Tips', id: 'tips' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-logo" onClick={() => scrollTo('hero')}>
                    <span className="logo-icon">⚡</span>
                    <span className="logo-text">
                        Prompt<span className="logo-accent">Craft</span>
                    </span>
                </div>

                <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    {links.map(l => (
                        <button key={l.id} className="nav-link" onClick={() => scrollTo(l.id)}>
                            {l.label}
                        </button>
                    ))}
                    <button className="btn-primary nav-cta" onClick={() => scrollTo('generator')}>
                        Generate Prompt
                    </button>
                </div>

                <button
                    className={`hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label="Toggle navigation"
                >
                    <span /><span /><span />
                </button>
            </div>
        </nav>
    );
}
