let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isWorkTime = true;
let totalTime = 25 * 60;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const toggleModeButton = document.getElementById('toggle-mode');
const progressBar = document.getElementById('progress');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update progress bar
    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    progressBar.style.width = `${progress}%`;
}

function toggleTimer() {
    if (timerId === null) {
        // Start the timer
        startButton.textContent = 'Pause';
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                // Switch between work and break
                isWorkTime = !isWorkTime;
                timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
                modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
                updateDisplay();
            }
        }, 1000);
    } else {
        // Pause the timer
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = 25 * 60;
    totalTime = timeLeft;
    startButton.textContent = 'Start';
    modeText.textContent = 'Work Time';
    
    // Reset button colors
    startButton.classList.remove('rest-mode');
    startButton.classList.add('work-mode');
    toggleModeButton.classList.remove('work-mode');
    toggleModeButton.classList.add('rest-mode');
    progressBar.style.background = 'linear-gradient(to right, #48bb78, #4299e1)';
    
    updateDisplay();
}

function toggleMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    totalTime = timeLeft; // Set new total time
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    toggleModeButton.textContent = isWorkTime ? 'Switch to Break' : 'Switch to Work';
    
    // Update button colors
    if (isWorkTime) {
        startButton.classList.remove('rest-mode');
        startButton.classList.add('work-mode');
        toggleModeButton.classList.remove('work-mode');
        toggleModeButton.classList.add('rest-mode');
        progressBar.style.background = 'linear-gradient(to right, #48bb78, #4299e1)';
    } else {
        startButton.classList.remove('work-mode');
        startButton.classList.add('rest-mode');
        toggleModeButton.classList.remove('rest-mode');
        toggleModeButton.classList.add('work-mode');
        progressBar.style.background = 'linear-gradient(to right, #4299e1, #48bb78)';
    }
    
    updateDisplay();
}

startButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
toggleModeButton.addEventListener('click', toggleMode);

// Initial display update
updateDisplay(); 