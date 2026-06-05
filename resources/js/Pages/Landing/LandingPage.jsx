// pages/LandingPage.jsx
import Navbar from '@/Components/Layout/Navbar';
import React from 'react';
import Home from './Home';
import Features from './Features';
import Benefits from './Benefits';
// import Contact from './Contact';
import LandingFooter from '@/Components/Layout/LandingFooter';


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Home />
        <Features />
        <Benefits />
        {/* <Contact /> */}
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;