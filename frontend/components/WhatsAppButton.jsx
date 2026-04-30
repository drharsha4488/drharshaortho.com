'use client';
import { MessageCircle } from 'lucide-react';

// Context-aware WhatsApp button — message changes based on page
export default function WhatsAppButton({ message, label = 'Chat on WhatsApp', className = '', variant = 'float' }) {
  const defaultMsg = message || 'Hello Dr. Harsha, I would like to book an appointment for orthopedic consultation.';
  const url = `https://wa.me/919959964567?text=${encodeURIComponent(defaultMsg)}`;

  if (variant === 'float') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Chat on WhatsApp"
        data-testid="whatsapp-float-btn"
      >
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
        <span className="relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110">
          <MessageCircle className="w-7 h-7" />
        </span>
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Chat on WhatsApp
          <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 border-8 border-transparent border-l-gray-900" />
        </span>
      </a>
    );
  }

  // Inline variant — use anywhere as a CTA button
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg ${className}`}
      data-testid="whatsapp-inline-btn"
    >
      <MessageCircle className="w-5 h-5" />
      {label}
    </a>
  );
}
