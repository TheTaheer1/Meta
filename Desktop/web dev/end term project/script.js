/* SOUND EFFECTS SYSTEM */
const Sound = {
    enabled: localStorage.getItem("soundEnabled") !== "false",
    
    play(type) {
        if (!this.enabled) return;
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch(type) {
            case 'flip':
                oscillator.frequency.value = 400;
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
            case 'match':
                oscillator.frequency.value = 800;
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
            case 'mismatch':
                oscillator.frequency.value = 200;
                gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
            case 'win':
                [523, 659, 784, 1047].forEach((freq, i) => {
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();
                    osc.connect(gain);
                    gain.connect(audioContext.destination);
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.1, audioContext.currentTime + i * 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.2);
                    osc.start(audioContext.currentTime + i * 0.1);
                    osc.stop(audioContext.currentTime + i * 0.1 + 0.2);
                });
                break;
            case 'lose':
                oscillator.frequency.value = 150;
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.5);
                break;
        }
    },
    
    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem("soundEnabled", this.enabled);
        soundIndicator.textContent = this.enabled ? '🔊' : '🔇';
    }
};

/* INPUT VALIDATION */
const Validator = {
    sanitize(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },
    
    validateName(name) {
        const trimmed = name.trim();
        if (trimmed.length < 2 || trimmed.length > 20) {
            return { valid: false, error: "Name must be 2-20 characters" };
        }
        if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
            return { valid: false, error: "Name must contain only letters" };
        }
        return { valid: true, value: this.sanitize(trimmed) };
    },
    
    validateAge(age) {
        const num = parseInt(age);
        if (isNaN(num) || num < 5 || num > 120) {
            return { valid: false, error: "Age must be between 5 and 120" };
        }
        return { valid: true, value: num };
    },
    
    validateGender(gender) {
        if (!gender || !['Male', 'Female', 'Other'].includes(gender)) {
            return { valid: false, error: "Please select your gender" };
        }
        return { valid: true, value: gender };
    }
};

/* ACHIEVEMENTS SYSTEM */
const Achievements = {
    list: [
        { id: 'first_win', name: 'First Victory', desc: 'Won your first game', icon: '🎉', check: (stats) => stats.gamesWon >= 1 },
        { id: 'speed_demon', name: 'Speed Demon', desc: 'Won in under 20 moves', icon: '⚡', check: (stats) => stats.bestMoves > 0 && stats.bestMoves < 20 },
        { id: 'perfect_game', name: 'Perfect Memory', desc: 'Won without hints', icon: '🧠', check: (stats) => stats.noHintWins >= 1 },
        { id: 'enthusiast', name: 'Enthusiast', desc: 'Played 10 games', icon: '🎮', check: (stats) => stats.totalGames >= 10 },
        { id: 'master', name: 'Master', desc: 'Won 25 games', icon: '👑', check: (stats) => stats.gamesWon >= 25 },
        { id: 'hard_mode', name: 'Hard Mode Hero', desc: 'Won on hard difficulty', icon: '💪', check: (stats) => stats.hardWins >= 1 },
        { id: 'streak_5', name: '5 Win Streak', desc: 'Won 5 games in a row', icon: '🔥', check: (stats) => stats.bestStreak >= 5 },
    ],
    
    getUnlocked() {
        return JSON.parse(localStorage.getItem('achievements') || '[]');
    },
    
    check(stats, currentGameHintsUsed = null) {
        const unlocked = this.getUnlocked();
        const newAchievements = [];
        let unlockedChanged = false; // Track if unlocked array was modified
        
        console.log('🔍 Checking achievements...');
        console.log('📊 Current stats:', stats);
        console.log('🎮 Current game hints used:', currentGameHintsUsed);
        console.log('🔓 Unlocked achievements:', unlocked);
        
        this.list.forEach(achievement => {
            const isUnlocked = unlocked.includes(achievement.id);
            const meetsCondition = achievement.check(stats);
            console.log(`  ${achievement.icon} ${achievement.name}: unlocked=${isUnlocked}, meets=${meetsCondition}`);
            
            // Perfect Memory shows every time ONLY if no hints used in CURRENT game
            if (achievement.id === 'perfect_game') {
                // Check if hints were used in the CURRENT game (not cumulative stats)
                if (currentGameHintsUsed === 0) {
                    // Add to localStorage if not already there
                    if (!isUnlocked) {
                        unlocked.push(achievement.id);
                        unlockedChanged = true;
                    }
                    // Always add to newAchievements to show popup when earned THIS game
                    newAchievements.push(achievement);
                    console.log(`  ⭐ PERFECT MEMORY (earned THIS game - no hints used)`);
                } else {
                    console.log(`  ❌ PERFECT MEMORY not earned (${currentGameHintsUsed} hints used this game)`);
                }
            } else if (!isUnlocked && meetsCondition) {
                unlocked.push(achievement.id);
                unlockedChanged = true;
                newAchievements.push(achievement);
                console.log(`  ⭐ NEW ACHIEVEMENT: ${achievement.name}`);
            }
        });
        
        // Save to localStorage if unlocked array was modified
        if (unlockedChanged) {
            localStorage.setItem('achievements', JSON.stringify(unlocked));
            console.log('💾 Saved achievements:', unlocked);
        }
        
        // Show popup notifications for new achievements
        if (newAchievements.length > 0) {
            // Show achievements one after another with 3.5s delay between each
            newAchievements.forEach((a, index) => {
                setTimeout(() => this.show(a), index * 3500);
            });
        } else {
            console.log('ℹ️ No new achievements');
        }
        
        return newAchievements;
    },
    
    show(achievement) {
        const popup = document.getElementById('achievementPopup');
        console.log('🎯 SHOWING ACHIEVEMENT:', achievement.name);
        console.log('📍 Popup element:', popup);
        popup.innerHTML = `
            <h3>${achievement.icon} ${achievement.name}</h3>
            <p>${achievement.desc}</p>
        `;
        popup.classList.add('show');
        console.log('✅ Added show class, classList:', popup.classList);
        Sound.play('win');
        
        setTimeout(() => {
            popup.classList.remove('show');
            console.log('❌ Removed show class');
        }, 3000);
    }
};

