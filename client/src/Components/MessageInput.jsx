import { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = ({ sendMessage }) => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    sendMessage({ message: text.trim(), image: imagePreview });

    // Clear input
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-gray-400"
            />
            <button 
              onClick={removeImage} 
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          className="hidden"  
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        {/* Image Upload Button (Blue) */}
        <button
            type="button"
            className="btn btn-circle bg-[#4a90e2] text-white hover:bg-[#357ab7] transition duration-200"
            onClick={() => fileInputRef.current?.click()}
        >
            <Image size={20} />
        </button>

      </form>
    </div>
  );
};

export default MessageInput;
