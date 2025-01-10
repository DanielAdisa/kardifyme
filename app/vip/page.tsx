"use client";
import { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import place from "@/public/12.jpg"
import SignatureCanvas from 'react-signature-canvas';
import type ReactSignatureCanvas from 'react-signature-canvas';

import { ethers } from 'ethers';
import { ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';




// Define BudgetState interface
interface BudgetState {
  totalBudget: number;
  categories: BudgetCategory[];
  monthYear: string;
  currency: string;
}

interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
}

// Update card variants
const cardVariants = {
  business: {
    templates: {
      modern: {
        // background: 'bg-white',
        font: 'font-sans',
        layout: 'p-2'
      },
      classic: {
        // background: 'bg-stone-100',
        font: 'font-serif',
        layout: 'p-1.5'
      },
      minimal: {
        // background: 'bg-slate-50',
        font: 'font-mono',
        layout: 'p-0'
      }
    }
  },
  event: {
    templates: {
      classic: {
        // background: 'bg-gradient-to-br from-blue-500 to-pink-500',
        font: 'font-sans',
        layout: 'p-2'
      },
      bold: {
        // background: 'bg-gradient-to-br from-purple-600 to-red-500',
        font: 'font-bold',
        layout: 'p-1.5'
      },
      elegant: {
        // background: 'bg-gradient-to-br from-indigo-500 to-pink-500',
        font: 'font-serif',
        layout: 'p-0'
      }
    }
  },
  product: {
    templates: {
      showcase: {
        // background: 'bg-gradient-to-br from-slate-800 to-slate-900',
        font: 'font-sans',
        layout: 'p-2'
      },
      grid: {
        // background: 'bg-gradient-to-br from-gray-700 to-gray-800',
        font: 'font-mono',
        layout: 'p-1.5'
      },
      minimal: {
        // background: 'bg-gradient-to-br from-slate-600 to-slate-700',
        font: 'font-sans',
        layout: 'p-0'
      }
    }
  },
  invoice: {
    templates: {
      professional: {
        // background: 'backdrop-blur-2xl bg-stone-600/30',
        font: 'font-sans',
        layout: 'p-2'
      },
      simple: {
        // background: 'bg-stone-500/30',
        font: 'font-mono',
        layout: 'p-1.5'
      },
      detailed: {
        // background: 'bg-stone-400/30',
        font: 'font-serif',
        layout: 'p-0'
      }
    }
  },
  receipt: {
    templates: {
      simple: {
        // background: 'backdrop-blur-2xl bg-white/20',
        font: 'font-mono',
        layout: 'p-2'
      },
      detailed: {
        // background: 'bg-white/30',
        font: 'font-sans',
        layout: 'p-1.5'
      },
      compact: {
        // background: 'bg-white/40',
        font: 'font-serif',
       layout: 'p-0'
      }
    }
  },
  einvoice: {
    templates: {
      digital: {
        // background: 'bg-gradient-to-tl from-orange-500 to-purple-700',
        font: 'font-sans',
        layout: 'p-2'
      },
      modern: {
        // background: 'bg-gradient-to-tl from-orange-400 to-purple-600',
        font: 'font-mono',
        layout: 'p-1.5'
      },
      classic: {
        // background: 'bg-gradient-to-tl from-orange-300 to-purple-500',
        font: 'font-serif',
        layout: 'p-0'
      }
    }
  },
  flyer: {
    templates: {
      bold: {
        // background: 'bg-gradient-to-br from-yellow-500 to-red-500',
        font: 'font-sans',
        layout: 'p-2'
      },
      creative: {
        // background: 'bg-gradient-to-br from-yellow-400 to-red-400',
        font: 'font-sans',
        layout: 'p-1.5'
      },
      minimal: {
        // background: 'bg-gradient-to-br from-yellow-300 to-red-300',
        font: 'font-mono',
       layout: 'p-0'
      }
    }
  },
  recipe: {
    templates: {
      elegant: {
        // background: 'bg-gradient-to-br from-emerald-500 to-teal-700',
        font: 'font-mono',
        layout: 'p-2'
      },
      modern: {
        // background: 'bg-gradient-to-br from-emerald-400 to-teal-600',
        font: 'font-sans',
        layout: 'p-1.5'
      },
      classic: {
        // background: 'bg-gradient-to-br from-emerald-300 to-teal-500',
        font: 'font-mono',
        layout: 'p-0'
      }
    }
  },
  contract: {
    templates: {
      formal: {
        // background: 'bg-gradient-to-br from-blue-900 to-indigo-900',
        font: 'font-serif',
        layout: 'p-1'
      },
      modern: {
        // background: 'bg-gradient-to-br from-blue-800 to-indigo-800',
        font: 'font-mono',
        layout: 'p-1.5'
      },
      simple: {
        // background: 'bg-gradient-to-br from-blue-700 to-indigo-700',
        font: 'font-sans',
       layout: 'p-0'
      }
    }
  },
  birthday: {
    templates: {
      fun: {
        // background: 'bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500',
        font: 'font-serif',
        layout: 'p-2'
      },
      elegant: {
        // background: 'bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400',
        font: 'font-sans',
        layout: 'p-1.5'
      },
      minimal: {
        // background: 'bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300',
        font: 'font-mono',
        layout: 'p-0'
      }
    }
  },
  budget: {
    templates: {
      clean: {
        // background: 'bg-gradient-to-br from-green-500 via-teal-500 to-blue-500',
        font: 'font-serif',
        layout: 'p-2'
      },
      detailed: {
        // background: 'bg-gradient-to-br from-green-400 via-teal-400 to-blue-400',
        font: 'font-sans',
        layout: 'p-1.5'
      },
      visual: {
        // background: 'bg-gradient-to-br from-green-300 via-teal-300 to-blue-300',
        font: 'font-mono',
        layout: 'p-0'
      }
    }
  },
  idCard: {
    templates: {
      standard: {
        // background: 'backdrop-blur-2xl bg-white/20',
        font: 'font-mono',
        layout: 'p-2'
      },
      modern: {
        // background: 'bg-white/30',
        font: 'font-sans',
        layout: 'p-1.5'
      },
      minimal: {
        // background: 'bg-white/40',
        font: 'font-serif',
        layout: 'p-0'
      }
    }
  },
  mood: {
    templates: {
      happy: {
        // background: 'bg-gradient-to-br from-yellow-400 to-orange-500',
        font: 'font-sans',
        layout: 'p-0.5'
      },
      calm: {
        // background: 'bg-gradient-to-br from-blue-300 to-green-400',
        font: 'font-serif',
        layout: 'p-0'
      },
      energetic: {
        // background: 'bg-gradient-to-br from-red-400 to-pink-500',
        font: 'font-mono',
        layout: 'p-0'
      }
    }
  },
  affirmations: {
    templates: {
      modern: {
        // background: 'bg-white',
        font: 'font-sans',
        layout: 'p-1'
      },
      classic: {
        // background: 'bg-stone-100',
        font: 'font-serif',
        layout: 'p-0'
      },
      minimal: {
        // background: 'bg-slate-50',
        font: 'font-mono',
        layout: 'p-0'
      }
    }
  },
  menu: {
    templates: {
      modern: {
        // background: 'bg-white',
        font: 'font-serif',
        layout: 'p-'
      },
      classic: {
        // background: 'bg-stone-100',
        font: 'font-mono',
        layout: 'p-0'
      },
      minimal: {
        // background: 'bg-slate-50',
        font: 'font-sans',
        layout: 'p-0'
      }
    }
  },
  brand: {
    templates: {
      modern: {
        // background: 'bg-white',
        font: 'font-serif',
        layout: 'p-0'
      },
      classic: {
        // background: 'bg-stone-100',
        font: 'font-mono',
        layout: 'p-0'
      },
      minimal: {
        // background: 'bg-slate-50',
        font: 'font-sans',
        layout: 'p-0'
      }
    }
  },
  invitation: {
    templates: {
      modern: {
        // background: 'bg-white',
        font: 'font-serif',
        layout: 'p-0'
      },
      classic: {
        // background: 'bg-stone-100',
        font: 'font-mono',
        layout: 'p-0'
      },
      minimal: {
        // background: 'bg-slate-50',
        font: 'font-sans',
        layout: 'p-0'
      }
    }
  },
};

// Add currency options
const currencyOptions = [
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'GBP', label: 'British Pound (£)' },
  { value: 'JPY', label: 'Japanese Yen (¥)' },
  { value: 'NGN', label: 'Nigerian Naira (₦)' }
];

type SocialMediaPlatform = 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube';

// type TextColors = {
//   [key in SocialMediaPlatform]: string;
// };

// type TextColors = {
//   brandName: string;
//   tagline: string;
//   description: string;
//   orderPolicies: string;
//   contactInfo: string;
//   [key: string]: string;
// };

type TextColors = {
  brandName: string;
  tagline: string;
  description: string;
  orderPolicies: string;
  contactInfo: string;
  [key: string]: string;
};

// type TextColors = {
//   tagline: string;
//   // Add other properties as needed
// };

const CreateCard = () => {
  const [occasion, setOccasion] = useState('');
  const [inviterName, setInviterName] = useState('');
  const [inviteeName, setInviteeName] = useState<string>('');
  const [textColors, setTextColors] = useState<{ [key: string]: string }>({});
  interface TextColors {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    description: string;
    orderPolicies: string;
    contactInfo: string;
  }
  
  // const textColors: TextColors = {
  //   facebook: '#3b5998',
  //   twitter: '#1da1f2',
  //   instagram: '#e1306c',
  //   linkedin: '#0077b5',
  //   youtube: '#ff0000',
  // description: '#000000',
  // orderPolicies: '#000000',
  // contactInfo: '#000000',
  // };
  const [affirmationTitle, setAffirmationTitle] = useState('');
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [largeDescription, setLargeDescription] = useState('');
  const [image, setImage] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [logo, setLogo] = useState('');
  const [brandName, setBrandName] = useState('');
const [tagline, setTagline] = useState('');
const [orderPolicies, setOrderPolicies] = useState('');
const [contactInfo, setContactInfo] = useState('');
const [socialMediaLinks, setSocialMediaLinks] = useState({
  instagram: '',
  facebook: '',
  twitter: '',
});
const [heroImage, setHeroImage] = useState<File | null>(null);

  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('NGN');
  const [includeBottomPart, setIncludeBottomPart] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [items, setItems] = useState([{ description: '', amount: 0 }]);
  const [taxRate, setTaxRate] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [bgType, setBgType] = useState('gradient'); // 'gradient' or 'solid'
const [solidColor, setSolidColor] = useState('#ffffff');

const [eventName, setEventName] = useState('');

const [eventTime, setEventTime] = useState('');

  const [showBottomPart, setShowBottomPart] = useState(true);
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventType, setEventType] = useState('General Admission');
  type VariantType = 'business' | 'event' | 'product' | 'invoice' | 'receipt' | 'einvoice' | 'flyer' | 'recipe' | 'contract' | 'birthday' | 'budget' | 'idCard' | 'mood' | 'affirmations'| 'menu' | 'brand' | 'invitation';
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
const [celebrantName, setCelebrantName] = useState('');
const [age, setAge] = useState('');
const [menuTitleColor, setMenuTitleColor] = useState('#333');
const [menuSubtitleColor, setMenuSubtitleColor] = useState('#666');
const [menuDateColor, setMenuDateColor] = useState('#666');
const [innerCardColor, setInnerCardColor] = useState('#ffffff');

const [message, setMessage] = useState('');
const [wishType, setWishType] = useState('Happy Birthday');
const [budgetCategories, setBudgetCategories] = useState([{ category: '', amount: 0 }]);
const [totalBudget, setTotalBudget] = useState(0);
const [remainingBudget, setRemainingBudget] = useState(0);
const [showTopPart, setShowTopPart] = useState(true);
const [moodPicture, setMoodPicture] = useState('');
const [moodSmiley, setMoodSmiley] = useState('😊');
const smileys = ['😊', '😢', '😂', '😍', '😎', '😡', '😱', '😴', '🤔', '😇'];
const [date, setDate] = useState('');
const [name, setName] = useState('');
const [titleColor, setTitleColor] = useState('#000000');
const [menuDate, setMenuDate] = useState<string | null>(null);
const [isDateOptional, setIsDateOptional] = useState(false);
const [subtitleColor, setSubtitleColor] = useState('#000000');
const [descriptionColor, setDescriptionColor] = useState('#000000');
const [dateNameColor, setDateNameColor] = useState('#000000');
const [gradientFrom, setGradientFrom] = useState('#ff7e5f');
const [gradientVia, setGradientVia] = useState('#feb47b');
const [gradientTo, setGradientTo] = useState('#ff7e5f');
const [backgroundColor, setBackgroundColor] = useState('#ffffff');
const [affirmationText, setAffirmationText] = useState('');
const [affirmationTime, setAffirmationTime] = useState('');
const [affirmationDate, setAffirmationDate] = useState('');
const [affirmationTextColor, setAffirmationTextColor] = useState('#000000');
const [cardBackgroundColor, setCardBackgroundColor] = useState('#ffffff');
const [categoryName, setCategoryName] = useState('');
const [categoryDescription, setCategoryDescription] = useState('');
const [menuItemName, setMenuItemName] = useState('');
const [menuItemDescription, setMenuItemDescription] = useState('');
const [menuItemPrice, setMenuItemPrice] = useState('');
const [menuItemTags, setMenuItemTags] = useState('');
const [menuItemImage, setMenuItemImage] = useState<File | null>(null);
const [menuTitle, setMenuTitle] = useState('');
const [menuSubtitle, setMenuSubtitle] = useState('');
const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency === 'NGN' ? 'NGN' : currency,
    minimumFractionDigits: 0,
  }).format(value);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(value);
};
interface MenuItem {
  name: string;
  image?: File | string;
  textColor?: string;
  price?: string;
  description?: string;
  descriptionColor?: string;
  tags?: string;
  currency?: string;
}

interface MenuCategory {
  name: string;
  textColor: string;
  description: string;
  items: MenuItem[];
}

const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
const [specialItemDescription, setSpecialItemDescription] = useState('');
// const [specialItemImage, setSpecialItemImageState] = useState<string | null>(null);
const [menuBackgroundColor, setMenuBackgroundColor] = useState('#FFFFFF');

// function setSpecialItemImage(file: File): void {
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       setSpecialItemImageState(event.target?.result as string);
//     };
//     reader.readAsDataURL(file);
//   }
// }


const [categoryTextColor, setCategoryTextColor] = useState('#555');

const [itemTitleColor, setItemTitleColor] = useState('#333');
const [itemDescriptionColor, setItemDescriptionColor] = useState('#555');

const [showIDCard, setShowIDCard] = useState(true);
const [idCardDetails, setIDCardDetails] = useState({
  name: '',
  idNumber: '',
  department: '',
  issueDate: '',
  expiryDate: '',
  photo: ''
});



  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [party1Signature, setParty1Signature] = useState('');
const [party2Signature, setParty2Signature] = useState('');

const [budgetState, setBudgetState] = useState<BudgetState>({
  totalBudget: 0,
  categories: [],
  monthYear: new Date().toISOString().slice(0, 7),
  currency: 'NGN'
});


const [cardColor, setCardColor] = useState({
  business: '#ffffff',
  event: '#ff5733',
  product: '#33ff57',
  invoice: '#3357ff',
  receipt: '#ffffff',
  einvoice: '#ff33f5',
  flyer: '#f5ff33',
  recipe: '#33fff5',
  contract: '#000000',
  birthday: '#ff33a8',
  budget: '#33ffa8',
  idCard: '#ffffff',
  mood: '#ffeb3b',
  affirmations: '#ffeb3b',
  menu: '#ffffff',
  brand: '#ffffff',
  invitation: '#ffeb3b',
});

