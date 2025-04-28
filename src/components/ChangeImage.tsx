import React from "react";

interface ChangeImageProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  isRadius?: boolean;
}
export default function ChangeImage({
  imageUrl,
  setImageUrl,
  isRadius = true,
}: ChangeImageProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImageUrl(base64String);
    };

    reader.readAsDataURL(file);
  };
  return (
    <div className="flex items-center space-x-4">
      <div
        style={{ borderRadius: isRadius ? "50%" : "6px" }}
        className="relative w-24 h-24  overflow-hidden"
      >
        <img
          src={imageUrl || "/images/avatar/avatar_default.jpeg"}
          alt="Profile"
          className="w-full h-full object-cover"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}
