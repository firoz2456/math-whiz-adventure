import React, { useEffect } from 'react';
import { Award, X } from 'lucide-react';
import { Reward } from '../types';
import { useAppContext } from '../context/AppContext';

type RewardPopupProps = {
  reward: Reward;
  onClose: () => void;
};

const RewardPopup: React.FC<RewardPopupProps> = ({ reward, onClose }) => {
  const { sound } = useAppContext();
  
  useEffect(() => {
    // Play reward sound
    if (sound) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/250/250-preview.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio play error:', e));
    }
    
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose, sound]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-xs w-full animate-bounce-once">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-purple-600">New Reward!</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-yellow-100 rounded-full p-6 mb-4">
            <Award size={64} className="text-yellow-500" />
          </div>
          
          <h4 className="text-2xl font-bold text-purple-700 mb-2">{reward.name}</h4>
          <p className="text-gray-600 text-center">
            {reward.type === 'badge' 
              ? 'You earned a new badge for your amazing math skills!' 
              : 'You earned a new sticker for your collection!'}
          </p>
        </div>
        
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg transition-all"
          >
            Awesome!
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardPopup;