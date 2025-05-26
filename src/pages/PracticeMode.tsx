import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Repeat } from 'lucide-react';
import Mascot from '../components/Mascot';
import NumberCard from '../components/NumberCard';
import AnswerBox from '../components/AnswerBox';
import { useAppContext } from '../context/AppContext';
import RewardPopup from '../components/RewardPopup';
import { Operation } from '../types';

const PracticeMode = () => {
  const navigate = useNavigate();
  const { currentProblem, generateNewProblem, checkAnswer, rewards, sound } = useAppContext();
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [showReward, setShowReward] = useState(false);
  const [recentReward, setRecentReward] = useState<number | null>(null);
  const [selectedOperation, setSelectedOperation] = useState<Operation>('addition');
  
  const playSound = (type: 'correct' | 'incorrect') => {
    if (!sound) return;
    
    const audio = new Audio(
      type === 'correct'
        ? 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'
        : 'https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3'
    );
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio play error:', e));
  };
  
  const handleCardSelect = (number: number) => {
    if (feedback !== 'none') return;
    
    const result = checkAnswer(number);
    
    if (result) {
      setFeedback('correct');
      playSound('correct');
      
      const latestRewardIndex = rewards.length - 1;
      if (latestRewardIndex >= 0 && !recentReward) {
        setRecentReward(latestRewardIndex);
        setShowReward(true);
      }
      
      setTimeout(() => {
        setFeedback('none');
        generateNewProblem(selectedOperation);
        
        if (showReward) {
          setTimeout(() => {
            setShowReward(false);
            setRecentReward(null);
          }, 1000);
        }
      }, 2000);
    } else {
      setFeedback('incorrect');
      playSound('incorrect');
      
      setTimeout(() => {
        setFeedback('none');
      }, 1500);
    }
  };
  
  const generateChoices = () => {
    const choices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return choices;
  };
  
  const choiceNumbers = generateChoices();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 flex flex-col items-center p-4">
      <header className="w-full max-w-md flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="bg-purple-500 text-white p-2 rounded-full"
        >
          <Home size={24} />
        </button>
        <h1 className="text-2xl font-bold text-purple-600">Practice Mode</h1>
        <button 
          onClick={() => generateNewProblem(selectedOperation)} 
          className="bg-purple-500 text-white p-2 rounded-full"
        >
          <Repeat size={24} />
        </button>
      </header>
      
      <div className="w-full max-w-md mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex gap-4 justify-center mb-6">
            <button 
              onClick={() => {
                setSelectedOperation('addition');
                generateNewProblem('addition');
              }}
              className={`px-4 py-2 rounded-lg text-lg font-bold transition-all ${
                selectedOperation === 'addition'
                  ? 'bg-purple-500 text-white'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              Addition (+)
            </button>
            <button 
              onClick={() => {
                setSelectedOperation('subtraction');
                generateNewProblem('subtraction');
              }}
              className={`px-4 py-2 rounded-lg text-lg font-bold transition-all ${
                selectedOperation === 'subtraction'
                  ? 'bg-purple-500 text-white'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              Subtraction (-)
            </button>
          </div>
          
          <div className="text-center mb-4">
            <p className="text-xl font-bold text-purple-600">What is</p>
            <p className="text-4xl font-bold text-purple-700 mt-2">
              {currentProblem.num1} {currentProblem.operator} {currentProblem.num2}
            </p>
          </div>
          
          <div className="mt-6">
            <AnswerBox 
              feedback={feedback} 
              answer={selectedNumbers.length > 0 ? selectedNumbers.reduce((a, b) => a + b, 0) : null} 
            />
          </div>
        </div>
        
        <div className="flex justify-center mb-6">
          <Mascot 
            emotion={feedback === 'correct' ? 'excited' : feedback === 'incorrect' ? 'sad' : 'curious'} 
            animated={feedback !== 'none'}
          />
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {choiceNumbers.map((number) => (
            <NumberCard 
              key={number}
              number={number}
              onClick={() => handleCardSelect(number)}
              disabled={feedback !== 'none'}
            />
          ))}
        </div>
      </div>
      
      {showReward && recentReward !== null && (
        <RewardPopup reward={rewards[recentReward]} onClose={() => setShowReward(false)} />
      )}
    </div>
  );
};

export default PracticeMode;