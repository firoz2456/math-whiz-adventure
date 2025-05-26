import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Award, BarChart3, Settings, Volume2, VolumeX, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { stats, rewards, resetStats, sound, toggleSound } = useAppContext();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'rewards' | 'settings'>('stats');
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
  };
  
  const accuracy = stats.totalProblems > 0 
    ? Math.round((stats.correctAnswers / stats.totalProblems) * 100) 
    : 0;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-blue-100 flex flex-col items-center p-4">
      <header className="w-full max-w-md flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          <Home size={24} />
        </button>
        <h1 className="text-2xl font-bold text-blue-600">Parent Dashboard</h1>
        <div className="w-10"></div> {/* Empty div for layout balance */}
      </header>
      
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mb-6">
        <div className="flex border-b border-gray-200 mb-4">
          <button 
            className={`px-4 py-2 ${activeTab === 'stats' ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('stats')}
          >
            <BarChart3 size={18} className="inline mr-1" />
            Statistics
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'rewards' ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('rewards')}
          >
            <Award size={18} className="inline mr-1" />
            Rewards
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} className="inline mr-1" />
            Settings
          </button>
        </div>
        
        {activeTab === 'stats' && (
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-4">Learning Progress</h2>
            
            {stats.totalProblems > 0 ? (
              <>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Total Problems:</span>
                    <span className="font-bold">{stats.totalProblems}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Correct Answers:</span>
                    <span className="font-bold text-green-600">{stats.correctAnswers}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Incorrect Answers:</span>
                    <span className="font-bold text-red-500">{stats.incorrectAnswers}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Accuracy:</span>
                    <span className="font-bold">{accuracy}%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Best Streak:</span>
                    <span className="font-bold">{stats.bestStreak}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Last Played:</span>
                    <span className="text-sm">{formatDate(stats.lastPlayedAt)}</span>
                  </div>
                </div>
                
                <div className="bg-blue-100 rounded-lg overflow-hidden mb-4">
                  <div className="bg-blue-600 h-6" style={{ width: `${accuracy}%` }}></div>
                </div>
                <p className="text-sm text-gray-600 text-center">Accuracy: {accuracy}%</p>
              </>
            ) : (
              <p className="text-gray-600 text-center">No math problems have been solved yet.</p>
            )}
          </div>
        )}
        
        {activeTab === 'rewards' && (
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-4">Earned Rewards</h2>
            
            {rewards.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {rewards.map((reward) => (
                  <div key={reward.id} className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="bg-yellow-400 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-2">
                      <Award size={24} className="text-yellow-700" />
                    </div>
                    <p className="font-bold text-blue-600">{reward.name}</p>
                    <p className="text-xs text-gray-600">{formatDate(reward.earnedAt)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No rewards earned yet. Keep practicing!</p>
            )}
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-4">Settings</h2>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Sound Effects</span>
                <button 
                  onClick={toggleSound}
                  className={`p-2 rounded-full ${sound ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'}`}
                >
                  {sound ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-bold text-red-500 mb-2">Reset Progress</h3>
              <p className="text-sm text-gray-600 mb-4">
                This will reset all statistics and rewards. This action cannot be undone.
              </p>
              
              {!showResetConfirm ? (
                <button 
                  onClick={() => setShowResetConfirm(true)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all"
                >
                  Reset All Progress
                </button>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start mb-3">
                    <AlertTriangle size={20} className="text-red-500 mr-2 mt-0.5" />
                    <p className="text-red-600 font-medium">Are you sure you want to reset all progress?</p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        resetStats();
                        setShowResetConfirm(false);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all"
                    >
                      Yes, Reset All
                    </button>
                    <button 
                      onClick={() => setShowResetConfirm(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <p className="text-xs text-gray-500 mt-auto">
        Math Whiz Adventure - Designed for children aged 6
      </p>
    </div>
  );
};

export default ParentDashboard;