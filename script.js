document.addEventListener('DOMContentLoaded', () => {
    let treasurePosition;
    let remainingGuesses = 5;
    let gameOver = false;
    const boxes = document.querySelectorAll('.box');
    const guessesDisplay = document.getElementById('guesses');
    const messageDisplay = document.getElementById('message');
    const restartButton = document.getElementById('restart');

    function generatePastelColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 85%)`;
    }

    function initGame() {
        treasurePosition = Math.floor(Math.random() * 25);
        remainingGuesses = 5;
        gameOver = false;
        guessesDisplay.textContent = remainingGuesses;
        messageDisplay.textContent = '';
        boxes.forEach(box => {
            box.classList.remove('clicked', 'revealed');
            box.style.removeProperty('--random-color');
        });
    }

    function getDistance(index) {
        const clickedRow = Math.floor(index / 5);
        const clickedCol = index % 5;
        const treasureRow = Math.floor(treasurePosition / 5);
        const treasureCol = treasurePosition % 5;
        return Math.abs(clickedRow - treasureRow) + Math.abs(clickedCol - treasureCol);
    }

    function getProximityMessage(distance) {
        if (distance === 0) return 'You found the treasure! 🎉';
        if (distance === 1) return 'Hot! 🔥';
        if (distance <= 3) return 'Warm! 😊';
        return 'Cold! ❄️';
    }

    function handleBoxClick(event) {
        if (gameOver || document.querySelector('.box.revealed')) return;

        const clickedBox = event.target;
        if (clickedBox.classList.contains('clicked')) return;

        const boxIndex = parseInt(clickedBox.dataset.index);
        if (isNaN(boxIndex)) return;

        // Set random pastel color
        clickedBox.style.setProperty('--random-color', generatePastelColor());
        clickedBox.classList.add('clicked');

        if (boxIndex === treasurePosition) {
            clickedBox.classList.add('revealed');
            document.getElementById('treasureSound').play();
            messageDisplay.textContent = 'Congratulations! You found the treasure! 🎉';
            gameOver = true;
            return;
        }

        remainingGuesses--;
        guessesDisplay.textContent = remainingGuesses;

        const distance = getDistance(boxIndex);
        messageDisplay.textContent = getProximityMessage(distance);

        if (remainingGuesses === 0) {
            gameOver = true;
            messageDisplay.textContent = 'Game Over! The treasure was here! 😔';
            boxes[treasurePosition].classList.add('revealed');
        }
    }

    boxes.forEach(box => box.addEventListener('click', handleBoxClick));
    restartButton.addEventListener('click', initGame);

    // Start the game
    initGame();
});
document.addEventListener('DOMContentLoaded', () => {
    let treasurePosition;
    let remainingGuesses = 5;
    let gameOver = false;
    const boxes = document.querySelectorAll('.box');
    const guessesDisplay = document.getElementById('guesses');
    const messageDisplay = document.getElementById('message');
    const restartButton = document.getElementById('restart');

    function initGame() {
        treasurePosition = Math.floor(Math.random() * 25);
        remainingGuesses = 5;
        gameOver = false;
        guessesDisplay.textContent = remainingGuesses;
        messageDisplay.textContent = '';
        boxes.forEach(box => {
            box.classList.remove('clicked', 'revealed');
        });
    }

    function getDistance(index) {
        const clickedRow = Math.floor(index / 5);
        const clickedCol = index % 5;
        const treasureRow = Math.floor(treasurePosition / 5);
        const treasureCol = treasurePosition % 5;
        
        return Math.abs(clickedRow - treasureRow) + Math.abs(clickedCol - treasureCol);
    }

    function getProximityMessage(distance) {
        if (distance === 0) return 'You found the treasure!';
        if (distance === 1) return 'Hot! 🔥';
        if (distance <= 3) return 'Warm! 😊';
        return 'Cold! ❄️';
    }

    function handleBoxClick(event) {
        if (gameOver || document.querySelector('.box.revealed')) return;

        const clickedBox = event.target;
        if (clickedBox.classList.contains('clicked')) return;

        // Play click sound
        document.getElementById('clickSound').play();

        const boxIndex = parseInt(clickedBox.dataset.index);
        clickedBox.classList.add('clicked');
        
        // Generate random color for clicked box
        const randomColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
        clickedBox.style.backgroundColor = randomColor;

        if (boxIndex === treasurePosition) {
            clickedBox.classList.add('revealed');
            document.getElementById('treasureSound').play();
            messageDisplay.textContent = 'Congratulations! You found the treasure! 🎉';
            gameOver = true;
            return;
        }

        remainingGuesses--;
        guessesDisplay.textContent = remainingGuesses;

        const distance = getDistance(boxIndex);
        messageDisplay.textContent = getProximityMessage(distance);

        if (remainingGuesses === 0) {
            gameOver = true;
            messageDisplay.textContent = 'Game Over! The treasure was here! 😔';
            boxes[treasurePosition].classList.add('revealed');
        }
    }

    boxes.forEach(box => {
        box.addEventListener('click', handleBoxClick);
    });

    restartButton.addEventListener('click', initGame);

    // Start the game
    initGame();
});