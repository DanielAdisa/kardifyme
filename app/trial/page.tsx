"use client";
import { useState } from 'react';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';

type VariantType = 'flyer' | 'otherVariant'; // Add other variants as needed

const cardVariants: Record<
  VariantType,
  {
    types: Record<
      string,
      {
        titlePlaceholder: string;
        descriptionPlaceholder: string;
        showGradient: boolean;
        showPrice: boolean;
        showQrCode: boolean;
        showImages: boolean;
      }
    >;
  }
> = {
  flyer: {
    types: {
      type1: {
        titlePlaceholder: "Enter eye-catching title",
        descriptionPlaceholder: "Add a captivating tagline",
        showGradient: true,
        showPrice: true,
        showQrCode: true,
        showImages: true,
      },
      type2: {
        titlePlaceholder: "Enter main title",
        descriptionPlaceholder: "Add a brief description",
        showGradient: false,
        showPrice: false,
        showQrCode: false,
        showImages: true,
      },
      type3: {
        titlePlaceholder: "Enter headline",
        descriptionPlaceholder: "Add a short tagline",
        showGradient: true,
        showPrice: true,
        showQrCode: false,
        showImages: false,
      },
      type4: {
        titlePlaceholder: "Enter title",
        descriptionPlaceholder: "Add description",
        showGradient: false,
        showPrice: true,
        showQrCode: true,
        showImages: true,
      },
    },
  },
  otherVariant: {
    types: {
      type1: {
        titlePlaceholder: "Enter title for other variant",
        descriptionPlaceholder: "Add description for other variant",
        showGradient: false,
        showPrice: false,
        showQrCode: false,
        showImages: false,
      },
    },
  },
};

const currencyOptions = [
  { value: "NGN", label: "Nigerian Naira (₦)" },
  { value: "USD", label: "US Dollar ($)" },
  { value: "EUR", label: "Euro (€)" },
];

const CreateCard = () => {
  const [selectedVariant, setSelectedVariant] = useState<VariantType>("flyer");
  const [selectedType, setSelectedType] = useState<string>("type1");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [largeDescription, setLargeDescription] = useState("");
  const [gradientFrom, setGradientFrom] = useState("#ff7e5f");
  const [gradientVia, setGradientVia] = useState("#feb47b");
  const [gradientTo, setGradientTo] = useState("#ff7e5f");
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [qrUrl, setQrUrl] = useState("");
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const titleColor = "#ffffff";

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "logo"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (type === "main") {
          setImage(event.target?.result as string);
        } else if (type === "logo") {
          setLogo(event.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  function formatCurrency(amount: number, currency: string): React.ReactNode {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 p-3">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-3">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Create Your Card
        </h1>
        <div className="space-y-4">
          {/* Variant Type Selection */}
          <div className="space-y-4">
            <label className="block text-stone-950 mb-2 font-medium">
              Select Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 transition-all"
            >
              {Object.keys(cardVariants[selectedVariant]?.types || {}).map(
                (type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                )
              )}
            </select>
          </div>

          {selectedVariant === "flyer" && (
            <div className="space-y-6">
              {/* Title and Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-stone-950 mb-2 font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder={
                      cardVariants.flyer.types[selectedType].titlePlaceholder
                    }
                  />
                </div>
                <div>
                  <label className="block text-stone-950 mb-2 font-medium">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder={
                      cardVariants.flyer.types[selectedType]
                        .descriptionPlaceholder
                    }
                  />
                </div>
              </div>

              {/* Additional sections */}
              {/** Continue expanding from here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
