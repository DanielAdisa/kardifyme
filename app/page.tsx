'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';

const LandingPage = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <div className="min-h-screen bg-grid-slate-900/[0.04] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-transparent"
        style={{ x }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 leading-[1.1] font-sans"
          >
            Revolutionize Your <span className="text-slate-100">Digital Identity</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-xl text-stone-50 font-light font-sans">
              Next-generation digital cards powered by AI-driven design and blockchain-verified authenticity.
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-12"
          >
            <Link href="/create">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full font-semibold hover:scale-[1.03] transition-transform duration-300">
                <span className="relative z-10">Start Creating</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                <div className="absolute inset-0 rounded-full bg-noise opacity-10" />
              </button>
            </Link>
          </motion.div>

          {/* Holographic card preview */}
          <motion.div 
            className="mt-24 mx-auto w-[320px] h-[200px] bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden hover:rotate-[2deg] transition-transform duration-500"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10" />
            <div className="absolute inset-0 [mask-image:linear-gradient(transparent,white,transparent)]" />
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
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {['AI Design Engine', 'Dynamic NFT Links', 'Real-time Analytics'].map((title, i) => (
            <motion.div 
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 hover:border-cyan-400/30 transition-colors duration-300"
            >
              <div className="text-cyan-400 text-4xl mb-4">0{i+1}</div>
              <h3 className="text-2xl font-semibold text-slate-100 mb-3 font-sans">{title}</h3>
              <p className="text-slate-400 font-light font-sans">
                {i === 0 && 'Automatically generates optimal designs based on your brand identity'}
                {i === 1 && 'Embed dynamic content that updates in real-time across all platforms'}
                {i === 2 && 'Track engagement and interactions through integrated analytics dashboard'}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 font-sans">
              Immersive Interaction
            </h2>
            <p className="text-slate-400 text-lg font-light font-sans">
              Experience seamless design interaction with our spatial interface. Rotate, zoom, and preview your digital card in 3D space.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-400 transition-colors font-sans">
                View Demo
              </button>
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:scale-[1.02] transition-transform font-sans">
                Start Creating
              </button>
            </div>
          </div>
          
          {/* 3D Preview Area */}
          <div className="flex-1 relative h-[400px] bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-radial from-cyan-500/20 to-transparent rounded-full" />
            </div>
            <motion.div 
              className="w-full h-full flex items-center justify-center"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <div className="w-48 h-72 bg-slate-800 rounded-xl transform-gpu shadow-2xl relative overflow-hidden">
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
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-100 mb-8 font-sans">
            Smart Integration
          </h2>
          <motion.div 
            className="inline-block bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 hover:border-cyan-400 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <QRCodeSVG 
              value="https://kardifyme.com" 
              size={200}
              bgColor="transparent"
              fgColor="#22d3ee"
              level="H"
              className="rounded-xl"
            />
            <div className="mt-4 text-cyan-400 font-medium font-sans">Dynamic Content QR</div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-12 border border-slate-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-10" />
            <h2 className="text-4xl font-bold text-slate-100 mb-6 font-sans">
              Ready for the Future?
            </h2>
            <p className="text-slate-400 mb-8 font-light font-sans">
              Join thousands of innovators already shaping their digital presence with KardifyMe
            </p>
            <Link href="/create">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full font-semibold hover:scale-[1.02] transition-transform font-sans">
                Start Your Journey
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;