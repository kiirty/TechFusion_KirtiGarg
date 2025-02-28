
import React, { useState, useEffect } from 'react';
import { Leaf, Upload, MessageSquare, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12",
        scrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-soft" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-semibold text-xl">CropGuard</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('detection')}
            className="flex items-center space-x-2 animated-underline"
          >
            <Upload className="h-4 w-4" />
            <span>Detection</span>
          </button>
          <button 
            onClick={() => scrollToSection('prediction')}
            className="flex items-center space-x-2 animated-underline"
          >
            <svg 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Prediction</span>
          </button>
          <button 
            onClick={() => scrollToSection('chat')}
            className="flex items-center space-x-2 animated-underline"
          >
            <MessageSquare className="h-4 w-4" />
            <span>AI Assist</span>
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background animate-fade-in">
          <nav className="flex flex-col items-center space-y-6 pt-10">
            <button 
              onClick={() => scrollToSection('detection')}
              className="flex items-center space-x-2 text-lg"
            >
              <Upload className="h-5 w-5" />
              <span>Detection</span>
            </button>
            <button 
              onClick={() => scrollToSection('prediction')}
              className="flex items-center space-x-2 text-lg"
            >
              <svg 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Prediction</span>
            </button>
            <button 
              onClick={() => scrollToSection('chat')}
              className="flex items-center space-x-2 text-lg"
            >
              <MessageSquare className="h-5 w-5" />
              <span>AI Assist</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
