// Math problem definition
export interface Problem {
  num1: number;
  num2: number;
  operator: string;
  answer: number;
}

// Game statistics
export interface GameStats {
  totalProblems: number;
  correctAnswers: number;
  incorrectAnswers: number;
  streakCount: number;
  bestStreak: number;
  lastPlayedAt: string | null;
}

// Rewards (stickers and badges)
export interface Reward {
  id: string;
  type: 'sticker' | 'badge';
  name: string;
  earnedAt: string;
}

// Operation type
export type Operation = 'addition' | 'subtraction';