// app/advanced/utils/formatCurrency.ts
export const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency === "NGN" ? "NGN" : currency,
      minimumFractionDigits: 0,
    }).format(value);
  };