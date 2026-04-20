# 🃏 Memory Flip Game PRO

## 📋 Project Title & Description

**Title:** Memory Flip Game PRO - Interactive Card Matching Game

**Description:** 
A modern, feature-rich memory card matching game built with vanilla JavaScript, HTML5, and CSS3. This browser-based game challenges players to find matching pairs of emoji cards within a time limit across three difficulty levels. The game features a comprehensive achievement system, persistent leaderboards, real-time statistics tracking, and an engaging user interface with sound effects and animations.

## 🎯 Problem Statement

### Overview
Develop an interactive memory card matching game that provides an engaging and challenging experience for users of all ages. The game must test players' memory and concentration skills while providing immediate feedback, progress tracking, and motivational elements through achievements and leaderboards.

### Core Challenges
1. **Game Mechanics**: Implement a robust card-flipping mechanism with match detection, move counting, and timer functionality
2. **User Experience**: Create an intuitive interface with smooth animations, visual feedback, and responsive design
3. **Data Persistence**: Store game history, player statistics, and preferences using browser LocalStorage
4. **Performance**: Ensure smooth gameplay with efficient DOM manipulation and event handling
5. **Validation & Security**: Implement proper input validation and sanitization to prevent security vulnerabilities
6. **Accessibility**: Design for multiple devices (desktop, tablet, mobile) with touch-friendly controls

### Requirements
- Three difficulty levels with varying complexity and time limits
- Player registration with validation (name, age, gender)
- Real-time game statistics (moves, pairs, time, hints)
- Hint system to assist struggling players
- Pause/Resume functionality
- Achievement system to reward milestones
- Leaderboard with smart ranking algorithm
- Dark mode for user preference
- Sound effects with toggle option
- Keyboard shortcuts for power users
- 100% vanilla JavaScript (no frameworks or libraries)
- Complete separation of concerns (HTML/CSS/JS in separate files)

## 🎮 Features Implemented

### 1. Core Game Features
- **Three Difficulty Levels**
  - 🟢 Easy: 6 pairs (12 cards), 30 seconds, 1 hint
  - 🟡 Medium: 9 pairs (18 cards), 60 seconds, 2 hints
  - 🔴 Hard: 12 pairs (24 cards), 90 seconds, 3 hints

- **Game Controls**
  - Pause/Resume functionality
  - Smart hint system with visual peek and error feedback
  - Hint depletion notification ("No hints available!")
  - Restart and quit options
  - Keyboard shortcuts (P=Pause, H=Hint, Q=Quit, R=Resume)

### Player Features
- **User Profile**
  - Name validation (2-20 characters, letters only)
  - Age validation (5-120 years)
  - Gender selection
  - Form validation with real-time error messages

- **Statistics Tracking**
  - Moves counter
  - Pairs matched
  - Time remaining
  - Hints used
  - Time taken (for wins)
  - Best score per difficulty

### Advanced Features
- **🏆 Achievement System (v2.0)**
  - **7 Total Achievements:**
    - 🎉 First Victory - Win your first game
    - ⚡ Speed Demon - Win in under 20 moves
    - 🧠 Perfect Memory - Win without using hints (Shows popup EVERY time!)
    - 🎮 Enthusiast - Play 10 games
    - 👑 Master - Win 25 games
    - 💪 Hard Mode Hero - Win on hard difficulty
    - 🔥 5 Win Streak - Win 5 games in a row
  
  - **Achievement Features:**
    - Sequential display with 3.5s delay between each
    - LocalStorage persistence for all achievements
    - Special "Perfect Memory" behavior: shows every win without hints
    - Comprehensive console logging for debugging
    - Interactive status checker with progress tracking
    - Achievement reset functionality
  
  - **Debug Console (🔍 Check Achievements Button):**
    - Visual status indicators (✅ unlocked / 🔒 locked)
    - Progress bars showing current vs required stats
    - Win rate percentage calculation
    - Current streak vs best streak display
    - Complete stats breakdown
    - One-click reset with page reload

- **📊 Leaderboard System**
  - Separate leaderboards for each difficulty
  - Smart ranking (winners by moves, losers by pairs formed)
  - Full game history with timestamps
  - Time taken display for winning games (formatted as Xm Ys)
  - Player statistics (name, age, gender)
  - Smart button states (disabled when history empty)
  - Hover effects for leaderboard entries
  - Gradient backgrounds (green for wins, red for losses)

- **📈 Statistics System**
  - Complete game statistics tracking:
    - Total games played
    - Games won / lost
    - Win rate percentage
    - Best moves record
    - No-hint wins counter
    - Hard mode wins
    - Current win streak
    - Best win streak
  - Real-time stat updates after each game
  - LocalStorage persistence
  - Integration with achievement system

