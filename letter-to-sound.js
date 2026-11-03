let shuffledLetters = [];
let currentIndex = 0;
let randomLetter;
let currentAudio;
let audioTimeout;

const letterImage = document.getElementById("letter-image");
const nextButton = document.getElementById("next-button");
const replayButton = document.getElementById("replay-button");

function stopCurrentAudio() {
    if (currentAudio) {
        currentAudio.pause();
    }
}

function playCurrentAudio() {
    clearTimeout(audioTimeout);
    stopCurrentAudio();

    currentAudio = new Audio(randomLetter.audio);
    currentAudio.play();
}

function shuffleLetters() {
    shuffledLetters = [...letters];

    for (let i = shuffledLetters.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [shuffledLetters[i], shuffledLetters[randomIndex]] =
            [shuffledLetters[randomIndex], shuffledLetters[i]];
    }

    currentIndex = 0;
}

function showNextLetter() {
    // Cancel the previous letter's pending audio so sounds don't overlap
    clearTimeout(audioTimeout);
    stopCurrentAudio();

    if (currentIndex >= shuffledLetters.length) {
        shuffleLetters();
    }

    randomLetter = shuffledLetters[currentIndex];
    currentIndex++;

    letterImage.src = randomLetter.image;

    audioTimeout = setTimeout(function () {
        playCurrentAudio();
    }, 3000);
}

nextButton.addEventListener("click", function () {
    showNextLetter();
});

replayButton.addEventListener("click", function () {
    playCurrentAudio();
});

shuffleLetters();
showNextLetter();
