interface ColorPickerProps {
  label: string;
  color: string;
  setColor: (color: string) => void;
}

function ColorPicker({ label, color, setColor }: ColorPickerProps) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1 flex items-center">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 cursor-pointer"
            title="Pick a color"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="ml-2 py-2 px-3 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Enter color code"
            title="Enter color code"
          />
        </div>
      </div>
    );
  }