- **🎨 Visual & Audio**
  - 🌙 Dark mode toggle
  - 🔊 Sound effects (flip, match, mismatch, win, lose)
  - Sound on/off toggle
  - Confetti animation on win
  - Card flip animations (3D effect)
  - Smooth transitions and hover effects

- **💾 Data Persistence**
  - LocalStorage for game history
  - Save/resume game state
  - Achievement tracking
  - Player preferences (dark mode, sound)
  - Best scores per difficulty

## 🚀 Steps to Run the Project

### Method 1: Direct File Opening
1. **Download the Project**
   - Clone or download this repository to your local machine
   - Extract the files if downloaded as ZIP

2. **Locate the Files**
   - Navigate to the `end term project` folder
   - Ensure you have all 4 files: `index.html`, `style.css`, `script.js`, `README.md`

3. **Open in Browser**
   - Double-click `index.html` to open it in your default browser
   - Or right-click → Open With → Choose your preferred browser (Chrome recommended)

4. **Start Playing**
   - Enter your name (2-20 characters, letters only)
   - Enter your age (5-120 years)
   - Select your gender
   - Choose difficulty level (Easy/Medium/Hard)
   - Click "▶ Start Game" and enjoy!

### Method 2: Using Local Server (Optional)
1. **Using Python** (if installed):
   ```bash
   # Navigate to project folder
   cd "end term project"
   
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   Then open `http://localhost:8000` in your browser

2. **Using Node.js** (if installed):
   ```bash
   # Install http-server globally
   npm install -g http-server
   
   # Navigate to project folder and run
   cd "end term project"
   http-server
   ```
   Then open the URL shown in terminal

3. **Using VS Code Live Server**:
   - Install "Live Server" extension in VS Code
   - Right-click `index.html` → "Open with Live Server"

### System Requirements
- **Browser**: Chrome, Firefox, Safari, Edge, or Opera (latest versions)
- **JavaScript**: Must be enabled
- **LocalStorage**: Must be enabled (for saving game history)
- **Screen Resolution**: Minimum 320px width (responsive design)
- **Internet**: Not required (works completely offline)

## 🎯 How to Play

1. **Start**: Enter your player information and choose difficulty
2. **Match Cards**: Click cards to flip them over
3. **Find Pairs**: Match two identical emoji cards
4. **Use Hints**: Click the 💡 Hint button to briefly reveal all cards
5. **Win**: Match all pairs before the timer runs out
6. **Track Progress**: View your game history and achievements

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `P` | Pause game |
| `R` | Resume game (when paused) |
| `H` | Use hint |
| `Q` | Quit to main menu |

## 📁 Project Structure

```
end term project/
├── index.html      # Main HTML structure
├── style.css       # All styles and animations
├── script.js       # Game logic and functionality
└── README.md       # This file
```

## 🧠 DOM Concepts Used

This project demonstrates comprehensive understanding and implementation of various DOM manipulation techniques and web development concepts:

### 1. DOM Selection & Traversal
- **`getElementById()`**: Selecting specific elements by ID
  ```javascript
  const board = document.getElementById("board");
  const movesEl = document.getElementById("moves");
  ```
- **`querySelector()` / `querySelectorAll()`**: CSS selector-based selection
- **`closest()`**: Finding nearest ancestor element (event delegation)
  ```javascript
  const card = e.target.closest(".card");
  ```

### 2. DOM Manipulation
- **`createElement()`**: Dynamically creating card elements
  ```javascript
  const c = document.createElement("div");
  ```
- **`appendChild()`**: Adding elements to the board
- **`remove()`**: Removing confetti elements after animation
- **`innerHTML`**: Setting card content with emoji
- **`textContent`**: Updating score displays safely

### 3. Class List Manipulation
- **`classList.add()`**: Adding classes for animations and states
  ```javascript
  card.classList.add("flipped", "matched", "wrong");
  ```
- **`classList.remove()`**: Removing temporary states
- **`classList.toggle()`**: Toggling dark mode
- **`classList.contains()`**: Checking element states

### 4. Event Handling
- **Event Delegation**: Efficient handling of card clicks on parent container
  ```javascript
  board.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      if (!card) return;
      clickCard(card);
  });
  ```
- **Multiple Event Listeners**: Click, keyboard, load events
- **`addEventListener()`**: Attaching event handlers
- **`window.load`**: Initializing on page load
- **Keyboard Events**: `keydown` for shortcuts (P, H, Q, R)

### 5. Data Attributes
- **`dataset`**: Storing card values
  ```javascript
  c.dataset.v = emoji;
  first.dataset.v === second.dataset.v // Checking match
  ```

