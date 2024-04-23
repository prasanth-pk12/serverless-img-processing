import React, { useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";

const HomePage = () => {
  const timeout = 5000;
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [processing, setProcessing] = useState(false);

  const connectionString = process.env.REACT_APP_CONNECTION_STRING;
  const containerName = "source";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const uploadImageToAzure = async () => {
    try {
      setProcessing(true);
      setUploadStatus("Uploading image...");
      const blobService = new BlobServiceClient(connectionString);
      const containerClient = blobService.getContainerClient(containerName);
      const blobClient = containerClient.getBlockBlobClient(selectedImage.name);
      const options = {
        blobHTTPHeaders: {
          blobContentType: selectedImage.type,
        },
      };

      const res = await blobClient.uploadData(selectedImage, options);
      if (res.ok || res) {
        setUploadStatus("Image uploaded.");
        setTimeout(() => {
          setUploadStatus("Processing by Azure Function...");
          fetchProcessedImage();
        }, 2000); // Wait 5 seconds before fetching processed image
      }
    } catch (error) {
      console.log(error);
      setUploadStatus("Error uploading image.");
    }
  };

  const fetchProcessedImage = async () => {
    try {
      setTimeout(() => {
        const processedImageURL = `https://mohanaprakash.blob.core.windows.net/target/${selectedImage.name}`;
        setProcessedImage(processedImageURL);
        setProcessing(false);
        setUploadStatus(null);
      }, timeout);
    } catch (error) {
      console.log(error);
      setUploadStatus("Error processing image.");
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setProcessedImage(null);
    setProcessing(false);
    setUploadStatus(null);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-700 text-white p-10 h-full">
      {!selectedImage && (
        <>
          <h1 className="text-3xl font-bold mb-8">Upload Image</h1>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4 hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="bg-white text-indigo-500 font-bold py-2 px-4 rounded cursor-pointer transition duration-500 ease-in-out transform hover:scale-105 hover:bg-indigo-500 hover:text-white"
          >
            Select Image
          </label>
        </>
      )}

      {selectedImage && (
        <div className="flex flex-col items-center">
          <div className="flex">
            <div className="p-5">
              <h2 className="text-xl font-bold mb-2 text-center">
                Original Image
              </h2>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded"
                className="mb-4 max-w-lg rounded-lg shadow-lg"
              />
            </div>
            {processedImage && (
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2 text-center">
                  Processed Image
                </h2>
                <img
                  src={processedImage}
                  alt="Uploaded"
                  className="mb-4 max-w-lg rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center space-y-4">
            {processing && <div className="font-bold">{uploadStatus}</div>}
            <div className="flex space-x-4">
              {processedImage ? (
                <a
                  href={processedImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                >
                  Download Processed Image
                </a>
              ) : (
                <button
                  onClick={uploadImageToAzure}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                >
                  Upload to Azure
                </button>
              )}

              <button
                onClick={clearSelectedImage}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
