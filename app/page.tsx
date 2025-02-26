'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

const LandingPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: 'Neural Design',
      description: 'AI-powered layouts that adapt to your brand.',
      icon: '/icons/ai-icon.svg',
      color: 'from-violet-500 to-fuchsia-500',
    },
    {
      title: 'Quantum Security',
      description: 'Next-gen encryption for your digital identity.',
      icon: '/icons/security-icon.svg',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Dynamic Content',
      description: 'Real-time updates and interactive elements.',
      icon: '/icons/dynamic-content.svg',
      color: 'from-orange-500 to-amber-500',
    },
  ];

  return (
    <div className="relative bg-gray-900 text-white">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-transparent z-50 px-8 py-4 flex justify-between items-center backdrop-blur-md">
        <h1 className="text-2xl font-bold text-indigo-400">KardifyMe</h1>
        <ul className="flex space-x-6">
          {['Features', 'About', 'Pricing'].map((item) => (
            <li key={item}>
              <Link href={`#${item.toLowerCase()}`} className="hover:text-indigo-400 transition">
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <button className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md shadow-md">Sign In</button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
        >
          Elevate Your Digital Identity
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl max-w-lg mt-4 text-gray-300"
        >
          Seamlessly create, manage, and share secure digital identity cards powered by AI and quantum-resistant encryption.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 flex space-x-4"
        >
          <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-md shadow-lg">
            Get Started
          </button>
          <button className="border border-indigo-500 hover:border-indigo-600 text-indigo-500 px-6 py-3 rounded-md">
            Learn More
          </button>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute -bottom-24 md:-bottom-16 w-4/5 max-w-lg"
        >
          <img src="/images/futuristic-id.png" alt="Futuristic Digital Identity" className="rounded-xl shadow-lg" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center"
        >
          Next-Gen Features
        </motion.h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`p-6 rounded-xl shadow-md bg-gradient-to-br ${feature.color}`}
            >
              <img src={feature.icon} alt={feature.title} className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-gray-100">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 px-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white"
        >
          Ready to Transform Your Digital Identity?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg mt-4 text-gray-200"
        >
          Join thousands of professionals already using KardifyMe.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6"
        >
          <button className="bg-white text-indigo-500 hover:bg-indigo-600 hover:text-white px-8 py-4 rounded-md shadow-md">
            Start Free Trial
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;