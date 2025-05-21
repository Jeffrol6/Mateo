import React from 'react';
import { FaPaypal } from 'react-icons/fa'; // npm install react-icons

const DonateButton = () => {
  return (
    <a
      href="https://www.paypal.com/ncp/payment/SPLRLRZKJYKHC"  // Tu enlace funcional
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2
                 bg-yellow-400 hover:bg-yellow-500 text-gray-900
                 px-6 py-3 rounded-full shadow-lg font-bold text-lg
                 transition-colors duration-300"
    >
      <FaPaypal className="text-2xl text-blue-700" />
      Donar con PayPal
    </a>
  );
};

export default DonateButton;
