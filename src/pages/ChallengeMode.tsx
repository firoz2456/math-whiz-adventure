import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Timer } from 'lucide-react';
import Mascot from '../components/Mascot';
import NumberCard from '../components/NumberCard';
import AnswerBox from '../components/AnswerBox';
import { useAppContext } from '../context/AppContext';
import RewardPopup from '../components/RewardPopup';
import { Operation } from '../types';

const CHALLENGE_TIME = 120; // 2 minutes in seconds

const ChallengeMode = () => {
  const navigate = useNavigate();
  const { currentProblem, generateNewProblem, checkAnswer, rewards } = useAppContext();
  const [timeLeft, setTimeLeft] = useState<number>(CHALLENGE_TIME);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [challengeStats, setChallengeStats] = useState({
    correct: 0,
    incorrect: 0,
  });
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [showReward, setShowReward] = useState(false);
  const [recentReward, setRecentReward] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);

  const startChallenge = () => {
    if (!selectedOperation) return;
    setIsActive(true);
    setChallengeStats({ correct: 0, incorrect: 0 });
    generateNewProblem(selectedOperation);
  };

  const endChallenge = useCallback(() => {
    setIsActive(false);
    setShowResults(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      endChallenge();
      if (interval) clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, endChallenge]);

  const handleCardSelect = (number: number) => {
    if (!isActive || feedback !== 'none') return;
    
    const result = checkAnswer(number);
    
    setChallengeStats(prev => ({
      ...prev,
      correct: result ? prev.correct + 1 : prev.correct,
      incorrect: !result ? prev.incorrect + 1 : prev.incorrect,
    }));
    
    if (result) {
      setFeedback('correct');
      
      const latestRewardIndex = rewards.length - 1;
      if (latestRewardIndex >= 0 && !recentReward && (challengeStats.correct + 1) % 5 === 0) {
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
      }, 1000);
    } else {
      setFeedback('incorrect');
      setTimeout(() => {
        setFeedback('none');
      }, 1000);
    }
  };

  // Generate number choices in ascending order
  const generateChoices = () => {
    const choices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return choices;
  };
  
  const choiceNumbers = generateChoices();
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 flex flex-col items-center p-4">
      <header className="w-full max-w-md flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="bg-yellow-500 text-white p-2 rounded-full"
        >
          <Home size={24} />
        </button>
        <h1 className="text-2xl font-bold text-yellow-600">Challenge Mode</h1>
        <div className="bg-yellow-500 text-white px-3 py-1 rounded-full flex items-center">
          <Timer size={18} className="mr-1" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </header>
      
      {!isActive && !showResults ? (
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">Choose Your Challenge!</h2>
          <p className="mb-6 text-gray-700">What would you like to practice for 10 minutes?</p>
          <div className="flex justify-center">
            <Mascot emotion="excited" />
          </div>
          <div className="flex gap-4 justify-center mt-6">
            <button 
              onClick={() => setSelectedOperation('addition')}
              className={`px-6 py-3 rounded-xl text-xl font-bold transition-all ${
                selectedOperation === 'addition'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              }`}
            >
              Addition (+)
            </button>
            <button 
              onClick={() => setSelectedOperation('subtraction')}
              className={`px-6 py-3 rounded-xl text-xl font-bold transition-all ${
                selectedOperation === 'subtraction'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              }`}
            >
              Subtraction (-)
            </button>
          </div>
          {selectedOperation && (
            <button 
              onClick={startChallenge}
              className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold py-3 px-6 rounded-xl transition-all w-full"
            >
              Start 10-Minute Challenge!
            </button>
          )}
        </div>
      ) : showResults ? (
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">Challenge Complete!</h2>
          <div className="flex justify-center mb-6">
            <Mascot emotion="excited" size="large" />
          </div>
          <div className="bg-yellow-100 rounded-lg p-4 mb-6">
            <p className="text-xl text-yellow-700 font-bold">Your Score:</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{challengeStats.correct} correct</p>
            <p className="text-gray-600 mt-1">({challengeStats.incorrect} incorrect)</p>
          </div>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => {
                setShowResults(false);
                setTimeLeft(CHALLENGE_TIME);
                setSelectedOperation(null);
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
              Try Again
            </button>
            <button 
              onClick={() => navigate('/')}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full max-w-md mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="text-center mb-4">
                <p className="text-xl font-bold text-yellow-600">What is</p>
                <p className="text-4xl font-bold text-yellow-700 mt-2">
                  {currentProblem.num1} {currentProblem.operator} {currentProblem.num2}
                </p>
              </div>
              
              <div className="mt-6">
                <AnswerBox 
                  feedback={feedback} 
                  answer={null} 
                  accentColor="yellow"
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
                  accentColor="yellow"
                />
              ))}
            </div>
          </div>
          
          {showReward && recentReward !== null && (
            <RewardPopup reward={rewards[recentReward]} onClose={() => setShowReward(false)} />
          )}
        </>
      )}
    </div>
  );
};

export default ChallengeMode;
