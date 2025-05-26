import React, { useEffect, useState } from 'react';
import { Brain } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

type MascotProps = {
  emotion: 'happy' | 'excited' | 'curious' | 'sad';
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
};

const Mascot: React.FC<MascotProps> = ({ 
  emotion = 'happy', 
  size = 'medium', 
  animated = false 
}) => {
  const { sound } = useAppContext();
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (animated) {
      setIsAnimating(true);
      
      // Play sound effect based on emotion
      if (sound) {
        const audio = new Audio(
          emotion === 'excited' || emotion === 'happy' 
            ? 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3' 
            : 'https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3'
        );
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play error:', e));
      }
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [emotion, animated, sound]);
  
  // Determine size classes
  const sizeClasses = {
    small: 'h-16 w-16',
    medium: 'h-24 w-24',
    large: 'h-32 w-32',
  }[size];
  
  // Determine emotion styles
  let bgColor = 'bg-purple-100';
  let iconColor = 'text-purple-500';
  let bounceClass = '';
  
  switch (emotion) {
    case 'happy':
      bgColor = 'bg-green-100';
      iconColor = 'text-green-500';
      break;
    case 'excited':
      bgColor = 'bg-yellow-100';
      iconColor = 'text-yellow-500';
      bounceClass = isAnimating ? 'animate-bounce' : '';
      break;
    case 'curious':
      bgColor = 'bg-blue-100';
      iconColor = 'text-blue-500';
      break;
    case 'sad':
      bgColor = 'bg-red-100';
      iconColor = 'text-red-500';
      bounceClass = isAnimating ? 'animate-pulse' : '';
      break;
  }
  
  // Mascot speech bubble content
  const getSpeechContent = () => {
    switch (emotion) {
      case 'happy':
        return 'Good job!';
      case 'excited':
        return 'Excellent!';
      case 'curious':
        return 'Try solving this!';
      case 'sad':
        return 'Try again!';
      default:
        return '';
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      {/* Speech bubble */}
      {emotion !== 'curious' && (
        <div className={`relative mb-2 px-4 py-2 rounded-lg ${
          emotion === 'happy' || emotion === 'excited' 
            ? 'bg-green-50 text-green-600' 
            : 'bg-red-50 text-red-600'
        }`}>
          <p className="text-center font-bold">{getSpeechContent()}</p>
          <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 ${
            emotion === 'happy' || emotion === 'excited' 
              ? 'bg-green-50' 
              : 'bg-red-50'
          }`}></div>
        </div>
      )}
      
      {/* Mascot character */}
      <div className={`${sizeClasses} rounded-full ${bgColor} ${bounceClass} flex items-center justify-center transform transition-all duration-300`}>
        <Brain className={`${size === 'small' ? 'h-8 w-8' : size === 'medium' ? 'h-12 w-12' : 'h-16 w-16'} ${iconColor}`} />
      </div>
    </div>
  );
};

export default Mascot;