/* STATISTICS SYSTEM */
const Stats = {
    get() {
        return JSON.parse(localStorage.getItem('gameStats') || JSON.stringify({
            totalGames: 0,
            gamesWon: 0,
            gamesLost: 0,
            bestMoves: 0,
            bestStreak: 0,
            currentStreak: 0,
            noHintWins: 0,
            hardWins: 0,
            totalPlayTime: 0
        }));
    },
    
    update(won, moves, hintsUsed, difficulty) {
        const stats = this.get();
        console.log('📈 Stats BEFORE update:', JSON.parse(JSON.stringify(stats)));
        console.log('🎮 Game data: won=', won, 'moves=', moves, 'hintsUsed=', hintsUsed, 'difficulty=', difficulty);
        
        stats.totalGames++;
        
        if (won) {
            stats.gamesWon++;
            stats.currentStreak++;
            stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
            
            if (!stats.bestMoves || moves < stats.bestMoves) {
                stats.bestMoves = moves;
            }
            
            if (hintsUsed === 0) {
                stats.noHintWins++;
                console.log('🧠 NO HINTS USED! noHintWins is now:', stats.noHintWins);
            }
            
            if (difficulty === 'hard') {
                stats.hardWins++;
            }
        } else {
            stats.gamesLost++;
            stats.currentStreak = 0;
        }
        
        localStorage.setItem('gameStats', JSON.stringify(stats));
        console.log('📈 Stats AFTER update:', stats);
        console.log('🏆 Calling Achievements.check()...');
        // Pass hintsUsed to achievement check for Perfect Memory detection
        const newAchievements = Achievements.check(stats, hintsUsed);
        return newAchievements;
    }
};

/* ---------------- DOM ELEMENTS ---------------- */
// Menu elements
const menu = document.getElementById("menu");
const game = document.getElementById("game");
const historyPage = document.getElementById("historyPage");

// Form inputs
const playerName = document.getElementById("playerName");
const playerAge = document.getElementById("playerAge");
const playerGender = document.getElementById("playerGender");
const difficulty = document.getElementById("difficulty");

// Buttons
const startGame = document.getElementById("startGame");
const darkBtn = document.getElementById("darkBtn");
const hintBtn = document.getElementById("hintBtn");
const pauseBtn = document.getElementById("pauseBtn");
const soundIndicator = document.getElementById("soundIndicator");

