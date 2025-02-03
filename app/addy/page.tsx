// app/advanced/page.tsx
"use client";
import Sidebar from "../components/Sidebar";
import InputForms from "../components/InputForms";
import CardPreview from "../components/CardPreview";
import { useLocalStorageState } from "./storage";

interface CardState {
  selectedVariant: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  logo: string | null;
  generateType: "png" | "pdf" | "";
  // Add all other state properties...
}

const AdvancedPage = () => {
  const [cardState, setCardState] = useLocalStorageState<CardState>(
    "cardState",
    {
      selectedVariant: "business",
      title: "",
      description: "",
      price: "",
      currency: "USD",
      logo: null,
      generateType: "",
      // Initialize all other state properties...
    }
  );

  const updateCardState = (updates: Partial<CardState>) => {
    setCardState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar (Inputs + Color Pickers) */}
      <Sidebar updateCardState={updateCardState} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center relative">
        {/* Input Forms */}
        <InputForms />

        {/* Card Preview */}
        <CardPreview />
      </main>
    </div>
  );
};

export default AdvancedPage;