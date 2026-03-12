import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import GeneratorSection from './components/GeneratorSection';
import ExamplesSection from './components/ExamplesSection';
import TipsSection from './components/TipsSection';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <GeneratorSection />
        <ExamplesSection />
        <TipsSection />
      </main>
      <Footer />
    </>
  );
}
