//Global Variables
var background = document.getElementById("background");
var trollWalkingImage = document.getElementsByClassName("troll-walking")[0];
var trollDistanceBackground = document.getElementById("troll-distance-background");

var introStart = document.getElementsByClassName("intro-start")[0];
var introStartButton = document.getElementsByClassName("intro-start-button")[0];
var introModal = document.getElementsByClassName("intro-modal")[0];
var startGameButton = document.getElementsByClassName("start-game-button")[0];
var gameRow = document.getElementsByClassName("game-row")[0];

var statsHideButton = document.getElementById("stats-button");
var statColumnHide = document.getElementById("stat-column");

var gameCards = document.getElementById("gameCards");
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses
var maxMatches = 9;
var matches = 0;
var theModal1 = document.getElementsByClassName("modal")[0];
var theModal2 = document.getElementsByClassName("modal")[1];
var playAgain = document.getElementById("play-again");
var repeatLevel = document.getElementById("repeat-level");
var selectAllCardBacks = document.querySelectorAll(".card-back");
var selectAllCardFronts = document.querySelectorAll(".card-front");
var attempts = document.getElementById("attempts");
var turns = 0;
var accuracy = document.getElementById("accuracy");
var gamesPlayed = document.getElementById("gamesPlayed");
var gamesPlayedCounter = 0;

var troll = document.querySelector(".troll-walking");
var trollDistance = 0;

var loseModal = document.querySelector(".lose-modal");

function clearCards() {
  firstCardClicked = null;
  secondCardClicked = null;
}

var characterArray = [
  "archer-shooting",
  "archer-shooting",
  "elemental-slashing",
  "elemental-slashing",
  "mage-slashing",
  "mage-slashing",
  "monk-slashing",
  "monk-slashing",
  "ninja-slashing",
  "ninja-slashing",
  "orc-slashing",
  "orc-slashing",
  "pirate-slashing",
  "pirate-slashing",
  "sergeant-slashing",
  "sergeant-slashing",
  "warrior-slashing",
  "warrior-slashing"
]

var backgroundArray = [
  "forest",
  "cave",
  "desert"
]

var backgroundPicker = Math.floor(Math.random() * 3);

introStartButton.addEventListener("click", function(){
  introStart.classList.add("hidden");
  introModal.classList.remove("hidden");
})

startGameButton.addEventListener("click", function() {
  introModal.classList.add("hidden");
  gameRow.classList.remove("hidden");
  statsHideButton.classList.remove("hidden");
  statsHideButton.classList.add("size-hide")
  trollDistanceBackground.classList.remove("hidden");
})

gameCards.addEventListener("click", handleClick);

function handleClick(event) {
  var clickTarget = event.target;

  if (clickTarget.className.indexOf("card-back") === -1) {
    return;
  }

  clickTarget.classList.add("hidden");

  if (!firstCardClicked) {
    firstCardClicked = clickTarget;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
    firstCardClicked.previousElementSibling.classList.toggle("hidden");
  } else {
    secondCardClicked = clickTarget;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    secondCardClicked.previousElementSibling.classList.toggle("hidden");

    gameCards.removeEventListener("click", handleClick);

    if (firstCardClasses === secondCardClasses) {
      gameCards.addEventListener("click", handleClick);
      clearCards();

      matches++
      if (matches === maxMatches) {
        theModal1.classList.remove("hidden");
        gameRow.classList.add("hidden");
        trollDistanceBackground.classList.add("hidden");
      }

    } else {
      setTimeout(function () {
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        firstCardClicked.previousElementSibling.classList.toggle("hidden");
        secondCardClicked.previousElementSibling.classList.toggle("hidden");
        clearCards();
        gameCards.addEventListener("click", handleClick);
      }, 1500);
    }
    turns++
    attempts.textContent = turns;
    accuracy.textContent = (Math.floor((matches / turns) * 100) + "%");

    if (turns === 20) {
      loseModal.classList.remove("hidden");
      gameRow.classList.add("hidden");
      trollDistanceBackground.classList.add("hidden");
    }

    trollDistance = (turns * 4.5);
    troll.style.right = trollDistance + "%";
  }
}

/**************************WIN MODAL/NEXT TROLL********************************/
playAgain.addEventListener("click", function () {
  theModal1.classList.add("hidden");
  gameRow.classList.remove("hidden");
  gamesPlayed.textContent = ++gamesPlayedCounter;
  turns = 0;
  matches = 0;
  attempts.textContent = 0;
  accuracy.textContent = "0%";

  var range = characterArray.length;
  var shuffleValueHolder;
  var indexArray;

  while (range) {
    indexArray = Math.floor(Math.random() * range--);

    shuffleValueHolder = characterArray[range];
    characterArray[range] = characterArray[indexArray];
    characterArray[indexArray] = shuffleValueHolder;
  }

  for (var i = 0; i < selectAllCardBacks.length; i++) {
    var changeCardBack = selectAllCardBacks[i];
    changeCardBack.classList.remove("hidden");
  }

  for (var frontIndex = 0; frontIndex < selectAllCardFronts.length; frontIndex++) {
    var cardValue = selectAllCardFronts[frontIndex];
    cardValue.classList = "";
    cardValue.classList.add("card-front", characterArray[frontIndex], "hidden");
  }

  troll.style.right = "0%"
  background.classList = backgroundArray[backgroundPicker];

  if (background.className === "forest") {
    trollWalkingImage.setAttribute("src", "./images/troll-walking.gif");
    trollDistanceBackground.classList = "";
    trollDistanceBackground.classList.add("troll-distance", "forest-walk");
  } else if (background.className === "cave") {
    trollWalkingImage.setAttribute("src", "./images/troll2-walking.gif");
    trollDistanceBackground.classList = "";
    trollDistanceBackground.classList.add("troll-distance", "dungeon-walk");
  } else if (background.className === "desert") {
    trollWalkingImage.setAttribute("src", "./images/troll3-walking.gif");
    trollDistanceBackground.classList = "";
    trollDistanceBackground.classList.add("troll-distance", "desert-walk");
  }
})

/***********************LOSE MODAL*********************************************/
repeatLevel.addEventListener("click", function () {
  setTimeout(function () {
    theModal2.classList.add("hidden");
    gameRow.classList.remove("hidden");
    trollDistanceBackground.classList.remove("hidden");
    gamesPlayed.textContent = ++gamesPlayedCounter;
    turns = 0;
    matches = 0;
    attempts.textContent = 0;
    accuracy.textContent = "0%";

    var range = characterArray.length;
    var shuffleValueHolder;
    var indexArray;

    while (range) {
      indexArray = Math.floor(Math.random() * range--);

      shuffleValueHolder = characterArray[range];
      characterArray[range] = characterArray[indexArray];
      characterArray[indexArray] = shuffleValueHolder;
    }

    for (var i = 0; i < selectAllCardBacks.length; i++) {
      var changeCardBack = selectAllCardBacks[i];
      changeCardBack.classList.remove("hidden");
    }

    for (var frontIndex = 0; frontIndex < selectAllCardFronts.length; frontIndex++) {
      var cardValue = selectAllCardFronts[frontIndex];
      cardValue.classList = "";
      cardValue.classList.add("card-front", characterArray[frontIndex], "hidden");
    }

    troll.style.right = "0%"
  }, 1500)
})
/******************DISPLAY STATS ON SMALLER DEVICES BUTTON*********************/
statsHideButton.addEventListener("click", function(){
  statColumnHide.classList.toggle("hide-stat");
  statColumnHide.classList.remove("col-2");
})
