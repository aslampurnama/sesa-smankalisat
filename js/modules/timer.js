// Pomodoro Timer Module

// Timer State
let timer = {
    minutes: 25,
    seconds: 0,
    isRunning: false,
    interval: null,
    sessionCount: 0,
    isBreak: false
};

/**
 * Initialize timer functionality
 */
function initializeTimer() {
    const startBtn = document.getElementById('start-timer');
    const pauseBtn = document.getElementById('pause-timer');
    const resetBtn = document.getElementById('reset-timer');
    
    if (startBtn && pauseBtn && resetBtn) {
        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);
        
        updateTimerDisplay();
    }
}

/**
 * Start the timer
 */
function startTimer() {
    if (!timer.isRunning) {
        timer.isRunning = true;
        timer.interval = setInterval(updateTimer, 1000);
        
        // Update button states
        updateTimerButtons();
        showNotification('Timer dimulai! Fokus belajar!', 'success');
    }
}

/**
 * Pause the timer
 */
function pauseTimer() {
    if (timer.isRunning) {
        timer.isRunning = false;
        clearInterval(timer.interval);
        
        // Update button states
        updateTimerButtons();
        showNotification('Timer dijeda', 'warning');
    }
}

/**
 * Reset the timer to initial state
 */
function resetTimer() {
    pauseTimer();
    timer.minutes = timer.isBreak ? TIMER_DEFAULTS.breakMinutes : TIMER_DEFAULTS.workMinutes;
    timer.seconds = 0;
    updateTimerDisplay();
    updateTimerButtons();
    showNotification('Timer direset', 'info');
}

/**
 * Update timer every second
 */
function updateTimer() {
    if (timer.seconds > 0) {
        timer.seconds--;
    } else if (timer.minutes > 0) {
        timer.minutes--;
        timer.seconds = 59;
    } else {
        // Timer completed
        handleTimerComplete();
    }
    updateTimerDisplay();
}

/**
 * Handle timer completion
 */
function handleTimerComplete() {
    pauseTimer();
    
    if (!timer.isBreak) {
        // Work session completed
        timer.sessionCount++;
        timer.isBreak = true;
        timer.minutes = TIMER_DEFAULTS.breakMinutes;
        
        // Show completion alert
        const sessionMessage = timer.sessionCount % 4 === 0 ? 
            `Sesi belajar ke-${timer.sessionCount} selesai! Waktunya istirahat panjang.` :
            `Sesi belajar ke-${timer.sessionCount} selesai! Istirahat sebentar.`;
            
        showNotification(sessionMessage, 'success');
        
        if (timer.sessionCount % 4 === 0) {
            timer.minutes = TIMER_DEFAULTS.longBreakMinutes;
        }
    } else {
        // Break completed
        timer.isBreak = false;
        timer.minutes = TIMER_DEFAULTS.workMinutes;
        showNotification('Istirahat selesai! Kembali fokus belajar.', 'success');
    }
    
    updateSessionCounter();
    updateTimerDisplay();
    updateTimerButtons();
}

/**
 * Update timer display
 */
function updateTimerDisplay() {
    const minutesElement = document.getElementById('timer-minutes');
    const secondsElement = document.getElementById('timer-seconds');
    
    if (minutesElement && secondsElement) {
        minutesElement.textContent = timer.minutes.toString().padStart(2, '0');
        secondsElement.textContent = timer.seconds.toString().padStart(2, '0');
        
        // Add visual feedback when timer is running
        const timerDisplay = document.querySelector('.timer-display');
        if (timerDisplay) {
            if (timer.isRunning) {
                timerDisplay.classList.add('pulse-animation');
            } else {
                timerDisplay.classList.remove('pulse-animation');
            }
        }
    }
}

/**
 * Update session counter display
 */
function updateSessionCounter() {
    const sessionCountElement = document.getElementById('session-count');
    if (sessionCountElement) {
        sessionCountElement.textContent = timer.sessionCount;
        
        // Visual feedback for session completion
        if (timer.sessionCount > 0) {
            sessionCountElement.classList.add('text-green-600', 'font-bold');
        }
    }
}

/**
 * Update timer button states
 */
function updateTimerButtons() {
    const startBtn = document.getElementById('start-timer');
    const pauseBtn = document.getElementById('pause-timer');
    
    if (startBtn && pauseBtn) {
        if (timer.isRunning) {
            startBtn.disabled = true;
            startBtn.classList.add('opacity-50', 'cursor-not-allowed');
            pauseBtn.disabled = false;
            pauseBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            startBtn.disabled = false;
            startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            pauseBtn.disabled = true;
            pauseBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }
}

/**
 * Get current timer status
 * @returns {Object} Timer status object
 */
function getTimerStatus() {
    return {
        isRunning: timer.isRunning,
        minutes: timer.minutes,
        seconds: timer.seconds,
        sessionCount: timer.sessionCount,
        isBreak: timer.isBreak
    };
}

// Add CSS for pulse animation
const timerStyles = document.createElement('style');
timerStyles.textContent = `
    .pulse-animation {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(timerStyles);