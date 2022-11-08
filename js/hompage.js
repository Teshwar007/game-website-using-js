let totaltokens = document.querySelector("#totaltokens");
let g1tokens = document.querySelector("#g1tokens");
let g2tokens = document.querySelector("#g2tokens");
localStorage.setItem("dldStarted", "");
localStorage.setItem("tvstarted", "");

let tt = Number(localStorage.getItem("gT"));
let g1t = Number(localStorage.getItem("g1") ?? 0);
let g2t = Number(localStorage.getItem("g2") ?? 0);
totaltokens.innerHTML = tt ?? 0;
g1tokens.innerHTML = g1t ?? 0;
g2tokens.innerHTML = g2t ?? 0;

const splitHandler = (game) => {
  let enteredTokens;
  if (game === "g1") {
    enteredTokens = document.querySelector("#splittokenInput");
  }
  if (game === "g2") {
    enteredTokens = document.querySelector("#split2tokenInput");
  }
  console.log("enteredTokens: ", enteredTokens);

  let totalTokens = Number(localStorage.getItem("gT"));
  let splitToken = Number(enteredTokens.value);
  console.log("splitToken: ", splitToken);
  console.log("totalTokens: ", totalTokens);
  if (splitToken <= totalTokens) {
    let totlaTokens = Number(localStorage.getItem("gT"));
    localStorage.setItem("gT", totlaTokens - splitToken);
    let gameTokens = Number(localStorage.getItem(game));
    console.log("gameTokens: ", gameTokens);
    let totalGameTokens = gameTokens + splitToken;
    console.log("enteredTokens: ", typeof splitToken);
    console.log("totalGameTokens: ", totalGameTokens);
    localStorage.setItem(game, gameTokens + splitToken);
    // setBalanceTokens(totlaTokens - splitToken);
    totaltokens.innerHTML = Number(totlaTokens - splitToken);
    // setGameTokens({ ...gameTokens, [game]: gameTokens + splitToken });
    if (game == "g1") {
      g1tokens.innerHTML = gameTokens + splitToken;
    } else {
      g2tokens.innerHTML = gameTokens + splitToken;
    }

    // console.log("tokens: ", tokens);

    handleSplitModal();
  } else {
    alert("Tokens should not exceed total tokens");
  }
};

let addButton = document.querySelector("#add");
let g1splitButton = document.querySelector("#g1split");
let g2splitButton = document.querySelector("#g2split");
const addTotalTokens = () => {
  let tgt = Number(localStorage.getItem("gT") ?? 0);
  console.log("tgt: ", tgt);
  let enteredTokens = document.querySelector("#tokenInput");
  console.log("enteredTokens: ", enteredTokens.value);
  totaltokens.innerHTML = Number(enteredTokens.value ?? 0) + Number(tgt) ?? 0;

  localStorage.setItem("gT", Number(enteredTokens.value ?? 0) + Number(tgt));
};
addButton.addEventListener("click", addTotalTokens);
g1splitButton.addEventListener("click", () => splitHandler("g1"));
g2splitButton.addEventListener("click", () => splitHandler("g2"));