// Text elements
const welcomeText = document.getElementById("welcomeText");

// Game board and stats
const board = document.getElementById("board");
const movesEl = document.getElementById("moves");
const pairsEl = document.getElementById("pairs");
const timeEl = document.getElementById("time");
const hintsEl = document.getElementById("hints");
const overlay = document.getElementById("overlay");
const overlayBox = document.getElementById("overlayBox");

/* ---------------- SETTINGS (LocalStorage) ---------------- */
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

const savedDiff = localStorage.getItem("lastDifficulty");
if (savedDiff) difficulty.value = savedDiff;

/* ---------------- DATA ---------------- */
const emojis = {
    easy: ['🍎', '🍌', '🍇', '🍓', '🍉', '🍍'],
    medium: ['🐶', '🐱', '🐼', '🦊', '🐸', '🐵', '🦁', '🐯', '🐻'],
    hard: ['⚽', '🏀', '🏈', '🎾', '🎱', '🏐', '🏓', '🥊', '🥋', '⛳', '🏸', '⚾']
};

/* ---------------- STATE ---------------- */
let first = null, second = null, busy = false;
let moves = 0, pairs = 0, time = 60, timer;
let hintLeft = 2, paused = false, values = [];
let currentPlayer = null;
let totalHints = 0;
let startTime = 0, timeTaken = 0;

window.addEventListener("load", () => {
    const gameActive = localStorage.getItem("gameActive") === "true";
    const savedPlayer = JSON.parse(localStorage.getItem("currentPlayer"));

    if (gameActive && savedPlayer) {
        currentPlayer = savedPlayer;
        playerName.value = savedPlayer.name;
        playerAge.value = savedPlayer.age;
        playerGender.value = savedPlayer.gender;

        menu.classList.remove("active");
        game.classList.add("active");
        init();
    } else {
        localStorage.removeItem("currentPlayer");
        playerName.value = "";
        playerAge.value = "";
        playerGender.value = "";
    }
    
    // Update history button on page load
    updateHistoryButton();
});

/* ---------------- EVENT DELEGATION ---------------- */
board.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    clickCard(card);
});

/* ---------------- GAME START ---------------- */
startGame.onclick = () => {
    // Validate inputs with proper validation
    const nameValidation = Validator.validateName(playerName.value);
    const ageValidation = Validator.validateAge(playerAge.value);
    const genderValidation = Validator.validateGender(playerGender.value);

    let hasError = false;

    // Name validation
    if (!nameValidation.valid) {
        playerName.classList.add('error');
        document.getElementById('nameError').textContent = nameValidation.error;
        document.getElementById('nameError').classList.add('visible');
        hasError = true;
    } else {
        playerName.classList.remove('error');
        document.getElementById('nameError').classList.remove('visible');
    }

    // Age validation
    if (!ageValidation.valid) {
        playerAge.classList.add('error');
        document.getElementById('ageError').textContent = ageValidation.error;
        document.getElementById('ageError').classList.add('visible');
        hasError = true;
    } else {
        playerAge.classList.remove('error');
        document.getElementById('ageError').classList.remove('visible');
    }

    // Gender validation
    if (!genderValidation.valid) {
        playerGender.classList.add('error');
        document.getElementById('genderError').classList.add('visible');
        hasError = true;
    } else {
        playerGender.classList.remove('error');
        document.getElementById('genderError').classList.remove('visible');
    }

    if (hasError) {
        Sound.play('mismatch');
        return;
    }

    currentPlayer = { 
        name: nameValidation.value,
        age: ageValidation.value,
        gender: genderValidation.value
    };
    
    localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));
    localStorage.setItem("gameActive", "true");

    welcomeText.textContent = `HELLO ${currentPlayer.name.toUpperCase()} 👋`;

    localStorage.setItem("lastDifficulty", difficulty.value);

    Sound.play('match');
    menu.classList.remove("active");
    game.classList.add("active");

    init();
    showTempMessage("🎮 Game Started", 1000);
};

