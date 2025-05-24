

const questions = [
  {
    image: "./photos/Alakazam.png",
    correct_option: "Alakazam",
    type: "pokemon",
  },
  {
    image: "./photos/Arcanine.png",
    correct_option: "Arcanine",
    type: "pokemon",
  },
  {
    image: "./photos/Bulbasaur.png",
    correct_option: "Bulbasaur",
    type: "pokemon",
  },
  {
    image: "./photos/Cubone.png",
    correct_option: "Cubone",
    type: "pokemon",
  },
  {
    image: "./photos/Ditto.png",
    correct_option: "Ditto",
    type: "pokemon",
  },
  {
    image: "./photos/Gloom.png",
    correct_option: "Gloom",
    type: "pokemon",
  },
  // Math Questions
  {
    question: "12 + 7",
    correct_option: "19",
    type: "math",
  },
  {
    question: "5 x 6",
    correct_option: "30",
    type: "math",
  },
  {
    question: "15 - 4",
    correct_option: "11",
    type: "math",
  },
  {
    question: "81 / 9",
    correct_option: "9",
    type: "math",
  },
  {
    question: "2^3",
    correct_option: "8",
    type: "math",
  },
  {
    question: "25 + 17",
    correct_option: "42",
    type: "math",
  },
  {
    question: "100 - 58",
    correct_option: "42",
    type: "math",
  },
];

// All options
const pokemonOptionsArray = [
  "Alakazam", "Arcanine", "Bulbasaur", "Cubone", "Ditto", "Gloom",
  "Gyarados", "Hitmonlee", "Horsea", "Koffing", "Mewtwo", "Pikachu",
  "Seaking", "Tauros", "Venonat", "Victreebe", "Eevee", "Ivysaur",
  "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle",
  "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree",
  "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot",
  "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok",
];

const mathOptionsArray = [
  "6", "8", "9", "10", "11", "12", "13", "14", "15", "17", "18", "19", "20",
  "21", "22", "23", "25", "27", "28", "30", "32", "34", "36", "38", "40", "42",
  "45", "48", "50", "52", "55", "58", "60", "64", "70", "72", "75", "80", "81", "90", "100"
];

const container = document.querySelector(".container");
const gameContainer = document.querySelector(".game-container");
const startButton = document.getElementById("start");
const scoreContainer = document.querySelector(".score-container");
const userScore = document.getElementById("user-score");
let timer = document.getElementsByClassName("timer")[0];
let score, currentQuestion, finalQuestions;
let countdown, count = 11;

const randomValueGenerator = (array) => array[Math.floor(Math.random() * array.length)];
const randomShuffle = (array) => array.sort(() => 0.5 - Math.random());

const startGame = () => {
  const titleElement = document.getElementById("gameTitle");
  if (titleElement) {
    titleElement.style.display = "none";
  }

  startButton.style.display = "none"; // ⬅️ Hide button on start
  scoreContainer.classList.add("hide");
  gameContainer.classList.remove("hide");
  finalQuestions = populateQuestions();
  score = 0;
  currentQuestion = 0;
  cardGenerator(finalQuestions[currentQuestion]);
};
const timerDisplay = () => {
  countdown = setInterval(() => {
    count -= 1;
    timer.innerHTML = `<span>Time Left: </span>${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      nextQuestion();
    }
  }, 1000);
};

const populateOptions = (correct_option, type) => {
  let arr = [correct_option];
  let optionsArray = type === "math" ? mathOptionsArray : pokemonOptionsArray;
  while (arr.length < 4) {
    let randomvalue = randomValueGenerator(optionsArray);
    if (!arr.includes(randomvalue)) {
      arr.push(randomvalue);
    }
  }
  return arr;
};

const populateQuestions = () => {
  let chosenIndexes = [];
  let questionsBatch = [];
  while (questionsBatch.length < 10) {
    let randomvalue = randomValueGenerator(questions);
    let index = questions.indexOf(randomvalue);
    if (!chosenIndexes.includes(index)) {
      questionsBatch.push(randomvalue);
      chosenIndexes.push(index);
    }
  }
  return questionsBatch;
};

const checker = (e) => {
  let userSolution = e.target.innerText;
  let options = document.querySelectorAll(".option");
  if (userSolution === finalQuestions[currentQuestion].correct_option) {
    e.target.classList.add("correct");
    score++;
  } else {
    e.target.classList.add("incorrect");
    options.forEach((element) => {
      if (element.innerText == finalQuestions[currentQuestion].correct_option) {
        element.classList.add("correct");
      }
    });
  }

  clearInterval(countdown);
  options.forEach((element) => {
    element.disabled = true;
  });
};

const nextQuestion = () => {
  currentQuestion += 1;
  if (currentQuestion == finalQuestions.length) {
    gameContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    startButton.innerText = `Restart`;
    userScore.innerHTML = `Your score is ${score} out of ${currentQuestion}`;
    clearInterval(countdown);
  } else {
    cardGenerator(finalQuestions[currentQuestion]);
  }
};

const cardGenerator = (cardObject) => {
  const { image, question, correct_option, type } = cardObject;
  let options = randomShuffle(populateOptions(correct_option, type));

  let content = `<div class="quiz">
    <p class="num">${currentQuestion + 1}/${finalQuestions.length}</p>
    <div class="questions">`;

  content += type === "pokemon"
    ? `<img class="pokemon-image" src="${image}"/>`
    : `<h3 class="math-question">${question}</h3>`;

  content += `</div><div class="options">`;

  options.forEach(option => {
    content += `<button class="option" onclick="checker(event)">${option}</button>`;
  });

  content += `</div><div class="nxt-btn-div">
    <button class="next-btn" onclick="nextQuestion(event)">Next</button>
    </div></div>`;

  container.innerHTML = content;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
};
startButton.style.display = "inline-block";

startButton.addEventListener("click", startGame);

const bgAnimation = document.getElementById('bgAnimation');

const numberOfColorBoxes = 400;

for (let i = 0; i < numberOfColorBoxes; i++) {
    const colorBox = document.createElement('div');
    colorBox.classList.add('colorBox');
    bgAnimation.append(colorBox)
}


