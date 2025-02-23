'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';

const LandingPage = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white font-sans relative overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 bg-[url('/holo-grid.png')] opacity-15 pointer-events-none animate-pulse-slow" />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 via-purple-500/10 to-transparent"
        style={{ y, opacity }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,teal-500_0%,transparent_70%)] opacity-10" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto text-center space-y-12 z-10">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-lg"
          >
            KardifyMe <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-400">Future Now</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xl text-gray-300 font-light tracking-wide">
              Step into tomorrow with AI-powered digital cards—secure, dynamic, and infinitely connected.
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12"
          >
            <Link href="/create">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-xl text-white font-semibold shadow-lg hover:shadow-teal-500/50 transition-all duration-500">
                <span className="relative z-10">Launch Your Card</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
                <div className="absolute inset-0 bg-[url('/micro-circuit.png')] opacity-10" />
              </button>
            </Link>
          </motion.div>

          {/* Futuristic Card Preview */}
          <motion.div 
            className="mt-24 mx-auto w-[360px] h-[220px] bg-gray-900/80 backdrop-blur-xl rounded-xl border border-teal-400/30 shadow-2xl relative overflow-hidden hover:-rotate-2 transition-transform duration-700"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(20, 184, 166, 0.5)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-purple-500/10 to-transparent animate-gradient-shift" />
            <div className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="h-6 w-40 bg-teal-400/80 rounded-lg shadow-md" />
                  <div className="h-4 w-32 bg-gray-200/80 rounded-lg" />
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-purple-500 rounded-lg shadow-inner flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">K</span>
                </div>
              </div>
              <div className="mt-12 flex gap-4">
                <div className="h-10 w-10 bg-gray-200 rounded-full shadow-sm" />
                <div className="h-10 w-10 bg-gray-200 rounded-full shadow-sm" />
                <div className="h-10 w-10 bg-gray-200 rounded-full shadow-sm" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {['Neural Design', 'Quantum Links', 'Pulse Analytics'].map((title, i) => (
            <motion.div 
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-gray-900/70 backdrop-blur-md p-8 rounded-xl border border-gray-800/50 hover:border-teal-400/50 transition-all duration-500"
            >
              <div className="text-teal-400 text-5xl mb-4 font-mono">0{i + 1}</div>
              <h3 className="text-2xl font-semibold text-white mb-3 tracking-wide">{title}</h3>
              <p className="text-gray-300 text-base font-light">
                {i === 0 && 'AI adapts designs to your digital signature'}
                {i === 1 && 'Immutable NFT connections across platforms'}
                {i === 2 && 'Real-time insights into your card’s reach'}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Holo-Interactive Preview
            </h2>
            <p className="text-gray-300 text-lg font-light tracking-wide">
              Experience your KardifyMe card in a 3D holographic space—rotate, zoom, and connect instantly.
            </p>
            <div className="flex gap-6">
              <button className="px-8 py-4 bg-gray-800/80 text-white rounded-xl border border-gray-700 hover:border-teal-400 transition-all duration-300">
                Explore Demo
              </button>
              <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-xl hover:scale-105 transition-transform duration-300">
                Create Now
              </button>
            </div>
          </div>
          
          {/* Futuristic 3D Preview */}
          <div className="flex-1 relative h-[420px] bg-gray-900/80 backdrop-blur-xl rounded-xl border border-teal-400/30 shadow-xl">
            <motion.div 
              className="w-full h-full flex items-center justify-center"
              animate={{ rotateY: [0, 10, -10, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-60 h-80 bg-gray-800 rounded-xl border border-teal-400/50 shadow-lg relative overflow-hidden transform-gpu perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-500/20 animate-holo-shift" />
                <div className="p-8 relative z-10">
                  <div className="h-10 w-10 bg-teal-400 rounded-lg mb-16 shadow-md" />
                  <div className="space-y-3">
                    <div className="h-5 bg-gray-200 rounded-lg w-3/4" />
                    <div className="h-5 bg-gray-200 rounded-lg w-1/2" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic QR Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-10 tracking-tight">
            Quantum QR Access
          </h2>
          <motion.div 
            className="inline-block bg-gray-900/80 backdrop-blur-md p-8 rounded-xl border border-teal-400/30 hover:border-teal-400 transition-all duration-500"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(20, 184, 166, 0.5)' }}
          >
            <QRCodeSVG 
              value="https://kardifyme.com"
              size={200}
              bgColor="transparent"
              fgColor="#14b8a6"
              level="H"
              className="rounded-lg shadow-md"
            />
            <div className="mt-6 text-teal-400 font-medium text-lg tracking-wide">Instant KardifyMe Link</div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-16 border border-teal-400/30 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] opacity-10" />
            <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">
              Shape Your Digital Tomorrow
            </h2>
            <p className="text-gray-300 mb-10 text-lg font-light tracking-wide">
              KardifyMe: Where your identity meets the future—join the vanguard today.
            </p>
            <Link href="/create">
              <button className="px-10 py-5 bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-500 shadow-lg">
                Begin Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// CSS for Animations
const styles = `
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.15; }
    50% { opacity: 0.25; }
  }
  .animate-pulse-slow {
    animation: pulse-slow 6s infinite ease-in-out;
  }
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-gradient-shift {
    background-size: 200% 200%;
    animation: gradient-shift 10s infinite ease-in-out;
  }
  @keyframes holo-shift {
    0% { transform: translateZ(0); }
    50% { transform: translateZ(20px); }
    100% { transform: translateZ(0); }
  }
  .animate-holo-shift {
    animation: holo-shift 8s infinite ease-in-out;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default LandingPage;