/* ---------------- INIT ---------------- */
function init() {
    board.innerHTML = "";
    moves = pairs = 0;

    paused = false;
    pauseBtn.textContent = "⏸";

    const diff = difficulty.value;

    // Set board grid class based on difficulty
    board.className = `board ${diff}`;

    // ----- HINTS PER DIFFICULTY -----
    if (diff === "easy") hintLeft = 1;
    else if (diff === "medium") hintLeft = 2;
    else hintLeft = 3;

    totalHints = hintLeft;
    hintsEl.textContent = hintLeft;
    hintBtn.classList.remove("disabled");

    // ----- BEST SCORE PER DIFFICULTY -----
    const bestKey = `bestScore_${diff}`;
    const bestScore = localStorage.getItem(bestKey);

    document.getElementById("level").textContent = diff;
    document.getElementById("best").textContent = bestScore ?? "-";

    // ----- BOARD SETUP -----
    values = [];
    emojis[diff].forEach(e => values.push(e, e));

    time = diff === "easy" ? 30 : diff === "medium" ? 60 : 90;

    shuffle(values).forEach(v => board.appendChild(card(v)));

    updateUI();
    startTimer();
    
    // Start tracking time taken
    startTime = Date.now();
}

/* ---------------- CARD ---------------- */
function card(v) {
    const c = document.createElement("div");
    c.className = "card";
    c.dataset.v = v;
    c.innerHTML = `<div class="inner"><div class="front"></div><div class="back">${v}</div></div>`;
    return c;
}

/* ---------------- CLICK ---------------- */
function clickCard(c) {
    if (busy || paused || c === first || c.classList.contains("matched")) return;
    
    Sound.play('flip');
    c.classList.add("flipped");

    if (!first) { 
        first = c; 
        return; 
    }
    
    second = c; 
    busy = true; 
    moves++; 
    updateUI();
    
    if (first.dataset.v === second.dataset.v) {
        Sound.play('match');
        first.classList.add("matched");
        second.classList.add("matched");
        pairs++;
        updateUI();

        // Check if this is the winning match
        if (pairs === values.length / 2) {
            clearInterval(timer); 
        }

        setTimeout(() => {
            reset();
            if (pairs === values.length / 2) {
                win();
            }
        }, 400);
    }
    else {
        Sound.play('mismatch');
        first.classList.add("wrong");
        second.classList.add("wrong");
        
        setTimeout(() => {
            first.classList.remove("flipped", "wrong");
            second.classList.remove("flipped", "wrong");
            reset();
        }, 800);
    }
}

function reset() { 
    first = second = null; 
    busy = false;
}

/* ---------------- TIMER ---------------- */
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (!paused) {
            time--; 
            updateUI();
            if (time <= 0) lose();
        }
    }, 1000);
}

hintBtn.onclick = () => {
    // Check if no hints left
    if (hintLeft <= 0) {
        showTempMessage("❌ No hints available!", 1500);
        Sound.play('mismatch');
        return;
    }

    // Don't allow hints when game is paused
    if (paused) {
        showTempMessage("⏸ Game is paused", 1000);
        return;
    }

    hintLeft--;
    hintsEl.textContent = hintLeft;
    Sound.play('flip');

    const cards = document.querySelectorAll(".card");
    cards.forEach(c => {
        c.classList.add("flipped", "hint-peek");
    });

    setTimeout(() => {
        cards.forEach(c => {
            if (c.classList.contains("matched")) return;
            if (c === first) return;

            c.classList.remove("flipped", "hint-peek");
        });

        busy = false;
        second = null;

        // Disable hint button when no hints left
        if (hintLeft === 0) {
            hintBtn.classList.add("disabled");
        }
    }, 1500);
};

function showOverlay(msg) {
    overlayBox.innerHTML = `<h2>${msg}</h2>`;
    overlay.classList.add("visible");
}

function hideOverlay() {
    overlay.classList.remove("visible");
}

function showTempMessage(msg, duration = 800) {
    overlayBox.innerHTML = `<h2>${msg}</h2>`;
    overlay.classList.add("visible");

    setTimeout(() => {
        overlay.classList.remove("visible");
    }, duration);
}

function pauseGame() {
    paused = true;
    pauseBtn.textContent = "▶";

    overlayBox.innerHTML = `
        <h2>⏸ Game Paused</h2>
        <p>Press <b>R</b> to Resume or click Resume</p>

        <button id="resumeBtn">▶ Resume</button>
        <button id="restartBtn">🔁 Restart</button>
        <button id="quitBtn">❌ Quit</button>
    `;

    overlay.classList.add("visible");

    document.getElementById("resumeBtn").onclick = resumeGame;

    document.getElementById("restartBtn").onclick = () => {
        overlay.classList.remove("visible");
        init();
    };

    document.getElementById("quitBtn").onclick = () => backMenu(true);
}

