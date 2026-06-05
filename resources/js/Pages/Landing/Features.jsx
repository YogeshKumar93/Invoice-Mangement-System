// components/sections/Features.jsx
import React from 'react';
import { 
  Package, ShoppingCart, DollarSign, Users, Truck, TrendingUp, BarChart3, 
  Zap, Bell, ClipboardList, RefreshCw, Database, Lock, Clock, 
  FileText, Sparkles, Globe, Headphones, Palette, Gem
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, color, bgGradient }) => {
  const colorMap = {
    purple: 'text-purple-600',
    pink: 'text-pink-600',
    orange: 'text-orange-600',
    yellow: 'text-yellow-600',
    green: 'text-green-600',
    blue: 'text-blue-600',
    indigo: 'text-indigo-600',
    red: 'text-red-600',
    teal: 'text-teal-600',
  };

  return (
    <div className={`group bg-gradient-to-br ${bgGradient} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/30 backdrop-blur-sm`}>
      <div className={`w-14 h-14 bg-white/80 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300 shadow-md`}>
        <Icon className={`h-7 w-7 ${colorMap[color]}`} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    { icon: Package, title: "Smart Inventory", description: "Real-time tracking with AI-powered reorder alerts and batch management.", color: "purple", bgGradient: "from-purple-50 to-purple-100/50" },
    { icon: ShoppingCart, title: "Purchase Orders", description: "Automated PO generation with vendor management and approval flows.", color: "pink", bgGradient: "from-pink-50 to-pink-100/50" },
    { icon: DollarSign, title: "Sales Analytics", description: "Track revenue, bestsellers, and profit margins across channels.", color: "orange", bgGradient: "from-orange-50 to-orange-100/50" },
    { icon: Users, title: "Customer 360°", description: "Purchase history, preferences, and smart segmentation tools.", color: "yellow", bgGradient: "from-yellow-50 to-yellow-100/50" },
    { icon: Truck, title: "Supplier Hub", description: "Contract management, performance metrics, and automated ordering.", color: "green", bgGradient: "from-green-50 to-green-100/50" },
    { icon: TrendingUp, title: "Expense Tracking", description: "Monitor costs, optimize spending, and boost profitability.", color: "blue", bgGradient: "from-blue-50 to-blue-100/50" },
    { icon: BarChart3, title: "Predictive Reports", description: "ML-powered forecasts and actionable business insights.", color: "indigo", bgGradient: "from-indigo-50 to-indigo-100/50" },
    { icon: Lock, title: "Role Security", description: "Granular access controls with 2FA and audit logs.", color: "red", bgGradient: "from-red-50 to-red-100/50" },
    { icon: Zap, title: "Automation Rules", description: "Set workflows for reordering, alerts, and stock updates.", color: "purple", bgGradient: "from-purple-50 to-purple-100/50" },
    { icon: Bell, title: "Smart Alerts", description: "Real-time notifications for low stock and unusual activity.", color: "pink", bgGradient: "from-pink-50 to-pink-100/50" },
    { icon: ClipboardList, title: "Order Tracking", description: "End-to-end visibility from placement to delivery.", color: "orange", bgGradient: "from-orange-50 to-orange-100/50" },
    { icon: RefreshCw, title: "Stock Transfers", description: "Seamless multi-location transfers with history.", color: "teal", bgGradient: "from-teal-50 to-teal-100/50" },
    { icon: Database, title: "Cloud Backup", description: "Automated backups with 90-day restore history.", color: "blue", bgGradient: "from-blue-50 to-blue-100/50" },
    { icon: Globe, title: "Multi-warehouse", description: "Manage unlimited locations from one dashboard.", color: "green", bgGradient: "from-green-50 to-green-100/50" },
    { icon: FileText, title: "Barcode Scanner", description: "Generate & scan barcodes for instant updates.", color: "yellow", bgGradient: "from-yellow-50 to-yellow-100/50" },
    { icon: Headphones, title: "24/7 Support", description: "Priority support with dedicated account manager.", color: "indigo", bgGradient: "from-indigo-50 to-indigo-100/50" },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-purple-50 -z-10" />
      <div className="absolute top-40 -left-20 w-80 h-80 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      <div className="absolute bottom-40 -right-20 w-80 h-80 bg-gradient-to-r from-orange-300 to-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200 px-6 py-2.5 rounded-full shadow-md mb-5">
            <Gem className="h-5 w-5 text-purple-700" />
            <span className="text-purple-800 font-extrabold text-sm uppercase tracking-wide">Colorful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">
            Everything you need in{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              vibrant detail
            </span>
          </h2>
          <p className="mt-5 text-gray-700 text-lg max-w-2xl mx-auto font-medium">
            Packed with powerful tools to streamline your entire supply chain
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { icon: Palette, value: "16+", label: "Core Features", color: "purple" },
            { icon: Globe, value: "70+", label: "Integrations", color: "pink" },
            { icon: Zap, value: "99.99%", label: "Uptime SLA", color: "orange" },
            { icon: Users, value: "15K+", label: "Active Users", color: "green" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 text-center border-2 border-white shadow-lg hover:shadow-xl transition">
              <stat.icon className={`h-8 w-8 mx-auto mb-2 text-${stat.color}-600`} />
              <p className="text-3xl font-black text-gray-800">{stat.value}</p>
              <p className="text-sm font-bold text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto">
            Explore All Features <Sparkles className="h-5 w-5 group-hover:rotate-12 transition" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;