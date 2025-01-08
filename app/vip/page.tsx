"use client";
import { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import place from "@/public/12.jpg"
import SignatureCanvas from 'react-signature-canvas';
import type ReactSignatureCanvas from 'react-signature-canvas';



// Update card variants
const cardVariants = {
  business: {
    gradient: "bg-white/40",
    titleFont: "font-mono",
    layout: "business"
  },
  event: {
    gradient: "bg-gradient-to-br from-blue-500 to-pink-500",
    titleFont: "font-bold",
    layout: "ticket"
  },
  product: {
    gradient: "bg-gradient-to-br from-slate-800 to-slate-900",
    titleFont: "font-sans",
    layout: "product"
  },
  invoice: {
    gradient: "backdrop-blur-2xl bg-stone-600/30 ",
    titleFont: "font-sans",
    layout: "invoice"
  },
  receipt: {
    gradient: "backdrop-blur-2xl bg-white/20 ",
    titleFont: "font-mono",
    layout: "receipt"
  },
  einvoice: {
    gradient: "bg-gradient-to-tl from-orange-500 to-purple-700",
    titleFont: "font-sans",
    layout: "einvoice"
  },
  flyer: {
    gradient: "bg-gradient-to-br from-yellow-500 to-red-500",
    titleFont: "font-sans",
    layout: "flyer"
  },
  recipe: {
    gradient: "bg-gradient-to-br from-emerald-500 to-teal-700",
    titleFont: "font-mono",
    layout: "recipe"
  },
  contract: {
    gradient: "bg-gradient-to-br from-blue-900 to-indigo-900",
    titleFont: "font-mono",
    layout: "contract"
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
  type VariantType = 'business' | 'event' | 'product' | 'invoice' | 'receipt' | 'einvoice' | 'flyer' | 'recipe' | 'contract';
  const [selectedVariant, setSelectedVariant] = useState<VariantType>('business');
  const cardRef = useRef<HTMLDivElement>(null);
  const [cookingTime, setCookingTime] = useState('');
const [servings, setServings] = useState('');
const [ingredients, setIngredients] = useState([{ item: '', amount: '' }]);
const [instructions, setInstructions] = useState([{ step: '' }]);
const [difficulty, setDifficulty] = useState('medium');
const [chefTips, setChefTips] = useState('');
const [profilePicture, setProfilePicture] = useState('');
const [contractAddress, setContractAddress] = useState('');
const [network, setNetwork] = useState('Ethereum');
const [contractType, setContractType] = useState('ERC20');
const [validUntil, setValidUntil] = useState('');
const [contractDetails, setContractDetails] = useState([{ key: '', value: '' }]);
const [witnesses, setWitnesses] = useState([{ name: '', signature: '' }]);
const [party1Name, setParty1Name] = useState('');
const [party2Name, setParty2Name] = useState('');
const [party1Sign, setParty1Sign] = useState('');
const [party2Sign, setParty2Sign] = useState('');
const [contractTerms, setContractTerms] = useState('');
const [contractDate, setContractDate] = useState('');
const [contractValue, setContractValue] = useState('');

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [party1Signature, setParty1Signature] = useState('');
const [party2Signature, setParty2Signature] = useState('');

// Import the type from react-signature-canvas

// Refs for signature canvases
const party1SigCanvas = useRef<ReactSignatureCanvas>(null);
const party2SigCanvas = useRef<ReactSignatureCanvas>(null);

// Function to clear signature
const clearSignature = (sigCanvas: React.RefObject<ReactSignatureCanvas | null>): void => {
  if (sigCanvas.current) {
    sigCanvas.current.clear();
  }
};

type SetSignatureFunction = (signature: string) => void;

const saveSignature = (
  sigCanvas: React.RefObject<ReactSignatureCanvas | null>, 
  setSignature: SetSignatureFunction
): void => {
  if (sigCanvas.current) {
    setSignature(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
  }
};



  const CURRENT_PASSWORD = '4090';
  const PASSWORD_VERSION = '3'; // Increment this version whenever the password changes
  
  // Update handleLogin to check password version
  const handleLogin = () => {
    if (password === CURRENT_PASSWORD) {
      setIsAuthenticated(true);
      // Save to localStorage to persist login with version
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('passwordVersion', PASSWORD_VERSION);
    } else {
      alert('Incorrect password');
    }
  };
  

  
  // Add effect to check stored auth and version
  useEffect(() => {
    const auth = localStorage.getItem('isAuth');
    const storedVersion = localStorage.getItem('passwordVersion');
    if (auth === 'true' && storedVersion === PASSWORD_VERSION) {
      setIsAuthenticated(true);
    } else {
      // Clear auth if version mismatch
      localStorage.removeItem('isAuth');
      localStorage.removeItem('passwordVersion');
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

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
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
              <option value="flyer">E-Flyer</option>
              <option value="recipe">E-Recipe</option>
              <option value="contract">E-Contract</option>
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
                  <div>
      <label className="block text-stone-950 mb-2 font-medium">Invoice Details</label>
      <textarea
        value={largeDescription}
        onChange={(e) => setLargeDescription(e.target.value)}
        className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 transition-all min-h-[150px]"
        placeholder="Enter flyer details, features, or event information"
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

{/* Flyer Input Fields */}
{selectedVariant === 'flyer' && (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 transition-all"
          placeholder="Enter eye-catching title"
        />
      </div>
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Tagline</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 transition-all"
          placeholder="Add a captivating tagline"
        />
      </div>
    </div>

    <div>
      <label className="block text-stone-950 mb-2 font-medium">Main Content</label>
      <textarea
        value={largeDescription}
        onChange={(e) => setLargeDescription(e.target.value)}
        className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 transition-all min-h-[150px]"
        placeholder="Enter flyer details, features, or event information"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Price</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 transition-all"
            placeholder="Enter price"
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-32 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 transition-all"
          >
            {currencyOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-stone-950 mb-2 font-medium">QR Code URL</label>
        <input
          type="url"
          value={qrUrl}
          onChange={(e) => setQrUrl(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 transition-all"
          placeholder="Enter URL for QR code"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Upload Image</label>
        <input
          type="file"
          onChange={(e) => handleImageChange(e, 'main')}
          className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 transition-all"
          accept="image/*"
        />
      </div>
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Upload Logo</label>
        <input
          type="file"
          onChange={(e) => handleImageChange(e, 'logo')}
          className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 transition-all"
          accept="image/*"
        />
      </div>
    </div>
  </div>
)}

{/* Recipe Input Fields */}
{selectedVariant === 'recipe' && (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Cooking Time (mins)</label>
        <input
          type="number"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
          placeholder="45"
        />
      </div>
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Servings</label>
        <input
          type="number"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
          placeholder="4"
        />
      </div>
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>

    <div>
      <label className="block text-stone-950 mb-2 font-medium">Ingredients</label>
      {ingredients.map((ing, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            value={ing.item}
            onChange={(e) => {
              const newIngs = [...ingredients];
              newIngs[index].item = e.target.value;
              setIngredients(newIngs);
            }}
            className="flex-1 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
            placeholder="Ingredient"
          />
          <input
            type="text"
            value={ing.amount}
            onChange={(e) => {
              const newIngs = [...ingredients];
              newIngs[index].amount = e.target.value;
              setIngredients(newIngs);
            }}
            className="w-32 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
            placeholder="Amount"
          />
          <button
            onClick={() => setIngredients(ingredients.filter((_, i) => i !== index))}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
          >
            ×
          </button>
        </div>
      ))}
      <button
        onClick={() => setIngredients([...ingredients, { item: '', amount: '' }])}
        className="text-emerald-600 hover:text-emerald-700"
      >
        + Add Ingredient
      </button>
    </div>

    <div>
      <label className="block text-stone-950 mb-2 font-medium">Instructions</label>
      {instructions.map((inst, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            value={inst.step}
            onChange={(e) => {
              const newInst = [...instructions];
              newInst[index].step = e.target.value;
              setInstructions(newInst);
            }}
            className="flex-1 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
            placeholder={`Step ${index + 1}`}
          />
          <button
            onClick={() => setInstructions(instructions.filter((_, i) => i !== index))}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
          >
            ×
          </button>
        </div>
      ))}
      <button
        onClick={() => setInstructions([...instructions, { step: '' }])}
        className="text-emerald-600 hover:text-emerald-700"
      >
        + Add Step
      </button>
    </div>

    <div>
      <label className="block text-stone-950 mb-2 font-medium">Chef's Tips</label>
      <textarea
        value={chefTips}
        onChange={(e) => setChefTips(e.target.value)}
        className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 min-h-[100px]"
        placeholder="Share your cooking tips..."
      />
    </div>
  </div>
)}


{selectedVariant === 'contract' && (
  <div className="space-y-6">
    {/* Contract Details */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Contract Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300"
          placeholder="Enter contract title"
        />
      </div>
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Contract Date</label>
        <input
          type="date"
          value={contractDate}
          onChange={(e) => setContractDate(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300"
        />
      </div>
    </div>

    {/* Party Information */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Party 1 Name</label>
        <input
          type="text"
          value={party1Name}
          onChange={(e) => setParty1Name(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300"
          placeholder="Enter party 1 name"
        />
      </div>
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Party 2 Name</label>
        <input
          type="text"
          value={party2Name}
          onChange={(e) => setParty2Name(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300"
          placeholder="Enter party 2 name"
        />
      </div>
    </div>

    {/* Signatures */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Party 1 Signature</label>
        <SignatureCanvas
          ref={party1SigCanvas}
          penColor="black"
          canvasProps={{ className: 'w-full h-32 border border-slate-300 rounded-xl' }}
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => clearSignature(party1SigCanvas)}
            className="p-2 bg-red-500 text-white rounded-lg"
          >
            Clear
          </button>
          <button
            onClick={() => saveSignature(party1SigCanvas, setParty1Signature)}
            className="p-2 bg-green-500 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Party 2 Signature</label>
        <SignatureCanvas
          ref={party2SigCanvas}
          penColor="black"
          canvasProps={{ className: 'w-full h-32 border border-slate-300 rounded-xl' }}
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => clearSignature(party2SigCanvas)}
            className="p-2 bg-red-500 text-white rounded-lg"
          >
            Clear
          </button>
          <button
            onClick={() => saveSignature(party2SigCanvas, setParty2Signature)}
            className="p-2 bg-green-500 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    {/* Contract Terms */}
    <div>
      <label className="block text-stone-950 mb-2 font-medium">Contract Terms</label>
      <textarea
        value={contractTerms}
        onChange={(e) => setContractTerms(e.target.value)}
        className="w-full p-3 rounded-xl border border-slate-300 min-h-[200px]"
        placeholder="Enter contract terms and conditions..."
      />
    </div>

    {/* Witnesses */}
    <div>
      <label className="block text-stone-950 mb-2 font-medium">Witnesses</label>
      {witnesses.map((witness, idx) => (
        <div key={idx} className="flex gap-2 mb-2">
          <input
            type="text"
            value={witness.name}
            onChange={(e) => {
              const newWitnesses = [...witnesses];
              newWitnesses[idx].name = e.target.value;
              setWitnesses(newWitnesses);
            }}
            className="flex-1 p-3 rounded-xl border border-slate-300"
            placeholder="Witness name"
          />
          <input
            type="text"
            value={witness.signature}
            onChange={(e) => {
              const newWitnesses = [...witnesses];
              newWitnesses[idx].signature = e.target.value;
              setWitnesses(newWitnesses);
            }}
            className="flex-1 p-3 rounded-xl border border-slate-300 font-mono"
            placeholder="Witness signature"
          />
          <button
            onClick={() => setWitnesses(witnesses.filter((_, i) => i !== idx))}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
          >
            ×
          </button>
        </div>
      ))}
      <button
        onClick={() => setWitnesses([...witnesses, { name: '', signature: '' }])}
        className="text-blue-600 hover:text-blue-700"
      >
        + Add Witness
      </button>
    </div>

    {/* Valid Until */}
    <div>
      <label className="block text-stone-950 mb-2 font-medium">Valid Until</label>
      <input
        type="date"
        value={validUntil}
        onChange={(e) => setValidUntil(e.target.value)}
        className="w-full p-3 rounded-xl border border-slate-300"
      />
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
            {(selectedVariant === 'product' || selectedVariant === 'business' ) && (
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
                <div>
      <label className="block text-stone-950 mb-2 font-medium">Event Details</label>
      <textarea
        value={largeDescription}
        onChange={(e) => setLargeDescription(e.target.value)}
        className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 transition-all min-h-[150px]"
        placeholder="Enter flyer details, features, or event information"
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
            <div className="space-y-6">
    <div>
      <label className="block text-stone-950 mb-2">Profile Picture</label>
      <input
        type="file"
        onChange={handleProfilePictureChange}
        className="w-full p-2 rounded-lg border border-slate-300"
        title="Upload a profile picture"
        placeholder="Upload a profile picture"
      />
    </div>
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
          <div className="relative w-full h-[250px] sm:h-[250px] md:h-[300px]">
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
              <p className="text-base sm:text-xl md:text-2xl text-white/80 max-w-3xl whitespace-pre-line font-light ">
                {description}
              </p>
                {price && !isNaN(parseFloat(price)) && (
                    <p className="text-base font-semibold absolute right-2 bottom-4 bg-stone-50/30 text-stone-50/80 px-2 py-1 rounded-full inline-block">
                         {formatCurrency(parseFloat(price), currency)}
                    </p>
                )}
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
                  {/* <div className="mt-4 flex justify-end">
                    <div className="text-xs w-fit px-2 py-1 rounded-full bg-slate-800 text-white">
                      Kardify Me+
                    </div>
                  </div> */}
                </div>
              )}
               {/* Business Variant */}
    {selectedVariant === 'business' && (
      <div className="space-y-4 bg-white/40 test p-4 rounded-2xl shadow-lg">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <h3 className="text-3xl font-bold text-stone-50">{title}</h3>
            <p className="text-xl font-medium whitespace-pre-line text-stone-50">{description}</p>
          </div>
          {qrUrl && (
            <div className="bg-white p-2 rounded-xl shadow-md">
              <QRCodeSVG value={qrUrl} size={80} />
            </div>
          )}
        </div>
        
        <div className="prose max-w-full">
          <p className="text-lg text-stone-50 whitespace-pre-line leading-relaxed">{largeDescription}</p>
        </div>
        
      </div>
    )}

{/* Flyer Display */}
{selectedVariant === 'flyer' && (
  <div className="relative bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 p-8 rounded-3xl shadow-2xl overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute inset-0 bg-black/10"></div>
    <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
    
    <div className="relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-6 flex-1">
          <div>
            <h3 className="text-6xl font-black text-white mb-4 leading-tight">{title || 'Your Event Title'}</h3>
            <p className="text-3xl font-medium text-white/90">{description || 'Add a compelling description'}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-white mt-8">
            <p className="text-xl leading-relaxed whitespace-pre-line">{largeDescription || 'Enter event details here'}</p>
          </div>
        </div>

        <div className="space-y-6 md:w-1/5 w-full">
          {qrUrl && (
            <div className="bg-white/95 p-4 flex-col items-center justify-center rounded-2xl shadow-lg backdrop-blur-md">
              <QRCodeSVG value={qrUrl} size={120} />
              <p className="text-sm text-center mt-2 text-gray-600 font-medium">Scan for details</p>
            </div>
          )}
          
          {price && !isNaN(parseFloat(price)) && (
            <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl text-center">
              <p className="text-sm text-gray-500 mb-1">Price</p>
              <p className="text-xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                {formatCurrency(parseFloat(price), currency)}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        {logo && (
          <div className="relative w-20 h-20">
            <Image 
              src={logo} 
              alt="Logo" 
              fill 
              className="rounded-xl object-cover border-2 border-white/50 shadow-lg" 
            />
          </div>
        )}
        <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white text-sm font-medium">
          Created with Kardify
        </div>
      </div>
    </div>
  </div>
)}

{/* Recipe Display */}
{selectedVariant === 'recipe' && (
  <div className="relative bg-gradient-to-br from-emerald-500 to-orange-700 p-4 rounded-[10px] shadow-2xl overflow-hidden">
    {/* Decorative Elements */}
    {/* <div className="absolute inset-0 bg-black/10"></div>
    <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
     */}
    <div className="relative z-10">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-3xl font-mono text-white mb-4">{title || 'Recipe Name'}</h3>
            <div className="flex gap-4 text-white/90">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                </svg>
                {cookingTime} mins
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
                Serves {servings}
              </span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-[10px]">
            <h4 className="text-xl font-semibold text-white mb-2">Ingredients</h4>
            <ul className="space-y-2 text-white/90">
              {ingredients.map((ing, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{ing.item}</span>
                  <span className="text-white/70">{ing.amount}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-[10px]">
            <h4 className="text-xl font-semibold text-white mb-2">Instructions</h4>
            <ol className="space-y-2 text-white/90 list-decimal list-inside">
              {instructions.map((inst, idx) => (
                <li key={idx}>{inst.step}</li>
              ))}
            </ol>
          </div>

          {chefTips && (
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-[10px]">
              <p className="text-white/90 italic">💡 Chef's Tip: {chefTips}</p>
            </div>
          )}
        </div>

        <div className="md:w-1/3 space-y-3">
          {image && (
            <div className="rounded-[10px] overflow-hidden shadow-lg">
              <Image src={image} alt={title} width={400} height={300} className="object-cover" />
            </div>
          )}
          
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-[10px]">
            <div className="text-center">
              <span className="px-3 py-1 rounded-xl bg-emerald-200 text-emerald-800 text-sm font-medium">
                {difficulty.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        {logo && (
          <div className="relative w-16 h-16">
            <Image src={logo} alt="Logo" fill className="rounded-full object-cover border-2 border-white/50" />
          </div>
        )}
        <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm">
          Kardify Recipe
        </div>
      </div>
    </div>
  </div>
)}



{/* Add contract card display */}
{selectedVariant === 'contract' && (
  <div className="relative bg-gradient-to-br from-slate-900 to-blue-900 p-4 rounded-3xl shadow-2xl overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute inset-0 bg-grid-white/10"></div>
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
    
    <div className="relative z-10 space-y-4">
      {/* Header with Official Seal */}
      <div className="text-center border-b border-white/20 pb-6">
        <div className="flex justify-center mb-4">
          {logo && (
            <div className="relative w-20 h-20">
              <Image src={logo} alt="Official Seal" fill className="rounded-full object-cover border-2 border-white/50" />
            </div>
          )}
        </div>
        <h2 className="text-4xl font-serif text-white mb-2">{title || 'Contract Agreement'}</h2>
        <div className="flex justify-center gap-2 text-sm text-blue-200">
          <p>Ref: {contractAddress || 'KDY-' + Date.now().toString().slice(-8)}</p>
          <p>|</p>
          <p>Date: {new Date(contractDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Parties Section with Enhanced Design */}
      <div className="grid grid-cols-1 gap-4">
        {[
          { title: 'Party 1', name: party1Name, sign: party1Signature },
          { title: 'Party 2', name: party2Name, sign: party2Signature }
        ].map((party, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <h3 className="text-base text-white mb-4">{party.title}</h3>
            <div className="space-y-2">
              <div className="bg-white/5 p-3 rounded-xl">
                <p className="text-sm text-blue-200">Full Name</p>
                <p className="text-lg text-white font-medium">{party.name}</p>
              </div>
              {party.sign && (
                <div className="bg-white/5 p-3 rounded-xl">
                  <p className="text-sm text-blue-200">Digital Signature</p>
                  <div className="mt-2 bg-white/5 rounded-lg overflow-hidden">
                    <img 
                      src={party.sign} 
                      alt={`${party.title} Signature`}
                      className="w-full h-20 object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Terms and Conditions with Enhanced Readability */}
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
        <h3 className="text-xl text-white mb-4">Terms and Conditions</h3>
        <div className="prose prose-invert max-w-none">
          <div className="bg-white/5 p-6 rounded-xl">
            <p className="text-blue-200 whitespace-pre-line leading-relaxed">{contractTerms}</p>
          </div>
        </div>
      </div>

      {/* Contract Details with Icons */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white/10 p-3 rounded-xl border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-base text-blue-200">Contract Value</p>
          </div>
          <p className="text-xl text-white font-medium">{formatCurrency(parseFloat(contractValue), currency)}</p>
        </div>
        <div className="bg-white/10 p-3 rounded-xl border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-base text-blue-200">Valid Until</p>
          </div>
          <p className="text-xl text-white font-medium">{new Date(validUntil).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Witnesses with Enhanced Layout */}
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
        <h3 className="text-xl text-white mb-4">Witnesses</h3>
        <div className="grid grid-cols-2 gap-2">
          {witnesses.map((witness, idx) => (
            <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-blue-200">{witness.name}</p>
              </div>
              <div className="font-mono text-white/90 text-sm mt-2 p-2 bg-white/5 rounded-lg">
                {witness.signature}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with Enhanced Security Features */}
      <div className="flex justify-between items-center pt-3 border-t border-white/20">
        <div className="flex items-center gap-4">
          {qrUrl && (
            <div className="bg-white/95 p-2 rounded-xl shadow-lg">
              <QRCodeSVG value={qrUrl} size={40} />
              <p className="text-xs text-center mt-1 text-blue-900">Verify</p>
            </div>
          )}
          <div className="text-sm text-blue-200">
            <p>Document ID: {contractAddress || 'KDY-' + Date.now().toString().slice(-8)}</p>
            <p>Created: {new Date(contractDate).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-emerald-400">Secured by Kardify</span>
        </div>
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
                  <div className="bg-purple-100 p-4 rounded-xl">
                    <h4 className="text-xl font-semibold text-purple-900 mb-3">Event Details</h4>
                    <p className="text-stone-950 whitespace-pre-line">{description}</p>
                    {largeDescription && (
                      <div className="mt-4 text-stone-950 whitespace-pre-line">{largeDescription}</div>
                    )}
                  </div>
                  {/* <div className="mt-4 flex justify-end">
                    <div className="text-xs w-fit px-2 py-1 rounded-full bg-purple-600 text-white">
                      Kardify Me+
                    </div>
                  </div> */}
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
                    {largeDescription && (
                  <div className="mt-4 text-stone-950 whitespace-pre-line">{largeDescription}</div>
                )}
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
                  {/* <div className="mt-4 flex justify-end">
                    <div className="text-xs w-fit px-2 py-1 rounded-full bg-blue-600 text-white">
                      Kardify Me+
                    </div>
                  </div> */}
                </div>
              )}
              <div className="mt-4 flex justify-end">
          <div className="text-xs w-fit px-2 py-1 rounded-full bg-slate-800/40 text-stone-50">
            Kardify Me+
          </div>
        </div>
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
