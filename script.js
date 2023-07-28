const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
let difficultySelect = document.getElementById('difficulty');

//Random words
let words = [
    'exquisite',
    'magnificent',
    'exploration',
    'fatique',
    'mismanagement',
    'feudialism',
    'aspiration',
    'bouquet',
    'fascination',
    'buglary',
    'catholic',
    'artifacts',
    'nutrition',
    'motivation',
    'fashion',
    'topography',
    'political',
    'administration',
    'consistency',
    'settings',
    'getaway',
    'giraffe',
    'pleasant',
    'nicotine',
    'dopamine',
    'xenophobia',
    'classification',
    'excellence',
    'anniversary',
    'plantation',
    'cue',
    'mastery',
    'distinct',
    'drag',
    'gratify',
    'impulse',
    'stupor',
    'migraine',
    'pollutants',
    'feverish',
    'motorcycle',
    'beach',
    'freckle',
    'minus',
    'knowledge'
];

//init random word, time & score
let randomWord;
let score = 0;
let time = 10;
let insertedWord;

//get diiificulty
let difficulty = localStorage.getItem('difficulty') !== null ?  localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = localStorage.getItem('difficulty') !== null ?  localStorage.getItem('difficulty') : 'medium';
//focus cursor
text.focus();

//generate random word
function generateRandom() {
    randomWord = words[Math.floor(Math.random() * words.length)];
    word.innerHTML = randomWord;
}
generateRandom();

//update score
function updateScore() {
    score++;
    scoreEl.innerText = score;
}

//set time interval
const timeInterval = setInterval(updateTime, 1000)


//update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time == 0) {
        clearInterval(timeInterval)

        gameOver();
    } 
}

//Game over 
function gameOver() {
    endgameEl.innerHTML = `
      <h1>Game over</h1>
      <p>Your final score is ${score}</p>
      <button onclick="location.reload()">Reload</button>
    `
    endgameEl.style.display = "flex";
}

//Event listener
text.addEventListener('input', e => {
   insertedWord = e.target.value;
    
   if (insertedWord === randomWord) {
       generateRandom();

       updateScore();

       if (difficulty === 'hard') {
        time += 2
       } else if (difficulty === 'medium') {
        time += 3
       } else{
        time += 5
       }

       updateTime();
       text.value = ''

    }
})

//Event listener on settingsBtn
settingsBtn.addEventListener('click', e => {
    settings.classList.toggle('hide')
})

//Event listener on settings-form
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    
    localStorage.setItem('difficulty', difficulty);
})