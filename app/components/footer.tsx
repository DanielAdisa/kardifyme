'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => (
  <footer className="bg-black text-gray-300 relative overflow-hidden py-20">
    {/* Futuristic Background Layers */}
    <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-20 pointer-events-none animate-float" />
    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 via-purple-900/30 to-transparent" />
    <motion.div
      className="absolute inset-0 bg-[radial-gradient(circle_at_center,teal-500_0%,transparent_70%)] opacity-30"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
        {/* Product Section */}
        <div className="relative group">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl font-bold text-white uppercase tracking-wider relative mb-8"
          >
            Product
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full shadow-glow group-hover:w-2/3 transition-all duration-500" />
          </motion.h3>
          <ul className="space-y-6">
            <li>
              <Link href="/create" className="text-gray-400 text-lg font-medium hover:text-teal-400 transition-colors duration-300">
                <motion.span
                  whileHover={{ x: 8, color: '#14b8a6' }}
                  transition={{ duration: 0.3 }}
                >
                  Create Card
                </motion.span>
              </Link>
            </li>
            <li>
              <Link href="/advanced" className="text-gray-400 text-lg font-medium hover:text-teal-400 transition-colors duration-300">
                <motion.span
                  whileHover={{ x: 8, color: '#14b8a6' }}
                  transition={{ duration: 0.3 }}
                >
                  Advanced Cards
                </motion.span>
              </Link>
            </li>
            {/* Uncomment if needed */}
            <li>
              <Link href="/pricing" className="text-gray-400 text-lg font-medium hover:text-teal-400 transition-colors duration-300">
                <motion.span
                  whileHover={{ x: 8, color: '#14b8a6' }}
                  transition={{ duration: 0.3 }}
                >
                  Pricing
                </motion.span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Uncomment and Enhance Additional Sections */}
        {/* Company Section */}
        <div className="relative group">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl font-bold text-white uppercase tracking-wider relative mb-8"
          >
            Company
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full shadow-glow group-hover:w-2/3 transition-all duration-500" />
          </motion.h3>
          <ul className="space-y-6">
            <li>
              <Link href="/about" className="text-gray-400 text-lg font-medium hover:text-teal-400 transition-colors duration-300">
                <motion.span
                  whileHover={{ x: 8, color: '#14b8a6' }}
                  transition={{ duration: 0.3 }}
                >
                  About
                </motion.span>
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 text-lg font-medium hover:text-teal-400 transition-colors duration-300">
                <motion.span
                  whileHover={{ x: 8, color: '#14b8a6' }}
                  transition={{ duration: 0.3 }}
                >
                  Contact
                </motion.span>
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-400 text-lg font-medium hover:text-teal-400 transition-colors duration-300">
                <motion.span
                  whileHover={{ x: 8, color: '#14b8a6' }}
                  transition={{ duration: 0.3 }}
                >
                  Blog
                </motion.span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div className="relative group">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl font-bold text-white uppercase tracking-wider relative mb-8"
          >
            Legal
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full shadow-glow group-hover:w-2/3 transition-all duration-500" />
          </motion.h3>
          <ul className="space-y-6">
            <li>
              <Link href="/privacy" className="text-gray-400 text-lg font-medium hover:text-teal-400 transition-colors duration-300">
                <motion.span
                  whileHover={{ x: 8, color: '#14b8a6' }}
                  transition={{ duration: 0.3 }}
                >
                  Privacy
                </motion.span>
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-gray-400 text-lg font-medium hover:text-teal-400 transition-colors duration-300">
                <motion.span
                  whileHover={{ x: 8, color: '#14b8a6' }}
                  transition={{ duration: 0.3 }}
                >
                  Terms
                </motion.span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect Section */}
        <div className="relative group">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl font-bold text-white uppercase tracking-wider relative mb-8"
          >
            Connect
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full shadow-glow group-hover:w-2/3 transition-all duration-500" />
          </motion.h3>
          <ul className="space-y-6">
            <li>
              <a href="https://twitter.com/kardifyme" className="text-gray-400 text-lg font-medium hover:text-teal-400 transition-colors duration-300">
                <motion.span
                  whileHover={{ x: 8, color: '#14b8a6' }}
                  transition={{ duration: 0.3 }}
                >
                  Twitter
                </motion.span>
              </a>
            </li>
            <li>
              <a href="https://github.com/kardifyme" className="text-gray-400 text-lg font-medium hover:text-teal-400 transition-colors duration-300">
                <motion.span
                  whileHover={{ x: 8, color: '#14b8a6' }}
                  transition={{ duration: 0.3 }}
                >
                  GitHub
                </motion.span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-20 pt-12 border-t-2 border-teal-500/50 text-center relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gray-400 text-base font-light tracking-wider"
        >
          © {new Date().getFullYear()} KardifyMe. All rights reserved. Built by{' '}
          <Link href="https://daniel-port-sept.vercel.app/" className="text-teal-400 hover:text-purple-500 transition-colors duration-300 font-medium">
            Adisa Made It
          </Link>
        </motion.p>
        <motion.div
          className="absolute inset-x-0 -bottom-4 h-1 bg-gradient-to-r from-teal-500 via-purple-500 to-teal-500 opacity-70 animate-gradient-flow"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        {/* Neon Orbs */}
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-teal-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-4 right-4 w-12 h-12 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000" />
      </div>
    </div>
  </footer>
);

// CSS for Animations
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  .animate-float {
    animation: float 6s infinite ease-in-out;
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.4; }
  }
  .animate-pulse {
    animation: pulse 3s infinite ease-in-out;
  }
  @keyframes gradient-flow {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-gradient-flow {
    animation: gradient-flow 10s infinite linear;
  }
  .shadow-glow {
    box-shadow: 0 0 10px rgba(20, 184, 166, 0.5);
  }
`;

export default Footer;