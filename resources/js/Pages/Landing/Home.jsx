// components/sections/Home.jsx
import React from 'react';
import { LogIn, ArrowRight, Search, Bell, Package, TrendingUp, Users, Zap } from 'lucide-react';

const Home = () => {
  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 -z-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
              <Zap className="h-4 w-4 text-blue-600" />
              <span className="text-blue-600 text-sm font-semibold">Smart Inventory Management</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Manage Your Business with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                StockFlow IMS
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
              All-in-one inventory management solution to track stock, manage purchases, process sales, and grow your business.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/login"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Get Started <LogIn className="h-4 w-4" />
              </a>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2">
                Watch Demo <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-8 flex items-center gap-8 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 border-2 border-white" />
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">10,000+</span> businesses trust us
              </div>
            </div>
          </div>

          {/* Right Dashboard Mockup */}
          <div className="flex-1 relative">
            <div className="relative rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-4 text-xs text-gray-500">dashboard.stockflow.com</div>
              </div>
              <div className="p-4 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800">Dashboard Overview</h3>
                  <div className="flex gap-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Bell className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Package className="h-5 w-5 text-blue-600 mb-1" />
                    <p className="text-xs text-gray-500">Total Items</p>
                    <p className="text-xl font-bold text-gray-800">1,284</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600 mb-1" />
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="text-xl font-bold text-gray-800">$48.2K</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600 mb-1" />
                    <p className="text-xs text-gray-500">Customers</p>
                    <p className="text-xl font-bold text-gray-800">342</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Stock Levels</span>
                    <span className="text-blue-600">+12%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-blue-500 rounded-full" />
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-400 text-center">
                  Last updated: Just now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;