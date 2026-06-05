// App.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Users, 
  Truck, 
  TrendingUp, 
  BarChart3, 
  ShieldCheck, 
  Menu, 
  X,
  ArrowRight,
  Star,
  LogIn,
  Calendar,
  Search,
  Bell,
  Home,
  Settings,
  Zap,
  Clock,
  Database,
  Lock,
  LayoutDashboard,
  LineChart,
  Wallet,
  Boxes
} from 'lucide-react';

// Sticky Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Boxes className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">StockFlow</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 hover:text-gray-900 transition">Home</a>
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition">Features</a>
            <a href="#benefits" className="text-gray-600 hover:text-gray-900 transition">Benefits</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition">Contact</a>
            <a href="/login" className="ml-4 px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm">
              Login
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <a href="#home" className="block text-gray-600 hover:text-gray-900 py-2">Home</a>
            <a href="#features" className="block text-gray-600 hover:text-gray-900 py-2">Features</a>
            <a href="#benefits" className="block text-gray-600 hover:text-gray-900 py-2">Benefits</a>
            <a href="#contact" className="block text-gray-600 hover:text-gray-900 py-2">Contact</a>
            <a href="/login" className="block px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-center">Login</a>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const Hero = () => {
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Smart Inventory Management for{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Modern Businesses
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Manage stock, purchases, sales, suppliers, reports, and business operations from one powerful platform.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                Login <LogIn className="h-4 w-4" />
              </a>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2">
                Request Demo <ArrowRight className="h-4 w-4" />
              </button>
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
                  <h3 className="font-semibold text-gray-800">Inventory Overview</h3>
                  <div className="flex gap-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Bell className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500">Total Items</p>
                    <p className="text-lg font-bold text-gray-800">1,284</p>
                  </div>
                  <div className="bg-green-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500">Low Stock</p>
                    <p className="text-lg font-bold text-red-500">23</p>
                  </div>
                  <div className="bg-purple-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500">Value</p>
                    <p className="text-lg font-bold text-gray-800">$48.2K</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Stock Levels</span>
                    <span className="text-blue-600">+12%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-blue-500 rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  {['Wireless Mouse', 'Mechanical Keyboard', 'USB-C Hub'].map((item) => (
                    <div key={item} className="flex justify-between text-sm">
                      <span>{item}</span>
                      <span className="text-gray-500">142 units</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full px-4 py-2 shadow-lg text-sm font-medium text-blue-600 border border-gray-100">
              Real-time Sync
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 hover:-translate-y-1">
    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition">
      <Icon className="h-6 w-6 text-blue-600" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{description}</p>
  </div>
);

// Features Section
const Features = () => {
  const features = [
    { icon: Package, title: "Inventory Tracking", description: "Real-time stock levels with automated reorder alerts and batch tracking." },
    { icon: ShoppingCart, title: "Purchase Management", description: "Streamline procurement with purchase orders and vendor management." },
    { icon: DollarSign, title: "Sales Management", description: "Track orders, invoices, and revenue across multiple channels." },
    { icon: Users, title: "Customer Management", description: "Centralized customer profiles with purchase history and analytics." },
    { icon: Truck, title: "Supplier Management", description: "Manage supplier relationships, contracts, and performance metrics." },
    { icon: TrendingUp, title: "Expense Tracking", description: "Monitor operational costs and optimize spending patterns." },
    { icon: BarChart3, title: "Reports & Analytics", description: "Customizable dashboards with actionable business insights." },
    { icon: ShieldCheck, title: "User Role Management", description: "Granular access controls for team members and departments." }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Everything you need to manage inventory</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Powerful features designed to streamline your entire supply chain operation</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Benefit Section with alternating layout
const Benefits = () => {
  const benefits = [
    {
      title: "Real-Time Stock Updates",
      description: "Never run out of stock or overstock again. Get instant notifications when inventory levels hit your thresholds.",
      image: "/api/placeholder/500/300",
      icon: Zap,
      reversed: false
    },
    {
      title: "Faster Business Operations",
      description: "Automate manual processes from order fulfillment to restocking. Save up to 20 hours per week on inventory tasks.",
      image: "/api/placeholder/500/300",
      icon: Clock,
      reversed: true
    },
    {
      title: "Accurate Reporting",
      description: "Make data-driven decisions with precise inventory valuation, sales forecasts, and trend analysis.",
      image: "/api/placeholder/500/300",
      icon: Database,
      reversed: false
    },
    {
      title: "Secure Data Management",
      description: "Enterprise-grade encryption with automated backups and compliance for financial data.",
      image: "/api/placeholder/500/300",
      icon: Lock,
      reversed: true
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why choose StockFlow IMS?</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Enterprise-grade features that give you complete control over your inventory</p>
        </div>
        <div className="space-y-16">
          {benefits.map((benefit, idx) => (
            <div key={idx} className={`flex flex-col ${benefit.reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
              <div className="flex-1">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-lg">{benefit.description}</p>
              </div>
              <div className="flex-1">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 shadow-lg border border-gray-100">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between mb-4">
                      <span className="font-semibold">Stock Alert</span>
                      <span className="text-xs text-red-500">Critical</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Product X</span>
                        <span>3 left</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full">
                        <div className="h-full w-1/4 bg-red-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Dashboard Preview
const DashboardPreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Powerful Dashboard at Your Fingertips</h2>
          <p className="mt-4 text-gray-600">Real-time insights into every aspect of your business</p>
        </div>
        <div className="relative">
          {/* Glassmorphism effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-2xl" />
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className="ml-4 text-gray-400 text-sm">dashboard.stockflow.com/analytics</div>
            </div>
            <div className="p-6 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Area */}
                <div className="lg:col-span-2 bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold">Revenue Summary</h4>
                    <LineChart className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="h-48 flex items-end gap-2">
                    {[45, 68, 52, 87, 71, 94, 83].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600" style={{ height: `${height}px` }} />
                        <span className="text-xs text-gray-500">{['M','T','W','T','F','S','S'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Recent Transactions */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-3">Recent Transactions</h4>
                  <div className="space-y-3">
                    {['PO-1243 - $1,240', 'INV-892 - $560', 'PO-1245 - $3,200'].map((tx, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span>{tx.split(' - ')[0]}</span>
                        <span className="font-medium">{tx.split(' - ')[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Inventory Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <p className="text-sm text-gray-500">Total Value</p>
                  <p className="text-xl font-bold">$128.4K</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <p className="text-sm text-gray-500">Turnover Rate</p>
                  <p className="text-xl font-bold">4.2x</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-3 text-center">
                  <p className="text-sm text-gray-500">Orders</p>
                  <p className="text-xl font-bold">342</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Animated Counter
const AnimatedCounter = ({ end, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-gray-900">
        {count}{suffix}
      </div>
      <p className="text-gray-500 mt-2">{label}</p>
    </div>
  );
};

// Statistics Section
const Statistics = () => {
  const stats = [
    { end: 10000, suffix: '+', label: 'Transactions Processed' },
    { end: 500, suffix: '+', label: 'Products Managed' },
    { end: 100, suffix: '+', label: 'Businesses' },
    { end: 999, suffix: '.9%', label: 'Uptime' }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <AnimatedCounter key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials
const Testimonials = () => {
  const testimonials = [
    { name: "Sarah Chen", role: "Operations Director", company: "TechSupply Co", text: "StockFlow reduced our stockouts by 78% in just 3 months. The real-time alerts are game-changing.", rating: 5 },
    { name: "Michael Rodriguez", role: "CEO", company: "Urban Retail Group", text: "Finally an IMS that actually works. Saved us countless hours on manual inventory reconciliation.", rating: 5 },
    { name: "Priya Patel", role: "Supply Chain Manager", company: "Global Logistics", text: "The reporting features are incredibly powerful. We've optimized our entire procurement process.", rating: 5 }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Trusted by Industry Leaders</h2>
          <p className="mt-4 text-gray-600">See what our customers are saying about StockFlow</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-600 mb-4">"{t.text}"</p>
              <div>
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}, {t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTA = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ready to Simplify Your Inventory Management?</h2>
        <p className="mt-4 text-gray-600 text-lg">Join thousands of businesses that have streamlined their operations with StockFlow</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/login" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg">Login Now</a>
          <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition">Contact Us</button>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
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

// Main App Component
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <DashboardPreview />
      <Statistics />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;