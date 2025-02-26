'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

const LandingPage = () => {
  const containerRef = useRef(null);

  const features = [
    {
      title: 'AI-Driven Design',
      description: 'Intelligent layouts that adapt to your brand identity',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 22V12H2V7L12 12L22 7V12H12V22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Advanced Security',
      description: 'State-of-the-art encryption for your digital identity',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C7.96 2 3.35 4.53 2 8.22C2.9 11.39 5.1 14 8 15.1C10.9 16.2 13.1 16.2 16 15.1C18.9 14 21.1 11.39 22 8.22C20.65 4.53 16.04 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: 'from-teal-500 to-cyan-500'
    },
    {
      title: 'Real-Time Updates',
      description: 'Dynamic content that stays current and relevant',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 4L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 text-white font-sans relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 bg-[url('/custom-grid.svg')] opacity-[0.05]" />

      {/* Floating Blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500/20 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          translateX: [-50, 50, -50],
          translateY: [-30, 30, -30]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-500/20 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.1, 1],
          translateX: [50, -50, 50],
          translateY: [30, -30, 30]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center px-6">
        <div className="max-w-7xl mx-auto text-center space-y-12 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Elevate Your
              <br />
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Digital Identity
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Design, manage, and share secure digital identity cards with ease and confidence.
            </p>
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-medium shadow-lg hover:shadow-indigo-500/30 transition-all"
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
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-3xl blur-3xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              <div className="flex gap-6 items-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500" />
                <div className="text-left space-y-2">
                  <h3 className="text-2xl font-bold">John Carter</h3>
                  <p className="text-gray-400">Senior Developer</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 text-sm bg-white/5 rounded-full">Blockchain</span>
                    <span className="px-3 py-1 text-sm bg-white/5 rounded-full">AI/ML</span>
                  </div>
                </div>
                <div className="ml-auto self-start p-3 bg-white/5 rounded-xl">
                  <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-cyan-500" />
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10 flex justify-between">
                <div className="space-y-2">
                  <p className="text-gray-400">Last Updated</p>
                  <p className="font-mono">2025.08.01</p>
                </div>
                <div className="text-right space-y-2">
                  <p className="text-gray-400">Security Level</p>
                  <p className="font-mono text-teal-500">Quantum-9</p>
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
            <h2 className="text-4xl font-bold">Innovative Features</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Built with cutting-edge technology to revolutionize digital identity management
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="relative group p-8 rounded-3xl bg-gray-800/50 backdrop-blur-xl border border-white/10 hover:border-transparent transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity`} />
                <div className="relative z-10 space-y-4">
                  {feature.icon}
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
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
            <p className="text-gray-400">
              Our AI-powered system continuously optimizes your digital identity presentation
              based on context and audience. Real-time analytics help you understand how your
              information is being accessed and utilized.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {['99.99% Uptime', '256-bit Encryption', '50+ Integrations', '24/7 Support'].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    ✓
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl backdrop-blur-xl border border-white/10 p-8">
            <motion.div
              className="absolute w-64 h-64 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl shadow-2xl"
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
              className="absolute w-64 h-64 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-2xl"
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
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl p-12 backdrop-blur-xl border border-white/10">
          <h2 className="text-4xl font-bold">Ready to Transform Your Digital Identity?</h2>
          <p className="text-gray-300 text-xl">Join thousands of professionals already using KardifyMe</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-medium shadow-lg hover:shadow-indigo-500/30 transition-all"
          >
            Start Free Trial
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
