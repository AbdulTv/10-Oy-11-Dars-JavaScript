const gameContainer = document.querySelector("#memory-game");

const images = [
    "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFT1MO4Ln0Ynz4VKkD2EDyylsYzoVg1d8FiQ&s",
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png"
];

let cards = [...images, ...images]; 


// Oyinda iktadan rasm bolishi kerak shuning uchun undan copy olyapmiz sherikini topish uchun 




cards.sort(() => 0.5 - Math.random());

// Tasodifiy raqamlarni chiqarishga kartalarimizni chalkashtirish uchun kerak 



cards.forEach(imgSrc => {
    const card = document.createElement("div");
    card.classList.add("memory-card");
    card.innerHTML = `
        <img class="front-face" src="${imgSrc}" alt="IT Logo">
        <img class="back-face" src="https://cdn-icons-png.flaticon.com/512/545/545675.png" alt="Memory Card">
    `;
    gameContainer.appendChild(card);
});



let firstCard
let secondCard

let lockBoard = false;

function flipCard() {
    if (lockBoard || this === firstCard) return;
    
    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    const isMatch = firstCard.innerHTML === secondCard.innerHTML;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

document.querySelectorAll(".memory-card").forEach(card => 
    card.addEventListener("click", flipCard)
);
