const wordE1 = document.querySelector("#word");
const wrongLettersE1 = document.querySelector("#wrongLetters");
const playAgainBtn = document.querySelector("#playButton");
const popup = document.querySelector("#popupContainer");
const popupNotContainer = document.querySelector("#popup");
const notification = document.querySelector("#notificationContainer");
const finalMessage = document.querySelector("#finalMessage");

const figureParts = document.querySelectorAll(".figure-part");
const figurePartsRemove = document.querySelectorAll(".remove-figure");

const words = ["ullbert", "ingmar", "christian", "batman"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

window.addEventListener("load", () =>
  popupNotContainer.classList.remove("show-popup")
);

/* show hidden word */

function displayWord() {
  wordE1.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) => `
    <span class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
    </span>
    `
    )

    .join("")}`;
  const innerWord = wordE1.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Hi, nice to meet you too!";
    popupNotContainer.classList.add("show-popup");
  }
}

/* Update the wrong letters */
function updateWrongLetterE1() {
  //Display wrong letters
  wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  //Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  //Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "I hate you.";
    popupNotContainer.classList.add("show-popup");
  }
}

//Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

//Keydown letter press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetterE1();
      } else {
        showNotification();
      }
    }
  }
});

//Restart game and play game

playAgainBtn.addEventListener("click", () => {
  //Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLetterE1();

  popupNotContainer.classList.remove("show-popup");
});

displayWord();
