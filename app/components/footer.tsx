import Link from 'next/link';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            <li><Link href="/create" className="hover:text-white">Create Card</Link></li>
            <li><Link href="/vip" className="hover:text-white">Advanced Cards</Link></li>
            {/* <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li> */}
          </ul>
        </div>
        {/* <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div> */}
        {/* <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
          </ul>
        </div> */}
        {/* <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <ul className="space-y-2">
            <li><a href="https://twitter.com/kardifyme" className="hover:text-white">Twitter</a></li>
            <li><a href="https://github.com/kardifyme" className="hover:text-white">GitHub</a></li>
          </ul>
        </div> */}
      </div>
      <div className="mt-12 pt-8 border-t border-gray-800 text-center">
        <p>© {new Date().getFullYear()} KardifyMe. All rights reserved. Built by <Link href={"https://daniel-port-sept.vercel.app/"}>Adisa Made It</Link></p>
      </div>
    </div>
  </footer>
);

export default Footer;