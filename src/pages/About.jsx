import React from 'react';
import image1 from '../images/image1.png';
import image2 from '../images/image2.png';

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white h-full">
      <h1 className="text-3xl font-bold mb-8">About Image Processing</h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-64 mx-4 mb-8 transform transition duration-500 ease-in-out hover:scale-110">
          <img src={image1} alt="img1" className="mb-4 rounded-lg shadow-lg" />
          <p className="text-center">Image 1 Description</p>
        </div>
        <div className="w-64 mx-4 mb-8 transform transition duration-500 ease-in-out hover:scale-110">
          <img src={image2} alt="img2" className="mb-4 rounded-lg shadow-lg" />
          <p className="text-center">Image 2 Description</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
