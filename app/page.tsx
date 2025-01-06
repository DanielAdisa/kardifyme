'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
        <div className="max-w-7xl flex flex-col justify-center h-screen mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white"
          >
            Create Beautiful Digital Cards
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-xl md:text-2xl text-blue-100 text-center max-w-3xl mx-auto"
          >
            Transform your ideas into stunning digital cards in minutes. Perfect for events, businesses, and personal branding.
          </motion.p>

          <motion.div
            className="mt-12 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/create">
              <button className="group relative px-8 py-4 rounded-full bg-white text-blue-900 font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                Get Started
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </Link>
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-center text-blue-950 mb-16"
          >
            Why Choose KardifyMe?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎨",
                title: "Beautiful Designs",
                description: "Create stunning cards with our intuitive design tools"
              },
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Generate your cards in seconds, not minutes"
              },
              {
                icon: "🔄",
                title: "Easy Updates",
                description: "Update your card content anytime, anywhere"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center mb-6 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-blue-950 mb-3">{feature.title}</h3>
                <p className="text-blue-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-900 to-blue-900">
        <h2 className="text-3xl md:text-4xl font-bold text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto text-center">
          <div>
            <div className="text-4xl mb-4">1️⃣</div>
            <h3 className="text-xl font-semibold">Choose Your Design</h3>
            <p className="mt-2">Pick from a variety of professional templates.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">2️⃣</div>
            <h3 className="text-xl font-semibold">Customize</h3>
            <p className="mt-2">Add your own images, text, and QR codes effortlessly.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">3️⃣</div>
            <h3 className="text-xl font-semibold">Share & Save</h3>
            <p className="mt-2">Download your card and share it instantly.</p>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      {/* <section className="py-16 px-4 bg-white text-slate-900">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Sample Cards</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Image
            src="/card1.png" // Replace with actual images
            alt="Sample Card 1"
            width={300}
            height={200}
            className="rounded-lg shadow-lg"
          />
          <Image
            src="/card2.png"
            alt="Sample Card 2"
            width={300}
            height={200}
            className="rounded-lg shadow-lg"
          />
          <Image
            src="/card3.png"
            alt="Sample Card 3"
            width={300}
            height={200}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section> */}

      {/* Example Cards Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-center text-blue-950 mb-16"
        >
          Example Cards
        </motion.h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Business Card Variant */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="relative h-[400px]">
              <Image
                src="/business-card.jpg"
                alt="Business Card"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute top-4 right-4">
                <Image
                  src="/company-logo.png"
                  alt="Company Logo"
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-white shadow-lg"
                />
              </div>
              <motion.div className="absolute bottom-0 p-6 w-full">
                <h3 className="text-4xl font-mono text-white mb-2">John Smith</h3>
                <p className="text-xl text-white/80">Senior Developer</p>
                <p className="text-lg text-white/90 mt-2">Tech Solutions Inc.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Event Ticket Variant */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ y: -5 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="relative h-[400px]">
              <Image
                src="/event-ticket.jpg"
                alt="Event Ticket"
                fill
                className="object-cover opacity-80"
                priority
              />
              <div className="absolute top-4 right-4">
                <QRCodeSVG value="https://event-ticket.com" size={50} />
              </div>
              <motion.div className="absolute bottom-0 p-6 w-full">
                <h3 className="text-4xl font-bold text-white mb-2">TechConf 2024</h3>
                <p className="text-xl text-white/90">VIP Access Pass</p>
                <p className="text-lg text-white mt-2">$999</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Product Showcase Variant */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ y: -5 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="relative h-[400px]">
              <Image
                src="/product-showcase.jpg"
                alt="Product"
                fill
                className="object-cover"
                priority
              />
              <motion.div className="absolute bottom-0 p-6 w-full">
                <h3 className="text-4xl font-serif text-white mb-2">Premium Watch</h3>
                <p className="text-xl text-white/90">Limited Edition Collection</p>
                <p className="text-lg text-white font-semibold mt-2">$1,299</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center bg-blue-500 text-white">
        <h2 className="text-3xl md:text-4xl font-bold">Ready to Create Your Card?</h2>
        <Link href="/create">
          <button className="mt-6 bg-white text-blue-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all">
            Get Started for Free
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400">
        <p>© 2025 KardifyMe. All rights reserved. Built with 💙 by Adisa.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