function resumeGame() {
    paused = false;
    pauseBtn.textContent = "⏸";
    overlay.classList.remove("visible");

    overlayBox.innerHTML = `<h2>▶ Game Resumed</h2>`;
    overlay.classList.add("visible");
    setTimeout(() => overlay.classList.remove("visible"), 700);
}

/* ---------------- PAUSE ---------------- */
pauseBtn.onclick = () => {
    if (!paused) {
        pauseGame();
    } else {
        resumeGame();
    }
};

/* ---------------- KEYBOARD EVENTS ---------------- */
document.addEventListener("keydown", (e) => {
    if (!game.classList.contains("active")) return;

    if ((e.key === "p" || e.key === "P") && !paused) {
        pauseBtn.click();
    }

    if ((e.key === "r" || e.key === "R") && paused) {
        pauseBtn.click();
    }

    if (e.key === "h" || e.key === "H") {
        hintBtn.click();
    }

    if (e.key === "q" || e.key === "Q") {
        backMenu(true);
    }
});

function saveToHistory() {
    if (!currentPlayer) return;

    const history = JSON.parse(localStorage.getItem("gameHistory")) || [];

    history.push({
        name: currentPlayer.name,
        age: currentPlayer.age,
        gender: currentPlayer.gender,
        difficulty: difficulty.value,
        moves,
        pairsFormed: pairs,
        hintsUsed: totalHints - hintLeft,
        timeTaken: currentPlayer.timeTaken || 0,
        result: currentPlayer.lastResult,
        darkMode: document.body.classList.contains("dark"),
        date: new Date().toISOString()
    });

    localStorage.setItem("gameHistory", JSON.stringify(history));
    updateHistoryButton();
}

/* ---------------- END ---------------- */
function win() {
    clearInterval(timer);
    
    // Calculate time taken
    timeTaken = Math.floor((Date.now() - startTime) / 1000);

    const diff = difficulty.value;
    const bestKey = `bestScore_${diff}`;
    let bestScore = localStorage.getItem(bestKey);
    let isNewRecord = false;

    if (!bestScore || moves < bestScore) {
        bestScore = moves;
        localStorage.setItem(bestKey, bestScore);
        isNewRecord = true;
    }

    // Play win sound and show confetti
    Sound.play('win');
    createConfetti();

    const recordBadge = isNewRecord ? '<br>🏆 <span class="new-record-badge">NEW RECORD!</span>' : '';
    
    // Format time
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    const timeDisplay = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

    showEnd(`
🏅Congratulations!!!<br>          
 🎉 YOU WON!<br>
🧠 Well Played!<br><br>
Moves: ${moves}<br>
Pairs Formed: ${pairs}<br>
Hints Used: ${totalHints - hintLeft}<br>
⏱️ Time Taken: ${timeDisplay}<br>
🏆 Best Score (${diff}): ${bestScore}
${recordBadge}
`);

    currentPlayer = {
        ...currentPlayer,
        difficulty: difficulty.value,
        darkMode: document.body.classList.contains("dark"),
        lastResult: "WIN",
        moves: moves,
        pairsFormed: pairs,
        hintsUsed: totalHints - hintLeft,
        timeTaken: timeTaken
    };

    localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));

    saveToHistory();
    
    // Update statistics AFTER showing win screen (this triggers achievements)
    const hintsUsedInGame = totalHints - hintLeft;
    Stats.update(true, moves, hintsUsedInGame, diff);
}

function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.3 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

function lose() {
    clearInterval(timer);
    
    // Calculate time taken even for loss
    timeTaken = Math.floor((Date.now() - startTime) / 1000);

    showEnd(`
😞 Better luck next time!<br>
⏰ Time's up<br><br>
Moves: ${moves}<br>
Pairs Formed: ${pairs}<br>
Hints Used: ${totalHints - hintLeft}<br>
`);
    currentPlayer = {
        ...currentPlayer,
        difficulty: difficulty.value,
        darkMode: document.body.classList.contains("dark"),
        lastResult: "LOSE",
        moves: moves,
        pairsFormed: pairs,
        hintsUsed: totalHints - hintLeft,
        timeTaken: timeTaken
    };

    localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));

    saveToHistory();
}

