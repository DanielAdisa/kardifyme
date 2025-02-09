"use client";
import { useState, useRef, useEffect, useCallback } from 'react';

interface AcademicQualification {
  qualification: string;
  date: string;
}


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
import { ClockIcon, CalendarIcon, GlobeAltIcon, SunIcon, MapPinIcon, CurrencyDollarIcon, TagIcon, CheckCircleIcon } from '@heroicons/react/24/outline';


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
  type: string; // Add this line
  expenses: { id: string; name: string; amount: number }[];
}

interface Event {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  location: string;
}

interface Day {
  events: Event[];
}

interface TimetableState {
  days: Record<string, Day>;
}


const setTimetableState = (newState: TimetableState) => {
  // Your state update logic here
};

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
  timetable: {
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
  pricelist: {
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


const timeZoneOptions = [
  { value: 'UTC', label: 'UTC' },
  { value: 'GMT', label: 'GMT' },
  { value: 'CST', label: 'CST' },
  { value: 'EST', label: 'EST' },
  // Add more time zones as needed
];

interface Day {
  id: string;
  date: string;
  events: Event[];
}

interface Event {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  location: string;
}

interface Event {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  location: string;
}

interface Day {
  id: string;
  date: string;
  events: Event[];
}

interface TimetableState {
  startDate: string;
  endDate: string;
  timeZone: string;
  days: Record<string, Day>;
}

interface Event {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  location: string;
}

interface Day {
  events: Event[];
}

interface Qualification {
  qualification: string;
  date: string;
}

interface Qualification {
  qualification: string;
  date: string;
}

interface AcademicQualification {
  qualification: string;
  date: string;
}

// Helper function to generate unique IDs
const generateUniqueId = (): string => `id_${Math.random().toString(36).substr(2, 9)}`;

const CreateCard = () => {
  

  const [pricelistState, setPricelistState] = useState<PricelistState>({
    currency: 'USD',
    tiers: [
      {
        id: generateUniqueId(),
        name: 'Basic',
        price: 10,
        billingInterval: 'monthly',
        description: 'For small businesses',
        discount: '',
        features: [
          { id: generateUniqueId(), text: '10 GB Storage' },
          { id: generateUniqueId(), text: '2 Users' },
        ],
        recommended: false,
      },
      {
        id: generateUniqueId(),
        name: 'Pro',
        price: 25,
        billingInterval: 'monthly',
        description: 'For growing teams',
        discount: '',
        features: [
          { id: generateUniqueId(), text: '50 GB Storage' },
          { id: generateUniqueId(), text: '10 Users' },
        ],
        recommended: true,
      },
    ],
    enableCalculator: false,
    calculatorLabel: 'Get Estimate',
    calculatorNote: 'Prices are subject to change.',
  });

  // Function to update a tier property
  const updateTier = (tierIndex: number, key: keyof Tier, value: any) => {
    const updatedTiers = pricelistState.tiers.map((tier, index) =>
      index === tierIndex ? { ...tier, [key]: value } : tier
    );
    setPricelistState({ ...pricelistState, tiers: updatedTiers });
  };

  // Function to add a new feature to a tier
  const addFeature = (tierIndex: number) => {
    const updatedTiers = pricelistState.tiers.map((tier, index) =>
      index === tierIndex
        ? {
            ...tier,
            features: [...tier.features, { id: generateUniqueId(), text: '' }],
          }
        : tier
    );
    setPricelistState({ ...pricelistState, tiers: updatedTiers });
  };

  // Function to remove a feature from a tier
  const removeFeature = (tierIndex: number, featureIndex: number) => {
    const updatedTiers = pricelistState.tiers.map((tier, index) =>
      index === tierIndex
        ? {
            ...tier,
            features: tier.features.filter((_, idx) => idx !== featureIndex),
          }
        : tier
    );
    setPricelistState({ ...pricelistState, tiers: updatedTiers });
  };

  // Function to add a new pricing tier
  const addNewTier = () => {
    const newTier: Tier = {
      id: generateUniqueId(),
      name: '',
      price: 0,
      billingInterval: 'monthly',
      description: '',
      discount: '',
      features: [],
      recommended: false,
    };
    setPricelistState({
      ...pricelistState,
      tiers: [...pricelistState.tiers, newTier],
    });
  };

  // Function to remove a pricing tier
  const removeTier = (tierIndex: number) => {
    const updatedTiers = pricelistState.tiers.filter((_, index) => index !== tierIndex);
    setPricelistState({ ...pricelistState, tiers: updatedTiers });
  };

  const [scheduleType, setScheduleType] = useState<string>('daily');
  const [timetableState, setTimetableState] = useState<TimetableState>({
    startDate: '',
    endDate: '',
    timeZone: '',
    days: {},
  });
  const [bio, setBio] = useState('');
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
  const [isMobile, setIsMobile] = useState(false);
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
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
  const [isLoading1, setIsLoading1] = useState(false);
  
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
  type VariantType = 'business' | 'event' | 'product' | 'invoice' | 'receipt' | 'einvoice' | 'flyer' | 'recipe' | 'contract' | 'birthday' | 'budget' | 'idCard' | 'mood' | 'affirmations'| 'menu' | 'brand' | 'invitation' | 'resume' | 'timetable' | 'pricelist';
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


const [workExperience, setWorkExperience] = useState([{ companyName: '', role: '', duration: '', jobDescriptions: [''] }]);




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
const [birthdayMessage, setbirthdayMessage] = useState('');
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
  setIsLoading1(true);
  
  try {
    const content = cardRef.current;
    const { width, height } = content.getBoundingClientRect();
    
    // Increase quality with higher DPI
    const scale = 4; // Increase resolution
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    
    const imgData = await domtoimage.toPng(content, {
      width: scaledWidth,
      height: scaledHeight,
      quality: 100,
      style: {
        transform: `scale(${scale})`,
        'transform-origin': 'top left',
        '-webkit-font-smoothing': 'antialiased',
        'text-rendering': 'geometricPrecision'
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
    setIsLoading1(false);
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

// Convert time to pixels (5px per minute)
const timeToPixels = (timeString: string) => {
  const [hours, minutes] = timeString.split(':');
  return (parseInt(hours) * 60 + parseInt(minutes)) / 5;
};

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

type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'NGN' | 'GHC';

interface Feature {
  id: string;
  text: string;
}

interface Tier {
  id: string;
  name: string;
  price: number;
  billingInterval: 'monthly' | 'annual' | 'one-time';
  description: string;
  discount: string;
  features: Feature[];
  recommended: boolean;
}

interface PricelistState {
  currency: Currency;
  tiers: Tier[];
  enableCalculator: boolean;
  calculatorLabel: string;
  calculatorNote: string;
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
  timetable: '#ffffff',
  pricelist: '#ffffff',
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
  timetable: 'minimal',
  pricelist: 'minimal',
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
  timetable: ['modern', 'classic', 'minimal'],
  pricelist: ['modern', 'classic', 'minimal'],
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
    }, 5000);

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

// Format time to AM/PM
const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
};

// Calculate duration between times
const calculateDuration = (start: string, end: string) => {
  const [startHours, startMinutes] = start.split(':').map(Number);
  const [endHours, endMinutes] = end.split(':').map(Number);
  
  const totalMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return `${hours}h ${minutes}m`;
};

const calculateDurationPercentage = (start: string, end: string) => {
  const startMinutes = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
  const endMinutes = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]);
  const totalMinutes = endMinutes - startMinutes;
  
  // Assuming 16-hour day (8am to 12am)
  const maxMinutes = 16 * 60;
  return Math.min((totalMinutes / maxMinutes) * 100, 100);
};


  const [timeZone, setTimeZone] = useState("");


  const timeZoneOptions = [
    { label: "UTC", value: "UTC" },
    { label: "GMT+1", value: "GMT+1" },
    { label: "GMT-5", value: "GMT-5" },
  ];

  const handleAddDay = () => {
    const newDays = {
      ...timetableState.days,
      [crypto.randomUUID()]: {
        id: crypto.randomUUID(),
        date: new Date().toISOString().split("T")[0],
        events: [],
      },
    };
    setTimetableState({ ...timetableState, days: newDays });
  };

  interface Event {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    location: string;
  }

  interface Day {
    id: string;
    date: string;
    events: Event[];
  }

  const handleAddEvent = (dayOfWeek: string): void => {
    const newDays: { [key: string]: Day } = { ...timetableState.days };
    if (!newDays[dayOfWeek]) {
      newDays[dayOfWeek] = {
        id: crypto.randomUUID(),
        date: new Date().toISOString().split("T")[0],
        events: [],
      };
    }
    newDays[dayOfWeek].events.push({
      id: crypto.randomUUID(),
      name: "",
      startTime: "09:00",
      endTime: "10:00",
      location: "",
    });
    const newDaysObject: { [key: string]: Day } = Object.values(newDays).reduce((acc, day) => {
      acc[day.id] = day;
      return acc;
    }, {} as { [key: string]: Day });
    setTimetableState({ ...timetableState, days: newDaysObject });
  };

  interface Event {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    location: string;
  }

  interface Day {
    id: string;
    date: string;
    events: Event[];
  }

  const handleRemoveEvent = (dayOfWeek: string, eventIndex: number): void => {
    const newDays: { [key: string]: Day } = { ...timetableState.days };
    if (!newDays[dayOfWeek]) return;
    newDays[dayOfWeek].events = newDays[dayOfWeek].events.filter(
      (_, i) => i !== eventIndex
    );
    const newDaysObject: { [key: string]: Day } = Object.values(newDays).reduce((acc, day) => {
      acc[day.id] = day;
      return acc;
    }, {} as { [key: string]: Day });
    setTimetableState({ ...timetableState, days: newDaysObject });
  };

  interface Event {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    location: string;
  }

  interface Day {
    id: string;
    date: string;
    events: Event[];
  }

  const handleUpdateEvent = (
    dayOfWeek: string,
    eventIndex: number,
    field: keyof Event,
    value: string
  ): void => {
    const newDays: { [key: string]: Day } = { ...timetableState.days };
    if (!newDays[dayOfWeek]) return;
    newDays[dayOfWeek].events[eventIndex][field] = value;
    const newDaysObject: { [key: string]: Day } = Object.values(newDays).reduce((acc, day) => {
      acc[day.id] = day;
      return acc;
    }, {} as { [key: string]: Day });
    setTimetableState({ ...timetableState, days: newDaysObject });
  };



const [dateOfBirth, setDateOfBirth] = useState('');
const [placeOfBirth, setPlaceOfBirth] = useState('');
const [sex, setSex] = useState('');
const [maritalStatus, setMaritalStatus] = useState('');
interface Child {
  name: string;
  age: string;
}

const [children, setChildren] = useState<Child[]>([]);
const [townStateOrigin, setTownStateOrigin] = useState('');
const [nationality, setNationality] = useState('');
const [currentPostalAddress, setCurrentPostalAddress] = useState('');

const [permanentHomeAddress, setPermanentHomeAddress] = useState('');



const [gsmNumber, setGsmNumber] = useState('');
const [presentEmployment, setPresentEmployment] = useState({ employer: '', status: '', salary: '' });
const [extraCurriculumActivities, setExtraCurriculumActivities] = useState<string[]>([]);
interface Referee {
  name: string;
  address: string;
  gsmNumber: string;
}

const [referees, setReferees] = useState<Referee[]>([]);

// Example functions for managing dynamic fields
const addChild = () => {
  setChildren([...children, { name: '', age: '' }]);
};

interface Child {
  name: string;
  age: string;
}

const updateChild = (index: number, field: keyof Child, value: string): void => {
  const newChildren: Child[] = [...children];
  newChildren[index][field] = value;
  setChildren(newChildren);
};

interface Child {
  name: string;
  age: string;
}

const removeChild = (index: number): void => {
  const newChildren: Child[] = children.filter((_, i) => i !== index);
  setChildren(newChildren);
};

  interface Day {
    id: string;
    date: string;
    events: Event[];
  }

  type DayField = keyof Day;

  const handleUpdateDay = (dayId: string, field: keyof Omit<Day, 'events'>, value: string): void => {
    const newDays: { [key: string]: Day } = { ...timetableState.days };
    if (!newDays[dayId]) return;
    newDays[dayId] = {
      ...newDays[dayId],
      [field]: value
    };
    const newDaysObject: { [key: string]: Day } = Object.values(newDays).reduce((acc, day) => {
      acc[day.id] = day;
      return acc;
    }, {} as { [key: string]: Day });
    setTimetableState({ ...timetableState, days: newDaysObject });
  };

  interface Day {
    id: string;
    date: string;
    events: Event[];
  }

  interface TimetableState {
    startDate: string;
    endDate: string;
    timeZone: string;
    days: { [key: string]: Day };
  }

  // Add a new extra-curricular activity
const addExtraCurriculumActivity = () => {
  setExtraCurriculumActivities([...extraCurriculumActivities, '']);
};

// Update an extra-curricular activity
interface ExtraCurriculumActivityUpdateParams {
  index: number;
  value: string;
}

const updateExtraCurriculumActivity = ({ index, value }: ExtraCurriculumActivityUpdateParams): void => {
  const newActivities = [...extraCurriculumActivities];
  newActivities[index] = value;
  setExtraCurriculumActivities(newActivities);
};

// Remove an extra-curricular activity
interface ExtraCurriculumActivityUpdateParams {
  index: number;
  value: string;
}

const removeExtraCurriculumActivity = (index: number): void => {
  const newActivities = extraCurriculumActivities.filter((_, i) => i !== index);
  setExtraCurriculumActivities(newActivities);
};

// Add a new referee entry
const addReferee = () => {
  setReferees([
    ...referees,
    {
      name: '',
      address: '',
      gsmNumber: '',
    },
  ]);
};

// Update a specific field in a referee entry
interface Referee {
  name: string;
  address: string;
  gsmNumber: string;
}

const updateReferee = (index: number, field: keyof Referee, value: string): void => {
  const newReferees: Referee[] = [...referees];
  newReferees[index][field] = value;
  setReferees(newReferees);
};

// Remove a referee entry
interface Referee {
  name: string;
  address: string;
  gsmNumber: string;
}

const removeReferee = (index: number): void => {
  const newReferees: Referee[] = referees.filter((_, i) => i !== index);
  setReferees(newReferees);
};

interface AcademicQualification {
  degree: string;
  institution: string;
  gradYear: string;
}

const [academicQualifications, setAcademicQualifications] = useState<AcademicQualification[]>([]);
const updateAcademicQualification = (index: number, field: keyof AcademicQualification, value: string) => {
  const updatedQualifications = [...academicQualifications];
  updatedQualifications[index][field] = value;
  setAcademicQualifications(updatedQualifications);
};


// Update present employment details
interface PresentEmployment {
  employer: string;
  status: string;
  salary: string;
}

const updatePresentEmployment = (field: keyof PresentEmployment, value: string): void => {
  setPresentEmployment({
    ...presentEmployment,
    [field]: value,
  });
};



  const handleRemoveDay = (dayId: string): void => {
    const newDays: { [key: string]: Day } = Object.keys(timetableState.days)
      .filter((id: string) => id !== dayId)
      .reduce((acc: { [key: string]: Day }, id: string) => {
        acc[id] = timetableState.days[id];
        return acc;
      }, {});
    setTimetableState({ ...timetableState, days: newDays });
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
      // setBio(parsedState.bio ||'');
      setWorkExperience(parsedState.workExperience || [{ companyName: '', role: '', duration: '',jobDescriptions: [''] }]);
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
      // bio,
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
    // bio,
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
      timetable: '#ffffff',
      pricelist: '#ffffff',

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
      timetable: 'minimal',
      pricelist: 'minimal'
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

  const addWorkExperience = () => setWorkExperience([...workExperience, { companyName: '', role: '', duration: '',jobDescriptions: [''] }]);
  interface WorkExperience {
    companyName: string;
    role: string;
    duration: string;
    jobDescriptions: string[];
  }

  const removeWorkExperience = (index: number): void => 
    setWorkExperience(workExperience.filter((_: WorkExperience, i: number) => i !== index));
  interface WorkExperienceField {
    companyName: string;
    role: string;
    duration: string;
    jobDescriptions: string[];
  }

  const updateWorkExperience = (
    index: number, 
    field: keyof WorkExperienceField, 
    value: string | string[]
  ): void => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index][field] = value as string & string[];
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

  interface WorkExperience {
    companyName: string;
    role: string;
    duration: string;
    jobDescriptions: string[];
  }

  const addJobDescription = (index: number): void => {
    const newWorkExperience: WorkExperience[] = [...workExperience];
    newWorkExperience[index].jobDescriptions.push('');
    setWorkExperience(newWorkExperience);
  };
  
  interface WorkExperience {
    companyName: string;
    role: string;
    duration: string;
    jobDescriptions: string[];
  }

  const removeJobDescription = (expIndex: number, descIndex: number): void => {
    const newWorkExperience: WorkExperience[] = [...workExperience];
    newWorkExperience[expIndex].jobDescriptions.splice(descIndex, 1);
    setWorkExperience(newWorkExperience);
  };
  
  interface WorkExperience {
    companyName: string;
    role: string;
    duration: string;
    jobDescriptions: string[];
  }

  const updateJobDescription = (expIndex: number, descIndex: number, value: string): void => {
    const newWorkExperience: WorkExperience[] = [...workExperience];
    newWorkExperience[expIndex].jobDescriptions[descIndex] = value;
    setWorkExperience(newWorkExperience);
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





  function generateTimeSlots(startTime: string, endTime: string): string[] {
    const slots: string[] = [];
    let current = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    while (current < end) {
      slots.push(current.toTimeString().slice(0, 5));
      current.setMinutes(current.getMinutes() + 30); // Increment by 30 minutes
    }

    return slots;
  }

  function updateFeature(tierIndex: number, featureIndex: number, value: string): void {
    const updatedTiers = pricelistState.tiers.map((tier, tIndex) => {
      if (tIndex === tierIndex) {
        const updatedFeatures = tier.features.map((feature, fIndex) => {
          if (fIndex === featureIndex) {
            return { ...feature, text: value };
          }
          return feature;
        });
        return { ...tier, features: updatedFeatures };
      }
      return tier;
    });
    setPricelistState({ ...pricelistState, tiers: updatedTiers });
  }

  return (
    <div className="flex w-full md flex-col-reverse md:flex-row bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 h-screen justify-center items-center p-3">




      {/* input fields */}
      {isMobile ? <div className="  md:w-1/3 md:h-full w-full h-2/6 flex flex-col space-y-4 overflow-y-auto overflow-x-hidden border-r border-gray-200 p-4">
      <h1 className="md:text-4xl text-xl font-bold mb-8 text-center bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
    Create Your Card
  </h1>
        {/* input fields */}
        <div className="space-y-4">
          {/* Other Inputs */}

          
{/* Checkbox Example */}
<div className=" bg-white/80 p-3 shadow-md rounded-xl">
      {/* <input 
        value={cardState.title}
        onChange={e => updateCardState({ title: e.target.value })}
        title="Enter card title"
        placeholder="Card Title"
      /> */}
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
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showfooterPart}
            onChange={(e) => setshowfooterPart(e.target.checked)}
            className="form-checkbox text-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-slate-700 text-xs">Show App Signature</span>
        </label>
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
        <option value="timetable">💬 Time Table</option>
        <option value="pricelist">💬 Price List</option>
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
    <div className="space-y-2  w-full p-4 mx-auto rounded-2xl border border-gray-100 shadow-sm">
      <label className="block font-medium text-gray-700">
        Card Color
        <span className="ml-2 text-sm text-gray-400">Customize appearance</span>
      </label>
      <div className="relative group">
        {isMobile ? <input
            type="color"
            value={cardColor[selectedVariant]}
            onChange={(e) => setCardColor({ ...cardColor, [selectedVariant]: e.target.value })}
            title="Select card color"
            placeholder="Card Color"
            className="w-full h-12 rounded-xl cursor-pointer transition-transform duration-200 
                 hover:scale-[1.02] focus:scale-[1.02] border border-gray-200"
          /> : <SketchPicker
            color={cardColor[selectedVariant]}
            onChange={(color) => setCardColor({ ...cardColor, [selectedVariant]: color.hex })}
            className="w-full h-fit p-4 cursor-pointer transition-transform duration-200 
                     "
          /> }
        <div title="Select card color">
          
        </div>
        <div className="absolute inset-0 rounded-xl ring-2 ring-gray-200 pointer-events-none 
                      transition-opacity opacity-0 group-hover:opacity-100" />
      </div>
    </div>

    {/* Template Selector */}
    <div className="space-y-2  p-4 rounded-2xl border border-gray-100 shadow-sm">
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
        className="w-full p-3 text-gray-700  rounded-xl border border-gray-200 
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
  <div className="space-y-2  p-4 rounded-2xl border border-gray-100 shadow-sm">
    <label className="block font-medium text-gray-700">
      Text Color
      <span className="ml-2 w-full text-sm text-gray-400">Set font color</span>
    </label>
    <div className="relative group">
      {isMobile ? <input
            type="color"
            value={titleColor}
            onChange={(e) => setTitleColor(e.target.value)}
            className="w-full h-12 rounded-xl cursor-pointer transition-transform duration-200 
                 hover:scale-[1.02] focus:scale-[1.02] border border-gray-200"
          /> : <SketchPicker
          color={titleColor}
          onChange={(color) => setTitleColor(color.hex)}
          className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                    border border-gray-200"
        /> }     
    </div>

    <label className="block font-medium text-gray-700">
      Footer Text Color Picker
      <span className="ml-2 text-sm text-gray-400">Set footer font color</span>
    </label>
    <div className="relative group">
      { isMobile ? <input
        type="color"
        value={footerColor}
        onChange={(e) => setFooterColor(e.target.value)}
        className="w-full h-12 rounded-xl cursor-pointer transition-transform duration-200 
                 hover:scale-[1.02] focus:scale-[1.02] border border-gray-200"
      /> : <SketchPicker
      color={footerColor}
      onChange={(color) => setFooterColor(color.hex)}
      className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                border border-gray-200"
    /> }
    
      
      
    </div>

    <label className="block font-medium text-gray-700">
    Footer Card Color Picker
          <span className="ml-2 text-sm text-gray-400">Set Footer Color</span>
    </label>
      <div className="relative group">
        {isMobile  ? <input
            type="color"
            value={footerCardColor}
            onChange={(e) => setfooterCardColor(e.target.value)}
            className="w-full h-12 rounded-xl cursor-pointer transition-transform duration-200 
                 hover:scale-[1.02] focus:scale-[1.02] border border-gray-200"
          /> : <SketchPicker
          color={footerCardColor}
          onChange={(color) => setfooterCardColor(color.hex)}
          className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                    border border-gray-200"
        /> }
          
          
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
              { isMobile ?
              <input
                type="color"
                value={gradientFrom}
                onChange={(e) => setGradientFrom(e.target.value)}
                className="w-full h-10 rounded-lg border border-slate-300"
              />
              :
              <SketchPicker
                color={gradientFrom}
                onChange={(color) => setGradientFrom(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 
                          border border-gray-200"
              />
              }
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
  <div className="space-y-6 bg-white  p-4">
    {/* Title, Month & Year, Currency */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-stone-950 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded-lg border border-slate-300"
          placeholder="Enter a title"
        />
      </div>
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Month & Year</label>
        <input
          type="month"
          value={budgetState.monthYear}
          onChange={(e) =>
            setBudgetState({ ...budgetState, monthYear: e.target.value })
          }
          className="w-full p-3 rounded-xl border border-slate-300"
        />
      </div>
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Currency</label>
        <select
          value={budgetState.currency}
          onChange={(e) =>
            setBudgetState({ ...budgetState, currency: e.target.value })
          }
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

    {/* Total Budget */}
    <div>
      <label className="block text-stone-950 mb-2 font-medium">Total Budget</label>
      <input
        type="number"
        value={budgetState.totalBudget}
        onChange={(e) =>
          setBudgetState({
            ...budgetState,
            totalBudget: parseFloat(e.target.value),
          })
        }
        className="w-full p-3 rounded-xl border border-slate-300"
        placeholder="Enter total budget"
      />
    </div>

    {/* Budget Categories */}
<div className="space-y-4">
  <label className="block text-stone-950 mb-2 font-medium">Budget Categories</label>
  {budgetState.categories.map((category, index) => (
    <div key={category.id} className="space-y-4">
      {/* Category Details */}
      <div className="flex flex-col md:flex-row gap-2 items-stretch">
        <input
          type="text"
          value={category.name}
          onChange={(e) => {
            const newCategories = [...budgetState.categories];
            newCategories[index].name = e.target.value;
            setBudgetState({ ...budgetState, categories: newCategories });
          }}
          className="w-full p-3 rounded-xl border border-slate-300"
          placeholder="Category name"
        />
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="number"
            value={category.amount}
            onChange={(e) => {
              const newCategories = [...budgetState.categories];
              newCategories[index].amount = parseFloat(e.target.value);
              setBudgetState({ ...budgetState, categories: newCategories });
            }}
            className="w-full p-3 rounded-xl border border-slate-300"
            placeholder="Amount"
          />
          <select
            value={category.type}
            onChange={(e) => {
              const newCategories = [...budgetState.categories];
              newCategories[index].type = e.target.value;
              setBudgetState({ ...budgetState, categories: newCategories });
            }}
            className="w-full p-3 rounded-xl border border-slate-300"
          >
            <option value="amount">Amount</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>
        <button
          onClick={() => {
            const newCategories = budgetState.categories.filter((_, i) => i !== index);
            setBudgetState({ ...budgetState, categories: newCategories });
          }}
          className="p-3 text-red-500 hover:bg-red-50 rounded-xl flex justify-center items-center w-full md:w-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Expenses */}
      <div className="pl-4 md:pl-8 space-y-2">
        {category.expenses.map((expense, expIndex) => (
          <div key={expense.id} className="flex flex-col md:flex-row gap-2 items-stretch">
            <input
              type="text"
              value={expense.name}
              onChange={(e) => {
                const newCategories = [...budgetState.categories];
                newCategories[index].expenses[expIndex].name = e.target.value;
                setBudgetState({ ...budgetState, categories: newCategories });
              }}
              className="w-full p-3 rounded-xl border border-slate-300"
              placeholder="Expense name"
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={expense.amount}
                onChange={(e) => {
                  const newCategories = [...budgetState.categories];
                  newCategories[index].expenses[expIndex].amount = parseFloat(e.target.value);
                  setBudgetState({ ...budgetState, categories: newCategories });
                }}
                className="w-full p-3 rounded-xl border border-slate-300"
                placeholder="Amount"
              />
              <button
                onClick={() => {
                  const newCategories = [...budgetState.categories];
                  newCategories[index].expenses = newCategories[index].expenses.filter((_, i) => i !== expIndex);
                  setBudgetState({ ...budgetState, categories: newCategories });
                }}
                className="p-3 text-red-500 hover:bg-red-50 rounded-xl flex justify-center items-center w-full md:w-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            const newCategories = [...budgetState.categories];
            newCategories[index].expenses.push({
              id: crypto.randomUUID(),
              name: '',
              amount: 0,
            });
            setBudgetState({ ...budgetState, categories: newCategories });
          }}
          className="w-full p-3 text-blue-600 hover:bg-blue-50 rounded-xl border border-blue-200"
        >
          Add Expense
        </button>
      </div>
    </div>
  ))}

  {/* Add Category Button */}
  <button
    onClick={() => {
      setBudgetState({
        ...budgetState,
        categories: [
          ...budgetState.categories,
          {
            id: crypto.randomUUID(),
            name: '',
            amount: 0,
            type: 'amount',
            expenses: [],
          },
        ],
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
  <div className="space-y-8 p-4 flex bg-white/70 backdrop-blur-md rounded-xl border border-white/10">
    {/* Background Type Selection */}
    <div className="space-y-6 flex flex">
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
            <div className="col-span-full">
              <label className=" text-stone-800 text-sm font-medium mb-2">Gradient From</label>
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

{selectedVariant === 'birthday' && (
  <div className="space-y-6 p-6 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl transition-all">
    {/* Name and Age Fields */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="celebrantName" className="block text-gray-800 text-sm font-medium mb-2">
          Celebrant's Name
        </label>
        <input
          type="text"
          id="celebrantName"
          value={celebrantName}
          onChange={(e) => setCelebrantName(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
          placeholder="Enter name"
        />
      </div>
      <div>
        <label htmlFor="age" className="block text-gray-800 text-sm font-medium mb-2">
          Age
        </label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
          placeholder="Enter age"
        />
      </div>
    </div>

    {/* Date Fields */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="cardDate" className="block text-gray-800 text-sm font-medium mb-2">
          Card Date
        </label>
        <input
          type="date"
          id="cardDate"
          value={fieldValues.cardDate}
          onChange={(e) => handleFieldChange('cardDate', e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="birthdayDate" className="block text-gray-800 text-sm font-medium mb-2">
          Birthday Date
        </label>
        <input
          type="date"
          id="birthdayDate"
          value={fieldValues.birthdayDate}
          onChange={(e) => handleFieldChange('birthdayDate', e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
        />
      </div>
    </div>

    {/* Message Field */}
    <div>
      <label htmlFor="birthdayMessage" className="block text-gray-800 text-sm font-medium mb-2">
        Birthday Message
      </label>
      <textarea
        id="birthdayMessage"
        value={fieldValues.birthdayMessage}
        onChange={(e) => handleFieldChange('birthdayMessage', e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm min-h-[100px]"
        placeholder="Enter birthday message"
      />
    </div>

    {/* Days Until Field */}
    <div>
      <label htmlFor="daysUntil" className="block text-gray-800 text-sm font-medium mb-2">
        Days Until Birthday
      </label>
      <input
        type="number"
        id="daysUntil"
        value={fieldValues.daysUntil}
        onChange={(e) => handleFieldChange('daysUntil', e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
        placeholder="Enter days until birthday"
      />
    </div>

    {/* Background Type Selection */}
    <div>
      <label className="block text-gray-800 text-sm font-medium mb-2">Background Type</label>
      <select
        value={bgType}
        onChange={(e) => setBgType(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
      >
        <option value="gradient">Gradient</option>
        <option value="solid">Solid Color</option>
        <option value="image">Image</option>
      </select>
    </div>

    {/* Gradient or Solid Color Inputs */}
    {bgType === 'gradient' && (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <label className="block text-gray-800 text-sm font-medium">Gradient From</label>
          <input
            type="color"
            value={gradientFrom}
            onChange={(e) => setGradientFrom(e.target.value)}
            className="w-12 h-8 border rounded-lg"
            title="Gradient From"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="block text-gray-800 text-sm font-medium">Gradient Via</label>
          <input
            type="color"
            value={gradientVia}
            onChange={(e) => setGradientVia(e.target.value)}
            className="w-12 h-8 border rounded-lg"
            title="Gradient Via"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="block text-gray-800 text-sm font-medium">Gradient To</label>
          <input
            type="color"
            value={gradientTo}
            onChange={(e) => setGradientTo(e.target.value)}
            className="w-12 h-8 border rounded-lg"
            title="Gradient To"
          />
        </div>
      </div>
    )}
    {bgType === 'solid' && (
      <div className="flex items-center gap-2">
        <label className="block text-gray-800 text-sm font-medium">Solid Color</label>
        <input
          type="color"
          value={solidColor}
          onChange={(e) => setSolidColor(e.target.value)}
          className="w-12 h-8 border rounded-lg"
          title="Solid Color"
        />
      </div>
    )}
    {bgType === 'image' && (
      <div className="relative">
        <label className="block text-gray-800 text-sm font-medium mb-2">Upload Background Image</label>
        <input
          type="file"
          accept="image/*"
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
          className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500"
        />
        {backgroundImage && (
          <div className="mt-2 flex items-center">
            <img
              src={backgroundImage}
              alt="Background"
              className="w-20 h-20 rounded-lg mr-2"
            />
            <button
              onClick={() => setBackgroundImage('')}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
            >
              X
            </button>
          </div>
        )}
      </div>
    )}

    {/* Logo Upload */}
    <div className="relative">
      <label className="block text-gray-800 text-sm font-medium mb-2">Upload Logo</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setLogo(reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        }}
        className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500"
      />
      {logo && (
        <div className="mt-2 flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 rounded-lg mr-2"
          />
          <button
            onClick={() => setLogo('')}
            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
          >
            X
          </button>
        </div>
      )}
    </div>

    {/* Flyer Image Upload */}
    <div className="relative">
      <label className="block text-gray-800 text-sm font-medium mb-2">Upload Flyer Image</label>
      <input
        type="file"
        accept="image/*"
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
        className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500"
      />
      {flyerImage && (
        <div className="mt-2 flex items-center">
          <img
            src={flyerImage}
            alt="Flyer"
            className="w-20 h-20 rounded-lg mr-2"
          />
          <button
            onClick={() => setflyerImage('')}
            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
          >
            X
          </button>
        </div>
      )}
    </div>

    {/* QR Code URL Input */}
    <div>
      <label htmlFor="qrUrl" className="block text-gray-800 text-sm font-medium mb-2">
        QR Code URL
      </label>
      <input
        type="text"
        id="qrUrl"
        value={qrUrl}
        onChange={(e) => setQrUrl(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
        placeholder="Enter URL for QR code"
      />
    </div>

    {/* Price Input */}
    <div className="flex space-x-4">
      <div>
        <label htmlFor="price" className="block text-gray-800 text-sm font-medium mb-2">
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
          placeholder="Enter price"
        />
      </div>
      <div>
        <label htmlFor="currency" className="block text-gray-800 text-sm font-medium mb-2">
          Currency
        </label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
        >
          {currencyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
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
{selectedVariant === 'resume' &&  (
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

  <div>
  <label className="block text-gray-800 mb-1 font-medium">Bio</label>
  <textarea
    value={bio}
    onChange={(e) => setBio(e.target.value)}
    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
    placeholder="Enter a short bio about yourself"
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
  {/* Work Experience */}
<div>
  <label className="block text-gray-800 mb-1 font-medium">Work Experience</label>
  {workExperience.map((experience, expIndex) => (
    <div key={expIndex} className="space-y-2 mb-4">
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Company Name</label>
        <input
          type="text"
          value={experience.companyName}
          onChange={(e) => updateWorkExperience(expIndex, 'companyName', e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter company name"
        />
      </div>
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Role/Position</label>
        <input
          type="text"
          value={experience.role}
          onChange={(e) => updateWorkExperience(expIndex, 'role', e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your role"
        />
      </div>
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Duration</label>
        <input
          type="text"
          value={experience.duration}
          onChange={(e) => updateWorkExperience(expIndex, 'duration', e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Jan 2022 - Dec 2024"
        />
      </div>
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Job Descriptions</label>
        {experience.jobDescriptions.map((desc, descIndex) => (
          <div key={descIndex} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={desc}
              onChange={(e) => updateJobDescription(expIndex, descIndex, e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter job description"
            />
            <button
              type="button"
              onClick={() => removeJobDescription(expIndex, descIndex)}
              className="p-2 bg-red-500 text-white rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addJobDescription(expIndex)}
          className="p-2 bg-blue-500 text-white rounded-lg"
        >
          Add Job Description
        </button>
      </div>
      <button
        type="button"
        onClick={() => removeWorkExperience(expIndex)}
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

{selectedVariant === 'pricelist' && (
  <div className="space-y-6">
  {/* Pricelist Header */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-stone-950 mb-2 font-medium">Pricelist Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded-lg border border-slate-300"
        placeholder="e.g., Consulting Services Pricing"
      />
    </div>
    <div>
      <label className="block text-stone-950 mb-2 font-medium">Base Currency</label>
      <select
        value={pricelistState.currency}
        onChange={(e) =>
          setPricelistState({ ...pricelistState, currency: e.target.value as Currency })
        }
        className="w-full p-2 rounded-lg border border-slate-300"
      >
        {(['USD', 'EUR', 'GBP', 'INR'] as Currency[]).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Pricing Tiers */}
  <div className="space-y-4">
    <label className="block text-stone-950 mb-2 font-medium">Pricing Tiers</label>
    {pricelistState.tiers.map((tier, tierIndex) => (
      <div
        key={tier.id}
        className="border p-4 rounded-xl bg-white shadow-sm space-y-4"
      >
        {/* Tier Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={tier.name}
            onChange={(e) => updateTier(tierIndex, 'name', e.target.value)}
            className="p-2 rounded-lg border border-slate-300 w-full"
            placeholder="Tier Name (e.g., Premium)"
          />
          <input
            type="number"
            value={tier.price}
            onChange={(e) => updateTier(tierIndex, 'price', Number(e.target.value))}
            className="p-2 rounded-lg border border-slate-300 w-full"
            placeholder="Price"
          />
          <select
            value={tier.billingInterval}
            onChange={(e) =>
              updateTier(tierIndex, 'billingInterval', e.target.value as Tier['billingInterval'])
            }
            className="p-2 rounded-lg border border-slate-300 w-full"
          >
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
            <option value="one-time">One-time</option>
          </select>
        </div>

        {/* Tier Features */}
        <div className="pl-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={tier.description}
              onChange={(e) => updateTier(tierIndex, 'description', e.target.value)}
              className="p-2 rounded-lg border border-slate-300 w-full"
              placeholder="Short description"
            />
            <input
              type="text"
              value={tier.discount}
              onChange={(e) => updateTier(tierIndex, 'discount', e.target.value)}
              className="p-2 rounded-lg border border-slate-300 w-full"
              placeholder="Discount/Promo (e.g., '10% OFF')"
            />
          </div>
          <div className="space-y-2">
            <label className="text-stone-700 font-medium">Features</label>
            {tier.features.map((feature, featureIndex) => (
              <div
                key={feature.id}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={feature.text}
                  onChange={(e) => updateFeature(tierIndex, featureIndex, e.target.value)}
                  className="p-2 rounded-lg border border-slate-300 flex-1"
                  placeholder="Feature description"
                />
                <button
                  onClick={() => removeFeature(tierIndex, featureIndex)}
                  className="text-red-500 hover:bg-red-50 p-1 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addFeature(tierIndex)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
            >
              Add Feature
            </button>
          </div>
        </div>

        {/* Tier Footer */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={tier.recommended}
              onChange={(e) => updateTier(tierIndex, 'recommended', e.target.checked)}
              className="rounded border-slate-300"
            />
            <label className="text-stone-700">Mark as Recommended</label>
          </div>
          <button
            onClick={() => removeTier(tierIndex)}
            className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
          >
            Remove Tier
          </button>
        </div>
      </div>
    ))}

    {/* Add New Tier Button */}
    <button
      onClick={addNewTier}
      className="w-full p-3 text-blue-600 hover:bg-blue-50 rounded-xl border border-blue-200"
    >
      Add New Tier
    </button>
  </div>

  {/* Advanced Options */}
  <div className="border-t pt-4">
    <div className="flex items-center gap-2 mb-4">
      <input
        type="checkbox"
        checked={pricelistState.enableCalculator}
        onChange={(e) =>
          setPricelistState({
            ...pricelistState,
            enableCalculator: e.target.checked,
          })
        }
        className="rounded border-slate-300"
      />
      <label className="text-stone-700 font-medium">
        Enable Price Calculator Widget
      </label>
    </div>

    {pricelistState.enableCalculator && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={pricelistState.calculatorLabel}
          onChange={(e) =>
            setPricelistState({
              ...pricelistState,
              calculatorLabel: e.target.value,
            })
          }
          className="p-2 rounded-lg border border-slate-300 w-full"
          placeholder="Calculator button label (e.g., 'Get Estimate')"
        />
        <input
          type="text"
          value={pricelistState.calculatorNote}
          onChange={(e) =>
            setPricelistState({
              ...pricelistState,
              calculatorNote: e.target.value,
            })
          }
          className="p-2 rounded-lg border border-slate-300 w-full"
          placeholder="Calculator disclaimer note"
        />
      </div>
    )}
  </div>
</div>
)}


{selectedVariant === "timetable" && (
  <div className="space-y-4 p-4 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl transition-all">
          <h2>Title</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-lg border border-slate-300"
            placeholder="Enter timetable title"
          />
          <h2>Time Zone</h2>
          <select
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-300"
          >
            {timeZoneOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
       
      

      {/* Schedule Type Selector */}
      <h2>Schedule Type</h2>
      <select
        value={scheduleType}
        onChange={(e) => setScheduleType(e.target.value)}
        className="w-full p-3 rounded-xl border border-slate-300"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="permanent">Permanent</option>
      </select>

      {/* Fixed Weekly/Permanent Schedule */}
    {(scheduleType === 'weekly' || scheduleType === 'permanent') && (
      <div className="space-y-4">
        <label className="block text-stone-950 mb-2 font-medium">Schedule Days</label>
        <div className="space-y-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((dayOfWeek) => (
            <div key={dayOfWeek} className="border p-4 rounded-xl space-y-4">
              <h3 className="text-lg font-medium">{dayOfWeek}</h3>
              <div className="pl-8 space-y-4">
                {(timetableState.days[dayOfWeek]?.events || []).map((event: Event, eventIndex: number) => (
                  <div key={event.id} className="flex flex-col md:flex-col w-full gap-4 items-start">
                    {/* Event Name Input */}
                    <input
                      type="text"
                      value={event.name}
                      onChange={(e) => {
                        const newDays = { ...timetableState.days };
                        newDays[dayOfWeek].events[eventIndex].name = e.target.value;
                        setTimetableState({ ...timetableState, days: newDays });
                      }}
                      className="p-2 rounded-lg border w-full border-slate-300 flex-1"
                      placeholder="Event name"
                    />
                    {/* Start Time Input */}
                    <input
                      type="time"
                      value={event.startTime}
                      onChange={(e) => {
                        const newDays = { ...timetableState.days };
                        newDays[dayOfWeek].events[eventIndex].startTime = e.target.value;
                        setTimetableState({ ...timetableState, days: newDays });
                      }}
                      className="p-2 rounded-lg border w-full border-slate-300"
                    />
                    {/* End Time Input */}
                    <input
                      type="time"
                      value={event.endTime}
                      onChange={(e) => {
                        const newDays = { ...timetableState.days };
                        newDays[dayOfWeek].events[eventIndex].endTime = e.target.value;
                        setTimetableState({ ...timetableState, days: newDays });
                      }}
                      className="p-2 rounded-lg border w-full border-slate-300"
                    />
                    {/* Location Input */}
                    <input
                      type="text"
                      value={event.location}
                      onChange={(e) => {
                        const newDays = { ...timetableState.days };
                        newDays[dayOfWeek].events[eventIndex].location = e.target.value;
                        setTimetableState({ ...timetableState, days: newDays });
                      }}
                      className="p-2 rounded-lg border w-full border-slate-300"
                      placeholder="Location"
                    />
                    {/* Remove Event Button */}
                    <button
                      onClick={() => {
                        const newDays = { ...timetableState.days };
                        newDays[dayOfWeek].events = newDays[dayOfWeek].events.filter((_, i) => i !== eventIndex);
                        setTimetableState({ ...timetableState, days: newDays });
                      }}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {/* Add Event Button - Fixed */}
                <button
                  onClick={() => {
                    const newDays = { ...timetableState.days };
                    if (!newDays[dayOfWeek]) {
                      newDays[dayOfWeek] = {
                        id: dayOfWeek, // Use day name as ID for consistency
                        date: '', // Consider removing date for permanent schedules
                        events: []
                      };
                    }
                    newDays[dayOfWeek].events.push({
                      id: crypto.randomUUID(),
                      name: '',
                      startTime: '09:00',
                      endTime: '10:00',
                      location: ''
                    });
                    setTimetableState({ ...timetableState, days: newDays });
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
                >
                  Add Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

      {/* Daily or Monthly Schedule */}
      {(scheduleType === "daily" || scheduleType === "monthly") && (
        <div>
          <h2>Schedule Days</h2>
          {Object.values(timetableState.days).map((day, dayIndex) => (
            <div key={day.id}>
              <input
                type="date"
                value={day.date}
                onChange={(e) => handleUpdateDay(day.id, "date", e.target.value)}
                className="p-2 w-full rounded-lg border border-slate-300"
              />
              <button
                onClick={() => handleRemoveDay(day.id)}
                className="text-red-500 w-full hover:bg-red-50 p-2 rounded-lg"
              >
                Remove Day
              </button>
              {day.events.map((event, eventIndex) => (
                <div key={event.id}>
                  <input
                    type="text"
                    value={event.name}
                    onChange={(e) =>
                      handleUpdateEvent(day.id, eventIndex, "name", e.target.value)
                    }
                    className="p-2 rounded-lg border w-full border-slate-300 flex-"
                    placeholder="Event name"
                  />
                  <input
                    type="text"
                    value={event.startTime}
                    onChange={(e) =>
                      handleUpdateEvent(day.id, eventIndex, "startTime", e.target.value)
                    }
                    className="p-2 rounded-lg border w-full border-slate-300"
                  />
                  <input
                    type="text"
                    value={event.endTime}
                    onChange={(e) =>
                      handleUpdateEvent(day.id, eventIndex, "endTime", e.target.value)
                    }
                    className="p-2 rounded-lg w-full border border-slate-300"
                  />
                  <input
                    type="text"
                    value={event.location}
                    onChange={(e) =>
                      handleUpdateEvent(day.id, eventIndex, "location", e.target.value)
                    }
                    className="p-2 rounded-lg border w-full border-slate-300"
                    placeholder="Location"
                  />
                  <button
                    onClick={() => handleRemoveEvent(day.id, eventIndex)}
                    className="text-red-500 w-full hover:bg-red-50 p-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleAddEvent(day.id)}
                className="p-2 text-blue-600 w-full hover:bg-blue-50 rounded-lg border border-blue-200"
              >
                Add Event
              </button>
            </div>
          ))}
          <button
            onClick={handleAddDay}
            className="w-full p-3 text-blue-600 hover:bg-blue-50 rounded-xl border border-blue-200"
          >
            Add Day
          </button>
        </div>
      )}
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
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showfooterPart}
            onChange={(e) => setshowfooterPart(e.target.checked)}
            className="form-checkbox text-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-slate-700 text-xs">Show App Signature</span>
        </label>
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
        disabled={isLoading1}
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
      {isLoading1 ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generating...
          </span>
        ) : (
          'Generate PDF'
        )}
      </button>
    </div>

        
      </div> : <div className="  md:w-1/3 md:h-full w-full h-1/3 overflow-y-auto overflow-x-hidden border-r border-gray-200 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
    Create Your Card
  </h1>
        {/* input fields */}
        <div className="space-y-4">
          {/* Other Inputs */}

          
{/* Checkbox Example */}
<div className=" bg-white/80 p-3 shadow-md rounded-xl">
      {/* <input 
        value={cardState.title}
        onChange={e => updateCardState({ title: e.target.value })}
        title="Enter card title"
        placeholder="Card Title"
      /> */}
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
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showfooterPart}
            onChange={(e) => setshowfooterPart(e.target.checked)}
            className="form-checkbox text-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-slate-700 text-xs">Show App Signature</span>
        </label>
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
        <option value="timetable">💬 Time Table</option>
        <option value="pricelist"> PriceList</option>
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
      title="Select card style"
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
  <div className="space-y-8 bg-white/90 p-6 rounded-2xl shadow-xl">
    {/* Background Type Selection */}
    <section className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
        <svg className="w-5 h-5 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-stone-800">Background Type</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <SketchPicker
                color={gradientFrom}
                onChange={(color) => setGradientFrom(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 border border-gray-200"
              />
            </div>
            <div>
              <label className="block text-stone-800 text-sm font-medium mb-2">Gradient Via</label>
              <SketchPicker
                color={gradientVia}
                onChange={(color) => setGradientVia(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 border border-gray-200"
              />
            </div>
            <div>
              <label className="block text-stone-800 text-sm font-medium mb-2">Gradient To</label>
              <SketchPicker
                color={gradientTo}
                onChange={(color) => setGradientTo(color.hex)}
                className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 border border-gray-200"
              />
            </div>
          </>
        )}
        {bgType === 'solid' && (
          <div>
            <label className="block text-stone-800 text-sm font-medium mb-2">Solid Color</label>
            <SketchPicker
              color={solidColor}
              onChange={(color) => setSolidColor(color.hex)}
              className="w-full h-fit mx-auto rounded-xl p-4 mt-4 mb-4 cursor-pointer transition-transform duration-200 border border-gray-200"
            />
          </div>
        )}
      </div>
    </section>

    {/* Title and Tagline */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </section>

    {/* Main Content */}
    <section>
      <label className="block text-stone-950 mb-2 font-medium">Main Content</label>
      <textarea
        value={largeDescription}
        onChange={(e) => setLargeDescription(e.target.value)}
        className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 transition-all min-h-[150px]"
        placeholder="Enter flyer details, features, or event information"
      />
    </section>

    {/* Background Image Upload */}
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </section>

    {/* Price and QR Code URL */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </section>

    {/* Flyer Image and Logo Upload */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </section>
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
  <div className="space-y-6  p-4">
    {/* Title, Month & Year, Currency */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-stone-950 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded-lg border border-slate-300"
          placeholder="Enter a title"
        />
      </div>
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Month & Year</label>
        <input
          type="month"
          value={budgetState.monthYear}
          onChange={(e) =>
            setBudgetState({ ...budgetState, monthYear: e.target.value })
          }
          className="w-full p-3 rounded-xl border border-slate-300"
        />
      </div>
      <div>
        <label className="block text-stone-950 mb-2 font-medium">Currency</label>
        <select
          value={budgetState.currency}
          onChange={(e) =>
            setBudgetState({ ...budgetState, currency: e.target.value })
          }
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

    {/* Total Budget */}
    <div>
      <label className="block text-stone-950 mb-2 font-medium">Total Budget</label>
      <input
        type="number"
        value={budgetState.totalBudget}
        onChange={(e) =>
          setBudgetState({
            ...budgetState,
            totalBudget: parseFloat(e.target.value),
          })
        }
        className="w-full p-3 rounded-xl border border-slate-300"
        placeholder="Enter total budget"
      />
    </div>

    {/* Budget Categories */}
<div className="space-y-4">
  <label className="block text-stone-950 mb-2 font-medium">Budget Categories</label>
  {budgetState.categories.map((category, index) => (
    <div key={category.id} className="space-y-4">
      {/* Category Details */}
      <div className="flex flex-col md:flex-row gap-2 items-stretch">
        <input
          type="text"
          value={category.name}
          onChange={(e) => {
            const newCategories = [...budgetState.categories];
            newCategories[index].name = e.target.value;
            setBudgetState({ ...budgetState, categories: newCategories });
          }}
          className="w-full p-3 rounded-xl border border-slate-300"
          placeholder="Category name"
        />
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="number"
            value={category.amount}
            onChange={(e) => {
              const newCategories = [...budgetState.categories];
              newCategories[index].amount = parseFloat(e.target.value);
              setBudgetState({ ...budgetState, categories: newCategories });
            }}
            className="w-full p-3 rounded-xl border border-slate-300"
            placeholder="Amount"
          />
          <select
            value={category.type}
            onChange={(e) => {
              const newCategories = [...budgetState.categories];
              newCategories[index].type = e.target.value;
              setBudgetState({ ...budgetState, categories: newCategories });
            }}
            className="w-full p-3 rounded-xl border border-slate-300"
          >
            <option value="amount">Amount</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>
        <button
          onClick={() => {
            const newCategories = budgetState.categories.filter((_, i) => i !== index);
            setBudgetState({ ...budgetState, categories: newCategories });
          }}
          className="p-3 text-red-500 hover:bg-red-50 rounded-xl flex justify-center items-center w-full md:w-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Expenses */}
      <div className="pl-4 md:pl-8 space-y-2">
        {category.expenses.map((expense, expIndex) => (
          <div key={expense.id} className="flex flex-col md:flex-row gap-2 items-stretch">
            <input
              type="text"
              value={expense.name}
              onChange={(e) => {
                const newCategories = [...budgetState.categories];
                newCategories[index].expenses[expIndex].name = e.target.value;
                setBudgetState({ ...budgetState, categories: newCategories });
              }}
              className="w-full p-3 rounded-xl border border-slate-300"
              placeholder="Expense name"
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={expense.amount}
                onChange={(e) => {
                  const newCategories = [...budgetState.categories];
                  newCategories[index].expenses[expIndex].amount = parseFloat(e.target.value);
                  setBudgetState({ ...budgetState, categories: newCategories });
                }}
                className="w-full p-3 rounded-xl border border-slate-300"
                placeholder="Amount"
              />
              <button
                onClick={() => {
                  const newCategories = [...budgetState.categories];
                  newCategories[index].expenses = newCategories[index].expenses.filter((_, i) => i !== expIndex);
                  setBudgetState({ ...budgetState, categories: newCategories });
                }}
                className="p-3 text-red-500 hover:bg-red-50 rounded-xl flex justify-center items-center w-full md:w-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            const newCategories = [...budgetState.categories];
            newCategories[index].expenses.push({
              id: crypto.randomUUID(),
              name: '',
              amount: 0,
            });
            setBudgetState({ ...budgetState, categories: newCategories });
          }}
          className="w-full p-3 text-blue-600 hover:bg-blue-50 rounded-xl border border-blue-200"
        >
          Add Expense
        </button>
      </div>
    </div>
  ))}

  {/* Add Category Button */}
  <button
    onClick={() => {
      setBudgetState({
        ...budgetState,
        categories: [
          ...budgetState.categories,
          {
            id: crypto.randomUUID(),
            name: '',
            amount: 0,
            type: 'amount',
            expenses: [],
          },
        ],
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
77777777777777777777777777777    value={textColors.description}
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

{selectedVariant === 'birthday' && (
  <div className="space-y-6 p-6 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl transition-all">
    {/* Name and Age Fields */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="celebrantName" className="block text-gray-800 text-sm font-medium mb-2">
          Celebrant's Name
        </label>
        <input
          type="text"
          id="celebrantName"
          value={celebrantName}
          onChange={(e) => setCelebrantName(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
          placeholder="Enter name"
        />
      </div>
      <div>
        <label htmlFor="age" className="block text-gray-800 text-sm font-medium mb-2">
          Age
        </label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
          placeholder="Enter age"
        />
      </div>
    </div>

    {/* Date Fields */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="cardDate" className="block text-gray-800 text-sm font-medium mb-2">
          Card Date
        </label>
        <input
          type="date"
          id="cardDate"
          value={fieldValues.cardDate}
          onChange={(e) => handleFieldChange('cardDate', e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="birthdayDate" className="block text-gray-800 text-sm font-medium mb-2">
          Birthday Date
        </label>
        <input
          type="date"
          id="birthdayDate"
          value={fieldValues.birthdayDate}
          onChange={(e) => handleFieldChange('birthdayDate', e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
        />
      </div>
    </div>

    {/* Message Field */}
    <div>
      <label htmlFor="birthdayMessage" className="block text-gray-800 text-sm font-medium mb-2">
        Birthday Message
      </label>
      <textarea
        id="birthdayMessage"
        value={fieldValues.birthdayMessage}
        onChange={(e) => handleFieldChange('birthdayMessage', e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm min-h-[100px]"
        placeholder="Enter birthday message"
      />
    </div>

    {/* Days Until Field */}
    <div>
      <label htmlFor="daysUntil" className="block text-gray-800 text-sm font-medium mb-2">
        Days Until Birthday
      </label>
      <input
        type="number"
        id="daysUntil"
        value={fieldValues.daysUntil}
        onChange={(e) => handleFieldChange('daysUntil', e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
        placeholder="Enter days until birthday"
      />
    </div>

    {/* Background Type Selection */}
    <div>
      <label className="block text-gray-800 text-sm font-medium mb-2">Background Type</label>
      <select
        value={bgType}
        onChange={(e) => setBgType(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
      >
        <option value="gradient">Gradient</option>
        <option value="solid">Solid Color</option>
        <option value="image">Image</option>
      </select>
    </div>

    {/* Gradient or Solid Color Inputs */}
    {bgType === 'gradient' && (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <label className="block text-gray-800 text-sm font-medium">Gradient From</label>
          <input
            type="color"
            value={gradientFrom}
            onChange={(e) => setGradientFrom(e.target.value)}
            className="w-12 h-8 border rounded-lg"
            title="Gradient From"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="block text-gray-800 text-sm font-medium">Gradient Via</label>
          <input
            type="color"
            value={gradientVia}
            onChange={(e) => setGradientVia(e.target.value)}
            className="w-12 h-8 border rounded-lg"
            title="Gradient Via"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="block text-gray-800 text-sm font-medium">Gradient To</label>
          <input
            type="color"
            value={gradientTo}
            onChange={(e) => setGradientTo(e.target.value)}
            className="w-12 h-8 border rounded-lg"
            title="Gradient To"
          />
        </div>
      </div>
    )}
    {bgType === 'solid' && (
      <div className="flex items-center gap-2">
        <label className="block text-gray-800 text-sm font-medium">Solid Color</label>
        <input
          type="color"
          value={solidColor}
          onChange={(e) => setSolidColor(e.target.value)}
          className="w-12 h-8 border rounded-lg"
          title="Solid Color"
        />
      </div>
    )}
    {bgType === 'image' && (
      <div className="relative">
        <label className="block text-gray-800 text-sm font-medium mb-2">Upload Background Image</label>
        <input
          type="file"
          accept="image/*"
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
          className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500"
        />
        {backgroundImage && (
          <div className="mt-2 flex items-center">
            <img
              src={backgroundImage}
              alt="Background"
              className="w-20 h-20 rounded-lg mr-2"
            />
            <button
              onClick={() => setBackgroundImage('')}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
            >
              X
            </button>
          </div>
        )}
      </div>
    )}

    {/* Logo Upload */}
    <div className="relative">
      <label className="block text-gray-800 text-sm font-medium mb-2">Upload Logo</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setLogo(reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        }}
        className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500"
      />
      {logo && (
        <div className="mt-2 flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 rounded-lg mr-2"
          />
          <button
            onClick={() => setLogo('')}
            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
          >
            X
          </button>
        </div>
      )}
    </div>

    {/* Flyer Image Upload */}
    <div className="relative">
      <label className="block text-gray-800 text-sm font-medium mb-2">Upload Flyer Image</label>
      <input
        type="file"
        accept="image/*"
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
        className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500"
      />
      {flyerImage && (
        <div className="mt-2 flex items-center">
          <img
            src={flyerImage}
            alt="Flyer"
            className="w-20 h-20 rounded-lg mr-2"
          />
          <button
            onClick={() => setflyerImage('')}
            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
          >
            X
          </button>
        </div>
      )}
    </div>

    {/* QR Code URL Input */}
    <div>
      <label htmlFor="qrUrl" className="block text-gray-800 text-sm font-medium mb-2">
        QR Code URL
      </label>
      <input
        type="text"
        id="qrUrl"
        value={qrUrl}
        onChange={(e) => setQrUrl(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
        placeholder="Enter URL for QR code"
      />
    </div>

    {/* Price Input */}
    <div className="flex space-x-4">
      <div>
        <label htmlFor="price" className="block text-gray-800 text-sm font-medium mb-2">
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
          placeholder="Enter price"
        />
      </div>
      <div>
        <label htmlFor="currency" className="block text-gray-800 text-sm font-medium mb-2">
          Currency
        </label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition shadow-sm"
        >
          {currencyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
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


{selectedVariant === 'pricelist' && (
  <div className="space-y-6 bg-white/80 backdrop-blur-md shadow-lg p-4 rounded-2xl transition-all">
  {/* Pricelist Header */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-stone-950 mb-2 font-medium">Pricelist Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded-lg border border-slate-300"
        placeholder="e.g., Consulting Services Pricing"
      />
    </div>
    <div>
      <label className="block text-stone-950 mb-2 font-medium">Base Currency</label>
      <select
        value={pricelistState.currency}
        onChange={(e) =>
          setPricelistState({ ...pricelistState, currency: e.target.value as Currency })
        }
        className="w-full p-2 rounded-lg border border-slate-300"
      >
        {(['USD', 'EUR', 'GBP', 'INR', 'NGN', 'GHC'] as Currency[]).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Pricing Tiers */}
  <div className="space-y-4">
    <label className="block text-stone-950 mb-2 font-medium">Pricing Tiers</label>
    {pricelistState.tiers.map((tier, tierIndex) => (
      <div
        key={tier.id}
        className="border p-4 rounded-xl bg-white shadow-sm space-y-4"
      >
        {/* Tier Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={tier.name}
            onChange={(e) => updateTier(tierIndex, 'name', e.target.value)}
            className="p-2 rounded-lg border border-slate-300 w-full"
            placeholder="Tier Name (e.g., Premium)"
          />
          <input
            type="number"
            value={tier.price}
            onChange={(e) => updateTier(tierIndex, 'price', Number(e.target.value))}
            className="p-2 rounded-lg border border-slate-300 w-full"
            placeholder="Price"
          />
          <select
            value={tier.billingInterval}
            onChange={(e) =>
              updateTier(tierIndex, 'billingInterval', e.target.value as Tier['billingInterval'])
            }
            className="p-2 rounded-lg border border-slate-300 w-full"
          >
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
            <option value="one-time">One-time</option>
          </select>
        </div>

        {/* Tier Features */}
        <div className="pl-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={tier.description}
              onChange={(e) => updateTier(tierIndex, 'description', e.target.value)}
              className="p-2 rounded-lg border border-slate-300 w-full"
              placeholder="Short description"
            />
            <input
              type="text"
              value={tier.discount}
              onChange={(e) => updateTier(tierIndex, 'discount', e.target.value)}
              className="p-2 rounded-lg border border-slate-300 w-full"
              placeholder="Discount/Promo (e.g., '10% OFF')"
            />
          </div>
          <div className="space-y-2">
            <label className="text-stone-700 font-medium">Features</label>
            {tier.features.map((feature, featureIndex) => (
              <div
                key={feature.id}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={feature.text}
                  onChange={(e) => updateFeature(tierIndex, featureIndex, e.target.value)}
                  className="p-2 rounded-lg border border-slate-300 flex-1"
                  placeholder="Feature description"
                />
                <button
                  onClick={() => removeFeature(tierIndex, featureIndex)}
                  className="text-red-500 hover:bg-red-50 p-1 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addFeature(tierIndex)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
            >
              Add Feature
            </button>
          </div>
        </div>

        {/* Tier Footer */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={tier.recommended}
              onChange={(e) => updateTier(tierIndex, 'recommended', e.target.checked)}
              className="rounded border-slate-300"
            />
            <label className="text-stone-700">Mark as Recommended</label>
          </div>
          <button
            onClick={() => removeTier(tierIndex)}
            className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
          >
            Remove Tier
          </button>
        </div>
      </div>
    ))}

    {/* Add New Tier Button */}
    <button
      onClick={addNewTier}
      className="w-full p-3 text-blue-600 hover:bg-blue-50 rounded-xl border border-blue-200"
    >
      Add New Tier
    </button>
  </div>

  {/* Advanced Options */}
  <div className="border-t pt-4">
    <div className="flex items-center gap-2 mb-4">
      <input
        type="checkbox"
        checked={pricelistState.enableCalculator}
        onChange={(e) =>
          setPricelistState({
            ...pricelistState,
            enableCalculator: e.target.checked,
          })
        }
        className="rounded border-slate-300"
      />
      <label className="text-stone-700 font-medium">
        Enable Price Calculator Widget
      </label>
    </div>

    {pricelistState.enableCalculator && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={pricelistState.calculatorLabel}
          onChange={(e) =>
            setPricelistState({
              ...pricelistState,
              calculatorLabel: e.target.value,
            })
          }
          className="p-2 rounded-lg border border-slate-300 w-full"
          placeholder="Calculator button label (e.g., 'Get Estimate')"
        />
        <input
          type="text"
          value={pricelistState.calculatorNote}
          onChange={(e) =>
            setPricelistState({
              ...pricelistState,
              calculatorNote: e.target.value,
            })
          }
          className="p-2 rounded-lg border border-slate-300 w-full"
          placeholder="Calculator disclaimer note"
        />
      </div>
    )}
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
  <label className="block text-gray-800 mb-1 font-medium">Full Name (in capital letters)</label>
  <input
    type="text"
    value={fullName}
    onChange={(e) => setFullName(e.target.value.toUpperCase())}
    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
    placeholder="Enter your full name in capital letters"
  />
</div>

{/* Date of Birth / Place of Birth */}
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <div>
    <label className="block text-gray-800 mb-1 font-medium">Date of Birth</label>
    <input
      type="date"
      value={dateOfBirth}
      onChange={(e) => setDateOfBirth(e.target.value)}
      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div>
    <label className="block text-gray-800 mb-1 font-medium">Place of Birth</label>
    <input
      type="text"
      value={placeOfBirth}
      onChange={(e) => setPlaceOfBirth(e.target.value)}
      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your place of birth"
    />
  </div>
</div>

<div>
  <label className="block text-gray-800 mb-1 font-medium">Bio</label>
  <textarea
    value={bio}
    onChange={(e) => setBio(e.target.value)}
    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
    placeholder="Enter a short bio about yourself"
  />
</div>

{/* Sex */}
<div>
  <label className="block text-gray-800 mb-1 font-medium">Sex</label>
  <select
    value={sex}
    onChange={(e) => setSex(e.target.value)}
    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Select Sex</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
</div>

{/* Marital Status */}
<div>
  <label className="block text-gray-800 mb-1 font-medium">Marital Status</label>
  <select
    value={maritalStatus}
    onChange={(e) => setMaritalStatus(e.target.value)}
    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Select Marital Status</option>
    <option value="Single">Single</option>
    <option value="Married">Married</option>
    <option value="Divorced">Divorced</option>
    <option value="Widowed">Widowed</option>
  </select>
</div>

{/* Names / Ages of Children */}
<div>
  <label className="block text-gray-800 mb-1 font-medium">Names / Ages of Children</label>
  {children.map((child, index) => (
    <div key={index} className="flex items-center space-x-2 mb-2">
      <input
        type="text"
        value={child.name}
        onChange={(e) => updateChild(index, 'name', e.target.value)}
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        placeholder="Child's name"
      />
      <input
        type="number"
        value={child.age}
        onChange={(e) => updateChild(index, 'age', e.target.value)}
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        placeholder="Age"
      />
      <button
        type="button"
        onClick={() => removeChild(index)}
        className="p-2 bg-red-500 text-white rounded-lg"
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={addChild}
    className="p-2 bg-blue-500 text-white rounded-lg"
  >
    Add Child
  </button>
</div>

{/* Town / State of Origin */}
<div>
  <label className="block text-gray-800 mb-1 font-medium">Town / State of Origin</label>
  <input
    type="text"
    value={townStateOrigin}
    onChange={(e) => setTownStateOrigin(e.target.value)}
    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
    placeholder="Enter your town and state of origin"
  />
</div>

{/* Nationality */}
<div>
  <label className="block text-gray-800 mb-1 font-medium">Nationality</label>
  <input
    type="text"
    value={nationality}
    onChange={(e) => setNationality(e.target.value)}
    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
    placeholder="Enter your nationality"
  />
</div>

{/* Current Postal Address */}
<div>
  <label className="block text-gray-800 mb-1 font-medium">Current Postal Address</label>
  <input
    type="text"
    value={currentPostalAddress}
    onChange={(e) => setCurrentPostalAddress(e.target.value)}
    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
    placeholder="Enter your current postal address"
  />
</div>

{/* Working Experience with Dates */}
<div>
  <label className="block text-gray-800 mb-1 font-medium">Working Experience with Dates</label>
  {workExperience.map((experience, expIndex) => (
    <div key={expIndex} className="space-y-2 mb-4">
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Company Name</label>
        <input
          type="text"
          value={experience.companyName}
          onChange={(e) => updateWorkExperience(expIndex, 'companyName', e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter company name"
        />
      </div>
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Role/Position</label>
        <input
          type="text"
          value={experience.role}
          onChange={(e) => updateWorkExperience(expIndex, 'role', e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your role"
        />
      </div>
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Duration</label>
        <input
          type="text"
          value={experience.duration}
          onChange={(e) => updateWorkExperience(expIndex, 'duration', e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Jan 2022 - Dec 2024"
        />
      </div>
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Job Descriptions</label>
        {experience.jobDescriptions.map((desc, descIndex) => (
          <div key={descIndex} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={desc}
              onChange={(e) => updateJobDescription(expIndex, descIndex, e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter job description"
            />
            <button
              type="button"
              onClick={() => removeJobDescription(expIndex, descIndex)}
              className="p-2 bg-red-500 text-white rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addJobDescription(expIndex)}
          className="p-2 bg-blue-500 text-white rounded-lg"
        >
          Add Job Description
        </button>
      </div>
      <button
        type="button"
        onClick={() => removeWorkExperience(expIndex)}
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

{/* Permanent Home Address */}
<div>
  <label className="block text-gray-800 mb-1 font-medium">Permanent Home Address</label>
  <input
    type="text"
    value={permanentHomeAddress}
    onChange={(e) => setPermanentHomeAddress(e.target.value)}
    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
    placeholder="Enter your permanent home address"
  />
</div>

{/* Institutions Attended with Dates */}
<div>
  <label className="block text-gray-800 mb-1 font-medium">Institutions Attended with Dates</label>
  {education.map((edu, index) => (
    <div key={index} className="space-y-2 mb-4">
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Institution Name</label>
        <input
          type="text"
          value={edu.institution}
          onChange={(e) => updateEducation(index, 'institution', e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter institution name"
        />
      </div>
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

{/* E-mail Address / GSM Number */}
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <div>
    <label className="block text-gray-800 mb-1 font-medium">E-mail Address</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your email address"
    />
  </div>
  <div>
    <label className="block text-gray-800 mb-1 font-medium">GSM Number</label>
    <input
      type="text"
      value={gsmNumber}
      onChange={(e) => setGsmNumber(e.target.value)}
      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your GSM number"
    />
  </div>
</div>

{/* Present Employment / Status / Salary / Employer */}
<div>
  <label className="block text-gray-800 mb-1 font-medium">Present Employment / Status / Salary / Employer</label>
  <div className="space-y-2">
    <div>
      <label className="block text-gray-800 mb-1 text-sm">Employer</label>
      <input
        type="text"
        value={presentEmployment.employer}
        onChange={(e) => setPresentEmployment({ ...presentEmployment, employer: e.target.value })}
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        placeholder="Enter employer name"
      />
    </div>
    <div>
      <label className="block text-gray-800 mb-1 text-sm">Status</label>
      <input
        type="text"
        value={presentEmployment.status}
        onChange={(e) => setPresentEmployment({ ...presentEmployment, status: e.target.value })}
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        placeholder="Enter employment status"
      />
    </div>
    <div>
      <label className="block text-gray-800 mb-1 text-sm">Salary</label>
      <input
        type="text"
        value={presentEmployment.salary}
        onChange={(e) => setPresentEmployment({ ...presentEmployment, salary: e.target.value })}
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        placeholder="Enter salary"
      />
    </div>
  </div>
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

{/* Extra Curriculum Activities */}
<div>
  <label className="block text-gray-800 mb-1 font-medium">Extra Curriculum Activities</label>
  {extraCurriculumActivities.map((activity, index) => (
    <div key={index} className="flex items-center space-x-2 mb-2">
      <input
        type="text"
        value={activity}
        onChange={(e) => updateExtraCurriculumActivity({ index, value: e.target.value })}
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        placeholder="Enter activity"
      />
      <button
        type="button"
        onClick={() => removeExtraCurriculumActivity(index)}
        className="p-2 bg-red-500 text-white rounded-lg"
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={addExtraCurriculumActivity}
    className="p-2 bg-blue-500 text-white rounded-lg"
  >
    Add Activity
  </button>
</div>

{/* Referees / Address / GSM Number */}
<div>
  <label className="block text-gray-800 mb-1 font-medium">Referees / Address / GSM Number</label>
  {referees.map((referee, index) => (
    <div key={index} className="space-y-2 mb-4">
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Referee Name</label>
        <input
          type="text"
          value={referee.name}
          onChange={(e) => updateReferee(index, 'name', e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter referee name"
        />
      </div>
      <div>
        <label className="block text-gray-800 mb-1 text-sm">Address</label>
        <input
          type="text"
          value={referee.address}
          onChange={(e) => updateReferee(index, 'address', e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter referee address"
        />
      </div>
      <div>
        <label className="block text-gray-800 mb-1 text-sm">GSM Number</label>
        <input
          type="text"
          value={referee.gsmNumber}
          onChange={(e) => updateReferee(index, 'gsmNumber', e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter referee GSM number"
        />
      </div>
      <button
        type="button"
        onClick={() => removeReferee(index)}
        className="p-2 bg-red-500 text-white rounded-lg"
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={addReferee}
    className="p-2 bg-blue-500 text-white rounded-lg"
  >
    Add Referee
  </button>
</div>
</div>
)}

{selectedVariant === "timetable" && (
  <div className="space-y-4 p-4 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl transition-all">
          <h2>Title</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-lg border border-slate-300"
            placeholder="Enter timetable title"
          />
          <h2>Time Zone</h2>
          <select
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-300"
          >
            {timeZoneOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
       
      

      {/* Schedule Type Selector */}
      <h2>Schedule Type</h2>
      <select
        value={scheduleType}
        onChange={(e) => setScheduleType(e.target.value)}
        className="w-full p-3 rounded-xl border border-slate-300"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="permanent">Permanent</option>
      </select>

      {/* Fixed Weekly/Permanent Schedule */}
    {(scheduleType === 'weekly' || scheduleType === 'permanent') && (
      <div className="space-y-4">
        <label className="block text-stone-950 mb-2 font-medium">Schedule Days</label>
        <div className="space-y-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((dayOfWeek) => (
            <div key={dayOfWeek} className="border p-4 rounded-xl space-y-4">
              <h3 className="text-lg font-medium">{dayOfWeek}</h3>
              <div className="pl-8 space-y-4">
                {(timetableState.days[dayOfWeek]?.events || []).map((event: Event, eventIndex: number) => (
                  <div key={event.id} className="flex flex-col md:flex-col w-full gap-4 items-start">
                    {/* Event Name Input */}
                    <input
                      type="text"
                      value={event.name}
                      onChange={(e) => {
                        const newDays = { ...timetableState.days };
                        newDays[dayOfWeek].events[eventIndex].name = e.target.value;
                        setTimetableState({ ...timetableState, days: newDays });
                      }}
                      className="p-2 rounded-lg border w-full border-slate-300 flex-1"
                      placeholder="Event name"
                    />
                    {/* Start Time Input */}
                    <input
                      type="time"
                      value={event.startTime}
                      onChange={(e) => {
                        const newDays = { ...timetableState.days };
                        newDays[dayOfWeek].events[eventIndex].startTime = e.target.value;
                        setTimetableState({ ...timetableState, days: newDays });
                      }}
                      className="p-2 rounded-lg border w-full border-slate-300"
                    />
                    {/* End Time Input */}
                    <input
                      type="time"
                      value={event.endTime}
                      onChange={(e) => {
                        const newDays = { ...timetableState.days };
                        newDays[dayOfWeek].events[eventIndex].endTime = e.target.value;
                        setTimetableState({ ...timetableState, days: newDays });
                      }}
                      className="p-2 rounded-lg border w-full border-slate-300"
                    />
                    {/* Location Input */}
                    <input
                      type="text"
                      value={event.location}
                      onChange={(e) => {
                        const newDays = { ...timetableState.days };
                        newDays[dayOfWeek].events[eventIndex].location = e.target.value;
                        setTimetableState({ ...timetableState, days: newDays });
                      }}
                      className="p-2 rounded-lg border w-full border-slate-300"
                      placeholder="Location"
                    />
                    {/* Remove Event Button */}
                    <button
                      onClick={() => {
                        const newDays = { ...timetableState.days };
                        newDays[dayOfWeek].events = newDays[dayOfWeek].events.filter((_, i) => i !== eventIndex);
                        setTimetableState({ ...timetableState, days: newDays });
                      }}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {/* Add Event Button - Fixed */}
                <button
                  onClick={() => {
                    const newDays = { ...timetableState.days };
                    if (!newDays[dayOfWeek]) {
                      newDays[dayOfWeek] = {
                        id: dayOfWeek, // Use day name as ID for consistency
                        date: '', // Consider removing date for permanent schedules
                        events: []
                      };
                    }
                    newDays[dayOfWeek].events.push({
                      id: crypto.randomUUID(),
                      name: '',
                      startTime: '09:00',
                      endTime: '10:00',
                      location: ''
                    });
                    setTimetableState({ ...timetableState, days: newDays });
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200"
                >
                  Add Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

      {/* Daily or Monthly Schedule */}
      {(scheduleType === "daily" || scheduleType === "monthly") && (
        <div>
          <h2>Schedule Days</h2>
          {Object.values(timetableState.days).map((day, dayIndex) => (
            <div key={day.id}>
              <input
                type="date"
                value={day.date}
                onChange={(e) => handleUpdateDay(day.id, "date", e.target.value)}
                className="p-2 w-full rounded-lg border border-slate-300"
              />
              <button
                onClick={() => handleRemoveDay(day.id)}
                className="text-red-500 w-full hover:bg-red-50 p-2 rounded-lg"
              >
                Remove Day
              </button>
              {day.events.map((event, eventIndex) => (
                <div key={event.id}>
                  <input
                    type="text"
                    value={event.name}
                    onChange={(e) =>
                      handleUpdateEvent(day.id, eventIndex, "name", e.target.value)
                    }
                    className="p-2 rounded-lg border w-full border-slate-300 flex-"
                    placeholder="Event name"
                  />
                  <input
                    type="text"
                    value={event.startTime}
                    onChange={(e) =>
                      handleUpdateEvent(day.id, eventIndex, "startTime", e.target.value)
                    }
                    className="p-2 rounded-lg border w-full border-slate-300"
                  />
                  <input
                    type="text"
                    value={event.endTime}
                    onChange={(e) =>
                      handleUpdateEvent(day.id, eventIndex, "endTime", e.target.value)
                    }
                    className="p-2 rounded-lg w-full border border-slate-300"
                  />
                  <input
                    type="text"
                    value={event.location}
                    onChange={(e) =>
                      handleUpdateEvent(day.id, eventIndex, "location", e.target.value)
                    }
                    className="p-2 rounded-lg border w-full border-slate-300"
                    placeholder="Location"
                  />
                  <button
                    onClick={() => handleRemoveEvent(day.id, eventIndex)}
                    className="text-red-500 w-full hover:bg-red-50 p-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleAddEvent(day.id)}
                className="p-2 text-blue-600 w-full hover:bg-blue-50 rounded-lg border border-blue-200"
              >
                Add Event
              </button>
            </div>
          ))}
          <button
            onClick={handleAddDay}
            className="w-full p-3 text-blue-600 hover:bg-blue-50 rounded-xl border border-blue-200"
          >
            Add Day
          </button>
        </div>
      )}
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
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showfooterPart}
            onChange={(e) => setshowfooterPart(e.target.checked)}
            className="form-checkbox text-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-slate-700 text-xs">Show App Signature</span>
        </label>
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
        disabled={isLoading1}
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
      {isLoading1 ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generating...
          </span>
        ) : (
          'Generate PDF'
        )}
      </button>
    </div>

        
      </div>}
      

      {/* Add responsive card container */}
      <div className="md:flex-1 flex  md:h-full h-4/6  md:max-w-7xl w-full md:pt-[650px] pt-[450px] overflow-scroll place-content-start content- md:mx-auto items-center justify rounded-lg shadow-md p-8 m-4 md:mb-4">
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


  {/* Product Variant Display Start */}
     <div className= "">

          {selectedVariant === 'product' && selectedVariantStyle === 'default' && (
  <div className={`relative p-2 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md bg-white/10`}
    style={{ backgroundColor: `${backgroundColor}` }}>
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

          {selectedVariant === 'product' && selectedVariantStyle === 'style1' && (
            <div className="relative p-2 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md bg-white/10" style={{ backgroundColor: `${backgroundColor}dd` }}>
              {/* Glass Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5"></div>
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative space-y-4 z-10">
                {/* Product Image */}
                {productImage && (
                  <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <Image src={productImage} alt="Product Image" layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" />
                  </div>
                )}
                {/* Title, Price, and QR Code */}
                <div className="flex flex-col items-center space-y-2">
                  <h3 className="text-4xl font-bold text-stone-950">{title}</h3>
                  <p className="text-2xl font-semibold bg-stone-500/20 backdrop-blur-sm text-stone-950/90 px-6 py-2 rounded-full inline-block">
                    {formatCurrency(parseFloat(price), currency)}
                  </p>
                  {qrUrl && (
                    <div className="bg-white/80 backdrop-blur-xl p-3 rounded-xl shadow-lg hover:scale-105 transition-transform">
                      <QRCodeSVG value={qrUrl} size={80} />
                    </div>
                  )}
                </div>
                {/* Description and Large Description */}
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
          )}

          {selectedVariant === 'product' && selectedVariantStyle === 'style2' && (
            <div 
            style={{ backgroundColor: `${backgroundColor}` }}
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden group transition-all duration-300 hover:shadow-3xl">
            <div className="relative h-64 overflow-hidden">
              {productImage && (
                <Image
                  src={productImage}
                  alt="Product"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60">
                <h3 className="text-3xl font-bold text-white">{title}</h3>
                <p className="text-xl text-white/90">
                  {formatCurrency(parseFloat(price), currency)}
                </p>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                {qrUrl && (
                  <div className="bg-white p-2 rounded-lg shadow-md">
                    <QRCodeSVG value={qrUrl} size={80} />
                  </div>
                )}
                <div className="text-right">
                  {/* <p className="text-sm text-gray-600">SKU: {sku}</p>
                  <p className="text-sm text-gray-600">In Stock: {stockCount}</p> */}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-700 leading-relaxed">{description}</p>
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-lg mb-2">Specifications</h4>
                  <p className="text-gray-600 whitespace-pre-line">
                    {largeDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
          )}

          {selectedVariant === 'product' && selectedVariantStyle === 'style3' && (
           <div 
           style={{ backgroundColor: `${backgroundColor}` }}
           className="bg-white rounded-xl shadow-lg overflow-hidden group">
           <div className="flex flex-col md:flex-row">
             <div className="md:w-1/3 relative overflow-hidden">
               {productImage && (
                 <Image
                   src={productImage}
                   alt="Product"
                   width={400}
                   height={400}
                   className="object-cover h-full w-full"
                 />
               )}
             </div>
             
             <div className="md:w-2/3 p-6 space-y-4">
               <div className="flex justify-between items-start">
                 <div>
                   <h1 
                   style={{ color: titleColor }}
                   className="text-2xl font-bold text-gray-900">{title}</h1>
                   <p 
                   style={{ color: titleColor }}
                   className="text-xl text-gray-600 mt-1">
                     {formatCurrency(parseFloat(price), currency)}
                   </p>
                 </div>
                 {qrUrl && (
                   <QRCodeSVG 
                     value={qrUrl} 
                     size={64} 
                     className="bg-white p-1 rounded-lg shadow-sm" 
                   />
                 )}
               </div>
               
               <div className="space-y-2">
                 <p 
                 style={{ color: titleColor }}
                 className="text-gray-700">{description}</p>
                 <div className="bg-gray-50 p-4 rounded-lg">
                   <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                   <ul className="list-disc pl-5 text-gray-600 text-sm">
                     {largeDescription.split('\n').map((feature, index) => (
                       <li key={index}>{feature}</li>
                     ))}
                   </ul>
                 </div>
               </div>
             </div>
           </div>
         </div>
          )}

          {selectedVariant === 'product' && selectedVariantStyle === 'style4' && (
            <div className="relative p-2 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md bg-white/10" style={{ backgroundColor: `${backgroundColor}dd` }}>
              {/* Floating Decorations */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5"></div>
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 z-10">
                {/* Left Column: Image */}
                <div className="space-y-2">
                  {productImage && (
                    <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg group">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <Image src={productImage} alt="Product Image" layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" />
                    </div>
                  )}
                </div>
                {/* Right Column: Details */}
                <div className="space-y-2">
                  <div className="flex flex-col items-center space-y-2">
                    <h3 className="text-4xl font-bold text-stone-950">{title}</h3>
                    <p className="text-2xl font-semibold bg-stone-500/20 backdrop-blur-sm text-stone-950/90 px-6 py-2 rounded-full inline-block">
                      {formatCurrency(parseFloat(price), currency)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg text-stone-950/90 leading-relaxed backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10">
                      {description}
                    </p>
                    <div className="backdrop-blur-md bg-stone-50/10 p-6 rounded-xl border border-white/10">
                      <h4 className="text-xl font-semibold text-stone-950 mb-4">Product Details</h4>
                      <p className="text-stone-950/80 whitespace-pre-line">{largeDescription}</p>
                    </div>
                    {qrUrl && (
                      <div className="bg-white/80 backdrop-blur-xl p-3 rounded-xl shadow-lg hover:scale-105 transition-transform">
                        <QRCodeSVG value={qrUrl} size={80} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

      </div>
  {/* Product Variant Display End */}





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
    className="relative p-4 md:p-6 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl"
    style={{
      background: bgType === 'gradient'
        ? `linear-gradient(135deg, ${gradientFrom}, ${gradientVia || ''} ${gradientVia ? '50%' : ''}, ${gradientTo})`
        : bgType === 'solid'
        ? solidColor
        : 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
      minHeight: '500px'
    }}
  >
    {/* Background Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 pointer-events-none"></div>

    {/* Dynamic Background Image */}
    {backgroundImage && (
      <div className="absolute inset-0">
        <Image
          src={typeof backgroundImage === 'string' ? backgroundImage : URL.createObjectURL(backgroundImage)}
          alt="Background"
          fill
          className="object-cover"
          quality={90}
        />
      </div>
    )}

    {/* Animated Gradient Blobs */}
    <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400/20 rounded-full blur-[150px] animate-pulse-slow"></div>
    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-500/20 rounded-full blur-[150px] animate-pulse-slow delay-1000"></div>

    {/* Content Container */}
    <div className="relative z-10 flex flex-col h-full justify-between items-center space-y-6 text-center">
      {/* Header Section */}
      <div className="space-y-4">
        {logo && (
          <div className="mx-auto w-24 h-24 rounded-full bg-white/10 p-2 shadow-lg">
            <Image
              src={logo}
              alt="Logo"
              width={96}
              height={96}
              className="rounded-full object-contain"
            />
          </div>
        )}
        
        <h3
          className="text-4xl md:text-5xl font-bold uppercase tracking-tighter bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
          style={{ 
            color: titleColor,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          {title || "Grand Celebration"}
        </h3>

        <p
          className="text-xl md:text-2xl font-medium text-white/90 max-w-2xl mx-auto"
          style={{ color: titleColor }}
        >
          {description || "An Evening of Elegance & Excitement"}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        {flyerImage && (
          <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
            <Image
              src={flyerImage}
              alt="Main Event Visual"
              fill
              className="object-cover"
              quality={95}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50"></div>
          </div>
        )}

        <div className="mt-6 p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 max-w-2xl w-full">
          <p
            className="text-lg md:text-xl leading-relaxed text-white/90 whitespace-pre-wrap"
            style={{ color: titleColor }}
          >
            {largeDescription || "Join us for an unforgettable night featuring:\n• Live Performances\n• Gourmet Dining\n• Exclusive Experiences"}
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6">
        {qrUrl && (
          <div className="bg-white/90 p-3 rounded-xl shadow-lg hover:scale-105 transition-transform">
            <QRCodeSVG 
              value={qrUrl} 
              size={120}
              bgColor="transparent"
              fgColor="#1a1a1a"
              level="H"
            />
            <p className="text-xs font-semibold text-black mt-2">
              SCAN FOR DETAILS
            </p>
          </div>
        )}

        {price && (
          <div className="bg-gradient-to-r from-amber-500 to-rose-600 p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
            <div className="space-y-1">
              <p className="text-xs font-bold text-white/80 uppercase tracking-wide">
                Admission Starts At
              </p>
              <p className="text-3xl font-black text-white">
                {formatCurrency(parseFloat(price), currency)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)}

{selectedVariant === 'flyer' && selectedVariantStyle === 'style1' && (
  <div className="relative p-8 rounded-3xl shadow-2xl overflow-hidden bg-white min-h-[500px]">
    {/* Accent Line */}
    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-purple-600"></div>
    
    <div className="relative z-10 flex flex-col h-full justify-between">
      {/* Header */}
      <div className="space-y-6">
        {logo && (
          <div className="w-16 h-16">
            <Image src={logo} alt="Logo" width={64} height={64} className="object-contain" />
          </div>
        )}
        <h3 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
          {title || "Modern Event"}
        </h3>
        <p className="text-xl text-gray-600 max-w-2xl">
          {description || "A Contemporary Experience"}
        </p>
      </div>

      {/* Main Content */}
      <div className="my-12">
        {flyerImage && (
          <div className="relative aspect-[21/9] rounded-lg overflow-hidden">
            <Image src={flyerImage} alt="Event" fill className="object-cover" />
          </div>
        )}
        <div className="mt-8 space-y-4 text-gray-700">
          <p className="text-lg whitespace-pre-wrap">{largeDescription}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end">
        {qrUrl && (
          <div className="bg-gray-100 p-3 rounded-lg">
            <QRCodeSVG value={qrUrl} size={80} />
          </div>
        )}
        {price && (
          <div className="text-right">
            <p className="text-sm text-gray-600">Starting at</p>
            <p className="text-4xl font-bold text-gray-900">
              {formatCurrency(parseFloat(price), currency)}
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
)}

{selectedVariant === 'flyer' && selectedVariantStyle === 'style2' && (
  <div className="relative p-6 bg-black min-h-[500px] rounded-3xl shadow-2xl overflow-hidden">
    {/* Grid Background */}
    <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-px opacity-10">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="bg-white/20"></div>
      ))}
    </div>

    <div className="relative z-10 grid md:grid-cols-2 gap-8 h-full">
      {/* Left Column */}
      <div className="space-y-8">
        {logo && (
          <div className="w-20 h-20 bg-white/10 rounded-full p-4">
            <Image src={logo} alt="Logo" width={80} height={80} className="object-contain" />
          </div>
        )}
        <div>
          <h3 className="text-6xl font-black text-white mb-4 leading-none">
            {title || "Grid Event"}
          </h3>
          <p className="text-xl text-white/80">{description}</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
          <p className="text-white/90 whitespace-pre-wrap">{largeDescription}</p>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {flyerImage && (
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image src={flyerImage} alt="Event" fill className="object-cover" />
          </div>
        )}
        
        <div className="flex justify-between items-end">
          {qrUrl && <QRCodeSVG value={qrUrl} size={100} bgColor="transparent" fgColor="white" />}
          {price && (
            <div className="bg-white text-black p-4 rounded-lg">
              <p className="text-4xl font-bold">{formatCurrency(parseFloat(price), currency)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)}

{selectedVariant === 'flyer' && selectedVariantStyle === 'style3' && (
  <div 
    className="relative p-12 min-h-[500px] rounded-3xl shadow-2xl overflow-hidden"
    style={{
      background: 'linear-gradient(to right, #1a1a1a, #2d2d2d)'
    }}
  >
    {/* Ornamental Border */}
    <div className="absolute inset-0 border-[16px] border-double border-white/10 rounded-2xl"></div>
    
    <div className="relative z-10 flex flex-col items-center text-center h-full justify-between">
      {/* Header */}
      <div className="space-y-6">
        {logo && (
          <div className="w-32 h-32 mx-auto">
            <Image src={logo} alt="Logo" width={128} height={128} className="object-contain" />
          </div>
        )}
        <div>
          <h3 className="font-serif text-5xl md:text-6xl text-white mb-4">
            {title || "Elegant Soirée"}
          </h3>
          <p className="text-xl text-white/80 font-light">{description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="my-12 w-full max-w-3xl">
        {flyerImage && (
          <div className="relative aspect-[2/1] rounded-lg overflow-hidden mb-8">
            <Image src={flyerImage} alt="Event" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        )}
        <div className="bg-white/5 backdrop-blur p-8 rounded-lg border border-white/10">
          <p className="text-white/90 whitespace-pre-wrap leading-relaxed">{largeDescription}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {qrUrl && (
          <div className="bg-white/90 p-4 rounded-lg">
            <QRCodeSVG value={qrUrl} size={100} />
          </div>
        )}
        {price && (
          <div className="text-center md:text-left">
            <p className="text-white/60 text-sm uppercase tracking-widest">Premium Access</p>
            <p className="text-4xl font-serif text-white mt-2">
              {formatCurrency(parseFloat(price), currency)}
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
)}

{selectedVariant === 'flyer' && selectedVariantStyle === 'style4' && (
  <div
    className="relative p-6 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl"
    style={{
      background: `linear-gradient(135deg, #00bfff, #ff7f50)`, // Gradient from light blue to coral
      color: '#ffffff', // White text for contrast
    }}
  >
    {/* Background Overlay */}
    <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>

    {/* Decorative Elements */}
    <div className="absolute top-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full blur-[100px]"></div>
    <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-[120px]"></div>

    {/* Content Container */}
    <div className="relative z-10 space-y-8 text-center">
      {/* Header Section */}
      <div className="space-y-4">
        {logo && (
          <div className="mx-auto mb-4">
            <img
              src={logo}
              alt="Event Logo"
              className="w-20 h-20 rounded-full border-2 border-white shadow-md"
            />
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">
          {title || "Exclusive Gala"}
        </h1>
        <p className="text-lg md:text-xl font-medium">
          {description || "A Night of Luxury & Entertainment"}
        </p>
      </div>

      {/* Main Content */}
      <div className="p-6 rounded-xl bg-black/50 backdrop-blur-lg shadow-md">
        <p className="text-base md:text-lg leading-relaxed whitespace-pre-wrap">
          {largeDescription ||
            "Indulge in an unforgettable evening with world-class performances, gourmet cuisine, and exclusive experiences."}
        </p>
      </div>

      {/* Flyer Image */}
      {flyerImage && (
        <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={flyerImage}
            alt="Event Image"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
      )}

      {/* Footer Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-8">
        {/* QR Code */}
        {qrUrl && (
          <div className="bg-white/90 p-4 rounded-lg shadow-md backdrop-blur-md">
            <QRCodeSVG value={qrUrl} size={100} />
            <p className="text-xs text-black mt-2 font-medium">SCAN FOR DETAILS</p>
          </div>
        )}

        {/* Price */}
        {price && !isNaN(parseFloat(price)) && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-blue-600 shadow-lg text-center">
            <p className="text-sm font-medium text-white mb-2">ADMISSION STARTS AT</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {formatCurrency(parseFloat(price), currency)}
            </p>
          </div>
        )}
      </div>
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

{/* Budget Card Display Start */}

{selectedVariant === 'budget' && selectedVariantStyle === 'default' && (
  <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-gray-700/20">
    {/* Subtle Background Elements */}
    <div className="absolute inset-0 bg-grid-gray-700/10 z-0 opacity-20"></div>
    <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl z-0 animate-pulse-slow"></div>
    <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl z-0 animate-pulse-slow delay-1000"></div>
    <div className="relative z-10 space-y-6 max-w-7xl mx-auto">
      {/* Professional Header */}
      <div className="text-center space-y-4 pb-6 border-b-4 border-gray-700 relative">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
          {title || 'Corporate Budget Management'}
        </h2>
        <p className="text-base md:text-lg text-gray-400 font-bold tracking-widest uppercase">
          {budgetState.monthYear}
        </p>
        <div className="inline-flex items-center px-6 py-3 bg-gray-800/70 rounded-2xl backdrop-blur-sm border-2 border-gray-700 shadow-lg">
          <span className="text-3xl md:text-4xl font-extrabold text-blue-500">
            {formatCurrency(budgetState.totalBudget, budgetState.currency)}
          </span>
        </div>
      </div>
      {/* Interactive Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {budgetState.categories.map((category) => {
          const allocatedAmount = category.type === 'percentage'
            ? (category.amount / 100) * budgetState.totalBudget
            : category.amount;
          const totalExpenses = category.expenses.reduce((acc, expense) => acc + expense.amount, 0);
          const remainingPercentage = ((allocatedAmount - totalExpenses) / allocatedAmount) * 100;
          return (
            <div key={category.id} 
                 className="group bg-gray-800/50 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-gray-700 
                          transition-all duration-300 hover:bg-gray-800/70 hover:border-blue-500/50">
              {/* Category Badge */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg md:text-xl font-bold text-blue-500 group-hover:text-green-500 uppercase">
                  {category.name}
                </h3>
                <div className="text-right">
                  <span className="text-sm md:text-base text-gray-300 font-medium">
                    {category.type === 'percentage'
                      ? `${category.amount}% (${formatCurrency(allocatedAmount, budgetState.currency)})`
                      : formatCurrency(allocatedAmount, budgetState.currency)}
                  </span>
                </div>
              </div>
              {/* Steel Progress Bar */}
              <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden mb-4 shadow-inner">
                <div
                  className="absolute h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${(allocatedAmount / budgetState.totalBudget) * 100}%`,
                  }}
                />
              </div>
              {/* Expense List with Hover Effects */}
              <div className="space-y-2 mb-4">
                {category.expenses.map((expense) => (
                  <div key={expense.id} 
                       className="flex items-center justify-between p-2 rounded-lg bg-gray-900/40 
                                transition-colors hover:bg-gray-900/60">
                    <span className="text-sm md:text-base text-gray-300">{expense.name}</span>
                    <span className="text-sm md:text-base font-medium text-blue-500">
                      {formatCurrency(expense.amount, budgetState.currency)}
                    </span>
                  </div>
                ))}
              </div>
              {/* Budget Status Indicators */}
              <div className="flex justify-between items-center mt-10 mb-10 pt-3 border-t-2 border-gray-700">
                <span className="text-sm text-gray-400 uppercase">Total</span>
                <span className={`text-sm font-medium ${totalExpenses > allocatedAmount ? 'text-red-500 blink' : 'text-blue-500'}`}>
                  {formatCurrency(totalExpenses, budgetState.currency)}
                </span>
                
              </div>
              <div className="flex justify-between items-center pt-3 border-t-2 border-gray-700">
                <span className="text-sm text-gray-400 uppercase">Remaining</span>
                <span className={`text-sm font-medium ${totalExpenses > allocatedAmount? 'text-red-500 blink' : 'text-blue-500'}`}>
                  {formatCurrency(allocatedAmount - totalExpenses, budgetState.currency)}
                </span>
                
              </div>
            </div>
          );
        })}
      </div>
      {/* Professional Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: 'Total Allocated',
            value: budgetState.categories.reduce(
              (acc, cat) =>
                acc +
                (cat.type === 'percentage'
                  ? (cat.amount / 100) * budgetState.totalBudget
                  : cat.amount),
              0
            ),
            icon: '💼',
          },
          {
            title: 'Total Expenditure',
            value: budgetState.categories.reduce(
              (acc, cat) => acc + cat.expenses.reduce((a, e) => a + e.amount, 0),
              0
            ),
            icon: '💳',
          },
          {
            title: 'Projected Balance',
            value:
              budgetState.totalBudget -
              budgetState.categories.reduce(
                (acc, cat) => acc + cat.expenses.reduce((a, e) => a + e.amount, 0),
                0
              ),
            icon: '⚖️',
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl border-2 border-gray-700 flex flex-col items-center justify-center space-y-2"
          >
            <span className="text-2xl text-blue-500">{stat.icon}</span>
            <span className="text-sm text-gray-400 font-medium uppercase">{stat.title}</span>
            <span className="text-lg md:text-xl font-bold text-blue-500">
              {formatCurrency(stat.value, budgetState.currency)}
            </span>
          </div>
        ))}
      </div>
      {/* Professional Footer */}
      <div className="flex justify-between items-center pt-4 border-t-2 border-gray-700">
        {logo && (
          <div className="relative w-12 h-12 transform hover:scale-105 transition-transform">
            <Image
              src={logo}
              alt="Logo"
              fill
              className="rounded-lg object-cover border-2 border-gray-700 hover:border-blue-500/50"
            />
          </div>
        )}
        <div className="text-right">
          <p className="text-sm text-gray-400 uppercase">STRATEGIC FINANCIAL MANAGEMENT 💼</p>
          <p className="text-sm font-medium text-blue-500">Powered by Kardify</p>
        </div>
      </div>
    </div>
  </div>
)}

{selectedVariant === 'budget' && selectedVariantStyle === 'style1' && (
  <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-slate-200">
    {/* Subtle Background Elements */}
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDhWMEg4TTggMFY4IiBzdHJva2U9IiNlM2U1ZTgiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] opacity-20 z-0"></div>
    <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl z-0"></div>

    <div className="relative z-10 space-y-6 max-w-7xl mx-auto">
      {/* Professional Header */}
      <div className="text-center space-y-4 pb-6 border-b border-slate-200">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          {title || 'Corporate Budget Management'}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-sm text-slate-600 font-medium">
            {budgetState.monthYear}
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
            <span className="text-xl md:text-2xl font-semibold text-blue-600">
              {formatCurrency(budgetState.totalBudget, budgetState.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Clean Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {budgetState.categories.map((category) => {
          const allocatedAmount = category.type === 'percentage'
            ? (category.amount / 100) * budgetState.totalBudget
            : category.amount;
          const totalExpenses = category.expenses.reduce((acc, expense) => acc + expense.amount, 0);
          const remainingPercentage = ((allocatedAmount - totalExpenses) / allocatedAmount) * 100;

          return (
            <div key={category.id} 
                 className="group bg-white p-4 md:p-5 rounded-lg border border-slate-200 
                          transition-all duration-300 hover:border-blue-200 hover:shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base md:text-lg font-semibold text-slate-800">
                  {category.name}
                </h3>
                <div className="text-right">
                  <span className="text-sm text-slate-600">
                    {category.type === 'percentage'
                      ? `${category.amount}% • ${formatCurrency(allocatedAmount, budgetState.currency)}`
                      : formatCurrency(allocatedAmount, budgetState.currency)}
                  </span>
                </div>
              </div>

              {/* Minimal Progress Bar */}
              <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                <div
                  className="absolute h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${(allocatedAmount / budgetState.totalBudget) * 100}%`,
                  }}
                />
              </div>

              {/* Expense List */}
              <div className="space-y-2 mb-4">
                {category.expenses.map((expense) => (
                  <div key={expense.id} 
                       className="flex items-center justify-between p-2 rounded-md bg-slate-50 
                                transition-colors hover:bg-slate-100">
                    <span className="text-sm text-slate-600">{expense.name}</span>
                    <span className="text-sm font-medium text-blue-600">
                      {formatCurrency(expense.amount, budgetState.currency)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Budget Status */}
              <div className="flex justify-between items-center mt-10 mb-10 pt-3 border-t-2 border-gray-700">
                <span className="text-sm text-gray-400 uppercase">Total</span>
                <span className={`text-sm font-medium ${totalExpenses > allocatedAmount ? 'text-red-500 blink' : 'text-blue-500'}`}>
                  {formatCurrency(totalExpenses, budgetState.currency)}
                </span>
                
              </div>
              <div className="flex justify-between items-center pt-3 border-t-2 border-gray-700">
                <span className="text-sm text-gray-400 uppercase">Remaining</span>
                <span className={`text-sm font-medium ${totalExpenses > allocatedAmount? 'text-red-500 blink' : 'text-blue-500'}`}>
                  {formatCurrency(allocatedAmount - totalExpenses, budgetState.currency)}
                </span>
                
              </div>
            </div>
          );
        })}
      </div>

      {/* Professional Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: 'Total Allocated',
            value: budgetState.categories.reduce(
              (acc, cat) =>
                acc +
                (cat.type === 'percentage'
                  ? (cat.amount / 100) * budgetState.totalBudget
                  : cat.amount),
              0
            ),
            icon: '📊',
          },
          {
            title: 'Total Expenditure',
            value: budgetState.categories.reduce(
              (acc, cat) => acc + cat.expenses.reduce((a, e) => a + e.amount, 0),
              0
            ),
            icon: '💳',
          },
          {
            title: 'Projected Balance',
            value:
              budgetState.totalBudget -
              budgetState.categories.reduce(
                (acc, cat) => acc + cat.expenses.reduce((a, e) => a + e.amount, 0),
                0
              ),
            icon: '⚖️',
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col items-center justify-center space-y-2"
          >
            <span className="text-2xl text-slate-600">{stat.icon}</span>
            <span className="text-sm text-slate-600 font-medium">{stat.title}</span>
            <span className="text-lg font-semibold text-slate-800">
              {formatCurrency(stat.value, budgetState.currency)}
            </span>
          </div>
        ))}
      </div>

      {/* Corporate Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
        {logo && (
          <div className="relative w-10 h-10">
            <Image
              src={logo}
              alt="Logo"
              fill
              className="rounded-lg object-contain object-left"
            />
          </div>
        )}
        <div className="text-right">
          <p className="text-sm text-slate-600">Strategic Financial Management</p>
          <p className="text-xs text-slate-500 mt-1">
            Powered by <span className="font-medium">Kardify</span>
          </p>
        </div>
      </div>
    </div>
  </div>
)}
  
{selectedVariant === 'budget' && selectedVariantStyle === 'style2' && (
  <div className="relative bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-4 md:p-6 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-rose-200/40 group">
    {/* Animated Floral Elements */}
    <div className="absolute inset-0 opacity-15 z-0">
      <div className="absolute top-0 left-10 w-24 h-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmMzI4YyI+PHBhdGggZD0iTTEyIDBDNS4zNzMgMCAwIDUuMzczIDAgMTJzNS4zNzMgMTIgMTIgMTIgMTItNS4zNzMgMTItMTJTMTguNjI3IDAgMTIgMHptMCAyMi4wMTRjLTUuNTMxIDAtMTAuMDE0LTQuNDgzLTEwLjAxNC0xMC4wMTRTNi40NjkgMS45ODYgMTIgMS45ODYgMjIuMDE0IDYuNDY5IDIyLjAxNCAxMiAxNy41MzEgMjIuMDE0IDEyIDIyLjAxNHpNMTIgMTUuMzM5Yy0xLjgzNyAwLTMuMzM5LTEuNTAyLTMuMzM5LTMuMzM5UzEwLjE2MyA4LjY2MSAxMiA4LjY2MVMxNS4zMzkgMTAuMTYzIDE1LjMzOSAxMiAxMy40OTggMTUuMzM5IDEyIDE1LjMzOXoiLz48L3N2Zz4=')] opacity-20 animate-float"></div>
      <div className="absolute top-1/3 right-8 w-16 h-16 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmMzI4YyI+PHBhdGggZD0iTTEyIDBDNS4zNzMgMCAwIDUuMzczIDAgMTJzNS4zNzMgMTIgMTIgMTIgMTItNS4zNzMgMTItMTJTMTguNjI3IDAgMTIgMHptMCAyMi4wMTRjLTUuNTMxIDAtMTAuMDE0LTQuNDgzLTEwLjAxNC0xMC4wMTRTNi40NjkgMS45ODYgMTIgMS45ODYgMjIuMDE0IDYuNDY5IDIyLjAxNCAxMiAxNy41MzEgMjIuMDE0IDEyIDIyLjAxNHpNMTIgMTUuMzM5Yy0xLjgzNyAwLTMuMzM5LTEuNTAyLTMuMzM5LTMuMzM5UzEwLjE2MyA4LjY2MSAxMiA4LjY2MVMxNS4zMzkgMTAuMTYzIDE1LjMzOSAxMiAxMy40OTggMTUuMzM5IDEyIDE1LjMzOXoiLz48L3N2Zz4=')] opacity-20 animate-float delay-1000"></div>
    </div>

    {/* Floating Sparkles */}
    <div className="absolute inset-0 pointer-events-none z-0">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute w-1 h-1 bg-rose-300/50 rounded-full animate-sparkle"
             style={{
               top: `${Math.random() * 100}%`,
               left: `${Math.random() * 100}%`,
               animationDelay: `${i * 0.5}s`
             }}></div>
      ))}
    </div>

    <div className="relative z-10 space-y-6 max-w-7xl mx-auto">
      {/* Glossy Header */}
      <div className="text-center space-y-4 pb-6 border-b border-rose-200/50 relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 bg-rose-400/10 rounded-full blur-xl"></div>
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500 pb-2 inline-block relative">
          {title || 'My Sparkly Budget'}
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-rose-400/50 to-pink-400/50 rounded-full"></span>
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <div className="px-3 py-1.5 bg-rose-50/80 backdrop-blur-sm rounded-full border border-rose-200/50 shadow-sm">
            <p className="text-sm md:text-base text-rose-600 font-medium tracking-wider">
              {budgetState.monthYear}
            </p>
          </div>
          <div className="inline-flex items-center px-6 py-3 bg-white/90 rounded-2xl backdrop-blur-sm border border-rose-200/50 shadow-lg hover:shadow-rose-200/30 transition-shadow">
            <span className="text-2xl md:text-3xl font-bold text-rose-600">
              {formatCurrency(budgetState.totalBudget, budgetState.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {budgetState.categories.map((category) => {
          const allocatedAmount = category.type === 'percentage'
            ? (category.amount / 100) * budgetState.totalBudget
            : category.amount;
          const totalExpenses = category.expenses.reduce((acc, expense) => acc + expense.amount, 0);
          const remainingPercentage = ((allocatedAmount - totalExpenses) / allocatedAmount) * 100;

          return (
            <div key={category.id} 
                 className="group bg-white/90 backdrop-blur-sm p-4 md:p-5 rounded-2xl border-2 border-rose-200/30 
                          transition-all duration-300 hover:border-rose-300/50 hover:shadow-lg relative overflow-hidden">
              {/* Category Ribbon */}
              <div className="absolute top-3 -right-8 w-32 bg-rose-500 text-white text-xs font-semibold text-center rotate-45 py-1 shadow-md">
                {category.type === 'percentage' ? 'Percentage' : 'Fixed Amount'}
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg md:text-xl font-semibold text-rose-700 group-hover:text-rose-800 flex items-center gap-2">
                  <span className="w-2 h-2 bg-rose-400 rounded-full"></span>
                  {category.name}
                </h3>
                <div className="text-right">
                  <span className="text-sm md:text-base text-rose-600 font-medium">
                    {category.type === 'percentage'
                      ? `${category.amount}% (${formatCurrency(allocatedAmount, budgetState.currency)})`
                      : formatCurrency(allocatedAmount, budgetState.currency)}
                  </span>
                </div>
              </div>

              {/* 3D Progress Bar */}
              <div className="relative h-4 bg-rose-100 rounded-full overflow-hidden mb-4 shadow-inner">
                <div
                  className="absolute h-full bg-gradient-to-r from-rose-400 to-pink-400 rounded-full transition-all duration-500 shadow-progress"
                  style={{
                    width: `${(allocatedAmount / budgetState.totalBudget) * 100}%`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
                </div>
              </div>

              {/* Expense List with Hover Effects */}
              <div className="space-y-2 mb-4">
                {category.expenses.map((expense) => (
                  <div key={expense.id} 
                       className="flex items-center justify-between p-2 rounded-lg bg-rose-50/50 
                                transition-all duration-200 hover:bg-rose-100 hover:translate-x-1">
                    <span className="text-sm md:text-base text-rose-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-rose-400 rounded-full opacity-70"></span>
                      {expense.name}
                    </span>
                    <span className="text-sm md:text-base font-medium text-rose-600">
                      {formatCurrency(expense.amount, budgetState.currency)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Budget Status Indicators */}
              <div className="pt-4 border-t border-rose-200/30 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-rose-600">Remaining</span>
                    <span className="text-xs text-rose-400 bg-rose-50 px-2 py-1 rounded-full">
                    {formatCurrency(allocatedAmount - totalExpenses, budgetState.currency)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-rose-600">Total</span>
                    <span className={`text-sm font-medium ${totalExpenses > allocatedAmount ? 'text-red-500 animate blink' : 'text-blue-500'} bg-white px-2 py-1 rounded-full border`}>
                    {formatCurrency(totalExpenses, budgetState.currency)}
                    </span>
                  </div>
                  {/* <div className="flex justify-between items-center">
                <span className="text-sm text-rose-600">Total</span>
                <span className={`text-sm font-medium ${totalExpenses > allocatedAmount ? 'text-red-500' : 'text-blue-500'}  bg-white px-2 py-1 rounded-full border`}>
                  {formatCurrency(totalExpenses, budgetState.currency)}
                </span>
                
              </div> */}
                </div>
                <div className="relative pt-2">
                  <div className="h-1 bg-rose-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-rose-300 to-pink-300 transition-all duration-500"
                      style={{
                        width: `${100 - (totalExpenses / allocatedAmount) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Glowing Summary Cards */}
      <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border-2 border-rose-200/30 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              title: 'Total Allocated', 
              value: budgetState.categories.reduce((acc, cat) => acc + 
                (cat.type === 'percentage' ? 
                  (cat.amount / 100) * budgetState.totalBudget : 
                  cat.amount), 0),
              icon: '💰'
            },
            { 
              title: 'Total Spent', 
              value: budgetState.categories.reduce((acc, cat) => acc + cat.expenses.reduce((a, e) => a + e.amount, 0), 0),
              icon: '🛍️'
            },
            { 
              title: 'Budget Remaining', 
              value: budgetState.totalBudget - budgetState.categories.reduce((acc, cat) => acc + cat.expenses.reduce((a, e) => a + e.amount, 0), 0),
              icon: '🎀'
            }
          ].map((stat, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border border-rose-200/30 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 text-6xl text-rose-200/30 z-0">{stat.icon}</div>
              <div className="relative z-10">
                <span className="block text-sm text-rose-600 mb-1">{stat.title}</span>
                <span className="text-lg md:text-xl text-rose-700 font-bold">
                  {formatCurrency(stat.value, budgetState.currency)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-rose-200/50">
        {logo && (
          <div className="relative w-12 h-12 transform hover:scale-105 transition-transform group">
            <div className="absolute inset-0 bg-rose-100/30 rounded-full blur-md group-hover:blur-lg transition-all"></div>
            <Image
              src={logo}
              alt="Logo"
              fill
              className="rounded-full object-cover border-2 border-rose-200 hover:border-rose-400/50 z-10"
            />
          </div>
        )}
        <div className="text-right">
          <p className="text-sm text-rose-600 animate-pulse-slow">🌟 Manage your sparkles wisely 🌟</p>
          <p className="text-sm font-medium text-rose-700 mt-1">
            Powered by <span className="text-rose-600">Kardify</span>
          </p>
        </div>
      </div>
    </div>
  </div>
)}

{selectedVariant === 'budget' && selectedVariantStyle === 'style3' && (
  <div className="relative bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 p-4 md:p-6 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-emerald-500/10 group border border-slate-700">
    {/* Binary Code Animation */}
    <div className="absolute inset-0 opacity-10 z-0">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxNiAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOCAxOFYyTTIgMTBINk0xNCAxMEgxME0yIDE0SDFNMTUgMTRIMTBMMTQgNkgxMFYxNEg2VjZIMiIgc3Ryb2tlPSIjM0I0RDUxIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=')] opacity-20 animate-binary-stream"></div>
    </div>

    {/* Circuit Board Pattern */}
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xLjUgMS41TDMgM00zIDVMNSA1TTUgM0w2LjUgMS41IiBzdHJva2U9IiMzQjRENTEiIHN0cm9rZS13aWR0aD0iLjUiLz48L3N2Zz4=')] opacity-10 z-0"></div>

    <div className="relative z-10 space-y-6 max-w-7xl mx-auto">
      {/* Industrial Header */}
      <div className="text-center space-y-4 pb-6 border-b border-slate-700 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 pb-2 inline-block relative">
          {title || 'Bro Budget Alpha'}
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/50 to-cyan-500/50 rounded-full"></span>
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <div className="px-3 py-1.5 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-700 shadow-sm">
            <p className="text-sm md:text-base text-emerald-400 font-medium tracking-wider">
              {budgetState.monthYear}
            </p>
          </div>
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/90 rounded-2xl backdrop-blur-sm border border-slate-700 shadow-lg hover:shadow-emerald-500/20 transition-shadow">
            <span className="text-2xl md:text-3xl font-bold text-emerald-300">
              {formatCurrency(budgetState.totalBudget, budgetState.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Brutalist Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {budgetState.categories.map((category) => {
          const allocatedAmount = category.type === 'percentage'
            ? (category.amount / 100) * budgetState.totalBudget
            : category.amount;
          const totalExpenses = category.expenses.reduce((acc, expense) => acc + expense.amount, 0);
          const remainingPercentage = ((allocatedAmount - totalExpenses) / allocatedAmount) * 100;

          return (
            <div key={category.id} 
                 className="group bg-slate-800/90 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-slate-700 
                          transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg relative overflow-hidden">
              {/* Category Badge */}
              <div className="absolute top-3 right-3 bg-slate-900 text-emerald-400 text-xs font-bold uppercase px-2 py-1 rounded-full border border-emerald-500/30">
                {category.type === 'percentage' ? '%' : 'FIXED'}
              </div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg md:text-xl font-semibold text-gray-300 group-hover:text-white flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  {category.name}
                </h3>
                <div className="text-right">
                  <span className="text-sm md:text-base text-emerald-400 font-mono">
                    {category.type === 'percentage'
                      ? `${category.amount}% (${formatCurrency(allocatedAmount, budgetState.currency)})`
                      : formatCurrency(allocatedAmount, budgetState.currency)}
                  </span>
                </div>
              </div>

              {/* Steel Progress Bar */}
              <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden mb-4 shadow-inner">
                <div
                  className="absolute h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${(allocatedAmount / budgetState.totalBudget) * 100}%`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
                </div>
              </div>

              {/* Expense List - Military Style */}
              <div className="space-y-2 mb-4">
                {category.expenses.map((expense) => (
                  <div key={expense.id} 
                       className="flex items-center justify-between p-2 rounded-lg bg-slate-900/50 
                                transition-all duration-200 hover:bg-slate-700/50 hover:translate-x-1">
                    <span className="text-sm md:text-base text-gray-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-70"></span>
                      {expense.name}
                    </span>
                    <span className="text-sm md:text-base font-mono font-medium text-emerald-400">
                      {formatCurrency(expense.amount, budgetState.currency)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Budget Status - Dashboard Style */}
              <div className="pt-4 border-t border-slate-700 space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-2 bg-slate-900/50 rounded-lg text-center">
                    <p className="text-xs text-gray-400 mb-1">Allocated</p>
                    <p className="text-sm font-bold text-emerald-400">
                      {formatCurrency(allocatedAmount, budgetState.currency)}
                    </p>
                  </div>
                  <div className="p-2 bg-slate-900/50 rounded-lg text-center">
                    <p className="text-xs text-gray-400 mb-1">Remaining</p>
                    <p className={`text-sm font-bold ${remainingPercentage > 20 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {formatCurrency(allocatedAmount - totalExpenses, budgetState.currency)}
                    </p>
                  </div>
                </div>
                <div className="relative pt-2">
                  <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-600 to-cyan-500 transition-all duration-500"
                      style={{
                        width: `${100 - (totalExpenses / allocatedAmount) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tactical Summary Section */}
      <div className="bg-slate-800/90 backdrop-blur-sm p-5 rounded-xl border-2 border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              title: 'Total Firepower', 
              value: budgetState.categories.reduce((acc, cat) => acc + 
                (cat.type === 'percentage' ? 
                  (cat.amount / 100) * budgetState.totalBudget : 
                  cat.amount), 0),
              icon: '💪'
            },
            { 
              title: 'Ammo Spent', 
              value: budgetState.categories.reduce((acc, cat) => acc + cat.expenses.reduce((a, e) => a + e.amount, 0), 0),
              icon: '🏋️'
            },
            { 
              title: 'Remaining Fuel', 
              value: budgetState.totalBudget - budgetState.categories.reduce((acc, cat) => acc + cat.expenses.reduce((a, e) => a + e.amount, 0), 0),
              icon: '🚀'
            }
          ].map((stat, index) => (
            <div key={index} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 text-4xl text-slate-700/50 z-0">{stat.icon}</div>
              <div className="relative z-10">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{stat.title}</p>
                <p className="text-lg md:text-xl font-bold text-emerald-400 font-mono">
                  {formatCurrency(stat.value, budgetState.currency)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industrial Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-700">
        {logo && (
          <div className="relative w-12 h-12 transform hover:scale-105 transition-transform group">
            <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-md group-hover:blur-lg transition-all"></div>
            <Image
              src={logo}
              alt="Logo"
              fill
              className="rounded-full object-cover border-2 border-slate-700 hover:border-emerald-500/50 z-10"
            />
          </div>
        )}
        <div className="text-right">
          <p className="text-sm text-gray-400 font-mono">CRUSH YOUR FINANCIAL GOALS 💪</p>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Powered by <span className="text-emerald-400">Kardify</span>
          </p>
        </div>
      </div>
    </div>
  </div>
)}

{selectedVariant === 'budget' && selectedVariantStyle === 'style4' && (
  <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-teal-500/10">
    {/* Animated Background Elements */}
    <div className="absolute inset-0 bg-grid-gray-700/10 z-0 opacity-20"></div>
    <div className="absolute -top-20 -right-20 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl z-0 animate-pulse-slow"></div>
    <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl z-0 animate-pulse-slow delay-1000"></div>

    <div className="relative z-10 space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center space-y-4 pb-6 border-b border-gray-700/50">
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-300">
          {title || 'Bro Budget'}
        </h2>
        <p className="text-sm md:text-base text-gray-400 font-medium tracking-wider">
          {budgetState.monthYear}
        </p>
        <div className="inline-flex items-center px-6 py-3 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700/50">
          <span className="text-2xl md:text-3xl font-bold text-teal-300">
            {formatCurrency(budgetState.totalBudget, budgetState.currency)}
          </span>
        </div>
      </div>

      {/* Interactive Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {budgetState.categories.map((category) => {
          const allocatedAmount = category.type === 'percentage'
            ? (category.amount / 100) * budgetState.totalBudget
            : category.amount;
          const totalExpenses = category.expenses.reduce((acc, expense) => acc + expense.amount, 0);
          const remainingPercentage = ((allocatedAmount - totalExpenses) / allocatedAmount) * 100;

          return (
            <div key={category.id} 
                 className="group bg-gray-800/50 backdrop-blur-sm p-4 md:p-5 rounded-xl border border-gray-700/50 
                          transition-all duration-300 hover:bg-gray-800/70 hover:border-teal-500/30">
              {/* Category Ribbon */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg md:text-xl font-semibold text-teal-200 group-hover:text-teal-100">
                  {category.name}
                </h3>
                <div className="text-right">
                  <span className="text-sm md:text-base text-gray-300 font-medium">
                    {category.type === 'percentage'
                      ? `${category.amount}% (${formatCurrency(allocatedAmount, budgetState.currency)})`
                      : formatCurrency(allocatedAmount, budgetState.currency)}
                  </span>
                </div>
              </div>

              {/* 3D Progress Bar */}
              <div className="relative h-2 bg-gray-700/50 rounded-full overflow-hidden mb-4">
                <div
                  className="absolute h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${(allocatedAmount / budgetState.totalBudget) * 100}%`,
                  }}
                />
              </div>

              {/* Expense List with Hover Effects */}
              <div className="space-y-2 mb-4">
                {category.expenses.map((expense) => (
                  <div key={expense.id} 
                       className="flex items-center justify-between p-2 rounded-lg bg-gray-900/30 
                                transition-colors hover:bg-gray-900/50">
                    <span className="text-sm md:text-base text-gray-300">{expense.name}</span>
                    <span className="text-sm md:text-base font-medium text-teal-300">
                      {formatCurrency(expense.amount, budgetState.currency)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Budget Status Indicators */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-700/50">
                <span className="text-sm text-gray-400">Remaining</span>
                <span className={`text-sm font-medium ${remainingPercentage > 20 ? 'text-teal-300' : 'text-red-400'}`}>
                  {formatCurrency(allocatedAmount - totalExpenses, budgetState.currency)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Glowing Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: 'Total Allocated',
            value: budgetState.categories.reduce(
              (acc, cat) =>
                acc +
                (cat.type === 'percentage'
                  ? (cat.amount / 100) * budgetState.totalBudget
                  : cat.amount),
              0
            ),
            icon: '💰',
          },
          {
            title: 'Total Spent',
            value: budgetState.categories.reduce(
              (acc, cat) => acc + cat.expenses.reduce((a, e) => a + e.amount, 0),
              0
            ),
            icon: '💸',
          },
          {
            title: 'Budget Remaining',
            value:
              budgetState.totalBudget -
              budgetState.categories.reduce(
                (acc, cat) => acc + cat.expenses.reduce((a, e) => a + e.amount, 0),
                0
              ),
            icon: '🎯',
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 flex flex-col items-center justify-center space-y-2"
          >
            <span className="text-2xl text-teal-300">{stat.icon}</span>
            <span className="text-sm text-gray-400 font-medium">{stat.title}</span>
            <span className="text-lg md:text-xl font-bold text-teal-300">
              {formatCurrency(stat.value, budgetState.currency)}
            </span>
          </div>
        ))}
      </div>

      {/* Animated Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
        {logo && (
          <div className="relative w-12 h-12 transform hover:scale-105 transition-transform">
            <Image
              src={logo}
              alt="Logo"
              fill
              className="rounded-full object-cover border-2 border-gray-700 hover:border-teal-500/50"
            />
          </div>
        )}
        <div className="text-right">
          <p className="text-sm text-gray-400">Manage your budget like a pro</p>
          <p className="text-sm font-medium text-teal-300">Powered by Kardify</p>
        </div>
      </div>
    </div>
  </div>
)}


{/* Budget Card Display End */}

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

      {/* Resume Card Display Start */}
        
            {selectedVariant === 'resume' && selectedVariantStyle === 'default' && (
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
                  {bio && (
              <div className="w-full max-w-2xl text-left space-y-2">
                {/* <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.bio }}>
                    About Me:
                </h3> */}
                <p className="text-sm md:text-base" style={{ color: textColors.bio }}>
                  {bio}
                </p>
              </div>
            )}

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
                    {experience.jobDescriptions.length > 0 && (
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold" style={{ color: textColors.jobDescriptions }}>
                          Job Descriptions:
                        </h4>
                        <ul className="list-disc pl-5 space-y-2">
                          {experience.jobDescriptions.map((desc, descIndex) => (
                            <li key={descIndex} className="text-sm md:text-base" style={{ color: textColors.jobDescriptions }}>
                              {desc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
                  <div key={index} className="space-y-2 bg-white/80 p-4 pt-2 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-base md:text-lg" style={{ color: textColors.institution }}>
                        {edu.institution}
                      </p>
                      <p className="text-sm md:text-base" style={{ color: textColors.gradYear }}>
                        {edu.gradYear}
                      </p>
                    </div>
                    <p className="text-sm md:text-base italic" style={{ color: textColors.degree }}>
                      {edu.degree}
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

            {selectedVariant === 'resume' && selectedVariantStyle === 'style1' && (
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
                <div className="relative z-10 flex flex-col gap-8 text-left">
                  {/* Profile Picture */}
                  {profilePicture && (
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg overflow-hidden">
                      <img src={typeof profilePicture === 'string' ? profilePicture : URL.createObjectURL(profilePicture)} alt="Profile Picture" className="w-full h-full object-cover" />
                    </div>
                  )}
                  {/* Full Name and Job Title */}
                  <div>
                    {fullName && (
                      <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: textColors.fullName }}>
                        {fullName}
                      </h2>
                    )}
                    {jobTitle && (
                      <p className="text-xl md:text-2xl font-light mt-1" style={{ color: textColors.jobTitle }}>
                        {jobTitle}
                      </p>
                    )}
                  </div>
                  {/* Contact Information */}
                  <div className="space-y-2 text-sm md:text-base">
                    {email && (
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Email:</span>
                        <a href={`mailto:${email}`} className="underline hover:text-blue-500 transition-colors" style={{ color: textColors.email }}>
                          {email}
                        </a>
                      </p>
                    )}
                    {phone && (
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Phone:</span>
                        <span style={{ color: textColors.phone }}>{phone}</span>
                      </p>
                    )}
                    {location && (
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Location:</span>
                        <span style={{ color: textColors.location }}>{location}</span>
                      </p>
                    )}
                  </div>
                  {/* Bio */}
                  {bio && (
                    <div className="space-y-2">
                      <p className="text-sm md:text-base" style={{ color: textColors.bio }}>
                        {bio}
                      </p>
                    </div>
                  )}
                  {/* Skills, Work Experience, Education, Hobbies */}
                  <div className="space-y-4">
                    {skills.length > 0 && (
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.skills }}>
                          Skills
                        </h3>
                        <ul className="flex flex-wrap gap-2 text-sm md:text-base">
                          {skills.map((skill, index) => (
                            <li key={index} className="px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full shadow-md" style={{ color: textColors.skills }}>
                              {skill.value.trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {workExperience.length > 0 && (
                      <div>
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
                            {experience.jobDescriptions.length > 0 && (
                              <div className="space-y-1">
                                <ul className="list-disc pl-5 space-y-2">
                                  {experience.jobDescriptions.map((desc, descIndex) => (
                                    <li key={descIndex} className="text-sm md:text-base" style={{ color: textColors.jobDescriptions }}>
                                      {desc}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {education.length > 0 && (
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.education }}>
                          Education
                        </h3>
                        {education.map((edu, index) => (
                          <div key={index} className="space-y-2 bg-white/80 p-4 pt-2 rounded-xl shadow-lg">
                            <div className="flex justify-between items-center">
                              <p className="font-medium text-base md:text-lg" style={{ color: textColors.institution }}>
                                {edu.institution}
                              </p>
                              <p className="text-sm md:text-base" style={{ color: textColors.gradYear }}>
                                {edu.gradYear}
                              </p>
                            </div>
                            <p className="text-sm md:text-base italic" style={{ color: textColors.degree }}>
                              {edu.degree}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    {hobbies.length > 0 && (
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.hobbies }}>
                          Hobbies
                        </h3>
                        <p className="text-sm md:text-base" style={{ color: textColors.hobbies }}>
                          {hobbies.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {selectedVariant === 'resume' && selectedVariantStyle === 'style2' && (
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
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Profile */}
                  <div className="space-y-4">
                    {/* Profile Picture */}
                    {profilePicture && (
                      <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg overflow-hidden mx-auto">
                        <img src={typeof profilePicture === 'string' ? profilePicture : URL.createObjectURL(profilePicture)} alt="Profile Picture" className="w-full h-full object-cover" />
                      </div>
                    )}
                    {/* Full Name and Job Title */}
                    <div>
                      {fullName && (
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center" style={{ color: textColors.fullName }}>
                          {fullName}
                        </h2>
                      )}
                      {jobTitle && (
                        <p className="text-xl md:text-2xl font-light mt-1 text-center" style={{ color: textColors.jobTitle }}>
                          {jobTitle}
                        </p>
                      )}
                    </div>
                    {/* Contact Information */}
                    <div className="space-y-2 text-sm md:text-base">
                      {email && (
                        <p className="flex items-center justify-center gap-2">
                          <span className="font-medium">Email:</span>
                          <a href={`mailto:${email}`} className="underline hover:text-blue-500 transition-colors" style={{ color: textColors.email }}>
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
                    {/* Bio */}
                    {bio && (
                      <div className="space-y-2">
                        <p className="text-sm md:text-base" style={{ color: textColors.bio }}>
                          {bio}
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Right Column: Sections */}
                  <div className="space-y-4">
                    {skills.length > 0 && (
                      <div className="bg-white/80 p-4 rounded-xl shadow-lg">
                        <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.skills }}>
                          Skills
                        </h3>
                        <ul className="flex flex-wrap gap-2 text-sm md:text-base">
                          {skills.map((skill, index) => (
                            <li key={index} className="px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full shadow-md" style={{ color: textColors.skills }}>
                              {skill.value.trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {workExperience.length > 0 && (
                      <div className="bg-white/80 p-4 rounded-xl shadow-lg">
                        <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.workExperience }}>
                          Work Experience
                        </h3>
                        {workExperience.map((experience, index) => (
                          <div key={index} className="space-y-2">
                            <p className="font-medium text-base md:text-lg" style={{ color: textColors.companyName }}>
                              {experience.companyName}
                            </p>
                            <p className="text-sm md:text-base italic" style={{ color: textColors.role }}>
                              {experience.role}
                            </p>
                            <p className="text-sm md:text-base" style={{ color: textColors.duration }}>
                              {experience.duration}
                            </p>
                            {experience.jobDescriptions.length > 0 && (
                              <div className="space-y-1">
                                <ul className="list-disc pl-5 space-y-2">
                                  {experience.jobDescriptions.map((desc, descIndex) => (
                                    <li key={descIndex} className="text-sm md:text-base" style={{ color: textColors.jobDescriptions }}>
                                      {desc}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {education.length > 0 && (
                      <div className="bg-white/80 p-4 rounded-xl shadow-lg">
                        <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.education }}>
                          Education
                        </h3>
                        {education.map((edu, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="font-medium text-base md:text-lg" style={{ color: textColors.institution }}>
                                {edu.institution}
                              </p>
                              <p className="text-sm md:text-base" style={{ color: textColors.gradYear }}>
                                {edu.gradYear}
                              </p>
                            </div>
                            <p className="text-sm md:text-base italic" style={{ color: textColors.degree }}>
                              {edu.degree}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    {hobbies.length > 0 && (
                      <div className="bg-white/80 p-4 rounded-xl shadow-lg">
                        <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.hobbies }}>
                          Hobbies
                        </h3>
                        <p className="text-sm md:text-base" style={{ color: textColors.hobbies }}>
                          {hobbies.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {selectedVariant === 'resume' && selectedVariantStyle === 'style3' && (
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
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg overflow-hidden">
                      <img src={typeof profilePicture === 'string' ? profilePicture : URL.createObjectURL(profilePicture)} alt="Profile Picture" className="w-full h-full object-cover" />
                    </div>
                  )}
                  {/* Full Name and Job Title */}
                  <div>
                    {fullName && (
                      <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: textColors.fullName }}>
                        {fullName}
                      </h2>
                    )}
                    {jobTitle && (
                      <p className="text-xl md:text-2xl font-light mt-1" style={{ color: textColors.jobTitle }}>
                        {jobTitle}
                      </p>
                    )}
                  </div>
                  {/* Contact Information */}
                  <div className="space-y-2 text-sm md:text-base">
                    {email && (
                      <p className="flex items-center justify-center gap-2">
                        <span className="font-medium">Email:</span>
                        <a href={`mailto:${email}`} className="underline hover:text-blue-500 transition-colors" style={{ color: textColors.email }}>
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
                  {/* Bio */}
                  {bio && (
                    <div className="w-full max-w-2xl text-left space-y-2">
                      <p className="text-sm md:text-base" style={{ color: textColors.bio }}>
                        {bio}
                      </p>
                    </div>
                  )}
                  {/* Skills, Work Experience, Education, Hobbies */}
                  <div className="w-full max-w-2xl text-left space-y-4">
                    {skills.length > 0 && (
                      <div className="bg-white/80 p-4 rounded-xl shadow-lg">
                        <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.skills }}>
                          Skills
                        </h3>
                        <ul className="flex flex-wrap justify-center gap-2 text-sm md:text-base">
                          {skills.map((skill, index) => (
                            <li key={index} className="px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full shadow-md" style={{ color: textColors.skills }}>
                              {skill.value.trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {workExperience.length > 0 && (
                      <div className="bg-white/80 p-4 rounded-xl shadow-lg">
                        <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.workExperience }}>
                          Work Experience
                        </h3>
                        {workExperience.map((experience, index) => (
                          <div key={index} className="space-y-2">
                            <p className="font-medium text-base md:text-lg" style={{ color: textColors.companyName }}>
                              {experience.companyName}
                            </p>
                            <p className="text-sm md:text-base italic" style={{ color: textColors.role }}>
                              {experience.role}
                            </p>
                            <p className="text-sm md:text-base" style={{ color: textColors.duration }}>
                              {experience.duration}
                            </p>
                            {experience.jobDescriptions.length > 0 && (
                              <div className="space-y-1">
                                <ul className="list-disc pl-5 space-y-2">
                                  {experience.jobDescriptions.map((desc, descIndex) => (
                                    <li key={descIndex} className="text-sm md:text-base" style={{ color: textColors.jobDescriptions }}>
                                      {desc}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {education.length > 0 && (
                      <div className="bg-white/80 p-4 rounded-xl shadow-lg">
                        <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.education }}>
                          Education
                        </h3>
                        {education.map((edu, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="font-medium text-base md:text-lg" style={{ color: textColors.institution }}>
                                {edu.institution}
                              </p>
                              <p className="text-sm md:text-base" style={{ color: textColors.gradYear }}>
                                {edu.gradYear}
                              </p>
                            </div>
                            <p className="text-sm md:text-base italic" style={{ color: textColors.degree }}>
                              {edu.degree}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    {hobbies.length > 0 && (
                      <div className="bg-white/80 p-4 rounded-xl shadow-lg">
                        <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.hobbies }}>
                          Hobbies
                        </h3>
                        <p className="text-sm md:text-base" style={{ color: textColors.hobbies }}>
                          {hobbies.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

{selectedVariant === 'resume' && selectedVariantStyle === 'style4' && (
  <div
    className="relative min-h-[600px] p-4 md:p-6 bg-white/90 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl"
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
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg overflow-hidden">
          <img
            src={typeof profilePicture === 'string' ? profilePicture : URL.createObjectURL(profilePicture)}
            alt="Profile Picture"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Full Name */}
      {fullName && (
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase" style={{ color: textColors.fullName }}>
          {fullName}
        </h2>
      )}

      {/* Personal Details */}
      <div className="w-full max-w-9xl text-left space-y-4">
        {/* Date of Birth / Place of Birth */}
        {(dateOfBirth || placeOfBirth) && (
          <div className="bg-white/80 p-4 rounded-xl shadow-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.personalDetails }}>
              Personal Details
            </h3>
            <div className="space-y-2">
              {dateOfBirth && (
                <p className="text-sm md:text-base" style={{ color: textColors.dateOfBirth }}>
                  <span className="font-medium">Date of Birth:</span> {dateOfBirth}
                </p>
              )}
              {placeOfBirth && (
                <p className="text-sm md:text-base" style={{ color: textColors.placeOfBirth }}>
                  <span className="font-medium">Place of Birth:</span> {placeOfBirth}
                </p>
              )}
              {sex && (
                <p className="text-sm md:text-base" style={{ color: textColors.sex }}>
                  <span className="font-medium">Sex:</span> {sex}
                </p>
              )}
              {maritalStatus && (
                <p className="text-sm md:text-base" style={{ color: textColors.maritalStatus }}>
                  <span className="font-medium">Marital Status:</span> {maritalStatus}
                </p>
              )}
              {children.length > 0 && (
                <div>
                  <p className="font-medium text-sm md:text-base" style={{ color: textColors.children }}>
                    Children:
                  </p>
                  <ul className="list-disc pl-5">
                    {children.map((child, index) => (
                      <li key={index} className="text-sm md:text-base" style={{ color: textColors.children }}>
                        {child.name} (Age: {child.age})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {townStateOrigin && (
                <p className="text-sm md:text-base" style={{ color: textColors.townStateOrigin }}>
                  <span className="font-medium">Town/State of Origin:</span> {townStateOrigin}
                </p>
              )}
              {nationality && (
                <p className="text-sm md:text-base" style={{ color: textColors.nationality }}>
                  <span className="font-medium">Nationality:</span> {nationality}
                </p>
              )}
              {currentPostalAddress && (
                <p className="text-sm md:text-base" style={{ color: textColors.currentPostalAddress }}>
                  <span className="font-medium">Current Postal Address:</span> {currentPostalAddress}
                </p>
              )}
              {permanentHomeAddress && (
                <p className="text-sm md:text-base" style={{ color: textColors.permanentHomeAddress }}>
                  <span className="font-medium">Permanent Home Address:</span> {permanentHomeAddress}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div className="bg-white/80 p-4 grid grid-cols-1 rounded-xl shadow-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.workExperience }}>
              Work Experience
            </h3>
            {workExperience.map((experience, index) => (
              <div key={index} className="space-y-2">
                <p className="font-medium text-base md:text-xl " style={{ color: textColors.companyName }}>
                  {experience.companyName}
                </p>
                <p className="text-sm md:text-2xl font-bold italic" style={{ color: textColors.role }}>
                  {experience.role}
                </p>
                <p className="text-sm md:text-base" style={{ color: textColors.duration }}>
                  {experience.duration}
                </p>
                {experience.jobDescriptions.length > 0 && (
                  <div className="space-y-1">
                    <ul className="list-disc pl-5 space-y-2">
                      {experience.jobDescriptions.map((desc, descIndex) => (
                        <li key={descIndex} className="text-sm md:text-base" style={{ color: textColors.jobDescriptions }}>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="bg-white/80 p-4 grid grid-cols-2 gap-4 rounded-xl shadow-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.education }}>
              Academic Qualifications
            </h3>
            {education.map((edu, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-base md:text-lg" style={{ color: textColors.institution }}>
                    {edu.institution}
                  </p>
                  <p className="text-sm md:text-base" style={{ color: textColors.gradYear }}>
                    {edu.gradYear}
                  </p>
                </div>
                <p className="text-sm md:text-base italic" style={{ color: textColors.degree }}>
                  {edu.degree}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Academic Qualifications */}
        {/* {academicQualifications.length > 0 && (
          <div className="bg-white/80 p-4 rounded-xl shadow-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.academicQualifications }}>
              Academic Qualifications
            </h3>
            {academicQualifications.map((qualification, index) => (
              <div key={index} className="space-y-2">
                <p className="font-medium text-base md:text-lg" style={{ color: textColors.qualification }}>
                  {qualification.qualification}
                </p>
                <p className="text-sm md:text-base" style={{ color: textColors.qualificationDate }}>
                  {qualification.date}
                </p>
              </div>
            ))}
          </div>
        )} */}

        {/* Contact Information */}
        {(email || gsmNumber) && (
          <div className="bg-white/80 p-4 rounded-xl shadow-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.contactInfo }}>
              Contact Information
            </h3>
            <div className="space-y-2">
              {email && (
                <p className="text-sm md:text-base" style={{ color: textColors.email }}>
                  <span className="font-medium">Email:</span> {email}
                </p>
              )}
              {gsmNumber && (
                <p className="text-sm md:text-base" style={{ color: textColors.gsmNumber }}>
                  <span className="font-medium">GSM Number:</span> {gsmNumber}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Present Employment */}
        {(presentEmployment.employer || presentEmployment.status || presentEmployment.salary) && (
          <div className="bg-white/80 p-4 rounded-xl shadow-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.presentEmployment }}>
              Present Employment
            </h3>
            <div className="space-y-2">
              {presentEmployment.employer && (
                <p className="text-sm md:text-base" style={{ color: textColors.employer }}>
                  <span className="font-medium">Employer:</span> {presentEmployment.employer}
                </p>
              )}
              {presentEmployment.status && (
                <p className="text-sm md:text-base" style={{ color: textColors.status }}>
                  <span className="font-medium">Status:</span> {presentEmployment.status}
                </p>
              )}
              {presentEmployment.salary && (
                <p className="text-sm md:text-base" style={{ color: textColors.salary }}>
                  <span className="font-medium">Salary:</span> {presentEmployment.salary}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Extra Curriculum Activities */}
        {extraCurriculumActivities.length > 0 && (
          <div className="bg-white/80 p-4 rounded-xl shadow-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.extraCurriculumActivities }}>
              Extra Curriculum Activities
            </h3>
            <p className="text-sm md:text-base" style={{ color: textColors.extraCurriculumActivities }}>
              {extraCurriculumActivities.join(', ')}
            </p>
          </div>
        )}

        {/* Referees */}
        {referees.length > 0 && (
          <div className="bg-white/80 grid grid-cols-2 gap-4 p-4 rounded-xl shadow-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-2" style={{ color: textColors.referees }}>
              Referees
            </h3>
            {referees.map((referee, index) => (
              <div key={index} className="space-y-2">
                <p className="font-medium text-base md:text-lg" style={{ color: textColors.refereeName }}>
                  {referee.name}
                </p>
                <p className="text-sm md:text-base" style={{ color: textColors.refereeAddress }}>
                  <span className="font-medium">Address:</span> {referee.address}
                </p>
                <p className="text-sm md:text-base" style={{ color: textColors.refereeGsmNumber }}>
                  <span className="font-medium">GSM Number:</span> {referee.gsmNumber}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
)}

      {/* Resume Card Display End */}

      {selectedVariant === 'timetable' && selectedVariantStyle === 'default' && (
  <div className="space-y-6 bg-gradient-to-br from-white/90 to-blue-50/50 backdrop-blur-xl rounded-2xl p-4 shadow-lg shadow-blue-100/50">
    {/* Header Section */}
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent">
          {title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <GlobeAltIcon className="w-5 h-5 text-blue-600" />
          <span>{timetableState.timeZone}</span>
          <span className="text-blue-500 mx-1">•</span>
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          <span>
            {scheduleType.charAt(0).toUpperCase() + scheduleType.slice(1)}
          </span>
        </div>
      </div>
      <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
        <p className="text-sm font-semibold text-slate-700">
          Total Events:{' '}
          {Object.values(timetableState.days).reduce((acc, day) => acc + day.events.length, 0)}
        </p>
      </div>
    </header>

    {/* Days Grid */}
    <div className="grid md:grid-cols-5 grid-cols-1 gap-4">
      {Object.entries(timetableState.days).map(([dayName, day]) => (
        <article
          key={day.id}
          className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200"
        >
          {/* Day Header */}
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-1">
                {scheduleType === 'daily' || scheduleType === 'monthly'
                  ? new Date(day.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })
                  : dayName}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {day.date &&
                  new Date(day.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
              </p>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
              {day.events.length}
            </span>
          </div>

          {/* Events List */}
          <div className="space-y-3">
            {day.events.map((event) => (
              <div
                key={event.id}
                className="group relative bg-white p-3 rounded-lg border border-slate-100 hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-slate-800">{event.name}</h4>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {calculateDuration(event.startTime, event.endTime)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <ClockIcon className="w-4 h-4 text-blue-500" />
                    <time dateTime={`${event.startTime}-${event.endTime}`}>
                      {formatTime(event.startTime)} – {formatTime(event.endTime)}
                    </time>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <MapPinIcon className="w-4 h-4 text-blue-500" />
                      <span>{event.location}</span>
                    </div>
                  )}

                  {/* Timeline Visualization */}
                  <div className="mt-2 relative">
                    <div className="h-1 bg-slate-100 rounded-full">
                      <div
                        className="absolute h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                        style={{
                          width: `${calculateDurationPercentage(event.startTime, event.endTime)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {day.events.length === 0 && (
              <div className="text-center py-4">
                <div className="inline-flex flex-col items-center">
                  <SunIcon className="w-6 h-6 text-slate-400 mb-2" />
                  <p className="text-slate-400 font-medium">Free day!</p>
                  <p className="text-slate-400 text-xs">No events scheduled</p>
                </div>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  </div>
)}

{selectedVariant === 'timetable' && selectedVariantStyle === 'style1' && (
  <div className="space-y-6 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg shadow-blue-100/50">
    {/* Header Section */}
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">
          {title || "Timetable"}
        </h1>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <GlobeAltIcon className="w-5 h-5 text-blue-600" />
          <span>{timetableState.timeZone || "UTC"}</span>
          <span className="text-blue-500 mx-1">•</span>
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          <span>
            {scheduleType.charAt(0).toUpperCase() + scheduleType.slice(1) || "Weekly"}
          </span>
        </div>
      </div>
      <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
        <p className="text-sm font-semibold text-slate-700">
          Total Events:{' '}
          {Object.values(timetableState.days || {}).reduce((acc, day) => acc + (day.events?.length || 0), 0)}
        </p>
      </div>
    </header>

    {/* Days Grid */}
    <div className="grid grid-cols-1  gap-4">
      {Object.entries(timetableState.days || {}).map(([dayName, day]) => (
        <article
          key={day.id}
          className="bg-white border border-slate-200 rounded-lg p-2 shadow-md hover:shadow-lg transition-all duration-200"
        >
          {/* Day Header */}
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-1">
                {scheduleType === 'daily' || scheduleType === 'monthly'
                  ? new Date(day.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })
                  : dayName}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {day.date &&
                  new Date(day.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
              </p>
            </div>
            <span className="text-xs font-medium text-slate-700">
              {day.events?.length || 0} Event{day.events?.length !== 1 && 's'}
            </span>
          </div>

          {/* Events List */}
          {day.events?.length > 0 ? (
            <ul className="space-y-2">
              {day.events.map((event) => (
                <li
                  key={event.id}
                  className="flex justify-between items-center p-2 bg-slate-50 rounded-md shadow-sm"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-800">{event.name}</span>
                    <time className="text-xs text-slate-500">
                      {formatTime(event.startTime)} – {formatTime(event.endTime)}
                    </time>
                  </div>
                  <span className="text-xs flex items-center justify-center font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {calculateDuration(event.startTime, event.endTime)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-4 text-slate-400">
              <SunIcon className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium">No Events Today</p>
            </div>
          )}
        </article>
      ))}
    </div>
  </div>
)}

{selectedVariant === 'timetable' && selectedVariantStyle === 'style2' && (
  <div className="space-y-6 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg shadow-blue-100/50">
    {/* Header Section */}
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-slate-900">{title || "Timetable"}</h1>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <GlobeAltIcon className="w-4 h-4 text-blue-600" />
          <span>{timetableState.timeZone || "UTC"}</span>
          <span className="text-blue-500 mx-1">•</span>
          <CalendarIcon className="w-4 h-4 text-blue-600" />
          <span>
            {scheduleType.charAt(0).toUpperCase() + scheduleType.slice(1) || "Weekly"}
          </span>
        </div>
      </div>
      <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
        <p className="text-sm font-semibold text-slate-700">
          Total Events:{' '}
          {Object.values(timetableState.days || {}).reduce((acc, day) => acc + (day.events?.length || 0), 0)}
        </p>
      </div>
    </header>

    {/* Days Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {Object.entries(timetableState.days || {}).map(([dayName, day]) => (
        <article
          key={day.id}
          className="bg-white border border-slate-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200"
        >
          {/* Day Header */}
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-1">
                {scheduleType === 'daily' || scheduleType === 'monthly'
                  ? new Date(day.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })
                  : dayName}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {day.date &&
                  new Date(day.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
              </p>
            </div>
            <span className="text-xs font-medium text-slate-700">
              {day.events?.length || 0} Event{day.events?.length !== 1 && 's'}
            </span>
          </div>

          {/* Events List */}
          {day.events?.length > 0 ? (
            <ul className="space-y-2">
              {day.events.map((event) => (
                <li
                  key={event.id}
                  className="flex flex-col p-2 bg-slate-50 rounded-md shadow-sm"
                >
                  {/* Event Name and Time */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-800">{event.name}</span>
                    <time className="text-xs text-slate-500">
                      {event.startTime} – {event.endTime}
                    </time>
                  </div>

                  {/* Event Duration Visualization */}
                  <div className="mt-1 h-2 bg-slate-100 rounded-full">
                    <div
                      className="h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
                      style={{
                        width: `${calculateDurationPercentage(event.startTime, event.endTime)}%`,
                      }}
                    />
                  </div>

                  {/* Optional Location */}
                  {event.location && (
                    <div className="flex items-center gap-1 text-xs text-slate-600 mt-1">
                      <MapPinIcon className="w-3 h-3 text-blue-500" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-4 text-slate-400">
              <SunIcon className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium">No Events Today</p>
            </div>
          )}
        </article>
      ))}
    </div>
  </div>
)}


{selectedVariant === 'timetable' && selectedVariantStyle === 'style3' && (
  <div className="bg-gradient-to-br from-yellow-100 to-pink-100 rounded-2xl p-4 shadow-lg shadow-orange-200/50">
    {/* Header Section */}
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
      <div>
        <h1 className="text-2xl font-extrabold text-blue-600">
          {title || "Class Schedule"}
        </h1>
        <div className="flex items-center gap-2 text-sm text-purple-600">
          <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-sm">
            {/* 🌍 {timetableState.timeZone || "UTC"} */}
          </span>
          <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-sm">
            📅 {scheduleType.charAt(0).toUpperCase() + scheduleType.slice(1) || "Weekly"}
          </span>
        </div>
      </div>
      <div className="bg-white flex items-center px-3 py-2 rounded-full shadow-lg border-2 border-dashed border-green-400">
        <p className="text-sm font-semibold text-pink-600">
          Activities: 
          {Object.values(timetableState.days || {}).reduce((acc, day) => acc + (day.events?.length || 0), 0)}
        </p>
      </div>
    </header>

    {/* Days Grid */}
    <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4">
      {Object.entries(timetableState.days || {}).map(([dayName, day]) => (
        <article
          key={day.id}
          className="bg-white border-2 border-dashed border-blue-300 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
        >
          {/* Day Header */}
          <div className="flex justify-between items-center p-2 border-b-2 border-purple-200">
            <div>
              <h3 className="text-base font-bold text-green-600">
                {scheduleType === 'daily' || scheduleType === 'monthly'
                  ? new Date(day.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })
                  : dayName}
              </h3>
              <p className="text-xs text-orange-500 font-medium">
                {day.date &&
                  new Date(day.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
              </p>
            </div>
            <span className="text-xs font-medium text-white bg-pink-500 px-2 py-1 rounded-full">
              {day.events?.length || 0} Events
            </span>
          </div>

          {/* Events List */}
          {day.events?.length > 0 ? (
            <ul className="divide-y divide-slate-100">
              {day.events.map((event) => (
                <li
                  key={event.id}
                  className="flex flex-col p-2 hover:bg-yellow-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-purple-700">{event.name}</span>
                    <time className="text-sm font-semibold text-blue-600">
                      {formatTime(event.startTime)} – {formatTime(event.endTime)}
                    </time>
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                      style={{
                        width: `${calculateDurationPercentage(event.startTime, event.endTime)}%`,
                      }}
                    />
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1 text-xs text-pink-600 mt-1">
                      <MapPinIcon className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-4 text-orange-400">
              <div className="text-2xl mb-2">🎉</div>
              <p className="font-bold text-base">No Events Today</p>
              <p className="text-sm">Enjoy your free time!</p>
            </div>
          )}
        </article>
      ))}
    </div>
  </div>
)}


{selectedVariant === 'pricelist' && selectedVariantStyle === 'default' && (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header Section */}
    <div className="text-center mb-12">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{title}</h2>
      <div className="flex items-center justify-center space-x-2">
        <span className="text-lg text-gray-600">{pricelistState.currency}</span>
        {pricelistState.calculatorLabel && (
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            {pricelistState.calculatorLabel}
          </button>
        )}
      </div>
      {pricelistState.calculatorNote && (
        <p className="mt-2 text-sm text-gray-500">{pricelistState.calculatorNote}</p>
      )}
    </div>
    
    {/* Pricing Tiers Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {pricelistState.tiers.map((tier) => (
        <div
          key={tier.id}
          className={`relative rounded-2xl ${
            tier.recommended 
              ? 'ring-4 ring-blue-500 shadow-xl scale-105 z-10 bg-white' 
              : 'ring-1 ring-gray-200 shadow-lg hover:shadow-xl bg-white/95'
          } transition-all duration-300 overflow-hidden`}
        >
          {tier.recommended && (
            <div className="absolute top-0 right-0 mt-4 mr-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                Popular Choice
              </span>
            </div>
          )}

          <div className="p-8">
            {/* Tier Header */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
              <p className="text-gray-500">{tier.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline mb-8">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                {pricelistState.currency} {tier.price.toFixed(2)}
              </span>
              <span className="ml-2 text-gray-500">/{tier.billingInterval}</span>
            </div>

            {/* Discount Badge */}
            {tier.discount && (
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {tier.discount}
                </span>
              </div>
            )}

            {/* Features List */}
            <ul className="space-y-4 mb-8">
              {tier.features.map((feature) => (
                <li key={feature.id} className="flex items-start">
                  <svg 
                    className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">{feature.text}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button className={`w-full py-3 px-6 rounded-xl font-medium transition-colors ${
              tier.recommended
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}>
              Choose {tier.name}
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Footer Note */}
    {pricelistState.calculatorNote && (
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">{pricelistState.calculatorNote}</p>
      </div>
    )}
  </div>
)}

{selectedVariant === 'pricelist' && selectedVariantStyle === 'style1' && (
  <div className="space-y-6 bg-white/80 backdrop-blur-md shadow-lg p-6 rounded-2xl">
    {/* Header Section */}
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">{title || "Our Pricing"}</h1>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CurrencyDollarIcon className="w-4 h-4 text-blue-600" />
          <span>Currency: {pricelistState.currency}</span>
          <span className="text-blue-500 mx-1">•</span>
          <TagIcon className="w-4 h-4 text-blue-600" />
          <span>{pricelistState.tiers.length} Pricing Tiers</span>
        </div>
      </div>
      <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
        <p className="text-sm font-semibold text-slate-700">
          Starting from{' '}
          {Math.min(...pricelistState.tiers.map((t) => t.price))
            .toLocaleString('en-US', {
              style: 'currency',
              currency: pricelistState.currency,
            })
            .replace(/^(.{1})(\d{3})/, '$1,$2')}
        </p>
      </div>
    </header>

    {/* Pricing Tiers Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pricelistState.tiers.map((tier) => (
        <article
          key={tier.id}
          className={`relative border rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 ${
            tier.recommended ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-white' : 'border-slate-200 bg-white'
          }`}
        >
          {/* Recommended Badge */}
          {tier.recommended && (
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              RECOMMENDED
            </div>
          )}

          {/* Tier Header */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h3>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-extrabold text-slate-900">
                {tier.price
                  .toLocaleString('en-US', {
                    style: 'currency',
                    currency: pricelistState.currency,
                  })
                  .replace(/^(.{1})(\d{3})/, '$1,$2')}
              </span>
              <span className="text-slate-500 font-medium">
                /{{
                  monthly: 'mo',
                  annual: 'yr',
                  'one-time': 'one-time',
                }[tier.billingInterval]}
              </span>
            </div>
            {tier.discount && (
              <p className="text-sm text-green-600 mt-2">
                🎁 {tier.discount} Discount
              </p>
            )}
          </div>

          {/* Features List */}
          {tier.description && (
            <p className="text-slate-600 mb-4">{tier.description}</p>
          )}
          <ul className="space-y-3 mb-8">
            {tier.features.map((feature) => (
              <li key={feature.id} className="flex items-center gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-700">{feature.text}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              tier.recommended
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            SELECT {tier.name.toUpperCase()}
          </button>
        </article>
      ))}
    </div>

    {/* Calculator Widget */}
    {pricelistState.enableCalculator && (
      <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          {pricelistState.calculatorLabel || "Price Calculator"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select className="p-2 rounded-lg border border-slate-300 bg-white w-full">
            {pricelistState.tiers.map((tier) => (
              <option key={tier.id} value={tier.id}>
                {tier.name} -{' '}
                {tier.price
                  .toLocaleString('en-US', {
                    style: 'currency',
                    currency: pricelistState.currency,
                  })
                  .replace(/^(.{1})(\d{3})/, '$1,$2')}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Enter Quantity"
            className="p-2 rounded-lg border border-slate-300 bg-white w-full"
          />
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition w-full">
            {pricelistState.calculatorLabel || "Calculate Total"}
          </button>
        </div>
        {pricelistState.calculatorNote && (
          <p className="text-slate-500 text-sm mt-3">
            * {pricelistState.calculatorNote}
          </p>
        )}
      </div>
    )}
  </div>
)}

{selectedVariant === 'pricelist' && selectedVariantStyle === 'style2' && (
  <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl overflow-hidden">
    {/* Animated background effects */}
    <div className="absolute inset-0 bg-grid-white/[0.05] animate-grid-fade"></div>
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
      <div className="w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
    </div>

    {/* Header */}
    <div className="relative text-center mb-12">
      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
        {title || "Pro Plans"}
      </h2>
      <div className="mt-4 flex justify-center gap-4">
        <span className="px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm">
          {pricelistState.currency} Pricing
        </span>
        {pricelistState.calculatorNote && (
          <span className="px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm">
            {pricelistState.calculatorNote}
          </span>
        )}
      </div>
    </div>

    {/* Pricing Grid */}
    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {pricelistState.tiers.map((tier) => (
        <div
          key={tier.id}
          className={`${
            tier.recommended 
              ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/50' 
              : 'bg-white/5 border-white/10 hover:border-white/20'
          } backdrop-blur-xl border rounded-xl p-6 transition-all duration-300`}
        >
          {/* Tier Label */}
          {tier.recommended && (
            <div className="absolute -top-3 right-4">
              <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white shadow-lg">
                Most Popular
              </span>
            </div>
          )}

          {/* Tier Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-white/60 text-sm">{tier.description}</p>
            </div>

            {/* Pricing */}
            <div className="flex items-end gap-2">
              <span className="text-4xl font-extrabold text-stone-50">
                {tier.price
                  .toLocaleString('en-US', {
                    style: 'currency',
                    currency: pricelistState.currency,
                  })
                  .replace(/^(.{1})(\d{3})/, '$1,$2')}
              </span>
              <span className="text-white/60 mb-1">/{tier.billingInterval}</span>
            </div>

            {/* Features */}
            <ul className="space-y-3">
              {tier.features.map((feature) => (
                <li key={feature.id} className="flex items-start gap-3 text-white/80">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>

            {/* Discount Badge */}
            {tier.discount && (
              <div className="py-2 px-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-green-400 text-sm font-medium">
                  {tier.discount}
                </p>
              </div>
            )}

            {/* CTA Button */}
            <button
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                tier.recommended
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Choose {tier.name}
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Calculator Widget */}
    {pricelistState.enableCalculator && (
      <div className="relative mt-12 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <h3 className="text-xl font-semibold text-white mb-6">
          {pricelistState.calculatorLabel || "Calculate Your Plan"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white">
            {pricelistState.tiers.map((tier) => (
              <option key={tier.id} value={tier.id} className="bg-gray-800">
                {tier.name} - {pricelistState.currency} {tier.price}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantity"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50"
          />
          <button className="w-full p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
            Calculate Total
          </button>
        </div>
      </div>
    )}
  </div>
)}

{selectedVariant === 'pricelist' && selectedVariantStyle === 'style3' && (
  <div className="space-y-6 bg-white/80 backdrop-blur-md shadow-lg p-6 rounded-2xl">
    {/* Header Section */}
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">{title || "Our Pricing"}</h1>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CurrencyDollarIcon className="w-4 h-4 text-blue-600" />
          <span>Currency: {pricelistState.currency}</span>
          <span className="text-blue-500 mx-1">•</span>
          <TagIcon className="w-4 h-4 text-blue-600" />
          <span>{pricelistState.tiers.length} Plans</span>
        </div>
      </div>
      <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
        <p className="text-sm font-semibold text-slate-700">
          Starting at{' '}
          {Math.min(...pricelistState.tiers.map((t) => t.price))
            .toLocaleString('en-US', {
              style: 'currency',
              currency: pricelistState.currency,
            })
            .replace(/^(.{1})(\d{3})/, '$1,$2')}
        </p>
      </div>
    </header>

    {/* Pricing Tiers Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pricelistState.tiers.map((tier) => (
        <article
          key={tier.id}
          className={`relative flex flex-col items-center justify-between border rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 ${
            tier.recommended ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200 bg-white'
          }`}
        >
          {/* Recommended Badge */}
          {tier.recommended && (
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              BEST VALUE
            </div>
          )}

          {/* Tier Image or Icon */}
          <div className="mb-6">
            <img
              src={"/12.jpg"}
              alt={`${tier.name} Plan`}
              className="w-20 h-20 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
          </div>

          {/* Price Section */}
          <div className="mb-6 text-center">
            <div className="flex items-end justify-center gap-2">
              <span className="text-4xl font-extrabold text-slate-900">
                {tier.price
                  .toLocaleString('en-US', {
                    style: 'currency',
                    currency: pricelistState.currency,
                  })
                  .replace(/^(.{1})(\d{3})/, '$1,$2')}
              </span>
              <span className="text-slate-500 font-medium">
                /{{
                  monthly: 'mo',
                  annual: 'yr',
                  'one-time': 'one-time',
                }[tier.billingInterval]}
              </span>
            </div>
            {tier.discount && (
              <p className="text-sm text-green-600 mt-2">
                🎁 {tier.discount} Discount
              </p>
            )}
          </div>

          {/* Features List */}
          <ul className="space-y-3 mb-8 w-full text-left">
            {tier.features.map((feature) => (
              <li key={feature.id} className="flex items-center gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-700">{feature.text}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              tier.recommended
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            GET {tier.name.toUpperCase()}
          </button>
        </article>
      ))}
    </div>

    {/* Calculator Widget */}
    {pricelistState.enableCalculator && (
      <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          {pricelistState.calculatorLabel || "Price Calculator"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select className="p-2 rounded-lg border border-slate-300 bg-white w-full">
            {pricelistState.tiers.map((tier) => (
              <option key={tier.id} value={tier.id}>
                {tier.name} -{' '}
                {tier.price
                  .toLocaleString('en-US', {
                    style: 'currency',
                    currency: pricelistState.currency,
                  })
                  .replace(/^(.{1})(\d{3})/, '$1,$2')}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Enter Quantity"
            className="p-2 rounded-lg border border-slate-300 bg-white w-full"
          />
          <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition w-full">
            {pricelistState.calculatorLabel || "Calculate Total"}
          </button>
        </div>
        {pricelistState.calculatorNote && (
          <p className="text-slate-500 text-sm mt-3">
            * {pricelistState.calculatorNote}
          </p>
        )}
      </div>
    )}
  </div>
)}



    {/* idcard Display Start */}

        {selectedVariant === 'idCard' && selectedVariantStyle === 'default' && (
            <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-4 rounded-2xl rounded-b-md shadow-2xl border border-slate-700/30 max-w-full mx-auto overflow-hidden">
              {/* Background Decorations */}
              <div className="absolute inset-0 bg-grid-slate-700/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-tr from-slate-700/30 to-transparent rounded-full blur-3xl"></div>

              {/* Card Content */}
              <div className="relative z-10 space-y-4">
                {/* Header */}
                <div className="flex justify-center items-center w-full">
                  <div className="flex items-center">
                    {logo && (
                      <div className="relative w-16 h-16">
                        <Image src={logo} alt="Logo" fill className="object-contain rounded-full" />
                      </div>
                    )}
                    <div>
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
                        <p className="text-stone-50/80 text-[11px] text-center rounded-xl font-semibold">ID Number</p>
                        <p className="font-medium text-stone-50/90 bg-slate-800 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.idNumber || 'XXXX-XXXX'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-stone-50/80 text-[11px] text-center rounded-xl font-semibold">Issue Date</p>
                        <p className="font-medium text-stone-50/90 bg-slate-800 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.issueDate || 'MM/DD/YYYY'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-stone-50/80 text-[11px] text-center rounded-xl font-semibold">Expiry Date</p>
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

      {selectedVariant === 'idCard' && selectedVariantStyle === 'style1' && (
        <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-4 rounded-2xl shadow-2xl border border-slate-700/30 max-w-full mx-auto overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute inset-0 bg-grid-slate-700/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-tr from-slate-700/30 to-transparent rounded-full blur-3xl"></div>

          {/* Card Content */}
          <div className="relative z-10 space-y-4">
            {/* Header */}
            <div className="flex justify-center items-center w-full">
              <div className="flex items-center">
                {logo && (
                  <div className="relative w-16 h-16">
                    <Image src={logo} alt="Logo" fill className="object-contain rounded-full" />
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-center text-indigo-400 tracking-wider">IDENTIFICATION CARD</h3>
                  <p className="text-xs text-center text-slate-400">Valid until {idCardDetails.expiryDate || 'MM/DD/YYYY'}</p>
                </div>
              </div>
            </div>

            {/* Main Details Section */}
            <div className="space-y-4">
              {/* Name & Department */}
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-white">{idCardDetails.name || 'Full Name'}</h2>
                <p className="text-lg text-indigo-300">{idCardDetails.department || 'Department'}</p>
              </div>
              {/* Additional Details */}
              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="text-stone-50/80 text-[11px] text-center rounded-xl font-semibold">ID Number</p>
                  <p className="font-medium text-stone-50/90 bg-slate-800 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.idNumber || 'XXXX-XXXX'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-stone-50/80 text-[11px] text-center rounded-xl font-semibold">Issue Date</p>
                  <p className="font-medium text-stone-50/90 bg-slate-800 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.issueDate || 'MM/DD/YYYY'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-stone-50/80 text-[11px] text-center rounded-xl font-semibold">Expiry Date</p>
                  <p className="font-medium text-stone-50/90 bg-slate-800 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.expiryDate || 'MM/DD/YYYY'}</p>
                </div>
              </div>

              {/* Profile Picture & QR Code */}
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

      {selectedVariant === 'idCard' && selectedVariantStyle === 'style2' && (
        <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-4 rounded-2xl shadow-2xl border border-slate-700/30 max-w-full mx-auto overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute inset-0 bg-grid-slate-700/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-tr from-slate-700/30 to-transparent rounded-full blur-3xl"></div>

          {/* Card Content */}
          <div className="relative z-10 space-y-4">
            {/* Header */}
            <div className="flex justify-center items-center w-full">
              <div className="flex items-center">
                {logo && (
                  <div className="relative w-16 h-16">
                    <Image src={logo} alt="Logo" fill className="object-contain rounded-full" />
                  </div>
                )}
                <div>
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
                <div className="space-y-2">
                  <div className="space-y-1">
                    <p className="text-stone-50/80 text-[11px] text-center rounded-xl font-semibold">ID Number</p>
                    <p className="font-medium text-stone-50/90 bg-slate-800 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.idNumber || 'XXXX-XXXX'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-stone-50/80 text-[11px] text-center rounded-xl font-semibold">Issue Date</p>
                    <p className="font-medium text-stone-50/90 bg-slate-800 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.issueDate || 'MM/DD/YYYY'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-stone-50/80 text-[11px] text-center rounded-xl font-semibold">Expiry Date</p>
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

      {selectedVariant === 'idCard' && selectedVariantStyle === 'style3' && (
        <div className="relative bg-white p-4 rounded-2xl shadow-2xl border border-slate-200 max-w-full mx-auto overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute inset-0 bg-grid-slate-100/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none"></div>

          {/* Card Content */}
          <div className="relative z-10 space-y-4">
            {/* Header */}
            <div className="flex justify-center items-center w-full">
              <div className="flex items-center">
                {logo && (
                  <div className="relative w-16 h-16">
                    <Image src={logo} alt="Logo" fill className="object-contain rounded-full" />
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-center text-gray-600 tracking-wider">IDENTIFICATION CARD</h3>
                  <p className="text-xs text-center text-gray-400">Valid until {idCardDetails.expiryDate || 'MM/DD/YYYY'}</p>
                </div>
              </div>
            </div>

            {/* Main Details Section */}
            <div className="space-y-4">
              {/* Name & Department */}
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-gray-800">{idCardDetails.name || 'Full Name'}</h2>
                <p className="text-lg text-gray-600">{idCardDetails.department || 'Department'}</p>
              </div>
              {/* Additional Details */}
              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="text-gray-500 text-[11px] text-center rounded-xl font-semibold">ID Number</p>
                  <p className="font-medium text-gray-700 bg-gray-100 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.idNumber || 'XXXX-XXXX'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500 text-[11px] text-center rounded-xl font-semibold">Issue Date</p>
                  <p className="font-medium text-gray-700 bg-gray-100 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.issueDate || 'MM/DD/YYYY'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500 text-[11px] text-center rounded-xl font-semibold">Expiry Date</p>
                  <p className="font-medium text-gray-700 bg-gray-100 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.expiryDate || 'MM/DD/YYYY'}</p>
                </div>
              </div>

              {/* Profile Picture & QR Code */}
              <div className="flex flex-col items-center gap-4">
                {/* Profile Picture */}
                <div className="relative w-[110px] h-[150px] rounded-xl overflow-hidden border-2 border-gray-200 shadow-2xl">
                  {idCardDetails.photo ? (
                    <Image src={idCardDetails.photo} alt="Profile" fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
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
                  <div className="bg-gray-100 p-2 rounded-lg shadow-xl">
                    <QRCodeSVG value={qrUrl} size={90} />
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                {/* Signature Placeholder */}
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Authorized Signature</p>
                  <div className="h-8 w-40 border-b border-gray-300"></div>
                </div>
                {/* Footer Tag */}
                <div className="px-2 py-1.5 rounded-lg bg-gray-100 backdrop-blur-sm">
                  <p className="text-xs text-gray-500">Powered by Kardify</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      

      {selectedVariant === 'idCard' && selectedVariantStyle === 'style4' && (
        <div className="relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-700/30 max-w-full mx-auto overflow-hidden">
          {/* Floating Decorations */}
          <div className="absolute inset-0 bg-grid-slate-700/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-tr from-slate-700/30 to-transparent rounded-full blur-3xl"></div>

          {/* Card Content */}
          <div className="relative z-10 space-y-4">
            {/* Header */}
            <div className="flex justify-center items-center w-full">
              <div className="flex items-center">
                {logo && (
                  <div className="relative w-16 h-16">
                    <Image src={logo} alt="Logo" fill className="object-contain rounded-full" />
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-center text-indigo-400 tracking-wider">IDENTIFICATION CARD</h3>
                  <p className="text-xs text-center text-slate-400">Valid until {idCardDetails.expiryDate || 'MM/DD/YYYY'}</p>
                </div>
              </div>
            </div>

            {/* Main Details Section */}
            <div className="space-y-4">
              {/* Name & Department */}
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-white">{idCardDetails.name || 'Full Name'}</h2>
                <p className="text-lg text-indigo-300">{idCardDetails.department || 'Department'}</p>
              </div>
              {/* Additional Details */}
              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="text-stone-50/80 text-[11px] text-center rounded-xl font-semibold">ID Number</p>
                  <p className="font-medium text-stone-50/90 bg-slate-800 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.idNumber || 'XXXX-XXXX'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-stone-50/80 text-[11px] text-center rounded-xl font-semibold">Issue Date</p>
                  <p className="font-medium text-stone-50/90 bg-slate-800 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.issueDate || 'MM/DD/YYYY'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-stone-50/80 text-[11px] text-center rounded-xl font-semibold">Expiry Date</p>
                  <p className="font-medium text-stone-50/90 bg-slate-800 py-2 p-0.5 rounded-md text-[15px] text-center">{idCardDetails.expiryDate || 'MM/DD/YYYY'}</p>
                </div>
              </div>

              {/* Profile Picture & QR Code */}
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

      {/* idcard Display End */}

    {/* Begin contract card display */}

      {selectedVariant === 'contract' && selectedVariantStyle === 'default' && (
            <div className="relative bg-gradient-to-br from-slate-900 to-blue-900 p-3 rounded-2xl shadow-2xl overflow-hidden">
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

                {/* Parties Section */}
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

                {/* Terms and Conditions */}
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                  <h3 className="text-xl text-white mb-4">Terms and Conditions</h3>
                  <div className="prose prose-invert max-w-none">
                    <div className="bg-white/5 p-6 rounded-xl">
                      <p className="text-blue-200 whitespace-pre-line leading-relaxed">{contractTerms}</p>
                    </div>
                  </div>
                </div>

                {/* Contract Details */}
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

                {/* Witnesses */}
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

                {/* Footer */}
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

      {selectedVariant === 'contract' && selectedVariantStyle === 'style1' && (
        <div className="relative bg-gradient-to-br from-slate-900 to-blue-900 p-3 rounded-2xl shadow-2xl overflow-hidden">
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

            {/* Parties Section */}
            <div className="space-y-4">
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

            {/* Terms and Conditions */}
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <h3 className="text-xl text-white mb-4">Terms and Conditions</h3>
              <div className="prose prose-invert max-w-none">
                <div className="bg-white/5 p-6 rounded-xl">
                  <p className="text-blue-200 whitespace-pre-line leading-relaxed">{contractTerms}</p>
                </div>
              </div>
            </div>

            {/* Contract Details */}
            <div className="space-y-4">
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

            {/* Witnesses */}
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <h3 className="text-xl text-white mb-4">Witnesses</h3>
              <div className="space-y-4">
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

            {/* Footer */}
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

      {selectedVariant === 'contract' && selectedVariantStyle === 'style2' && (
        <div className="relative bg-gradient-to-br from-slate-900 to-blue-900 p-3 rounded-2xl shadow-2xl overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute z-10 inset-0 bg-grid-white/10"></div>
          <div className="absolute z-10 top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

          <div className="relative  z-10 md:grid md:grid-cols-2 gap-4">
            {/* Left Column: Header and Parties */}
            <div className="space-y-4 flex w-full  flex-col">
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
            </div>

            {/* Right Column: Terms, Details, and Witnesses */}
            <div className="space-y-4">
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
            </div>

            {/* Footer with Enhanced Security Features */}
            <div className="col-span-2 flex justify-between items-center pt-3 border-t border-white/20">
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

    {/* End contract card display */}

    {/* Add Birthday card display */}
    {selectedVariant === 'birthday' && (
  <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 md:p-10 rounded-2xl shadow-xl overflow-hidden animate-gradient-x">
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
            on your {age}<sup>th</sup> Birthday!
          </p>
        )}
      </div>

      {/* Main Image */}
      {flyerImage && (
        <div className="relative mx-auto w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full overflow-hidden border-[6px] border-white/60 shadow-2xl hover:scale-105 transition-transform duration-300">
          <Image
            src={flyerImage}
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
          {calculateDaysUntilBirthday(cardDate, birthdayDate)} days
        </p>
      </div>

      {/* Message */}
      <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 shadow-lg">
        <p className="text-lg sm:text-xl md:text-2xl text-white text-center font-medium leading-relaxed tracking-wide">
          {birthdayMessage ||
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
              <p className="text-xs text-black mt-1 font-medium">SCAN FOR DETAILS</p>
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

    {/* Mood Variant Display Start */}
<div className="">

{/* Default - Collage Style */}
{selectedVariant === 'mood' && selectedVariantStyle === 'default' && (
  <div 
  style={{backgroundColor: backgroundColor,}}
  className="relative p-6 rounded-3xl bg-white/90 backdrop-blur-lg shadow-2xl" >
    <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 to-blue-100/30" />
    <div className="relative space-y-6">
      <div className="flex justify-between items-start">
        <h3 className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
          {title || 'MOOD'}
        </h3>
        <div className="flex items-center gap-2">
          <div className="bg-black/80 p-1.5 rounded-lg">
            {qrUrl && <QRCodeSVG value={qrUrl} size={36} className="text-white" />}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 relative h-48 rounded-xl overflow-hidden shadow-lg rotate-1 transform">
          {moodPicture && <Image src={moodPicture} alt="Mood" fill className="object-cover" />}
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md -rotate-2 transform">
          <span className="text-6xl block mb-2">{moodSmiley}</span>
          <p className="font-bold text-lg">{name}</p>
          <p className="text-sm text-gray-500 mt-1">{date}</p>
        </div>
      </div>

      {description && (
        <div className="bg-white/80 p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm italic text-gray-700">{description}</p>
        </div>
      )}
    </div>
  </div>
)}

{/* Style1 - Polaroid Collection */}
{selectedVariant === 'mood' && selectedVariantStyle === 'style1' && (
  <div 
  style={{backgroundColor: backgroundColor,}}
  className="relative p-6 bg-yellow-50/80 rounded-3xl shadow-xl backdrop-blur-sm">
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-amber-900">{title || 'Daily Vibe'}</h3>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{moodSmiley}</span>
          <div className="bg-white p-1 rounded-md shadow-sm">
            {qrUrl && <QRCodeSVG value={qrUrl} size={32} />}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {moodPicture && (
          <div className="relative aspect-square bg-white p-3 rounded-lg shadow-xl rotate-2 transform">
            <Image src={moodPicture} alt="Mood" fill className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-2 text-xs font-mono">
              {name}
            </div>
          </div>
        )}
        <div className="bg-white p-4 rounded-lg shadow-xl -rotate-1 transform">
          <p className="text-sm text-gray-700 mb-3">{description}</p>
          <div className="border-t pt-2">
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

{/* Style2 - Grunge Board */}
{selectedVariant === 'mood' && selectedVariantStyle === 'style2' && (
  <div 
  style={{backgroundColor: backgroundColor,}}
  className="relative bg-gray-900/90 p-6 rounded-2xl shadow-2xl overflow-hidden">
    <div className="absolute inset-0 bg-noise opacity-20" />
    <div className="relative space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
          {title || 'MOOD BOARD'}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-4xl">{moodSmiley}</span>
          <div className="bg-black/80 p-1 rounded-md">
            {qrUrl && <QRCodeSVG value={qrUrl} size={36} />}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {moodPicture && (
          <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-orange-400/20">
            <Image src={moodPicture} alt="Mood" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
          </div>
        )}
        <div className="bg-gray-800/50 p-4 rounded-xl space-y-3">
          <div className="space-y-1">
            <p className="font-medium text-orange-200">{name}</p>
            <p className="text-xs text-orange-400/80">{date}</p>
          </div>
          {description && <p className="text-sm text-orange-200/80">{description}</p>}
        </div>
      </div>
    </div>
  </div>
)}

{/* Style3 - Modern Minimalist */}
{selectedVariant === 'mood' && selectedVariantStyle === 'style3' && (
  <div 
    style={{backgroundColor: backgroundColor}}
    className="relative p-8 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl"
  >
    {/* Decorative Elements */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50/10 via-gray-50/5 to-zinc-50/10" />
    <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl" />

    <div className="relative z-10">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-8">
        <h3 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          {title || 'Mood'}
        </h3>
        {qrUrl && (
          <div className="bg-white/80 p-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <QRCodeSVG value={qrUrl} size={40} />
          </div>
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column - Emoji and Details */}
        <div className="col-span-4 space-y-6">
          <div className="bg-white/50 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/60 transition-colors duration-300">
            <span className="text-7xl block mb-4 hover:scale-110 transition-transform duration-300">
              {moodSmiley}
            </span>
            <div className="space-y-2">
              <p className="font-semibold text-gray-800 text-lg">{name}</p>
              <p className="text-sm text-gray-500">{date}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Description and Image */}
        <div className="col-span-8 space-y-6">
          {description && (
            <div className="bg-white/40 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
          )}
          
          {moodPicture && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image 
                src={moodPicture} 
                alt="Mood" 
                fill 
                className="object-cover transform group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)}

{/* Style4 - Modern Asymmetrical */}
{selectedVariant === 'mood' && selectedVariantStyle === 'style4' && (
  <div 
    style={{backgroundColor: backgroundColor}}
    className="relative p-8 rounded-3xl overflow-hidden backdrop-blur-xl border border-white/10"
  >
    {/* Decorative Background Elements */}
    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-pink-500/10" />
    <div className="absolute -top-24 -right-24 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl" />
    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl" />
    
    <div className="relative z-10 space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
            {title || 'FEELS'}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-6xl transform hover:scale-110 transition-transform duration-300">
              {moodSmiley}
            </span>
            <div className="h-12 w-px bg-gradient-to-b from-violet-500/20 to-fuchsia-500/20" />
            <p className="text-xl font-medium text-white/80" style={{color: titleColor}}>
              {name}
            </p>
          </div>
        </div>
        
        {qrUrl && (
          <div className="bg-white/10 p-2 rounded-2xl backdrop-blur-md hover:scale-105 transition-transform duration-300">
            <QRCodeSVG value={qrUrl} size={48} />
          </div>
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {moodPicture && (
          <div className="col-span-7 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image 
                src={moodPicture} 
                alt="Mood" 
                fill 
                className="object-cover transform group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>
        )}
        
        <div className="col-span-5 space-y-6">
          <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 
                         hover:bg-white/10 transition-colors duration-300">
            {description && (
              <p className="text-lg leading-relaxed text-white/90" style={{color: titleColor}}>
                {description}
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-lg rounded-xl">
            <p className="text-sm font-medium text-white/70" style={{color: titleColor}}>
              {date}
            </p>
            <div className="h-8 w-px bg-white/10" />
            <p className="text-sm font-medium text-white/70" style={{color: titleColor}}>
              Mood Card
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

</div>
{/* Mood Variant Display Finish */}


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
