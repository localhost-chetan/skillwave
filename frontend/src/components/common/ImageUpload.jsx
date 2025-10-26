import { useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

const ImageUpload = ({ onChange, label }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
    }
  };

  return (
    <label
      className={cn(
        "flex items-center justify-center w-full h-16 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors",
        preview && "p-0"
      )}
    >
      {preview ? (
        <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
      ) : (
        <div className="flex flex-col items-center">
          <Upload className="h-5 w-5 text-muted-foreground mb-1" />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </label>
  );
};

export default ImageUpload;