### 6. Timers & Async Operations
- **`setInterval()`**: Game countdown timer
  ```javascript
  timer = setInterval(() => {
      time--;
      updateUI();
      if (time <= 0) lose();
  }, 1000);
  ```
- **`setTimeout()`**: Delayed card flip-back, animations
- **`clearInterval()`**: Stopping timer on win/loss/pause
- **`Date.now()`**: Precise time tracking for game duration

### 7. LocalStorage API
- **`localStorage.setItem()`**: Saving game history, settings, achievements
  ```javascript
  localStorage.setItem("gameHistory", JSON.stringify(history));
  ```
- **`localStorage.getItem()`**: Retrieving saved data
- **`JSON.parse()` / `JSON.stringify()`**: Serializing complex objects
- **Persistent data**: Dark mode, sound settings, best scores

### 8. Form Validation
- **Input validation**: Real-time error checking
- **Regex patterns**: Name validation (`/^[a-zA-Z\s]+$/`)
- **Range validation**: Age boundaries (5-120)
- **XSS sanitization**: Preventing script injection
  ```javascript
  sanitize(str) {
      return str.replace(/[<>\"\']/g, '');
  }
  ```

### 9. CSS Class Management for States
- **Game states**: `.active`, `.paused`, `.disabled`
- **Animation triggers**: `.flipped`, `.matched`, `.wrong`, `.hint-peek`
- **Theme switching**: `.dark` class on body
- **Visual feedback**: Dynamic class addition/removal

### 10. Dynamic Styling
- **Inline styles**: Confetti positioning
  ```javascript
  confetti.style.left = Math.random() * window.innerWidth + 'px';
  confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
  ```
- **Computed styles**: Responsive grid adjustments

### 11. Web Audio API
- **Sound generation**: Creating beep tones dynamically
  ```javascript
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  osc.frequency.value = frequency;
  ```
- **Sound management**: Play/mute toggle

### 12. Advanced DOM Techniques
- **Event bubbling**: Using parent element to handle child clicks
- **Preventing default**: Form submission handling
- **Stop propagation**: Preventing unwanted event triggers
- **Document fragments**: Efficient bulk DOM updates (implicit in appendChild loop)

### 13. Window & Document Events
- **`window.addEventListener("load")`**: Page initialization
- **`window.addEventListener("keydown")`**: Global keyboard shortcuts
- **Viewport detection**: Responsive design handling

### 14. Element State Management
- **Boolean flags**: `busy`, `paused`, `first`, `second`
- **Preventing rapid clicks**: State-based click blocking
- **Race condition prevention**: Timer management on win

### 15. Template Literals
- **Dynamic HTML generation**: Overlay content, leaderboards
  ```javascript
  showEnd(`
      🏅 Congratulations!<br>
      Moves: ${moves}<br>
      Time Taken: ${timeDisplay}
  `);
  ```

## 🛠️ Technical Implementation

### Technologies Used
- **HTML5**: Semantic structure, data attributes
- **CSS3**: Grid layout, Flexbox, animations, media queries
- **JavaScript (ES6+)**: Modules, arrow functions, template literals, async operations

### Key Features Implementation

#### Smart UI Interactions
- **Hint Button**: 
  - Shows "❌ No hints available!" message when clicked after hints exhausted
  - Visual disabled state (opacity, line-through) while remaining clickable
  - Audio feedback (mismatch sound) on error
  - Pause state detection ("⏸ Game is paused" message)
- **History Button**: 
  - Automatically disabled when no games played
  - Shows tooltip message "No games played yet"
  - Re-enables when games are added
- **Clear History Button**: 
  - Validates before clearing
  - Confirmation prompt for safety

#### Input Validation
- XSS protection via HTML sanitization
- Regex validation for names (`/^[a-zA-Z\s]+$/`)
- Range checking for age (5-120)
- Real-time error feedback

#### Game Logic
- Fisher-Yates shuffle algorithm for proper randomization
- Event delegation for efficient card click handling
- Timer with pause/resume functionality
- **Race condition prevention**: Timer stops immediately on final match to ensure correct win detection
- LocalStorage API for persistent data
- Time tracking from game start to completion

#### Animations
- CSS3 keyframe animations (card flip, shake, confetti)
- 3D card flip effect using `transform: rotateY()`
- Smooth transitions and hover effects

#### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet), 480px (mobile)
- Touch-friendly buttons and cards
- Adaptive grid layouts

## 🎨 Color Scheme

- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Dark Purple)
- Success: `#4ECDC4` (Turquoise)
- Error: `#ff6b6b` (Red)
- Dark Mode: `#1a1a2e` / `#16213e`

