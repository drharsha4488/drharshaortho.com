import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '../WhatsAppButton';
import AIChatWidget from '../AIChatWidget';
import AnalyticsTracker from '../AnalyticsTracker';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnalyticsTracker />
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        {children}
      </main>
      <Footer />
      <AIChatWidget />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
