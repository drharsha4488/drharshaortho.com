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
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 group"
        aria-label="Chat on WhatsApp"
        data-testid="whatsapp-float-btn"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <span className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-[0_12px_28px_-6px_rgba(37,211,102,0.55)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5">
          <MessageCircle className="w-7 h-7" strokeWidth={2.2} />
        </span>
        <span className="hidden sm:block absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-medium px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
          Chat with Dr. Harsha
        </span>
      </a>
    );
  }

  // Inline variant
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_24px_-8px_rgba(37,211,102,0.5)] ${className}`}
      data-testid="whatsapp-inline-btn"
    >
      <MessageCircle className="w-5 h-5" />
      {label}
    </a>
  );
}
