import { useState } from "react";
import { Input } from "@/components/ui/input";

const ImageUpload = ({ onChange }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Input type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
      {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-md" />}
    </div>
  );
};

export default ImageUpload;