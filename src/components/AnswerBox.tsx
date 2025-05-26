import React from 'react';
import { Check, X } from 'lucide-react';

type AnswerBoxProps = {
  feedback: 'none' | 'correct' | 'incorrect';
  answer: number | null;
  accentColor?: 'purple' | 'green' | 'yellow';
};

const AnswerBox: React.FC<AnswerBoxProps> = ({ 
  feedback, 
  answer,
  accentColor = 'purple'
}) => {
  // Determine color classes based on accent color and feedback
  let bgColor, textColor, borderColor;
  
  if (feedback === 'correct') {
    bgColor = 'bg-green-100';
    textColor = 'text-green-700';
    borderColor = 'border-green-500';
  } else if (feedback === 'incorrect') {
    bgColor = 'bg-red-100';
    textColor = 'text-red-700';
    borderColor = 'border-red-500';
  } else {
    switch (accentColor) {
      case 'green':
        bgColor = 'bg-green-50';
        textColor = 'text-green-600';
        borderColor = 'border-green-200';
        break;
      case 'yellow':
        bgColor = 'bg-yellow-50';
        textColor = 'text-yellow-600';
        borderColor = 'border-yellow-200';
        break;
      case 'purple':
      default:
        bgColor = 'bg-purple-50';
        textColor = 'text-purple-600';
        borderColor = 'border-purple-200';
        break;
    }
  }
  
  return (
    <div className={`rounded-lg border-2 ${borderColor} ${bgColor} p-4 h-16 flex items-center justify-between transition-all duration-300`}>
      <span className={`text-xl font-bold ${textColor}`}>
        {feedback === 'none' 
          ? 'Choose an answer...' 
          : feedback === 'correct' 
            ? 'Correct!' 
            : 'Try again!'}
      </span>
      
      {feedback !== 'none' && (
        <div className={`rounded-full ${feedback === 'correct' ? 'bg-green-500' : 'bg-red-500'} h-8 w-8 flex items-center justify-center`}>
          {feedback === 'correct' 
            ? <Check className="text-white" size={18} /> 
            : <X className="text-white" size={18} />}
        </div>
      )}
    </div>
  );
};

export default AnswerBox;