const [selectedTemplate, setSelectedTemplate] = useState({
  business: 'minimal',
  event: 'elegant',
  product: 'grid',
  invoice: 'detailed',
  receipt: 'compact',
  einvoice: 'classic',
  flyer: 'minimal',
  recipe: 'classic',
  contract: 'simple',
  birthday: 'elegant',
  budget: 'visual',
  idCard: 'minimal',
  mood: 'energetic',
  affirmations: 'minimal',
  menu: 'minimal',
  brand: 'minimal',
  invitation: 'minimal',
});

const templateOptions = {
  business: ['modern', 'classic', 'minimal'],
  event: ['classic', 'bold', 'elegant'],
  product: ['minimal', 'showcase', 'grid'],
  invoice: ['professional', 'simple', 'detailed'],
  receipt: ['simple', 'detailed', 'compact'],
  einvoice: ['digital', 'modern', 'classic'],
  flyer: ['bold', 'creative', 'minimal'],
  recipe: ['elegant', 'modern', 'classic'],
  contract: ['formal', 'modern', 'simple'],
  birthday: ['fun', 'elegant', 'minimal'],
  budget: ['clean', 'detailed', 'visual'],
  idCard: ['standard', 'modern', 'minimal'],
  mood: ['happy', 'calm', 'energetic'],
  affirmations: ['modern', 'classic', 'minimal'],
  menu: ['modern', 'classic', 'minimal'],
  brand: ['modern', 'classic', 'minimal'],
  invitation: ['modern', 'classic', 'minimal'],
};



