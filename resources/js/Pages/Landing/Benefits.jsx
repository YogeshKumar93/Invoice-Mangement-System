// components/sections/Benefits.jsx
import React from 'react';
import { 
  TrendingUp, Clock, Database, DollarSign, Heart, Globe, 
  Rocket, Shield, Users, BarChart, Target, Award, CheckCircle, 
  Calendar, Sparkles, ArrowRight, Gift, Star
} from 'lucide-react';

const BenefitCard = ({ icon: Icon, title, description, stat, statLabel, gradient, delay }) => {
  const gradients = {
    sunset: "from-red-500 via-orange-500 to-yellow-500",
    ocean: "from-cyan-500 via-blue-500 to-indigo-500",
    candy: "from-pink-500 via-purple-500 to-indigo-500",
    lime: "from-green-400 to-emerald-600",
    amber: "from-amber-500 to-orange-600",
    violet: "from-violet-500 to-purple-700",
    teal: "from-teal-400 to-cyan-600",
    rose: "from-rose-400 to-pink-600",
  };

  return (
    <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100 hover:border-purple-200">
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradients[gradient]} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-all duration-300`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-xl font-black text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
      {stat && (
        <div className="border-t-2 border-gray-100 pt-3 mt-2">
          <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{stat}</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{statLabel}</p>
        </div>
      )}
    </div>
  );
};

const Benefits = () => {
  const benefits = [
    { icon: Rocket, title: "Lightning ROI", description: "See returns in under 3 months with automated inventory optimization.", stat: "137%", statLabel: "avg first-year ROI", gradient: "sunset" },
    { icon: Clock, title: "Time Freedom", description: "Save 25+ hours weekly by automating manual stock tasks.", stat: "25+ hrs", statLabel: "saved per week", gradient: "ocean" },
    { icon: Database, title: "Pinpoint Accuracy", description: "Eliminate human errors with AI-powered cycle counting.", stat: "99.9%", statLabel: "inventory accuracy", gradient: "candy" },
    { icon: DollarSign, title: "Cost Slasher", description: "Reduce holding costs and deadstock with smart forecasting.", stat: "35%", statLabel: "cost reduction", gradient: "lime" },
    { icon: TrendingUp, title: "Profit Booster", description: "Identify high-margin products and optimize pricing.", stat: "42%", statLabel: "profit uplift", gradient: "amber" },
    { icon: Users, title: "Team Productivity", description: "Intuitive interface reduces training time by 70%.", stat: "70%", statLabel: "faster onboarding", gradient: "violet" },
    { icon: Shield, title: "Risk Guardian", description: "Prevent theft, expiry losses, and stock discrepancies.", stat: "89%", statLabel: "shrinkage reduction", gradient: "teal" },
    { icon: Globe, title: "Global Sync", description: "Manage unlimited locations with real-time synchronization.", stat: "∞", statLabel: "unlimited locations", gradient: "rose" },
  ];

  return (
    <section id="benefits" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 -z-10" />
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent" />
      
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 px-6 py-2.5 rounded-full shadow-md mb-5">
            <Star className="h-5 w-5 text-orange-700 fill-orange-300" />
            <span className="text-orange-800 font-extrabold text-sm uppercase tracking-wide">Why Businesses Love Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">
            Transform your business with{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              colorful results
            </span>
          </h2>
          <p className="mt-5 text-gray-700 text-lg max-w-2xl mx-auto font-medium">
            Real metrics from real businesses using StockFlow IMS
          </p>
        </div>

        {/* Key Metrics - Colorful Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
          {[
            { icon: Award, value: "4.96/5", label: "User Rating", bg: "bg-gradient-to-br from-yellow-400 to-orange-500" },
            { icon: BarChart, value: "2.8x", label: "Inventory Turnover", bg: "bg-gradient-to-br from-green-400 to-emerald-500" },
            { icon: Target, value: "98.5%", label: "Fulfillment Rate", bg: "bg-gradient-to-br from-blue-500 to-indigo-600" },
            { icon: Calendar, value: "14 days", label: "Avg Implementation", bg: "bg-gradient-to-br from-purple-500 to-pink-600" },
          ].map((metric, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 text-center shadow-xl border-2 border-white hover:scale-105 transition-all duration-300">
              <div className={`w-14 h-14 mx-auto rounded-2xl ${metric.bg} flex items-center justify-center mb-3 shadow-lg`}>
                <metric.icon className="h-7 w-7 text-white" />
              </div>
              <p className="text-3xl font-black text-gray-800">{metric.value}</p>
              <p className="text-sm font-bold text-gray-500">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <BenefitCard key={idx} {...benefit} />
          ))}
        </div>

        {/* ROI Calculator - Vibrant Card */}
        <div className="mt-20 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl blur-xl opacity-70"></div>
          <div className="relative bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 rounded-2xl p-10 shadow-2xl">
            <div className="text-center mb-8">
              <Gift className="h-10 w-10 text-yellow-400 mx-auto mb-3 animate-bounce" />
              <h3 className="text-3xl md:text-4xl font-black text-white">Calculate your savings</h3>
              <p className="text-purple-200 mt-2 max-w-md mx-auto text-lg">See your personalized ROI in 60 seconds</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30">
                <p className="text-sm text-purple-200 font-bold">Annual Inventory Value</p>
                <p className="text-3xl font-black text-white">$250K</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30">
                <p className="text-sm text-purple-200 font-bold">Potential Savings</p>
                <p className="text-3xl font-black text-white">$87,500</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30">
                <p className="text-sm text-purple-200 font-bold">ROI</p>
                <p className="text-3xl font-black text-white">312%</p>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button className="px-10 py-4 bg-white text-purple-700 rounded-2xl font-black text-lg hover:shadow-2xl transition-all flex items-center gap-2">
                Calculate Now <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-16">
          {["GDPR Compliant", "SOC2 Type II", "24/7 Priority Support", "30-Day Trial", "No Credit Card"].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-semibold text-gray-700">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;