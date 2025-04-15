"use client";

import React, { useState } from 'react';

interface BillingToggleProps {
  onChangeAction: (isAnnual: boolean) => void;
}

export const BillingToggle: React.FC<BillingToggleProps> = ({ onChangeAction }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleToggle = () => {
    const newValue = !isAnnual;
    setIsAnnual(newValue);
    onChangeAction(newValue);
  };

  return (
    <div className="flex flex-col items-center mb-10">
      <div className="flex items-center space-x-3 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => isAnnual && handleToggle()}
          className={`px-4 py-2 rounded-md transition-all ${
            !isAnnual
              ? 'bg-white text-gray-800 shadow-sm font-medium'
              : 'text-gray-600'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => !isAnnual && handleToggle()}
          className={`px-4 py-2 rounded-md transition-all ${
            isAnnual
              ? 'bg-white text-gray-800 shadow-sm font-medium'
              : 'text-gray-600'
          }`}
        >
          Yearly <span className="text-green-500 font-medium">Save 16%</span>
        </button>
      </div>
    </div>
  );
};