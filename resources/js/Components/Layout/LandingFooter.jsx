// components/layout/Footer.jsx
import React from 'react';
import { Boxes } from 'lucide-react';

const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <Boxes className="h-6 w-6 text-blue-400" />
            <span className="font-bold text-xl text-white">StockFlow</span>
          </div>
          <div className="flex gap-8">
            <a href="#home" className="hover:text-white transition">Home</a>
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#benefits" className="hover:text-white transition">Benefits</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
          </div>
          <div className="text-sm">
            © 2025 StockFlow IMS. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;