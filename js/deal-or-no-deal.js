//create an array that contains the values
var moneyValues = [1, 5, 7, 10, 25, 50, 75, 100, 250, 500, 750, 50000, 75000];
//all elements
var boxes = document.querySelectorAll(".box");
var boxNr = document.querySelectorAll(".boxNr");
var boxValue = document.querySelectorAll(".boxValue");
var moneyShow = document.querySelectorAll(".moneyShow");
var bigMoneys = document.getElementById("bigMoneys");
var bank = document.getElementById("bank");
var yesDeal = document.getElementById("yesDeal");
var noDeal = document.getElementById("noDeal");
var bankOffer = document.querySelector(".bankOffer");
var prevOffers = document.getElementById("prevOffers");
var finished = document.getElementById("finished");
var chosenBox = Number(localStorage.getItem("chooseBox")) ?? 0;
var previousOffers = [];
var openedBoxes = 0;
var winnings = document.getElementById("winnings");
var lastDeal = document.getElementById("lastDeal");
var keepBox = document.getElementById("keepBox");
var changeBox = document.getElementById("changeBox");
var winningBox = 0;
var chooseBox = document.getElementById("chooseBox");
var chooseBoxButton = document.querySelectorAll(".chooseBoxButton");
var tutorial = document.getElementById("tutorial");
var seeTutorialButton = document.getElementById("seeTutorialButton");
let gameStarted = Boolean(localStorage.getItem("dldStarted") ?? false);
console.log("gameStarted: ", gameStarted);
if (!gameStarted) {
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", () => {
      if (!gameStarted) alert("Please start the game");
    });
  }
} else {
  let btnDiv = document.querySelector("#button");
  let startBtn = document.getElementById("startGame");
  let resetButton = document.createElement("button");
  resetButton.id = "reset";
  resetButton.innerHTML = "Restart";
  resetButton.style = "color:black; font-size: 16px;";
  resetButton.addEventListener("click", () => {
    window.location.reload();
    localStorage.removeItem("dldStarted");
    localStorage.removeItem("chooseBox");
  });
  btnDiv.removeChild(startBtn);
  btnDiv.appendChild(resetButton);
  addValuesNStuff();
}
if (gameStarted) {
  let btnDiv = document.querySelector("#button");
  let startBtn = document.getElementById("startGame");
  let resetButton = document.createElement("button");
  resetButton.id = "reset";
  resetButton.innerHTML = "Restart";
  resetButton.style = "color:black; font-size: 16px;";
  resetButton.addEventListener("click", () => {
    window.location.reload();
    localStorage.removeItem("dldStarted");
    localStorage.removeItem("chooseBox");
  });
  btnDiv.removeChild(startBtn);
  btnDiv.appendChild(resetButton);
}

//option to see tutorial
seeTutorialButton.addEventListener("click", function () {
  tutorial.style.display = "block";
});
//close tutorial
tutorialButton.addEventListener("click", function () {
  tutorial.style.display = "none";
});
//choosing a box
function chooseBox() {
  chooseBox.style.display = "block";
  for (var i = 0; i < chooseBoxButton.length; i++) {
    chooseBoxButton[i].addEventListener("click", function () {
      chosenBox = this.textContent;
      console.log("chosenBox: ", chosenBox);
      localStorage.setItem("chooseBox", this.textContent);
      chooseBox.style.display = "none";
      addValuesNStuff();
    });
  }
}
//money displays style
var fr = 0;
var fg = 30;
var fb = 79;
var sr = 200;
var sg = 15;
var sb = 0;
for (var i = 0; i < moneyShow.length; i++) {
  var moneyDisplay = "$" + moneyValues[i];
  moneyShow[i].textContent = moneyDisplay;
  if (i < moneyShow.length / 2) {
    moneyShow[i].classList.add("rounded1");
    moneyShow[i].style.backgroundColor =
      "rgb(" + fr + ", " + fg + ", " + fb + ")";
    fb += 8;
    fg += 5;
  } else {
    moneyShow[i].classList.add("rounded2");
    moneyShow[i].style.backgroundColor =
      "rgb(" + sr + ", " + sg + ", " + sb + ")";
    sr -= 12;
    sg -= 1;
  }
}
//shuffle values
var shuffledValues = shuffleArray(moneyValues);

