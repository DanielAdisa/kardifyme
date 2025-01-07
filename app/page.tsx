'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white font-sans">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
        <div className="max-w-6xl text-center px-6 lg:px-8">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl lg:text-7xl font-extrabold text-white leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-teal-100 to-white"
          >
            Create Stunning Digital Cards
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg lg:text-2xl text-gray-200 max-w-3xl mx-auto"
          >
            Empower your brand or event with customized, beautiful digital cards. Quick, easy, and impactful.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <Link href="/create">
              <button className="group inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-blue-900 bg-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                Get Started
                <span className="ml-3 text-blue-500 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
        {/* <div
          aria-hidden="true"
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        /> */}
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-extrabold text-blue-900"
          >
            Why Choose KardifyMe?
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
            {[
              {
                icon: "🎨",
                title: "Beautiful Designs",
                description: "Craft cards that captivate with sleek, modern templates."
              },
              {
                icon: "⚡",
                title: "Quick & Intuitive",
                description: "Design cards effortlessly in just a few clicks."
              },
              {
                icon: "🔄",
                title: "Dynamic Updates",
                description: "Edit and refresh your cards anytime, anywhere."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-blue-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-gray-900 to-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-extrabold"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            {[
              {
                step: "1️⃣",
                title: "Choose Your Design",
                description: "Select a template that suits your needs."
              },
              {
                step: "2️⃣",
                title: "Customize",
                description: "Add your details, images, and branding."
              },
              {
                step: "3️⃣",
                title: "Share or Save",
                description: "Download and share your card instantly."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-blue-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl mb-4">{step.step}</div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-gray-200">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-4xl font-bold">Ready to Create Your Card?</h2>
        <Link href="/create">
          <button className="mt-6 px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-transform duration-300 hover:scale-105">
            Get Started for Free
          </button>
        </Link>
      </section>

      {/* Footer */}

    </div>
  );
};

export default LandingPage;
