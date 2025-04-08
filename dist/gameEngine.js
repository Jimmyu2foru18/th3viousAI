// Game Engine Module
class WordPuzzleEngine {
    constructor() {
        this.dailyPuzzle = null;
        this.lastPlayedDate = null;
        this.keyboardState = {}; // Tracks letter states for virtual keyboard
        // Word sets for different difficulties - 20 puzzles each
        this.wordSets = {
            easy: [
                { letters: 'STARLIGHT', words: ['STAR', 'LIGHT', 'TAR', 'SIT', 'LAG', 'STAIR', 'TAIL'] },
                { letters: 'HOMEMADE', words: ['HOME', 'MADE', 'DOME', 'HAM', 'MAD', 'DAME', 'MEAD'] },
                { letters: 'SUNSHINE', words: ['SUN', 'SHINE', 'SHIN', 'HIS', 'IN', 'HUES', 'SINE'] },
                { letters: 'RAINBOW', words: ['RAIN', 'BOW', 'RAW', 'WIN', 'NOW', 'WARN', 'BROW'] },
                { letters: 'PLAYTIME', words: ['PLAY', 'TIME', 'LAY', 'PAY', 'TAP', 'LIMP', 'MEAL'] },
                { letters: 'CATDOG', words: ['CAT', 'DOG', 'GOT', 'TAG', 'COD', 'ACT', 'DOT'] },
                { letters: 'SANDBOX', words: ['SAND', 'BOX', 'AND', 'SOB', 'SAD', 'BAND', 'NOD'] },
                { letters: 'TREEMAP', words: ['TREE', 'MAP', 'TAP', 'RAM', 'EAT', 'TAME', 'PARE'] },
                { letters: 'FISHPOND', words: ['FISH', 'POND', 'PIN', 'FIN', 'HOP', 'SHIP', 'SPIN'] },
                { letters: 'BIRDNEST', words: ['BIRD', 'NEST', 'BED', 'TIN', 'SIT', 'RIDE', 'BEST'] },
                { letters: 'SKYBLUE', words: ['SKY', 'BLUE', 'USE', 'LUB', 'KEY', 'BULK', 'SKEY'] },
                { letters: 'REDGREEN', words: ['RED', 'GREEN', 'END', 'ERE', 'DEN', 'NEED', 'GENE'] },
                { letters: 'HOTCOLD', words: ['HOT', 'COLD', 'OLD', 'COD', 'LOT', 'HOLD', 'TOLD'] },
                { letters: 'DAYNIGHT', words: ['DAY', 'NIGHT', 'HAY', 'TAN', 'GIN', 'THING', 'TINY'] },
                { letters: 'BOOKPEN', words: ['BOOK', 'PEN', 'BOK', 'POE', 'NOB', 'POKE', 'BONE'] },
                { letters: 'CARBOAT', words: ['CAR', 'BOAT', 'BAR', 'COT', 'TAB', 'COAT', 'BOAR'] },
                { letters: 'FARMLAND', words: ['FARM', 'LAND', 'ARM', 'LAD', 'DAM', 'DRAMA', 'MARL'] },
                { letters: 'SEAWAVE', words: ['SEA', 'WAVE', 'SAW', 'WAS', 'AVE', 'EASE', 'WEAVE'] },
                { letters: 'MOONSTAR', words: ['MOON', 'STAR', 'TAN', 'SON', 'RAM', 'ROAM', 'STORM'] },
                { letters: 'WINDRAIN', words: ['WIND', 'RAIN', 'WIN', 'AID', 'DIN', 'DRAIN', 'WAND'] }
            ],
            medium: [
                { letters: 'WORKPLACE', words: ['WORK', 'PLACE', 'PACE', 'WALK', 'WEAR', 'LAP'] },
                { letters: 'BOOKSHELF', words: ['BOOK', 'SHELF', 'SELF', 'SHOE', 'FOLK', 'HOLE'] },
                { letters: 'MOUNTAIN', words: ['MOUNT', 'MAIN', 'MINT', 'AUNT', 'TAIL'] },
                { letters: 'KEYBOARD', words: ['BOARD', 'BREAK', 'BARK', 'DARK', 'ROAD'] },
                { letters: 'SUNFLOWER', words: ['FLOWER', 'FLOWS', 'LOWER', 'WOLF', 'SOLE'] },
                { letters: 'STARDUST', words: ['STAR', 'DUST', 'TRUST', 'DART', 'STUD'] },
                { letters: 'RAINBOW', words: ['BRAIN', 'WARN', 'RAIN', 'BORN', 'WIRE'] },
                { letters: 'MOONLIGHT', words: ['LIGHT', 'MOON', 'NIGHT', 'MINT', 'LION'] },
                { letters: 'FIREWORK', words: ['FIRE', 'WORK', 'WIRE', 'FORK', 'WORE'] },
                { letters: 'SNOWFLAKE', words: ['SNOW', 'FLAKE', 'WAKE', 'FAKE', 'LAKE'] },
                { letters: 'BUTTERFLY', words: ['BUTTER', 'FLUTTER', 'TRULY', 'FRUIT', 'BELT'] },
                { letters: 'ELEPHANT', words: ['PLANT', 'HELP', 'LEAP', 'PANT', 'TALE'] },
                { letters: 'DIAMOND', words: ['DOMAIN', 'MAID', 'MIND', 'DAMN', 'DIME'] },
                { letters: 'TREASURE', words: ['SURE', 'TEARS', 'RESET', 'STARE', 'REST'] },
                { letters: 'PAINTING', words: ['PAINT', 'GAIN', 'PAIN', 'PING', 'TAIL'] },
                { letters: 'CHOCOLATE', words: ['LATE', 'COAL', 'CHAT', 'HEAT', 'COLA'] },
                { letters: 'UNIVERSE', words: ['VERSE', 'SURE', 'USER', 'RISE', 'VINE'] },
                { letters: 'ADVENTURE', words: ['VENTURE', 'NATURE', 'TRADE', 'TREND', 'DARE'] },
                { letters: 'SYMPHONY', words: ['HYMN', 'PHONE', 'SPIN', 'HONEY', 'SHOP'] },
                { letters: 'PARADISE', words: ['RAISE', 'SPARE', 'PAID', 'PAIR', 'DEAR'] }
            ],
            hard: [
                { letters: 'SPACECRAFT', words: ['SPACE', 'CRAFT', 'RACE', 'FACE', 'PACE', 'CARE', 'ACE'] },
                { letters: 'BREAKFAST', words: ['BREAK', 'FAST', 'FEAST', 'STEAK', 'TAKE', 'BEAR'] },
                { letters: 'CHALLENGE', words: ['CHANGE', 'ANGEL', 'LANCE', 'HEAL', 'LEAN', 'GLEN'] },
                { letters: 'STARDUST', words: ['STARS', 'DUST', 'TRUST', 'DART', 'STUD', 'RUST'] },
                { letters: 'MOONLIGHT', words: ['MOON', 'LIGHT', 'NIGHT', 'MINT', 'LION', 'LOOM'] },
                { letters: 'FIREWORK', words: ['FIRE', 'WORK', 'WIRE', 'FORK', 'WORE', 'FLOW'] },
                { letters: 'SNOWFLAKE', words: ['SNOW', 'FLAKE', 'WAKE', 'FAKE', 'LAKE', 'WEAK'] },
                { letters: 'BUTTERFLY', words: ['BUTTER', 'FLY', 'TRULY', 'FRUIT', 'BELT', 'RUBY'] },
                { letters: 'ELEPHANT', words: ['PLANT', 'HELP', 'LEAP', 'PANT', 'TALE', 'PLEA'] },
                { letters: 'DIAMOND', words: ['DOMAIN', 'MAID', 'MIND', 'DAMN', 'DIME', 'AIM'] },
                { letters: 'TREASURE', words: ['SURE', 'TEARS', 'RESET', 'STARE', 'REST', 'SEAT'] },
                { letters: 'PAINTING', words: ['PAINT', 'GAIN', 'PAIN', 'PING', 'TAIL', 'TRAP'] },
                { letters: 'CHOCOLATE', words: ['LATE', 'COAL', 'CHAT', 'HEAT', 'COLA', 'HOLE'] },
                { letters: 'UNIVERSE', words: ['VERSE', 'SURE', 'USER', 'RISE', 'VINE', 'SUN'] },
                { letters: 'ADVENTURE', words: ['VENTURE', 'NATURE', 'TRADE', 'TREND', 'DARE'] },
                { letters: 'SYMPHONY', words: ['HYMN', 'PHONE', 'SPIN', 'HONEY', 'SHOP', 'SPY'] },
                { letters: 'PARADISE', words: ['RAISE', 'SPARE', 'PAID', 'PAIR', 'DEAR', 'RAID'] },
                { letters: 'WATERFALL', words: ['WATER', 'FALL', 'WEAR', 'TEAR', 'WALL', 'FEAR'] },
                { letters: 'MOUNTAIN', words: ['MOUNT', 'MAIN', 'MINT', 'AUNT', 'TAIL', 'AIM'] },
                { letters: 'RAINBOW', words: ['RAIN', 'BOW', 'WARN', 'BORN', 'WIRE', 'RAW'] }
            ]
        };
        this.currentPuzzle = null;
        this.foundWords = new Set();
        this.currentDifficulty = 'easy';
        this.score = 0;
        this.difficultyTimes = {
            easy: 60,    // 60 seconds for easy
            medium: 120, // 2 minutes for medium
            hard: 180    // 3 minutes for hard
        };
        this.timeLeft = this.difficultyTimes.easy;
        this.timerId = null;
        this.streakCount = 0;
        this.hintsUsed = 0;
    }

