"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import { SketchPicker } from 'react-color';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import { Switch } from '@headlessui/react';
import place from "@/public/12.jpg"
import domtoimage from 'dom-to-image';


import jsPDF from 'jspdf';
import SignatureCanvas from 'react-signature-canvas';
import type ReactSignatureCanvas from 'react-signature-canvas';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';



import { ethers } from 'ethers';
import { ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';


//niceone

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
        font: 'font-sans',
      },
      classic: {
        font: 'font-serif',
      },
      minimal: {
        font: 'font-sans',
      },
    },
  },
  event: {
    templates: {
      classic: {
        font: 'font-sans',
      },
      bold: {
        font: 'font-bold',
      },
      elegant: {
        font: 'font-serif',
      },
    },
  },
  product: {
    templates: {
      showcase: {
        font: 'font-sans',
      },
      grid: {
        font: 'font-mono',
      },
      minimal: {
        font: 'font-sans',
      },
    },
  },
  invoice: {
    templates: {
      professional: {
        font: 'font-sans',
      },
      simple: {
        font: 'font-mono',
      },
      detailed: {
        font: 'font-serif',
      },
    },
  },
  receipt: {
    templates: {
      simple: {
        font: 'font-mono',
      },
      detailed: {
        font: 'font-sans',
      },
      compact: {
        font: 'font-serif',
      },
    },
  },
  einvoice: {
    templates: {
      digital: {
        font: 'font-sans',
      },
      modern: {
        font: 'font-mono',
      },
      classic: {
        font: 'font-serif',
      },
    },
  },
  flyer: {
    templates: {
      bold: {
        font: 'font-sans',
      },
      creative: {
        font: 'font-sans',
      },
      minimal: {
        font: 'font-mono',
      },
    },
  },
  recipe: {
    templates: {
      elegant: {
        font: 'font-mono',
      },
      modern: {
        font: 'font-sans',
      },
      classic: {
        font: 'font-mono',
      },
    },
  },
  contract: {
    templates: {
      formal: {
        font: 'font-serif',
      },
      modern: {
        font: 'font-mono',
      },
      simple: {
        font: 'font-sans',
      },
    },
  },
  birthday: {
    templates: {
      fun: {
        font: 'font-serif',
      },
      elegant: {
        font: 'font-sans',
      },
      minimal: {
        font: 'font-mono',
      },
    },
  },
  budget: {
    templates: {
      clean: {
        font: 'font-serif',
      },
      detailed: {
        font: 'font-sans',
      },
      visual: {
        font: 'font-mono',
      },
    },
  },
  idCard: {
    templates: {
      standard: {
        font: 'font-mono',
      },
      modern: {
        font: 'font-sans',
      },
      minimal: {
        font: 'font-serif',
      },
    },
  },
  mood: {
    templates: {
      happy: {
        font: 'font-sans',
      },
      calm: {
        font: 'font-serif',
      },
      energetic: {
        font: 'font-mono',
      },
    },
  },
  affirmations: {
    templates: {
      modern: {
        font: 'font-sans',
      },
      classic: {
        font: 'font-serif',
      },
      minimal: {
        font: 'font-mono',
      },
    },
  },
  menu: {
    templates: {
      modern: {
        font: 'font-serif',
      },
      classic: {
        font: 'font-mono',
      },
      minimal: {
        font: 'font-sans',
      },
    },
  },
  brand: {
    templates: {
      modern: {
        font: 'font-serif',
      },
      classic: {
        font: 'font-mono',
      },
      minimal: {
        font: 'font-sans',
      },
    },
  },
  invitation: {
    templates: {
      modern: {
        font: 'font-serif',
      },
      classic: {
        font: 'font-mono',
      },
      minimal: {
        font: 'font-sans',
      },
    },
  },
  resume: {
    templates: {
      modern: {
        font: 'font-serif',
      },
      classic: {
        font: 'font-mono',
      },
      minimal: {
        font: 'font-sans',
      },
    },
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


type TextColors = {
  brandName: string;
  tagline: string;
  description: string;
  orderPolicies: string;
  contactInfo: string;
  [key: string]: string;
};



const CreateCard = () => {
  const [gradYear, setGradYear] = useState('');
  const [institution, setInstitution] = useState('');
  const [degree, setDegree] = useState('');
  const [duration, setDuration] = useState('');
  const [role, setRole] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [skills, setSkills] = useState<{ value: string }[]>([]);
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [fullName, setFullName] = useState('');
  const [showfooterPart, setshowfooterPart] = useState(true);
  const [footerColor, setFooterColor] = useState<string>('#FFFFFF'); // Default color
  const [productImage, setProductImage] = useState<string>('');
  const [cardProduct, setCardProduct] = useState<string | null>(null);
  const [ageBorderColor, setAgeBorderColor] = useState<string>('');
  const [ageBackground, setAgeBackground] = useState('');
  const [ageColor, setAgeColor] = useState('#000000'); // Add this line
  const [celebrantNameBackground, setCelebrantNameBackground] = useState('');
  const [celebrantNameColor, setCelebrantNameColor] = useState('#000000');
  const [birthdayDate, setBirthdayDate] = useState('');
  const [cardDate, setCardDate] = useState<string>('');
  const [selectedVariantStyle, setSelectedVariantStyle] = useState<string>('default');
  
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
  
  const [affirmationTitle, setAffirmationTitle] = useState('');
  const [backgroundImage, setBackgroundImage] = useState<string>('');
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
const [productImageState, setProductImageState] = useState<string | null>(null);
// const [heroImage, setHeroImage] = useState<string | null>(null);

  const [showBottomPart, setShowBottomPart] = useState(true);
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventType, setEventType] = useState('General Admission');
  type VariantType = 'business' | 'event' | 'product' | 'invoice' | 'receipt' | 'einvoice' | 'flyer' | 'recipe' | 'contract' | 'birthday' | 'budget' | 'idCard' | 'mood' | 'affirmations'| 'menu' | 'brand' | 'invitation' | 'resume';
  const [selectedVariant, setSelectedVariant] = useState<VariantType>('business');
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [cookingTime, setCookingTime] = useState('');
const [servings, setServings] = useState('');
interface Ingredient {
  item: string;
  amount: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  amountBackgroundColor?: string;
  amountBorderColor?: string;
  amountTextColor?: string;
}

const [ingredients, setIngredients] = useState<Ingredient[]>([{ 
  item: '', 
  amount: '', 
  backgroundColor: '#ffffff', 
  borderColor: '#000000', 
  textColor: '#000000' 
}]);
const [instructions, setInstructions] = useState([{ step: '' }]);
const [difficulty, setDifficulty] = useState('medium');
const [celebrantNameBorderColor, setCelebrantNameBorderColor] = useState('#000000');


const [workExperience, setWorkExperience] = useState([{ companyName: '', role: '', duration: '' }]);




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
interface BirthdayDate {
  cardDate: string;
  birthdayDate: string;
}

const calculateDaysUntilBirthday = (cardDate: string, birthdayDate: string): string => {
  if (!cardDate || !birthdayDate) return '';

  const card: Date = new Date(cardDate);
  const birthday: Date = new Date(birthdayDate);

  // Handle yearly rollover
  if (birthday < card) {
    birthday.setFullYear(card.getFullYear() + 1);
  }

  const differenceInTime: number = birthday.getTime() - card.getTime();
  const differenceInDays: number = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

  return differenceInDays > 0 ? `${differenceInDays} days left` : "It's the birthday today!";
};

const generatePDF = async () => {
  if (!cardRef.current) return;
  setIsLoading(true);
  
  try {
    const content = cardRef.current;
    const { width, height } = content.getBoundingClientRect();
    
    // Increase quality with higher DPI
    const scale = 2; // Increase resolution
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    
    const imgData = await domtoimage.toPng(content, {
      width: scaledWidth,
      height: scaledHeight,
      quality: 8,
      style: {
        transform: `scale(${scale})`,
        'transform-origin': 'top left',
        '-webkit-font-smoothing': 'antialiased',
        'text-rendering': 'optimizeLegibility'
      },
      cacheBust: true
    });

    const pdf = new jsPDF({
      orientation: width > height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [width, height],
      compress: true,
      precision: 100
    });

    const img = new window.Image();
    img.src = imgData;

    await new Promise((resolve) => {
      img.onload = () => {
        pdf.addImage(
          img, 
          'PNG', 
          0, 
          0, 
          width, 
          height, 
          undefined, 
          'FAST'
        );
        resolve(null);
      };
    });

    pdf.save(`${title || 'card'}-${Date.now()}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  } finally {
    setIsLoading(false);
  }
};



const [fieldValues, setFieldValues] = useState({
  celebrantName: '',
  age: '',
  cardDate: '',
  birthdayDate: '',
  birthdayMessage: '',
  daysUntil: '',
});

const [fieldColors, setFieldColors] = useState({
  celebrantName: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
  age: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
  cardDate: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
  birthdayDate: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
  birthdayMessage: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
  daysUntil: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
});

interface FieldValues {
  celebrantName: string;
  age: string;
  cardDate: string;
  birthdayDate: string;
  birthdayMessage: string;
  daysUntil: string;
}

const handleFieldChange = (field: keyof FieldValues, value: string): void => {
  setFieldValues((prev: FieldValues) => ({ ...prev, [field]: value }));
};

interface FieldColor {
  text: string;
  border: string;
  background: string;
}

interface FieldColors {
  celebrantName: FieldColor;
  age: FieldColor;
  cardDate: FieldColor;
  birthdayDate: FieldColor;
  birthdayMessage: FieldColor;
  daysUntil: FieldColor;
}

const updateFieldColor = (field: keyof FieldColors, type: keyof FieldColor, color: string): void => {
  setFieldColors((prev: FieldColors) => ({
    ...prev,
    [field]: { ...prev[field], [type]: color },
  }));
};


// const [education, setEducation] = useState([{ degree: '', institution: '', gradYear: '' }]);
// const [hobbies, setHobbies] = useState(['']);


const [backgroundColor, setBackgroundColor] = useState('#ffffff');
const [affirmationText, setAffirmationText] = useState('');
const [affirmationTime, setAffirmationTime] = useState('');
const [affirmationDate, setAffirmationDate] = useState('');
const [tips, setTips] = useState<string[]>([]);
const [chefTips, setChefTips] = useState<string[]>([]);

useEffect(() => {
  setChefTips(tips); // Sync tips with chefTips for the display card
}, [tips]);
const [affirmationTextColor, setAffirmationTextColor] = useState('#000000');
const [cardBackgroundColor, setCardBackgroundColor] = useState('#ffffff');
const [categoryName, setCategoryName] = useState('');
const [categoryDescription, setCategoryDescription] = useState('');
const [menuItemName, setMenuItemName] = useState('');
const [menuItemDescription, setMenuItemDescription] = useState('');
const [menuItemPrice, setMenuItemPrice] = useState('');
const [menuItemTags, setMenuItemTags] = useState('');
const [inputStyles, setInputStyles] = useState({
  backgroundColor: '#ffffff', // Default background color
  borderColor: '#cccccc', // Default border color
  textColor: '#000000', // Default text color
});
const [menuItemImage, setMenuItemImage] = useState<File | null>(null);
const [menuTitle, setMenuTitle] = useState('');
const [heroImage, setHeroImage] = useState<string | null>(null);
const [eventImage, seteventImage] = useState<string | null>(null);
const [flyerImage, setflyerImage] = useState<string | null>(null);
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
  resume: '#ffffff',
});
// const [education, setEducation] = useState([{ degree: '', institution: '', gradYear: '' }]);
// const [hobbies, setHobbies] = useState(['']);

// Define interfaces for education and hobbies
interface Education {
  degree: string;
  institution: string;
  gradYear: string;
}

interface HobbyUpdateParams {
  index: number;
  value: string;
}

// Initialize state with type annotations
const [education, setEducation] = useState<Education[]>([{ degree: '', institution: '', gradYear: '' }]);
const [hobbies, setHobbies] = useState<string[]>(['']);

// Functions to handle education fields
const addEducation = (): void => setEducation([...education, { degree: '', institution: '', gradYear: '' }]);
const removeEducation = (index: number): void => setEducation(education.filter((_, i) => i !== index));
const updateEducation = (index: number, field: keyof Education, value: string): void => {
  const newEducation = [...education];
  newEducation[index][field] = value;
  setEducation(newEducation);
};

// Functions to handle hobbies fields
const addHobby = (): void => setHobbies([...hobbies, '']);
const removeHobby = (index: number): void => setHobbies(hobbies.filter((_, i) => i !== index));
interface HobbyUpdateParams {
  index: number;
  value: string;
}

const updateHobby = ({ index, value }: HobbyUpdateParams): void => {
  const newHobbies = [...hobbies];
  newHobbies[index] = value;
  setHobbies(newHobbies);
};
const [footerCardColor, setfooterCardColor] = useState('#000')

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
  resume: 'minimal',
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
  resume: ['modern', 'classic', 'minimal'],
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



  // const CURRENT_PASSWORD = 'epicgamesandgames';
  // const PASSWORD_VERSION = '7'; // Increment this version whenever the password changes
  
  // // Update handleLogin to check password version
  // const handleLogin = () => {
  //   if (password === CURRENT_PASSWORD) {
  //     setIsAuthenticated(true);
  //     // Save to localStorage to persist login with version
  //     localStorage.setItem('isAuth', 'true');
  //     localStorage.setItem('passwordVersion', PASSWORD_VERSION);
  //   } else {
  //     alert('Incorrect password');
  //   }
  // };


  interface DifficultyColorMap {
    easy: string;
    medium: string;
    hard: string;
    [key: string]: string; // For default case
  }

  const [dummyState, setDummyState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDummyState(prev => prev + 1);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const getDifficultyColor = (difficulty: string): string => {
    const colorMap: DifficultyColorMap = {
      easy: 'bg-green-200 text-green-800',
      medium: 'bg-yellow-200 text-yellow-800',
      hard: 'bg-red-200 text-red-800',
      default: 'bg-gray-200 text-gray-800'
    };

    return colorMap[difficulty.toLowerCase()] || colorMap.default;
  };

  
  
  useEffect(() => {
    const savedState = localStorage.getItem('pageState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setSelectedVariant(parsedState.selectedVariant || 'business');
      setSelectedVariantStyle(parsedState.selectedVariantStyle || 'default');
      setTitle(parsedState.title || '');
      setDescription(parsedState.description || '');
      setLargeDescription(parsedState.largeDescription || '');
      setQrUrl(parsedState.qrUrl || '');
      setPrice(parsedState.price || '');
      setCurrency(parsedState.currency || 'USD');
      setLogo(parsedState.logo || null);
      setBackgroundImage(parsedState.backgroundImage || null);
      setBgType(parsedState.bgType || 'solid');
      setGradientFrom(parsedState.gradientFrom || '#000000');
      setGradientVia(parsedState.gradientVia || '#000000');
      setGradientTo(parsedState.gradientTo || '#000000');
      setSolidColor(parsedState.solidColor || '#ffffff');
      setTextColors(parsedState.textColors || {
        title: '#ffffff',
        description: '#ffffff',
        largeDescription: '#ffffff',
        qrUrl: '#000000',
        price: '#ffffff',
      });
       setBgType(parsedState.bgType || 'solid');
      setSolidColor(parsedState.solidColor || '#ffffff');
      setGradientFrom(parsedState.gradientFrom || '#000000');
      setGradientVia(parsedState.gradientVia || '#000000');
      setGradientTo(parsedState.gradientTo || '#000000');
      setFullName(parsedState.fullName || '');
      setJobTitle(parsedState.jobTitle || '');
      setEmail(parsedState.email || '');
      setPhone(parsedState.phone || '');
      setLocation(parsedState.location || '');
      setSkills(parsedState.skills || [{ value: '' }]);
      setWorkExperience(parsedState.workExperience || [{ companyName: '', role: '', duration: '' }]);
      setEducation(parsedState.education || [{ degree: '', institution: '', gradYear: '' }]);
      setHobbies(parsedState.hobbies || ['']);
      setshowfooterPart(parsedState.showfooterPart || false);
      setFooterColor(parsedState.footerColor || '#FFFFFF');
      setProductImage(parsedState.productImage || '');
      setCardProduct(parsedState.cardProduct || null);
      setAgeBorderColor(parsedState.ageBorderColor || '');
      setAgeBackground(parsedState.ageBackground || '');
      setAgeColor(parsedState.ageColor || '#000000');
      setCelebrantNameBackground(parsedState.celebrantNameBackground || '');
      setCelebrantNameColor(parsedState.celebrantNameColor || '#000000');
      setBirthdayDate(parsedState.birthdayDate || '');
      setCardDate(parsedState.cardDate || '');
      setOccasion(parsedState.occasion || '');
      setInviterName(parsedState.inviterName || '');
      setInviteeName(parsedState.inviteeName || '');
      setAffirmationTitle(parsedState.affirmationTitle || '');
      setBrandName(parsedState.brandName || '');
      setTagline(parsedState.tagline || '');
      setOrderPolicies(parsedState.orderPolicies || '');
      setContactInfo(parsedState.contactInfo || '');
      setSocialMediaLinks(parsedState.socialMediaLinks || {
        instagram: '',
        facebook: '',
        twitter: '',
      });
      setIncludeBottomPart(parsedState.includeBottomPart || false);
      setInvoiceNumber(parsedState.invoiceNumber || '');
      setItems(parsedState.items || [{ description: '', amount: 0 }]);
      setTaxRate(parsedState.taxRate || 0);
      setDueDate(parsedState.dueDate || '');
      setEventName(parsedState.eventName || '');
      setEventTime(parsedState.eventTime || '');
      setProductImageState(parsedState.productImageState || null);
      setShowBottomPart(parsedState.showBottomPart || false);
      setEventDate(parsedState.eventDate || '');
      setEventLocation(parsedState.eventLocation || '');
      setEventType(parsedState.eventType || 'General Admission');
      setCookingTime(parsedState.cookingTime || '');
      setServings(parsedState.servings || '');
      setIngredients(parsedState.ingredients || [{ 
        item: '', 
        amount: '', 
        backgroundColor: '#ffffff', 
        borderColor: '#000000', 
        textColor: '#000000' 
      }]);
      setInstructions(parsedState.instructions || [{ step: '' }]);
      setDifficulty(parsedState.difficulty || 'medium');
      setProfilePicture(parsedState.profilePicture || '');
      setContractAddress(parsedState.contractAddress || '');
      setNetwork(parsedState.network || 'Ethereum');
      setContractType(parsedState.contractType || 'ERC20');
      setValidUntil(parsedState.validUntil || '');
      setContractDetails(parsedState.contractDetails || [{ key: '', value: '' }]);
      setWitnesses(parsedState.witnesses || [{ name: '', signature: '' }]);
      setParty1Name(parsedState.party1Name || '');
      setParty2Name(parsedState.party2Name || '');
      setParty1Sign(parsedState.party1Sign || '');
      setParty2Sign(parsedState.party2Sign || '');
      setContractTerms(parsedState.contractTerms || '');
      setContractDate(parsedState.contractDate || '');
      setContractValue(parsedState.contractValue || '');
      setCelebrantName(parsedState.celebrantName || '');
      setAge(parsedState.age || '');
      setMenuTitleColor(parsedState.menuTitleColor || '#333');
      setMenuSubtitleColor(parsedState.menuSubtitleColor || '#666');
      setMenuDateColor(parsedState.menuDateColor || '#666');
      setInnerCardColor(parsedState.innerCardColor || '#ffffff');
      setMessage(parsedState.message || '');
      setWishType(parsedState.wishType || 'Happy Birthday');
      setBudgetCategories(parsedState.budgetCategories || [{ category: '', amount: 0 }]);
      setTotalBudget(parsedState.totalBudget || 0);
      setRemainingBudget(parsedState.remainingBudget || 0);
      setShowTopPart(parsedState.showTopPart || false);
      setMoodPicture(parsedState.moodPicture || '');
      setMoodSmiley(parsedState.moodSmiley || '😊');
      setDate(parsedState.date || '');
      setName(parsedState.name || '');
      setTitleColor(parsedState.titleColor || '#000000');
      setMenuDate(parsedState.menuDate || null);
      setIsDateOptional(parsedState.isDateOptional || false);
      setSubtitleColor(parsedState.subtitleColor || '#000000');
      setDescriptionColor(parsedState.descriptionColor || '#000000');
      setDateNameColor(parsedState.dateNameColor || '#000000');
      setFieldValues(parsedState.fieldValues || {
        celebrantName: '',
        age: '',
        cardDate: '',
        birthdayDate: '',
        birthdayMessage: '',
        daysUntil: '',
      });
      setFieldColors(parsedState.fieldColors || {
        celebrantName: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
        age: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
        cardDate: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
        birthdayDate: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
        birthdayMessage: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
        daysUntil: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
      });
      setBackgroundColor(parsedState.backgroundColor || '#ffffff');
      setAffirmationText(parsedState.affirmationText || '');
      setAffirmationTime(parsedState.affirmationTime || '');
      setAffirmationDate(parsedState.affirmationDate || '');
      setTips(parsedState.tips || []);
      setChefTips(parsedState.chefTips || []);
      setAffirmationTextColor(parsedState.affirmationTextColor || '#000000');
      setCardBackgroundColor(parsedState.cardBackgroundColor || '#ffffff');
      setCategoryName(parsedState.categoryName || '');
      setCategoryDescription(parsedState.categoryDescription || '');
      setMenuItemName(parsedState.menuItemName || '');
      setMenuItemDescription(parsedState.menuItemDescription || '');
      setMenuItemPrice(parsedState.menuItemPrice || '');
      setMenuItemTags(parsedState.menuItemTags || '');
      setInputStyles(parsedState.inputStyles || {
        backgroundColor: '#ffffff',
        borderColor: '#cccccc',
        textColor: '#000000',
      });
      setMenuItemImage(parsedState.menuItemImage || null);
      setMenuTitle(parsedState.menuTitle || '');
      setHeroImage(parsedState.heroImage || null);
      seteventImage(parsedState.eventImage || null);
      setflyerImage(parsedState.flyerImage || null);
      setMenuSubtitle(parsedState.menuSubtitle || '');
      setMenuCategories(parsedState.menuCategories || []);
      setSpecialItemDescription(parsedState.specialItemDescription || '');
      setMenuBackgroundColor(parsedState.menuBackgroundColor || '#FFFFFF');
      setCategoryTextColor(parsedState.categoryTextColor || '#555');
      setItemTitleColor(parsedState.itemTitleColor || '#333');
      setItemDescriptionColor(parsedState.itemDescriptionColor || '#555');
      setShowIDCard(parsedState.showIDCard || false);
      setIDCardDetails(parsedState.idCardDetails || {
        name: '',
        idNumber: '',
        department: '',
        issueDate: '',
        expiryDate: '',
        photo: ''
      });
      setParty1Signature(parsedState.party1Signature || '');
      setParty2Signature(parsedState.party2Signature || '');
      setBudgetState(parsedState.budgetState || {
        totalBudget: 0,
        categories: [],
        monthYear: new Date().toISOString().slice(0, 7),
        currency: 'NGN'
      });
      setCardColor(parsedState.cardColor || {
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
      setfooterCardColor(parsedState.footerCardColor || '#000');
      setSelectedTemplate(parsedState.selectedTemplate || {
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
    }
  }, [dummyState]);
  
  useEffect(() => {
    const pageState = {
      selectedVariant,
      selectedVariantStyle,
      title,
      description,
      largeDescription,
      qrUrl,
      price,
      currency,
      logo,
      backgroundImage,
      bgType,
      gradientFrom,
      gradientVia,
      gradientTo,
      solidColor,
      textColors,
      showfooterPart,
      fullName,
      jobTitle,
      email,
      phone,
      location,
      skills,
      workExperience,
      education,
      hobbies,
      footerColor,
      productImage,
      cardProduct,
      ageBorderColor,
      ageBackground,
      ageColor,
      celebrantNameBackground,
      celebrantNameColor,
      birthdayDate,
      cardDate,
      occasion,
      inviterName,
      inviteeName,
      affirmationTitle,
      brandName,
      tagline,
      orderPolicies,
      contactInfo,
      socialMediaLinks,
      includeBottomPart,
      invoiceNumber,
      items,
      taxRate,
      dueDate,
      eventName,
      eventTime,
      productImageState,
      showBottomPart,
      eventDate,
      eventLocation,
      eventType,
      cookingTime,
      servings,
      ingredients,
      instructions,
      difficulty,
      profilePicture,
      contractAddress,
      network,
      contractType,
      validUntil,
      contractDetails,
      witnesses,
      party1Name,
      party2Name,
      party1Sign,
      party2Sign,
      contractTerms,
      contractDate,
      contractValue,
      celebrantName,
      age,
      menuTitleColor,
      menuSubtitleColor,
      menuDateColor,
      innerCardColor,
      message,
      wishType,
      budgetCategories,
      totalBudget,
      remainingBudget,
      showTopPart,
      moodPicture,
      moodSmiley,
      date,
      name,
      titleColor,
      menuDate,
      isDateOptional,
      subtitleColor,
      descriptionColor,
      dateNameColor,
      fieldValues,
      fieldColors,
      backgroundColor,
      affirmationText,
      affirmationTime,
      affirmationDate,
      tips,
      chefTips,
      affirmationTextColor,
      cardBackgroundColor,
      categoryName,
      categoryDescription,
      menuItemName,
      menuItemDescription,
      menuItemPrice,
      menuItemTags,
      inputStyles,
      menuItemImage,
      menuTitle,
      heroImage,
      eventImage,
      flyerImage,
      menuSubtitle,
      menuCategories,
      specialItemDescription,
      menuBackgroundColor,
      categoryTextColor,
      itemTitleColor,
      itemDescriptionColor,
      showIDCard,
      idCardDetails,
      party1Signature,
      party2Signature,
      budgetState,
      cardColor,
      footerCardColor,
      selectedTemplate,
    };
  
    localStorage.setItem('pageState', JSON.stringify(pageState));
  }, [
    selectedVariant,
    selectedVariantStyle,
    title,
    description,
    largeDescription,
    qrUrl,
    price,
    currency,
    logo,
    bgType, solidColor, gradientFrom, gradientVia, gradientTo, fullName, jobTitle, email, phone, location, skills, workExperience, education, hobbies,
    backgroundImage,
    bgType,
    gradientFrom,
    gradientVia,
    gradientTo,
    solidColor,
    textColors,
    showfooterPart,
    footerColor,
    productImage,
    cardProduct,
    ageBorderColor,
    ageBackground,
    ageColor,
    celebrantNameBackground,
    celebrantNameColor,
    birthdayDate,
    cardDate,
    occasion,
    inviterName,
    inviteeName,
    affirmationTitle,
    brandName,
    tagline,
    orderPolicies,
    contactInfo,
    socialMediaLinks,
    includeBottomPart,
    invoiceNumber,
    items,
    taxRate,
    dueDate,
    eventName,
    eventTime,
    productImageState,
    showBottomPart,
    eventDate,
    eventLocation,
    eventType,
    cookingTime,
    servings,
    ingredients,
    instructions,
    difficulty,
    profilePicture,
    contractAddress,
    network,
    contractType,
    validUntil,
    contractDetails,
    witnesses,
    party1Name,
    party2Name,
    party1Sign,
    party2Sign,
    contractTerms,
    contractDate,
    contractValue,
    celebrantName,
    age,
    menuTitleColor,
    menuSubtitleColor,
    menuDateColor,
    innerCardColor,
    message,
    wishType,
    budgetCategories,
    totalBudget,
    remainingBudget,
    showTopPart,
    moodPicture,
    moodSmiley,
    date,
    name,
    titleColor,
    menuDate,
    isDateOptional,
    subtitleColor,
    descriptionColor,
    dateNameColor,
    fieldValues,
    fieldColors,
    backgroundColor,
    affirmationText,
    affirmationTime,
    affirmationDate,
    tips,
    chefTips,
    affirmationTextColor,
    cardBackgroundColor,
    categoryName,
    categoryDescription,
    menuItemName,
    menuItemDescription,
    menuItemPrice,
    menuItemTags,
    inputStyles,
    menuItemImage,
    menuTitle,
    heroImage,
    eventImage,
    flyerImage,
    menuSubtitle,
    menuCategories,
    specialItemDescription,
    menuBackgroundColor,
    categoryTextColor,
    itemTitleColor,
    itemDescriptionColor,
    showIDCard,
    idCardDetails,
    party1Signature,
    party2Signature,
    budgetState,
    cardColor,
    footerCardColor,
    selectedTemplate,
  ]);

  const [cardState, setCardState] = useLocalStorageState('cardState', {
    selectedVariant: 'business',
    selectedVariantStyle: 'default',
    title: '',
    description: '',
    largeDescription: '',
    qrUrl: '',
    price: '',
    currency: 'USD',
    logo: null,
    backgroundImage: null,
    bgType: 'solid',
    gradientFrom: '#000000',
    gradientVia: '#000000',
    gradientTo: '#000000',
    solidColor: '#ffffff',
    textColors: {
      title: '#ffffff',
      description: '#ffffff',
      largeDescription: '#ffffff',
      qrUrl: '#000000',
      price: '#ffffff',
    },
    showfooterPart: false,
    footerColor: '#FFFFFF',
    productImage: '',
    cardProduct: null,
    ageBorderColor: '',
    ageBackground: '',
    ageColor: '#000000',
    celebrantNameBackground: '',
    celebrantNameColor: '#000000',
    birthdayDate: '',
    cardDate: '',
    occasion: '',
    inviterName: '',
    inviteeName: '',
    affirmationTitle: '',
    brandName: '',
    tagline: '',
    orderPolicies: '',
    contactInfo: '',
    socialMediaLinks: {
      instagram: '',
      facebook: '',
      twitter: '',
    },
    includeBottomPart: false,
    invoiceNumber: '',
    items: [{ description: '', amount: 0 }],
    taxRate: 0,
    dueDate: '',
    eventName: '',
    eventTime: '',
    productImageState: null,
    showBottomPart: false,
    eventDate: '',
    eventLocation: '',
    eventType: 'General Admission',
    cookingTime: '',
    servings: '',
    ingredients: [{ item: '', amount: '', backgroundColor: '#ffffff', borderColor: '#000000', textColor: '#000000' }],
    instructions: [{ step: '' }],
    difficulty: 'medium',
    profilePicture: '',
    contractAddress: '',
    network: 'Ethereum',
    contractType: 'ERC20',
    validUntil: '',
    contractDetails: [{ key: '', value: '' }],
    witnesses: [{ name: '', signature: '' }],
    party1Name: '',
    party2Name: '',
    party1Sign: '',
    party2Sign: '',
    contractTerms: '',
    contractDate: '',
    contractValue: '',
    celebrantName: '',
    age: '',
    menuTitleColor: '#333',
    menuSubtitleColor: '#666',
    menuDateColor: '#666',
    innerCardColor: '#ffffff',
    message: '',
    wishType: 'Happy Birthday',
    budgetCategories: [{ category: '', amount: 0 }],
    totalBudget: 0,
    remainingBudget: 0,
    showTopPart: false,
    moodPicture: '',
    moodSmiley: '😊',
    date: '',
    name: '',
    titleColor: '#000000',
    menuDate: null,
    isDateOptional: false,
    subtitleColor: '#000000',
    descriptionColor: '#000000',
    dateNameColor: '#000000',
    fieldValues: {
      celebrantName: '',
      age: '',
      cardDate: '',
      birthdayDate: '',
      birthdayMessage: '',
      daysUntil: '',
    },
    fieldColors: {
      celebrantName: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
      age: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
      cardDate: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
      birthdayDate: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
      birthdayMessage: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
      daysUntil: { text: '#000000', border: '#CCCCCC', background: '#FFFFFF' },
    },
    backgroundColor: '#ffffff',
    affirmationText: '',
    affirmationTime: '',
    affirmationDate: '',
    tips: [],
    chefTips: [],
    affirmationTextColor: '#000000',
    cardBackgroundColor: '#ffffff',
    categoryName: '',
    categoryDescription: '',
    menuItemName: '',
    menuItemDescription: '',
    menuItemPrice: '',
    menuItemTags: '',
    inputStyles: {
      backgroundColor: '#ffffff',
      borderColor: '#cccccc',
      textColor: '#000000',
    },
    menuItemImage: null,
    menuTitle: '',
    heroImage: null,
    eventImage: null,
    flyerImage: null,
    menuSubtitle: '',
    menuCategories: [],
    specialItemDescription: '',
    menuBackgroundColor: '#FFFFFF',
    categoryTextColor: '#555',
    itemTitleColor: '#333',
    itemDescriptionColor: '#555',
    showIDCard: false,
    idCardDetails: {
      name: '',
      idNumber: '',
      department: '',
      issueDate: '',
      expiryDate: '',
      photo: ''
    },
    party1Signature: '',
    party2Signature: '',
    budgetState: {
      totalBudget: 0,
      categories: [],
      monthYear: new Date().toISOString().slice(0, 7),
      currency: 'NGN'
    },
    cardColor: {
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
      resume: '#ffffff',
    },
    footerCardColor: '#000',
    selectedTemplate: {
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
      resume: 'minimal',
    }
  });

  const addSkill = () => setSkills([...skills, { value: '' }]);
  const removeSkill = (index: number): void => setSkills(skills.filter((_, i) => i !== index));
  interface Skill {
    value: string;
  }

  const updateSkill = (index: number, value: string): void => {
    const newSkills: Skill[] = [...skills];
    newSkills[index].value = value;
    setSkills(newSkills);
  };

  const addWorkExperience = () => setWorkExperience([...workExperience, { companyName: '', role: '', duration: '' }]);
  interface WorkExperience {
    companyName: string;
    role: string;
    duration: string;
  }

  const removeWorkExperience = (index: number): void => 
    setWorkExperience(workExperience.filter((_: WorkExperience, i: number) => i !== index));
  interface WorkExperienceField {
    companyName: string;
    role: string;
    duration: string;
  }

  const updateWorkExperience = (
    index: number, 
    field: keyof WorkExperienceField, 
    value: string
  ): void => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index][field] = value;
    setWorkExperience(newWorkExperience);
  };

  // const addEducation = () => setEducation([...education, { degree: '', institution: '', gradYear: '' }]);
  // interface Education {
  //   degree: string;
  //   institution: string;
  //   gradYear: string;
  // }

  // const removeEducation = (index: number): void => setEducation(education.filter((_: Education, i: number) => i !== index));
  // interface EducationField {
  //   degree: string;
  //   institution: string;
  //   gradYear: string;
  // }

  // const updateEducation = (
  //   index: number, 
  //   field: keyof EducationField, 
  //   value: string
  // ): void => {
  //   const newEducation = [...education];
  //   newEducation[index][field] = value;
  //   setEducation(newEducation);
  // };

  // const addHobby = () => setHobbies([...hobbies, '']);
  // const removeHobby = (index: number): void => setHobbies(hobbies.filter((_, i: number) => i !== index));
  // interface HobbyUpdateParams {
  //   index: number;
  //   value: string;
  // }

  // const updateHobby = ({ index, value }: HobbyUpdateParams): void => {
  //   const newHobbies: string[] = [...hobbies];
  //   newHobbies[index] = value;
  //   setHobbies(newHobbies);
  // };

  const updateCardState = (updates: Partial<typeof cardState>) => {
    setCardState(prev => ({ ...prev, ...updates }));
  };

  
  // // Add effect to check stored auth and version
  // useEffect(() => {
  //   const auth = localStorage.getItem('isAuth');
  //   const storedVersion = localStorage.getItem('passwordVersion');
  //   if (auth === 'true' && storedVersion === PASSWORD_VERSION) {
  //     setIsAuthenticated(true);
  //   } else {
  //     // Clear auth if version mismatch
  //     localStorage.removeItem('isAuth');
  //     localStorage.removeItem('passwordVersion');
  //   } 
  // }, []);

  // if (!isAuthenticated) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
  //       <motion.div 
  //         initial={{ opacity: 0, y: 20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full m-4"
  //       >
  //         <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Enter Password</h1>
  //         <div className="space-y-4">
  //           <input
  //             type="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             placeholder="Enter password"
  //             className="w-full p-3 rounded-lg border border-gray-300"
  //             onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
  //           />
  //           <motion.button
  //             whileHover={{ scale: 1.02 }}
  //             whileTap={{ scale: 0.98 }}
  //             onClick={handleLogin}
  //             className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
  //           >
  //             Access Card Creator
  //           </motion.button>
  //         </div>
  //       </motion.div>
  //     </div>
  //   );
  // }

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
        quality: 10,
        pixelRatio: 10
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


  // const handlePrint = () => {
  //   if (!cardRef.current) return;
  //   const printContent = cardRef.current.innerHTML;
  //   const originalContent = document.body.innerHTML;
  //   document.body.innerHTML = printContent;
  //   cardRef.print();
  //   document.body.innerHTML = originalContent;
  //   window.location.reload();
  // };

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
    {heroImage ? (
      <Image
        src={heroImage || place} // Set default image
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
        {title || 'Hero Image'}
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
  <div className={`relative p-3 pt-2 pb-2 rounded-2xl shadow-2xl overflow-hidden`}
    style={{ backgroundColor: backgroundColor }}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Column: Image + QR */}
      <div className="space-y-4">
        {/* Product Image */}
        {productImage && (
          <div className="relative w-full h-80 bg-gray-200 rounded-xl overflow-hidden shadow-lg group">
            <Image
              src={productImage}
              alt="Product Image"
              layout="fill"
              objectFit="cover"
              className="rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
            {/* QR Code Overlay */}
            {qrUrl && (
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                <QRCodeSVG value={qrUrl} size={80} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Column: Details */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-4xl font-bold text-stone-950">{title}</h3>
          <p className="text-2xl font-semibold bg-stone-500/30 text-stone-950/80 px-6 py-2 rounded-full inline-block">
            {formatCurrency(parseFloat(price), currency)}
          </p>
        </div>
        
        <div className="prose max-w-none space-y-6">
          <p className="text-lg text-stone-950/90 leading-relaxed">{description}</p>
          <div className="bg-stone-100/80 backdrop-blur-sm p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-stone-950 mb-4">Product Details</h4>
            <p className="text-stone-950/80 whitespace-pre-line">{largeDescription}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
    )}


{selectedVariant === 'resume' && (
  <div
    className="relative min-h-[600px] p-4 md:p-10 bg-white/90 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl"
    style={{
      background:
        bgType === 'gradient'
          ? `linear-gradient(135deg, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
          : bgType === 'solid'
          ? solidColor
          : "#f9f9f9",
    }}
  >
    <div className="relative z-10 flex flex-col items-center gap-8 text-center">
      {/* Profile Picture */}
      {profilePicture && (
        <div className="transform hover:scale-110 transition-all duration-500">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg overflow-hidden">
            <img
              src={typeof profilePicture === 'string' ? profilePicture : URL.createObjectURL(profilePicture)}
              alt="Profile Picture"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Full Name and Job Title */}
      <div>
        {fullName && (
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: textColors.fullName }}
          >
            {fullName}
          </h2>
        )}
        {jobTitle && (
          <p
            className="text-xl md:text-2xl font-light mt-1"
            style={{ color: textColors.jobTitle }}
          >
            {jobTitle}
          </p>
        )}
      </div>

      {/* Contact Information */}
      <div className="space-y-2 text-sm md:text-base">
        {email && (
          <p className="flex items-center justify-center gap-2">
            <span className="font-medium">Email:</span>
            <a
              href={`mailto:${email}`}
              className="underline hover:text-blue-500 transition-colors"
              style={{ color: textColors.email }}
            >
              {email}
            </a>
          </p>
        )}
        {phone && (
          <p className="flex items-center justify-center gap-2">
            <span className="font-medium">Phone:</span>
            <span style={{ color: textColors.phone }}>{phone}</span>
          </p>
        )}
        {location && (
          <p className="flex items-center justify-center gap-2">
            <span className="font-medium">Location:</span>
            <span style={{ color: textColors.location }}>{location}</span>
          </p>
        )}
      </div>

      {/* Skills */}
{skills.length > 0 && (
  <div className="w-full max-w-2xl">
    <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.skills }}>
      Skills
    </h3>
    <ul className="flex flex-wrap justify-center gap-2 text-sm md:text-base">
      {skills.map((skill, index) => (
        <li
          key={index}
          className="px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full shadow-md"
          style={{ color: textColors.skills }}
        >
          {skill.value.trim()}
        </li>
      ))}
    </ul>
  </div>
)}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="w-full max-w-2xl text-left space-y-4">
          <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.workExperience }}>
            Work Experience
          </h3>
          {workExperience.map((experience, index) => (
            <div key={index} className="space-y-2 bg-white/80 p-4 rounded-xl shadow-lg">
              <p className="font-medium text-base md:text-lg" style={{ color: textColors.companyName }}>
                {experience.companyName}
              </p>
              <p className="text-sm md:text-base italic" style={{ color: textColors.role }}>
                {experience.role}
              </p>
              <p className="text-sm md:text-base" style={{ color: textColors.duration }}>
                {experience.duration}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
{education.length > 0 && (
  <div className="w-full max-w-2xl text-left space-y-4">
    <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.education }}>
      Education
    </h3>
    {education.map((edu, index) => (
      <div key={index} className="space-y-2 bg-white/80 p-4 rounded-xl shadow-lg">
        <p className="font-medium text-base md:text-lg" style={{ color: textColors.degree }}>
          {edu.degree}
        </p>
        <p className="text-sm md:text-base italic" style={{ color: textColors.institution }}>
          {edu.institution}
        </p>
        <p className="text-sm md:text-base" style={{ color: textColors.gradYear }}>
          {edu.gradYear}
        </p>
      </div>
    ))}
  </div>
)}

      {/* Hobbies */}
      {hobbies.length > 0 && (
  <div className="w-full max-w-2xl text-left space-y-4">
    <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.hobbies }}>
      Hobbies
    </h3>
    <div className="space-y-2 bg-white/80 p-4 rounded-xl shadow-lg">
      <p className="text-sm md:text-base" style={{ color: textColors.hobbies }}>
        {hobbies.join(', ')}
      </p>
    </div>
  </div>
)}
    </div>
  </div>
)}

    {/* Business Variant Display Start */}
                <div className= "">

            {/* Business Default Variant */}
            {/* Business Default Variant */}
              {selectedVariant === 'business' && selectedVariantStyle === 'default' && (
            <div
            className="relative p-4 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl"
            style={{
              background: bgType === 'gradient'
                ? `linear-gradient(to bottom right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
                : bgType === 'solid'
                ? solidColor
                : 'none',
            }}
            >
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent pointer-events-none"></div>
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl transition-transform duration-500 transform group-hover:scale-110"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>

            {/* Card Content */}
            <div className="relative z-10">
              {/* Header Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Title and Description */}
                <div className="flex w-full  justify-between items-center">
                  <div className="w-1/3">
                {logo && (
                    <div className="flex justify-center mt-">
                      <div className="relative w-20 h-20">
                        <Image
                          src={logo}
                          alt="Logo"
                          fill
                          className="rounded-full object-cover border-2 border-white/50 shadow-md"
                        />
                      </div>
                    </div>
                  )}
                  </div>
                  <div className=' w-2/3'>
                    <h3
                      className="text-2xl md:text-3xl font-bold tracking-tight text-stone-50"
                      style={{ color: titleColor }}
                    >
                      {title}
                    </h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-white/50 to-transparent rounded-full"></div>
                    <p
                      className="text-sm md:text-base leading-relaxed text-stone-50/90"
                      style={{ color: titleColor }}
                    >
                      {description}
                    </p>
                  </div>
                  

                </div>

                {/* QR Code */}
                {qrUrl && (
                  <div className="flex justify-center md:justify-end">
                    <div className="bg-white/90 p-4 rounded-2xl shadow-md backdrop-blur-sm transform transition-transform duration-300 group-hover:scale-105">
                      <QRCodeSVG value={qrUrl} size={100} />
                      <p className="text-xs text-center font-medium text-gray-600 mt-2">
                        Scan to connect
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="my-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>

              {/* Content Section */}
              <div>
                <p
                  className="text-sm md:text-base leading-relaxed text-stone-50/80 whitespace-pre-line"
                  style={{ color: titleColor }}
                >
                  {largeDescription}
                </p>
              </div>
            </div>
            </div>
              )}


            {/* Business Variant Style 1 */}
            {selectedVariant === 'business' && selectedVariantStyle === 'style1' && (
              <div
                className="relative p-4 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl"
                style={{
                  background: bgType === 'gradient'
                    ? `linear-gradient(to bottom right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
                    : bgType === 'solid'
                    ? solidColor
                    : 'none',
                }}
              >
                {/* Background Decorations */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent pointer-events-none"></div>
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl transition-transform duration-500 transform group-hover:scale-110"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>

                {/* Card Content */}
                <div className="relative z-10 space-y-6">
                  {/* Header Section */}
                  <div className="flex items-center gap-4">
                    {/* Logo */}
                    {logo && (
                      <div className="w-16 h-16 bg-white/10 p-1 rounded-full shadow-md flex items-center justify-center">
                        <img
                          src={logo}
                          alt="Logo"
                          className="rounded-full object-cover w-full h-full"
                        />
                      </div>
                    )}

                    {/* Title and Description */}
                    <div className="flex-1 space-y-2">
                      <h3
                        className="text-xl md:text-2xl font-bold tracking-tight text-stone-50"
                        style={{ color: titleColor }}
                      >
                        {title}
                      </h3>
                      <p
                        className="text-sm md:text-base leading-relaxed text-stone-50/80"
                        style={{ color: titleColor }}
                      >
                        {description}
                      </p>
                    </div>
                  </div>

                  {/* QR Code */}
                  {qrUrl && (
                    <div className="flex justify-center">
                      <div className="bg-white/90 p-4 rounded-2xl shadow-md backdrop-blur-sm transition-transform transform group-hover:scale-105 duration-300">
                        <QRCodeSVG value={qrUrl} size={100} />
                        <p className="text-xs text-center font-medium text-gray-600 mt-2">
                          Scan to connect
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                  {/* Content Section */}
                  <div>
                    <p
                      className="text-sm md:text-base leading-relaxed text-stone-50/80 whitespace-pre-line"
                      style={{ color: titleColor }}
                    >
                      {largeDescription}
                    </p>
                  </div>
                </div>
              </div>
            )}


            {/* Business Variant Style 2 */}
            {selectedVariant === 'business' && selectedVariantStyle === 'style2' && (
              <div
                className="relative p-4 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl bg-white"
                style={{
                  background: bgType === 'gradient'
                    ? `linear-gradient(to bottom, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
                    : bgType === 'solid'
                    ? solidColor
                    : '#f8f9fa',
                }}
              >
                {/* Background Decorations */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200/30 to-transparent pointer-events-none"></div>
                <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-gray-300/20 rounded-full blur-2xl"></div>

                {/* Card Content */}
                <div className="relative z-10 text-center space-y-4">
                  {/* Logo */}
                  {logo && (
                    <div className="flex justify-center">
                      <img
                        src={logo}
                        alt="Logo"
                        className="w-16 h-16 rounded-full border-2 border-gray-300"
                      />
                    </div>
                  )}

                  {/* Title and Description */}
                  <h3
                    className="text-2xl font-bold text-gray-900 tracking-tight"
                    style={{ color: titleColor }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm text-gray-600"
                    style={{ color: titleColor }}
                  >
                    {description}
                  </p>

                  {/* Divider */}
                  <div className="w-16 mx-auto h-0.5 bg-gray-300"></div>

                  {/* Content */}
                  <p
                    className="text-sm text-gray-800 leading-relaxed whitespace-pre-line"
                    style={{ color: titleColor }}
                  >
                    {largeDescription}
                  </p>

                  {/* QR Code */}
                  {qrUrl && (
                    <div className="mt-4 flex p-2 bg-white/90 w-fit mx-auto rounded-xl justify-center">
                      <QRCodeSVG value={qrUrl} size={80} />
                    </div>
                  )}
                </div>
              </div>
            )}


              {/* Business Variant Style 3 */}
              {selectedVariant === 'business' && selectedVariantStyle === 'style3' && (
                <div
                  className="relative p-4 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl"
                  style={{
                    background: bgType === 'gradient'
                      ? `linear-gradient(to right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
                      : bgType === 'solid'
                      ? solidColor
                      : '#f4f4f5',
                  }}
                >
                  {/* Background Decorations */}
                  <div className="absolute -top-16 -right-16 w-40 h-40 bg-white/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-lg"></div>

                  {/* Card Content */}
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Logo and Basic Info */}
                    <div className="space-y-4">
                      {logo && (
                        <div className="flex justify-center">
                          <img
                            src={logo}
                            alt="Logo"
                            className="w-20 h-20 rounded-full border-2 border-gray-200 shadow-md"
                          />
                        </div>
                      )}
                      <h3
                        className="text-xl md:text-2xl font-bold text-gray-900"
                        style={{ color: titleColor }}
                      >
                        {title}
                      </h3>
                      <p
                        className="text-sm text-gray-700"
                        style={{ color: titleColor }}
                      >
                        {description}
                      </p>
                    </div>

                    {/* QR Code and Large Description */}
                    <div className="space-y-6">
                      {qrUrl && (
                        <div className="flex justify-center md:justify-end">
                          <div className="bg-white/90 p-4 rounded-lg shadow-md backdrop-blur-sm transform transition-transform duration-300 group-hover:scale-105">
                            <QRCodeSVG value={qrUrl} size={100} />
                            <p className="text-xs text-center font-medium text-gray-600 mt-2">
                              Scan to Connect
                            </p>
                          </div>
                        </div>
                      )}
                      <p
                        className="text-sm md:text-base leading-relaxed text-gray-800 whitespace-pre-line"
                        style={{ color: titleColor }}
                      >
                        {largeDescription}
                      </p>
                    </div>
                  </div>
                </div>
              )}



              {/* Business Variant Style 4 */}
              {selectedVariant === 'business' && selectedVariantStyle === 'style4' && (
                <div
                  className="relative p-4 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-gray-800 to-gray-900 text-white"
                  style={{
                    background: bgType === 'gradient'
                      ? `linear-gradient(to bottom, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
                      : bgType === 'solid'
                      ? solidColor
                      : '#f8f9fa',
                  }}>
                  {/* Floating Decorations */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none"></div>
                  <div className="absolute -top-16 -left-16 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

                  {/* Card Content */}
                  <div className="relative z-10 space-y-6">
                    {/* Logo and Title */}
                    {logo && (
                      <div className="flex justify-center">
                        <img
                          src={logo}
                          alt="Logo"
                          className="w-20 h-20 rounded-full border-2 border-gray-500 shadow-md"
                        />
                      </div>
                    )}
                    <h3
                      className="text-2xl font-bold text-center tracking-wide"
                      style={{ color: titleColor }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-sm text-center"
                      style={{ color: titleColor }}
                    >
                      {description}
                    </p>

                    {/* Divider */}
                    <div className="w-16 mx-auto h-0.5 bg-white/20"></div>

                    {/* QR Code */}
                    {qrUrl && (
                      <div className="flex justify-center">
                        <div className="bg-white/20 p-4 rounded-lg shadow-md">
                          <QRCodeSVG value={qrUrl} size={100} />
                          <p className="text-xs text-center mt-2 text-gray-300">
                            Scan to Connect
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Large Description */}
                    <div className="text-sm md:text-base leading-relaxed text-gray-200 whitespace-pre-line">
                      <p style={{ color: titleColor }}>{largeDescription}</p>
                    </div>
                  </div>
                </div>
              )}


            </div>
    {/* Business Variant Display Finish */} 

    {/* Flyer Display Start */}


    <>

        {selectedVariant === 'flyer' && selectedVariantStyle === 'default' && (
          <div
            className="relative p-2 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
            style={{
              background: bgType === 'gradient'
                ? `linear-gradient(to bottom right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
                : bgType === 'solid'
                ? solidColor
                : '#1a1a1a',
            }}
          >
            {/* Background Image */}
            {backgroundImage && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{
                  backgroundImage: `url(${typeof backgroundImage === 'string' ? backgroundImage : URL.createObjectURL(backgroundImage)})`,
                }}
              ></div>
            )}

            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400/20 rounded-full blur-[150px]"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-500/20 rounded-full blur-[150px]"></div>

            {/* Flyer Content */}
            <div className="relative z-10 space-y-8 text-center text-white">
              {/* Title */}
              <h3
                className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide"
                style={{ color: titleColor }}
              >
                {title || "Celebrate in Style!"}
              </h3>

              {/* Subheading */}
              <p
                className="text-lg md:text-xl text-white/90"
                style={{ color: descriptionColor }}
              >
                {description || "An unforgettable evening awaits!"}
              </p>

              {/* Flyer Image */}
              {flyerImage && (
                <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={flyerImage}
                    alt="Event Image"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              )}

              {/* Main Content */}
              <div className="p-6 rounded-xl bg-black/50 backdrop-blur-lg shadow-md">
                <p
                  className="text-base md:text-lg leading-relaxed whitespace-pre-wrap"
                  style={{ color: titleColor }}
                >
                  {largeDescription ||
                    "Join us for live music, entertainment, and memories to last a lifetime!"}
                </p>
              </div>

              {/* QR Code & Price */}
              <div className="flex flex-wrap justify-center gap-6">
                {qrUrl && (
                  <div className="bg-white/80 p-4 rounded-lg shadow-md backdrop-blur-md">
                    <QRCodeSVG value={qrUrl} size={100} />
                    <p className="text-xs text-black mt-2 font-medium">
                      Scan for Details
                    </p>
                  </div>
                )}
                {price && !isNaN(parseFloat(price)) && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 shadow-lg text-center">
                    <p
                      className="text-sm font-medium text-white mb-2"
                      style={{ color: titleColor }}
                    >
                      Admission Fee
                    </p>
                    <p
                      className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
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
                      className="rounded-full object-cover border-2 border-white/50 shadow-md"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}


        {selectedVariant === 'flyer' && selectedVariantStyle === 'style1' && (
              <div
                className="relative p-4 rounded-2xl shadow-xl overflow-hidden " style={{
                  background: bgType === 'gradient'
                    ? `linear-gradient(to bottom right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
                    : bgType === 'solid'
                    ? solidColor
                    : '#1a1a1a',
                }}
              >
                {/* Background Image */}
                {backgroundImage && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{
                      backgroundImage: `url(${typeof backgroundImage === 'string' ? backgroundImage : URL.createObjectURL(backgroundImage)})`,
                    }}
                  ></div>
                )}

                {/* Decorative Elements */}
                {/* <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-400/30 rounded-full blur-[150px]"></div>
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-pink-500/30 rounded-full blur-[150px]"></div> */}

                {/* Flyer Content */}
                <div className="relative z-10 space-y-8 text-center text-white">
                  {/* Title */}
                  <h3 className="text-5xl font-extrabold uppercase tracking-wide">
                    {title || "Celebrate in Style!"}
                  </h3>

                  {/* Subheading */}
                  <p className="text-lg md:text-xl text-white/80">
                    {description || "An unforgettable evening awaits!"}
                  </p>

                  {/* Flyer Image */}
                  {flyerImage && (
                    <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={flyerImage}
                        alt="Event Image"
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                  )}

                  {/* Main Content */}
                  <div className="p-6 rounded-xl bg-black/50 backdrop-blur-lg shadow-md">
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">
                      {largeDescription ||
                        "Join us for live music, entertainment, and memories to last a lifetime!"}
                    </p>
                  </div>

                  {/* QR Code & Price */}
                  <div className="flex flex-wrap justify-center gap-6">
                    {qrUrl && (
                      <div className="bg-white/80 p-4 rounded-lg shadow-md backdrop-blur-md">
                        <QRCodeSVG value={qrUrl} size={100} />
                        <p className="text-xs text-black mt-2 font-medium">Scan for Details</p>
                      </div>
                    )}
                    {price && !isNaN(parseFloat(price)) && (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 shadow-lg text-center">
                        <p className="text-sm font-medium text-white mb-2">Admission Fee</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
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
                          layout="fill"
                          className="rounded-full object-cover border-2 border-white/50 shadow-md"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
        )}

        {selectedVariant === 'flyer' && selectedVariantStyle === 'style2' && (
          <div className="relative p-4 rounded-2xl shadow-xl overflow-hidden bg-gray-900">
            {/* Background Image */}
            {backgroundImage && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{
                  backgroundImage: `url(${typeof backgroundImage === 'string' ? backgroundImage : URL.createObjectURL(backgroundImage)})`,
                }}
              ></div>
            )}

            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-800/60 to-transparent"></div>

            {/* Flyer Content */}
            <div className="relative z-10 space-y-8 text-center text-white">
              {/* Title */}
              <h3 className="text-4xl font-extrabold tracking-wide">
                {title || "Modern Event"}
              </h3>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-white/80">
                {description || "Experience the future of entertainment"}
              </p>

              {/* Flyer Image */}
              {flyerImage && (
                <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={flyerImage}
                    alt="Event Image"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                </div>
              )}

              {/* Main Content */}
              <div className="p-6 rounded-xl bg-black/50 backdrop-blur-md shadow-lg">
                <p className="text-base leading-relaxed whitespace-pre-wrap">
                  {largeDescription ||
                    "Immerse yourself in a world of unforgettable experiences and vibrant energy!"}
                </p>
              </div>

              {/* QR Code & Price */}
              <div className="flex  justify-center gap-4">
                {qrUrl && (
                  <div className="bg-gray-100 w-1/3 p-3 mx-auto  rounded-lg shadow-md backdrop-blur-md">
                    <QRCodeSVG value={qrUrl} size={100} />
                    <p className="text-xs text-gray-800 mt-2">Scan for More Info</p>
                  </div>
                )}
                {price && !isNaN(parseFloat(price)) && (
                  <div className="p-4 w-2/3 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 shadow-lg text-center">
                    <p className="text-sm text-white mb-2">Ticket Price</p>
                    <p className="text-3xl font-bold text-white">
                      {formatCurrency(parseFloat(price), currency)}
                    </p>
                  </div>
                )}
              </div>

              {/* Logo */}
              {logo && (
                <div className="flex justify-center mt-6">
                  <div className="relative w-16 h-16">
                    <Image
                      src={logo}
                      alt="Logo"
                      layout="fill"
                      className="rounded-full object-cover shadow-md"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}





    </>

     {/* Flyer Display End */}    


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
          backgroundImage: `url(${typeof heroImage === 'string' ? heroImage : URL.createObjectURL(heroImage)})`,
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
          <div className="backdrop-blur-lg bg-white/70 p-3 rounded-xl">
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
    className="relative min-h-[600px] p-2 md:p-10 bg-cover bg-center rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl"
    style={{
      background:
        bgType === 'gradient'
          ? `linear-gradient(135deg, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
          : bgType === 'solid'
          ? solidColor
          : "",
    }}
  >
    {/* Enhanced Decorative Elements */}
    {/* <div className="absolute inset-0 z-10  rounded-2xl backdrop-blur-sm" />
    <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-puls" /> */}

    {/* Background Image with Parallax */}
    {heroImage && (
      <div
        className="absolute inset-0 bg-cover bg-center opacity-45 transform transition-transform duration-1000 hover:scale-105"
        style={{
          backgroundImage: `url(${typeof heroImage === 'string' ? heroImage : URL.createObjectURL(heroImage)})`,
        }}
      ></div>
    )}

    <div className="relative z-10 flex flex-col items-center gap-10">
      {/* Logo with enhanced animation */}
      {logo && (
        <div className="transform hover:scale-110 transition-all duration-500 hover:rotate-3">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white/40 shadow-2xl overflow-hidden backdrop-blur-sm">
            <img
              src={typeof logo === 'string' ? logo : URL.createObjectURL(logo)}
              alt="Event Logo"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>
      )}

      {/* Event Name with enhanced styling */}
      {eventName && (
        <div className="w-full max-w-2xl transform hover:-translate-y-2 transition-all duration-500">
          <div className="p-4 bg-white/40 backdrop-blur-xl  rounded-2xl border border-white/20 shadow-2xl hover:bg-white/15">
            <h3 
              className="text-4xl md:text-6xl font-bold text-center whitespace-pre-line tracking-tight drop-shadow-lg" 
              style={{ color: textColors.eventName }}
            >
              {eventName}
            </h3>
          </div>
        </div>
      )}

      {/* Event Details with improved layout */}
      <div className="space-y-4 text-center max-w-xl backdrop-blur-sm p-4 rounded-2xl bg-white/40">
        {eventDate && (
          <p 
            className="text-2xl md:text-3xl font-light drop-shadow-lg"
            style={{ color: textColors.eventDate }}
          >
            Date: {eventDate}
          </p>
        )}
        {eventTime && (
          <p 
            className="text-xl md:text-2xl drop-shadow-lg"
            style={{ color: textColors.eventTime }}
          >
            Time: {eventTime}
          </p>
        )}
        {eventLocation && (
          <p 
            className="text-xl md:text-2xl italic drop-shadow-lg"
            style={{ color: textColors.eventLocation }}
          >
            Location: {eventLocation} 😊
          </p>
        )}
      </div>

      {/* Invitee and Inviter Names with enhanced styling */}
      <div className="space-y-4 text-center max-w-xl bg-white/40 backdrop-blur-sm p-4 rounded-2xl">
        {inviteeName && (
          <p 
            className="text-xl md:text-2xl drop-shadow-lg"
            style={{ color: textColors.inviteeName }}
          >
            Dear {inviteeName},
          </p>
        )}
        {inviterName && (
          <p 
            className="text-xl md:text-2xl drop-shadow-lg"
            style={{ color: textColors.inviterName }}
          >
            You are cordially invited by {inviterName}
          </p>
        )}
        {occasion && (
          <p 
            className="text-xl md:text-2xl drop-shadow-lg"
            style={{ color: textColors.occasion }}
          >
            to the occasion of {occasion}
          </p>
        )}
      </div>

      {/* Description with improved container */}
      {description && (
        <div className="w-full max-w-2xl">
          <div className="p-4 bg-white/40 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/15 transition-colors duration-300">
            <p 
              className="text-lg md:text-xl text-center whitespace-pre-wrap leading-relaxed drop-shadow-lg"
              style={{ color: textColors.description }}
            >
              {description}
            </p>
          </div>
        </div>
      )}

      {/* Enhanced QR Code section */}
      {qrUrl && (
        <div className="mt-auto w-full max-w-xs">
          <div className="p-6 bg-white/65 backdrop-blur-xl rounded-2xl border border-white/20 flex flex-col items-center gap-4 hover:bg-white/20 transition-colors duration-300">
            <QRCodeSVG 
              value={qrUrl} 
              size={150}
              className="rounded-xl shadow-lg p-2 bg-white"
            />
            <p 
              className="text-sm font-medium tracking-wider uppercase drop-shadow-lg"
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
  <div 
    className="relative p-4 md:p-6 rounded-2xl rounded-b-none shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl"
    style={{
      background: bgType === 'gradient'
        ? `linear-gradient(to bottom right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
        : bgType === 'solid'
        ? solidColor
        : 'none',
    }}
  >
    <div className="relative z-10 grid gap-8 md:grid-cols-[2fr,1fr]">
      {/* Left Column - Main Content */}
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center md:text-left space-y-4 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight" style={{ color: textColors.title }}>
            {title || 'Recipe Name'}
          </h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-white/90" style={{ color: textColors.details }}>
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
              </svg>
              {cookingTime} mins
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
              Serves {servings}
            </span>
          </div>
        </div>

        {/* Description Section */}
        {description && (
          <div className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-colors duration-300" style={{ backgroundColor: innerCardColor }}>
            <h3 className="text-2xl font-semibold mb-6" style={{ color: textColors.sectionTitle }}>Description</h3>
            <p className="text-white/90" style={{ color: textColors.description }}>
              {description}
            </p>
          </div>
        )}

        {/* Ingredients Section Display */}
          <div className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-colors duration-300" style={{ backgroundColor: innerCardColor }}>
            <h3 className="text-2xl font-semibold mb-6" style={{ color: textColors.sectionTitle }}>Ingredients</h3>
            <ul className="space-y-3">
              {ingredients.map((ing, idx) => (
                <li key={idx} className="flex justify-between items-center p-2 hover:bg-white/5 rounded-lg transition-colors" style={{ backgroundColor: ing.backgroundColor, borderColor: ing.borderColor, color: ing.textColor }}>
                  <span className="font-medium">{ing.item}</span>
                  <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: ing.amountBackgroundColor, borderColor: ing.amountBorderColor, color: ing.amountTextColor }}>{ing.amount}</span>
                </li>
              ))}
            </ul>
          </div>

        {/* Instructions Section */}
        <div className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-colors duration-300" style={{ backgroundColor: innerCardColor }}>
          <h3 className="text-2xl font-semibold mb-6" style={{ color: textColors.sectionTitle }}>Instructions</h3>
          <ol className="space-y-4" style={{ color: textColors.instructions }}>
            {instructions.map((inst, idx) => (
              <li key={idx} className="flex gap-4 p-2 hover:bg-white/5 rounded-lg transition-colors">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white/20 rounded-full">
                  {idx + 1}
                </span>
                <span>{inst.step}</span>
              </li>
            ))}
          </ol>
        </div>

        

      </div>

      {/* Right Column - Image, Difficulty */}
      <div className="space-y-8">
      {heroImage && (
          <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
            <Image 
              src={heroImage} 
              alt={title} 
              width={400} 
              height={500} 
              className="w-full h-[300px] object-cover hover:scale-110 transition-transform duration-700" 
            />
          </div>
        )}
        <div className="p-6 bg-white/15 backdrop-blur-xl rounded-2xl border border-white/20" style={{ backgroundColor: innerCardColor }}>
          <div className="text-center space-y-4">
            <span className={`px-4 py-2 rounded-xl text-sm font-medium inline-block ${getDifficultyColor(difficulty)}`}>
              {difficulty.toUpperCase()}
            </span>
          </div>
        </div>
        {logo && (
          <div className="flex justify-center">
            <div className="relative w-20 h-20 transform hover:scale-110 transition-transform duration-300">
              <Image 
                src={typeof logo === 'string' ? logo : URL.createObjectURL(logo)} 
                alt="Logo" 
                fill 
                className="rounded-full object-cover border-2 border-white/50 shadow-lg" 
              />
            </div>
          </div>
        )}
        {/* Chef's Tips */}
        {/* Chef's Tips */}
        {chefTips && chefTips.length > 0 && (
              <div className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-4" style={{ color: textColors.sectionTitle }}>Chef's Tips</h3>
                <ul className="space-y-4" style={{ color: textColors.chefTips }}>
                  {chefTips.map((tip, index) => (
                    <li key={index} className="text-white/90 italic text-sm leading-relaxed">
                      💡 {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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


    {/* Add Birthday card display */}
    {selectedVariant === "birthday" && (
  <div className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-6 md:p-10 rounded-2xl shadow-xl overflow-hidden animate-gradient-x">
    {/* Decorative Elements */}
    <div className="absolute inset-0 bg-[url('/confetti.png')] opacity-20 animate-spin-slow"></div>
    <div className="absolute -top-28 -right-28 w-[20rem] h-[20rem] md:w-[28rem] md:h-[28rem] bg-yellow-400/20 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-28 -left-28 w-[20rem] h-[20rem] md:w-[28rem] md:h-[28rem] bg-blue-400/20 rounded-full blur-3xl"></div>
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

    <div className="relative z-10 space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white drop-shadow-lg mb-4 animate-bounce-slow">
          {wishType || "Happy Birthday!"}
        </h2>
        <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-300 drop-shadow-lg mb-4 animate-fade-in">
          {celebrantName || "Dear Friend"}
        </p>
        {age && (
          <p className="text-lg sm:text-2xl md:text-3xl text-white/90 drop-shadow-lg">
            on your {age}
            <sup>th</sup> Birthday!
          </p>
        )}
      </div>

      {/* Main Image */}
      {image && (
        <div className="relative mx-auto w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full overflow-hidden border-[6px] border-white/60 shadow-2xl hover:scale-105 transition-transform duration-300">
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
        <p className="text-sm sm:text-lg text-white/80">Your next birthday is in:</p>
        <p className="text-3xl sm:text-4xl font-bold text-white tracking-wide">
          {calculateDaysUntilBirthday(cardDate, birthdayDate)}
        </p>
      </div>

      {/* Message */}
      <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 shadow-lg">
        <p className="text-lg sm:text-xl md:text-2xl text-white text-center font-medium leading-relaxed tracking-wide">
          {message ||
            "Wishing you a day filled with love, joy, laughter, and amazing memories. You are cherished beyond words!"}
        </p>
      </div>

      {/* Social Media Share */}
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
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
      <div className="flex flex-col sm:flex-row justify-between items-center pt-6 space-y-4 sm:space-y-0">
        <div className="flex items-center gap-4">
          {logo && (
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 hover:scale-110 transition-transform duration-300">
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
        <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm shadow-md text-center">
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


    {/* Event Related Display */}  
    <div className="  ">
    {/* Event Variant Default Style  */}
      {selectedVariant === 'event' && selectedVariantStyle === 'default' && (
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

    {/* Event Variant Style 1 - Elegant Design */}
      {selectedVariant === 'event' && selectedVariantStyle === 'style1' && (
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              <div className="space-y-4 w-full sm:w-2/3">
                <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full text-sm font-medium text-white">
                  🎉 Event Ticket
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight">{title}</h3>
                <div className="space-y-3">
                  <p className="flex items-center text-white/90 text-base sm:text-lg">
                    <span className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-xl rounded-xl mr-3">📅</span>
                    {new Date(eventDate).toLocaleString()}
                  </p>
                  <p className="flex items-center text-white/90 text-base sm:text-lg">
                    <span className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-xl rounded-xl mr-3">📍</span>
                    {eventLocation}
                  </p>
                  {price && (
                    <p className="flex items-center text-white/90 text-base sm:text-lg">
                      <span className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-xl rounded-xl mr-3">💰</span>
                      {formatCurrency(parseFloat(price), currency)}
                    </p>
                  )}
                </div>
              </div>
              {qrUrl && (
                <div className="w-full sm:w-auto">
                  <div className="bg-white/95 p-4 rounded-2xl shadow-lg backdrop-blur-xl transform transition hover:scale-105">
                    <QRCodeSVG value={qrUrl} size={100} />
                    <p className="text-xs text-center font-medium text-purple-900 mt-2">Scan to verify</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8 bg-white/10 backdrop-blur-xl p-6 rounded-2xl">
              <h4 className="text-xl font-semibold text-white mb-4">Event Details</h4>
              <p className="text-white/90 whitespace-pre-line">{description}</p>
              {largeDescription && (
                <div className="mt-4 pt-4 border-t border-white/10 text-white/80 whitespace-pre-line">{largeDescription}</div>
              )}
            </div>
          </div>
        </div>
      )}

    {/* Event Variant Style 2 - Modern Dark Theme */}
      {selectedVariant === 'event' && selectedVariantStyle === 'style2' && (
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-xl rounded-full text-xs font-medium text-white/80">
                {new Date(eventDate).toLocaleString()}
              </span>
              <h3 className="text-4xl sm:text-5xl font-bold text-white bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                {title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl">
                  <span className="block text-white/60 text-sm mb-1">Date & Time</span>
                  <p className="text-white font-medium">{new Date(eventDate).toLocaleString()}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl">
                  <span className="block text-white/60 text-sm mb-1">Location</span>
                  <p className="text-white font-medium">{eventLocation}</p>
                </div>
                {price && (
                  <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl">
                    <span className="block text-white/60 text-sm mb-1">Price</span>
                    <p className="text-white font-medium">{formatCurrency(parseFloat(price), currency)}</p>
                  </div>
                )}
              </div>
              {qrUrl && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition"></div>
                  <div className="relative bg-black p-4 rounded-xl">
                    <QRCodeSVG value={qrUrl} size={120} />
                    <p className="text-xs font-medium text-white/60 mt-2">Scan for verification</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8 relative">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="pt-8 space-y-4">
                <h4 className="text-xl font-semibold text-white/90">Event Details</h4>
                <p className="text-white/70 whitespace-pre-line leading-relaxed">{description}</p>
                {largeDescription && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-white/60 whitespace-pre-line leading-relaxed">{largeDescription}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

       {/* Event Variant Style 3 - Modern Dark Theme */}
       {selectedVariant === 'event' && selectedVariantStyle === 'style3' && (
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
          <div className="relative p-2 sm:p-4">
            <div className="flex flex-col items-center text-center space-y-6">
            {eventImage && (
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <Image
              src={eventImage}
              alt="Product Image"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
              <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-xl rounded-full text-xs font-medium text-white/80">
                {new Date(eventDate).toLocaleString()}
              </span>
              <h3 className="text-4xl sm:text-5xl font-bold text-white bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                {title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl">
                  <span className="block text-white/60 text-sm mb-1">Date & Time</span>
                  <p className="text-white font-medium">{new Date(eventDate).toLocaleString()}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl">
                  <span className="block text-white/60 text-sm mb-1">Location</span>
                  <p className="text-white font-medium">{eventLocation}</p>
                </div>
                {price && (
                  <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl">
                    <span className="block text-white/60 text-sm mb-1">Price</span>
                    <p className="text-white font-medium">{formatCurrency(parseFloat(price), currency)}</p>
                  </div>
                )}
              </div>
              {qrUrl && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition"></div>
                  <div className="relative bg-black p-4 rounded-xl">
                    <QRCodeSVG value={qrUrl} size={120} />
                    <p className="text-xs font-medium text-white/60 mt-2">Scan for verification</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8 relative">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="pt-8 space-y-4">
                <h4 className="text-xl font-semibold text-white/90">Event Details</h4>
                <p className="text-white/70 whitespace-pre-line leading-relaxed">{description}</p>
                {largeDescription && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-white/60 whitespace-pre-line leading-relaxed">{largeDescription}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

{/* Event Variant Style 4 - Playful and Fun Theme */}
{selectedVariant === 'event' && selectedVariantStyle === 'style4' && (
        <div
          className="relative rounded-2xl shadow-2xl overflow-hidden"
          style={{
            background: bgType === 'gradient'
              ? `linear-gradient(to bottom right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
              : bgType === 'solid'
              ? solidColor
              : 'none',
          }}
        >
          <div className="absolute inset-0 bg-confetti-pattern opacity-20"></div>
          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              {eventImage && (
                <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <Image
                    src={eventImage}
                    alt="Event Image"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-xl rounded-full text-xs font-medium text-white/80">
                {new Date(eventDate).toLocaleString()}
              </span>
              <h3 className="text-4xl sm:text-5xl font-bold text-white bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                {title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl">
                  <span className="block text-white/60 text-sm mb-1">Date & Time</span>
                  <p className="text-white font-medium">{new Date(eventDate).toLocaleString()}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl">
                  <span className="block text-white/60 text-sm mb-1">Location</span>
                  <p className="text-white font-medium">{eventLocation}</p>
                </div>
                {price && (
                  <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl">
                    <span className="block text-white/60 text-sm mb-1">Price</span>
                    <p className="text-white font-medium">{formatCurrency(parseFloat(price), currency)}</p>
                  </div>
                )}
              </div>
              {qrUrl && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition"></div>
                  <div className="relative bg-black p-4 rounded-xl">
                    <QRCodeSVG value={qrUrl} size={120} />
                    <p className="text-xs font-medium text-white/60 mt-2">Scan for verification</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8 relative">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="pt-8 space-y-4">
                <h4 className="text-xl font-semibold text-white/90">Event Details</h4>
                <p className="text-white/70 whitespace-pre-line leading-relaxed">{description}</p>
                {largeDescription && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-white/60 whitespace-pre-line leading-relaxed">{largeDescription}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}


    </div>



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
    {showfooterPart && (

          <div className="mt-2 flex justify-end">
          <div className="text-xs rounded-t-none w-full text-center rounded-b-2xl px-1 py-2 rounded-md bg-slate-800/40 text-stone-50"  style={{backgroundColor: footerCardColor, color: footerColor,}}>
          Powered by KardifyMe
          </div>
          </div>
    )}
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

          
{/* Checkbox Example */}
<div className=" bg-white/80 p-3 shadow-md rounded-xl">
      <input 
        value={cardState.title}
        onChange={e => updateCardState({ title: e.target.value })}
        title="Enter card title"
        placeholder="Card Title"
      />
      <label className={baseLabelStyles}>Show Sections</label>
        <div className=" border m-4 "/>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showTopPart}
            onChange={(e) => setShowTopPart(e.target.checked)}
            className="form-checkbox text-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
          <span className=" text-slate-700 text-xs">Show Top Section</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showBottomPart}
            onChange={(e) => setShowBottomPart(e.target.checked)}
            className="form-checkbox text-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-slate-700 text-xs">Show Bottom Section</span>
        </label>
        {/* <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showfooterPart}
            onChange={(e) => setshowfooterPart(e.target.checked)}
            className="form-checkbox text-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-slate-700 text-xs">Show App Signature</span>
        </label> */}
      </div>
    </div>

          {/* Select Card Type */}

          <div className="space-y-4 bg-gradient-to-br from-white to-gray-50/80 p-4 md:p-8 rounded-xl shadow-xl border border-gray-100">
  {/* Card Type Selector */}
  <div className="space-y-2">
    <label className="block text-lg font-semibold text-gray-800">
      Select Card Type
      <span className="ml-2 text-gray-400 text-sm font-normal">Choose your design</span>
    </label>
    <div className="relative mt-1">
      <select
        title="Select card type"
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
        <option value="resume">💬 Resume</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
        <svg className="w-5 h-5 transition-transform duration-200 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>

  {/* Card Style Selector */}
<div className="space-y-2">
  <label className="block text-lg font-semibold text-gray-800">
    Select Card Style
    <span className="ml-2 text-gray-400 text-sm font-normal">Choose your style</span>
  </label>
  <div className="relative mt-1">
    <select
      value={selectedVariantStyle}
      onChange={(e) => setSelectedVariantStyle(e.target.value)}
      className="w-full p-4 pr-12 text-gray-700 bg-white rounded-2xl border border-gray-200 
               shadow-sm appearance-none cursor-pointer transition-all duration-200
               hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
    >
      <option value="default">Default Style</option>
      <option value="style1">Style 1</option>
      <option value="style2">Style 2</option>
      <option value="style3">Style 3</option>
      <option value="style4">Style 4</option>
      {/* Add more styles as needed */}
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
    {/* Card Color Picker1 */}
    <div className="space-y-2 bg-white p-4 mx-auto rounded-2xl border border-gray-100 shadow-sm">
      <label className="block font-medium text-gray-700">
        Card Color
        <span className="ml-2 text-sm text-gray-400">Customize appearance</span>
      </label>
      <div className="relative group">
        <div title="Select card color">
          <SketchPicker
            color={cardColor[selectedVariant]}
            onChange={(color) => setCardColor({ ...cardColor, [selectedVariant]: color.hex })}
            className="w-full h-fit p-4 cursor-pointer transition-transform duration-200 
                     "
          />
        </div>
        <div className="absolute inset-0 rounded-xl ring-2 ring-gray-200 pointer-events-none 
                      transition-opacity opacity-0 group-hover:opacity-100" />
      </div>
    </div>

    {/* Template Selector */}
    <div className="space-y-2 bg-white p-0 rounded-2xl border border-gray-100 shadow-sm">
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
  <div className="space-y-2 bg-white p-0 rounded-2xl border border-gray-100 shadow-sm">
    <label className="block font-medium text-gray-700">
      Text Color
      <span className="ml-2 w-full text-sm text-gray-400">Set font color</span>
    </label>
    <div className="relative group">
      <SketchPicker
        color={titleColor}
        onChange={(color) => setTitleColor(color.hex)}
        className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                  border border-gray-200"
      />
      
    </div>

    <label className="block font-medium text-gray-700">
      Footer Text Color Picker
      <span className="ml-2 text-sm text-gray-400">Set footer font color</span>
    </label>
    <div className="relative group">
    <SketchPicker
        color={footerColor}
        onChange={(color) => setFooterColor(color.hex)}
        className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                  border border-gray-200"
      />
      {/* <input
        type="color"
        value={footerColor}
        onChange={(e) => setFooterColor(e.target.value)}
        className="w-full h-12 rounded-xl cursor-pointer transition-transform duration-200 
                 hover:scale-[1.02] focus:scale-[1.02] border border-gray-200"
      /> */}
      
    </div>

    <label className="block font-medium text-gray-700">
    Footer Card Color Picker
          <span className="ml-2 text-sm text-gray-400">Set Footer Color</span>
    </label>
      <div className="relative group">
          {/* <input
            type="color"
            value={footerCardColor}
            onChange={(e) => setfooterCardColor(e.target.value)}
            className="w-full h-12 rounded-xl cursor-pointer transition-transform duration-200 
                 hover:scale-[1.02] focus:scale-[1.02] border border-gray-200"
          /> */}
          <SketchPicker
            color={footerCardColor}
            onChange={(color) => setfooterCardColor(color.hex)}
            className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                      border border-gray-200"
          />
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
  <div className="space-y-6 bg-white/90 p-4 rounded-xl">
    {/* Background Type Selection */}
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-stone-800 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Background Type
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* <div className="">
      <label className={baseLabelStyles}>Inner BG Color</label>
      <input
        type="color"
        value={backgroundColor}
        onChange={(e) => setBackgroundColor(e.target.value)}
        className="w-full h-[45px] backdrop-blur-sm rounded-xl"
      />
    </div> */}
        <div>
          <label className="block text-stone-800 text-sm font-medium mb-2">Background Type</label>
          <select
            value={bgType}
            onChange={(e) => setBgType(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
          >
            <option value="gradient">Gradient</option>
            <option value="solid">Solid Color</option>
          </select>
        </div>
        {bgType === 'gradient' && (
          <>
            <div>
              <label className="block text-stone-800 text-sm font-medium mb-2">Gradient From</label>
              {/* <input
                type="color"
                value={gradientFrom}
                onChange={(e) => setGradientFrom(e.target.value)}
                className="w-full h-10 rounded-lg border border-slate-300"
              /> */}
              <SketchPicker
                color={gradientFrom}
                onChange={(color) => setGradientFrom(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
              />
            </div>
            <div>
              <label className="block text-stone-800 text-sm font-medium mb-2">Gradient Via</label>
              {/* <input
                type="color"
                value={gradientVia}
                onChange={(e) => setGradientVia(e.target.value)}
                className="w-full h-10 rounded-lg border border-slate-300"
              /> */}
              <SketchPicker
                color={gradientVia}
                onChange={(color) => setGradientVia(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
              />
            </div>
            <div>
              <label className="block text-stone-800 text-sm font-medium mb-2">Gradient To</label>
              {/* <input
                type="color"
                value={gradientTo}
                onChange={(e) => setGradientTo(e.target.value)}
                className="w-full h-10 rounded-lg border border-slate-300"
              /> */}
              <SketchPicker
                color={gradientTo}
                onChange={(color) => setGradientTo(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
              />
            </div>
          </>
        )}
        {bgType === 'solid' && (
          <div>
            <label className="block text-stone-800 text-sm font-medium mb-2">Solid Color</label>
            {/* <input
              type="color"
              value={solidColor}
              onChange={(e) => setSolidColor(e.target.value)}
              className="w-full h-10 rounded-lg border border-slate-300"
            /> */}
            <SketchPicker
              color={solidColor}
              onChange={(color) => setSolidColor(color.hex)}
              className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
            />
          </div>
        )}
      </div>
    </div>
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
        {/* <input
          type="color"
          value={gradientFrom}
          onChange={(e) => setGradientFrom(e.target.value)}
          className="w-full h-10 rounded-lg border border-slate-300"
        /> */}
        <SketchPicker
              color={gradientFrom}
              onChange={(color) => setGradientFrom(color.hex)}
              className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
        />
      </div>
      <div>
        <label className="block text-stone-950 mb-2">Gradient Via</label>
        {/* <input
          type="color"
          value={gradientVia}
          onChange={(e) => setGradientVia(e.target.value)}
          className="w-full h-10 rounded-lg border border-slate-300"
        /> */}
      </div>
      <SketchPicker
              color={gradientVia}
              onChange={(color) => setGradientVia(color.hex)}
              className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
            />
      <div>
        <label className="block text-stone-950 mb-2">Gradient To</label>
        {/* <input
          type="color"
          value={gradientTo}
          onChange={(e) => setGradientTo(e.target.value)}
          className="w-full h-10 rounded-lg border border-slate-300"
        /> */}
        <SketchPicker
              color={gradientTo}
              onChange={(color) => setGradientTo(color.hex)}
              className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
            />
      </div>
      {/* Background Image Upload */}
    <div>
      <label className="block text-gray-800 font-medium mb-2">Upload Background Image</label>
      
      <div className="space-y-2">
                {backgroundImage && (
                  <div className="relative w-full h-40 bg-gray-200 rounded-xl overflow-hidden shadow-md">
                    <img src={backgroundImage} alt="Uploaded Hero" className="object-cover w-full h-full" />
                    <button
                      title="Delete Hero Image"
                      onClick={() => setBackgroundImage('')}
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
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setBackgroundImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  accept="image/*"
                />
              </div>

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
    <div className="space-y-4">
  <label className="block text-lg font-medium text-gray-900">Upload Flyer Image</label>
  <div className="space-y-2">
                {flyerImage && (
                  <div className="relative w-full h-40 bg-gray-200 rounded-xl overflow-hidden shadow-md">
                    <img src={flyerImage} alt="Uploaded Hero" className="object-cover w-full h-full" />
                    <button
                      title="Delete Hero Image"
                      onClick={() => setflyerImage('')}
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
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setflyerImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  accept="image/*"
                />
              </div>
                </div>
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
      <label className="block text-lg font-medium text-gray-900">Upload Flyer Logo</label>
      <input
        type="file"
        onChange={(e) => handleImageChange(e, 'logo')}
        className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
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
      <div className="items-center gap-2">
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter brand name"
        />
        <SketchPicker
          color={textColors.brandName}
          onChange={(color) => setTextColors({ ...textColors, brandName: color.hex })}
          className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
        />
        {/* <SketchPicker
              color={solidColor}
              onChange={(color) => setSolidColor(color.hex)}
              className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
            /> */}
      </div>
    </div>

    {/* Tagline */}
    <div>
      <label className="block text-gray-700 font-medium mb-2">Tagline</label>
      <div className=" gap-2">
        <input
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter tagline"
        />
        {/* <input
          type="color"
          value={textColors.tagline}
          onChange={(e) => setTextColors({ ...textColors, tagline: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300"
          title="Tagline Text Color"
        /> */}
        <SketchPicker
          color={textColors.tagline}
          onChange={(color) => setTextColors({ ...textColors, tagline: color.hex })}
          className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
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
        {/* <input
          type="color"
          value={textColors.description}
          onChange={(e) => setTextColors({ ...textColors, description: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300"
          title="Description Text Color"
        /> */}
        <SketchPicker
          color={textColors.description}
          onChange={(color) => setTextColors({ ...textColors, description: color.hex })}
          className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
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
        {/* <input
          type="color"
          value={textColors.orderPolicies}
          onChange={(e) => setTextColors({ ...textColors, orderPolicies: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300"
          title="Order Policies Text Color"
        /> */}

        <SketchPicker
            color={textColors.orderPolicies}
            onChange={(color) => setTextColors({ ...textColors, orderPolicies: color.hex })}
            className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
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
        {/* <input
          type="color"
          value={textColors.contactInfo}
          onChange={(e) => setTextColors({ ...textColors, contactInfo: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300"
          title="Contact Information Text Color"
        /> */}

        <SketchPicker
            color={textColors.contactInfo}
            onChange={(color) => setTextColors({ ...textColors, contactInfo: color.hex })}
            className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
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
            <SketchPicker
              color={textColors[platform as keyof typeof textColors]}
              onChange={(color) => setTextColors({ ...textColors, [platform]: color.hex })}
              className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
            />
        {/* <SketchPicker
            color={textColors.orderPolicies}
            onChange={(color) => setTextColors({ ...textColors, orderPolicies: color.hex })}
            className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
        /> */}
            
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
            <img src={typeof heroImage === 'string' ? heroImage : URL.createObjectURL(heroImage)} alt="Uploaded" className="object-cover w-full h-full" />
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
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setHeroImage(reader.result as string);
              };
              reader.readAsDataURL(file);
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
        {/* <input
          type="color"
          value={gradientFrom}
          onChange={(e) => setGradientFrom(e.target.value)}
          className="w-full h-10 rounded-lg border border-gray-300"
        /> */}
        <SketchPicker
              color={gradientFrom}
              onChange={(color) => setGradientFrom(color.hex)}
              className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
            />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Gradient Via</label>
        {/* <input
          type="color"
          value={gradientVia}
          onChange={(e) => setGradientVia(e.target.value)}
          className="w-full h-10 rounded-lg border border-gray-300"
        /> */}
        <SketchPicker
              color={gradientVia}
              onChange={(color) => setGradientVia(color.hex)}
              className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
            />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Gradient To</label>
        {/* <input
          type="color"
          value={gradientTo}
          onChange={(e) => setGradientTo(e.target.value)}
          className="w-full h-10 rounded-lg border border-gray-300"
        /> */}
        <SketchPicker
              color={gradientTo}
              onChange={(color) => setGradientTo(color.hex)}
              className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
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
          {/* <input
            type="color"
            value={gradientFrom}
            onChange={(e) => setGradientFrom(e.target.value)}
            className="w-full h-10 rounded-lg border border-gray-300 bg-white"
          /> */}
          <SketchPicker
              color={gradientFrom}
              onChange={(color) => setGradientFrom(color.hex)}
              className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
            />
        </div>
        <div>
          <label className="block text-gray-800 mb-1 text-sm">Gradient Via</label>
          {/* <input
            type="color"
            value={gradientVia}
            onChange={(e) => setGradientVia(e.target.value)}
            className="w-full h-10 rounded-lg border border-gray-300 bg-white"
          /> */}
          <SketchPicker
              color={gradientVia}
              onChange={(color) => setGradientVia(color.hex)}
              className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
            />
        </div>
        <div>
          <label className="block text-gray-800 mb-1 text-sm">Gradient To</label>
          {/* <input
            type="color"
            value={gradientTo}
            onChange={(e) => setGradientTo(e.target.value)}
            className="w-full h-10 rounded-lg border border-gray-300 bg-white"
          /> */}
          <SketchPicker
              color={gradientTo}
              onChange={(color) => setGradientTo(color.hex)}
              className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
            />
        </div>
      </div>
    )}

    {/* Solid Color Background Input */}
    {bgType === 'solid' && (
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Solid Background Color</label>
        {/* <input
          type="color"
          value={solidColor}
          onChange={(e) => setSolidColor(e.target.value)}
          className="w-full h-10 rounded-lg border border-gray-300 bg-white"
        /> */}
        <SketchPicker
              color={solidColor}
              onChange={(color) => setSolidColor(color.hex)}
              className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
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
          onClick={() => setHeroImage(null)}
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
        {/* <input
          type="color"
          value={textColors.eventName}
          onChange={(e) => setTextColors({ ...textColors, eventName: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300 mt-2 bg-white"
          title="Event Name Text Color"
        /> */}
        <SketchPicker
          color={textColors.eventName}
          onChange={(color) => setTextColors({ ...textColors, eventName: color.hex })}
          className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
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
        {/* <input
          type="color"
          value={textColors.eventDate}
          onChange={(e) => setTextColors({ ...textColors, eventDate: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300 mt-2 bg-white"
          title="Event Date Text Color"
        /> */}
        <SketchPicker
          color={textColors.eventDate}
          onChange={(color) => setTextColors({ ...textColors, eventDate: color.hex })}
          className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
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
        {/* <input
          type="color"
          value={textColors.eventTime}
          onChange={(e) => setTextColors({ ...textColors, eventTime: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300 mt-2 bg-white"
          title="Event Time Text Color"
        /> */}
        <SketchPicker
          color={textColors.eventTime}
          onChange={(color) => setTextColors({ ...textColors, eventTime: color.hex })}
          className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
        />
      </div>
      {/* Event Image */}
      {/* <div>
      <label className="block text-gray-700 font-medium mb-2">Upload Event Image</label>
      <div className="space-y-2">
        {eventImage && (
          <div className="relative w-full h-40 bg-gray-100 rounded-xl overflow-hidden shadow-md">
            <img src={typeof eventImage === 'string' ? eventImage : URL.createObjectURL(eventImage)} alt="Uploaded" className="object-cover w-full h-full" />
            <button
              title="Delete hero image"
              onClick={() => seteventImage(null)}
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
                seteventImage(reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
          accept="image/*"
        />
      </div>
    </div> */}
      {/* Event Location */}
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Event Location 😊</label>
        <textarea
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 bg-white"
        />
        {/* <input
          type="color"
          value={textColors.eventLocation}
          onChange={(e) => setTextColors({ ...textColors, eventLocation: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300 mt-2 bg-white"
          title="Event Location Text Color"
        /> */}
        <SketchPicker
          color={textColors.eventLocation}
          onChange={(color) => setTextColors({ ...textColors, eventLocation: color.hex })}
          className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
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
        {/* <input
          type="color"
          value={textColors.inviteeName}
          onChange={(e) => setTextColors({ ...textColors, inviteeName: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300 mt-2 bg-white"
          title="Invitee Name Text Color"
        /> */}
        <SketchPicker
          color={textColors.inviteeName}
          onChange={(color) => setTextColors({ ...textColors, inviteeName: color.hex })}
          className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
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
        {/* <input
          type="color"
          value={textColors.inviterName}
          onChange={(e) => setTextColors({ ...textColors, inviterName: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300 mt-2 bg-white"
          title="Inviter Name Text Color"
        /> */}
        <SketchPicker
          color={textColors.inviterName}
          onChange={(color) => setTextColors({ ...textColors, inviterName: color.hex })}
          className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
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
        {/* <input
          type="color"
          value={textColors.occasion}
          onChange={(e) => setTextColors({ ...textColors, occasion: e.target.value })}
          className="w-10 h-10 rounded-lg border border-gray-300 mt-2 bg-white"
          title="Occasion Text Color"
        /> */}
        <SketchPicker
          color={textColors.occasion}
          onChange={(color) => setTextColors({ ...textColors, occasion: color.hex })}
          className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
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
      {/* <input
        type="color"
        value={textColors.description}
        onChange={(e) => setTextColors({ ...textColors, description: e.target.value })}
        className="w-10 h-10 rounded-lg border border-gray-300 mt-2 bg-white"
        title="Description Text Color"
      /> */}
      <SketchPicker
          color={textColors.description}
          onChange={(color) => setTextColors({ ...textColors, description: color.hex })}
          className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                        border border-gray-200"
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
  <div className="space-y-8 p-4 bg-white/70 backdrop-blur-md rounded-xl border border-white/10">
    {/* Background Type Selection */}
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-stone-800 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Background Type
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-stone-800 text-sm font-medium mb-2">Background Type</label>
          <select
            value={bgType}
            onChange={(e) => setBgType(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
          >
            <option value="gradient">Gradient</option>
            <option value="solid">Solid Color</option>
          </select>
        </div>
        {bgType === 'gradient' && (
          <>
            <div>
              <label className="block text-stone-800 text-sm font-medium mb-2">Gradient From</label>
              {/* <input
                type="color"
                value={gradientFrom}
                onChange={(e) => setGradientFrom(e.target.value)}
                className="w-full h-10 rounded-lg border border-slate-300"
              /> */}
              <SketchPicker
                color={gradientFrom}
                onChange={(color) => setGradientFrom(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
              />
            </div>
            <div>
              <label className="block text-stone-800 text-sm font-medium mb-2">Gradient Via</label>
              {/* <input
                type="color"
                value={gradientVia}
                onChange={(e) => setGradientVia(e.target.value)}
                className="w-full h-10 rounded-lg border border-slate-300"
              /> */}
              <SketchPicker
                color={gradientVia}
                onChange={(color) => setGradientVia(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
              />
            </div>
            <div>
              <label className="block text-stone-800 text-sm font-medium mb-2">Gradient To</label>
              {/* <input
                type="color"
                value={gradientTo}
                onChange={(e) => setGradientTo(e.target.value)}
                className="w-full h-10 rounded-lg border border-slate-300"
              /> */}
              <SketchPicker
                color={gradientTo}
                onChange={(color) => setGradientTo(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
              />
            </div>
          </>
        )}
        {bgType === 'solid' && (
          <div>
            <label className="block text-stone-800 text-sm font-medium mb-2">Solid Color</label>
            {/* <input
              type="color"
              value={solidColor}
              onChange={(e) => setSolidColor(e.target.value)}
              className="w-full h-10 rounded-lg border border-slate-300"
            /> */}
            <SketchPicker
                color={solidColor}
                onChange={(color) => setSolidColor(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
              />
          </div>
        )}
      </div>
    </div>

    {/* Basic Information Section */}
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-stone-800 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Basic Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full md:col-span-2">
          <label className="block text-stone-800 text-sm font-medium mb-2">Recipe Title</label>
          <div className=" gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              placeholder="Enter a delicious recipe name"
            />
            {/* <input
              type="color"
              value={textColors.title}
              onChange={(e) => setTextColors({ ...textColors, title: e.target.value })}
              className="w-10 h-10 rounded-lg border border-slate-300"
              title="Title Text Color"
            /> */}
            <SketchPicker
              color={textColors.title}
              onChange={(color) => setTextColors({ ...textColors, title: color.hex })}
              className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                            border border-gray-200"
            />
          </div>
        </div>
        <div className="col-span-full md:col-span-2">
          <label className="block text-stone-800 text-sm font-medium mb-2">Description</label>
          <div className=" gap-2">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              placeholder="Briefly describe your recipe..."
              rows={3}
            />
            {/* <input
              type="color"
              value={textColors.description}
              onChange={(e) => setTextColors({ ...textColors, description: e.target.value })}
              className="w-10 h-10 rounded-lg border border-slate-300"
              title="Description Text Color"
            /> */}
            <SketchPicker
              color={textColors.description}
              onChange={(color) => setTextColors({ ...textColors, description: color.hex })}
              className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                            border border-gray-200"
            />
          </div>
        </div>
        <div>
          <label className="block text-stone-800 text-sm font-medium mb-2">Cooking Time (mins)</label>
          <div className=" gap-2">
            <input
              type="number"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              placeholder="45"
            />
            {/* <input
              type="color"
              value={textColors.details}
              onChange={(e) => setTextColors({ ...textColors, details: e.target.value })}
              className="w-10 h-10 rounded-lg border border-slate-300"
              title="Details Text Color"
            /> */}
            <SketchPicker
              color={textColors.details}
              onChange={(color) => setTextColors({ ...textColors, details: color.hex })}
              className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                            border border-gray-200"
            />
          </div>
        </div>
        <div>
          <label className="block text-stone-800 text-sm font-medium mb-2">Servings</label>
          <input
            type="number"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
            placeholder="4"
          />
        </div>
        <div>
          <label className="block text-stone-800 text-sm font-medium mb-2">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label className="block text-stone-800 text-sm font-medium mb-2">Inner Card Color</label>
          {/* <input
            type="color"
            value={innerCardColor}
            onChange={(e) => setInnerCardColor(e.target.value)}
            className="w-full h-10 rounded-lg border border-slate-300"
          /> */}
          <SketchPicker
                color={innerCardColor}
                onChange={(color) => setInnerCardColor(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
              />
        </div>
      </div>
    </div>

    {/* Ingredients Section */}
<div className="space-y-6 p-4 sm:p-6">
  <h3 className="text-lg font-semibold text-stone-800 flex items-center gap-2">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
    Ingredients
  </h3>

  <div className="space-y-6">
    {ingredients.map((ing, index) => (
      <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
        {/* Main Content */}
        <div className="p-4 space-y-4">
          {/* Inputs Container */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={ing.item}
              onChange={(e) => {
                const newIngs = [...ingredients];
                newIngs[index].item = e.target.value;
                setIngredients(newIngs);
              }}
              className="w-full p-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-shadow text-base"
              style={{
                backgroundColor: ing.backgroundColor,
                borderColor: ing.borderColor,
                color: ing.textColor,
              }}
              placeholder="Ingredient name"
            />
            <input
              type="text"
              value={ing.amount}
              onChange={(e) => {
                const newIngs = [...ingredients];
                newIngs[index].amount = e.target.value;
                setIngredients(newIngs);
              }}
              className="w-full sm:w-32 p-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-shadow text-base"
              style={{
                backgroundColor: ing.amountBackgroundColor,
                borderColor: ing.amountBorderColor,
                color: ing.amountTextColor,
              }}
              placeholder="Amount"
            />
          </div>

          {/* Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            {/* Color Controls Toggle */}
            <details className="w-full sm:w-auto">
              <summary className="text-sm font-medium text-stone-800 cursor-pointer hover:text-emerald-500 transition-colors">
                Customize Colors
              </summary>
              <div className="mt-3 p-3 bg-white/10 rounded-lg grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-stone-600">Ingredient</p>
                  <label className="flex items-center gap-2">
                    <span className="text-xs">BG</span>
                    <SketchPicker
                      color={ing.backgroundColor}
                      onChange={(color) => {
                        const newIngs = [...ingredients];
                        newIngs[index].backgroundColor = color.hex;
                        setIngredients(newIngs);
                      }}
                     className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
                    />
                  </label>
                  <label className="flex items-center gap-2">
                    <span className="text-xs">Border</span>
                    {/* <input
                      type="color"
                      value={ing.borderColor}
                      onChange={(e) => {
                        const newIngs = [...ingredients];
                        newIngs[index].borderColor = e.target.value;
                        setIngredients(newIngs);
                      }}
                      className="w-10 h-10 rounded-lg cursor-pointer"
                    /> */}
                    <SketchPicker
                      color={ing.borderColor}
                      onChange={(color) => {
                        const newIngs = [...ingredients];
                        newIngs[index].borderColor = color.hex;
                        setIngredients(newIngs);
                      }}
                     className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
                    />
                  </label>
                  <label className="flex items-center gap-2">
                    <span className="text-xs">Text</span>
                    {/* <input
                      type="color"
                      value={ing.textColor}
                      onChange={(e) => {
                        const newIngs = [...ingredients];
                        newIngs[index].textColor = e.target.value;
                        setIngredients(newIngs);
                      }}
                      className="w-10 h-10 rounded-lg cursor-pointer"
                    /> */}
                    <SketchPicker
                      color={ing.textColor}
                      onChange={(color) => {
                        const newIngs = [...ingredients];
                        newIngs[index].textColor = color.hex;
                        setIngredients(newIngs);
                      }}
                     className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
                    />
                  </label>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-stone-600">Amount</p>
                  <label className="flex items-center gap-2">
                    <span className="text-xs">BG</span>
                    {/* <input
                      type="color"
                      value={ing.amountBackgroundColor}
                      onChange={(e) => {
                        const newIngs = [...ingredients];
                        newIngs[index].amountBackgroundColor = e.target.value;
                        setIngredients(newIngs);
                      }}
                      className="w-10 h-10 rounded-lg cursor-pointer"
                    /> */}
                    <SketchPicker
                      color={ing.amountBackgroundColor}
                      onChange={(color) => {
                        const newIngs = [...ingredients];
                        newIngs[index].amountBackgroundColor = color.hex;
                        setIngredients(newIngs);
                      }}
                     className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
                    />
                  </label>
                  <label className="flex items-center gap-2">
                    <span className="text-xs">Border</span>
                    {/* <input
                      type="color"
                      value={ing.amountBorderColor}
                      onChange={(e) => {
                        const newIngs = [...ingredients];
                        newIngs[index].amountBorderColor = e.target.value;
                        setIngredients(newIngs);
                      }}
                      className="w-10 h-10 rounded-lg cursor-pointer"
                    /> */}
                    <SketchPicker
                      color={ing.amountBorderColor}
                      onChange={(color) => {
                        const newIngs = [...ingredients];
                        newIngs[index].amountBorderColor = color.hex;
                        setIngredients(newIngs);
                      }}
                     className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
                    />
                  </label>
                  <label className="flex items-center gap-2">
                    <span className="text-xs">Text</span>
                    {/* <input
                      type="color"
                      value={ing.amountTextColor}
                      onChange={(e) => {
                        const newIngs = [...ingredients];
                        newIngs[index].amountTextColor = e.target.value;
                        setIngredients(newIngs);
                      }}
                      className="w-10 h-10 rounded-lg cursor-pointer"
                    /> */}
                    <SketchPicker
                      color={ing.amountTextColor}
                      onChange={(color) => {
                        const newIngs = [...ingredients];
                        newIngs[index].amountTextColor = color.hex;
                        setIngredients(newIngs);
                      }}
                     className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
                    />
                  </label>
                </div>
                <button
                  onClick={() => {
                    const newIngs = [...ingredients];
                    newIngs[index] = {
                      ...newIngs[index],
                      backgroundColor: '#ffffff',
                      borderColor: '#000000',
                      textColor: '#000000',
                      amountBackgroundColor: '#ffffff',
                      amountBorderColor: '#000000',
                      amountTextColor: '#000000',
                    };
                    setIngredients(newIngs);
                  }}
                  className="text-sm text-red-500 hover:text-red-600 transition-colors"
                >
                  Reset Colors
                </button>
              </div>
            </details>

            {/* Delete Button */}
            <button
              onClick={() => setIngredients(ingredients.filter((_, i) => i !== index))}
              className="flex items-center justify-center w-full sm:w-auto py-2 px-4 text-red-500 bg-red-50/10 rounded-xl hover:bg-red-50/20 transition-colors text-sm font-medium"
            >
              Remove Ingredient
            </button>
          </div>
        </div>
      </div>
    ))}

    <button
      onClick={() => setIngredients([...ingredients, { item: '', amount: '', backgroundColor: '#ffffff', borderColor: '#000000', textColor: '#000000', amountBackgroundColor: '#ffffff', amountBorderColor: '#000000', amountTextColor: '#000000' }])}
      className="w-full sm:w-auto py-3 px-6 flex items-center justify-center gap-2 text-emerald-500 font-medium bg-emerald-50/10 hover:bg-emerald-50/20 rounded-xl transition-colors text-base"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Add Ingredient
    </button>
  </div>
</div>

    {/* Instructions Section */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-stone-800 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Instructions
      </h3>
      <div className="space-y-2">
        {instructions.map((instruction, index) => (
          <div key={index} className="flex items-center gap-2 group">
            <textarea
              value={instruction.step}
              onChange={(e) => {
                const newSteps = [...instructions];
                newSteps[index].step = e.target.value;
                setInstructions(newSteps);
              }}
              className="flex-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              placeholder={`Step ${index + 1}`}
              rows={2}
            />
            <button
              onClick={() => setInstructions(instructions.filter((_, i) => i !== index))}
              className="p-2 text-red-500 rounded-full border border-transparent hover:border-red-500 focus:ring-2 focus:ring-red-500"
            >
              &times;
            </button>
          </div>
        ))}
        <button
          onClick={() => setInstructions([...instructions, { step: '' }])}
          className="flex items-center gap-2 text-emerald-500 font-medium hover:underline"
        >
          + Add Step
        </button>
      </div>
    </div>

    {/* Chef's Tips Section */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-stone-800 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        Chef's Tips
      </h3>
      <div className="space-y-2">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-center gap-2 group">
            <textarea
              value={tip}
              onChange={(e) => {
                const newTips = [...tips];
                newTips[index] = e.target.value;
                setTips(newTips);
              }}
              className="flex-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              placeholder={`Tip ${index + 1}`}
              rows={2}
            />
            <button
              onClick={() => setTips(tips.filter((_, i) => i !== index))}
              className="p-2 text-red-500 rounded-full border border-transparent hover:border-red-500 focus:ring-2 focus:ring-red-500"
            >
              &times;
            </button>
          </div>
        ))}
        <button
          onClick={() => setTips([...tips, ''])}
          className="flex items-center gap-2 text-emerald-500 font-medium hover:underline"
        >
          + Add Tip
        </button>
      </div>
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
        {/* <input
          type="color"
          value={affirmationTextColor}
          onChange={(e) => setAffirmationTextColor(e.target.value)}
          className="w-full h-10 rounded-lg border border-gray-300"
        /> */}
        <SketchPicker
                color={affirmationTextColor}
                onChange={(color) => setAffirmationTextColor(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
        />
      </div>
      <div>
        <label className="block text-gray-900 mb-1 text-sm">
          Card Background Color
        </label>
        {/* <input
          type="color"
          value={cardBackgroundColor}
          onChange={(e) => setCardBackgroundColor(e.target.value)}
          className="w-full h-10 rounded-lg border border-gray-300"
        /> */}
        <SketchPicker
                color={cardBackgroundColor}
                onChange={(color) => setCardBackgroundColor(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
        />
      </div>
    </div>
  </div>
)}

{/* Add Birthday input fields */}
{selectedVariant === 'birthday' && (
        <div className="space-y-6 p-6 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl transition-all">
          {/* Name and Age Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label htmlFor="celebrantName" className="block text-gray-800 text-sm font-medium mb-2">
                Celebrant's Name
              </label>
              <input
                type="text"
                id="celebrantName"
                value={celebrantName}
                onChange={(e) => setCelebrantName(e.target.value)}
                style={{
                  color: celebrantNameColor,
                  background: celebrantNameBackground,
                  borderColor: celebrantNameBorderColor,
                }}
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
                placeholder="Enter name"
              />
              {/* Color Customization */}
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <label className="block text-gray-800 text-sm font-medium">Text Color</label>
                  <SketchPicker
                    color={celebrantNameColor}
                    onChange={(color) => setCelebrantNameColor(color.hex)}
                    className="w-full h-fit mx-auto rounded-xl p-4 cursor-pointer transition-transform duration-200 border border-gray-200"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="block text-gray-800 text-sm font-medium">Border Color</label>
                  <input
                    type="color"
                    value={celebrantNameBorderColor}
                    onChange={(e) => setCelebrantNameBorderColor(e.target.value)}
                    className="w-12 h-8 border rounded-lg"
                    title="Border Color"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="block text-gray-800 text-sm font-medium">Background</label>
                  <input
                    type="text"
                    value={celebrantNameBackground}
                    onChange={(e) => setCelebrantNameBackground(e.target.value)}
                    className="flex-1 p-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                    placeholder="Background (color or gradient)"
                  />
                </div>
              </div>
            </div>
            <div className="relative">
              <label htmlFor="age" className="block text-gray-800 text-sm font-medium mb-2">
                Age
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={{
                  color: ageColor,
                  background: ageBackground,
                  borderColor: ageBorderColor,
                }}
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
                placeholder="Enter age"
              />
              {/* Color Customization */}
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <label className="block text-gray-800 text-sm font-medium">Text Color</label>
                  <input
                    type="color"
                    value={ageColor}
                    onChange={(e) => setAgeColor(e.target.value)}
                    className="w-12 h-8 border rounded-lg"
                    title="Text Color"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="block text-gray-800 text-sm font-medium">Border Color</label>
                  <input
                    type="color"
                    value={ageBorderColor}
                    onChange={(e) => setAgeBorderColor(e.target.value)}
                    className="w-12 h-8 border rounded-lg"
                    title="Border Color"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="block text-gray-800 text-sm font-medium">Background</label>
                  <input
                    type="text"
                    value={ageBackground}
                    onChange={(e) => setAgeBackground(e.target.value)}
                    className="flex-1 p-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                    placeholder="Background (color or gradient)"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Other fields (e.g., date, message) */}
          {['cardDate', 'birthdayDate', 'birthdayMessage', 'daysUntil'].map((field) => (
            <div key={field} className="relative">
              <label
                htmlFor={field}
                className="block text-gray-800 text-sm font-medium mb-2 capitalize"
              >
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field === 'birthdayMessage' ? 'textarea' : field === 'cardDate' || field === 'birthdayDate' ? 'date' : 'text'}
                id={field}
                value={fieldValues[field as keyof typeof fieldValues]}
                onChange={(e) => handleFieldChange(field as keyof FieldValues, e.target.value)}
                style={{
                  color: fieldColors[field as keyof typeof fieldColors].text,
                  background: fieldColors[field as keyof typeof fieldColors].background,
                  borderColor: fieldColors[field as keyof typeof fieldColors].border,
                }}
                className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 transition shadow-sm ${
                  field === 'birthdayMessage' ? 'min-h-[100px]' : ''
                }`}
                placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              />
              {/* Color Customization */}
              <div className="mt-4 flex gap-4">
                <input
                  type="color"
                  value={fieldColors[field as keyof typeof fieldColors].text}
                  onChange={(e) => updateFieldColor(field as keyof FieldColors, 'text', e.target.value)}
                  className="w-12 h-8 border rounded-lg"
                  title="Text Color"
                />
                <input
                  type="color"
                  value={fieldColors[field as keyof typeof fieldColors].border}
                  onChange={(e) => updateFieldColor(field as keyof FieldColors, 'border', e.target.value)}
                  className="w-12 h-8 border rounded-lg"
                  title="Border Color"
                />
                <input
                  type="text"
                  value={fieldColors[field as keyof typeof fieldColors].background}
                  onChange={(e) => updateFieldColor(field as keyof FieldColors, 'background', e.target.value)}
                  className="flex-1 p-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                  placeholder="Background (color or gradient)"
                />
              </div>
            </div>
          ))}
        </div>
      )}






          {/* Base form fields for all variants */}
          <div className="space-y-6">
          {/* <TemplateSelector /> */}


          {/* Product specific fields */}
            {selectedVariant === 'product' && (
              <>
                <div>
                  <label className={baseLabelStyles}>Inner BG Color</label>
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-full h-[45px] backdrop-blur-sm rounded-xl"
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
                  <label className="block text-stone-950 mb-2">Detailed Description</label>
                  <textarea
                    value={largeDescription}
                    onChange={(e) => setLargeDescription(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300"
                    rows={4}
                  />
                </div>
                <div>
  <label className="block text-stone-950 mb-2">Product Image</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProductImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }}
    className="w-full p-2 rounded-lg border border-slate-300"
  />
  {productImage && (
    <div className="mt-4 relative">
      <Image
        src={productImage}
        alt="Product Image"
        width={500}
        height={500}
        className="rounded-lg"
      />
      <button
        onClick={() => setProductImage('')}
        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
      >
        ✕
      </button>
    </div>
  )}
</div>
              </>
            )}


            {/* {(selectedVariant === 'product' || selectedVariant === 'business' ) && (
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
            )} */}

            {/* Business specific fields */}
{selectedVariant === 'business' && (
  <div className='space-y-4 bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg'>
    
    {/* Background Type Selection */}
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-stone-800 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Background Type
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* <div className="">
      <label className={baseLabelStyles}>Inner BG Color</label>
      <input
        type="color"
        value={backgroundColor}
        onChange={(e) => setBackgroundColor(e.target.value)}
        className="w-full h-[45px] backdrop-blur-sm rounded-xl"
      />
    </div> */}
        <div>
          <label className="block text-stone-800 text-sm font-medium mb-2">Background Type</label>
          <select
            value={bgType}
            onChange={(e) => setBgType(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
          >
            <option value="gradient">Gradient</option>
            <option value="solid">Solid Color</option>
          </select>
        </div>
        {bgType === 'gradient' && (
          <>
            <div>
              <label className="block text-stone-800 text-sm font-medium mb-2">Gradient From</label>
              {/* <input
                type="color"
                value={gradientFrom}
                onChange={(e) => setGradientFrom(e.target.value)}
                className="w-full h-10 rounded-lg border border-slate-300"
              /> */}
              <SketchPicker
                color={gradientFrom}
                onChange={(color) => setGradientFrom(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
              />
            </div>
            <div>
              <label className="block text-stone-800 text-sm font-medium mb-2">Gradient Via</label>
              {/* <input
                type="color"
                value={gradientVia}
                onChange={(e) => setGradientVia(e.target.value)}
                className="w-full h-10 rounded-lg border border-slate-300"
              /> */}
              <SketchPicker
                color={gradientVia}
                onChange={(color) => setGradientVia(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
              />
            </div>
            <div>
              <label className="block text-stone-800 text-sm font-medium mb-2">Gradient To</label>
              {/* <input
                type="color"
                value={gradientTo}
                onChange={(e) => setGradientTo(e.target.value)}
                className="w-full h-10 rounded-lg border border-slate-300"
              /> */}
              <SketchPicker
                color={gradientTo}
                onChange={(color) => setGradientTo(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
              />
            </div>
          </>
        )}
        {bgType === 'solid' && (
          <div>
            <label className="block text-stone-800 text-sm font-medium mb-2">Solid Color</label>
            {/* <input
              type="color"
              value={solidColor}
              onChange={(e) => setSolidColor(e.target.value)}
              className="w-full h-10 rounded-lg border border-slate-300"
            /> */}
            <SketchPicker
                color={solidColor}
                onChange={(color) => setSolidColor(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
              />
          </div>
        )}
      </div>
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
      <label className="block text-stone-950 mb-2">Detailed Description</label>
      <textarea
        value={largeDescription}
        onChange={(e) => setLargeDescription(e.target.value)}
        className="w-full p-2 rounded-lg border border-slate-300"
        rows={4}
      />
    </div>
  </div>
)}


            {/* Resume specific fields */}
{selectedVariant === 'resume' && (
  <div className="space-y-4 p-4 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl transition-all">
 
      {/* Background Type Selection */}
  <div className="space-y-4 p-4">
      {/* Background Type Selection */}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Background Type</label>
      <Switch.Group>
        <div className="flex items-center space-x-4">
          <Switch.Label className="mr-2">Solid Color</Switch.Label>
          <Switch
            checked={bgType === 'gradient'}
            onChange={() => setBgType(bgType === 'solid' ? 'gradient' : 'solid')}
            className={`${
              bgType === 'gradient' ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out`}
          >
            <span
              className={`${
                bgType === 'gradient' ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
            />
          </Switch>
          <Switch.Label className="ml-2">Gradient</Switch.Label>
        </div>
      </Switch.Group>
    </div>

    {/* Background Color Picker */}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {bgType === 'solid' ? 'Solid Color' : 'Gradient Colors'}
      </label>
      <button
        type="button"
        onClick={() => setShowColorPicker(!showColorPicker)}
        className="p-2 bg-blue-500 text-white rounded-lg"
      >
        {showColorPicker ? 'Hide Color Picker' : 'Show Color Picker'}
      </button>
      {showColorPicker && (
        <div className="mt-4">
          {bgType === 'solid' ? (
            <SketchPicker
              color={solidColor}
              onChange={(color) => setSolidColor(color.hex)}
            />
          ) : (
            <div className="space-y-6 w-full mx-auto">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">From</label>
                <SketchPicker
                  color={gradientFrom}
                  onChange={(color) => setGradientFrom(color.hex)}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Via</label>
                <SketchPicker
                  color={gradientVia}
                  onChange={(color) => setGradientVia(color.hex)}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">To</label>
                <SketchPicker
                  color={gradientTo}
                  onChange={(color) => setGradientTo(color.hex)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    </div>


     {/* Full Name */}
  <div>
    <label className="block text-gray-800 mb-1 font-medium">Full Name</label>
    <input
      type="text"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your full name"
    />
  </div>

  {/* Job Title */}
  <div>
    <label className="block text-gray-800 mb-1 font-medium">Job Title</label>
    <input
      type="text"
      value={jobTitle}
      onChange={(e) => setJobTitle(e.target.value)}
      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your job title"
    />
  </div>

  {/* Contact Information */}
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div>
      <label className="block text-gray-800 mb-1 font-medium">Email Address</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your email address"
      />
    </div>
    <div>
      <label className="block text-gray-800 mb-1 font-medium">Phone Number</label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your phone number"
      />
    </div>
  </div>

  {/* Location */}
  <div>
    <label className="block text-gray-800 mb-1 font-medium">Location</label>
    <input
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your location"
    />
  </div>

  {/* Skills */}
<div>
  <label className="block text-gray-800 mb-1 font-medium">Skills</label>
  {skills.map((skill, index) => (
    <div key={index} className="flex items-center space-x-2 mb-2">
      <input
        type="text"
        value={skill.value}
        onChange={(e) => updateSkill(index, e.target.value)}
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        placeholder="Enter skill"
      />
      <button
        type="button"
        onClick={() => removeSkill(index)}
        className="p-2 bg-red-500 text-white rounded-lg"
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={addSkill}
    className="p-2 bg-blue-500 text-white rounded-lg"
  >
    Add Skill
  </button>
</div>

  {/* Work Experience */}
  <div>
    <label className="block text-gray-800 mb-1 font-medium">Work Experience</label>
    {workExperience.map((experience, index) => (
      <div key={index} className="space-y-2 mb-4">
        <div>
          <label className="block text-gray-800 mb-1 text-sm">Company Name</label>
          <input
            type="text"
            value={experience.companyName}
            onChange={(e) => updateWorkExperience(index, 'companyName', e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter company name"
          />
        </div>
        <div>
          <label className="block text-gray-800 mb-1 text-sm">Role/Position</label>
          <input
            type="text"
            value={experience.role}
            onChange={(e) => updateWorkExperience(index, 'role', e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your role"
          />
        </div>
        <div>
          <label className="block text-gray-800 mb-1 text-sm">Duration</label>
          <input
            type="text"
            value={experience.duration}
            onChange={(e) => updateWorkExperience(index, 'duration', e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Jan 2022 - Dec 2024"
          />
        </div>
        <button
          type="button"
          onClick={() => removeWorkExperience(index)}
          className="p-2 bg-red-500 text-white rounded-lg"
        >
          Remove
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={addWorkExperience}
      className="p-2 bg-blue-500 text-white rounded-lg"
    >
      Add Work Experience
    </button>
  </div>

  {/* Education */}
<div>
  <label className="block text-gray-800 mb-1 font-medium">Education</label>
  {education.map((edu, index) => (
    <div key={index} className="space-y-2 mb-4">
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Degree</label>
        <input
          type="text"
          value={edu.degree}
          onChange={(e) => updateEducation(index, 'degree', e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your degree"
        />
      </div>
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Institution</label>
        <input
          type="text"
          value={edu.institution}
          onChange={(e) => updateEducation(index, 'institution', e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter institution name"
        />
      </div>
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Graduation Year</label>
        <input
          type="text"
          value={edu.gradYear}
          onChange={(e) => updateEducation(index, 'gradYear', e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter graduation year"
        />
      </div>
      <button
        type="button"
        onClick={() => removeEducation(index)}
        className="p-2 bg-red-500 text-white rounded-lg"
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={addEducation}
    className="p-2 bg-blue-500 text-white rounded-lg"
  >
    Add Education
  </button>
</div>

  {/* Hobbies */}
<div>
  <label className="block text-gray-800 mb-1 font-medium">Hobbies</label>
  {hobbies.map((hobby, index) => (
    <div key={index} className="flex items-center space-x-2 mb-2">
      <input
        type="text"
        value={hobby}
        onChange={(e) => updateHobby({ index, value: e.target.value })}
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        placeholder="Enter hobby"
      />
      <button
        type="button"
        onClick={() => removeHobby(index)}
        className="p-2 bg-red-500 text-white rounded-lg"
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={addHobby}
    className="p-2 bg-blue-500 text-white rounded-lg"
  >
    Add Hobby
  </button>
</div>
</div>
)}


            {/* Event specific fields */}
            {selectedVariant === 'event' && (
              <div className="bg-white/80 rounded-xl md:p-6 p-4">
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
                <div className="space-y-4">
  <label className="block text-lg font-medium text-gray-900">Upload Event Image</label>
  <div className="space-y-2">
                {eventImage && (
                  <div className="relative w-full h-40 bg-gray-200 rounded-xl overflow-hidden shadow-md">
                    <img src={eventImage} alt="Uploaded Hero" className="object-cover w-full h-full" />
                    <button
                      title="Delete Hero Image"
                      onClick={() => seteventImage('')}
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
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        seteventImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  accept="image/*"
                />
              </div>
                </div>
                <div>
                  <label className="block text-stone-950 mb-2">Event Price</label>
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
              </div>
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
    {heroImage && (
      <div className="relative w-full h-40 bg-gray-200 rounded-xl overflow-hidden shadow-md">
        <img src={heroImage} alt="Uploaded Hero" className="object-cover w-full h-full" />
        <button
          title="Delete Hero Image"
          onClick={() => setHeroImage('')}
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
      onChange={(e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setHeroImage(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      }}
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
                  {/* General Price */}
                <div>
                  <label className="block text-stone-950 mb-2">General Price</label>
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
  <div className="space-y-4">
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
  </div>
</div>




{/* Checkbox Example */}
<div className=" bg-white/80 p-3 shadow-md rounded-xl">
      <label className={baseLabelStyles}>Show Sections</label>
        <div className=" border m-4 "/>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showTopPart}
            onChange={(e) => setShowTopPart(e.target.checked)}
            className="form-checkbox text-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
          <span className=" text-slate-700 text-xs">Show Top Section</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showBottomPart}
            onChange={(e) => setShowBottomPart(e.target.checked)}
            className="form-checkbox text-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-slate-700 text-xs">Show Bottom Section</span>
        </label>
        {/* <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showfooterPart}
            onChange={(e) => setshowfooterPart(e.target.checked)}
            className="form-checkbox text-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-slate-700 text-xs">Show App Signature</span>
        </label> */}
      </div>
    </div>

          </div>
        </div>

      {/* Submit Button */}
    <div className="pt-4 space-y-4">
    
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
      <button
        onClick={generatePDF}
        className="
          w-full py-4 px-8
          bg-gradient-to-r from-lime-600 to-green-600
          hover:from-green-700 hover:to-lime-700
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
        Generate PDF
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
    {heroImage ? (
      <Image
        src={heroImage || place} // Set default image
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
        {title || 'Hero Image'}
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
  <div className={`relative p-2 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md bg-white/10`}
    style={{ backgroundColor: `${backgroundColor}dd` }}>
    {/* Glass Background Effects */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5"></div>
    <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
    
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 z-10">
      {/* Left Column: Image + QR */}
      <div className="space-y-2">
        {productImage && (
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <Image
              src={productImage}
              alt="Product Image"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
      </div>

      {/* Right Column: Details */}
      <div className="space-y-2">
        <div className="flex justify-between items-start backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="space-y-4">
            <h3 className="text-4xl font-bold text-stone-950">{title}</h3>
            <p className="text-2xl font-semibold bg-stone-500/20 backdrop-blur-sm text-stone-950/90 px-6 py-2 rounded-full inline-block">
              {formatCurrency(parseFloat(price), currency)}
            </p>
          </div>
          {qrUrl && (
            <div className="bg-white/80 backdrop-blur-xl p-3 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <QRCodeSVG value={qrUrl} size={80} />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <p className="text-lg text-stone-950/90 leading-relaxed backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10">
            {description}
          </p>
          <div className="backdrop-blur-md bg-stone-50/10 p-6 rounded-xl border border-white/10">
            <h4 className="text-xl font-semibold text-stone-950 mb-4">Product Details</h4>
            <p className="text-stone-950/80 whitespace-pre-line">{largeDescription}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


      {/* Business Variant Display Start */}
        <div className= "">

        {/* Business Default Variant */}
        {/* Business Default Variant */}
          {selectedVariant === 'business' && selectedVariantStyle === 'default' && (
      <div
        className="relative p-4 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl"
        style={{
          background: bgType === 'gradient'
            ? `linear-gradient(to bottom right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
            : bgType === 'solid'
            ? solidColor
            : 'none',
        }}
      >
        {/* Background Decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl transition-transform duration-500 transform group-hover:scale-110"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>

        {/* Card Content */}
        <div className="relative z-10">
          {/* Header Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Title and Description */}
            <div className="flex w-full  justify-between items-center">
              <div className="w-1/3">
            {logo && (
                <div className="flex justify-center mt-">
                  <div className="relative w-20 h-20">
                    <Image
                      src={logo}
                      alt="Logo"
                      fill
                      className="rounded-full object-cover border-2 border-white/50 shadow-md"
                    />
                  </div>
                </div>
              )}
              </div>
              <div className=' w-2/3'>
                <h3
                  className="text-2xl md:text-3xl font-bold tracking-tight text-stone-50"
                  style={{ color: titleColor }}
                >
                  {title}
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r from-white/50 to-transparent rounded-full"></div>
                <p
                  className="text-sm md:text-base leading-relaxed text-stone-50/90"
                  style={{ color: titleColor }}
                >
                  {description}
                </p>
              </div>
              

            </div>

            {/* QR Code */}
            {qrUrl && (
              <div className="flex justify-center md:justify-end">
                <div className="bg-white/90 p-4 rounded-2xl shadow-md backdrop-blur-sm transform transition-transform duration-300 group-hover:scale-105">
                  <QRCodeSVG value={qrUrl} size={100} />
                  <p className="text-xs text-center font-medium text-gray-600 mt-2">
                    Scan to connect
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="my-6">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Content Section */}
          <div>
            <p
              className="text-sm md:text-base leading-relaxed text-stone-50/80 whitespace-pre-line"
              style={{ color: titleColor }}
            >
              {largeDescription}
            </p>
          </div>
        </div>
      </div>
          )}


        {/* Business Variant Style 1 */}
        {selectedVariant === 'business' && selectedVariantStyle === 'style1' && (
          <div
            className="relative p-4 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl"
            style={{
              background: bgType === 'gradient'
                ? `linear-gradient(to bottom right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
                : bgType === 'solid'
                ? solidColor
                : 'none',
            }}
          >
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent pointer-events-none"></div>
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl transition-transform duration-500 transform group-hover:scale-110"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>

            {/* Card Content */}
            <div className="relative z-10 space-y-6">
              {/* Header Section */}
              <div className="flex items-center gap-4">
                {/* Logo */}
                {logo && (
                  <div className="w-16 h-16 bg-white/10 p-1 rounded-full shadow-md flex items-center justify-center">
                    <img
                      src={logo}
                      alt="Logo"
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                )}

                {/* Title and Description */}
                <div className="flex-1 space-y-2">
                  <h3
                    className="text-xl md:text-2xl font-bold tracking-tight text-stone-50"
                    style={{ color: titleColor }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm md:text-base leading-relaxed text-stone-50/80"
                    style={{ color: titleColor }}
                  >
                    {description}
                  </p>
                </div>
              </div>

              {/* QR Code */}
              {qrUrl && (
                <div className="flex justify-center">
                  <div className="bg-white/90 p-4 rounded-2xl shadow-md backdrop-blur-sm transition-transform transform group-hover:scale-105 duration-300">
                    <QRCodeSVG value={qrUrl} size={100} />
                    <p className="text-xs text-center font-medium text-gray-600 mt-2">
                      Scan to connect
                    </p>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              {/* Content Section */}
              <div>
                <p
                  className="text-sm md:text-base leading-relaxed text-stone-50/80 whitespace-pre-line"
                  style={{ color: titleColor }}
                >
                  {largeDescription}
                </p>
              </div>
            </div>
          </div>
        )}


        {/* Business Variant Style 2 */}
        {selectedVariant === 'business' && selectedVariantStyle === 'style2' && (
          <div
            className="relative p-4 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl bg-white"
            style={{
              background: bgType === 'gradient'
                ? `linear-gradient(to bottom, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
                : bgType === 'solid'
                ? solidColor
                : '#f8f9fa',
            }}
          >
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200/30 to-transparent pointer-events-none"></div>
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-gray-300/20 rounded-full blur-2xl"></div>

            {/* Card Content */}
            <div className="relative z-10 text-center space-y-4">
              {/* Logo */}
              {logo && (
                <div className="flex justify-center">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-16 h-16 rounded-full border-2 border-gray-300"
                  />
                </div>
              )}

              {/* Title and Description */}
              <h3
                className="text-2xl font-bold text-gray-900 tracking-tight"
                style={{ color: titleColor }}
              >
                {title}
              </h3>
              <p
                className="text-sm text-gray-600"
                style={{ color: titleColor }}
              >
                {description}
              </p>

              {/* Divider */}
              <div className="w-16 mx-auto h-0.5 bg-gray-300"></div>

              {/* Content */}
              <p
                className="text-sm text-gray-800 leading-relaxed whitespace-pre-line"
                style={{ color: titleColor }}
              >
                {largeDescription}
              </p>

              {/* QR Code */}
              {qrUrl && (
                <div className="mt-4 flex p-2 bg-white/90 w-fit mx-auto rounded-xl justify-center">
                  <QRCodeSVG value={qrUrl} size={80} />
                </div>
              )}
            </div>
          </div>
        )}


          {/* Business Variant Style 3 */}
          {selectedVariant === 'business' && selectedVariantStyle === 'style3' && (
            <div
              className="relative p-4 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl"
              style={{
                background: bgType === 'gradient'
                  ? `linear-gradient(to right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
                  : bgType === 'solid'
                  ? solidColor
                  : '#f4f4f5',
              }}
            >
              {/* Background Decorations */}
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-white/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-lg"></div>

              {/* Card Content */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Logo and Basic Info */}
                <div className="space-y-4">
                  {logo && (
                    <div className="flex justify-center">
                      <img
                        src={logo}
                        alt="Logo"
                        className="w-20 h-20 rounded-full border-2 border-gray-200 shadow-md"
                      />
                    </div>
                  )}
                  <h3
                    className="text-xl md:text-2xl font-bold text-gray-900"
                    style={{ color: titleColor }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm text-gray-700"
                    style={{ color: titleColor }}
                  >
                    {description}
                  </p>
                </div>

                {/* QR Code and Large Description */}
                <div className="space-y-6">
                  {qrUrl && (
                    <div className="flex justify-center md:justify-end">
                      <div className="bg-white/90 p-4 rounded-lg shadow-md backdrop-blur-sm transform transition-transform duration-300 group-hover:scale-105">
                        <QRCodeSVG value={qrUrl} size={100} />
                        <p className="text-xs text-center font-medium text-gray-600 mt-2">
                          Scan to Connect
                        </p>
                      </div>
                    </div>
                  )}
                  <p
                    className="text-sm md:text-base leading-relaxed text-gray-800 whitespace-pre-line"
                    style={{ color: titleColor }}
                  >
                    {largeDescription}
                  </p>
                </div>
              </div>
            </div>
          )}



          {/* Business Variant Style 4 */}
          {selectedVariant === 'business' && selectedVariantStyle === 'style4' && (
            <div
              className="relative p-4 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-gray-800 to-gray-900 text-white"
              style={{
                background: bgType === 'gradient'
                  ? `linear-gradient(to bottom, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
                  : bgType === 'solid'
                  ? solidColor
                  : '#f8f9fa',
              }}>
              {/* Floating Decorations */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none"></div>
              <div className="absolute -top-16 -left-16 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

              {/* Card Content */}
              <div className="relative z-10 space-y-6">
                {/* Logo and Title */}
                {logo && (
                  <div className="flex justify-center">
                    <img
                      src={logo}
                      alt="Logo"
                      className="w-20 h-20 rounded-full border-2 border-gray-500 shadow-md"
                    />
                  </div>
                )}
                <h3
                  className="text-2xl font-bold text-center tracking-wide"
                  style={{ color: titleColor }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm text-center"
                  style={{ color: titleColor }}
                >
                  {description}
                </p>

                {/* Divider */}
                <div className="w-16 mx-auto h-0.5 bg-white/20"></div>

                {/* QR Code */}
                {qrUrl && (
                  <div className="flex justify-center">
                    <div className="bg-white/20 p-4 rounded-lg shadow-md">
                      <QRCodeSVG value={qrUrl} size={100} />
                      <p className="text-xs text-center mt-2 text-gray-300">
                        Scan to Connect
                      </p>
                    </div>
                  </div>
                )}

                {/* Large Description */}
                <div className="text-sm md:text-base leading-relaxed text-gray-200 whitespace-pre-line">
                  <p style={{ color: titleColor }}>{largeDescription}</p>
                </div>
              </div>
            </div>
          )}


        </div>
      {/* Business Variant Display Finish */}   



    {/* Flyer Display */}
{/* Flyer Display */}
{selectedVariant === 'flyer' && selectedVariantStyle === 'default' && (
  <div
    className="relative p-2 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
    style={{
      background: bgType === 'gradient'
        ? `linear-gradient(to bottom right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
        : bgType === 'solid'
        ? solidColor
        : '#1a1a1a',
    }}
  >
    {/* Background Image */}
    {backgroundImage && (
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: `url(${typeof backgroundImage === 'string' ? backgroundImage : URL.createObjectURL(backgroundImage)})`,
        }}
      ></div>
    )}

    {/* Decorative Elements */}
    <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
    <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400/20 rounded-full blur-[150px]"></div>
    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-500/20 rounded-full blur-[150px]"></div>

    {/* Flyer Content */}
    <div className="relative z-10 space-y-8 text-center text-white">
      {/* Title */}
      <h3
        className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide"
        style={{ color: titleColor }}
      >
        {title || "Celebrate in Style!"}
      </h3>

      {/* Subheading */}
      <p
        className="text-lg md:text-xl text-white/90"
        style={{ color: titleColor }}
      >
        {description || "An unforgettable evening awaits!"}
      </p>

      {/* Flyer Image */}
      {flyerImage && (
        <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={flyerImage}
            alt="Event Image"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6 rounded-xl bg-black/50 backdrop-blur-lg shadow-md">
        <p
          className="text-base md:text-lg leading-relaxed whitespace-pre-wrap"
          style={{ color: titleColor }}
        >
          {largeDescription ||
            "Join us for live music, entertainment, and memories to last a lifetime!"}
        </p>
      </div>

      {/* QR Code & Price */}
      <div className="flex flex-wrap justify-center gap-4">
        {qrUrl && (
          <div className="bg-white/90 mx-auto p-4 rounded-lg shadow-md backdrop-blur-md">
            <QRCodeSVG value={qrUrl} size={100} />
            <p className="text-xs text-black mt-2 font-medium">
              Scan for Details
            </p>
          </div>
        )}
        {price && !isNaN(parseFloat(price)) && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 shadow-lg text-center">
            <p
              className="text-sm font-medium text-white mb-2"
              style={{ color: titleColor }}
            >
              Admission Fee
            </p>
            <p
              className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
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
              className="rounded-full object-cover border-2 border-white/50 shadow-md"
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
          backgroundImage: `url(${typeof heroImage === 'string' ? heroImage : URL.createObjectURL(heroImage)})`,
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
          <div className="backdrop-blur-lg bg-white/70 p-3 rounded-xl">
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
    className="relative min-h-[600px] p-2 md:p-10 bg-cover bg-center rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl"
    style={{
      background:
        bgType === 'gradient'
          ? `linear-gradient(135deg, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
          : bgType === 'solid'
          ? solidColor
          : "",
    }}
  >
    {/* Enhanced Decorative Elements */}
    {/* <div className="absolute inset-0 z-10  rounded-2xl backdrop-blur-sm" />
    <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-puls" /> */}

    {/* Background Image with Parallax */}
    {heroImage && (
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 transform transition-transform duration-1000 hover:scale-105"
        style={{
          backgroundImage: `url(${typeof heroImage === 'string' ? heroImage : URL.createObjectURL(heroImage)})`,
        }}
      ></div>
    )}

    <div className="relative z-10 flex flex-col items-center gap-10">
      {/* Logo with enhanced animation */}
      {logo && (
        <div className="transform hover:scale-110 transition-all duration-500 hover:rotate-3">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white/40 shadow-2xl overflow-hidden backdrop-blur-sm">
            <img
              src={typeof logo === 'string' ? logo : URL.createObjectURL(logo)}
              alt="Event Logo"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>
      )}

      {/* Event Name with enhanced styling */}
      {eventName && (
        <div className="w-full max-w-2xl transform hover:-translate-y-2 transition-all duration-500">
          <div className="p-4 bg-white/40 backdrop-blur-xl  rounded-2xl border border-white/20 shadow-2xl hover:bg-white/15">
            <h3 
              className="text-4xl md:text-6xl font-bold text-center whitespace-pre-line tracking-tight drop-shadow-lg" 
              style={{ color: textColors.eventName }}
            >
              {eventName}
            </h3>
          </div>
        </div>
      )}

      {/* Event Details with improved layout */}
      <div className="space-y-4 text-center max-w-xl backdrop-blur-sm p-4 rounded-2xl bg-white/40">
        {eventDate && (
          <p 
            className="text-2xl md:text-3xl font-light drop-shadow-lg"
            style={{ color: textColors.eventDate }}
          >
            Date: {eventDate}
          </p>
        )}
        {eventTime && (
          <p 
            className="text-xl md:text-2xl drop-shadow-lg"
            style={{ color: textColors.eventTime }}
          >
            Time: {eventTime}
          </p>
        )}
        {eventLocation && (
          <p 
            className="text-xl md:text-2xl italic drop-shadow-lg"
            style={{ color: textColors.eventLocation }}
          >
            Location: {eventLocation} 😊
          </p>
        )}
      </div>

      {/* Invitee and Inviter Names with enhanced styling */}
      <div className="space-y-4 text-center max-w-xl bg-white/40 backdrop-blur-sm p-4 rounded-2xl">
        {inviteeName && (
          <p 
            className="text-xl md:text-2xl drop-shadow-lg"
            style={{ color: textColors.inviteeName }}
          >
            Dear {inviteeName},
          </p>
        )}
        {inviterName && (
          <p 
            className="text-xl md:text-2xl drop-shadow-lg"
            style={{ color: textColors.inviterName }}
          >
            You are cordially invited by {inviterName}
          </p>
        )}
        {occasion && (
          <p 
            className="text-xl md:text-2xl drop-shadow-lg"
            style={{ color: textColors.occasion }}
          >
            to the occasion of {occasion}
          </p>
        )}
      </div>

      {/* Description with improved container */}
      {description && (
        <div className="w-full max-w-2xl">
          <div className="p-4 bg-white/40 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/15 transition-colors duration-300">
            <p 
              className="text-lg md:text-xl text-center whitespace-pre-wrap leading-relaxed drop-shadow-lg"
              style={{ color: textColors.description }}
            >
              {description}
            </p>
          </div>
        </div>
      )}

      {/* Enhanced QR Code section */}
      {qrUrl && (
        <div className="mt-auto w-full max-w-xs">
          <div className="p-6 bg-white/65 backdrop-blur-xl rounded-2xl border border-white/20 flex flex-col items-center gap-4 hover:bg-white/20 transition-colors duration-300">
            <QRCodeSVG 
              value={qrUrl} 
              size={150}
              className="rounded-xl shadow-lg p-2 bg-white"
            />
            <p 
              className="text-sm font-medium tracking-wider uppercase drop-shadow-lg"
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
  <div 
    className="relative p-4 md:p-6 rounded-2xl rounded-b-none shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl"
    style={{
      background: bgType === 'gradient'
        ? `linear-gradient(to bottom right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
        : bgType === 'solid'
        ? solidColor
        : 'none',
    }}
  >
    <div className="relative z-10 grid gap-8 md:grid-cols-[2fr,1fr]">
      {/* Left Column - Main Content */}
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center md:text-left space-y-4 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight" style={{ color: textColors.title }}>
            {title || 'Recipe Name'}
          </h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-white/90" style={{ color: textColors.details }}>
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
              </svg>
              {cookingTime} mins
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
              Serves {servings}
            </span>
          </div>
        </div>

        {/* Description Section */}
        {description && (
          <div className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-colors duration-300" style={{ backgroundColor: innerCardColor }}>
            <h3 className="text-2xl font-semibold mb-6" style={{ color: textColors.sectionTitle }}>Description</h3>
            <p className="text-white/90" style={{ color: textColors.description }}>
              {description}
            </p>
          </div>
        )}

        {/* Ingredients Section Display */}
          <div className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-colors duration-300" style={{ backgroundColor: innerCardColor }}>
            <h3 className="text-2xl font-semibold mb-6" style={{ color: textColors.sectionTitle }}>Ingredients</h3>
            <ul className="space-y-3">
              {ingredients.map((ing, idx) => (
                <li key={idx} className="flex w-full justify-between items-center p-2 hover:bg-white/5 rounded-lg transition-colors" style={{ backgroundColor: ing.backgroundColor, borderColor: ing.borderColor, color: ing.textColor }}>
                  <span className="font-medium">{ing.item}</span>
                  <span className=" rounded-full text-sm" style={{ backgroundColor: ing.amountBackgroundColor, borderColor: ing.amountBorderColor, color: ing.amountTextColor }}>{ing.amount}</span>
                </li>
              ))}
            </ul>
          </div>

        {/* Instructions Section */}
        <div className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-colors duration-300" style={{ backgroundColor: innerCardColor }}>
          <h3 className="text-2xl font-semibold mb-6" style={{ color: textColors.sectionTitle }}>Instructions</h3>
          <ol className="space-y-4" style={{ color: textColors.instructions }}>
            {instructions.map((inst, idx) => (
              <li key={idx} className="flex gap-4 p-2 hover:bg-white/5 rounded-lg transition-colors">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white/20 rounded-full">
                  {idx + 1}
                </span>
                <span>{inst.step}</span>
              </li>
            ))}
          </ol>
        </div>

        

      </div>

      {/* Right Column - Image, Difficulty */}
      <div className="space-y-8">
        {heroImage && (
          <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
            <Image 
              src={heroImage} 
              alt={title} 
              width={400} 
              height={500} 
              className="w-full h-[300px] object-cover hover:scale-110 transition-transform duration-700" 
            />
          </div>
        )}
        <div className="p-6 bg-white/15 backdrop-blur-xl rounded-2xl border border-white/20" style={{ backgroundColor: innerCardColor }}>
          <div className="text-center space-y-4">
            <span className={`px-4 py-2 rounded-xl text-sm font-medium inline-block ${getDifficultyColor(difficulty)}`}>
              {difficulty.toUpperCase()}
            </span>
          </div>
        </div>
        {logo && (
          <div className="flex justify-center">
            <div className="relative w-20 h-20 transform hover:scale-110 transition-transform duration-300">
              <Image 
                src={typeof logo === 'string' ? logo : URL.createObjectURL(logo)} 
                alt="Logo" 
                fill 
                className="rounded-full object-cover border-2 border-white/50 shadow-lg" 
              />
            </div>
          </div>
        )}
        {/* Chef's Tips */}
        {/* Chef's Tips */}
        {chefTips && chefTips.length > 0 && (
              <div className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-4" style={{ color: textColors.sectionTitle }}>Chef's Tips</h3>
                <ul className="space-y-4" style={{ color: textColors.chefTips }}>
                  {chefTips.map((tip, index) => (
                    <li key={index} className="text-white/90 italic text-sm leading-relaxed">
                      💡 {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
      </div>
    </div>
  </div>
)}


{selectedVariant === 'resume' && (
  <div
    className="relative min-h-[600px] p-6 md:p-10 bg-white/90 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl"
    style={{
      background:
        bgType === 'gradient'
          ? `linear-gradient(135deg, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
          : bgType === 'solid'
          ? solidColor
          : "#f9f9f9",
    }}
  >
    <div className="relative z-10 flex flex-col items-center gap-8 text-center">
      {/* Profile Picture */}
      {profilePicture && (
        <div className="transform hover:scale-110 transition-all duration-500">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg overflow-hidden">
            <img
              src={typeof profilePicture === 'string' ? profilePicture : URL.createObjectURL(profilePicture)}
              alt="Profile Picture"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Full Name and Job Title */}
      <div>
        {fullName && (
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: textColors.fullName }}
          >
            {fullName}
          </h2>
        )}
        {jobTitle && (
          <p
            className="text-xl md:text-2xl font-light mt-1"
            style={{ color: textColors.jobTitle }}
          >
            {jobTitle}
          </p>
        )}
      </div>

      {/* Contact Information */}
      <div className="space-y-2 text-sm md:text-base">
        {email && (
          <p className="flex items-center justify-center gap-2">
            <span className="font-medium">Email:</span>
            <a
              href={`mailto:${email}`}
              className="underline hover:text-blue-500 transition-colors"
              style={{ color: textColors.email }}
            >
              {email}
            </a>
          </p>
        )}
        {phone && (
          <p className="flex items-center justify-center gap-2">
            <span className="font-medium">Phone:</span>
            <span style={{ color: textColors.phone }}>{phone}</span>
          </p>
        )}
        {location && (
          <p className="flex items-center justify-center gap-2">
            <span className="font-medium">Location:</span>
            <span style={{ color: textColors.location }}>{location}</span>
          </p>
        )}
      </div>

      {/* Skills */}
{skills.length > 0 && (
  <div className="w-full max-w-2xl">
    <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.skills }}>
      Skills
    </h3>
    <ul className="flex flex-wrap justify-center gap-2 text-sm md:text-base">
      {skills.map((skill, index) => (
        <li
          key={index}
          className="px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full shadow-md"
          style={{ color: textColors.skills }}
        >
          {skill.value.trim()}
        </li>
      ))}
    </ul>
  </div>
)}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="w-full max-w-2xl text-left space-y-4">
          <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.workExperience }}>
            Work Experience
          </h3>
          {workExperience.map((experience, index) => (
            <div key={index} className="space-y-2 bg-white/80 p-4 rounded-xl shadow-lg">
              <p className="font-medium text-base md:text-lg" style={{ color: textColors.companyName }}>
                {experience.companyName}
              </p>
              <p className="text-sm md:text-base italic" style={{ color: textColors.role }}>
                {experience.role}
              </p>
              <p className="text-sm md:text-base" style={{ color: textColors.duration }}>
                {experience.duration}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
{education.length > 0 && (
  <div className="w-full max-w-2xl text-left space-y-4">
    <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.education }}>
      Education
    </h3>
    {education.map((edu, index) => (
      <div key={index} className="space-y-2 bg-white/80 p-4 rounded-xl shadow-lg">
        <p className="font-medium text-base md:text-lg" style={{ color: textColors.degree }}>
          {edu.degree}
        </p>
        <p className="text-sm md:text-base italic" style={{ color: textColors.institution }}>
          {edu.institution}
        </p>
        <p className="text-sm md:text-base" style={{ color: textColors.gradYear }}>
          {edu.gradYear}
        </p>
      </div>
    ))}
  </div>
)}

      {/* Hobbies */}
      {hobbies.length > 0 && (
  <div className="w-full max-w-2xl text-left space-y-4">
    <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.hobbies }}>
      Hobbies
    </h3>
    <div className="space-y-2 bg-white/80 p-4 rounded-xl shadow-lg">
      <p className="text-sm md:text-base" style={{ color: textColors.hobbies }}>
        {hobbies.join(', ')}
      </p>
    </div>
  </div>
)}
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


    {/* Add Birthday card display */}
    {selectedVariant === "birthday" && (
        <div className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-6 md:p-10 rounded-2xl shadow-xl overflow-hidden animate-gradient-x">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-[url('/confetti.png')] opacity-20 animate-spin-slow"></div>
          <div className="absolute -top-28 -right-28 w-[20rem] h-[20rem] md:w-[28rem] md:h-[28rem] bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-28 -left-28 w-[20rem] h-[20rem] md:w-[28rem] md:h-[28rem] bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          <div className="relative z-10 space-y-8 sm:space-y-10">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white drop-shadow-lg mb-4 animate-bounce-slow">
                {wishType || "Happy Birthday!"}
              </h2>
              <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-300 drop-shadow-lg mb-4 animate-fade-in">
                {celebrantName || "Dear Friend"}
              </p>
              {age && (
                <p className="text-lg sm:text-2xl md:text-3xl text-white/90 drop-shadow-lg">
                  on your {age}
                  <sup>th</sup> Birthday!
                </p>
              )}
            </div>

            {/* Main Image */}
            {image && (
              <div className="relative mx-auto w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full overflow-hidden border-[6px] border-white/60 shadow-2xl hover:scale-105 transition-transform duration-300">
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
              <p className="text-sm sm:text-lg text-white/80">Your next birthday is in:</p>
              <p className="text-3xl sm:text-4xl font-bold text-white tracking-wide">
                {calculateDaysUntilBirthday(cardDate, birthdayDate)}
              </p>
            </div>

            {/* Message */}
            <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 shadow-lg">
              <p className="text-lg sm:text-xl md:text-2xl text-white text-center font-medium leading-relaxed tracking-wide">
                {message ||
                  "Wishing you a day filled with love, joy, laughter, and amazing memories. You are cherished beyond words!"}
              </p>
            </div>

            {/* Social Media Share */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
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
            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 space-y-4 sm:space-y-0">
              <div className="flex items-center gap-4">
                {logo && (
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 hover:scale-110 transition-transform duration-300">
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
              <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm shadow-md text-center">
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

    {/* Event Related Display */}  
    <div className="  ">
    {/* Event Variant Default Style  */}
      {selectedVariant === 'event' && selectedVariantStyle === 'default' && (
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

    {/* Event Variant Style 1 - Elegant Design */}
      {selectedVariant === 'event' && selectedVariantStyle === 'style1' && (
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              <div className="space-y-4 w-full sm:w-2/3">
                <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full text-sm font-medium text-white">
                  🎉 Event Ticket
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight">{title}</h3>
                <div className="space-y-3">
                  <p className="flex items-center text-white/90 text-base sm:text-lg">
                    <span className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-xl rounded-xl mr-3">📅</span>
                    {new Date(eventDate).toLocaleString()}
                  </p>
                  <p className="flex items-center text-white/90 text-base sm:text-lg">
                    <span className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-xl rounded-xl mr-3">📍</span>
                    {eventLocation}
                  </p>
                  {price && (
                    <p className="flex items-center text-white/90 text-base sm:text-lg">
                      <span className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-xl rounded-xl mr-3">💰</span>
                      {formatCurrency(parseFloat(price), currency)}
                    </p>
                  )}
                </div>
              </div>
              {qrUrl && (
                <div className="w-full sm:w-auto">
                  <div className="bg-white/95 p-4 rounded-2xl shadow-lg backdrop-blur-xl transform transition hover:scale-105">
                    <QRCodeSVG value={qrUrl} size={100} />
                    <p className="text-xs text-center font-medium text-purple-900 mt-2">Scan to verify</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8 bg-white/10 backdrop-blur-xl p-6 rounded-2xl">
              <h4 className="text-xl font-semibold text-white mb-4">Event Details</h4>
              <p className="text-white/90 whitespace-pre-line">{description}</p>
              {largeDescription && (
                <div className="mt-4 pt-4 border-t border-white/10 text-white/80 whitespace-pre-line">{largeDescription}</div>
              )}
            </div>
          </div>
        </div>
      )}

    {/* Event Variant Style 2 - Modern Dark Theme */}
      {selectedVariant === 'event' && selectedVariantStyle === 'style2' && (
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-xl rounded-full text-xs font-medium text-white/80">
                {new Date(eventDate).toLocaleString()}
              </span>
              <h3 className="text-4xl sm:text-5xl font-bold text-white bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                {title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl">
                  <span className="block text-white/60 text-sm mb-1">Date & Time</span>
                  <p className="text-white font-medium">{new Date(eventDate).toLocaleString()}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl">
                  <span className="block text-white/60 text-sm mb-1">Location</span>
                  <p className="text-white font-medium">{eventLocation}</p>
                </div>
                {price && (
                  <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl">
                    <span className="block text-white/60 text-sm mb-1">Price</span>
                    <p className="text-white font-medium">{formatCurrency(parseFloat(price), currency)}</p>
                  </div>
                )}
              </div>
              {qrUrl && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition"></div>
                  <div className="relative bg-black p-4 rounded-xl">
                    <QRCodeSVG value={qrUrl} size={120} />
                    <p className="text-xs font-medium text-white/60 mt-2">Scan for verification</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8 relative">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="pt-8 space-y-4">
                <h4 className="text-xl font-semibold text-white/90">Event Details</h4>
                <p className="text-white/70 whitespace-pre-line leading-relaxed">{description}</p>
                {largeDescription && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-white/60 whitespace-pre-line leading-relaxed">{largeDescription}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Variant Style 3 - Modern Dark Theme */}
      {selectedVariant === 'event' && selectedVariantStyle === 'style3' && (
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
          <div className="relative p-2 sm:p-4">
            <div className="flex flex-col items-center text-center space-y-6">
            {eventImage && (
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <Image
              src={eventImage}
              alt="Product Image"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
              <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-xl rounded-full text-xs font-medium text-white/80">
                {new Date(eventDate).toLocaleString()}
              </span>
              <h3 className="text-4xl sm:text-5xl font-bold text-white bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                {title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl">
                  <span className="block text-white/60 text-sm mb-1">Date & Time</span>
                  <p className="text-white font-medium">{new Date(eventDate).toLocaleString()}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl">
                  <span className="block text-white/60 text-sm mb-1">Location</span>
                  <p className="text-white font-medium">{eventLocation}</p>
                </div>
                {price && (
                  <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl">
                    <span className="block text-white/60 text-sm mb-1">Price</span>
                    <p className="text-white font-medium">{formatCurrency(parseFloat(price), currency)}</p>
                  </div>
                )}
              </div>
              {qrUrl && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition"></div>
                  <div className="relative bg-white p-4 rounded-xl">
                    <QRCodeSVG value={qrUrl} size={120} />
                    <p className="text-xs font-medium text-black/60 mt-2">Scan for verification</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8 relative">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="pt-8 space-y-4">
                <h4 className="text-xl font-semibold text-white/90">Event Details</h4>
                <p className="text-white/70 whitespace-pre-line leading-relaxed">{description}</p>
                {largeDescription && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-white/60 whitespace-pre-line leading-relaxed">{largeDescription}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>

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
              {showfooterPart && (

          <div className="mt-2 flex justify-end">
          <div className="text-xs rounded-t-none w-full text-center rounded-b-2xl px-1 py-2 rounded-md bg-slate-800/40 text-stone-50"  style={{backgroundColor: footerCardColor, color: footerColor,}}>
          Powered by KardifyMe
          </div>
          </div>
          )}
      </div>
        
          )}
          
        </motion.div>
      </div>
    </div>
  );
};

export default CreateCard;
