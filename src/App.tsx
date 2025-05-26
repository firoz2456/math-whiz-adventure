import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PracticeMode from './pages/PracticeMode';
import ChallengeMode from './pages/ChallengeMode';
import ParentDashboard from './pages/ParentDashboard';
import { AppProvider } from './context/AppContext';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/practice',
      element: <PracticeMode />,
    },
    {
      path: '/challenge',
      element: <ChallengeMode />,
    },
    {
      path: '/parent',
      element: <ParentDashboard />,
    },
  ]);

  return (
    <AppProvider>
      <div className="app-container font-rounded text-slate-800">
        <RouterProvider router={router} />
      </div>
    </AppProvider>
  );
}

export default App;