interface FileUploaderProps {
  label: string;
  file: string | null;
  setFile: (file: string) => void;
  onDelete: () => void;
}

function FileUploader({ label, file, setFile, onDelete }: FileUploaderProps) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1 flex items-center">
          {file && (
            <button onClick={onDelete} className="mr-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
              X
            </button>
          )}
          <input
            type="file"
            accept="image/*"
            title="Upload an image file"
            placeholder="Choose a file"
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setFile(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    );
  }