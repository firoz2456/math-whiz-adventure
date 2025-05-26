import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Brain, Clock, Settings } from 'lucide-react';
import Mascot from '../components/Mascot';
import { useAppContext } from '../context/AppContext';

const HomePage = () => {
  const { stats } = useAppContext();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 flex flex-col items-center p-4">
      <header className="w-full max-w-md text-center mb-6 mt-8">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">Math Whiz Adventure</h1>
        <p className="text-lg text-purple-500">Fun math games for young explorers!</p>
      </header>
      
      <div className="w-full max-w-md mb-8 flex justify-center">
        <Mascot emotion="happy" size="large" />
      </div>
      
      <div className="w-full max-w-md grid gap-4">
        <Link 
          to="/practice" 
          className="bg-green-500 hover:bg-green-600 text-white rounded-xl p-4 flex items-center transition-all shadow-md hover:shadow-lg"
        >
          <Brain size={28} className="mr-3" />
          <div>
            <h2 className="text-xl font-bold">Practice Mode</h2>
            <p className="text-sm opacity-90">Learn at your own pace</p>
          </div>
        </Link>
        
        <Link 
          to="/challenge" 
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl p-4 flex items-center transition-all shadow-md hover:shadow-lg"
        >
          <Clock size={28} className="mr-3" />
          <div>
            <h2 className="text-xl font-bold">Challenge Mode</h2>
            <p className="text-sm opacity-90">Solve as many as you can in 1 minute!</p>
          </div>
        </Link>
        
        <Link 
          to="/parent" 
          className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl p-4 flex items-center transition-all shadow-md hover:shadow-lg"
        >
          <Settings size={28} className="mr-3" />
          <div>
            <h2 className="text-xl font-bold">Parent Dashboard</h2>
            <p className="text-sm opacity-90">View progress and settings</p>
          </div>
        </Link>
      </div>
      
      {stats.totalProblems > 0 && (
        <div className="mt-8 bg-white bg-opacity-70 rounded-lg p-4 w-full max-w-md">
          <h3 className="text-lg font-bold text-purple-600 flex items-center">
            <Sparkles size={20} className="mr-2 text-yellow-500" />
            Your Progress
          </h3>
          <p className="text-purple-700">
            You've solved {stats.correctAnswers} math problems correctly!
          </p>
          {stats.bestStreak > 0 && (
            <p className="text-purple-700">
              Best streak: {stats.bestStreak} in a row!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;