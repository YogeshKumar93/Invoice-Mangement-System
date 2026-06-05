// components/sections/Features.jsx
import React from 'react';
import { 
  Package, ShoppingCart, DollarSign, Users, Truck, 
  TrendingUp, BarChart3, ShieldCheck, Zap, Clock,
  Database, Lock, Bell, FileText, ClipboardList, RefreshCw
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, color }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
    indigo: 'bg-indigo-50 text-indigo-600',
  };

  return (
    <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 hover:-translate-y-1">
      <div className={`w-12 h-12 ${colors[color]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    { icon: Package, title: "Inventory Tracking", description: "Real-time stock levels with automated reorder alerts and batch tracking across multiple warehouses.", color: "blue" },
    { icon: ShoppingCart, title: "Purchase Management", description: "Streamline procurement with purchase orders, vendor management, and automated PO generation.", color: "green" },
    { icon: DollarSign, title: "Sales Management", description: "Track orders, generate invoices, and manage revenue across multiple sales channels.", color: "purple" },
    { icon: Users, title: "Customer Management", description: "Centralized customer profiles with purchase history, preferences, and analytics.", color: "orange" },
    { icon: Truck, title: "Supplier Management", description: "Manage supplier relationships, contracts, performance metrics, and communication.", color: "indigo" },
    { icon: TrendingUp, title: "Expense Tracking", description: "Monitor operational costs, track expenses, and optimize spending patterns.", color: "red" },
    { icon: BarChart3, title: "Reports & Analytics", description: "Customizable dashboards with actionable business insights and forecasting.", color: "blue" },
    { icon: ShieldCheck, title: "User Role Management", description: "Granular access controls for team members with custom permission levels.", color: "green" },
    { icon: Zap, title: "Automation Rules", description: "Set automated workflows for reordering, notifications, and stock updates.", color: "purple" },
    { icon: Bell, title: "Smart Alerts", description: "Real-time notifications for low stock, expiring items, and unusual activity.", color: "orange" },
    { icon: ClipboardList, title: "Order Management", description: "End-to-end order tracking from placement to delivery with status updates.", color: "indigo" },
    { icon: RefreshCw, title: "Stock Transfers", description: "Seamlessly transfer stock between locations and track movement history.", color: "red" },
    { icon: Database, title: "Data Backup", description: "Automated cloud backups with 30-day history and easy restoration.", color: "blue" },
    { icon: Lock, title: "Security", description: "Enterprise-grade encryption with two-factor authentication and audit logs.", color: "green" },
    { icon: Clock, title: "Real-time Sync", description: "Instant synchronization across all devices and platforms.", color: "purple" },
    { icon: FileText, title: "Barcode Scanning", description: "Integrated barcode generation and scanning for quick inventory updates.", color: "orange" },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="text-blue-600 text-sm font-semibold">Powerful Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Everything You Need to <span className="text-blue-600">Manage Inventory</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to streamline your entire supply chain operation and boost productivity
          </p>
        </div>

        {/* Feature Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Features", value: "16+", color: "blue" },
            { label: "Integrations", value: "50+", color: "green" },
            { label: "API Calls/sec", value: "10K+", color: "purple" },
            { label: "Happy Users", value: "10K+", color: "orange" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 text-center border border-gray-100">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>

        {/* CTA within Features */}
        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg">
            View All Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;