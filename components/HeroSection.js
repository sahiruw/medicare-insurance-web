"use client"; // Ensure this is a client-side component

import { useState } from "react";
import DetailsPopup from "./DetailsPopup"; // Assuming DetailsPopup is correctly imported

export default function HeroSection() {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

  const handleContactUsClick = () => {
    setShowDetailsPopup(true); // Show the popup when Contact Us is clicked
  };

  const closeDetailsPopup = () => {
    setShowDetailsPopup(false); // Close the popup
  };

  return (
    <>
      <section
        className="bg-primaryBlack text-white rounded-lg p-8 w-full max-w-6xl mx-auto"
        style={{
          backgroundImage: 'url("/assets/Vector.svg")', 
          backgroundSize: "cover", 
          backgroundPosition: "center", // Center the background image
          backgroundRepeat: "no-repeat", // Ensure it doesn't repeat
        }}
      >
        <div className="flex flex-col items-center md:flex-row w-full">
          {/* For mobile, the image appears at the top */}
          <div className="md:hidden mb-4 flex items-center">
            <img
              alt="Placeholder image representing insurance information"
              className="rounded-lg h-32 w-32 mr-4" // Added margin-right (mr-4) for space between the image and text
              src="/assets/placeholder-image.jpg" // Correct placeholder image path
              width="100"
              height="100"
            />
            <div className="text-left">
              <h1 className="text-xl font-bold mb-4">
                Welcome to Insurance Advisor, where understanding insurance is
                simple and easy.
              </h1>
            </div>
          </div>

          {/* Text Section */}
          <div className="md:w-2/3 text-left">
            <h1 className="hidden md:block text-xl md:text-3xl font-bold mb-4">
              Welcome to Insurance Advisor, where understanding insurance is
              simple and easy.
            </h1>
            <p className="text-sm md:text-base mb-6">
              Discover a wealth of information tailored to guide you through the
              complexities of insurance, ensuring you make informed decisions
              with confidence. Our comprehensive resources break down various
              insurance types.
            </p>
            <div className="flex space-x-4">
              <button className="bg-primary hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-32">
                Contact us
              </button>
              <button className="bg-secondary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-32">
                Call us
              </button>
            </div>
          </div>

          {/* Image Section for larger screens */}
          <div className="hidden md:block md:w-1/3 mt-6 md:mt-0">
            <img
              alt="Placeholder image representing insurance information"
              className="rounded-lg h-40 md:h-48 w-full"
              src="/assets/placeholder-image.jpg"
              width="400"
              height="200"
            />
          </div>
        </div>
      </section>

      {/* Render DetailsPopup as a modal if showDetailsPopup is true */}
      {showDetailsPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <DetailsPopup closePopup={closeDetailsPopup} />
        </div>
      )}
    </>
  );
}
