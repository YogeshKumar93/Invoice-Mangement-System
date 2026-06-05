// components/sections/Benefits.jsx
import React from 'react';
import { 
  TrendingUp, Clock, Database, Lock, Zap, 
  DollarSign, Heart, Globe, Award, Rocket, 
  Shield, Users, BarChart, Target
} from 'lucide-react';

const BenefitCard = ({ icon: Icon, title, description, stat, statLabel }) => (
  <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition transform">
      <Icon className="h-7 w-7 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm mb-4">{description}</p>
    {stat && (
      <div className="border-t border-gray-100 pt-3 mt-2">
        <p className="text-2xl font-bold text-blue-600">{stat}</p>
        <p className="text-xs text-gray-400">{statLabel}</p>
      </div>
    )}
  </div>
);

const Benefits = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Real-Time Stock Updates",
      description: "Never run out of stock or overstock again. Get instant notifications when inventory levels hit your thresholds.",
      stat: "78%",
      statLabel: "Reduction in stockouts"
    },
    {
      icon: Clock,
      title: "Faster Operations",
      description: "Automate manual processes from order fulfillment to restocking. Save valuable time daily.",
      stat: "20+ hrs",
      statLabel: "Saved per week"
    },
    {
      icon: Database,
      title: "Accurate Reporting",
      description: "Make data-driven decisions with precise inventory valuation, sales forecasts, and trend analysis.",
      stat: "99.9%",
      statLabel: "Accuracy rate"
    },
    {
      icon: DollarSign,
      title: "Cost Reduction",
      description: "Identify inefficiencies, reduce carrying costs, and optimize your inventory turnover ratio.",
      stat: "35%",
      statLabel: "Cost reduction"
    },
    {
      icon: TrendingUp,
      title: "Increased Profitability",
      description: "Better inventory management leads to improved cash flow and higher profit margins.",
      stat: "42%",
      statLabel: "Profit increase"
    },
    {
      icon: Users,
      title: "Team Productivity",
      description: "Empower your team with intuitive tools that reduce manual work and errors.",
      stat: "65%",
      statLabel: "Less manual work"
    },
    {
      icon: Shield,
      title: "Risk Reduction",
      description: "Minimize losses from theft, damage, expiration, and human error with proper tracking.",
      stat: "85%",
      statLabel: "Error reduction"
    },
    {
      icon: Globe,
      title: "Multi-location Sync",
      description: "Manage inventory across multiple warehouses, stores, or locations from one dashboard.",
      stat: "Unlimited",
      statLabel: "Locations supported"
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-4">
            <Heart className="h-4 w-4 text-green-600" />
            <span className="text-green-600 text-sm font-semibold">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Transform Your Business with <span className="text-green-600">StockFlow</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            See measurable results and grow your business with our powerful inventory management solution
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Rocket, value: "10K+", label: "Businesses", color: "blue" },
            { icon: Award, value: "50M+", label: "Transactions", color: "green" },
            { icon: BarChart, value: "99.9%", label: "Uptime", color: "purple" },
            { icon: Target, value: "4.9", label: "Rating", color: "orange" },
          ].map((metric, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <metric.icon className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-sm text-gray-500">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <BenefitCard key={idx} {...benefit} />
          ))}
        </div>

        {/* ROI Calculator Preview */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">Calculate Your ROI</h3>
            <p className="text-blue-100 mt-2">See how much you can save with StockFlow</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
              <p className="text-sm opacity-80">Average Monthly Inventory Value</p>
              <p className="text-2xl font-bold">$50,000</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
              <p className="text-sm opacity-80">Potential Savings</p>
              <p className="text-2xl font-bold">$17,500</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
              <p className="text-sm opacity-80">ROI in First Year</p>
              <p className="text-2xl font-bold">247%</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">
              Calculate Your Savings →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;