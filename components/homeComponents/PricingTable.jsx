'use client'

import React from "react";
import { Check, X, Sparkles } from "lucide-react";
import Link from 'next/link';

const PricingTable = () => {
  const plans = [
    {
      title: "Hourly",
      price: "$9",
      subtitle: "Freelance Rate",
      popular: false,
      features: [
        { text: "Figma to Code conversion", available: true },
        { text: "Tailwind CSS integration", available: true },
        { text: "Responsive layouts", available: true },
        { text: "One-time technical delivery", available: true },
        { text: "Post-deployment support", available: false },
      ],
    },
    {
      title: "Weekly",
      price: "$59",
      subtitle: "Part-Time Contract",
      popular: true,
      features: [
        { text: "Up to 5 page layouts / screens", available: true },
        { text: "Next.js / React build setup", available: true },
        { text: "Responsive animations & details", available: true },
        { text: "Technical support sessions", available: true },
        { text: "24/7 priority support channel", available: false },
      ],
    },
    {
      title: "Monthly",
      price: "$199",
      subtitle: "Full-Time Support",
      popular: false,
      features: [
        { text: "Unlimited custom screens & pages", available: true },
        { text: "Production-ready architectures", available: true },
        { text: "Advanced animations & micro-details", available: true },
        { text: "SEO & performance audit/fixes", available: true },
        { text: "24/7 priority support & revisions", available: true },
      ],
    },
  ];

  return (
    <section className="py-24 px-4 md:px-8 border-t border-slate-200/50 dark:border-slate-800/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Collaboration Plans</h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 rounded-full mx-auto mt-4 mb-5"></div>
          <p className="text-slate-650 dark:text-slate-400 max-w-2xl mx-auto">
            Flexible packages tailored to suit different project needs. Choose a plan or reach out for custom requirements.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 flex flex-col flex-grow flex-1 min-w-[280px] max-w-[380px] mx-auto transition-all duration-300 bg-white dark:bg-slate-900/60 border ${
                plan.popular 
                  ? "border-blue-600 dark:border-blue-500 shadow-xl shadow-blue-500/5 md:-translate-y-4 scale-[1.02] md:scale-[1.04] z-10" 
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.title}</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">{plan.subtitle}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">{plan.price}</span>
                <span className="text-sm font-semibold text-slate-400">/ plan</span>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 text-sm ${
                      feature.available
                        ? "text-slate-600 dark:text-slate-300"
                        : "text-slate-450 dark:text-slate-600"
                    }`}
                  >
                    {feature.available ? (
                      <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-slate-300 dark:text-slate-700 shrink-0 mt-0.5" />
                    )}
                    <span className={feature.available ? "" : "line-through"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className={`w-full py-3.5 rounded-xl font-bold text-center transition-all duration-300 transform hover:scale-[1.02] cursor-pointer ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20"
                    : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-400 dark:hover:bg-slate-750 text-slate-800 dark:text-white"
                }`}
              >
                Hire Me
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
