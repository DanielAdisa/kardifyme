// app/advanced/components/InputForms.tsx
"use client";
import { useLocalStorageState } from "./../addy/storage";

interface CardState {
  selectedVariant: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  logo: string | null;
  brandName?: string;
  tagline?: string;
  wishType?: string;
  message?: string;
  // Add other state properties as needed...
}

const InputForms = () => {
  const [cardState, setCardState] = useLocalStorageState<CardState>(
    "cardState",
    {
      selectedVariant: "business",
      title: "",
      description: "",
      price: "",
      currency: "USD",
      logo: null,
      // Initialize all other state properties...
    }
  );

  const handleFieldChange = (field: keyof CardState, value: string) => {
    setCardState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full md:w-80 p-4 bg-gray-100 border-r border-gray-200">
      <h2 className="text-lg font-bold mb-4">Input Forms</h2>

      {/* Dynamic Inputs Based on Selected Variant */}
      {cardState.selectedVariant === "business" && (
        <>
          <input
            type="text"
            value={cardState.brandName || ""}
            onChange={(e) => handleFieldChange("brandName", e.target.value)}
            placeholder="Brand Name"
            className="w-full p-3 rounded-lg border border-gray-300 mb-4"
          />
          <input
            type="text"
            value={cardState.tagline || ""}
            onChange={(e) => handleFieldChange("tagline", e.target.value)}
            placeholder="Tagline"
            className="w-full p-3 rounded-lg border border-gray-300 mb-4"
          />
        </>
      )}
      {cardState.selectedVariant === "birthday" && (
        <>
          <input
            type="text"
            value={cardState.wishType || ""}
            onChange={(e) => handleFieldChange("wishType", e.target.value)}
            placeholder="Wish Type"
            className="w-full p-3 rounded-lg border border-gray-300 mb-4"
          />
          <input
            type="text"
            value={cardState.message || ""}
            onChange={(e) => handleFieldChange("message", e.target.value)}
            placeholder="Message"
            className="w-full p-3 rounded-lg border border-gray-300 mb-4"
          />
        </>
      )}
      {/* Add more variant-specific inputs... */}
    </div>
  );
};

export default InputForms;