    setDifficulty(difficulty) {
        if (this.wordSets[difficulty]) {
            this.currentDifficulty = difficulty;
            this.timeLeft = this.difficultyTimes[difficulty];
            return true;
        }
        return false;
    }

    generatePuzzle() {
        const puzzleSet = this.wordSets[this.currentDifficulty];
        this.currentPuzzle = puzzleSet[Math.floor(Math.random() * puzzleSet.length)];
        this.foundWords.clear();
        return this.scrambleWord(this.currentPuzzle.letters);
    }

    scrambleWord(word) {
        // Enhanced scrambling algorithm that ensures the result is different from the original
        let scrambled;
        do {
            scrambled = word
                .split('')
                .map(char => ({ char, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ char }) => char)
                .join('');
        } while (scrambled === word);
        return scrambled;
    }

    // Helper function to check if a word can be formed from given letters
    canFormWord(word, letters) {
        const letterCount = {};
        letters.split('').forEach(letter => {
            letterCount[letter] = (letterCount[letter] || 0) + 1;
        });
        
        return word.split('').every(letter => {
            if (!letterCount[letter]) return false;
            letterCount[letter]--;
            return true;
        });
    }

    // Helper function to check if a word can be formed from given letters
    canFormWord(word, letters) {
        const letterCount = {};
        letters.split('').forEach(letter => {
            letterCount[letter] = (letterCount[letter] || 0) + 1;
        });
        
        return word.split('').every(letter => {
            if (!letterCount[letter]) return false;
            letterCount[letter]--;
            return true;
        });
    }

