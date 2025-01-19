import Link from 'next/link';
import { motion } from 'framer-motion';

const Header = () => (
  <header className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 shadow-sm">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <Link href="/" className="font-bold text-2xl text-blue-600">
          KardifyMe
        </Link>
        <div className=" md:flex text-sm items-center justify-between space-x-4 md:space-x-8">
          <Link href="/create" className="text-stone-800 hover:text-blue-600">
            Create Card
          </Link>
          <Link href="/advanced" className="text-stone-800 hover:text-blue-600">
            Advanced Cards
          </Link>
          {/* <Link href="/templates" className="text-gray-700 hover:text-blue-600">
            Templates
          </Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-600">
            Pricing
          </Link> */}
        </div>
        <div className="flex space-x-4">
          <Link href="/create">
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-2 rounded-full"
            >
              Get Started
            </motion.button> */}
          </Link>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;