function showEnd(msg) {
    overlayBox.innerHTML = `
        <h2>${msg}</h2><br>
        <button id="playAgainBtn">🔁 Play Again</button>
        <button id="mainMenuBtn">🏠 Main Menu</button>`;
    overlay.classList.add("visible");
    
    // Add event listeners for dynamically created buttons
    document.getElementById("playAgainBtn").addEventListener('click', restart);
    document.getElementById("mainMenuBtn").addEventListener('click', () => backMenu());
}

/* ---------------- NAV ---------------- */
function restart() {
    overlay.classList.remove("visible");
    init();
}

function backMenu(fromQuit = false) {
    if (fromQuit) {
        const confirmQuit = confirm("⚠ Your current game will be lost. Quit game?");
        if (!confirmQuit) return;
    }

    overlay.classList.remove("visible");
    game.classList.remove("active");
    menu.classList.add("active");

    localStorage.removeItem("gameActive");
    localStorage.removeItem("currentPlayer");

    playerName.value = "";
    playerAge.value = "";
    playerGender.value = "";
    currentPlayer = null;
}

function saveCurrentPlayerLive() {
    if (!playerName.value || !playerAge.value || !playerGender.value) return;

    currentPlayer = {
        ...(currentPlayer || {}),
        name: playerName.value.trim(),
        age: playerAge.value,
        gender: playerGender.value
    };

    localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));
}

playerName.addEventListener("input", saveCurrentPlayerLive);
playerAge.addEventListener("input", saveCurrentPlayerLive);
playerGender.addEventListener("change", saveCurrentPlayerLive);

/* ---------------- UTILS ---------------- */
function updateUI() {
    movesEl.textContent = moves;
    pairsEl.textContent = pairs;
    timeEl.textContent = time;
}

// Fisher-Yates Shuffle Algorithm (proper random shuffle)
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

darkBtn.onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
    darkBtn.textContent = document.body.classList.contains("dark") ? '☀️ Light Mode' : '🌙 Dark Mode';
    Sound.play('flip');
};

// Sound toggle
soundIndicator.onclick = () => {
    Sound.toggle();
};

// Initialize sound indicator
soundIndicator.textContent = Sound.enabled ? '🔊' : '🔇';

/* EVENT LISTENERS - Proper Separation */

// History button event listener
document.getElementById('historyBtn').addEventListener('click', openHistory);

// Clear history button event listener
document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);

// Check achievements button event listener
document.getElementById('checkAchievementsBtn').addEventListener('click', checkAchievementStatus);

// Back to menu button event listener
document.getElementById('backToMenuBtn').addEventListener('click', backToMenu);

// Function to update history button state
function updateHistoryButton() {
    const historyBtn = document.getElementById('historyBtn');
    const history = JSON.parse(localStorage.getItem("gameHistory")) || [];
    
    if (history.length === 0) {
        historyBtn.classList.add('disabled');
    } else {
        historyBtn.classList.remove('disabled');
    }
}

function openHistory() {
    const history = JSON.parse(localStorage.getItem("gameHistory")) || [];
    
    // Check if history is empty
    if (history.length === 0) {
        showTempMessage("❌ No games played yet!", 1500);
        Sound.play('mismatch');
        return;
    }
    
    menu.classList.remove("active");
    game.classList.remove("active");
    historyPage.classList.add("active");

    renderLeaderboard("easy", history, document.getElementById("easyBoard"));
    renderLeaderboard("medium", history, document.getElementById("mediumBoard"));
    renderLeaderboard("hard", history, document.getElementById("hardBoard"));
}