    generateLetterFeedback(guess, target) {
        const feedback = [];
        const targetLetters = target.split('');
        const guessLetters = guess.split('');
        const letterCount = {};

        // Count target letters
        targetLetters.forEach(letter => {
            letterCount[letter] = (letterCount[letter] || 0) + 1;
        });

        // First pass: Mark correct positions (green)
        guessLetters.forEach((letter, i) => {
            if (letter === targetLetters[i]) {
                feedback[i] = 'correct'; // green
                letterCount[letter]--;
            }
        });

        // Second pass: Mark present but wrong position (yellow) or absent (grey)
        guessLetters.forEach((letter, i) => {
            if (feedback[i]) return; // Skip already marked positions
            if (letterCount[letter] > 0) {
                feedback[i] = 'present'; // yellow
                letterCount[letter]--;
            } else {
                feedback[i] = 'absent'; // grey
            }
        });

        return feedback;
    }

    checkAnswer(answer) {
        const normalizedAnswer = answer.trim().toUpperCase();
        const targetWord = this.currentPuzzle.letters;
        
        // Check if the word hasn't been found yet and matches the length requirement
        const isNewWord = !this.foundWords.has(normalizedAnswer);
        const isValidLength = normalizedAnswer.length >= 3;
        
        // Check if word can be formed from the available letters
        const canBeFormed = this.canFormWord(normalizedAnswer, targetWord);
        
        // Generate letter-by-letter feedback (Wordle-style)
        const letterFeedback = this.generateLetterFeedback(normalizedAnswer, targetWord);
        
        if (isNewWord && isValidLength && canBeFormed) {
            this.foundWords.add(normalizedAnswer);
            this.streakCount++;
            this.score += this.calculatePoints(normalizedAnswer);
            
            // Calculate if this is a bonus word (not in predefined list)
            const isBonus = !this.currentPuzzle.words.includes(normalizedAnswer);
            
            // Check if all predefined words are found
            const allPredefWordsFound = this.currentPuzzle.words.every(word => this.foundWords.has(word));
            
            return {
                correct: true,
                points: this.calculatePoints(normalizedAnswer) + (isBonus ? 5 : 0),
                streak: this.streakCount,
                foundWords: Array.from(this.foundWords),
                totalWords: this.currentPuzzle.words.length,
                completed: allPredefWordsFound,
                isBonus: isBonus,
                letterFeedback: letterFeedback,
                clearInput: true
            };
        } else {
            this.streakCount = 0;
            return {
                correct: false,
                points: 0,
                streak: 0,
                foundWords: Array.from(this.foundWords),
                totalWords: this.currentPuzzle.words.length,
                completed: false,
                letterFeedback: letterFeedback,
                clearInput: false
            };
        }
    }

