import React, { useState } from 'react';

type VariantType = 'business' | 'event' | 'product' | 'invoice' | 'receipt' | 'einvoice' | 'eflyer' | 'recipe' | 'contract' | 'birthday' | 'budget' | 'idCard' | 'moodboard' | 'affirmations' | 'brandcard' | 'invitation' | 'resume';

const Sidebar: React.FC = () => {
  const [showTopPart, setShowTopPart] = useState(false);
  const [showBottomPart, setShowBottomPart] = useState(false);
  const [showFooterPart, setShowFooterPart] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<VariantType>('business');
  const [selectedVariantStyle, setSelectedVariantStyle] = useState<VariantType>('business');
  const [template, setTemplate] = useState<string>('');
  const [bgType, setBgType] = useState<'gradient' | 'solid'>('solid');
  const [cardColor, setCardColor] = useState<{ [key: string]: string }>({});
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [dueDate, setDueDate] = useState('');
  const [currency, setCurrency] = useState('');
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [budgetCategories, setBudgetCategories] = useState<any[]>([]);
  const [showIDCard, setShowIDCard] = useState(false);
  const [idCardDetails, setIDCardDetails] = useState<any>({});
  const [selectedTemplateStyle, setSelectedTemplateStyle] = useState('');
  const [textColors, setTextColors] = useState<any>({});

  const templateOptions = ['option1', 'option2', 'option3']; // Add your template options here

    const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className="sidebar">
      <div>
        <label>
          <input
            type="checkbox"
            checked={showTopPart}
            onChange={(e) => setShowTopPart(e.target.checked)}
            className="form-checkbox text-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
          Show Top Section
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showBottomPart}
            onChange={(e) => setShowBottomPart(e.target.checked)}
            className="form-checkbox text-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
          Show Bottom Section
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showFooterPart}
            onChange={(e) => setShowFooterPart(e.target.checked)}
            className="form-checkbox text-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
          Show Footer Section
        </label>
      </div>

      <div>
        <label>
          <span>Select Card Type</span>
          <select
            onChange={(e) => setSelectedVariant(e.target.value as VariantType)}
            className="w-full p-4 pr-12 text-gray-700 bg-white rounded-2xl border border-gray-200 shadow-sm appearance-none cursor-pointer transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">Select Card Type</option>
            <option value="business">Business Card</option>
            <option value="event">Event Ticket</option>
            <option value="product">Product Showcase</option>
            <option value="invoice">Invoice</option>
            <option value="receipt">Receipt</option>
            <option value="einvoice">E-Invoice</option>
            <option value="eflyer">E-Flyer</option>
            <option value="recipe">Recipe</option>
            <option value="contract">Contract</option>
            <option value="birthday">Birthday</option>
            <option value="budget">Budget</option>
            <option value="idCard">ID Card</option>
            <option value="moodboard">Mood Board</option>
            <option value="affirmations">Affirmations</option>
            <option value="brandcard">Brand Card</option>
            <option value="invitation">Invitation</option>
            <option value="resume">Resume</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          <span>Select Card Style</span>
          <select
            onChange={(e) => setSelectedVariantStyle(e.target.value as VariantType)}
            className="w-full p-4 pr-12 text-gray-700 bg-white rounded-2xl border border-gray-200 shadow-sm appearance-none cursor-pointer transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">Select Card Style</option>
            <option value="style1">Style 1</option>
            <option value="style2">Style 2</option>
            <option value="style3">Style 3</option>
            <option value="style4">Style 4</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          <span>Select Template</span>
          <select
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full p-3 text-gray-700 bg-white rounded-xl border border-gray-200 shadow-sm appearance-none cursor-pointer transition-all duration-200 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">Select Template</option>
            {templateOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="p-2 bg-blue-500 text-white rounded-lg"
        >
          {showColorPicker ? 'Hide Color Picker' : 'Show Color Picker'}
        </button>
        {showColorPicker && (
          <>
            <div>
              <input
                type="color"
                value={cardColor[selectedVariant] || ''}
                onChange={(e) =>
                  setCardColor({ ...cardColor, [selectedVariant]: e.target.value })
                }
                className="w-full h-fit p-4 cursor-pointer transition-transform duration-200"
                title="Select card color"
              />
            </div>
            {/* Add other color pickers here */}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;