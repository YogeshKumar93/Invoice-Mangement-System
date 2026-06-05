// components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, LogIn, Zap } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-purple-100' 
        : 'bg-white/70 backdrop-blur-md border-b border-purple-100/50'
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo - Colorful Gradient */}
          <a href="#home" className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-xl p-1.5">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="font-black text-xl md:text-2xl bg-gradient-to-r from-purple-700 via-pink-700 to-orange-600 bg-clip-text text-transparent">
              StockFlow
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-gray-700 font-semibold hover:text-purple-700 transition-all duration-300 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <a
              href="/login"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-md"
            >
              <LogIn className="h-4 w-4" />
              Login
            </a>
          </div>

          {/* Mobile menu button - Colorful */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="relative w-10 h-10 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 flex items-center justify-center hover:shadow-md transition-all"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Colorful Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-5 space-y-2 animate-in slide-in-from-top-2 duration-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="/login"
              className="block px-4 py-3 mt-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-xl font-bold text-center shadow-md hover:shadow-lg transition-all"
              onClick={() => setIsOpen(false)}
            >
              Login
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;