let cgt = Number(localStorage.getItem("g2"));
console.log("cgt: ", cgt);
if (cgt < 200) {
  if (window.confirm("You don't have enough tokens to play this game")) {
    window.location.href = "/html/p1.html";
  } else {
    window.location.href = "/html/p1.html";
  }
} else {
  //choose a box

  let startButton = document.querySelector("#startGame");
  startButton.addEventListener("click", () => {
    if (window.confirm("You will be charged 200 tokens to play thi game")) {
      let cgtokens = Number(localStorage.getItem("g2"));
      console.log("cgtokens: ", cgtokens);
      let dedtoken = cgtokens - 200;
      localStorage.setItem("g2", dedtoken);
      localStorage.setItem("dldStarted", true);
      gameStarted = true;
      let btnDiv = document.querySelector("#button");
      let startBtn = document.getElementById("startGame");
      let resetButton = document.createElement("button");
      resetButton.id = "reset";
      resetButton.innerHTML = "Restart";
      resetButton.style = "color:black; font-size: 16px;";
      resetButton.addEventListener("click", () => {
        window.location.reload();
        localStorage.removeItem("dldStarted");
        localStorage.removeItem("chooseBox");
      });
      btnDiv.removeChild(startBtn);
      btnDiv.appendChild(resetButton);
      chooseBox.style.display = "block";

      for (var i = 0; i < chooseBoxButton.length; i++) {
        chooseBoxButton[i].addEventListener("click", function () {
          chosenBox = this.textContent;
          hide(chooseBox);

          addValuesNStuff();
        });
      }
    } else {
      window.location.href = "/html/p1.html";
    }
  });
}
//main game logic
function addValuesNStuff() {
  for (var i = 0; i < boxes.length; i++) {
    //assign values to boxes and hide them
    boxValue[i].textContent = "$" + shuffledValues[i];
    boxValue[i].classList.add("hideValue");
    //open box
    (function (j) {
      if (chosenBox !== boxNr[j].textContent) {
        //opening boxes logic
        boxes[j].addEventListener(
          "click",
          function () {
            boxValue[j].classList.remove("hideValue");
            boxValue[j].classList.add("showValue");
            boxNr[j].classList.add("hideValue");
            this.classList.add("openedBox");
            openedBoxes++;
            //remove opened boxes amounts from the array
            for (var i = 0; i < shuffledValues.length; i++) {
              if ("$" + shuffledValues[i] === boxValue[j].textContent) {
                shuffledValues.splice([i], 1);
              }
            }
            //remove opened boxes amounts from display
            for (var i = 0; i < moneyShow.length; i++) {
              if (moneyShow[i].textContent === boxValue[j].textContent) {
                if (i < moneyShow.length / 2) {
                  moneyShow[i].classList.add("hideValueLeft");
                } else {
                  moneyShow[i].classList.add("hideValueRight");
                }
              }
            }
            //show bank offer
            if (openedBoxes === 5 || openedBoxes === 10) {
              calcOffer();
              show(bank);
              animateValue(bankOffer, 0, calcOffer(), 1000);
            }
            //if two boxes remain, prompt user to pick one of the boxes
            if (openedBoxes === 10) {
              winnings.textContent = winningBox;
              lastDeal.style.display = "block";
            }
          },
          { once: true }
        );
      } else {
        boxes[j].classList.add("chosenBox");
        winningBox = boxValue[j].textContent;
        localStorage.setItem("chooseBox", j + 1);
        console.log("what");
      }
    })(i);
  }
}
//bank offer logic
noDeal.addEventListener("click", function () {
  bank.style.display = "none";
  previousOffers.push(bankOffer.textContent);
  prevOffers.textContent = "Previous Offers: " + previousOffers;
});
yesDeal.addEventListener("click", function () {
  bank.style.display = "none";
  winnings.textContent = bankOffer.textContent;
  console.log("bankOffer.textContent: ", bankOffer.textContent.split("$")[1]);
  finish(Number(bankOffer.textContent.split("$")[1] ?? 0));
});
//keeping or changing box logic
keepBox.addEventListener("click", function () {
  console.log("winningBox", winningBox.split("$")[1]);
  lastDeal.style.display = "none";
  finish(Number(winningBox.split("$")[1]));
});

changeBox.addEventListener("click", function () {
  lastDeal.style.display = "none";
  let amount;
  for (var i = 0; i < shuffledValues.length; i++) {
    amount = Number(shuffledValues[i]);
    if (shuffledValues[i] !== winningBox) {
      winnings.textContent = "$" + amount;
    }
  }
  finish(amount);
  console.log("amount: ", amount);
});
//bank offer logic function
function calcOffer() {
  var valuesSum = shuffledValues.reduce(function (a, b) {
    return a + b;
  }, 0);
  var randomPercentage = (Math.floor(Math.random() * 10) + 1) * 0.01 + 1;
  var offer =
    Math.round(((valuesSum / shuffledValues.length) * randomPercentage) / 100) *
    100;
  return offer;
}
function show(div) {
  div.style.display = "block";
}

function hide(div) {
  div.style.display = "none";
}

function finish(winAmount) {
  console.log("winAmount: ", winAmount);
  if (winAmount) {
    if (window.confirm(`You won ${winAmount}`)) {
      let tt = Number(localStorage.getItem("gT"));
      let cg = Number(localStorage.getItem("g2"));
      let win = winAmount;
      let total = tt + cg + win;
      localStorage.setItem("gT", total);
      localStorage.setItem("g2", 0);
      window.location.href = "/html/p1.html";
    } else {
      window.location.href = "/html/p1.html";
    }
  }
  finished.style.display = "block";
}
//shuffling the array
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

//FUNCTION FROM STACK OVERFLOW. CREDITS: jfriend00 on Stack Overflow!
function animateValue(id, start, end, duration) {
  var obj = id;
  var range = end - start;
  var minTimer = 50;
  var stepTime = Math.abs(Math.floor(duration / range));

  stepTime = Math.max(stepTime, minTimer);

  var startTime = new Date().getTime();
  var endTime = startTime + duration;
  var timer;

  function run() {
    var now = new Date().getTime();
    var remaining = Math.max((endTime - now) / duration, 0);
    var value = Math.round(end - remaining * range);
    obj.innerHTML = "$" + value;
    if (value == end) {
      clearInterval(timer);
    }
  }
  timer = setInterval(run, stepTime);
  run();
}
