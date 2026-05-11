import { useState } from "react";

const ImageUploader = ({ index, onUpload }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setPreviewUrl(URL.createObjectURL(selectedFile));
    onUpload(index, selectedFile);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <label htmlFor="cover" className="text-white text-lg">
        {`${index === 0 ? "Main" : "Upload"}`} Image
      </label>
      <input
        type="file"
        id="cover"
        onChange={handleFileChange}
        className="border text-white border-gray-300 rounded focus:outline-none focus:border-gray-500"
      />
      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="max-w-xs" />
      )}
      {}
    </div>
  );
};

export default ImageUploader;