function renderLeaderboard(level, history, container) {
    let data = history.filter(h => h.difficulty === level);

    if (data.length === 0) {
        container.innerHTML = `
            <p class="no-games-message">
                🚫 No games played yet
            </p>
        `;
        return;
    }

    // 🏆 SORT RULES
    const wins = data.filter(h => h.result === "WIN")
                     .sort((a, b) => a.moves - b.moves);

    const loses = data.filter(h => h.result === "LOSE")
                      .sort((a, b) => {
                          if (b.pairsFormed !== a.pairsFormed) {
                              return b.pairsFormed - a.pairsFormed;
                          }
                          return a.moves - b.moves;
                      });

    const leaderboard = [...wins, ...loses];

    container.innerHTML = leaderboard.map((h, i) => {
        const safeName = Validator.sanitize(h.name);
        
        // Format time taken
        let timeDisplay = '';
        if (h.result === "WIN" && h.timeTaken) {
            const minutes = Math.floor(h.timeTaken / 60);
            const seconds = h.timeTaken % 60;
            timeDisplay = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
        }
        
        return `
        <div class="leaderboard-entry ${h.result === "WIN" ? "leaderboard-win" : "leaderboard-lose"}">
            <b>#${i + 1} ${safeName}</b> (${h.age}, ${h.gender})<br>
            Result: <b>${h.result}</b><br>
            Moves: ${h.moves} | Pairs: ${h.pairsFormed} | Hints: ${h.hintsUsed}${h.result === "WIN" && timeDisplay ? ` | ⏱️ ${timeDisplay}` : ''}<br>
            <small>${new Date(h.date).toLocaleString()}</small>
        </div>
    `}).join("");
}

function backToMenu() {
    historyPage.classList.remove("active");
    menu.classList.add("active");
}

function clearHistory() {
    const history = JSON.parse(localStorage.getItem("gameHistory")) || [];
    
    if (history.length === 0) {
        showTempMessage("❌ No history to clear!", 1500);
        Sound.play('mismatch');
        return;
    }
    
    if (!confirm("Delete all game history?")) return;

    localStorage.removeItem("gameHistory");
    updateHistoryButton();

    alert("History cleared ✅");
}

function checkAchievementStatus() {
    const achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
    const stats = JSON.parse(localStorage.getItem('gameStats') || '{}');
    
    let message = '🏆 ACHIEVEMENT STATUS\n\n';
    message += `Unlocked: ${achievements.length}/7\n\n`;
    
    // Use existing Achievements.list to avoid duplication
    Achievements.list.forEach(a => {
        const unlocked = achievements.includes(a.id);
        
        // Build condition text with stats
        let condition = '';
        switch(a.id) {
            case 'first_win':
                condition = `Win your first game (${stats.gamesWon || 0}/1)`;
                break;
            case 'speed_demon':
                condition = `Win in under 20 moves (Best: ${stats.bestMoves || 0})`;
                break;
            case 'perfect_game':
                condition = `Win without hints (${stats.noHintWins || 0}/1) - Shows EVERY time!`;
                break;
            case 'enthusiast':
                condition = `Play 10 games (${stats.totalGames || 0}/10)`;
                break;
            case 'master':
                condition = `Win 25 games (${stats.gamesWon || 0}/25)`;
                break;
            case 'hard_mode':
                condition = `Win on hard difficulty (${stats.hardWins || 0}/1)`;
                break;
            case 'streak_5':
                condition = `Win 5 in a row (Best: ${stats.bestStreak || 0})`;
                break;
        }
        
        message += `${unlocked ? '✅' : '🔒'} ${a.icon} ${a.name}\n`;
        message += `   ${condition}\n\n`;
    });
    
    message += `\n📊 YOUR STATS:\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Games Won: ${stats.gamesWon || 0}\n`;
    message += `Games Lost: ${stats.gamesLost || 0}\n`;
    message += `Total Games: ${stats.totalGames || 0}\n`;
    message += `Win Rate: ${stats.totalGames > 0 ? Math.round((stats.gamesWon / stats.totalGames) * 100) : 0}%\n`;
    message += `\nBest Moves: ${stats.bestMoves || 0}\n`;
    message += `No-Hint Wins: ${stats.noHintWins || 0} 🧠\n`;
    message += `Hard Wins: ${stats.hardWins || 0} 💪\n`;
    message += `Current Streak: ${stats.currentStreak || 0}\n`;
    message += `Best Streak: ${stats.bestStreak || 0} 🔥\n`;
    
    if (confirm(message + '\n\nWant to RESET all achievements and stats?')) {
        localStorage.removeItem('achievements');
        localStorage.removeItem('gameStats');
        alert('✅ Reset complete! All achievements and stats cleared.');
        location.reload(); // Refresh to show clean slate
    }
}
