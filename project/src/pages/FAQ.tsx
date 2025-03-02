import React, { useState } from 'react';

function FAQ  () {
  // State to manage which question is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Hardcoded FAQ data
  const faqData = [
    {
      question: 'What is GreenMart?',
      answer: 'GreenMart is an eco-friendly e-commerce platform that allows you to shop for sustainable products and earn green credits for your purchases.',
    },
    {
      question: 'How do I earn green credits?',
      answer: 'You earn green credits by purchasing eco-friendly products on GreenMart. The amount of credits earned depends on the product’s green score.',
    },
    {
      question: 'Can I return products?',
      answer: 'Yes, we offer a 30-day return policy for most products. Please check the product page for specific return details.',
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can contact our customer support team by emailing samarthag22@iitk.ac.in or calling +91 8003726610.',
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Yes, we use industry-standard encryption to protect your payment information. Your data is safe with us.',
    },
  ];

  // Toggle function to open/close questions
  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-700">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
              >
                <span className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </span>
                <span className="transform transition-transform duration-300">
                  {openIndex === index ? (
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  )}
                </span>
              </button>

              {/* Answer Section */}
              {openIndex === index && (
                <div className="p-6 pt-0 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>
        {
            `
            h1{
            margin-top: 2rem;
            }
            `
        }
      </style>
    </div>
  );
};

export default FAQ;