'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const LandingPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: 'Neural Design',
      description: 'AI-powered layouts that adapt to your brand',
      icon: '🧠',
      color: 'from-violet-600 to-fuchsia-600'
    },
    {
      title: 'Quantum Security',
      description: 'Next-gen encryption for your digital identity',
      icon: '🔐',
      color: 'from-cyan-600 to-blue-600'
    },
    {
      title: 'Dynamic Content',
      description: 'Real-time updates and interactive elements',
      icon: '⚡',
      color: 'from-amber-600 to-orange-600'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030712] text-white font-sans relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-800/50" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      <div className="absolute inset-0 bg-noise opacity-10" />

      {/* Floating Blobs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/20 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          translateX: [-50, 50, -50],
          translateY: [-30, 30, -30]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-600/20 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.1, 1],
          translateX: [50, -50, 50],
          translateY: [30, -30, 30]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            KardifyMe
          </span>
          <div className="flex gap-8 items-center">
            {['Features', 'About', 'Pricing'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="hover:text-violet-400 transition-colors">
                {item}
              </Link>
            ))}
            <Link href="/login" className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center px-6">
        <div className="max-w-7xl mx-auto text-center space-y-12 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              Redefining Digital
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Identity
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Create, manage, and share secure digital identity cards powered by AI and quantum-resistant encryption.
            </p>
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-medium shadow-lg hover:shadow-violet-600/30 transition-all"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* Interactive Card Preview */}
          <motion.div 
            className="relative mx-auto mt-20 w-full max-w-3xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 rounded-3xl blur-3xl" />
            <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              <div className="flex gap-6 items-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600" />
                <div className="text-left space-y-2">
                  <h3 className="text-2xl font-bold">John Carter</h3>
                  <p className="text-slate-400">Senior Developer</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 text-sm bg-white/5 rounded-full">Blockchain</span>
                    <span className="px-3 py-1 text-sm bg-white/5 rounded-full">AI/ML</span>
                  </div>
                </div>
                <div className="ml-auto self-start p-3 bg-white/5 rounded-xl">
                  <div className="w-24 h-24 bg-gradient-to-r from-cyan-600 to-blue-600" />
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10 flex justify-between">
                <div className="space-y-2">
                  <p className="text-slate-400">Last Updated</p>
                  <p className="font-mono">2025.08.01</p>
                </div>
                <div className="text-right space-y-2">
                  <p className="text-slate-400">Security Level</p>
                  <p className="font-mono text-cyan-600">Quantum-9</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <h2 className="text-4xl font-bold">Next-Gen Features</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Built with cutting-edge technology to revolutionize digital identity management
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
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
                  <span className="text-4xl">{feature.icon}</span>
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Demo Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">Smart Identity Management</h2>
            <p className="text-slate-400">
              Our AI-powered system continuously optimizes your digital identity presentation
              based on context and audience. Real-time analytics help you understand how your
              information is being accessed and utilized.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {['99.99% Uptime', '256-bit Encryption', '50+ Integrations', '24/7 Support'].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center">
                    ✓
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-3xl backdrop-blur-xl border border-white/10 p-8">
            <motion.div
              className="absolute w-64 h-64 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-2xl"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute w-64 h-64 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl shadow-2xl"
              animate={{
                y: [0, 20, 0],
                rotate: [0, -2, 2, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-3xl p-12 backdrop-blur-xl border border-white/10">
          <h2 className="text-4xl font-bold">Ready to Transform Your Digital Identity?</h2>
          <p className="text-slate-300 text-xl">Join thousands of professionals already using KardifyMe</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-medium shadow-lg hover:shadow-violet-600/30 transition-all"
          >
            Start Free Trial
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;