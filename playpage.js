let firstCard = null;
let secondCard = null;
let canFlip = true;
let matchCount = 0;
let timerInterval;
let timeElapsed = 0;

document.addEventListener('DOMContentLoaded', function()
{
    namesaver();
    initializeGame(); 
    startStopwatch();
    document.addEventListener('keydown', function(event)
    {
        if (event.ctrlKey && event.key === 'k') 
        {
            flipAllCards();
        }
    });
});


function namesaver() 
{
    const playerName = localStorage.getItem('playerName');
    document.getElementById('player-name').textContent = playerName;

}

function handleCardClick() {
    if (!canFlip) return;
    if (this === firstCard) return; 

    this.style.backgroundImage = `url(${this.getAttribute('data-image')})`;
    this.setAttribute('data-flipped', 'true');

    if (!firstCard) 
    {
        firstCard = this;
    } 
    else if (!secondCard) 
    {
        secondCard = this;

        // Check for match
        canFlip = false;
        setTimeout(checkForMatch, 1000); 
    }
}

function checkForMatch() {
    const image1 = firstCard.getAttribute('data-image');
    const image2 = secondCard.getAttribute('data-image');

    if (image1 === image2) 
    {
        firstCard.removeEventListener('click', handleCardClick);
        secondCard.removeEventListener('click', handleCardClick);
        matchCount++;
        updateMatchCount();

        const totalPairs = parseInt(localStorage.getItem('numCards'), 10); 
        if (matchCount === totalPairs)
            {
            endGame(); 
            }
    } 
    else 
    {
        firstCard.style.backgroundImage = 'url(IMG/cardback.jpeg)';
        firstCard.setAttribute('data-flipped', 'false');
        secondCard.style.backgroundImage = 'url(IMG/cardback.jpeg)';
        secondCard.setAttribute('data-flipped', 'false');
    }

    // Reset card variables and re-enable clicking
    firstCard = null;
    secondCard = null;
    canFlip = true;
}

function updateMatchCount()
{
    const matchCounter = document.getElementById('match-counter');
    if (matchCounter) 
    {
        matchCounter.textContent = `Matches: ${matchCount}`;
    }
}

function startStopwatch() 
{
    timeElapsed = 0;
    timerInterval = setInterval(updateStopwatch, 1000);
}

function stopStopwatch() 
{
    clearInterval(timerInterval);
}

function resetStopwatch() 
{
    stopStopwatch();
    timeElapsed = 0;
    updateStopwatchDisplay();
}

function updateStopwatch()
{
    timeElapsed++;
    updateStopwatchDisplay();
}

function updateStopwatchDisplay()
{
    const stopwatchDisplay = document.getElementById('stopwatch');
    if (stopwatchDisplay) {
        const minutes = Math.floor(timeElapsed / 60);
        const seconds = timeElapsed % 60;
        stopwatchDisplay.textContent = `${minutes}m ${seconds}s`;
    }
}

function initializeGame() 
{
    const numCards = localStorage.getItem('numCards');
    const gridContainer = document.getElementById('grid-container');

    if (numCards) {
        let numberOfCards = parseInt(numCards, 10) * 2; // Multiply by 2 for pairs
        const numberOfRows = Math.ceil(numberOfCards / 8); // Adjust based on desired max columns (e.g., 8 columns)
        gridContainer.style.gridTemplateRows = `repeat(${numberOfRows}, 1fr)`;

        gridContainer.innerHTML = '';

        const imageUrls = [
            'IMG/img1.jpeg',
            'IMG/img2.jpeg',
            'IMG/img3.jpeg',
            'IMG/img4.jpeg',
            'IMG/img5.jpeg',
            'IMG/img6.jpeg',
            'IMG/img7.jpeg',
            'IMG/img8.jpeg',
            'IMG/img9.jpeg',
            'IMG/img10.jpeg',
            'IMG/img11.jpeg',
            'IMG/img12.jpeg',
            'IMG/img13.jpeg',
            'IMG/img14.jpeg',
            'IMG/img15.jpeg',
            'IMG/img16.jpeg',
            'IMG/img17.jpeg',
            'IMG/img18.jpeg',
            'IMG/img19.jpeg',
            'IMG/img20.jpeg',
            'IMG/img21.jpeg',
            'IMG/img22.jpeg',
            'IMG/img23.jpeg',
            'IMG/img24.jpeg',
            'IMG/img25.jpeg',
            'IMG/img26.jpeg',
            'IMG/img27.jpeg',
            'IMG/img28.jpeg',
            'IMG/img29.jpeg',
            'IMG/img30.jpeg',
            'IMG/img31.jpeg',
            'IMG/img32.jpeg',
        ];

        const images = [];
        for (let i = 0; i < numberOfCards / 2; i++) {
            images.push(imageUrls[i % imageUrls.length]);
            images.push(imageUrls[i % imageUrls.length]); // Add each image twice for pairs
        }

        // Shuffle images
        images.sort(() => Math.random() - 0.5);

        for (let i = 0; i < numberOfCards; i++) {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item card-back';
            gridItem.setAttribute('data-image', images[i]);
            gridItem.setAttribute('data-flipped', 'false'); // New attribute to track state
            gridItem.style.backgroundImage = 'url(IMG/cardback.jpeg)'; // Set initial background image
            gridItem.addEventListener('click', handleCardClick);
            gridContainer.appendChild(gridItem);
        }

        // Initialize match counter if not already present
        let matchCounter = document.getElementById('match-counter');
        if (!matchCounter) {
            matchCounter = document.createElement('div');
            matchCounter.id = 'match-counter';
            document.body.appendChild(matchCounter);
        }
        updateMatchCount();
    }
}
function endGame() {
    stopStopwatch();

    // Create and configure finishDiv
    const finishDiv = document.createElement('div');
    finishDiv.className = 'finish';

    const message1 = document.createElement('p');
    message1.textContent = 'Wooo hoooo! You did it!';
    finishDiv.appendChild(message1);
    
    const message2 = document.createElement('p');
    message2.textContent = 'Game Over!';
    finishDiv.appendChild(message2);
   
    const dialog = document.createElement('dialog');
    dialog.className = 'play-again-dialog';

    // Create and configure the play again button
    const playAgainButton = document.createElement('button');
    playAgainButton.type = 'button';
    playAgainButton.textContent = 'Play Again';
    playAgainButton.onclick = function() {
        window.location.href = 'gamepage.html';
    };

   
    dialog.appendChild(finishDiv);
    dialog.appendChild(playAgainButton);
    document.body.appendChild(dialog);

    // Show the dialog
    dialog.showModal();
}


function flipAllCards() 
{
    const cards = document.querySelectorAll('.grid-item');
    cards.forEach(card => 
    {
        card.style.backgroundImage = `url(${card.getAttribute('data-image')})`;
        card.setAttribute('data-flipped', 'true');
        card.removeEventListener('click', handleCardClick); // Prevent further flipping
    });

    // Set matchCount to the maximum possible to indicate all matches are found
    matchCount = parseInt(localStorage.getItem('numCards'), 10);
    updateMatchCount();
}