"use client";
import { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import place from "@/public/12.jpg"

// Update card variants
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
    titleFont: "font-sans",
    layout: "product"
  },
  invoice: {
    gradient: "bg-gradient-to-br from-gray-100 to-white",
    titleFont: "font-sans",
    layout: "invoice"
  },
  receipt: {
    gradient: "bg-white",
    titleFont: "font-mono",
    layout: "receipt"
  },
  einvoice: {
    gradient: "bg-gradient-to-br from-green-500 to-green-700",
    titleFont: "font-sans",
    layout: "einvoice"
  }
};

// Add currency options
const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'NGN', label: 'NGN' },
  { value: 'GHS', label: 'GHS' },
  { value: 'KES', label: 'KES' }
];

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
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [items, setItems] = useState([{ description: '', amount: 0 }]);
  const [taxRate, setTaxRate] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [showBottomPart, setShowBottomPart] = useState(true);
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventType, setEventType] = useState('General Admission');
  type VariantType = 'business' | 'event' | 'product' | 'invoice' | 'receipt' | 'einvoice';
  const [selectedVariant, setSelectedVariant] = useState<VariantType>('business');
  const cardRef = useRef<HTMLDivElement>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === '3090') {
      setIsAuthenticated(true);
      // Optional: Save to localStorage to persist login
      localStorage.setItem('isAuth', 'true');
    } else {
      alert('Incorrect password');
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('isAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full m-4"
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Enter Password</h1>
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 rounded-lg border border-gray-300"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Access Card Creator
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

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

  // Add error handling for image generation
  const generateImage = async () => {
    if (!cardRef.current) return;
    setIsLoading(true);
    try {
      const content = cardRef.current;
      const dataUrl = await toPng(content, {
        quality: 10,
        pixelRatio: window.devicePixelRatio || 10,
        width: content.offsetWidth,
        height: content.offsetHeight,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
      });
      const link = document.createElement('a');
      link.download = `${title || 'card'}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    if (!cardRef.current) return;
    const printContent = cardRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  // Utility function to format currency
  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-stone-950">Create Your Card</h1>
        <div className="space-y-6">
          {/* Other Inputs */}

          {/* Select Card Type */}
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
              <option value="invoice">Invoice</option>
              <option value="receipt">Receipt</option>
              <option value="einvoice">E-Invoice</option>
            </select>
          </div>

          {/* Conditional Inputs based on Variant */}
          {(selectedVariant === 'invoice' || selectedVariant === 'receipt' || selectedVariant === 'einvoice') && (
            <div className="space-y-4">
              <div>
                <label className="block text-stone-950 mb-2">
                  {selectedVariant === 'invoice' || selectedVariant === 'einvoice' ? 'Invoice Number' : 'Receipt Number'}
                </label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                />
              </div>
              
              <div>
                <label className="block text-stone-950 mb-2">Items</label>
                {items.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].description = e.target.value;
                        setItems(newItems);
                      }}
                      title="Enter item description"
                      placeholder="Description"
                      className="flex-1 p-2 rounded-lg border border-slate-300"
                    />
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].amount = parseFloat(e.target.value);
                        setItems(newItems);
                      }}
                      title="Enter item amount"
                      placeholder="Amount"
                      className="w-32 p-2 rounded-lg border border-slate-300"
                    />
                    <button
                      onClick={() => {
                        const newItems = items.filter((_, i) => i !== index);
                        setItems(newItems);
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setItems([...items, { description: '', amount: 0 }])}
                  className="text-blue-500 hover:text-blue-600"
                >
                  + Add Item
                </button>
              </div>

              {(selectedVariant === 'invoice' || selectedVariant === 'einvoice') && (
                <>
                  <div>
                    <label className="block text-stone-950 mb-2">Tax Rate (%)</label>
                    <input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value))}
                      className="w-full p-2 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-950 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300"
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-stone-950 mb-2">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300"
                >
                  {currencyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Base form fields for all variants */}
          <div className="space-y-6">
            <div>
              <label className="block text-stone-950 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300"
                title="Enter the title"
                placeholder="Enter a title"
              />
            </div>
            <div>
              <label className="block text-stone-950 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300"
                title="Enter the description"
                placeholder="Enter a description"
              />
            </div>
            
            {/* Product specific fields */}
            {(selectedVariant === 'product' || selectedVariant === 'business') && (
              <>
                <div>
                  <label className="block text-stone-950 mb-2">Price</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300"
                    />
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-32 p-2 rounded-lg border border-slate-300"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="NGN">NGN</option>
                      <option value="GHC">GHC</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-stone-950 mb-2">Product Features</label>
                  <textarea
                    value={largeDescription}
                    onChange={(e) => setLargeDescription(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300"
                    rows={4}
                  />
                </div>
              </>
            )}

            {/* Event specific fields */}
            {selectedVariant === 'event' && (
              <>
                <div>
                  <label className="block text-stone-950 mb-2">Event Date</label>
                  <input
                    type="datetime-local"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-stone-950 mb-2">Location</label>
                  <input
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-stone-950 mb-2">Event Type</label>
                  <input
                    type="text"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
              </>
            )}

            {/* Invoice/Receipt/E-Invoice fields */}
            {(selectedVariant === 'invoice' || selectedVariant === 'receipt' || selectedVariant === 'einvoice') && (
              <>
                <div>
                  <label className="block text-stone-950 mb-2">
                    {selectedVariant === 'receipt' ? 'Receipt Number' : 'Invoice Number'}
                  </label>
                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300"
                    title="Enter invoice number"
                    placeholder="Invoice Number"
                  />
                </div>
                <div>
                  <label className="block text-stone-950 mb-2">Items</label>
                  {items.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[index].description = e.target.value;
                          setItems(newItems);
                        }}
                        placeholder="Description"
                        className="flex-1 p-2 rounded-lg border border-slate-300"
                      />
                      <input
                        type="number"
                        value={item.amount}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[index].amount = parseFloat(e.target.value);
                          setItems(newItems);
                        }}
                        placeholder="Amount"
                        className="w-32 p-2 rounded-lg border border-slate-300"
                      />
                      <button
                        onClick={() => {
                          const newItems = items.filter((_, i) => i !== index);
                          setItems(newItems);
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setItems([...items, { description: '', amount: 0 }])}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    + Add Item
                  </button>
                </div>
                {selectedVariant !== 'receipt' && (
                  <>
                    <div>
                      <label className="block text-stone-950 mb-2">Due Date</label>
                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-950 mb-2">Tax Rate (%)</label>
                      <input
                        type="number"
                        value={taxRate}
                        onChange={(e) => setTaxRate(parseFloat(e.target.value))}
                        className="w-full p-2 rounded-lg border border-slate-300"
                      />
                    </div>
                  </>
                )}
              </>
            )}

            {/* Common fields for all variants */}
            <div>
              <label className="block text-stone-950 mb-2">Upload Image</label>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, 'main')}
                className="w-full p-2 rounded-lg border border-slate-300"
                title="Upload an image"
                placeholder="Upload an image"
              />
            </div>
            <div>
              <label className="block text-stone-950 mb-2">Upload Logo</label>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, 'logo')}
                className="w-full p-2 rounded-lg border border-slate-300"
                title="Upload a logo"
                placeholder="Upload a logo"
              />
            </div>
            <div>
              <label className="block text-stone-950 mb-2">QR Code URL</label>
              <input
                type="text"
                value={qrUrl}
                onChange={(e) => setQrUrl(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300"
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <label className="text-stone-950">Show Bottom Section</label>
              <input
                type="checkbox"
                checked={showBottomPart}
                onChange={(e) => setShowBottomPart(e.target.checked)}
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-6 space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateImage}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Card'}
          </motion.button>
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrint}
            className="bg-gray-600 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-all duration-300"
          >
            Print Page
          </motion.button> */}
        </div>
      </div>

      {/* Add responsive card container */}
      <div className="mt-12 max-w-5xl mx-auto lg:max-w-4xl">
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`
            ${cardVariants[selectedVariant]?.gradient} 
            rounded-[20px] 
            shadow-[0_8px_32px_rgba(0,0,0,0.15)] 
            backdrop-blur-xl 
            overflow-hidden 
            w-full
          `}
        >
          {/* Card Hero with responsive height */}
          <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px]">
            {image ? (
                <Image
    src={image || place } // Set default image
    alt={title || 'Card Image'}
    fill
    className={`object-cover transition-transform duration-700 ${
      selectedVariant === 'event' ? 'opacity-80' : ''
    }`}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    priority
    onError={(e) => {
      console.error('Image failed to load');
      e.currentTarget.src = '/12.jpg';
    }}
  />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <Image
    src={place || place } // Set default image
    alt={title || 'Card Image'}
    fill
    className={`object-cover transition-transform duration-700 ${
      selectedVariant === 'event' ? 'opacity-80' : ''
    }`}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    priority
    onError={(e) => {
      console.error('Image failed to load');
      e.currentTarget.src = '/12.jpg';
    }}
  />
              </div>
            )}

            {/* Responsive text sizing */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-0 p-4 sm:p-6 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent"
            >
              <h1 className={`text-xl  md:text-6xl ${cardVariants[selectedVariant]?.titleFont} text-white mb-2 tracking-tight`}>
                {title || 'Untitled'}
              </h1>
              <p className="text-base sm:text-xl md:text-2xl text-white/80 max-w-3xl font-light line-clamp-2 sm:line-clamp-none">
                {description}
              </p>
            </motion.div>

            {/* Responsive logo and QR positioning */}
            <div className="absolute top-2 right-2 flex flex-col space-y-2 scale-75 sm:scale-100">
              {logo && (
                <div className="relative w-12 h-12 sm:w-[50px] sm:h-[50px]">
                  <Image
                    src={logo}
                    alt="Logo"
                    fill
                    className="rounded-full border border-white shadow-lg object-cover"
                  />
                </div>
              )}
              {qrUrl && (
                <div className="bg-white/90 p-1 rounded-lg">
                  <QRCodeSVG value={qrUrl} size={40} className="sm:w-[50px] sm:h-[50px]" />
                </div>
              )}
            </div>
          </div>

          {/* Update the card content section */}
          {showBottomPart && (
            <div className={`p-3 ${selectedVariant === 'product' ? 'bg-white/95' : ''}`}>
              {/* Product Variant */}
              {selectedVariant === 'product' && (
                <div className="space-y-6 bg-white/95 p-4 rounded-2xl shadow-lg">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <h3 className="text-3xl font-bold text-stone-950">{title}</h3>
                      <p className="text-2xl font-semibold bg-stone-500/30 text-stone-950/80 px-4 py-2 rounded-full inline-block">
                        {formatCurrency(parseFloat(price), currency)}
                      </p>
                    </div>
                    {qrUrl && (
                      <div className="bg-white p-3 rounded-xl shadow-md">
                        <QRCodeSVG value={qrUrl} size={80} />
                      </div>
                    )}
                  </div>
                  <div className="prose max-w-none">
                    <p className="text-lg text-stone-950 leading-relaxed">{description}</p>
                    <div className="mt-6 bg-gray-50 p-4 rounded-xl">
                      <h4 className="text-xl font-semibold text-stone-950 mb-4">Product Details</h4>
                      <p className="text-stone-950 whitespace-pre-line">{largeDescription}</p>
                      
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <div className="text-xs w-fit px-2 py-1 rounded-full bg-slate-800 text-white">
                      Kardify Me+
                    </div>
                  </div>
                </div>
              )}
               {/* Business Variant */}
    {selectedVariant === 'business' && (
      <div className="space-y-6 bg-white/95 p-4 rounded-2xl shadow-lg">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <h3 className="text-3xl font-bold text-stone-950">{title}</h3>
            <p className="text-xl font-medium text-stone-950">{description}</p>
          </div>
          {qrUrl && (
            <div className="bg-white p-2 rounded-xl shadow-md">
              <QRCodeSVG value={qrUrl} size={80} />
            </div>
          )}
        </div>
        <div className="prose max-w-full">
          <p className="text-lg text-stone-950 whitespace-pre-line leading-relaxed">{largeDescription}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <div className="text-xs w-fit px-2 py-1 rounded-full bg-slate-800 text-white">
            Kardify Me+
          </div>
        </div>
      </div>
    )}

              {/* Event Variant */}
              {selectedVariant === 'event' && (
                <div className="bg-white/95 p-4 rounded-2xl shadow-lg">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-purple-900">{title}</h3>
                      <div className="space-y-3">
                        <p className="flex items-center text-lg text-stone-950">
                          <span className="bg-purple-50 p-2 rounded-lg mr-3">📅</span>
                          {new Date(eventDate).toLocaleString()}
                        </p>
                        <p className="flex items-center text-lg text-stone-950">
                          <span className="bg-purple-50 p-2 rounded-lg mr-3">📍</span>
                          {eventLocation}
                        </p>
                        {price && (
                          <p className="flex items-center text-lg text-stone-950">
                            <span className="bg-purple-50 p-2 rounded-lg mr-3">💰</span>
                            {formatCurrency(parseFloat(price), currency)}
                          </p>
                        )}
                      </div>
                    </div>
                    {qrUrl && (
                      <div className="text-center bg-white p-4 rounded-xl shadow-md">
                        <QRCodeSVG value={qrUrl} size={100} />
                        <p className="text-sm text-stone-950 mt-2">Scan to verify</p>
                      </div>
                    )}
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <h4 className="text-xl font-semibold text-purple-900 mb-3">Event Details</h4>
                    <p className="text-stone-950 whitespace-pre-line">{description}</p>
                    {largeDescription && (
                      <div className="mt-4 text-stone-950 whitespace-pre-line">{largeDescription}</div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <div className="text-xs w-fit px-2 py-1 rounded-full bg-purple-600 text-white">
                      Kardify Me+
                    </div>
                  </div>
                </div>
              )}

              {/* Invoice/Receipt/E-Invoice Variants */}
              {(selectedVariant === 'invoice' || selectedVariant === 'receipt' || selectedVariant === 'einvoice') && (
                <div className="bg-white p-4 rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-stone-950">
                        {selectedVariant === 'receipt' ? 'Receipt' : 'Invoice'} #{invoiceNumber}
                      </h3>
                      <p className="text-sm text-stone-950">Date: {new Date().toLocaleDateString()}</p>
                      {dueDate && <p className="text-sm text-stone-950">Due: {dueDate}</p>}
                    </div>
                    {qrUrl && <QRCodeSVG value={qrUrl} size={60} className="bg-white p-1 rounded-lg" />}
                  </div>

                  <div className="space-y-2">
                    {items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex justify-between items-center p-4 backdrop-blur-md bg-white/5 rounded-2xl mb-2 hover:bg-white/10 transition-all duration-300"
                      >
                        <span className="text-stone-950 font-medium">{item.description}</span>
                        <span className="text-stone-950 font-semibold">
                          {formatCurrency(item.amount, currency)}
                        </span>
                      </motion.div>
                    ))}

                    <div className="border-t border-white/10 pt-4 mt-6">
                      {taxRate > 0 && (
                        <motion.div 
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="flex justify-between text-stone-950 mb-2"
                        >
                          <span>Tax ({taxRate}%)</span>
                          <span>{formatCurrency(items.reduce((sum, item) => sum + item.amount, 0) * (taxRate / 100), currency)}</span>
                        </motion.div>
                      )}
                      <motion.div 
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-between font-bold text-stone-950 text-xl mt-2 bg-white p-4 rounded-2xl shadow-md"
                      >
                        <span>Total</span>
                        <span>
                          {formatCurrency(items.reduce((sum, item) => sum + item.amount, 0) * (1 + taxRate / 100), currency)}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <div className="text-xs w-fit px-2 py-1 rounded-full bg-blue-600 text-white">
                      Kardify Me+
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Add modern call-to-action buttons */}
        {/* <div className="flex justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateImage}
            className="
              bg-gradient-to-r from-blue-600 to-blue-700
              text-white px-8 py-4 rounded-2xl
              font-medium shadow-lg shadow-blue-500/25
              hover:shadow-blue-500/40 transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Download Card'}
          </motion.button>
        </div> */}
      </div>
    </div>
  );
};

export default CreateCard;
