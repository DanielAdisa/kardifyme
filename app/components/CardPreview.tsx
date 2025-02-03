// app/advanced/components/CardPreview.tsx
"use client";
import { useState, useEffect } from "react";

interface CardState {
  property1: string;
  property2: number;
  title: string;
  description: string;
  backgroundColor: string;
  selectedVariant: "business" | "birthday";
}
import DisplayCard from "./DisplayCard";

const CardPreview = () => {
  const [cardState, setCardState] = useState<CardState>({
    property1: "",
    property2: 0,
    title: "",
    description: "",
    backgroundColor: "",
    selectedVariant: "business"
  }); // Define cardState
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resizes", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className={`${
        isMobile ? "fixed bottom-0 left-0 w-full" : "relative"
      } transition-all duration-300`}
      style={{ maxHeight: isCollapsed && isMobile ? "50px" : "auto" }}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full bg-gray-100 p-2 text-center text-sm font-medium"
      >
        {isCollapsed ? "Expand Preview" : "Collapse Preview"}
      </button>
      {!isCollapsed && <DisplayCard cardState={cardState} generateType={"png"} />}
</div>
  );
};

export default CardPreview;
