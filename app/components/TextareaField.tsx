interface TextareaFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextareaField({ label, placeholder, value, onChange }: TextareaFieldProps) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
        ></textarea>
      </div>
    );
  }