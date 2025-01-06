'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
  type VariantType = 'business' | 'event' | 'product';
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
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-stone-950">Create Your Card</h1>
        <div className="space-y-6">
          <div>
            <label className="block text-stone-950 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
            />
          </div>
          <div>
            <label className="block text-stone-950 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              title="Enter description"
              placeholder="Enter description"
              className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
            />
          </div>
          <div>
            <label className="block text-stone-950 mb-2">Large Description</label>
            <textarea
              value={largeDescription}
              onChange={(e) => setLargeDescription(e.target.value)}
              title="Enter large description"
              placeholder="Enter large description"
              className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
            />
          </div>
          <div>
            <label className="block text-stone-950 mb-2">Main Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'main')}
              title="Upload Image"
              className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
            />
          </div>
          <div>
            <label className="block text-stone-950 mb-2">Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'logo')}
              title="Upload Logo"
              className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
            />
          </div>
          <div>
            <label className="block text-stone-950 mb-2">QR Code URL</label>
            <input
              type="text"
              value={qrUrl}
              onChange={(e) => setQrUrl(e.target.value)}
              placeholder="Enter URL for QR Code"
              className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
            />
          </div>
          <div>
            <label className="block text-stone-950 mb-2">Price</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
              />
              <select
                title="Select currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
              >
                <option value="USD">USD</option>
                <option value="NGN">NGN</option>
                <option value="">None</option>
                <option value="GHS">GHS</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
          <div className="flex items-center">
            <label className="block text-stone-950 mb-2 mr-4">Include Bottom Part</label>
            <input
              type="checkbox"
              checked={includeBottomPart}
              onChange={(e) => setIncludeBottomPart(e.target.checked)}
              title="Include Bottom Part"
              placeholder="Include Bottom Part"
              className="w-6 h-6 rounded-lg border border-slate-300 bg-white text-slate-900"
            />
          </div>
          <div>
            <label className="block text-stone-950 mb-2">Card Type</label>
            <select
              title="Select card type"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value as VariantType)}
              className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
            >
              <option value="business">Business Card</option>
              <option value="event">Event Ticket</option>
              <option value="product">Product Showcase</option>
            </select>
          </div>
        </div>
        <div className="text-center mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateImage}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300"
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
                className={`object-cover transition-transform duration-700 ${
                  selectedVariant === 'event' ? 'opacity-80' : ''
                }`}
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
                  className={`rounded-full border border-white shadow-lg ${
                    selectedVariant === 'product' ? 'bg-white/90' : ''
                  }`}
                />
              )}
              {qrUrl && (
                <div className={`${
                  selectedVariant === 'event' ? 'bg-white/90 p-2 rounded-lg' : ''
                }`}>
                  <QRCodeSVG value={qrUrl} size={50} />
                </div>
              )}
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`absolute bottom-0 p-6 w-full ${
                selectedVariant === 'event' 
                  ? 'bg-gradient-to-t from-purple-900/90 to-transparent'
                  : 'bg-gradient-to-t from-black/80 via-black/50 to-transparent'
              }`}>
              <h1 className={`text-4xl md:text-6xl ${cardVariants[selectedVariant]?.titleFont} text-white mb-2 tracking-tight`}>
                {title}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl font-light">
                {description}
              </p>
              {price && (
                <p className={`text-lg md:text-xl font-semibold mt-2 ${
                  selectedVariant === 'product' 
                    ? 'bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full inline-block'
                    : 'text-white/80'
                }`}>
                  {currency} {price}
                </p>
              )}
            </motion.div>
          </div>

          {/* Content Section - Conditional based on variant */}
          {includeBottomPart && selectedVariant !== 'event' && (
            <div className={`p-4 space-y-4 ${
              selectedVariant === 'product' ? 'bg-white' : 'bg-opacity-90'
            }`}>
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
              <div className={`text-xs w-fit px-1.5 rounded-full py-1 ${
                selectedVariant === 'product' 
                  ? 'bg-slate-800 text-white' 
                  : 'bg-stone-300 text-stone-50'
              }`}>
                Adisa Made It+
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Card Variants Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
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
          className={`bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-xl overflow-hidden cursor-pointer ${selectedVariant === 'event' ? 'ring-4 ring-blue-500' : ''}`}
          onClick={() => setSelectedVariant('event')}
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
          className={`bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl shadow-xl overflow-hidden cursor-pointer ${selectedVariant === 'product' ? 'ring-4 ring-blue-500' : ''}`}
          onClick={() => setSelectedVariant('product')}
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
    </div>
  );
};

export default CreateCard;