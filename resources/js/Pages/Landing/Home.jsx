// components/sections/Home.jsx
import React from 'react';
import { Sparkles, ArrowRight, Zap, Shield, TrendingUp, Package, Users, Crown } from 'lucide-react';

const Home = () => {
  return (
    <section className="relative min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Vibrant gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 -z-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500" />
      
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border-2 border-purple-200 shadow-lg px-5 py-2.5 rounded-full">
              <Zap className="h-5 w-5 text-purple-600 fill-purple-200" />
              <span className="bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent font-bold text-sm tracking-wide">
                AI-POWERED INVENTORY INTELLIGENCE
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 leading-tight tracking-tighter">
              StockFlow{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                IMS
              </span>
            </h1>
            
            <p className="text-xl text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              The <span className="text-purple-600 font-bold">colorful way</span> to manage inventory — track stock, automate purchases, process sales, and watch your business bloom.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a 
                href="/login" 
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
              >
                Start Free Trial <Sparkles className="h-5 w-5 group-hover:rotate-12 transition" />
              </a>
              <button className="px-8 py-4 bg-white border-2 border-purple-300 text-gray-800 rounded-2xl font-bold text-lg hover:bg-purple-50 hover:border-purple-500 transition-all duration-300 flex items-center justify-center gap-2">
                Watch Demo <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-6">
              <div className="flex -space-x-3">
                {['bg-gradient-to-r from-purple-400 to-pink-500', 'bg-gradient-to-r from-pink-400 to-orange-500', 'bg-gradient-to-r from-orange-400 to-yellow-500', 'bg-gradient-to-r from-yellow-400 to-green-500'].map((grad, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full ${grad} border-3 border-white shadow-md`} />
                ))}
              </div>
              <div className="text-base text-gray-700 font-semibold">
                Trusted by <span className="text-purple-700 text-xl font-black">15,000+</span> happy businesses
              </div>
            </div>
          </div>

          {/* Right Side - Colorful Dashboard Card */}
          <div className="flex-1 relative w-full max-w-md mx-auto lg:mx-0">
            <div className="relative rounded-3xl shadow-2xl overflow-hidden border-2 border-white/50 bg-gradient-to-br from-white to-purple-50/80 backdrop-blur-sm">
              {/* Chrome dots */}
              <div className="bg-gradient-to-r from-gray-100 to-white px-5 py-3 border-b border-purple-100 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow" />
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow" />
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow" />
                </div>
                <div className="ml-4 text-xs font-mono text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">dashboard.stockflow.com</div>
                <div className="ml-auto flex gap-3 text-purple-400">
                  <i className="fas fa-search"></i>
                  <i className="far fa-bell"></i>
                </div>
              </div>
              
              <div className="p-5">
                {/* Stats Grid - Colorful */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-3 rounded-xl border border-purple-200">
                    <Package className="h-5 w-5 text-purple-700 mb-1" />
                    <p className="text-xs text-purple-700 font-bold">Total SKUs</p>
                    <p className="text-2xl font-black text-gray-800">2,847</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-3 rounded-xl border border-pink-200">
                    <TrendingUp className="h-5 w-5 text-pink-700 mb-1" />
                    <p className="text-xs text-pink-700 font-bold">Revenue</p>
                    <p className="text-2xl font-black text-gray-800">$64.2K</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-3 rounded-xl border border-orange-200">
                    <Users className="h-5 w-5 text-orange-700 mb-1" />
                    <p className="text-xs text-orange-700 font-bold">Customers</p>
                    <p className="text-2xl font-black text-gray-800">1,247</p>
                  </div>
                </div>
                
                {/* Stock Level Bar */}
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-3 mb-3 border border-gray-100">
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-gray-700">📊 Stock Health</span>
                    <span className="text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full text-xs">+18% vs last month</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-[76%] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full" />
                  </div>
                </div>
                
                {/* Bottom Row */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                    <Shield className="h-3 w-3 text-green-600" />
                    <span className="text-green-700 font-semibold">Live sync</span>
                  </div>
                  <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                    <Crown className="h-3 w-3 text-blue-600" />
                    <span className="text-blue-700 font-semibold">Pro plan active</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating colorful badge */}
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full py-2 px-5 shadow-xl flex items-center gap-2 animate-bounce">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-white font-bold text-sm">🔥 30% OFF first month</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;