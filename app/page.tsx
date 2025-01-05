'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
      <div className="max-w-4xl mx-auto bg-white  rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-stone-950">Create Your Card</h1>
        <div className="space-y-6">
          <div>
            <label className="block text-stone-950 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full p-2 rounded-lg border border-slate-300  bg-white  text-slate-900 "
            />
          </div>
          <div>
            <label className="block text-stone-950 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              title="Enter description"
              placeholder="Enter description"
              className="w-full p-2 rounded-lg border border-slate-300  bg-white  text-slate-900 "
            />
          </div>
          <div>
            <label className="block text-stone-950 mb-2">Large Description</label>
            <textarea
              value={largeDescription}
              onChange={(e) => setLargeDescription(e.target.value)}
              title="Enter large description"
              placeholder="Enter large description"
              className="w-full p-2 rounded-lg border border-slate-300  bg-white  text-slate-900 "
            />
          </div>
          <div>
            <label className="block text-stone-950 mb-2">Main Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'main')}
              title="Upload Image"
              className="w-full p-2 rounded-lg border border-slate-300  bg-white  text-slate-900 "
            />
          </div>
          <div>
            <label className="block text-stone-950 mb-2">Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'logo')}
              title="Upload Logo"
              className="w-full p-2 rounded-lg border border-slate-300  bg-white  text-slate-900 "
            />
          </div>
          <div>
            <label className="block text-stone-950 mb-2">QR Code URL</label>
            <input
              type="text"
              value={qrUrl}
              onChange={(e) => setQrUrl(e.target.value)}
              placeholder="Enter URL for QR Code"
              className="w-full p-2 rounded-lg border border-slate-300  bg-white  text-slate-900 "
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
                className="w-full p-2 rounded-lg border border-slate-300  bg-white  text-slate-900 "
              />
              <select
                title="Select currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="p-2 rounded-lg border border-slate-300  bg-white  text-slate-900 "
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
              className="w-6 h-6 rounded-lg border border-slate-300  bg-white  text-slate-900 "
            />
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
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Card Hero */}
          <div className="relative h-[400px]">
            {image && (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute top-2 right-2 flex flex-col space-y-2">
              {logo && (
                <Image
                  src={logo}
                  alt="Logo"
                  width={50}
                  height={50}
                  className="rounded-full border border-white shadow-lg"
                />
              )}
              {qrUrl && <QRCodeSVG value={qrUrl} size={50} />}
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent"
            >
              <h1 className="text-4xl md:text-6xl font-mono text-white mb-2 tracking-tight">{title}</h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl font-light">{description}</p>
              <p className="text-lg md:text-xl text-white/80 font-semibold mt-2">
              {currency} {price} 
              </p>
            </motion.div>
          </div>

          {/* Content Section */}
          {includeBottomPart && (
            <div className="p-4 space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="prose dark:prose-invert max-w-none"
              >
                <h2 className="text-2xl md:text-3xl mb-2">Description</h2>
                <blockquote className="text-slate-600 border-l-4border-slate-200 p-2 bg-stone-300/15 ">
                  {largeDescription}
                </blockquote>
              </motion.div>
              <div className=" text-xs  text-stone-300">
            Adisa Made It
          </div>
            </div>
          )}

          {/* Watermark */}
          
        </motion.div>
      </div>
    </div>
  );
};

export default CreateCard;