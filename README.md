# Math Whiz Adventure 🧮✨

An interactive educational math game designed specifically for 6-year-olds to make learning arithmetic fun and engaging!

## 🎯 Features

- **Age-Appropriate Math Problems**: Addition and subtraction problems tailored for young learners
- **Multiple Game Modes**:
  - **Practice Mode**: Free play for skill building
  - **Challenge Mode**: Timed challenges with dynamic duration selection
  - **Parent Dashboard**: Progress tracking and statistics
- **Reward System**: Earn stickers and badges for every 5 correct answers
- **Animated Mascot**: Friendly character to guide and encourage learning
- **Sound Controls**: Toggle sound effects on/off
- **Progress Tracking**: Persistent statistics and achievements stored locally

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/firoz2456/math-whiz-adventure.git
cd math-whiz-adventure
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AnswerBox.tsx   # Number input interface
│   ├── Mascot.tsx      # Animated character
│   ├── NumberCard.tsx  # Problem display
│   └── RewardPopup.tsx # Achievement notifications
├── pages/              # Main application pages
│   ├── HomePage.tsx    # Main menu
│   ├── PracticeMode.tsx # Free play mode
│   ├── ChallengeMode.tsx # Timed challenges
│   └── ParentDashboard.tsx # Progress tracking
├── context/            # Global state management
│   └── AppContext.tsx  # Centralized app state
├── utils/              # Utility functions
│   └── mathUtils.ts    # Math problem generation
└── types/              # TypeScript type definitions
    └── index.ts
```

### State Management

The application uses React Context for centralized state management, handling:
- Math problems and game logic
- Statistics tracking (correct answers, streaks)
- Reward system (stickers/badges)
- Settings (sound preferences)
- Persistent data storage via localStorage

## 🎮 Game Mechanics

### Math Problems

- **Addition**: Numbers 0-5, sums ≤ 10
- **Subtraction**: Positive results only, minuend ≤ 9
- Problems are generated dynamically to ensure variety

### Reward System

- Earn stickers/badges every 5 correct answers
- Progress is saved and persists between sessions
- Visual feedback encourages continued learning

### Challenge Mode

- Timed challenges with configurable duration
- Dynamic timer display based on selected time
- Performance tracking and statistics

## 💾 Data Persistence

All game data is stored in localStorage with the following keys:
- `mathWhizStats` - Game statistics and progress
- `mathWhizRewards` - Earned stickers and badges
- `mathWhizSound` - Sound preference settings

## 🎨 Design Philosophy

Math Whiz Adventure is designed with young learners in mind:
- **Simple Interface**: Clean, intuitive design that's easy to navigate
- **Positive Reinforcement**: Encouraging feedback and rewards
- **Age-Appropriate Content**: Math problems suitable for 6-year-olds
- **Engaging Visuals**: Colorful interface with friendly animations

## 📱 Browser Compatibility

The application is built with modern web standards and works best on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with love for young mathematicians everywhere
- Inspired by the need to make learning math fun and accessible
- Thanks to all the educators and parents who help children discover the joy of mathematics

---

Made with ❤️ for curious young minds