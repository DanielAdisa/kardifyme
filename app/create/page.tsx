'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import pic from "@/public/12.jpg";

const cardVariants = {
  business: {
    gradient: "bg-gradient-to-br from-slate-900 to-blue-900",
    titleFont: "font-mono",
    layout: "business"
  },
  event: {
    gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
    titleFont: "font-bold",
    layout: "ticket"
  },
  product: {
    gradient: "bg-gradient-to-br from-slate-800 to-slate-900",
    titleFont: "font-serif",
    layout: "product"
  },
  vip: {
    gradient: "bg-gradient-to-br from-gold to-yellow-500",
    titleFont: "font-extrabold",
    layout: "vip"
  },
  premium: {
    gradient: "bg-gradient-to-br from-black to-gray-800",
    titleFont: "font-light",
    layout: "premium"
  }
};

const CreateCard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [largeDescription, setLargeDescription] = useState('');
  const [image, setImage] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [logo, setLogo] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [includeBottomPart, setIncludeBottomPart] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  type VariantType = 'business' | 'event' | 'product' | 'vip' | 'premium';
  const [selectedVariant, setSelectedVariant] = useState<VariantType>('business');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'logo') => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (type === 'main') {
          setImage(event.target?.result as string);
        } else {
          setLogo(event.target?.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const generateImage = async () => {
    if (!cardRef.current) return;
    setIsLoading(true);
    try {
      const content = cardRef.current;
      const dataUrl = await toPng(content, {
        quality: 4,
        pixelRatio: 4,
      });
      const link = document.createElement('a');
      link.download = `${title}-card.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 p-4">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Create Your Card
        </h1>
        <div className="space-y-8">
          <div className="relative group space-y-2">
            <label className="block text-sm font-medium text-slate-700 transition-all duration-200 mb-1 group-hover:text-slate-900 group-focus-within:text-blue-600">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
            />
          </div>
          <div className="relative group space-y-2">
            <label className="block text-sm font-medium text-slate-700 transition-all duration-200 mb-1 group-hover:text-slate-900 group-focus-within:text-blue-600">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              title="Enter description"
              placeholder="Enter description"
              className="w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none min-h-[120px] resize-none"
            />
          </div>
          <div className="relative group space-y-2">
            <label className="block text-sm font-medium text-slate-700 transition-all duration-200 mb-1 group-hover:text-slate-900 group-focus-within:text-blue-600">Large Description</label>
            <textarea
              value={largeDescription}
              onChange={(e) => setLargeDescription(e.target.value)}
              title="Enter large description"
              placeholder="Enter large description"
              className="w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none min-h-[120px] resize-none"
            />
          </div>
          <div className="relative group space-y-2">
            <label className="block text-sm font-medium text-slate-700 transition-all duration-200 mb-1 group-hover:text-slate-900 group-focus-within:text-blue-600">Main Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'main')}
              title="Upload Image"
              className="w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
            />
          </div>
          <div className="relative group space-y-2">
            <label className="block text-sm font-medium text-slate-700 transition-all duration-200 mb-1 group-hover:text-slate-900 group-focus-within:text-blue-600">Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'logo')}
              title="Upload Logo"
              className="w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
            />
          </div>
          <div className="relative group space-y-2">
            <label className="block text-sm font-medium text-slate-700 transition-all duration-200 mb-1 group-hover:text-slate-900 group-focus-within:text-blue-600">QR Code URL</label>
            <input
              type="text"
              value={qrUrl}
              onChange={(e) => setQrUrl(e.target.value)}
              placeholder="Enter URL for QR Code"
              className="w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
            />
          </div>
          <div className="relative group space-y-2">
            <label className="block text-sm font-medium text-slate-700 transition-all duration-200 mb-1 group-hover:text-slate-900 group-focus-within:text-blue-600">Price</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
              />
              <select
                title="Select currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
              >
                <option value="USD">USD</option>
                <option value="NGN">NGN</option>
                <option value="GHS">GHS</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
          <div className="relative group space-y-2">
            <label className="block text-sm font-medium text-slate-700 transition-all duration-200 mb-1 group-hover:text-slate-900 group-focus-within:text-blue-600">Include Bottom Part</label>
            <input
              type="checkbox"
              checked={includeBottomPart}
              onChange={(e) => setIncludeBottomPart(e.target.checked)}
              title="Include Bottom Part"
              className="form-checkbox text-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative group space-y-2">
            <label className="block text-sm font-medium text-slate-700 transition-all duration-200 mb-1 group-hover:text-slate-900 group-focus-within:text-blue-600">Card Type</label>
            <select
              title="Select card type"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value as VariantType)}
              className="w-full px-4 py-3.5 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
            >
              <option value="business">Business Card</option>
              <option value="event">Event Ticket</option>
              <option value="product">Product Showcase</option>
              <option value="vip">VIP Pass</option>
              <option value="premium">Premium Card</option>
            </select>
          </div>
        </div>
        <div className="text-center mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateImage}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Card'}
          </motion.button>
        </div>
      </div>

      <div className="mt-12">
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`${cardVariants[selectedVariant]?.gradient} rounded-3xl shadow-2xl overflow-hidden`}
        >
          {/* Card Hero */}
          <div className="relative h-[400px]">
            {image && (
              <Image
                src={image}
                alt={title}
                fill
                className={`object-cover transition-transform duration-700 ${selectedVariant === 'event' ? 'opacity-80' : ''}`}
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Conditional rendering based on variant */}
            {selectedVariant === 'event' ? (
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="text-black font-bold">ADMIT ONE</h3>
                <p className="text-sm text-gray-600">Valid: {new Date().toLocaleDateString()}</p>
              </div>
            ) : null}

            <div className="absolute top-2 right-2 flex flex-col space-y-2">
              {logo && (
                <Image
                  src={logo}
                  alt="Logo"
                  width={50}
                  height={50}
                  className={`rounded-full border border-white shadow-lg ${selectedVariant === 'product' ? 'bg-white/90' : ''}`}
                />
              )}
              {qrUrl && (
                <div className={`${selectedVariant === 'event' ? 'bg-white/90 p-2 rounded-lg' : ''}`}>
                  <QRCodeSVG value={qrUrl} size={50} />
                </div>
              )}
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`absolute bottom-0 p-6 w-full ${selectedVariant === 'event' ? 'bg-gradient-to-t from-purple-900/90 to-transparent' : 'bg-gradient-to-t from-black/80 via-black/50 to-transparent'}`}
            >
              <h1 className={`text-4xl md:text-6xl ${cardVariants[selectedVariant]?.titleFont} text-white mb-2 tracking-tight`}>
                {title}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl font-light">
                {description}
              </p>
              {price && (
                <p className={`text-lg md:text-xl font-semibold mt-2 ${selectedVariant === 'product' ? 'bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full inline-block' : 'text-white/80'}`}>
                  {currency} {price}
                </p>
              )}
            </motion.div>
          </div>

          {/* Content Section - Conditional based on variant */}
          {includeBottomPart && selectedVariant !== 'event' && (
            <div className={`p-4 space-y-4 ${selectedVariant === 'product' ? 'bg-white' : 'bg-opacity-90'}`}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="prose dark:prose-invert max-w-none"
              >
                <h2 className="text-2xl md:text-3xl mb-2">Description</h2>
                <div className="text-slate-600 border-l-4 border-slate-200 p-2 bg-stone-300/15">
                  {largeDescription}
                </div>
              </motion.div>
              <div className={`text-xs w-fit px-1.5 rounded-full py-1 ${selectedVariant === 'product' ? 'bg-slate-800 text-white' : 'bg-stone-300 text-stone-50'}`}>
                Adisa Made It+
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Card Variants Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mt-12">
        {/* Business Card Variant */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ y: -5 }}
          className={`bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer ${selectedVariant === 'business' ? 'ring-4 ring-blue-500' : ''}`}
          onClick={() => setSelectedVariant('business')}
        >
          <div className="relative h-[400px]">
            <Image
              src={pic}
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
          className={`bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-xl overflow-hidden cursor-pointer ${selectedVariant === 'event' ? 'ring-4 ring-blue-500' : ''}`}
          onClick={() => setSelectedVariant('event')}
        >
          <div className="relative h-[400px]">
            <Image
              src={pic}
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
          className={`bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl shadow-xl overflow-hidden cursor-pointer ${selectedVariant === 'product' ? 'ring-4 ring-blue-500' : ''}`}
          onClick={() => setSelectedVariant('product')}
        >
          <div className="relative h-[400px]">
            <Image
              src={pic}
              alt="Product Showcase"
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

        {/* VIP Pass Variant */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ y: -5 }}
          transition={{ delay: 0.6 }}
          className={`bg-gradient-to-br from-gold to-yellow-500 rounded-3xl shadow-xl overflow-hidden cursor-pointer ${selectedVariant === 'vip' ? 'ring-4 ring-blue-500' : ''}`}
          onClick={() => setSelectedVariant('vip')}
        >
          <div className="relative h-[400px]">
            <Image
              src={pic}
              alt="VIP Pass"
              fill
              className="object-cover"
              priority
            />
            <motion.div className="absolute bottom-0 p-6 w-full">
              <h3 className="text-4xl font-extrabold text-white mb-2">VIP Access</h3>
              <p className="text-xl text-white/90">Exclusive Event</p>
              <p className="text-lg text-white font-semibold mt-2">$2,499</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Premium Card Variant */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ y: -5 }}
          transition={{ delay: 0.8 }}
          className={`bg-gradient-to-br from-black to-gray-800 rounded-3xl shadow-xl overflow-hidden cursor-pointer ${selectedVariant === 'premium' ? 'ring-4 ring-blue-500' : ''}`}
          onClick={() => setSelectedVariant('premium')}
        >
          <div className="relative h-[400px]">
            <Image
              src={pic}
              alt="Premium Card"
              fill
              className="object-cover"
              priority
            />
            <motion.div className="absolute bottom-0 p-6 w-full">
              <h3 className="text-4xl font-light text-white mb-2">Premium Membership</h3>
              <p className="text-xl text-white/90">Exclusive Benefits</p>
              <p className="text-lg text-white font-semibold mt-2">$3,999</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateCard;