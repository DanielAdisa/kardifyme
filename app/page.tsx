'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
      icon: 'https://img.icons8.com/fluency/48/000000/artificial-intelligence.png', // AI Icon
      color: 'from-violet-400 to-fuchsia-400',
      image: 'https://images.unsplash.com/photo-1603791479837-9f7a8d30c7b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', // Futuristic cityscape
    },
    {
      title: 'Quantum Security',
      description: 'Next-gen encryption for your digital identity',
      icon: 'https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-lock-cyber-security-kiranshastry-lineal-color-kiranshastry.png', // Lock Icon
      color: 'from-cyan-400 to-blue-400',
      image: 'https://images.unsplash.com/photo-1556761175-597bc051b7fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', // Secure data center
    },
    {
      title: 'Dynamic Content',
      description: 'Real-time updates and interactive elements',
      icon: 'https://img.icons8.com/fluency/48/000000/data-migration.png', // Data migration Icon
      color: 'from-amber-400 to-orange-400',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', // Dynamic content
    },
  ];

  return (
    <div ref={containerRef} className="relative bg-gray-900 text-white">
      {/* Animated Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Background"
          className="w-full h-full object-cover mix-blend-overlay opacity-20"
        />
      </motion.div>

      {/* Navigation */}
      <nav className="px-8 py-4 bg-transparent flex justify-between items-center z-10">
        <h1 className="text-2xl font-bold">KardifyMe</h1>
        <ul className="flex space-x-6">
          {['Features', 'About', 'Pricing'].map((item) => (
            <li key={item}>
              <Link href={`#${item.toLowerCase()}`} className="hover:text-indigo-400">
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <button className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md">Sign In</button>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="py-20 px-8 sm:px-16 md:px-24 lg:px-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
        >
          Redefining Digital Identity
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl max-w-lg mb-8"
        >
          Create, manage, and share secure digital identity cards powered by AI and quantum-resistant encryption.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-x-4"
        >
          <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-md">Get Started</button>
          <button className="border border-indigo-500 hover:border-indigo-600 text-indigo-500 hover:text-indigo-600 px-6 py-3 rounded-md">
            Learn More
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-8 sm:px-16 md:px-24 lg:px-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold mb-8 text-center"
        >
          Next-Gen Features
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl max-w-lg mx-auto mb-12 text-center"
        >
          Built with cutting-edge technology to revolutionize digital identity management.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              onClick={() => setActiveFeature(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center"
              style={{
                backgroundImage: `linear-gradient(${feature.color})`,
              }}
            >
              <img src={feature.icon} alt={feature.title} className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dynamic Demo Section */}
      <section id="demo" className="py-20 px-8 sm:px-16 md:px-24 lg:px-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold mb-8 text-center"
        >
          Smart Identity Management
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl max-w-lg mx-auto mb-12 text-center"
        >
          Our AI-powered system continuously optimizes your digital identity presentation based on context and audience. Real-time analytics help you understand how your information is being accessed and utilized.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {['99.99% Uptime', '256-bit Encryption', '50+ Integrations', '24/7 Support'].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-gray-800 rounded-lg shadow-lg flex items-center"
            >
              <span className="mr-4 text-green-500">✓</span>
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 px-8 sm:px-16 md:px-24 lg:px-32 bg-gradient-to-r from-indigo-500 to-purple-500">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold text-center text-white mb-8"
        >
          Ready to Transform Your Digital Identity?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl text-center text-white mb-12"
        >
          Join thousands of professionals already using KardifyMe.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <button className="bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white px-8 py-4 rounded-md">
            Start Free Trial
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;