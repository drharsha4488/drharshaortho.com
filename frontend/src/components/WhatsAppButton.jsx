import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '919959964567';
  const message = 'Hello Dr. Harsha, I would like to book an appointment for orthopedic consultation.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-50 group"
      aria-label="Contact us on WhatsApp"
      data-testid="whatsapp-button"
    >
      {/* Pulse animation ring */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30"></span>
      
      {/* Button */}
      <span className="relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110">
        <MessageCircle className="w-7 h-7" />
      </span>
      
      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        Chat on WhatsApp
        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 border-8 border-transparent border-l-gray-900"></span>
      </span>
    </a>
  );
};

export default WhatsAppButton;
