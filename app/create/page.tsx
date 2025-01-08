'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import pic from "@/public/12.jpg";

const cardVariants = {
  business: {
    gradient: "bg-gradient-to-br from-slate-900 via-blue-800 to-slate-900",
    hoverGradient: "hover:from-slate-800 hover:via-blue-700 hover:to-slate-800",
    titleFont: "font-mono",
    layout: "business"
  },
  event: {
    gradient: "bg-gradient-to-br from-fuchsia-600 via-pink-500 to-purple-600", 
    hoverGradient: "hover:from-fuchsia-500 hover:via-pink-400 hover:to-purple-500",
    titleFont: "font-bold",
    layout: "ticket"
  },
  product: {
    gradient: "bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-600",
    hoverGradient: "hover:from-emerald-500 hover:via-teal-400 hover:to-cyan-500", 
    titleFont: "font-serif",
    layout: "product"
  },
  vip: {
    gradient: "bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500",
    hoverGradient: "hover:from-amber-300 hover:via-yellow-400 hover:to-orange-400",
    titleFont: "font-extrabold",
    layout: "vip"
  },
  premium: {
    gradient: "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900",
    hoverGradient: "hover:from-gray-800 hover:via-slate-700 hover:to-gray-800",
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
  const [currency, setCurrency] = useState('₦');
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
  

  const formattedPrice = price
  ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, 
    maximumFractionDigits: 4  })
      .formatToParts(Number(price))
      .map((part) =>
        part.type === 'currency' ? currency : part.value
      )
      .join('')
  : '';


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
      className="w-full px-4 py-3.5 bg-white/70 backdrop-blur-md border border-slate-300 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none shadow-sm"
    />
  </div>
  <div className="relative group space-y-2">
    <label className="block text-sm font-medium text-slate-700 transition-all duration-200 mb-1 group-hover:text-slate-900 group-focus-within:text-blue-600">Description</label>
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      title="Enter description"
      placeholder="Enter description"
      className="w-full px-4 py-3.5 bg-white/70 backdrop-blur-md border border-slate-300 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none min-h-[120px] resize-none shadow-sm"
    />
  </div>
  <div className="relative group space-y-2">
    <label className="block text-sm font-medium text-slate-700 transition-all duration-200 mb-1 group-hover:text-slate-900 group-focus-within:text-blue-600">Large Description</label>
    <textarea
      value={largeDescription}
      onChange={(e) => setLargeDescription(e.target.value)}
      title="Enter large description"
      placeholder="Enter large description"
      className="w-full px-4 py-3.5 bg-white/70 backdrop-blur-md border border-slate-300 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none min-h-[120px] resize-none shadow-sm"
    />
  </div>
  <div className="relative group space-y-2">
    <label className="block text-sm font-medium text-slate-700 transition-all duration-200 mb-1 group-hover:text-slate-900 group-focus-within:text-blue-600">Main Image</label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageChange(e, 'main')}
      title="Upload Image"
      className="w-full px-4 py-3.5 bg-white/70 backdrop-blur-md border border-slate-300 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none shadow-sm"
    />
  </div>
  <div className="relative group space-y-2">
    <label className="block text-sm font-medium text-slate-700 transition-all duration-200 mb-1 group-hover:text-slate-900 group-focus-within:text-blue-600">Logo</label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageChange(e, 'logo')}
      title="Upload Logo"
      className="w-full px-4 py-3.5 bg-white/70 backdrop-blur-md border border-slate-300 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none shadow-sm"
    />
  </div>
  <div className="relative group space-y-2">
    <label className="block text-sm font-medium text-slate-700 transition-all duration-200 mb-1 group-hover:text-slate-900 group-focus-within:text-blue-600">QR Code URL</label>
    <input
      type="text"
      value={qrUrl}
      onChange={(e) => setQrUrl(e.target.value)}
      placeholder="Enter URL for QR Code"
      className="w-full px-4 py-3.5 bg-white/70 backdrop-blur-md border border-slate-300 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none shadow-sm"
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
        className="w-full px-4 py-3.5 bg-white/70 backdrop-blur-md border border-slate-300 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none shadow-sm"
      />
      <select
        title="Select currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="px-4 py-3.5 bg-white/70 backdrop-blur-md border border-slate-300 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none shadow-sm"
      >
        <option value="$">$</option>
        <option value="₦">₦</option>
        <option value="£">£</option>
        <option value="€">€</option>
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
      className="w-full px-4 py-3.5 bg-white/70 backdrop-blur-md border border-slate-300 rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none shadow-sm"
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
          <div className="relative h-[250px]">
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
              className={`absolute bottom-0 pb-4 p-3 w-full ${selectedVariant === 'event' ? 'bg-gradient-to-t from-purple-900/90 to-transparent' : 'bg-gradient-to-t from-black/80 via-black/50 to-transparent'}`}
            >
              <h1 className={`text-4xl md:text-3xl ${cardVariants[selectedVariant]?.titleFont} text-white mb-2 tracking-tight`}>
                {title}
              </h1>
              <p className="text-xl md:text-xl text-white/80 max-w-3xl font-light">
                {description}
              </p>
              {price && (
  <p className={`text-sm md:text-xl font-semibold mt-2 w-fit ${selectedVariant === 'product' ? 'bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full inline-block' : 'bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full inline-bloc'}`}>
    {formattedPrice}
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
                <div className="flex items-center justify-between">
  <h2 className="text-2xl md:text-3xl mb-2">Description</h2>
  {price && (
    <p className={`text-lg md:text-xl font-semibold mt-2 ${selectedVariant === 'product' ? 'bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full inline-block' : 'text-white/80'}`}>
      {formattedPrice}
    </p>
  )}
</div>
                <div className="text-slate-600 border-l-4 whitespace-pre-line border-slate-200 p-2 bg-stone-300/15">
                  {largeDescription}
                </div>
              </motion.div>

              <div className=" flex items-center justify-end w-full">
              {qrUrl && (
                <div className={`${selectedVariant === 'product' ? 'bg-white/90 p-2 rounded-lg' : ''}`}>
                  <QRCodeSVG value={qrUrl} size={80} />
                </div>
              )}
              </div>

              <div className={`text-xs w-full  text-center px-1.5 rounded-full py-1 ${selectedVariant === 'product' ? 'bg-slate-800 text-white' : 'bg-stone-300 text-stone-950'}`}>
                KardifyMe
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Card Variants Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mt-12">
        {Object.entries(cardVariants).map(([variant, styles]) => (
          <motion.div
            key={variant}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
            className={`
              relative group overflow-hidden
              bg-gradient-to-br ${styles.gradient}
              hover:${styles.hoverGradient}
              rounded-3xl shadow-xl cursor-pointer
              transition-all duration-300
              ${selectedVariant === variant ? 'ring-4 ring-blue-500 scale-105' : ''}
            `}
            onClick={() => setSelectedVariant(variant as VariantType)}
          >
            <div className="relative h-[400px]">
              <Image
                src={pic}
                alt={variant}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Variant-specific overlays */}
              {variant === 'vip' && (
                <div className="absolute top-4 right-4 bg-yellow-500/20 backdrop-blur-sm p-3 rounded-full">
                  <span className="text-yellow-300 font-bold">VIP</span>
                </div>
              )}

              {variant === 'premium' && (
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full">
                  <span className="text-white/90 font-light tracking-wider">PREMIUM</span>
                </div>
              )}

              <motion.div 
                className="absolute bottom-0 p-6 w-full"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className={`text-3xl ${styles.titleFont} text-white mb-2 tracking-tight`}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </h3>
                <p className="text-lg text-white/80">
                  Premium {variant.charAt(0).toUpperCase() + variant.slice(1)} Template
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="h-1 w-12 bg-white/30 rounded-full" />
                  <div className="h-1 w-8 bg-white/20 rounded-full" />
                  <div className="h-1 w-4 bg-white/10 rounded-full" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CreateCard;