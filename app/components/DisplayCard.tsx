// app/advanced/components/DisplayCard.tsx
"use client";
import { useRef, useEffect } from "react";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import Image from "next/image";

interface CardState {
  title: string;
  description: string;
  backgroundColor: string;
  price?: string;
  currency?: string;
  logo?: string;
  selectedVariant: "business" | "birthday";
  brandName?: string;
  tagline?: string;
  wishType?: string;
  message?: string;
}

interface DisplayCardProps {
  cardState: CardState;
  generateType: "png" | "pdf";
}

const DisplayCard = ({ cardState, generateType }: DisplayCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const generateImage = async () => {
    if (!cardRef.current) return;

    try {
      const content = cardRef.current;
      const { width, height } = content.getBoundingClientRect();
      const scale = 4; // Increase resolution
      const scaledWidth = width * scale;
      const scaledHeight = height * scale;

      const imgData = await domtoimage.toPng(content, {
        width: scaledWidth,
        height: scaledHeight,
        quality: 100,
        style: {
          transform: `scale(${scale})`,
          "transform-origin": "top left",
        },
        cacheBust: true,
      });

      if (generateType === "png") {
        const link = document.createElement("a");
        link.download = `${cardState.title || "card"}-${Date.now()}.png`;
        link.href = imgData;
        link.click();
      } else if (generateType === "pdf") {
        const pdf = new jsPDF({
          orientation: width > height ? "landscape" : "portrait",
          unit: "px",
          format: [width, height],
          compress: true,
          precision: 100,
        });

        const img = new window.Image();
        img.src = imgData;

        await new Promise((resolve) => {
          img.onload = () => {
            pdf.addImage(
              img,
              "PNG",
              0,
              0,
              width,
              height,
              undefined,
              "FAST"
            );
            resolve(null);
          };
        });

        pdf.save(`${cardState.title || "card"}-${Date.now()}.pdf`);
      }
    } catch (error) {
      console.error("Error generating image/PDF:", error);
      alert("Failed to generate. Please try again.");
    }
  };

  useEffect(() => {
    if (generateType) {
      generateImage();
    }
  }, [generateType]);

    function formatCurrency(amount: number, currency: string | undefined) {
        if (!currency) return amount.toFixed(2);
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    }

  return (
    <div
      ref={cardRef}
      className={`bg-${cardState.backgroundColor} p-8 rounded-lg shadow-md w-full max-w-xl mt-8`}
    >
      <h2 className="text-2xl font-bold">{cardState.title}</h2>
      <p className="text-gray-700">{cardState.description}</p>
      {cardState.price && (
        <span className="block text-lg font-semibold mt-4">
          {`Price: ${formatCurrency(
            parseFloat(cardState.price),
            cardState.currency
          )}`}
        </span>
      )}
      {cardState.logo && (
        <Image
          src={cardState.logo}
          alt="Logo"
          width={100}
          height={100}
          className="mt-4"
        />
      )}
      {/* Render variant-specific content */}
      {cardState.selectedVariant === "business" && (
        <div>
          <p>{cardState.brandName}</p>
          <p>{cardState.tagline}</p>
        </div>
      )}
      {cardState.selectedVariant === "birthday" && (
        <div>
          <p>{cardState.wishType}</p>
          <p>{cardState.message}</p>
        </div>
      )}
      {/* Add other variants... */}
    </div>
  );
};

export default DisplayCard;