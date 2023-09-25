let emojis = ["😀", "😀", "😭", "😭", "☠️", "☠️", "🐻", "🐻", "👍", "👍", "🎁", "🎁", "🍔", "🍔", "☘️", "☘️"];
let game = document.querySelector(".game");
let timer, flips = 0;
let randomEmojis = emojis.sort(() => (Math.random() > 0.5) ? 2 : -1);
let gameBtn = document.querySelector(".reset");
let timerInterval; // Store the timer interval ID

function runTimer() {
    timerInterval = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector(".time").textContent = `Time: ${timer}`;
        }
        else {
            clearInterval(timerInterval);
        }
    }, 1000);

}

function controlGame() {
    game.innerHTML = "";
    timer = 60;
    flips = 0;
    document.querySelector(".time").textContent = `Time: ${timer}`;
    document.querySelector(".flips").textContent = `Flips: ${flips}`;
    // Clear the previous timer interval if it exists
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    runTimer();
    for (let i = 0; i < randomEmojis.length; i++) {
        // Create html code for each card
        let card = document.createElement("div");
        card.className = "item";
        card.innerHTML = randomEmojis[i];

        // Add each card to game board
        game.appendChild(card);

        // Action  when card is clicked
        card.onclick = () => {
            if (timer != 0) {
                flips++;
                document.querySelector(".flips").textContent = `Flips: ${flips}`;
                card.classList.add("card-open");
                let card1 = document.querySelectorAll(".card-open")[0];
                let card2 = document.querySelectorAll(".card-open")[1];
                setTimeout(() => {
                    if (document.querySelectorAll(".card-open").length > 1) {
                        if (card1.innerHTML === card2.innerHTML) {
                            card1.classList.add("card-matched");
                            card2.classList.add("card-matched");

                            card1.classList.remove("card-open");
                            card2.classList.remove("card-open");

                            if (document.querySelectorAll(".card-matched").length === emojis.length) {
                                alert("win");
                            }
                        }
                        else {
                            card1.classList.remove("card-open");
                            card2.classList.remove("card-open");
                        }
                    }
                }, 500);
            }
        }

    }
}

gameBtn.addEventListener("click", () => {
    // Clear the previous timer interval if it exists
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    controlGame();
})

document.querySelector(".start-game").addEventListener("click", () => {
    document.querySelector(".controls").classList.remove("d-none");
    controlGame();
})