## 📊 Game Ranking System

### Winners
Ranked by **fewest moves** (ascending)
- Lower moves = Higher rank

### Losers
Ranked by:
1. **Most pairs formed** (descending)
2. **Fewest moves** (tie-breaker, ascending)

## 🔒 Security Features

- HTML sanitization to prevent XSS attacks
- Input validation with whitelist approach
- No eval() or dangerous DOM manipulation
- Safe localStorage usage

## 🌐 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

Requires modern browser with ES6+ support and Web Audio API.

## 📱 Responsive Breakpoints

- **Desktop**: > 768px (6-column grid)
- **Tablet**: 480px - 768px (4-column grid)
- **Mobile**: < 480px (4-column grid, reduced spacing)

## 💡 Future Enhancements

- [ ] Multiplayer mode
- [ ] Custom emoji sets
- [ ] Difficulty customization
- [ ] Social media sharing
- [ ] Global leaderboard
- [ ] More achievement types
- [ ] Theme customization
- [ ] Sound effect variations

## 🐛 Known Issues & Fixes

### Recently Fixed
- ✅ **Hint Button Clickability** (v1.2): Fixed CSS `pointer-events` blocking clicks on disabled buttons. Now shows error message when hints exhausted.
- ✅ **Win Timing Race Condition** (v1.2): Fixed edge case where winning exactly when timer hits 0 could trigger loss. Timer now stops immediately on final match.
- ✅ **Time Tracking Accuracy** (v1.1): Implemented precise time tracking using `Date.now()` for accurate completion time measurement.

### Current Status
No known issues at this time. Please report any bugs by creating an issue.

## ⚠️ Known Limitations

### Technical Limitations
1. **Browser Storage Limit**
   - LocalStorage has a 5-10MB limit per domain
   - Large game histories (1000+ games) may approach this limit
   - Recommendation: Clear old history periodically

2. **No Backend Persistence**
   - All data stored locally in browser
   - Clearing browser data will delete game history
   - No sync across devices or browsers

3. **Single Player Only**
   - Currently supports only single-player mode
   - No multiplayer or competitive features

4. **Web Audio API Dependency**
   - Sound effects require Web Audio API support
   - May not work in older browsers (pre-2015)
   - Works fine with sound disabled

### Browser-Specific Issues
5. **Private/Incognito Mode**
   - LocalStorage may be disabled or cleared on exit
   - Game history won't persist between sessions
   - Workaround: Use normal browsing mode

6. **IE11 and Older Browsers**
   - Requires ES6+ support (arrow functions, template literals, etc.)
   - Not compatible with Internet Explorer 11 or older
   - Use modern browsers (Chrome, Firefox, Safari, Edge)

### Feature Limitations
7. **No Global Leaderboard**
   - Leaderboards are local to the browser only
   - Cannot compare scores with other players globally

8. **Fixed Emoji Sets**
   - Emoji sets are predefined and cannot be customized
   - No option to upload custom images

9. **No Difficulty Customization**
   - Cannot create custom difficulty levels
   - Time, pairs, and hints are fixed per difficulty

10. **Achievement System**
    - Achievements are tracked locally only
    - No badges or visual rewards beyond notifications
    - Cannot reset achievements individually

### UI/UX Limitations
11. **Mobile Keyboard Shortcuts**
    - Keyboard shortcuts (P, H, Q, R) not available on mobile devices
    - Touch-only controls on mobile

12. **Animation Performance**
    - Confetti animation may be choppy on low-end devices
    - Performance degrades with many simultaneous animations

13. **Accessibility**
    - No screen reader support for visually impaired users
    - No high-contrast mode option
    - Emoji may not be accessible to all users

### Future Enhancement Opportunities
These limitations present opportunities for future development:
- Backend integration for cloud saves
- Multiplayer functionality
- Custom themes and emoji packs
- Advanced accessibility features
- Progressive Web App (PWA) capabilities
- Export/import game history

## 📝 Code Quality

- Clean, modular code structure
- Comprehensive comments
- Consistent naming conventions
- No inline styles (all CSS external)
- Separation of concerns (HTML/CSS/JS)
- Bug-free implementation with edge case handling
- User-friendly error messages and feedback

## 👨‍💻 Author

Created as an end term project demonstrating:
- DOM manipulation
- Event handling
- LocalStorage API
- CSS animations
- Responsive design
- Game development concepts

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Emoji graphics from Unicode standard
- Inspired by classic memory card games
- Built with vanilla JavaScript (no frameworks!)

---

**Enjoy the game! 🎮 Train your brain! 🧠**
