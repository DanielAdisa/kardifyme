'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useRef, useState } from 'react';

const LandingPage = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  // Dark/light mode state for better personalization and accessibility
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const modeClass = darkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900';

  return (
    <div className={`min-h-screen relative overflow-hidden ${modeClass} transition-colors duration-500`}>
      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full text-sm font-medium hover:scale-105 transition-transform"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04]" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-transparent"
        style={{ x }}
        aria-hidden="true"
      />

      {/* Main Content */}
      <main ref={ref} className="relative z-10">
        {/* Hero Section */}
        <section
          className="min-h-screen flex flex-col items-center justify-center px-6 text-center space-y-8"
          aria-label="Hero Section"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 leading-tight"
          >
            Revolutionize Your <span className="font-normal">Digital Identity</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto text-lg font-light text-slate-400"
          >
            Next-generation digital cards powered by AI-driven design and blockchain-verified authenticity.
          </motion.p>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/create">
              <a className="relative inline-block group px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full font-semibold hover:scale-105 transition-transform">
                Start Creating
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </a>
            </Link>
          </motion.div>

          {/* Holographic Card Preview */}
          <motion.div
            className="mt-16 mx-auto w-[320px] h-[200px] bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden hover:rotate-[2deg] transition-transform duration-500"
            whileHover={{ scale: 1.05 }}
            aria-label="Digital Card Preview"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10" aria-hidden="true" />
            <div className="absolute inset-0 [mask-image:linear-gradient(transparent,white,transparent)]" aria-hidden="true" />
            <div className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-cyan-400/90 rounded-full" />
                  <div className="h-3 w-24 bg-slate-100/90 rounded-full" />
                </div>
                <div className="w-12 h-12 bg-purple-400/90 rounded-lg" />
              </div>
              <div className="mt-8 flex gap-4">
                <div className="h-8 w-8 bg-slate-100 rounded-full" />
                <div className="h-8 w-8 bg-slate-100 rounded-full" />
                <div className="h-8 w-8 bg-slate-100 rounded-full" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6" aria-label="Features Section">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI Design Engine',
                description: 'Automatically generates optimal designs based on your brand identity.'
              },
              {
                title: 'Dynamic NFT Links',
                description: 'Embed dynamic content that updates in real-time across all platforms.'
              },
              {
                title: 'Real-time Analytics',
                description: 'Track engagement and interactions through an integrated analytics dashboard.'
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.2 }}
                className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 hover:border-cyan-400/30 transition-colors duration-300"
                aria-label={`Feature ${i + 1}: ${feature.title}`}
              >
                <div className="text-cyan-400 text-3xl mb-4">0{i + 1}</div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-400 font-light">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="py-20 px-6" aria-label="Interactive Demo Section">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                Immersive Interaction
              </h2>
              <p className="text-slate-400 text-lg font-light">
                Experience seamless design interaction with our spatial interface. Rotate, zoom, and preview your digital card in 3D space.
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-400 transition-colors">
                  View Demo
                </button>
                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:scale-105 transition-transform">
                  Start Creating
                </button>
              </div>
            </div>
            <div className="flex-1 relative h-[400px] bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800">
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <div className="w-64 h-64 bg-gradient-radial from-cyan-500/20 to-transparent rounded-full" />
              </div>
              <motion.div
                className="w-full h-full flex items-center justify-center"
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                aria-label="3D Preview Animation"
              >
                <div className="w-48 h-72 bg-slate-800 rounded-xl shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
                  <div className="p-6 relative z-10">
                    <div className="h-8 w-8 bg-cyan-400 rounded-full mb-12" />
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-100 rounded-full w-3/4" />
                      <div className="h-4 bg-slate-100 rounded-full w-1/2" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dynamic QR Section */}
        <section className="py-20 px-6" aria-label="Dynamic QR Section">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-slate-100 mb-8">Smart Integration</h2>
            <motion.div
              className="inline-block bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 hover:border-cyan-400 transition-transform"
              whileHover={{ scale: 1.05 }}
              aria-label="QR Code Integration"
            >
              <QRCodeSVG
                value="https://kardifyme.com"
                size={200}
                bgColor="transparent"
                fgColor="#22d3ee"
                level="H"
                className="rounded-xl"
              />
              <div className="mt-4 text-cyan-400 font-medium">Dynamic Content QR</div>
            </motion.div>
          </div>
        </section>

        {/* Footer CTA */}
        <footer className="py-20 px-6" aria-label="Call To Action Footer">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-12 border border-slate-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-noise opacity-10" aria-hidden="true" />
              <h2 className="text-4xl font-bold text-slate-100 mb-6">Ready for the Future?</h2>
              <p className="text-slate-400 mb-8 font-light">
                Join thousands of innovators already shaping their digital presence with KardifyMe.
              </p>
              <Link href="/create">
                <a className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full font-semibold hover:scale-105 transition-transform">
                  Start Your Journey
                </a>
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;