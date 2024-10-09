"use client"; // Mark this as a client component

import { useState } from "react";
import Card from "./Card"; // Import the Card component from the new file
import ChatPopup from "./ChatPopup";
import "./main.css";

export default function AssistanceSection() {
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const handleCardClick = (question) => {
    setSelectedQuestion(question); // Set the question to the message
    console.log("Selected question:", question);
  };

  return (
    <section className="mt-8 bg-white p-4 rounded-lg shadow-md ">
      <h2 className="text-xl font-semibold mb-4">
        How can we assist you today?
      </h2>

      <div>
        {/* Carousel for small screens */}
        <div className="block md:hidden">
          <div className="carousel flex overflow-x-scroll snap-x snap-mandatory gap-4 mb-6 scrollbar-hide">
            <div className="flex-shrink-0 w-64 snap-center">
              <Card
                title="Company Search"
                description="Which company is providing the best Services?"
                onClick={() =>
                  handleCardClick(
                    "Which company is providing the best services?"
                  )
                }
              />
            </div>
            <div className="flex-shrink-0 w-64 snap-center">
              <Card
                title="Policy Guidance"
                description="What type of insurance is right for me?"
                onClick={() =>
                  handleCardClick("What type of insurance is right for me?")
                }
              />
            </div>
            <div className="flex-shrink-0 w-64 snap-center">
              <Card
                title="Premium Estimates"
                description="How much will I need to pay?"
                onClick={() => handleCardClick("How much will I need to pay?")}
              />
            </div>
          </div>
        </div>

        {/* Grid for medium and larger screens */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card
            title="Company Search"
            description="Which company is providing the best Services?"
            onClick={() =>
              handleCardClick("Which company is providing the best services?")
            }
          />
          <Card
            title="Policy Guidance"
            description="What type of insurance is right for me?"
            onClick={() =>
              handleCardClick("What type of insurance is right for me?")
            }
          />
          <Card
            title="Premium Estimates"
            description="How much will I need to pay?"
            onClick={() => handleCardClick("How much will I need to pay?")}
          />
        </div>
      </div>

      {/* Pass the selected question to ChatPopup */}
      <ChatPopup initialMessage={selectedQuestion} />
    </section>
  );
}
