const gameButton = document.querySelector("#gameButton");
let cgt = Number(localStorage.getItem("g1"));
let triviatokens = document.querySelector("#triviatokens");
triviatokens.innerHTML = cgt ?? 0;

let gameStarted = Boolean(localStorage.getItem("tvstarted")) ?? false;
let flag = false
const startGame = () => {
  if (cgt < 200) {
    alert("Not enough tokens please add tokens and come back");
    return;
  }
  if (confirm("you will charged a sum of 200 tokens to play this game")) {
    let dedtoken = cgt - 200;
    localStorage.setItem("g1", dedtoken);

    triviatokens.innerHTML = dedtoken ?? 0;
    gameStarted = true;
    flag = true
    let btnDiv = document.querySelector("#buttonDiv");
    localStorage.setItem("open", 0);
    console.log("btnDiv: ", btnDiv);
    let startBtn = document.getElementById("gameButton");
    console.log("startBtn: ", startBtn);
    let resetButton = document.createElement("button");
    resetButton.id = "reset";
    resetButton.innerHTML = "Restart";
    resetButton.addEventListener("click", () => {
      window.location.reload();
      localStorage.removeItem("tvstarted");
      localStorage.removeItem("open");
    });
    btnDiv.removeChild(startBtn);
    btnDiv.appendChild(resetButton);
    localStorage.setItem("tvstarted", true);
    genres.forEach((genre) => addGenre(genre,true));
  }
};
gameButton.addEventListener("click", startGame);
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");
let score = 0;

const genres = [
  {
    name: "Books",
    id: 10,
  },
  {
    name: "Film",
    id: 11,
  },
  {
    name: "Music",
    id: 12,
  },
  {
    name: "Video Games",
    id: 15,
  },
];

const levels = ["easy", "medium", "hard"];

function addGenre(genre,flag) {
  const column = document.createElement("div");
  column.classList.add("genre-column");
  column.innerHTML = genre.name;
  game.append(column);

  levels.forEach((level) => {
    const card = document.createElement("div");
    card.classList.add("card");
    column.append(card);

    if (level === "easy") {
      card.innerHTML = 100;
    }
    if (level === "medium") {
      card.innerHTML = 200;
    }
    if (level === "hard") {
      card.innerHTML = 300;
    }

    fetch(
      `https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`
    )
      .then((response) => response.json())
      .then((data) => {
        // Not enough data to get 10 items per difficulty level and get a random
        // question using Math.random() and passing it through instead of 0
        // eg: if amount=10 above, you could do:
        // cont randomNumber = Math.floor(Math.random() * 10)
        // and pass through randomNumber, so:
        // data.results[randomNumber].question
        console.log(data);
        card.setAttribute("data-question", data.results[0].question);
        card.setAttribute("data-answer", data.results[0].correct_answer);
        card.setAttribute("data-value", card.getInnerHTML());
      })
      .then((done) =>{
        card.addEventListener("click", flag ? flipCard : gameNotStarted)
    });
  });
}
const gameNotStarted = () => {
  alert("Please start the game");
  return;
};

function flipCard() {
  this.innerHTML = "";
  this.style.fontSize = "15px";
  const textDisplay = document.createElement("div");
  const trueButton = document.createElement("button");
  const falseButton = document.createElement("button");
  trueButton.innerHTML = "True";
  falseButton.innerHTML = "False";
  trueButton.classList.add("true-button");
  falseButton.classList.add("false-button");
  trueButton.addEventListener("click", getResult);
  falseButton.addEventListener("click", getResult);
  textDisplay.innerHTML = this.getAttribute("data-question");
  this.append(textDisplay, trueButton, falseButton);

  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.removeEventListener("click", flipCard));
  let cardOpened = Number(localStorage.getItem("open") ?? 0);
  console.log("cardOpened: ", cardOpened);
  localStorage.setItem("open", cardOpened + 1);
  if (cardOpened === 11) {
    let btnDiv = document.querySelector("#buttonDiv");
    let resetButton = document.getElementById("reset");
    let finishbtn = document.createElement("button");
    finishbtn.id = "finish";
    finishbtn.innerHTML = "Finish";
    finishbtn.addEventListener("click", () => {
      window.location.reload();
      localStorage.removeItem("tvstarted");
      localStorage.removeItem("open");
      //   console.log(score)
      console.log("score: ", score);
      let totaltokens = Number(localStorage.getItem("gT"));
      console.log("totaltokens: ", totaltokens);
      let ct = Number(localStorage.getItem("g1"));
      console.log("ct: ", ct);
      let totalwinTokens = totaltokens + ct + score;
      localStorage.setItem("gT", totalwinTokens);
      localStorage.setItem("g1", 0);
      window.location.href = "p1.html";
    });
    btnDiv.removeChild(resetButton);
    btnDiv.appendChild(finishbtn);
  }
}

function getResult() {
  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.addEventListener("click", flipCard));

  const cardOfButton = this.parentElement;
  if (cardOfButton.getAttribute("data-answer") === this.innerHTML) {
    score = score + parseInt(cardOfButton.getAttribute("data-value"));
    scoreDisplay.innerHTML = score;
    cardOfButton.classList.add("correct-answer");
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      cardOfButton.innerHTML = cardOfButton.getAttribute("data-value");
    }, 100);
  } else {
    cardOfButton.classList.add("wrong-answer");
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      cardOfButton.innerHTML = 0;
    }, 100);
  }
  cardOfButton.removeEventListener("click", flipCard);
}
