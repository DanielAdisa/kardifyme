'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Header = () => (
  <header className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-xl z-50 border-b border-teal-400/30 shadow-lg">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        {/* Logo */}
        <Link href="/" className="font-extrabold text-3xl text-white tracking-tight hover:text-teal-400 transition-colors duration-300">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-400"
          >
            KardifyMe
          </motion.span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex text-base items-center justify-between space-x-10">
          <Link href="/create" className="text-gray-300 font-medium uppercase tracking-wide hover:text-teal-400 transition-colors duration-300">
            <motion.span whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              Create Card
            </motion.span>
          </Link>
          <Link href="/advanced" className="text-gray-300 font-medium uppercase tracking-wide hover:text-teal-400 transition-colors duration-300">
            <motion.span whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              Advanced Cards
            </motion.span>
          </Link>
          {/* Uncomment if needed */}
          {/* <Link href="/templates" className="text-gray-300 font-medium uppercase tracking-wide hover:text-teal-400 transition-colors duration-300">
            <motion.span whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              Templates
            </motion.span>
          </Link>
          <Link href="/pricing" className="text-gray-300 font-medium uppercase tracking-wide hover:text-teal-400 transition-colors duration-300">
            <motion.span whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              Pricing
            </motion.span>
          </Link> */}
        </div>

        {/* CTA Button */}
        <div className="flex space-x-4">
          <Link href="/create">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(20, 184, 166, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold uppercase tracking-wider shadow-md hover:shadow-teal-500/50 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-[url('/micro-circuit.png')] opacity-10" />
            </motion.button>
          </Link>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;