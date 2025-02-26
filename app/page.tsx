'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

const LandingPage = () => {
  const containerRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: 'Neural Design',
      description: 'AI-powered layouts that adapt to your brand',
      icon: '/icons/ai-design.svg',
      svg: '/svgs/neural-design.svg',
      color: 'from-violet-500 to-fuchsia-500'
    },
    {
      title: 'Quantum Security',
      description: 'Next-gen encryption for your digital identity',
      icon: '/icons/security.svg',
      svg: '/svgs/quantum-security.svg',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Dynamic Content',
      description: 'Real-time updates and interactive elements',
      icon: '/icons/dynamic.svg',
      svg: '/svgs/dynamic-content.svg',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020617] text-white font-sans relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1f] to-[#020617]" />
      <div className="absolute inset-0 bg-noise opacity-5" />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center px-6">
        <div className="max-w-6xl mx-auto text-center space-y-12 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              The Future of  
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Digital Identity
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Secure, AI-powered identity cards with quantum-resistant encryption.  
              Manage and share your identity with confidence.
            </p>
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl font-medium shadow-lg hover:shadow-violet-500/30 transition-all"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/20 transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* Hero SVG (Instead of Image) */}
          <motion.div 
            className="relative mx-auto mt-12 w-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image src="/svgs/hero-identity.svg" width={600} height={400} alt="Digital Identity Illustration" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <h2 className="text-4xl font-bold">Next-Gen Features</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Built with cutting-edge technology to redefine digital identity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="relative group p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-transparent transition-all"
                onHoverStart={() => setActiveFeature(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity`} />
                <div className="relative z-10 space-y-4">
                  <Image src={feature.icon} width={40} height={40} alt={feature.title} />
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                  <Image src={feature.svg} width={300} height={200} alt={feature.title} className="rounded-xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-3xl p-12 backdrop-blur-xl border border-white/10">
          <h2 className="text-4xl font-bold">Ready to Transform Your Digital Identity?</h2>
          <p className="text-slate-300 text-xl">Join thousands of professionals already using KardifyMe</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl font-medium shadow-lg hover:shadow-violet-500/30 transition-all"
          >
            Start Free Trial
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;