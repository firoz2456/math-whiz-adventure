import React from 'react';

type NumberCardProps = {
  number: number;
  onClick: () => void;
  disabled?: boolean;
  accentColor?: 'purple' | 'green' | 'yellow';
};

const NumberCard: React.FC<NumberCardProps> = ({ 
  number, 
  onClick, 
  disabled = false,
  accentColor = 'purple'
}) => {
  // Determine color classes based on accent color
  let baseColor, hoverColor, activeColor;
  
  switch (accentColor) {
    case 'green':
      baseColor = 'bg-green-500';
      hoverColor = 'hover:bg-green-600';
      activeColor = 'active:bg-green-700';
      break;
    case 'yellow':
      baseColor = 'bg-yellow-500';
      hoverColor = 'hover:bg-yellow-600';
      activeColor = 'active:bg-yellow-700';
      break;
    case 'purple':
    default:
      baseColor = 'bg-purple-500';
      hoverColor = 'hover:bg-purple-600';
      activeColor = 'active:bg-purple-700';
      break;
  }
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseColor} ${!disabled && hoverColor} ${!disabled && activeColor}
        text-white text-4xl font-bold
        rounded-xl shadow-md
        py-6 px-8
        transition-all duration-200
        transform hover:scale-105 active:scale-95
        ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
      `}
    >
      {number}
    </button>
  );
};

export default NumberCard;