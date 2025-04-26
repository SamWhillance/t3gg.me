"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { FaUpload, FaDownload } from "react-icons/fa";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTheo, setSelectedTheo] = useState<string>("theo2.jpg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResultImage(null);
      setError(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("theoImage", selectedTheo);

      const response = await fetch("/api/faceswap", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      setResultImage(data.imageUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement("a");
      link.href = resultImage;
      link.download = "theo-faceswap.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Become <span className="text-purple-500">Theo</span> in Seconds
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Upload your selfie and transform into Theo from t3.gg. Perfect for X
            profile pictures!
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl shadow-xl p-6 mb-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            It's a Theo Takeover!
          </h2>
          <p className="text-white mb-4">
            Let's flood X with Theo profiles! Generate your image, set it as
            your profile pic, and tag{" "}
            <span className="font-semibold">@theo</span> to join the fun.
          </p>
          <div className="flex justify-center">
            <a
              href="https://x.com/theo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-black bg-opacity-30 hover:bg-opacity-40 text-white py-2 px-4 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
              Follow Theo on X
            </a>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl shadow-xl overflow-hidden p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-300">
                  Step 1: Choose a Theo
                </p>
                <div className="flex space-x-4 justify-center">
                  <label
                    className={`cursor-pointer flex flex-col items-center ${
                      selectedTheo === "theo.jpg"
                        ? "ring-2 ring-purple-500 rounded-lg"
                        : ""
                    }`}
                  >
                    <div className="relative w-24 h-24 mb-2 overflow-hidden rounded-lg">
                      <Image
                        src="/theo.jpg"
                        alt="Theo 1"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="theoImage"
                        value="theo.jpg"
                        checked={selectedTheo === "theo.jpg"}
                        onChange={(e) => setSelectedTheo(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-gray-300">Legacy</span>
                    </div>
                  </label>

                  <label
                    className={`cursor-pointer flex flex-col items-center ${
                      selectedTheo === "theo2.jpg"
                        ? "ring-2 ring-purple-500 rounded-lg"
                        : ""
                    }`}
                  >
                    <div className="relative w-24 h-24 mb-2 overflow-hidden rounded-lg">
                      <Image
                        src="/theo2.jpg"
                        alt="Theo 2"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="theoImage"
                        value="theo2.jpg"
                        checked={selectedTheo === "theo2.jpg"}
                        onChange={(e) => setSelectedTheo(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-gray-300">NextGen</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-300">
                  Step 2: Upload your selfie
                </p>

                <div className="bg-gray-800 rounded-xl shadow-xl p-4 mb-8 text-center">
                  <p className="text-purple-400 font-medium">
                    {selectedTheo === "theo.jpg"
                      ? "👆 For best results, look UP and to your LEFT! (~30° angle)"
                      : "👆 For best results, look RIGHT at a slight angle, directly at the camera, and as if someone just said something idiotic."}
                  </p>
                </div>
                <div
                  className="border-2 border-dashed border-gray-600 rounded-lg p-4 h-64 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition-colors"
                  onClick={handleButtonClick}
                >
                  {previewUrl ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ) : (
                    <>
                      <FaUpload className="w-12 h-12 text-gray-500 mb-4" />
                      <p className="text-gray-400 text-center">
                        Open camera / Upload image
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/jpeg, image/png"
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-300">
                  Step 3: Generate your Theo image
                </p>
                <button
                  type="submit"
                  disabled={!selectedFile || isLoading}
                  className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                    !selectedFile || isLoading
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  } transition-colors`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Generate Theo Image"
                  )}
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-300">
                  Step 4: Download to use as profile picture
                </p>
                <div className="border-2 border-gray-600 rounded-lg p-4 h-64 flex items-center justify-center bg-gray-800">
                  {resultImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={resultImage}
                        alt="Result"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center">
                      Your Theo-fied image will appear here
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!resultImage}
                  className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                    !resultImage
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  } transition-colors`}
                >
                  <FaDownload className="mr-2" />
                  Download Image
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-900/50 text-red-200 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
      <footer className="mt-12 text-center text-gray-400 text-sm">
        <div className="space-y-3">
          <div>
            <a
              href="https://samwhillance.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
            >
              App by samwhillance.com
            </a>
          </div>
          <div>
            <a
              href="https://x.com/swhillance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-black bg-opacity-30 hover:bg-opacity-50 text-white py-1 px-3 rounded-lg transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
              Follow me on X
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