    calculatePoints(word) {
        // Base points based on difficulty and word length
        const difficultyPoints = {
            easy: 10,
            medium: 20,
            hard: 30
        };

        // Calculate bonus points
        const lengthBonus = word.length * 2;
        const streakBonus = Math.floor(this.streakCount / 3) * 5;
        const timeBonus = Math.floor(this.timeLeft / 10);
        const progressBonus = Math.floor((this.foundWords.size / this.currentPuzzle.words.length) * 20);

        return difficultyPoints[this.currentDifficulty] + lengthBonus + streakBonus + timeBonus + progressBonus;
    }

    updateScore() {
        this.score += this.calculatePoints();
    }

    getHint() {
        this.hintsUsed++;
        const hintPenalty = 5;
        this.score = Math.max(0, this.score - hintPenalty);
        
        // Find words that haven't been discovered yet
        const remainingWords = this.currentPuzzle.words.filter(word => !this.foundWords.has(word));
        if (remainingWords.length === 0) return 'All words found!';
        
        // Randomly select a word from remaining words
        const hintWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
        switch(this.currentDifficulty) {
            case 'easy':
                return `A ${hintWord.length}-letter word starting with '${hintWord[0]}'`;
            case 'medium':
                return `A ${hintWord.length}-letter word: '${hintWord[0]}...${hintWord[hintWord.length - 1]}'`;
            case 'hard':
                return `A ${hintWord.length}-letter word starting with '${hintWord[0]}${hintWord[1]}'`;
        }
    }

    startTimer(callback) {
        this.timerId = setInterval(() => {
            this.timeLeft--;
            if (typeof callback === 'function') {
                callback(this.timeLeft);
            }
            if (this.timeLeft <= 0) {
                this.stopTimer();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    getGameState() {
        return {
            score: this.score,
            timeLeft: this.timeLeft,
            difficulty: this.currentDifficulty,
            streak: this.streakCount,
            hintsUsed: this.hintsUsed,
            foundWords: Array.from(this.foundWords),
            totalWords: this.currentPuzzle ? this.currentPuzzle.words.length : 0,
            letters: this.currentPuzzle ? this.currentPuzzle.letters : ''
        };
    }

    resetGame() {
        this.score = 0;
        this.timeLeft = this.difficultyTimes[this.currentDifficulty];
        this.streakCount = 0;
        this.hintsUsed = 0;
        this.keyboardState = {};
        this.stopTimer();
    }

    getDailyPuzzle() {
        const today = new Date().toLocaleDateString();
        if (this.dailyPuzzle && this.lastPlayedDate === today) {
            return this.dailyPuzzle;
        }

        // Generate a new daily puzzle based on the date
        const puzzleSets = Object.values(this.wordSets).flat();
        const dateHash = today.split('/').reduce((a, b) => a + parseInt(b), 0);
        this.dailyPuzzle = puzzleSets[dateHash % puzzleSets.length];
        this.lastPlayedDate = today;
        return this.dailyPuzzle;
    }

    updateKeyboardState(guess, feedback) {
        guess.split('').forEach((letter, index) => {
            // Only update if the new state is more informative
            const currentState = this.keyboardState[letter];
            const newState = feedback[index];
            
            if (!currentState || 
                (currentState === 'absent' && newState !== 'absent') ||
                (currentState === 'present' && newState === 'correct')) {
                this.keyboardState[letter] = newState;
            }
        });
        return this.keyboardState;
    }
}

// Export the game engine
window.WordPuzzleEngine = WordPuzzleEngine;