'use client';

import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const LandingPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const features = [
    {
      title: 'Neural Design',
      description: 'AI-powered layouts that adapt to your brand',
      icon: '/cyber-ai.png',
      color: 'from-violet-600 to-fuchsia-500',
      bg: '/hologram-bg-1.png'
    },
    {
      title: 'Quantum Security',
      description: 'Next-gen encryption for your identity',
      icon: '/quantum-lock.png',
      color: 'from-cyan-500 to-blue-500',
      bg: '/hologram-bg-2.png'
    },
    {
      title: 'Dynamic Content',
      description: 'Real-time interactive elements',
      icon: '/dynamic-core.png',
      color: 'from-amber-500 to-orange-500',
      bg: '/hologram-bg-3.png'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 to-gray-900/90" />
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/cyber-grid.png"
          alt="Grid pattern"
          fill
          className="object-cover"
        />
      </div>

      {/* Floating particles */}
      <motion.div 
        className="absolute inset-0 bg-[url('/particles.png')] opacity-30"
        animate={{ opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            KardifyMe
          </span>
          <div className="flex gap-8 items-center">
            {['Features', 'Solutions', 'Enterprise'].map((item) => (
              <button key={item} className="text-sm font-medium hover:text-cyan-300 transition-colors">
                {item}
              </button>
            ))}
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:opacity-90 transition-opacity">
              Get Started
            </button>
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
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Next-Gen Digital
              </span>
              <br />
              Identity Solutions
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Enterprise-grade identity management powered by AI and quantum-resistant blockchain technology
            </p>
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-medium shadow-lg hover:shadow-cyan-500/30 transition-all"
              >
                Schedule Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
              >
                White Paper
              </motion.button>
            </div>
          </motion.div>

          {/* Holographic Card Preview */}
          <motion.div 
            className="relative mx-auto mt-20 w-full max-w-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-3xl blur-3xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-cyan-400/20 p-8 shadow-2xl">
              <div className="flex gap-6 items-center">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden">
                  <Image
                    src="/biometric-scan.png"
                    alt="Biometric scan"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left space-y-2">
                  <h3 className="text-2xl font-bold">Enterprise ID</h3>
                  <p className="text-gray-400">Multi-Factor Authentication</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 text-sm bg-cyan-500/10 rounded-full">Blockchain</span>
                    <span className="px-3 py-1 text-sm bg-cyan-500/10 rounded-full">Quantum</span>
                  </div>
                </div>
                <div className="ml-auto self-start p-3 bg-cyan-500/10 rounded-xl">
                  <div className="w-24 h-24 relative">
                    <Image
                      src="/qr-hologram.png"
                      alt="Holographic QR"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-cyan-400/10 flex justify-between">
                <div className="space-y-2">
                  <p className="text-gray-400">Security Level</p>
                  <p className="font-mono text-cyan-400">Quantum-9</p>
                </div>
                <div className="text-right space-y-2">
                  <p className="text-gray-400">Network Status</p>
                  <p className="font-mono text-green-400">Secure</p>
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
            <h2 className="text-4xl font-bold">Enterprise Features</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Designed for global organizations requiring military-grade security
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="relative group p-8 rounded-3xl bg-gray-800/50 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 transition-all h-96"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute inset-0 opacity-30">
                  <Image
                    src={feature.bg}
                    alt="Feature background"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10 space-y-6 h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 relative">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-center">{feature.title}</h3>
                  <p className="text-gray-400 text-center">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl p-12 backdrop-blur-xl border border-cyan-400/20">
          <h2 className="text-4xl font-bold">Ready for Quantum-Safe Identity?</h2>
          <p className="text-gray-300 text-xl">Join Fortune 500 companies securing their future</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-medium shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            Contact Sales
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;