const handleDeleteImage = (type: 'main' | 'logo'| 'profilePicture' ) => {
  if (type === 'main') {
    setImage('');
  } else if (type === 'logo') {
    setLogo('');
  } else if (type === 'profilePicture') {
    setProfilePicture('');
  }
};
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



  const CURRENT_PASSWORD = 'epicgames';
  const PASSWORD_VERSION = '6'; // Increment this version whenever the password changes
  
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

  interface DifficultyColorMap {
    easy: string;
    medium: string;
    hard: string;
    [key: string]: string; // For default case
  }

  const getDifficultyColor = (difficulty: string): string => {
    const colorMap: DifficultyColorMap = {
      easy: 'bg-green-200 text-green-800',
      medium: 'bg-yellow-200 text-yellow-800',
      hard: 'bg-red-200 text-red-800',
      default: 'bg-gray-200 text-gray-800'
    };

    return colorMap[difficulty.toLowerCase()] || colorMap.default;
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

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'main' | 'logo' | 'moodPicture' | 'menuItem' | 'profilePicture',
    categoryIndex?: number,
    itemIndex?: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (type === 'main') {
          setImage(event.target?.result as string);
        } else if (type === 'logo') {
          setLogo(event.target?.result as string);
          
        } else if (type === 'profilePicture') {
          setProfilePicture(event.target?.result as string);
          
        }
        
        else if (type === 'moodPicture') {
          setMoodPicture(event.target?.result as string);
        } else if (type === 'menuItem' && categoryIndex !== undefined && itemIndex !== undefined) {
          const newCategories = [...menuCategories];
          newCategories[categoryIndex].items[itemIndex].image = file;
          setMenuCategories(newCategories);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Add error handling for image generation
  const generateImage = async () => {
    if (!cardRef.current) return;
    setIsLoading(true);
    try {
      const content = cardRef.current;
      const dataUrl = await toPng(content, {
        quality: 100,
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

  const baseInputStyles = `
  w-full px-4 py-3.5
  bg-white/50 backdrop-blur-sm
  border border-slate-200
  rounded-xl
  text-slate-700 placeholder-slate-400
  transition-all duration-200
  hover:border-slate-300
  focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
  focus:outline-none
`;

const baseWrapperStyles = `
  relative group space-y-2
`;

const baseLabelStyles = `
  block text-sm font-medium text-slate-700
  transition-all duration-200 mb-1
  group-hover:text-slate-900
  group-focus-within:text-blue-600
`;


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


  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // const TemplateSelector = () => (
  //   <div className="space-y-4 mb-6">
  //     <select
  //       value={selectedTemplate[selectedVariant]}
  //       onChange={(e) => setSelectedTemplate({
  //         ...selectedTemplate,
  //         [selectedVariant]: e.target.value
  //       })}
  //       className="w-full p-2 rounded-lg border"
  //     >
  //       {Object.keys(cardVariants[selectedVariant].templates).map((template) => (
  //         <option key={template} value={template}>
  //           {template.charAt(0).toUpperCase() + template.slice(1)}
  //         </option>
  //       ))}
  //     </select>
  //     <input
  //       type="color"
  //       value={cardColor[selectedVariant]}
  //       onChange={(e) => setCardColor({
  //         ...cardColor,
  //         [selectedVariant]: e.target.value
  //       })}
  //       className="w-full h-10 rounded-lg"
  //     />
  //   </div>
  // );

  function calculateDaysUntilNextBirthday(age: string): React.ReactNode {
    // If no age provided, return placeholder text
    if (!age) {
      return "Loading...";
    }

    try {
      // Get current date
      const today = new Date();
      const currentYear = today.getFullYear();

      // Create date object for this year's birthday
      const thisYearBirthday = new Date();
      thisYearBirthday.setFullYear(currentYear);

      // If birthday has passed this year, calculate for next year
      if (today > thisYearBirthday) {
        thisYearBirthday.setFullYear(currentYear + 1);
      }

      // Calculate difference in days
      const diffTime = thisYearBirthday.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Format the response
      if (diffDays === 0) {
        return "Today! 🎉";
      } else if (diffDays === 1) {
        return "Tomorrow!";
      } else {
        return `${diffDays} days`;
      }

    } catch (error) {
      console.error("Error calculating birthday countdown:", error);
      return "Calculate your birthday countdown";
    }
  }
  // const [specialItemImage, setSpecialItemImageState] = useState<string | null>(null);

  // function setSpecialItemImage(file: File): void {
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setSpecialItemImageState(e.target?.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
  
  interface MenuItem {
    name: string;
    image?: string | File;
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 p-3">

      {/* Display Card Above */}
      <div className="mt-4 max-w-5xl mx-auto lg:max-w-4xl mb-10">
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className={`
    ${'templates' in (cardVariants[selectedVariant] as any) 
      ? (cardVariants[selectedVariant] as any)?.templates[selectedTemplate[selectedVariant]]?.background
      : (cardVariants[selectedVariant] as any)?.gradient}
    ${'templates' in (cardVariants[selectedVariant] as any) ? (cardVariants[selectedVariant] as any)?.templates[selectedTemplate[selectedVariant]]?.font : ''}
    ${'templates' in cardVariants[selectedVariant] ? (cardVariants[selectedVariant] as any)?.templates[selectedTemplate[selectedVariant]]?.layout : ''}
    rounded-[20px] 
    shadow-[0_8px_32px_rgba(0,0,0,0.15)] 
    backdrop-blur-xl 
    overflow-hidden 
    w-full
    transition-colors duration-300
  `}
  style={{
    backgroundColor: cardColor[selectedVariant],
  }}
>
          {/* Card Hero with responsive height */}
          {showTopPart && (
  <div className="relative rounded-xl w-full h-[150px] sm:h-[250px] md:h-[300px]">
    {image ? (
      <Image
        src={image || place} // Set default image
        alt={title || 'Card Image'}
        fill
        className={`object-cover rounded-t-2xl transition-transform duration-700 ${
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
      <div className="w-full h-full rounded-2xl bg-gray-200 flex items-center justify-center">
        <Image
          src={place || place} // Set default image
          alt={title || 'Card Image'}
          fill
          className={`object-cover rounded-xl transition-transform duration-700 ${
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
      <h1 className={`text-xl md:text-6xl ${'titleFont' in cardVariants[selectedVariant] ? cardVariants[selectedVariant].titleFont : 'default-font'} text-white mb-2 tracking-tight`}>
        {title || 'Untitled'}
      </h1>
      <p className="text-base sm:text-xl md:text-2xl text-white/80 max-w-3xl whitespace-pre-line font-light ">
        {description}
      </p>
      {price && !isNaN(parseFloat(price)) &&  (
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
)}

          {/* Update the card content section */}
          {showBottomPart && (
            <div className={`p-2 ${selectedVariant === 'product' ? '' : ''}`}>
    {/* Product Variant */}
        {selectedVariant === 'product' && (
          <div className={`relative p-4 rounded-t-xl rounded-b-xl rounded-2xl shadow-2xl overflow-hidden`}
          style={{backgroundColor: backgroundColor,}}>
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
        <div className={`relative p-4 rounded-t-xl rounded-b-xl rounded-2xl shadow-2xl overflow-hidden`}
        style={{backgroundColor: backgroundColor,}}>
          <div className="flex justify-between items-start">
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-stone-50" style={{color: titleColor}}>{title}</h3>
              <p className="text-xl font-medium whitespace-pre-line text-stone-50" style={{color: titleColor}}>{description}</p>
            </div>
            {qrUrl && (
              <div className="bg-white p-2 rounded-xl shadow-md">
                <QRCodeSVG value={qrUrl} size={80} />
              </div>
            )}
          </div>
          
          <div className="prose max-w-full">
            <p className="text-lg text-stone-50 whitespace-pre-line leading-relaxed" style={{color: titleColor}}>{largeDescription}</p>
          </div>
          
        </div>
      )}

    {/* Flyer Display */}
    {selectedVariant === 'flyer' && (
  <div
    className="relative p-3 rounded-b-none rounded-2xl shadow-2xl overflow-hidden"
    style={{
      background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
    }}
  >
    {/* Background Image */}
    {backgroundImage && (
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `url(${URL.createObjectURL(backgroundImage)})`,
        }}
      ></div>
    )}

    {/* Decorative Elements */}
    <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
    <div className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-400/30 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl"></div>

    {/* Flyer Content */}
    <div className="relative z-10 h-full space-y-8 text-center">
      {/* Title */}
      <h3
        className="text-5xl font-bold text-white"
        style={{ color: titleColor }}
      >
        {title || "Party All Night!"}
      </h3>

      {/* Description */}
      <p
        className="text-2xl text-white/90"
        style={{ color: titleColor }}
      >
        {description || "Join us for an unforgettable evening!"}
      </p>

      {/* Main Content */}
      <div className=" p-6 rounded-xl bg-black/20 backdrop-blur-2xl shadow-md">
        <p
          className="text-xl whitespace-pre-wrap text-white"
          style={{ color: titleColor }}
        >
          {largeDescription ||
            "Live music, drinks, and amazing vibes. Don't miss it!"}
        </p>
      </div>

      {/* QR Code & Price */}
      <div className="flex flex-wrap justify-center gap-6">
        {qrUrl && (
          <div className="backdrop-blur-2xl shadow-md bg-black/20 p-2 rounded-lg  h-fit  shadow-md">
            <QRCodeSVG value={qrUrl} size={120} className=' mx-auto' />
            <p
              className="text-sm text-gray-700 mt-2"
              style={{ color: titleColor }}
            >
              Scan for details
            </p>
          </div>
        )}
        {price && !isNaN(parseFloat(price)) && (
          <div className="backdrop-blur-2xl shadow-md bg-black/20 p-4 flex-1 rounded-2xl text-center shadow-md flex flex-col justify-center items-center">
          <p
            className="text-sm text-gray-700 mb-1"
            style={{ color: titleColor }}
          >
            Entry Fee
          </p>
          <p
            className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent"
            style={{ color: titleColor }}
          >
            {formatCurrency(parseFloat(price), currency)}
          </p>
        </div>
        )}
      </div>

      {/* Logo */}
      {logo && (
        <div className="flex justify-center mt-6">
          <div className="relative w-20 h-20">
            <Image
              src={logo}
              alt="Logo"
              fill
              className="rounded-xl object-cover border-2 border-white/50 shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  </div>
)}


{/* brandcard display */}
{selectedVariant === 'brand' && (
  <div
    className="relative min-h-[600px] p-4 md:p-8 rounded-xl shadow-2xl overflow-hidden"
    style={{
      background: `linear-gradient(135deg, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
    }}
  >
    {/* Animated Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to transparent animate-gradient"></div>
    
    {/* Background Image with Parallax */}
    {heroImage && (
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 transform transition-transform duration-1000 hover:scale-105"
        style={{
          backgroundImage: `url(${URL.createObjectURL(heroImage)})`,
        }}
      ></div>
    )}

    {/* Glass Morphism Containers */}
    <div className="relative z-10 flex flex-col gap-6 h-full max-w-2xl mx-auto">
      
      {/* Logo Section */}
      {logo && (
  <div className="flex justify-center -mt-2">
    <div className="relative w-24 h-24 md:w-32 md:h-32">
      <img
        src={typeof logo === 'string' ? logo : URL.createObjectURL(logo)}
        alt="Brand Logo"
        className="rounded-full object-cover border-4 border-white/30 shadow-xl transition-transform duration-300 hover:scale-105"
      />
    </div>
  </div>
)}

      {/* Brand Info Section */}
      <div className="space-y-4 text-center">
        <h1
          className="text-3xl md:text-5xl font-black tracking-tight animate-text bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent"
          style={{ color: textColors.brandName }}
        >
          {brandName || "Your Brand"}
        </h1>

        <p
          className="text-xl md:text-2xl font-light italic"
          style={{ color: textColors.tagline }}
        >
          {tagline || "Your Vision, Our Mission"}
        </p>
      </div>

      {/* Content Cards */}
      <div className="space-y-4 md:space-y-6">
        {description && (
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg border border-white/5">
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: textColors.description }}
            >
              {description}
            </p>
          </div>
        )}

        {orderPolicies && (
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg border border-white/5">
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: textColors.orderPolicies }}
            >
              {orderPolicies}
            </p>
          </div>
        )}

        {contactInfo && (
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg border border-white/5">
            <p
              className="text-base md:text-lg break-words"
              style={{ color: textColors.contactInfo }}
            >
              {contactInfo}
            </p>
          </div>
        )}
      </div>

      {/* Social Links + QR Section */}
      <div className="mt-auto pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Social Media Handles */}
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(socialMediaLinks).map(([platform, handle]) => (
            handle && (
              <div
                key={platform}
                className="flex items-center justify-center rounded-full bg-white/15 backdrop-blur-lg p-3 transition-colors duration-300"
                style={{ color: textColors[platform] }}
              >
                <span className="text-lg font-medium">{handle}</span>
              </div>
            )
          ))}
        </div>

        {/* QR Code */}
        {qrUrl && (
          <div className="backdrop-blur-lg bg-white/15 p-3 rounded-xl">
            <QRCodeSVG value={qrUrl} size={80} />
          </div>
        )}
      </div>
    </div>
  </div>
)}

{/* InviatationCard display */}
{selectedVariant === 'invitation' && (
  <div
    className="relative min-h-[600px] p-6 md:p-8 rounded-2xl shadow-2xl overflow-hidden"
    style={{
      background:
        bgType === 'gradient'
          ? `linear-gradient(135deg, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
          : bgType === 'solid'
          ? solidColor
          : `url(${heroImage}) no-repeat center center/cover`,
    }}
  >
    {/* Decorative Elements */}
    <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
    <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

    <div className="relative z-10 flex flex-col items-center gap-8">
      {/* Logo */}
      {logo && (
        <div className="transform hover:scale-105 transition-transform duration-300">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/30 shadow-xl overflow-hidden">
            <img
              src={typeof logo === 'string' ? logo : URL.createObjectURL(logo)}
              alt="Event Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Event Name */}
      {eventName && (
        <div className="w-full max-w-2xl transform hover:-translate-y-1 transition-all duration-300">
          <div className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
            <h3 
              className="text-3xl md:text-5xl font-bold text-center tracking-tight" 
              style={{ color: textColors.eventName }}
            >
              {eventName}
            </h3>
          </div>
        </div>
      )}

      {/* Event Details */}
      <div className="space-y-4 text-center max-w-xl">
        {eventDate && (
          <p 
            className="text-xl md:text-2xl font-light"
            style={{ color: textColors.eventDate }}
          >
            Date: {eventDate}
          </p>
        )}
        {eventTime && (
          <p 
            className="text-lg md:text-xl"
            style={{ color: textColors.eventTime }}
          >
            Time: {eventTime}
          </p>
        )}
        {eventLocation && (
          <p 
            className="text-lg md:text-xl italic"
            style={{ color: textColors.eventLocation }}
          >
            Location: {eventLocation} 😊
          </p>
        )}
      </div>

      {/* Invitee and Inviter Names */}
      <div className="space-y-4 text-center max-w-xl">
        {inviteeName && (
          <p 
            className="text-lg md:text-xl"
            style={{ color: textColors.inviteeName }}
          >
            Dear {inviteeName},
          </p>
        )}
        {inviterName && (
          <p 
            className="text-lg md:text-xl"
            style={{ color: textColors.inviterName }}
          >
            You are cordially invited by {inviterName}
          </p>
        )}
        {occasion && (
          <p 
            className="text-lg md:text-xl"
            style={{ color: textColors.occasion }}
          >
            to the occasion of {occasion}
          </p>
        )}
      </div>

      {/* Description */}
      {description && (
        <div className="w-full max-w-2xl">
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
            <p 
              className="text-lg text-center whitespace-pre-wrap leading-relaxed"
              style={{ color: textColors.description }}
            >
              {description}
            </p>
          </div>
        </div>
      )}

      {/* QR Code */}
      {qrUrl && (
        <div className="mt-auto">
          <div className="p-4 bg-white/15 backdrop-blur-xl rounded-2xl border border-white/20 flex flex-col items-center gap-3">
            <QRCodeSVG 
              value={qrUrl} 
              size={120}
              className="rounded-xl"
            />
            <p 
              className="text-sm font-medium tracking-wide"
              style={{ color: textColors.qrUrl }}
            >
              Scan to RSVP
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
)}

    {/* Budget Display */}
      {selectedVariant === 'budget' && (
        <div className="relative bg-gradient-to-br pb-0 from-gray-800 via-gray-700 to-gray-900 p-2 rounded-b-md rounded-2xl shadow-xl overflow-hidden">
          {/* Subtle Background Elements */}
          <div className="absolute inset-0 bg-grid-gray-600/10 z-0"></div>
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-teal-500/20 rounded-full blur-3xl z-0"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl z-0"></div>

          <div className="relative z-10 space-y-4">
            {/* Header Section */}
            <div className="text-center border-b border-gray-600/20 pb-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-teal-300">
                {title || 'Monthly Budget'}
              </h2>
              <p className="text-sm md:text-base text-gray-400">{budgetState.monthYear}</p>
              <div className="mt-2 text-xl md:text-2xl font-bold text-teal-100">
                {formatCurrency(budgetState.totalBudget, budgetState.currency)}
              </div>
            </div>

            {/* Budget Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {budgetState.categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-gray-700 p-3 rounded-lg shadow-sm border border-gray-600"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base md:text-lg font-medium text-teal-200">
                      {category.name}
                    </h3>
                    <span className="text-sm text-gray-300">
                      {formatCurrency(category.amount, budgetState.currency)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-400 rounded-full"
                      style={{
                        width: `${(category.amount / budgetState.totalBudget) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-600">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm md:text-base text-gray-400">Total Spent</span>
                <span className="text-sm md:text-base text-teal-200 font-medium">
                  {formatCurrency(
                    budgetState.categories.reduce((acc, cat) => acc + cat.amount, 0),
                    budgetState.currency
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm md:text-base text-gray-400">Remaining</span>
                <span className="text-sm md:text-base text-teal-200 font-medium">
                  {formatCurrency(
                    budgetState.totalBudget -
                      budgetState.categories.reduce((acc, cat) => acc + cat.amount, 0),
                    budgetState.currency
                  )}
                </span>
              </div>
            </div>

            {/* Footer Section */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-600/20">
              {logo && (
                <div className="relative w-12 h-12">
                  <Image
                    src={logo}
                    alt="Logo"
                    fill
                    className="rounded-full object-cover border-2 border-gray-500"
                  />
                </div>
              )}
              <div className="text-sm pb-1.5 text-gray-400">
                <p>Plan your expenses wisely</p>
                <p className="text-teal-300 font-medium">Powered by Kardify</p>
              </div>
            </div>
          </div>
        </div>
      )}

    {/* Recipe Display */}
      {selectedVariant === 'recipe' && (
        <div className={`relative p-3 rounded-t-xl rounded-b-xl rounded-2xl shadow-2xl overflow-hidden`}
        style={{backgroundColor: backgroundColor,}}>
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 space-y-4">
            {/* Header */}
            <div className="text-center border-b border-white/20 pb-4">
              <h2 className="text-4xl font-mono text-white mb-2">{title || 'Recipe Name'}</h2>
              <div className="flex justify-center gap-4 text-white/90">
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

            {/* Ingredients */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">Ingredients</h3>
              <ul className="space-y-2 text-white/90">
                {ingredients.map((ing, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{ing.item}</span>
                    <span className="text-white/70">{ing.amount}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">Instructions</h3>
              <ol className="space-y-2 text-white/90 list-decimal list-inside">
                {instructions.map((inst, idx) => (
                  <li key={idx}>{inst.step}</li>
                ))}
              </ol>
            </div>

            {/* Chef's Tips */}
            {chefTips && (
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
                <p className="text-white/90 italic">💡 Chef's Tip: {chefTips}</p>
              </div>
            )}

            {/* Image and Difficulty */}
            <div className="md:w-1/3 space-y-6">
              {image && (
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <Image src={image} alt={title} width={300} height={300} className=" w-full h-[200px] object-cover object-top" />
                </div>
              )}
              
              <div className="bg-white/50 backdrop-blur-md p-4 rounded-lg">
                <div className="text-center">
                  <span className={`px-2 py-1 rounded-md text-sm font-medium ${getDifficultyColor(difficulty)}`}>
        {difficulty.toUpperCase()}
      </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-between items-center">
              {logo && (
                <div className="relative w-16 h-16">
                  <Image src={logo} alt="Logo" fill className="rounded-full object-cover border-2 border-white/50" />
                </div>
              )}
              {/* <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm">
                Kardify Recipe
              </div> */}
            </div>
          </div>
        </div>
      )}


    {/* idcard Display */}
      {selectedVariant === 'idCard' && showIDCard && (
        <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-4 rounded-2xl rounded-b-md shadow-2xl border border-slate-700/30 max-w-full mx-auto overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute inset-0 bg-grid-slate-700/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-tr from-slate-700/30 to-transparent rounded-full blur-3xl"></div>

          {/* Card Content */}
          <div className="relative z-10 space-y-4">
            {/* Header */}
            <div className=' flex justify-center items-center w-full'>
            <div className="flex items-center">
              {logo && (
                <div className="relative w-16 h-16">
                  <Image src={logo} alt="Logo" fill className="object-contain rounded-full" />
                </div>
              )}
              <div className="">
                <h3 className="text-sm font-semibold text-center text-indigo-400 tracking-wider">IDENTIFICATION CARD</h3>
                <p className="text-xs text-center text-slate-400">Valid until {idCardDetails.expiryDate || 'MM/DD/YYYY'}</p>
              </div>
            </div>
            </div>   
            {/* Main Details Section */}
            <div className="flex gap-4">
              {/* Left Column: Personal Info */}
              <div className="flex-1 space-y-4">
                {/* Name & Department */}
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold text-white">{idCardDetails.name || 'Full Name'}</h2>
                  <p className="text-lg text-indigo-300">{idCardDetails.department || 'Department'}</p>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <p className="text-stone-50/80  text-[11px] text-center  rounded-xl font-semibold">ID Number</p>
                    <p className="font-medium text-stone-50/90 bg-slate-800 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.idNumber || 'XXXX-XXXX'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-stone-50/80  text-[11px] text-center  rounded-xl font-semibold">Issue Date</p>
                    <p className="font-medium text-stone-50/90 bg-slate-800 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.issueDate || 'MM/DD/YYYY'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-stone-50/80  text-[11px] text-center  rounded-xl font-semibold">Expiry Date</p>
                    <p className="font-medium text-stone-50/90 bg-slate-800 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.expiryDate || 'MM/DD/YYYY'}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Photo & QR Code */}
              <div className="flex flex-col items-center gap-4">
                {/* Profile Picture */}
                <div className="relative w-[110px] h-[150px] rounded-xl overflow-hidden border-2 border-slate-700/50 shadow-2xl">
                  {idCardDetails.photo ? (
                    <Image src={idCardDetails.photo} alt="Profile" fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-slate-800 text-slate-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* QR Code */}
                {qrUrl && (
                  <div className="bg-white/90 p-2 rounded-lg shadow-xl">
                    <QRCodeSVG value={qrUrl} size={90} />
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-slate-700/50">
              <div className="flex justify-between items-center">
                {/* Signature Placeholder */}
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">Authorized Signature</p>
                  <div className="h-8 w-40 border-b border-slate-600"></div>
                </div>

                {/* Footer Tag */}
                <div className="px-2 py-1.5 rounded-lg bg-slate-800/50 backdrop-blur-sm">
                  <p className="text-xs text-slate-400">Powered by Kardify</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    {/* Add contract card display */}
      {selectedVariant === 'contract' && (
        <div className="relative bg-gradient-to-br from-slate-900 to-blue-900 p-3 rounded-2xl rounded-b-md shadow-2xl overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute z-10 inset-0 bg-grid-white/10"></div>
          <div className="absolute z-10 top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          
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


    {/* Add birthday card display */}
      {selectedVariant === "birthday" && (
        <div className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-4 rounded-2xl shadow-2xl rounded-b-md overflow-hidden animate-gradient-x">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-[url('/confetti.png')] opacity-20 animate-spin-slow"></div>
          <div className="absolute -top-28 -right-28 w-[28rem] h-[28rem] bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-28 -left-28 w-[28rem] h-[28rem] bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          <div className="relative z-10 space-y-10">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-7xl font-serif text-white drop-shadow-lg mb-4 animate-bounce-slow">
                {wishType || "Happy Birthday!"}
              </h2>
              <p className="text-5xl font-extrabold text-yellow-300 drop-shadow-lg mb-4 animate-fade-in">
                {celebrantName || "Dear Friend"}
              </p>
              {age && (
                <p className="text-3xl text-white/90 drop-shadow-lg">
                  on your {age}
                  <sup>th</sup> Birthday!
                </p>
              )}
            </div>

            {/* Main Image */}
            {image && (
              <div className="relative mx-auto w-72 h-72 rounded-full overflow-hidden border-[6px] border-white/60 shadow-2xl hover:scale-105 transition-transform duration-300">
                <Image
                  src={image}
                  alt="Birthday Memory"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Countdown Timer */}
            <div className="text-center">
              <p className="text-xl text-white/80">Your next birthday is in:</p>
              <p className="text-4xl font-bold text-white tracking-wide">
                {calculateDaysUntilNextBirthday(age)}
              </p>
            </div>

            {/* Message */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-lg">
              <p className="text-2xl text-white text-center font-medium leading-relaxed tracking-wide">
                {message ||
                  "Wishing you a day filled with love, joy, laughter, and amazing memories. You are cherished beyond words!"}
              </p>
            </div>

            {/* Social Media Share */}
            <div className="text-center space-x-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-all">
                Share on Facebook
              </button>
              <button className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md transition-all">
                Tweet
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg shadow-md transition-all">
                Share on Instagram
              </button>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-6">
              <div className="flex items-center gap-4">
                {logo && (
                  <div className="relative w-16 h-16 hover:scale-110 transition-transform duration-300">
                    <Image
                      src={logo}
                      alt="Logo"
                      fill
                      className="rounded-full object-cover border-2 border-white/50"
                    />
                  </div>
                )}
                {qrUrl && (
                  <div className="bg-white/95 p-2 rounded-xl shadow-lg">
                    <QRCodeSVG value={qrUrl} size={48} />
                  </div>
                )}
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm shadow-md">
                Celebrate with Kardify 🎉
              </div>
            </div>
          </div>
        </div>
      )}

    {/* Add Affirmations card display */}
    {selectedVariant === 'affirmations' && (
  <div
    className="relative p-4 rounded-2xl rounded-b-none shadow-2xl overflow-hidden group transition-all duration-500 hover:shadow-indigo-500/20"
    style={{
      backgroundColor: cardBackgroundColor || '#FFFFFF',
    }}
  >
    {/* Animated Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-blue-500/10 to-purple-500/10 animate-gradient" />
    <div className="absolute inset-0 backdrop-blur-xl bg-white/10" />
    
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-grid-white/5 opacity-30" />

    <div className="relative p-6 space-y-8">
      {/* Header Section with Enhanced Typography */}
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <h3
          className="text-5xl font-bold tracking-tight transition-all duration-300 group-hover:scale-105"
          style={{ color: titleColor }}
        >
          {affirmationTitle || 'Daily Affirmation'}
        </h3>
        <div className="flex items-center gap-2 text-sm font-medium opacity-75">
          <ClockIcon className="w-4 h-4" />
          <span style={{ color: affirmationTextColor || '#6B7280' }}>
            {affirmationTime || 'Time'} • {affirmationDate || 'Date'}
          </span>
        </div>
      </div>

      {/* Affirmation Text with Quote Marks */}
      <div className="relative overflow-hidden rounded-2xl bg-white/5 p-8 backdrop-blur-xl border border-white/20 
        transform transition-all duration-300 hover:bg-white/10 group/card">
        <div className="absolute top-4 left-4 text-6xl opacity-20" style={{ color: affirmationTextColor }}>
          "
        </div>
        <p
          className=" whitespace-break-spaces relative text-2xl leading-relaxed text-center font-medium transition-all duration-300 
            group-hover/card:scale-105"
          style={{ color: affirmationTextColor || '#FFFFFF' }}
        >
          {affirmationText || 'Your inspiring affirmation text goes here.'}
        </p>
        <div className="absolute bottom-4 right-4 text-6xl opacity-20" style={{ color: affirmationTextColor }}>
          "
        </div>
      </div>

      {/* Footer with Enhanced Layout */}
      <div className="pt-4 border-t flex items-center justify-between gap-6 border-white/10">
        <div className="flex items-center gap-4">
          <CalendarIcon className="w-5 h-5 opacity-75" style={{ color: affirmationTextColor }} />
          <p
            className="text-lg font-medium"
            style={{ color: affirmationTextColor }}
          >
            {affirmationDate || 'Date'}
          </p>
        </div>
        
        {qrUrl && (
          <div className="bg-white/90 p-2 rounded-xl shadow-xl transform transition-all duration-300 
            hover:scale-105 hover:rotate-3">
            <QRCodeSVG value={qrUrl} size={44} />
          </div>
        )}
      </div>
    </div>
  </div>
)}

    {/* Add Menu card display */}
    {selectedVariant === 'menu' && (
  <div
    className="space-y-4 p-4 bg-white shadow-2xl rounded-b-none rounded-2xl relative"
    style={{
      backgroundColor: menuBackgroundColor || '#FFFFFF',
    }}
  >
    {/* Menu Header */}
    <div className="text-center space-y-2">
      <h1
        className="text-4xl font-bold tracking-tight"
        style={{ color: menuTitleColor || '#333' }}
      >
        {menuTitle || 'Restaurant Menu'}
      </h1>
      {menuSubtitle && (
        <p className="text-lg" style={{ color: menuSubtitleColor || '#666' }}>
          {menuSubtitle} 
        </p>
      )}
      {menuDate && !isDateOptional && (
        <p className="text-sm" style={{ color: menuDateColor || '#666' }}>
          {new Date(menuDate).toLocaleDateString()}
        </p>
      )}
    </div>

    {/* Menu Categories */}
    <div className="space-y-6">
      {menuCategories && menuCategories.length > 0 ? (
        menuCategories.map((category, catIndex) => (
          <div key={catIndex}>
            {/* Single Category Header */}
            <div className="mb-4">
              <h2
                className="text-2xl font-semibold border-b pb-2"
                style={{ color: category.textColor || '#555' }}
              >
                {category.name || `Category ${catIndex + 1}`}
              </h2>
              {category.description && (
                <p className="text-sm text-gray-500 mt-1">
                  {category.description}
                </p>
              )}
            </div>

            {/* Menu Items for Category */}
            <div className="space-y-6">
              {category.items && category.items.length > 0 ? (
                category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center space-x-4 p-4 rounded-lg shadow-sm"
                    style={{ backgroundColor: innerCardColor }}
                  >
                    {/* Item Image */}
                    {item.image && (
                      <div className="w-16 h-16 overflow-hidden rounded-lg">
                        <img
                          src={URL.createObjectURL(item.image as File)}
                          alt={item.name || `Item ${itemIndex + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    {/* Item Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3
                          className="text-lg font-medium"
                          style={{ color: item.textColor || '#333' }}
                        >
                          {item.name || `Item ${itemIndex + 1}`}
                        </h3>
                        <span className="text-sm font-semibold text-gray-600">
                          {item.price ? formatCurrency(parseFloat(item.price), item.currency || 'USD') : formatCurrency(0, item.currency || 'USD')}
                        </span>
                      </div>
                      {item.description && (
                        <p
                          className="text-sm text-gray-500"
                          style={{ color: item.descriptionColor || '#555' }}
                        >
                          {item.description}
                        </p>
                      )}
                      {item.tags && (
                        <div className="flex gap-2 mt-2">
                          {item.tags.split(',').map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-gray-100 text-xs text-gray-600 px-2 py-1 rounded-full"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No items available in this category.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No categories to display.</p>
      )}
    </div>

    {/* Special Section */}
    {specialItemDescription &&  (
    <div className="p-4 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-center text-gray-900">Today's Special</h3>
    <p className="text-sm text-center text-gray-800 mt-1">{specialItemDescription}</p>
  </div>
)}
{qrUrl && (
  <div className="  flex items-center  w-full p-1 justify-end rounded-lg mt-2">
    <QRCodeSVG value={qrUrl} size={40} />
  </div>
)}
  </div>
)}

    {/* Event Variant */}
      {selectedVariant === 'event' && (
        <div className="bg-white/95 p-4 rounded-2xl rounded-b-md shadow-lg">
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
              <div className="text-center bg-white p-3 rounded-xl shadow-md">
                <QRCodeSVG value={qrUrl} size={80} />
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

      {/* Mood */}
      {selectedVariant === 'mood' && (
  <div className={`relative p-4 rounded-t-xl rounded-b-xl rounded-2xl shadow-2xl overflow-hidden`}
        style={{backgroundColor: backgroundColor,}}>
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
    
    <div className="relative p-4 space-y-3">
      {/* Header with Profile */}
      <div className="flex  w-full items-start justify-between">
        <div className="space-y-4">
          <h3 className={`text-4xl font-bold w-full bg-gradient-to-r text-center from-emerald-500 to-teal-600   bg-clip-text text-transparent`} style={{color: titleColor}}>
            {title || 'My Mood'}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-5xl animate-bounce-slow transform transition-all duration-300 hover:scale-110 cursor-pointer" >
              {moodSmiley}
            </span>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
            <div className="space-y-1">
              {/* <p className="text-gray-400 text-sm font-medium">{date}</p> */}
              <p className="text-gray-300 font-semibold" style={{color: titleColor}}>{name}</p>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center gap-6">
        
        {moodPicture && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-all duration-300 rounded-2xl" />
            <div className="relative h-24 w-24 rounded-2xl overflow-hidden ring-2 ring-white/20 transform transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
              <Image
                src={moodPicture}
                alt="Mood"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        </div>
        
      </div>

      {/* Description Card */}
      {description && (
        <div className="relative overflow-hidden rounded-2xl bg-white/5 p-4 backdrop-blur-lg border border-white/10 transform transition-all duration-300 hover:bg-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
          <p className="relative text-gray-300 leading-relaxed text-lg" style={{color: titleColor}}>
            {description}
          </p>
        </div>
      )}

      {/* Date and Name Section */}
      <div className="pt-2 border-t flex items-center w-full justify-between gap-6 border-white/20">
        <p className="text-white leading-relaxed text-lg" style={{color: titleColor}}>
          <strong>Date:</strong> {date}
        </p>
        {/* <p className="text-white leading-relaxed text-lg">
          <strong>Name:</strong> {name}
        </p> */}
        {qrUrl && (
                  <div className="bg-white/90 p-1 justify-end  rounded-lg shadow-xl" >
                    <QRCodeSVG value={qrUrl} size={40} />
                  </div>
                )}
      </div>

      {/* Footer Accent */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" /> */}
    </div>
  </div>
)}

    {/* Invoice/Receipt/E-Invoice Variants */}
      {(selectedVariant === 'invoice' || selectedVariant === 'receipt' || selectedVariant === 'einvoice') && (
        <div className="bg-white p-4 rounded-b-md rounded-2xl space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-stone-950" style={{color: titleColor}}>
                {selectedVariant === 'receipt' ? 'Receipt' : 'Invoice'} #{invoiceNumber}
              </h3>
              <p className="text-sm text-stone-950" style={{color: titleColor}}>Date: {new Date().toLocaleDateString()}</p>
              {dueDate && <p className="text-sm text-stone-950" style={{color: titleColor}}>Due: {dueDate}</p>}
            </div>
            {qrUrl && <QRCodeSVG value={qrUrl} size={60} className="bg-white p-1 rounded-lg" />}
          </div>

          <div className="space-y-2">
            {largeDescription && (
          <div className="mt-4 text-stone-950 whitespace-pre-line" style={{color: titleColor}}>{largeDescription}</div>
        )}
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex justify-between items-center p-4 backdrop-blur-md bg-white/5 rounded-2xl mb-2 hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-stone-950 font-medium" style={{color: titleColor}}>{item.description}</span>
                <span className="text-stone-950 font-semibold" style={{color: titleColor}}>
                  {formatCurrency(item.amount, currency)}
                </span>
              </motion.div>
            ))}

            <div className="border-t border-white/10 pt-4 mt-6">
              {taxRate > 0 && (
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex justify-between text-stone-950 mb-2"style={{color: titleColor}}
                >
                  <span>Tax ({taxRate}%)</span>
                  <span>{formatCurrency(items.reduce((sum, item) => sum + item.amount, 0) * (taxRate / 100), currency)}</span>
                </motion.div>
              )}
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-between font-bold text-stone-950 text-xl mt-2 bg-white p-4 rounded-2xl shadow-md" style={{color: titleColor}}
              >
                <span style={{color: titleColor}}>Total</span>
                <span style={{color: titleColor}}>
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

    {/* Footer */}
      <div className="mt-2 flex justify-end">
      <div className="text-xs rounded-t-none w-full text-center rounded-b-2xl px-1 py-2 rounded-md bg-slate-800/40 text-stone-50" style={{color: titleColor}}>
       Powered by KardifyMe+
      </div>
      </div>
      </div>
        
          )}
          
        </motion.div>
      </div>


      {/* input fields */}
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-3">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
    Create Your Card
  </h1>
        {/* input fields */}
        <div className="space-y-4">
          {/* Other Inputs */}

          


          {/* Select Card Type */}

          <div className="space-y-4 bg-gradient-to-br from-white to-gray-50/80 p-4 md:p-8 rounded-3xl shadow-xl border border-gray-100">
  {/* Card Type Selector */}
  <div className="space-y-2">
    <label className="block text-lg font-semibold text-gray-800">
      Select Card Type
      <span className="ml-2 text-gray-400 text-sm font-normal">Choose your design</span>
    </label>
    <div className="relative mt-1">
      <select
        value={selectedVariant}
        onChange={(e) => setSelectedVariant(e.target.value as VariantType)}
        className="w-full p-4 pr-12 text-gray-700 bg-white rounded-2xl border border-gray-200 
                 shadow-sm appearance-none cursor-pointer transition-all duration-200
                 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      >
        <option value="business">💼 Business Card</option>
        <option value="event">🎫 Event Ticket</option>
        <option value="product">🛍️ Product Showcase</option>
        <option value="invoice">📄 Invoice</option>
        <option value="receipt">🧾 Receipt</option>
        <option value="einvoice">📧 E-Invoice</option>
        <option value="flyer">📜 E-Flyer</option>
        <option value="recipe">🍲 Recipe</option>
        <option value="contract">📜 Contract</option>
        <option value="birthday">🎂 Birthday</option>
        <option value="budget">💰 Budget</option>
        <option value="idCard">🆔 ID Card</option>
        <option value="mood">🌈 Mood Board</option>
        <option value="affirmations">💬 Affirmations</option>
        <option value="brand">🏷️ Brand Card</option>
        <option value="invitation">💌 Invitation</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
        <svg className="w-5 h-5 transition-transform duration-200 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>

  {/* Style Controls */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {/* Card Color Picker */}
    <div className="space-y-2 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
      <label className="block font-medium text-gray-700">
        Card Color
        <span className="ml-2 text-sm text-gray-400">Customize appearance</span>
      </label>
      <div className="relative group">
        <input
          type="color"
          value={cardColor[selectedVariant]}
          onChange={(e) => setCardColor({ ...cardColor, [selectedVariant]: e.target.value })}
          className="w-full h-12 rounded-xl cursor-pointer transition-transform duration-200 
                   hover:scale-[1.02] focus:scale-[1.02] border border-gray-200"
          title="Select card color"
        />
        <div className="absolute inset-0 rounded-xl ring-2 ring-gray-200 pointer-events-none 
                      transition-opacity opacity-0 group-hover:opacity-100" />
      </div>
    </div>

    {/* Template Selector */}
    <div className="space-y-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <label className="block font-medium text-gray-700">
        Template Style
        <span className="ml-2 text-sm text-gray-400">Choose Font</span>
      </label>
      <select
        value={selectedTemplate[selectedVariant]}
        onChange={(e) => setSelectedTemplate({
          ...selectedTemplate,
          [selectedVariant]: e.target.value
        })}
        className="w-full p-3 text-gray-700 bg-white rounded-xl border border-gray-200 
                 shadow-sm appearance-none cursor-pointer transition-all duration-200
                 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      >
        {templateOptions[selectedVariant].map((template) => (
          <option key={template} value={template}>
            {template.charAt(0).toUpperCase() + template.slice(1)}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Text Color Picker */}
  <div className="space-y-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <label className="block font-medium text-gray-700">
      Text Color
      <span className="ml-2 text-sm text-gray-400">Set font color</span>
    </label>
    <div className="relative group">
      <input
        type="color"
        value={titleColor}
        onChange={(e) => setTitleColor(e.target.value)}
        className="w-full h-12 rounded-xl cursor-pointer transition-transform duration-200 
                 hover:scale-[1.02] focus:scale-[1.02] border border-gray-200"
      />
      <div className="absolute inset-0 rounded-xl ring-2 ring-gray-200 pointer-events-none 
                    transition-opacity opacity-0 group-hover:opacity-100" />
    </div>
  </div>
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
                      title="Delete item"
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

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-stone-950 mb-2">Gradient From</label>
        <input
          type="color"
          value={gradientFrom}
          onChange={(e) => setGradientFrom(e.target.value)}
          className="w-full h-10 rounded-lg border border-slate-300"
        />
      </div>
      <div>
        <label className="block text-stone-950 mb-2">Gradient Via</label>
        <input
          type="color"
          value={gradientVia}
          onChange={(e) => setGradientVia(e.target.value)}
          className="w-full h-10 rounded-lg border border-slate-300"
        />
      </div>
      <div>
        <label className="block text-stone-950 mb-2">Gradient To</label>
        <input
          type="color"
          value={gradientTo}
          onChange={(e) => setGradientTo(e.target.value)}
          className="w-full h-10 rounded-lg border border-slate-300"
        />
      </div>
      {/* Background Image Upload */}
    <div>
      <label className="block text-gray-800 font-medium mb-2">Upload Background Image</label>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setBackgroundImage(e.target.files[0]);
          }
        }}
        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
        accept="image/*"
      />
    </div>
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

{/* BRandcard field */}
{selectedVariant === 'brand' && (
  <div className="space-y-6 bg-white p-6 shadow-lg rounded-2xl">
    {/* Brand Name */}
    <div>
      <label className="block text-gray-700 font-medium mb-2">Brand Name</label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter brand name"
        />
        <input
          type="color"
          value={textColors.brandName}
          onChange={(e) => setTextColors({ ...textColors, brandName: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300"
          title="Brand Name Text Color"
        />
      </div>
    </div>

    {/* Tagline */}
    <div>
      <label className="block text-gray-700 font-medium mb-2">Tagline</label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter tagline"
        />
        <input
          type="color"
          value={textColors.tagline}
          onChange={(e) => setTextColors({ ...textColors, tagline: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300"
          title="Tagline Text Color"
        />
      </div>
    </div>

    {/* Description */}
    <div>
      <label className="block text-gray-700 font-medium mb-2">Description</label>
      <div className="flex items-center gap-2">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter description"
        />
        <input
          type="color"
          value={textColors.description}
          onChange={(e) => setTextColors({ ...textColors, description: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300"
          title="Description Text Color"
        />
      </div>
    </div>

    {/* Order Policies */}
    <div>
      <label className="block text-gray-700 font-medium mb-2">Order Policies</label>
      <div className="flex items-center gap-2">
        <textarea
          value={orderPolicies}
          onChange={(e) => setOrderPolicies(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter order policies"
        />
        <input
          type="color"
          value={textColors.orderPolicies}
          onChange={(e) => setTextColors({ ...textColors, orderPolicies: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300"
          title="Order Policies Text Color"
        />
      </div>
    </div>

    {/* Contact Information */}
    <div>
      <label className="block text-gray-700 font-medium mb-2">Contact Information</label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter contact information"
        />
        <input
          type="color"
          value={textColors.contactInfo}
          onChange={(e) => setTextColors({ ...textColors, contactInfo: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300"
          title="Contact Information Text Color"
        />
      </div>
    </div>

    {/* Social Media Links */}
    <div>
      <label className="block text-gray-700 font-medium mb-2">Social Media Links</label>
      <div className="space-y-2">
        {Object.keys(socialMediaLinks).map((platform) => (
          <div key={platform} className="flex items-center gap-2">
            <input
              type="text"
              value={socialMediaLinks[platform as keyof typeof socialMediaLinks]}
              onChange={(e) => setSocialMediaLinks({ ...socialMediaLinks, [platform]: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${platform} link`}
            />
            <input
              type="color"
              value={textColors[platform as keyof typeof textColors]}
              onChange={(e) => setTextColors({ ...textColors, [platform]: e.target.value })}
              className="w-10 h-10 rounded-lg border border-gray-300"
              title={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Text Color`}
            />
          </div>
        ))}
      </div>
    </div>

    {/* Hero Image */}
    <div>
      <label className="block text-gray-700 font-medium mb-2">Upload Hero Image</label>
      <div className="space-y-2">
        {heroImage && (
          <div className="relative w-full h-40 bg-gray-100 rounded-xl overflow-hidden shadow-md">
            <img src={URL.createObjectURL(heroImage)} alt="Uploaded" className="object-cover w-full h-full" />
            <button
              title="Delete hero image"
              onClick={() => setHeroImage(null)}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setHeroImage(e.target.files[0]);
            }
          }}
          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
          accept="image/*"
        />
      </div>
    </div>

    {/* Logo */}
    <div>
      <label className="block text-gray-700 font-medium mb-2">Upload Your Logo</label>
      <div className="space-y-2">
        {logo && (
          <div className="relative w-full h-32 bg-gray-100 rounded-xl overflow-hidden shadow-md">
            <img src={typeof logo === 'string' ? logo : URL.createObjectURL(logo)} alt="Logo" className="object-cover w-full h-full" />
            <button
              onClick={() => setLogo('')}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setLogo(reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
          accept="image/*"
        />
      </div>
    </div>

    {/* Background Gradient */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2">Gradient From</label>
        <input
          type="color"
          value={gradientFrom}
          onChange={(e) => setGradientFrom(e.target.value)}
          className="w-full h-10 rounded-lg border border-gray-300"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Gradient Via</label>
        <input
          type="color"
          value={gradientVia}
          onChange={(e) => setGradientVia(e.target.value)}
          className="w-full h-10 rounded-lg border border-gray-300"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Gradient To</label>
        <input
          type="color"
          value={gradientTo}
          onChange={(e) => setGradientTo(e.target.value)}
          className="w-full h-10 rounded-lg border border-gray-300"
        />
      </div>
    </div>

    {/* QR Code URL */}
    <div>
      <label className="block text-gray-700 font-medium mb-2">QR Code URL</label>
      <input
        type="text"
        value={qrUrl}
        onChange={(e) => setQrUrl(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        placeholder="Enter QR Code URL"
      />
    </div>
  </div>
)}

{/* Invitation input field */}
{selectedVariant === 'invitation' && (
  <div className="space-y-6 p-4 backdrop-blur-3xl bg-black/30 rounded-lg shadow-lg">
    {/* Background Type Selection */}
    <div>
      <label className="block text-gray-800 mb-2 font-medium">Background Type</label>
      <select
        value={bgType}
        onChange={(e) => setBgType(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 bg-white"
      >
        <option value="gradient">Gradient</option>
        <option value="solid">Solid Color</option>
        <option value="image">Hero Image</option>
      </select>
    </div>

    {/* Gradient Background Inputs */}
    {bgType === 'gradient' && (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <label className="block text-gray-800 mb-1 text-sm">Gradient From</label>
          <input
            type="color"
            value={gradientFrom}
            onChange={(e) => setGradientFrom(e.target.value)}
            className="w-full h-10 rounded-lg border border-gray-300 bg-white"
          />
        </div>
        <div>
          <label className="block text-gray-800 mb-1 text-sm">Gradient Via</label>
          <input
            type="color"
            value={gradientVia}
            onChange={(e) => setGradientVia(e.target.value)}
            className="w-full h-10 rounded-lg border border-gray-300 bg-white"
          />
        </div>
        <div>
          <label className="block text-gray-800 mb-1 text-sm">Gradient To</label>
          <input
            type="color"
            value={gradientTo}
            onChange={(e) => setGradientTo(e.target.value)}
            className="w-full h-10 rounded-lg border border-gray-300 bg-white"
          />
        </div>
      </div>
    )}

    {/* Solid Color Background Input */}
    {bgType === 'solid' && (
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Solid Background Color</label>
        <input
          type="color"
          value={solidColor}
          onChange={(e) => setSolidColor(e.target.value)}
          className="w-full h-10 rounded-lg border border-gray-300 bg-white"
        />
      </div>
    )}

    {/* Hero Image Background Input */}
    {bgType === 'image' && (
  <div>
    <label className="block text-gray-800 mb-1 text-sm">Upload Hero Image</label>
    <input
      type="file"
      onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
            setHeroImage(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      }}
      className="w-full p-3 rounded-lg border border-gray-300 bg-white"
      accept="image/*"
    />
    {heroImage && (
      <div className="relative mt-4 w-full h-64 bg-gray-200 rounded-xl overflow-hidden shadow-md">
        <img
          src={heroImage}
          alt="Hero"
          className="object-cover w-full h-full"
        />
        <button
          onClick={() => setHeroImage('')}
          className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    )}
  </div>
)}

    {/* Event Information */}
    <div className="space-y-4">
      {/* Event Name */}
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Event Name</label>
        <textarea
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 bg-white"
        />
        <input
          type="color"
          value={textColors.eventName}
          onChange={(e) => setTextColors({ ...textColors, eventName: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300 mt-2 bg-white"
          title="Event Name Text Color"
        />
      </div>
      {/* Event Date */}
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Event Date</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 bg-white"
        />
        <input
          type="color"
          value={textColors.eventDate}
          onChange={(e) => setTextColors({ ...textColors, eventDate: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300 mt-2 bg-white"
          title="Event Date Text Color"
        />
      </div>
      {/* Event Time */}
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Event Time</label>
        <input
          type="time"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 bg-white"
        />
        <input
          type="color"
          value={textColors.eventTime}
          onChange={(e) => setTextColors({ ...textColors, eventTime: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300 mt-2 bg-white"
          title="Event Time Text Color"
        />
      </div>
      {/* Event Location */}
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Event Location 😊</label>
        <textarea
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 bg-white"
        />
        <input
          type="color"
          value={textColors.eventLocation}
          onChange={(e) => setTextColors({ ...textColors, eventLocation: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300 mt-2 bg-white"
          title="Event Location Text Color"
        />
      </div>
    </div>

    {/* Invitee and Inviter Information */}
    <div className="space-y-4">
      {/* Invitee Name */}
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Invitee Name</label>
        <textarea
          value={inviteeName}
          onChange={(e) => setInviteeName(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 bg-white"
        />
        <input
          type="color"
          value={textColors.inviteeName}
          onChange={(e) => setTextColors({ ...textColors, inviteeName: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300 mt-2 bg-white"
          title="Invitee Name Text Color"
        />
      </div>
      {/* Inviter Name */}
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Inviter Name</label>
        <textarea
          value={inviterName}
          onChange={(e) => setInviterName(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 bg-white"
        />
        <input
          type="color"
          value={textColors.inviterName}
          onChange={(e) => setTextColors({ ...textColors, inviterName: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300 mt-2 bg-white"
          title="Inviter Name Text Color"
        />
      </div>
      {/* Occasion */}
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Occasion</label>
        <textarea
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 bg-white"
        />
        <input
          type="color"
          value={textColors.occasion}
          onChange={(e) => setTextColors({ ...textColors, occasion: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300 mt-2 bg-white"
          title="Occasion Text Color"
        />
      </div>
    </div>

    {/* Description */}
    <div>
      <label className="block text-gray-800 mb-1 text-sm">Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 bg-white"
        rows={3}
      />
      <input
        type="color"
        value={textColors.description}
        onChange={(e) => setTextColors({ ...textColors, description: e.target.value })}
        className="w-10 h-10 rounded-lg border border-gray-300 mt-2 bg-white"
        title="Description Text Color"
      />
    </div>

    {/* QR Code */}
    <div>
      <label className="block text-gray-800 mb-1 text-sm">QR Code URL</label>
      <input
        type="url"
        value={qrUrl}
        onChange={(e) => setQrUrl(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 bg-white"
      />
    </div>

    {/* Logo Upload */}
    <div>
      <label className="block text-gray-800 mb-1 text-sm">Upload Logo</label>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
              setLogo(reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        }}
        className="w-full p-3 rounded-lg border border-gray-300 bg-white"
        accept="image/*"
      />
    </div>
  </div>
)}



{/* Budget Input Field */}
{selectedVariant === 'budget' && (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <label className="block text-stone-950 mb-2 font-medium">Month & Year</label>
        <input
          type="month"
          value={budgetState.monthYear}
          onChange={(e) => setBudgetState({...budgetState, monthYear: e.target.value})}
          className="w-full p-3 rounded-xl border border-slate-300"
        />
      </div>
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Currency</label>
        <select
          value={budgetState.currency}
          onChange={(e) => setBudgetState({...budgetState, currency: e.target.value})}
          className="w-full p-3 rounded-xl border border-slate-300"
        >
          {currencyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div>
      <label className="block text-stone-950 mb-2 font-medium">Total Budget</label>
      <input
        type="number"
        value={budgetState.totalBudget}
        onChange={(e) => setBudgetState({...budgetState, totalBudget: parseFloat(e.target.value)})}
        className="w-full p-3 rounded-xl border border-slate-300"
        placeholder="Enter total budget"
      />
    </div>

    <div className="space-y-4">
      <label className="block text-stone-950 mb-2 font-medium">Budget Categories</label>
      {budgetState.categories.map((category, index) => (
        <div key={category.id} className="flex gap-2">
          <input
            type="text"
            value={category.name}
            onChange={(e) => {
              const newCategories = [...budgetState.categories];
              newCategories[index].name = e.target.value;
              setBudgetState({...budgetState, categories: newCategories});
            }}
            className="flex-1 p-3 rounded-xl border border-slate-300"
            placeholder="Category name"
          />
          <input
            type="number"
            value={category.amount}
            onChange={(e) => {
              const newCategories = [...budgetState.categories];
              newCategories[index].amount = parseFloat(e.target.value);
              setBudgetState({...budgetState, categories: newCategories});
            }}
            className="w-32 p-3 rounded-xl border border-slate-300"
            placeholder="Amount"
          />
          <button
            onClick={() => {
              const newCategories = budgetState.categories.filter((_, i) => i !== index);
              setBudgetState({...budgetState, categories: newCategories});
            }}
            className="p-3 text-red-500 hover:bg-red-50 rounded-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ))}
      <button
        onClick={() => {
          setBudgetState({
            ...budgetState,
            categories: [
              ...budgetState.categories,
              { id: crypto.randomUUID(), name: '', amount: 0 }
            ]
          });
        }}
        className="w-full p-3 text-blue-600 hover:bg-blue-50 rounded-xl border border-blue-200"
      >
        Add Category
      </button>
    </div>
  </div>
)}

{/* // Add to the form section where other inputs are present */}
{selectedVariant === 'idCard' && (
  <div className="space-y-6 bg-white p-4 shadow-lg rounded-2xl">
  {/* Show ID Card Toggle */}
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={showIDCard}
      onChange={(e) => setShowIDCard(e.target.checked)}
      className="w-5 h-5 accent-blue-500"
    />
    <label className="text-gray-800 font-semibold">Show ID Card</label>
  </div>

  {showIDCard && (
    <div className="space-y-4 bg-gray-50 p- rounded-lg shadow-md">
      {/* Input Fields */}
      <div>
        <label className="block text-gray-800 font-medium mb-2">Name</label>
        <input
          type="text"
          value={idCardDetails.name}
          onChange={(e) => setIDCardDetails({ ...idCardDetails, name: e.target.value })}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 bg-white shadow-sm"
          placeholder="Enter name"
        />
      </div>

      <div>
        <label className="block text-gray-800 font-medium mb-2">ID Number</label>
        <input
          type="text"
          value={idCardDetails.idNumber}
          onChange={(e) => setIDCardDetails({ ...idCardDetails, idNumber: e.target.value })}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 bg-white shadow-sm"
          placeholder="Enter ID number"
        />
      </div>

      <div>
        <label className="block text-gray-800 font-medium mb-2">Department</label>
        <input
          type="text"
          value={idCardDetails.department}
          onChange={(e) => setIDCardDetails({ ...idCardDetails, department: e.target.value })}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 bg-white shadow-sm"
          placeholder="Enter department"
        />
      </div>

      <div>
        <label className="block text-gray-800 font-medium mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 bg-white shadow-sm"
          placeholder="Enter a title"
        />
      </div>

      <div>
        <label className="block text-gray-800 font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 bg-white shadow-sm"
          placeholder="Enter a description"
        />
      </div>

      <div>
        <label className="block text-gray-800 font-medium mb-2">Issue Date</label>
        <input
          type="date"
          value={idCardDetails.issueDate}
          onChange={(e) => setIDCardDetails({ ...idCardDetails, issueDate: e.target.value })}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 bg-white shadow-sm"
        />
      </div>

      <div>
        <label className="block text-gray-800 font-medium mb-2">Expiry Date</label>
        <input
          type="date"
          value={idCardDetails.expiryDate}
          onChange={(e) => setIDCardDetails({ ...idCardDetails, expiryDate: e.target.value })}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 bg-white shadow-sm"
        />
      </div>

      <div>
        <label className="block text-gray-800 font-medium mb-2">Photo</label>
        {idCardDetails.photo ? (
          <div className="relative w-32 h-32 bg-gray-200 rounded-xl overflow-hidden shadow-md">
            <img src={idCardDetails.photo} alt="ID Card Photo" className="object-cover w-full h-full" />
            <button
              onClick={() => setIDCardDetails({ ...idCardDetails, photo: '' })}
              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <input
            type="file"
            onChange={(e) => {
              if (!e.target.files) return;
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setIDCardDetails({ ...idCardDetails, photo: reader.result as string });
                };
                reader.readAsDataURL(file);
              }
            }}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 bg-white shadow-sm"
            accept="image/*"
          />
        )}
      </div>
    </div>
  )}
</div>

)}

{/* Recipe Input Fields */}
{selectedVariant === 'recipe' && (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    <div className="flex gap-2">
    <input
      type="number"
      value={contractValue}
      onChange={(e) => setContractValue(e.target.value)}
      className="flex-1 p-3 rounded-xl border border-slate-300"
      placeholder="Enter contract value"
    />
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="w-32 p-3 rounded-xl border border-slate-300"
    >
      {currencyOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
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

{/* Add Affirmations input fields */}
{selectedVariant === 'affirmations' && (
  <div className="space-y-4">
    {/* Title Input */}
    <div>
      <label className="block text-gray-900 mb-1 text-sm font-medium">
        Affirmation Title
      </label>
      <input
        type="text"
        value={affirmationTitle}
        onChange={(e) => setAffirmationTitle(e.target.value)}
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder="Enter your affirmation title"
      />
    </div>

    {/* Affirmation Text Input */}
    <div>
      <label className="block text-gray-900 mb-1 text-sm font-medium">
        Affirmation Text
      </label>
      <textarea
        value={affirmationText}
        onChange={(e) => setAffirmationText(e.target.value)}
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder="Enter your affirmation"
        rows={3}
      />
    </div>

    {/* Time and Date Inputs */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-900 mb-1 text-sm font-medium">
          Time of Affirmation
        </label>
        <input
          type="time"
          value={affirmationTime}
          onChange={(e) => setAffirmationTime(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
      <div>
        <label className="block text-gray-900 mb-1 text-sm font-medium">
          Date of Affirmation
        </label>
        <input
          type="date"
          value={affirmationDate}
          onChange={(e) => setAffirmationDate(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
    </div>

    {/* Color Customization Inputs */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-900 mb-1 text-sm">
          Affirmation Text Color
        </label>
        <input
          type="color"
          value={affirmationTextColor}
          onChange={(e) => setAffirmationTextColor(e.target.value)}
          className="w-full h-10 rounded-lg border border-gray-300"
        />
      </div>
      <div>
        <label className="block text-gray-900 mb-1 text-sm">
          Card Background Color
        </label>
        <input
          type="color"
          value={cardBackgroundColor}
          onChange={(e) => setCardBackgroundColor(e.target.value)}
          className="w-full h-10 rounded-lg border border-gray-300"
        />
      </div>
    </div>
  </div>
)}


{/* Add birthday input fields */}
{selectedVariant === 'birthday' && (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Celebrant's Name</label>
        <input
          type="text"
          value={celebrantName}
          onChange={(e) => setCelebrantName(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300"
          placeholder="Enter name"
        />
      </div>
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300"
          placeholder="Enter age"
        />
      </div>
    </div>

    <div>
      <label className="block text-stone-950 mb-2 font-medium">Birthday Message</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-3 rounded-xl border border-slate-300 min-h-[100px]"
        placeholder="Write your birthday message..."
      />
    </div>

    <div>
      <label className="block text-stone-950 mb-2 font-medium">Wish Type</label>
      <select
        value={wishType}
        onChange={(e) => setWishType(e.target.value)}
        className="w-full p-3 rounded-xl border border-slate-300"
      >
        <option>Happy Birthday</option>
        <option>Happy Birthday!</option>
        <option>Many Happy Returns</option>
        <option>Feliz Cumpleaños</option>
        <option>Joyeux Anniversaire</option>
      </select>
    </div>
  </div>
)}



          {/* Base form fields for all variants */}
          <div className="space-y-6">
          {/* <TemplateSelector /> */}

            {/* Product specific fields */}
            {(selectedVariant === 'product' || selectedVariant === 'business' ) && (
              <>
              <div>
        <label className={baseLabelStyles}>Inner BG Color</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          className="w-full h-[45px] backdrop-blur-sm
        rounded-xl"
        />
      </div>
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
                      <option value="NGN">₦</option>
                      <option value="GHC">GHC</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-stone-950 mb-2">Detailed Description </label>
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

            {/* MOOD SPECIFIC FIELDS */}
            {selectedVariant === 'mood' && (
  <div className="space-y-6">
    <div>
        <label className="block text-stone-950 mb-2">Inner BG Color</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          className="w-full h-10 rounded-lg border border-slate-300"
        />
      </div>
    <div>
      <label className="block text-stone-950 mb-2">Mood Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded-lg border border-slate-300"
        placeholder="Enter mood title"
      />
    </div>
    <div>
      <label className="block text-stone-950 mb-2">Mood Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 rounded-lg border border-slate-300"
        placeholder="Enter mood description"
      />
    </div>
    
    <div>
      <label className="block text-stone-950 mb-2">Mood Picture</label>
      <input
        type="file"
        onChange={(e) => handleImageChange(e, 'moodPicture')}
        className="w-full p-2 rounded-lg border border-slate-300"
        accept="image/*"
      />
    </div>
    <div>
      <label className="block text-stone-950 mb-2">Mood Smiley</label>
      <select
        value={moodSmiley}
        onChange={(e) => setMoodSmiley(e.target.value)}
        className="w-full p-2 rounded-lg border border-slate-300"
      >
        {smileys.map((smiley) => (
          <option key={smiley} value={smiley}>
            {smiley}
          </option>
        ))}
      </select>
    </div>
    
    <div>
      <label className="block text-stone-950 mb-2">Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 rounded-lg border border-slate-300"
      />
    </div>
    <div>
      <label className="block text-stone-950 mb-2">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 rounded-lg border border-slate-300"
        placeholder="Enter your name"
      />
    </div>
  </div>
            )}


            {/* Menu specific fields */}
            {selectedVariant === 'menu' && (
  <div className="space-y-6 p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg">
    {/* Menu Title and Subtitle */}
    <div className="grid gap-4">
      <div>
        <label className="block text-gray-700 text-sm font-medium">Menu Title</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={menuTitle}
            onChange={(e) => setMenuTitle(e.target.value)}
            className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter Menu Title"
          />
          <input
            type="color"
            value={menuTitleColor}
            onChange={(e) => setMenuTitleColor(e.target.value)}
            className="w-10 h-10 mt-1 rounded-lg border border-gray-300"
            title="Title Text Color"
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-medium">Menu Subtitle</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={menuSubtitle}
            onChange={(e) => setMenuSubtitle(e.target.value)}
            className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter Menu Subtitle"
          />
          <input
            type="color"
            value={menuSubtitleColor}
            onChange={(e) => setMenuSubtitleColor(e.target.value)}
            className="w-10 h-10 mt-1 rounded-lg border border-gray-300"
            title="Subtitle Text Color"
          />
        </div>
      </div>
    </div>

    {/* Menu Date */}
    <div className="space-y-2">
      <label className="block text-gray-700 text-sm font-medium">Menu Date</label>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="date"
          value={menuDate || ''}
          onChange={(e) => setMenuDate(e.target.value)}
          className="w-full sm:w-auto mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="color"
          value={menuDateColor}
          onChange={(e) => setMenuDateColor(e.target.value)}
          className="w-10 h-10 border border-gray-300 rounded-lg"
          title="Date Text Color"
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isDateOptional}
            onChange={(e) => setIsDateOptional(e.target.checked)}
            className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
          />
          <label className="ml-2 text-gray-700 text-sm">Optional Date</label>
        </div>
      </div>
    </div>

    {/* Inner Card Color */}
    <div className="space-y-2">
      <label className="block text-gray-700 text-sm font-medium">Inner Card Color</label>
      <input
        type="color"
        value={innerCardColor}
        onChange={(e) => setInnerCardColor(e.target.value)}
        className="w-full mt-2 h-10 rounded-lg border border-gray-300"
        title="Inner Card Color"
      />
    </div>

    {/* Menu Background Color */}
    <div className="space-y-2">
      <label className="block text-gray-700 text-sm font-medium">Menu Background Color</label>
      <input
        type="color"
        value={menuBackgroundColor}
        onChange={(e) => setMenuBackgroundColor(e.target.value)}
        className="w-full mt-2 h-10 rounded-lg border border-gray-300"
        title="Menu Background Color"
      />
    </div>

    {/* Menu Categories */}
    <div className="space-y-4">
      <label className="block text-gray-700 text-sm font-medium">Menu Categories</label>
      {menuCategories.map((category, index) => (
        <div
          key={index}
          className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4"
        >
          {/* Category Name */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={category.name}
              onChange={(e) => {
                const updatedCategories = [...menuCategories];
                updatedCategories[index].name = e.target.value;
                setMenuCategories(updatedCategories);
              }}
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
              placeholder="Category Name"
            />
            <input
              type="color"
              value={category.textColor}
              onChange={(e) => {
                const updatedCategories = [...menuCategories];
                updatedCategories[index].textColor = e.target.value;
                setMenuCategories(updatedCategories);
              }}
              className="w-10 h-10 border border-gray-300 rounded-lg"
              title="Category Text Color"
            />
            <button
              onClick={() =>
                setMenuCategories(menuCategories.filter((_, i) => i !== index))
              }
              className="text-red-500 text-lg hover:bg-red-50 p-2 rounded-full"
            >
              ×
            </button>
          </div>

          {/* Category Description */}
          <textarea
            value={category.description}
            onChange={(e) => {
              const updatedCategories = [...menuCategories];
              updatedCategories[index].description = e.target.value;
              setMenuCategories(updatedCategories);
            }}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
            placeholder="Category Description"
          ></textarea>

          {/* Menu Items */}
          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-medium">Menu Items</label>
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => {
                    const updatedCategories = [...menuCategories];
                    updatedCategories[index].items[itemIndex].name = e.target.value;
                    setMenuCategories(updatedCategories);
                  }}
                  className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                  placeholder="Item Name"
                />
                <input
                  type="text"
                  value={item.price}
                  onChange={(e) => {
                    const updatedCategories = [...menuCategories];
                    updatedCategories[index].items[itemIndex].price = e.target.value;
                    setMenuCategories(updatedCategories);
                  }}
                  className="w-24 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                  placeholder="Price"
                />
                <select
                  value={item.currency}
                  onChange={(e) => {
                    const updatedCategories = [...menuCategories];
                    updatedCategories[index].items[itemIndex].currency = e.target.value;
                    setMenuCategories(updatedCategories);
                  }}
                  className="w-24 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="USD">USD</option>
                  <option value="NGN">NGN</option>
                  <option value="GHS">GHS</option>
                  <option value="EUR">EUR</option>
                </select>
                <button
                  onClick={() => {
                    const updatedCategories = [...menuCategories];
                    updatedCategories[index].items = updatedCategories[index].items.filter(
                      (_, i) => i !== itemIndex
                    );
                    setMenuCategories(updatedCategories);
                  }}
                  className="text-red-500 text-lg hover:bg-red-50 p-2 rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const updatedCategories = [...menuCategories];
                updatedCategories[index].items.push({ name: '', price: '', currency: 'USD' });
                setMenuCategories(updatedCategories);
              }}
              className="text-emerald-600 mt-2 hover:text-emerald-700"
            >
              + Add Item
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() =>
          setMenuCategories([
            ...menuCategories,
            { name: '', textColor: '#000', description: '', items: [] },
          ])
        }
        className="text-emerald-600 mt-4 hover:text-emerald-700"
      >
        + Add Category
      </button>
    </div>

    {/* Special Section */}
    <div>
      <label className="block text-gray-700 text-sm font-medium">Special Section</label>
      <textarea
        value={specialItemDescription}
        onChange={(e) => setSpecialItemDescription(e.target.value)}
        className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
        placeholder="Enter Today's Special Description"
      ></textarea>
    </div>
  </div>
)}

            {/* Invoice/Receipt/E-Invoice fields */}
            {(selectedVariant === 'invoice' || selectedVariant === 'receipt' || selectedVariant === 'einvoice') && (
              <>
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
            <div className="p-6 space-y-6 bg-gradient-to-b from-gray-50 to-gray-100 shadow-lg rounded-2xl">
  {/* Upload Hero Image */}
  <div className="space-y-4">
    <label className="block text-lg font-medium text-gray-900">Upload Hero Image</label>
    <div className="space-y-2">
      {image && (
        <div className="relative w-full h-40 bg-gray-200 rounded-xl overflow-hidden shadow-md">
          <img src={image} alt="Uploaded Hero" className="object-cover w-full h-full" />
          <button
            title="Delete Hero Image"
            onClick={() => handleDeleteImage('main')}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <input
        type="file"
        onChange={(e) => handleImageChange(e, 'main')}
        className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        accept="image/*"
      />
    </div>
  </div>

  {/* Upload Logo */}
  <div className="space-y-4">
    <label className="block text-lg font-medium text-gray-900">Upload Your Logo</label>
    <div className="space-y-2">
      {logo && (
        <div className="relative w-full h-32 bg-gray-200 rounded-xl overflow-hidden shadow-md">
          <img src={logo} alt="Logo" className="object-cover w-full h-full" />
          <button
            onClick={() => handleDeleteImage('logo')}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <input
        type="file"
        onChange={(e) => handleImageChange(e, 'logo')}
        className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        accept="image/*"
      />
    </div>
  </div>

  {/* QR Code URL */}
  <div>
    <label className="block text-lg font-medium text-gray-900">QR Code URL</label>
    <input
      type="text"
      value={qrUrl}
      title="Enter QR Code URL"
      onChange={(e) => setQrUrl(e.target.value)}
      className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
      placeholder="Enter QR Code URL"
    />
  </div>

  {/* Profile Picture */}
  {/* <div className="space-y-4">
    <label className="block text-lg font-medium text-gray-900">Upload Profile Picture</label>
    <div className="space-y-2">
    {profilePicture && (
        <div className="relative w-full h-40 bg-gray-200 rounded-xl overflow-hidden shadow-md">
          <img src={profilePicture} alt="Uploaded Hero" className="object-cover w-full h-full" />
          <button
            title="Delete Hero Image"
            onClick={() => handleDeleteImage('profilePicture')}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <input
        type="file"
        onChange={handleProfilePictureChange}
        className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        title="Upload a profile picture"
        accept="image/*"
      />
    </div>
  </div> */}
</div>




{/* Checkbox Example */}
<div className={baseWrapperStyles}>
      <label className={baseLabelStyles}>Show Sections</label>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showTopPart}
            onChange={(e) => setShowTopPart(e.target.checked)}
            className="form-checkbox text-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-slate-700">Show Top Section</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showBottomPart}
            onChange={(e) => setShowBottomPart(e.target.checked)}
            className="form-checkbox text-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-slate-700">Show Bottom Section</span>
        </label>
      </div>
    </div>

          </div>
        </div>

      {/* Submit Button */}
    <div className="pt-4">
      <button
        onClick={generateImage}
        disabled={isLoading}
        className="
          w-full py-4 px-8
          bg-gradient-to-r from-blue-600 to-indigo-600
          hover:from-blue-700 hover:to-indigo-700
          text-white font-medium
          rounded-xl
          shadow-lg shadow-blue-500/25
          hover:shadow-blue-500/40
          transform hover:-translate-y-0.5
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          disabled:hover:translate-y-0
        "
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generating...
          </span>
        ) : (
          'Download Card'
        )}
      </button>
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
    ${'templates' in (cardVariants[selectedVariant] as any) 
      ? (cardVariants[selectedVariant] as any)?.templates[selectedTemplate[selectedVariant]]?.background
      : (cardVariants[selectedVariant] as any)?.gradient}
    ${'templates' in (cardVariants[selectedVariant] as any) ? (cardVariants[selectedVariant] as any)?.templates[selectedTemplate[selectedVariant]]?.font : ''}
    ${'templates' in cardVariants[selectedVariant] ? (cardVariants[selectedVariant] as any)?.templates[selectedTemplate[selectedVariant]]?.layout : ''}
    rounded-[20px] 
    shadow-[0_8px_32px_rgba(0,0,0,0.15)] 
    backdrop-blur-xl 
    overflow-hidden 
    w-full
    transition-colors duration-300
  `}
  style={{
    backgroundColor: cardColor[selectedVariant],
  }}
>
          {/* Card Hero with responsive height */}
          {showTopPart && (
  <div className="relative rounded-xl w-full h-[150px] sm:h-[250px] md:h-[300px]">
    {image ? (
      <Image
        src={image || place} // Set default image
        alt={title || 'Card Image'}
        fill
        className={`object-cover rounded-t-2xl transition-transform duration-700 ${
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
      <div className="w-full h-full rounded-2xl bg-gray-200 flex items-center justify-center">
        <Image
          src={place || place} // Set default image
          alt={title || 'Card Image'}
          fill
          className={`object-cover rounded-xl transition-transform duration-700 ${
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
      <h1 className={`text-xl md:text-6xl ${'titleFont' in cardVariants[selectedVariant] ? cardVariants[selectedVariant].titleFont : 'default-font'} text-white mb-2 tracking-tight`}>
        {title || 'Untitled'}
      </h1>
      <p className="text-base sm:text-xl md:text-2xl text-white/80 max-w-3xl whitespace-pre-line font-light ">
        {description}
      </p>
      {price && !isNaN(parseFloat(price)) &&  (
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
)}

          {/* Update the card content section */}
          {showBottomPart && (
            <div className={`p-2 ${selectedVariant === 'product' ? '' : ''}`}>
    {/* Product Variant */}
        {selectedVariant === 'product' && (
          <div className={`relative p-4 rounded-t-xl rounded-b-xl rounded-2xl shadow-2xl overflow-hidden`}
          style={{backgroundColor: backgroundColor,}}>
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
        <div className={`relative p-4 rounded-t-xl rounded-b-xl rounded-2xl shadow-2xl overflow-hidden`}
        style={{backgroundColor: backgroundColor,}}>
          <div className="flex justify-between items-start">
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-stone-50" style={{color: titleColor}}>{title}</h3>
              <p className="text-xl font-medium whitespace-pre-line text-stone-50" style={{color: titleColor}}>{description}</p>
            </div>
            {qrUrl && (
              <div className="bg-white p-2 rounded-xl shadow-md">
                <QRCodeSVG value={qrUrl} size={80} />
              </div>
            )}
          </div>
          
          <div className="prose max-w-full">
            <p className="text-lg text-stone-50 whitespace-pre-line leading-relaxed" style={{color: titleColor}}>{largeDescription}</p>
          </div>
          
        </div>
      )}

    {/* Flyer Display */}
    {selectedVariant === 'flyer' && (
  <div
    className="relative p-3 rounded-b-none rounded-2xl shadow-2xl overflow-hidden"
    style={{
      background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
    }}
  >
    {/* Background Image */}
    {backgroundImage && (
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `url(${URL.createObjectURL(backgroundImage)})`,
        }}
      ></div>
    )}

    {/* Decorative Elements */}
    <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
    <div className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-400/30 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl"></div>

    {/* Flyer Content */}
    <div className="relative z-10 h-full space-y-8 text-center">
      {/* Title */}
      <h3
        className="text-5xl font-bold text-white"
        style={{ color: titleColor }}
      >
        {title || "Party All Night!"}
      </h3>

      {/* Description */}
      <p
        className="text-2xl text-white/90"
        style={{ color: titleColor }}
      >
        {description || "Join us for an unforgettable evening!"}
      </p>

      {/* Main Content */}
      <div className=" p-6 rounded-xl bg-black/20 backdrop-blur-2xl shadow-md">
        <p
          className="text-xl whitespace-pre-wrap text-white"
          style={{ color: titleColor }}
        >
          {largeDescription ||
            "Live music, drinks, and amazing vibes. Don't miss it!"}
        </p>
      </div>

      {/* QR Code & Price */}
      <div className="flex flex-wrap justify-center gap-6">
        {qrUrl && (
          <div className="backdrop-blur-2xl shadow-md bg-black/20 p-2 rounded-lg  h-fit  shadow-md">
            <QRCodeSVG value={qrUrl} size={120} className=' mx-auto' />
            <p
              className="text-sm text-gray-700 mt-2"
              style={{ color: titleColor }}
            >
              Scan for details
            </p>
          </div>
        )}
        {price && !isNaN(parseFloat(price)) && (
          <div className="backdrop-blur-2xl shadow-md bg-black/20 p-4 flex-1 rounded-2xl text-center shadow-md flex flex-col justify-center items-center">
          <p
            className="text-sm text-gray-700 mb-1"
            style={{ color: titleColor }}
          >
            Entry Fee
          </p>
          <p
            className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent"
            style={{ color: titleColor }}
          >
            {formatCurrency(parseFloat(price), currency)}
          </p>
        </div>
        )}
      </div>

      {/* Logo */}
      {logo && (
        <div className="flex justify-center mt-6">
          <div className="relative w-20 h-20">
            <Image
              src={logo}
              alt="Logo"
              fill
              className="rounded-xl object-cover border-2 border-white/50 shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  </div>
)}


{/* brandcard display */}
{selectedVariant === 'brand' && (
  <div
    className="relative min-h-[600px] p-4 md:p-8 rounded-xl shadow-2xl overflow-hidden"
    style={{
      background: `linear-gradient(135deg, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
    }}
  >
    {/* Animated Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to transparent animate-gradient"></div>
    
    {/* Background Image with Parallax */}
    {heroImage && (
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 transform transition-transform duration-1000 hover:scale-105"
        style={{
          backgroundImage: `url(${URL.createObjectURL(heroImage)})`,
        }}
      ></div>
    )}

    {/* Glass Morphism Containers */}
    <div className="relative z-10 flex flex-col gap-6 h-full max-w-2xl mx-auto">
      
      {/* Logo Section */}
      {logo && (
  <div className="flex justify-center -mt-2">
    <div className="relative w-24 h-24 md:w-32 md:h-32">
      <img
        src={typeof logo === 'string' ? logo : URL.createObjectURL(logo)}
        alt="Brand Logo"
        className="rounded-full object-cover border-4 border-white/30 shadow-xl transition-transform duration-300 hover:scale-105"
      />
    </div>
  </div>
)}

      {/* Brand Info Section */}
      <div className="space-y-4 text-center">
        <h1
          className="text-3xl md:text-5xl font-black tracking-tight animate-text bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent"
          style={{ color: textColors.brandName }}
        >
          {brandName || "Your Brand"}
        </h1>

        <p
          className="text-xl md:text-2xl font-light italic"
          style={{ color: textColors.tagline }}
        >
          {tagline || "Your Vision, Our Mission"}
        </p>
      </div>

      {/* Content Cards */}
      <div className="space-y-4 md:space-y-6">
        {description && (
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg border border-white/5">
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: textColors.description }}
            >
              {description}
            </p>
          </div>
        )}

        {orderPolicies && (
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg border border-white/5">
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: textColors.orderPolicies }}
            >
              {orderPolicies}
            </p>
          </div>
        )}

        {contactInfo && (
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg border border-white/5">
            <p
              className="text-base md:text-lg break-words"
              style={{ color: textColors.contactInfo }}
            >
              {contactInfo}
            </p>
          </div>
        )}
      </div>

      {/* Social Links + QR Section */}
      <div className="mt-auto pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Social Media Handles */}
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(socialMediaLinks).map(([platform, handle]) => (
            handle && (
              <div
                key={platform}
                className="flex items-center justify-center rounded-full bg-white/15 backdrop-blur-lg p-3 transition-colors duration-300"
                style={{ color: textColors[platform] }}
              >
                <span className="text-lg font-medium">{handle}</span>
              </div>
            )
          ))}
        </div>

        {/* QR Code */}
        {qrUrl && (
          <div className="backdrop-blur-lg bg-white/15 p-3 rounded-xl">
            <QRCodeSVG value={qrUrl} size={80} />
          </div>
        )}
      </div>
    </div>
  </div>
)}

{/* invitationcard display */}
{selectedVariant === 'invitation' && (
  <div
    className="relative min-h-[600px] p-6 md:p-8 rounded-2xl shadow-2xl overflow-hidden"
    style={{
      background:
        bgType === 'gradient'
          ? `linear-gradient(135deg, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
          : solidColor,
    }}
  >
    {/* Decorative Elements */}
    <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
    <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

    <div className="relative z-10 flex flex-col items-center gap-8">
      {/* Logo */}
      {logo && (
        <div className="transform hover:scale-105 transition-transform duration-300">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/30 shadow-xl overflow-hidden">
            <img
              src={typeof logo === 'string' ? logo : URL.createObjectURL(logo)}
              alt="Event Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Event Name */}
      {eventName && (
        <div className="w-full max-w-2xl transform hover:-translate-y-1 transition-all duration-300">
          <div className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
            <h3 
              className="text-3xl md:text-5xl font-bold text-center tracking-tight" 
              style={{ color: textColors.eventName }}
            >
              {eventName}
            </h3>
          </div>
        </div>
      )}

      {/* Event Details */}
      <div className="space-y-4 text-center max-w-xl">
        {eventDate && (
          <p 
            className="text-xl md:text-2xl font-light"
            style={{ color: textColors.eventDate }}
          >
            Date: {eventDate}
          </p>
        )}
        {eventTime && (
          <p 
            className="text-lg md:text-xl"
            style={{ color: textColors.eventTime }}
          >
            Time: {eventTime}
          </p>
        )}
        {eventLocation && (
          <p 
            className="text-lg md:text-xl italic"
            style={{ color: textColors.eventLocation }}
          >
            Location: {eventLocation} 😊
          </p>
        )}
      </div>

      {/* Invitee and Inviter Names */}
      <div className="space-y-4 text-center max-w-xl">
        {inviteeName && (
          <p 
            className="text-lg md:text-xl"
            style={{ color: textColors.inviteeName }}
          >
            Dear {inviteeName},
          </p>
        )}
        {inviterName && (
          <p 
            className="text-lg md:text-xl"
            style={{ color: textColors.inviterName }}
          >
            You are cordially invited by {inviterName}
          </p>
        )}
        {occasion && (
          <p 
            className="text-lg md:text-xl"
            style={{ color: textColors.occasion }}
          >
            to the occasion of {occasion}
          </p>
        )}
      </div>

      {/* Description */}
      {description && (
        <div className="w-full max-w-2xl">
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
            <p 
              className="text-lg text-center whitespace-pre-wrap leading-relaxed"
              style={{ color: textColors.description }}
            >
              {description}
            </p>
          </div>
        </div>
      )}

      {/* QR Code */}
      {qrUrl && (
        <div className="mt-auto">
          <div className="p-4 bg-white/15 backdrop-blur-xl rounded-2xl border border-white/20 flex flex-col items-center gap-3">
            <QRCodeSVG 
              value={qrUrl} 
              size={120}
              className="rounded-xl"
            />
            <p 
              className="text-sm font-medium tracking-wide"
              style={{ color: textColors.qrUrl }}
            >
              Scan to RSVP
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
)}

    {/* Budget Display */}
      {selectedVariant === 'budget' && (
        <div className="relative bg-gradient-to-br pb-0 from-gray-800 via-gray-700 to-gray-900 p-2 rounded-b-md rounded-2xl shadow-xl overflow-hidden">
          {/* Subtle Background Elements */}
          <div className="absolute inset-0 bg-grid-gray-600/10 z-0"></div>
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-teal-500/20 rounded-full blur-3xl z-0"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl z-0"></div>

          <div className="relative z-10 space-y-4">
            {/* Header Section */}
            <div className="text-center border-b border-gray-600/20 pb-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-teal-300">
                {title || 'Monthly Budget'}
              </h2>
              <p className="text-sm md:text-base text-gray-400">{budgetState.monthYear}</p>
              <div className="mt-2 text-xl md:text-2xl font-bold text-teal-100">
                {formatCurrency(budgetState.totalBudget, budgetState.currency)}
              </div>
            </div>

            {/* Budget Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {budgetState.categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-gray-700 p-3 rounded-lg shadow-sm border border-gray-600"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base md:text-lg font-medium text-teal-200">
                      {category.name}
                    </h3>
                    <span className="text-sm text-gray-300">
                      {formatCurrency(category.amount, budgetState.currency)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-400 rounded-full"
                      style={{
                        width: `${(category.amount / budgetState.totalBudget) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-600">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm md:text-base text-gray-400">Total Spent</span>
                <span className="text-sm md:text-base text-teal-200 font-medium">
                  {formatCurrency(
                    budgetState.categories.reduce((acc, cat) => acc + cat.amount, 0),
                    budgetState.currency
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm md:text-base text-gray-400">Remaining</span>
                <span className="text-sm md:text-base text-teal-200 font-medium">
                  {formatCurrency(
                    budgetState.totalBudget -
                      budgetState.categories.reduce((acc, cat) => acc + cat.amount, 0),
                    budgetState.currency
                  )}
                </span>
              </div>
            </div>

            {/* Footer Section */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-600/20">
              {logo && (
                <div className="relative w-12 h-12">
                  <Image
                    src={logo}
                    alt="Logo"
                    fill
                    className="rounded-full object-cover border-2 border-gray-500"
                  />
                </div>
              )}
              <div className="text-sm pb-1.5 text-gray-400">
                <p>Plan your expenses wisely</p>
                <p className="text-teal-300 font-medium">Powered by Kardify</p>
              </div>
            </div>
          </div>
        </div>
      )}

    {/* Recipe Display */}
      {selectedVariant === 'recipe' && (
        <div className={`relative p-3 rounded-t-xl rounded-b-xl rounded-2xl shadow-2xl overflow-hidden`}
        style={{backgroundColor: backgroundColor,}}>
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 space-y-4">
            {/* Header */}
            <div className="text-center border-b border-white/20 pb-4">
              <h2 className="text-4xl font-mono text-white mb-2">{title || 'Recipe Name'}</h2>
              <div className="flex justify-center gap-4 text-white/90">
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

            {/* Ingredients */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">Ingredients</h3>
              <ul className="space-y-2 text-white/90">
                {ingredients.map((ing, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{ing.item}</span>
                    <span className="text-white/70">{ing.amount}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">Instructions</h3>
              <ol className="space-y-2 text-white/90 list-decimal list-inside">
                {instructions.map((inst, idx) => (
                  <li key={idx}>{inst.step}</li>
                ))}
              </ol>
            </div>

            {/* Chef's Tips */}
            {chefTips && (
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl">
                <p className="text-white/90 italic">💡 Chef's Tip: {chefTips}</p>
              </div>
            )}

            {/* Image and Difficulty */}
            <div className="md:w-1/3 space-y-6">
              {image && (
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <Image src={image} alt={title} width={300} height={300} className=" w-full h-[200px] object-cover object-top" />
                </div>
              )}
              
              <div className="bg-white/50 backdrop-blur-md p-4 rounded-lg">
                <div className="text-center">
                  <span className={`px-2 py-1 rounded-md text-sm font-medium ${getDifficultyColor(difficulty)}`}>
        {difficulty.toUpperCase()}
      </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-between items-center">
              {logo && (
                <div className="relative w-16 h-16">
                  <Image src={logo} alt="Logo" fill className="rounded-full object-cover border-2 border-white/50" />
                </div>
              )}
              {/* <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm">
                Kardify Recipe
              </div> */}
            </div>
          </div>
        </div>
      )}


    {/* idcard Display */}
      {selectedVariant === 'idCard' && showIDCard && (
        <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-4 rounded-2xl rounded-b-md shadow-2xl border border-slate-700/30 max-w-full mx-auto overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute inset-0 bg-grid-slate-700/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-tr from-slate-700/30 to-transparent rounded-full blur-3xl"></div>

          {/* Card Content */}
          <div className="relative z-10 space-y-4">
            {/* Header */}
            <div className=' flex justify-center items-center w-full'>
            <div className="flex items-center">
              {logo && (
                <div className="relative w-16 h-16">
                  <Image src={logo} alt="Logo" fill className="object-contain rounded-full" />
                </div>
              )}
              <div className="">
                <h3 className="text-sm font-semibold text-center text-indigo-400 tracking-wider">IDENTIFICATION CARD</h3>
                <p className="text-xs text-center text-slate-400">Valid until {idCardDetails.expiryDate || 'MM/DD/YYYY'}</p>
              </div>
            </div>
            </div>   
            {/* Main Details Section */}
            <div className="flex gap-4">
              {/* Left Column: Personal Info */}
              <div className="flex-1 space-y-4">
                {/* Name & Department */}
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold text-white">{idCardDetails.name || 'Full Name'}</h2>
                  <p className="text-lg text-indigo-300">{idCardDetails.department || 'Department'}</p>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <p className="text-stone-50/80  text-[11px] text-center  rounded-xl font-semibold">ID Number</p>
                    <p className="font-medium text-stone-50/90 bg-slate-800 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.idNumber || 'XXXX-XXXX'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-stone-50/80  text-[11px] text-center  rounded-xl font-semibold">Issue Date</p>
                    <p className="font-medium text-stone-50/90 bg-slate-800 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.issueDate || 'MM/DD/YYYY'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-stone-50/80  text-[11px] text-center  rounded-xl font-semibold">Expiry Date</p>
                    <p className="font-medium text-stone-50/90 bg-slate-800 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.expiryDate || 'MM/DD/YYYY'}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Photo & QR Code */}
              <div className="flex flex-col items-center gap-4">
                {/* Profile Picture */}
                <div className="relative w-[110px] h-[150px] rounded-xl overflow-hidden border-2 border-slate-700/50 shadow-2xl">
                  {idCardDetails.photo ? (
                    <Image src={idCardDetails.photo} alt="Profile" fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-slate-800 text-slate-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* QR Code */}
                {qrUrl && (
                  <div className="bg-white/90 p-2 rounded-lg shadow-xl">
                    <QRCodeSVG value={qrUrl} size={90} />
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-slate-700/50">
              <div className="flex justify-between items-center">
                {/* Signature Placeholder */}
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">Authorized Signature</p>
                  <div className="h-8 w-40 border-b border-slate-600"></div>
                </div>

                {/* Footer Tag */}
                <div className="px-2 py-1.5 rounded-lg bg-slate-800/50 backdrop-blur-sm">
                  <p className="text-xs text-slate-400">Powered by Kardify</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    {/* Add contract card display */}
      {selectedVariant === 'contract' && (
        <div className="relative bg-gradient-to-br from-slate-900 to-blue-900 p-3 rounded-2xl rounded-b-md shadow-2xl overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute z-10 inset-0 bg-grid-white/10"></div>
          <div className="absolute z-10 top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          
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


    {/* Add birthday card display */}
      {selectedVariant === "birthday" && (
        <div className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-4 rounded-2xl shadow-2xl rounded-b-md overflow-hidden animate-gradient-x">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-[url('/confetti.png')] opacity-20 animate-spin-slow"></div>
          <div className="absolute -top-28 -right-28 w-[28rem] h-[28rem] bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-28 -left-28 w-[28rem] h-[28rem] bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          <div className="relative z-10 space-y-10">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-7xl font-serif text-white drop-shadow-lg mb-4 animate-bounce-slow">
                {wishType || "Happy Birthday!"}
              </h2>
              <p className="text-5xl font-extrabold text-yellow-300 drop-shadow-lg mb-4 animate-fade-in">
                {celebrantName || "Dear Friend"}
              </p>
              {age && (
                <p className="text-3xl text-white/90 drop-shadow-lg">
                  on your {age}
                  <sup>th</sup> Birthday!
                </p>
              )}
            </div>

            {/* Main Image */}
            {image && (
              <div className="relative mx-auto w-72 h-72 rounded-full overflow-hidden border-[6px] border-white/60 shadow-2xl hover:scale-105 transition-transform duration-300">
                <Image
                  src={image}
                  alt="Birthday Memory"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Countdown Timer */}
            <div className="text-center">
              <p className="text-xl text-white/80">Your next birthday is in:</p>
              <p className="text-4xl font-bold text-white tracking-wide">
                {calculateDaysUntilNextBirthday(age)}
              </p>
            </div>

            {/* Message */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-lg">
              <p className="text-2xl text-white text-center font-medium leading-relaxed tracking-wide">
                {message ||
                  "Wishing you a day filled with love, joy, laughter, and amazing memories. You are cherished beyond words!"}
              </p>
            </div>

            {/* Social Media Share */}
            <div className="text-center space-x-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-all">
                Share on Facebook
              </button>
              <button className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md transition-all">
                Tweet
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg shadow-md transition-all">
                Share on Instagram
              </button>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-6">
              <div className="flex items-center gap-4">
                {logo && (
                  <div className="relative w-16 h-16 hover:scale-110 transition-transform duration-300">
                    <Image
                      src={logo}
                      alt="Logo"
                      fill
                      className="rounded-full object-cover border-2 border-white/50"
                    />
                  </div>
                )}
                {qrUrl && (
                  <div className="bg-white/95 p-2 rounded-xl shadow-lg">
                    <QRCodeSVG value={qrUrl} size={48} />
                  </div>
                )}
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm shadow-md">
                Celebrate with Kardify 🎉
              </div>
            </div>
          </div>
        </div>
      )}

    {/* Add Affirmations card display */}
    {selectedVariant === 'affirmations' && (
  <div
    className="relative p-4 rounded-2xl rounded-b-none shadow-2xl overflow-hidden group transition-all duration-500 hover:shadow-indigo-500/20"
    style={{
      backgroundColor: cardBackgroundColor || '#FFFFFF',
    }}
  >
    {/* Animated Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-blue-500/10 to-purple-500/10 animate-gradient" />
    <div className="absolute inset-0 backdrop-blur-xl bg-white/10" />
    
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-grid-white/5 opacity-30" />

    <div className="relative p-6 space-y-8">
      {/* Header Section with Enhanced Typography */}
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <h3
          className="text-5xl font-bold tracking-tight transition-all duration-300 group-hover:scale-105"
          style={{ color: titleColor }}
        >
          {affirmationTitle || 'Daily Affirmation'}
        </h3>
        <div className="flex items-center gap-2 text-sm font-medium opacity-75">
          <ClockIcon className="w-4 h-4" />
          <span style={{ color: affirmationTextColor || '#6B7280' }}>
            {affirmationTime || 'Time'} • {affirmationDate || 'Date'}
          </span>
        </div>
      </div>

      {/* Affirmation Text with Quote Marks */}
      <div className="relative overflow-hidden rounded-2xl bg-white/5 p-8 backdrop-blur-xl border border-white/20 
        transform transition-all duration-300 hover:bg-white/10 group/card">
        <div className="absolute top-4 left-4 text-6xl opacity-20" style={{ color: affirmationTextColor }}>
          "
        </div>
        <p
          className=" whitespace-break-spaces relative text-2xl leading-relaxed text-center font-medium transition-all duration-300 
            group-hover/card:scale-105"
          style={{ color: affirmationTextColor || '#FFFFFF' }}
        >
          {affirmationText || 'Your inspiring affirmation text goes here.'}
        </p>
        <div className="absolute bottom-4 right-4 text-6xl opacity-20" style={{ color: affirmationTextColor }}>
          "
        </div>
      </div>

      {/* Footer with Enhanced Layout */}
      <div className="pt-4 border-t flex items-center justify-between gap-6 border-white/10">
        <div className="flex items-center gap-4">
          <CalendarIcon className="w-5 h-5 opacity-75" style={{ color: affirmationTextColor }} />
          <p
            className="text-lg font-medium"
            style={{ color: affirmationTextColor }}
          >
            {affirmationDate || 'Date'}
          </p>
        </div>
        
        {qrUrl && (
          <div className="bg-white/90 p-2 rounded-xl shadow-xl transform transition-all duration-300 
            hover:scale-105 hover:rotate-3">
            <QRCodeSVG value={qrUrl} size={44} />
          </div>
        )}
      </div>
    </div>
  </div>
)}

    {/* Add Menu card display */}
    {selectedVariant === 'menu' && (
  <div
    className="space-y-4 p-4 bg-white shadow-2xl rounded-b-none rounded-2xl relative"
    style={{
      backgroundColor: menuBackgroundColor || '#FFFFFF',
    }}
  >
    {/* Menu Header */}
    <div className="text-center space-y-2">
      <h1
        className="text-4xl font-bold tracking-tight"
        style={{ color: menuTitleColor || '#333' }}
      >
        {menuTitle || 'Restaurant Menu'}
      </h1>
      {menuSubtitle && (
        <p className="text-lg" style={{ color: menuSubtitleColor || '#666' }}>
          {menuSubtitle} 
        </p>
      )}
      {menuDate && !isDateOptional && (
        <p className="text-sm" style={{ color: menuDateColor || '#666' }}>
          {new Date(menuDate).toLocaleDateString()}
        </p>
      )}
    </div>

    {/* Menu Categories */}
    <div className="space-y-6">
      {menuCategories && menuCategories.length > 0 ? (
        menuCategories.map((category, catIndex) => (
          <div key={catIndex}>
            {/* Single Category Header */}
            <div className="mb-4">
              <h2
                className="text-2xl font-semibold border-b pb-2"
                style={{ color: category.textColor || '#555' }}
              >
                {category.name || `Category ${catIndex + 1}`}
              </h2>
              {category.description && (
                <p className="text-sm text-gray-500 mt-1">
                  {category.description}
                </p>
              )}
            </div>

            {/* Menu Items for Category */}
            <div className="space-y-6">
              {category.items && category.items.length > 0 ? (
                category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center space-x-4 p-4 rounded-lg shadow-sm"
                    style={{ backgroundColor: innerCardColor }}
                  >
                    {/* Item Image */}
                    {item.image && (
                      <div className="w-16 h-16 overflow-hidden rounded-lg">
                        <img
                          src={URL.createObjectURL(item.image as File)}
                          alt={item.name || `Item ${itemIndex + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    {/* Item Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3
                          className="text-lg font-medium"
                          style={{ color: item.textColor || '#333' }}
                        >
                          {item.name || `Item ${itemIndex + 1}`}
                        </h3>
                        <span className="text-sm font-semibold text-gray-600">
                          {item.price ? formatCurrency(parseFloat(item.price), item.currency || 'USD') : formatCurrency(0, item.currency || 'USD')}
                        </span>
                      </div>
                      {item.description && (
                        <p
                          className="text-sm text-gray-500"
                          style={{ color: item.descriptionColor || '#555' }}
                        >
                          {item.description}
                        </p>
                      )}
                      {item.tags && (
                        <div className="flex gap-2 mt-2">
                          {item.tags.split(',').map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-gray-100 text-xs text-gray-600 px-2 py-1 rounded-full"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No items available in this category.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No categories to display.</p>
      )}
    </div>

    {/* Special Section */}
    {specialItemDescription &&  (
    <div className="p-4 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-center text-gray-900">Today's Special</h3>
    <p className="text-sm text-center text-gray-800 mt-1">{specialItemDescription}</p>
  </div>
)}
{qrUrl && (
  <div className="  flex items-center  w-full p-1 justify-end rounded-lg mt-2">
    <QRCodeSVG value={qrUrl} size={40} />
  </div>
)}
  </div>
)}

    {/* Event Variant */}
      {selectedVariant === 'event' && (
        <div className="bg-white/95 p-4 rounded-2xl rounded-b-md shadow-lg">
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
              <div className="text-center bg-white p-3 rounded-xl shadow-md">
                <QRCodeSVG value={qrUrl} size={80} />
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

      {/* Mood */}
      {selectedVariant === 'mood' && (
  <div className={`relative p-4 rounded-t-xl rounded-b-xl rounded-2xl shadow-2xl overflow-hidden`}
        style={{backgroundColor: backgroundColor,}}>
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
    
    <div className="relative p-4 space-y-3">
      {/* Header with Profile */}
      <div className="flex  w-full items-start justify-between">
        <div className="space-y-4">
          <h3 className={`text-4xl font-bold w-full bg-gradient-to-r text-center from-emerald-500 to-teal-600   bg-clip-text text-transparent`} style={{color: titleColor}}>
            {title || 'My Mood'}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-5xl animate-bounce-slow transform transition-all duration-300 hover:scale-110 cursor-pointer" >
              {moodSmiley}
            </span>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
            <div className="space-y-1">
              {/* <p className="text-gray-400 text-sm font-medium">{date}</p> */}
              <p className="text-gray-300 font-semibold" style={{color: titleColor}}>{name}</p>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center gap-6">
        
        {moodPicture && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-all duration-300 rounded-2xl" />
            <div className="relative h-24 w-24 rounded-2xl overflow-hidden ring-2 ring-white/20 transform transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
              <Image
                src={moodPicture}
                alt="Mood"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        </div>
        
      </div>

      {/* Description Card */}
      {description && (
        <div className="relative overflow-hidden rounded-2xl bg-white/5 p-4 backdrop-blur-lg border border-white/10 transform transition-all duration-300 hover:bg-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
          <p className="relative text-gray-300 leading-relaxed text-lg" style={{color: titleColor}}>
            {description}
          </p>
        </div>
      )}

      {/* Date and Name Section */}
      <div className="pt-2 border-t flex items-center w-full justify-between gap-6 border-white/20">
        <p className="text-white leading-relaxed text-lg" style={{color: titleColor}}>
          <strong>Date:</strong> {date}
        </p>
        {/* <p className="text-white leading-relaxed text-lg">
          <strong>Name:</strong> {name}
        </p> */}
        {qrUrl && (
                  <div className="bg-white/90 p-1 justify-end  rounded-lg shadow-xl" >
                    <QRCodeSVG value={qrUrl} size={40} />
                  </div>
                )}
      </div>

      {/* Footer Accent */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" /> */}
    </div>
  </div>
)}

    {/* Invoice/Receipt/E-Invoice Variants */}
      {(selectedVariant === 'invoice' || selectedVariant === 'receipt' || selectedVariant === 'einvoice') && (
        <div className="bg-white p-4 rounded-b-md rounded-2xl space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-stone-950" style={{color: titleColor}}>
                {selectedVariant === 'receipt' ? 'Receipt' : 'Invoice'} #{invoiceNumber}
              </h3>
              <p className="text-sm text-stone-950" style={{color: titleColor}}>Date: {new Date().toLocaleDateString()}</p>
              {dueDate && <p className="text-sm text-stone-950" style={{color: titleColor}}>Due: {dueDate}</p>}
            </div>
            {qrUrl && <QRCodeSVG value={qrUrl} size={60} className="bg-white p-1 rounded-lg" />}
          </div>

          <div className="space-y-2">
            {largeDescription && (
          <div className="mt-4 text-stone-950 whitespace-pre-line" style={{color: titleColor}}>{largeDescription}</div>
        )}
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex justify-between items-center p-4 backdrop-blur-md bg-white/5 rounded-2xl mb-2 hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-stone-950 font-medium" style={{color: titleColor}}>{item.description}</span>
                <span className="text-stone-950 font-semibold" style={{color: titleColor}}>
                  {formatCurrency(item.amount, currency)}
                </span>
              </motion.div>
            ))}

            <div className="border-t border-white/10 pt-4 mt-6">
              {taxRate > 0 && (
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex justify-between text-stone-950 mb-2"style={{color: titleColor}}
                >
                  <span>Tax ({taxRate}%)</span>
                  <span>{formatCurrency(items.reduce((sum, item) => sum + item.amount, 0) * (taxRate / 100), currency)}</span>
                </motion.div>
              )}
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-between font-bold text-stone-950 text-xl mt-2 bg-white p-4 rounded-2xl shadow-md" style={{color: titleColor}}
              >
                <span style={{color: titleColor}}>Total</span>
                <span style={{color: titleColor}}>
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

    {/* Footer */}
      <div className="mt-2 flex justify-end">
      <div className="text-xs rounded-t-none w-full text-center rounded-b-2xl px-1 py-2 rounded-md bg-slate-800/40 text-stone-50" style={{color: titleColor}}>
       Powered by KardifyMe+
      </div>
      </div>
      </div>
        
          )}
          
        </motion.div>
      </div>
    </div>
  );
};

export default CreateCard;
