interface CurrencySelectorProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

function CurrencySelector({ label, value, onChange, options }: CurrencySelectorProps) {
    return (
      <div>
        <label htmlFor="currency-selector" className="block text-sm font-medium text-gray-700">{label}</label>
        <select
          id="currency-selector"
          value={value}
          onChange={onChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }