const letterGrid = document.getElementById("letter-grid");

let currentLetter;
let currentAudio;
let shuffledLetters = [];
let currentIndex = 0;

// True while the green "correct" flash is showing, so extra clicks are ignored
let isWaitingForNext = false;

for (const letter of letters) {

    const button = document.createElement("button");

    const image = document.createElement("img");

    image.src = letter.image;
    image.alt = letter.name;
    image.width = 60;

    button.appendChild(image);

    button.addEventListener("click", function () {

        // No sound has been played yet, or we're already moving to the next one
        if (!currentLetter || isWaitingForNext) {
            return;
        }

        if (letter === currentLetter) {

            isWaitingForNext = true;
            button.style.backgroundColor = "lightgreen";

            setTimeout(function () {

                button.style.backgroundColor = "";
                isWaitingForNext = false;

                playRandomSound();

            }, 1000);

        } else {

            button.style.backgroundColor = "lightcoral";

            setTimeout(function () {

                button.style.backgroundColor = "";

            }, 500);

        }

    });

    letterGrid.appendChild(button);

}

const playSoundButton = document.getElementById("play-sound-button");
const scrambleButton = document.getElementById("scramble-button");

let isScrambled = false;

function shuffle(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];

    }

    return shuffled;

}

function shuffleLetters() {

    shuffledLetters = shuffle(letters);
    currentIndex = 0;

}

function playAudio(letter) {

    if (currentAudio) {
        currentAudio.pause();
    }

    currentAudio = new Audio(letter.audio);
    currentAudio.play();

}

function playRandomSound() {

    if (currentIndex >= shuffledLetters.length) {
        shuffleLetters();
    }

    currentLetter = shuffledLetters[currentIndex];

    currentIndex++;

    playAudio(currentLetter);

}

scrambleButton.addEventListener("click", function () {

    const buttons = Array.from(letterGrid.children);

    if (isScrambled === false) {

        for (const button of shuffle(buttons)) {
            letterGrid.appendChild(button);
        }

        scrambleButton.textContent = "Order";
        isScrambled = true;

    } else {

        for (const letter of letters) {

            const matchingButton = buttons.find(function (button) {
                return button.querySelector("img").src.includes(letter.image);
            });

            letterGrid.appendChild(matchingButton);
        }

        scrambleButton.textContent = "Scramble";
        isScrambled = false;

    }

});

shuffleLetters();

playSoundButton.addEventListener("click", function () {

    // Before the first sound, start the game; after that, replay the current sound
    if (currentLetter) {
        playAudio(currentLetter);
    } else {
        playRandomSound();
    }

});
