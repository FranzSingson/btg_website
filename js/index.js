import { level1Arr, level2Arr, level3Arr } from './dataArrays.mjs';
import { createBuddyElem, playCompletedSound, playSound2, playFlipCardSound, playCorrectSound, showCongratulatoryMsg, showConsolationMsg } from './features.mjs';
import { scoreCalculator, createScoreLevelDisplay, scoreChecker } from './leaderBoard.mjs';

const tempArr = [];
let tempArrCounter = 0;
let playerMovesCounter = 0;
const playerMovesElem = document.querySelector('#move_counter');

// Use by timer
const startMinutes = 0;
let time = startMinutes * 60;

let recordedTime;
let setIntID;
let userMoneyValue = 0;

const userStatsObj = {};
let userLevel = 1;

function shuffleArray(arr) {
  arr.sort(() => Math.random() - 0.5);
  return arr;
}

function createCardDivs(arr, parent) {
  shuffleArray(arr);

  // Select the Section Element
  // const sectionElem = document.querySelector('#grid1');
  // console.log(arr);

  for (const arrayItem of arr) {
    const cardDiv = document.createElement('div');
    const back = document.createElement('img');

    cardDiv.classList = 'card';
    back.classList = 'back_face';

    back.src = './resources/back_card.PNG';
    back.alt = 'Question mark image';

    const imgElem = document.createElement('img');
    imgElem.src = arrayItem.imgSrc;
    imgElem.alt = `This is an image of ${arrayItem.imgName}`;
    imgElem.classList = 'front_face';
    imgElem.id = `${arrayItem.imgName}`;
    imgElem.setAttribute('nameOfCard', `${arrayItem.imgName}`);
    cardDiv.appendChild(imgElem);
    cardDiv.appendChild(back);

    parent.appendChild(cardDiv);
  }
}

function clickListener() {
  const cardDivs = document.querySelectorAll('.card');
  for (const cardDiv of cardDivs) {
    cardDiv.addEventListener('click', () => {
      //   cardDiv.classList.toggle('unclickable');
      // playFlipCardSound();
      cardDiv.classList.toggle('flipCard');

      // it will be unclickable once the card is face up
      //   makeClickable(cardDiv);
      checkPair(cardDiv);
    });
  }
}

function checkPair(card) {
  playFlipCardSound();

  playerMovesCounter++;

  card.classList.toggle('checking');
  const shownCards = document.querySelectorAll('.checking');

  if (shownCards.length === 2) {
    if (shownCards[0].firstChild.getAttribute('nameofcard') === shownCards[1].firstChild.getAttribute('nameofcard')) {
      for (const shownCard of shownCards) {
        // console.log('Match');
        showCongratulatoryMsg();
        shownCard.classList.add('cardMatched');
        shownCard.classList.remove('checking');
        shownCard.classList.remove('unclickable');

        tempArr.push(tempArrCounter++);

        console.log('this is level ' + userLevel);

        const levelSpan = document.querySelector('#level_span');
        levelSpan.textContent = userLevel;

        /// ///// Grid1 to grid2
        if (tempArr.length > 15 && document.getElementById('grid1') !== null) {
          document.querySelector('#btn2').classList.toggle('hidden');

          const tempArrL1 = [];

          clearInterval(setIntID);

          userStatsObj.recoredLevel = userLevel;
          userStatsObj.recordedTime = recordedTime;
          userStatsObj.recordedMoves = playerMovesCounter;

          createScoreLevelDisplay(userLevel);
          scoreCalculator(userLevel, recordedTime, playerMovesCounter);

          console.log(userStatsObj);
          tempArrL1.push(userStatsObj);

          localStorage.setItem('userStats', JSON.stringify(tempArrL1));

          userLevel = 2;
          console.log('this is level ' + userLevel);

          playSound2();
        // eslint-disable-next-line brace-style
        }

        /// ///// grid2 to grid3
        else if (tempArr.length > 31 && document.getElementById('grid2') !== null) {
          document.querySelector('#btn3').classList.remove('hidden');

          let tempArrL2 = [];
          // Retrieve userStats of Level1
          const userStats = JSON.parse(localStorage.getItem('userStats'));

          tempArrL2 = userStats;

          // When level 2 is completed before time runs out
          clearInterval(setIntID);

          userStatsObj.recoredLevel = userLevel;
          userStatsObj.recordedTime = recordedTime;
          userStatsObj.recordedMoves = playerMovesCounter;

          createScoreLevelDisplay(userLevel);
          scoreCalculator(userLevel, recordedTime, playerMovesCounter);

          tempArrL2.push(userStatsObj);

          localStorage.setItem('userStats', JSON.stringify(tempArrL2));

          userLevel = 3;
          console.log('this is level ' + userLevel);
          playSound2();
        // eslint-disable-next-line brace-style
        }

        /// ///// grid3 to grid4
        else if (tempArr.length > 47 && document.getElementById('grid3') !== null) {
          console.log('go to final level here');
          // Run a [FUNCTION] and say this feature is coming
          document.querySelector('#btn_cstm').classList.remove('hidden');

          let tempArrL3 = [];
          // Retrieve userStats of Level1
          const userStats = JSON.parse(localStorage.getItem('userStats'));

          tempArrL3 = userStats;

          // When level 3 is completed before time runs out
          clearInterval(setIntID);

          userStatsObj.recoredLevel = userLevel;
          userStatsObj.recordedTime = recordedTime;
          userStatsObj.recordedMoves = playerMovesCounter;

          createScoreLevelDisplay(userLevel);
          scoreCalculator(userLevel, recordedTime, playerMovesCounter);

          // This function will update leaderboard
          scoreChecker();
          playCompletedSound();

          tempArrL3.push(userStatsObj);

          localStorage.setItem('userStats', JSON.stringify(tempArrL3));

          userLevel = 4;
          console.log('this is level ' + userLevel);
        }
      }
      playCorrectSound();

      userMoneyValue += 10;
      document.querySelector('#user_money_value').textContent = userMoneyValue;
      // This code handles when the pair cards dont match
    } else {
      for (const shownCard of shownCards) {
        shownCard.classList.remove('checking');
        shownCard.classList.remove('unclickable');
        setTimeout(() => shownCard.classList.remove('flipCard'), 1000);
      }
      showConsolationMsg();
    }
  } else {
    // This code disables the user to flip the initial card they revealed
    shownCards[0].classList.toggle('unclickable');
  }

  localStorage.setItem('numbOfMoves', JSON.stringify(playerMovesCounter));

  playerMovesElem.textContent = playerMovesCounter;
}

/// /// This a time handler section //////
function timeToggler() {
  clearInterval(setIntID);
  time = 0;
  setIntID = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const timeElem = document.querySelector('#time_counter');
  const mins = Math.floor(time / 60);
  let sec = time % 60;

  sec = sec < 10 ? '0' + sec : sec;
  timeElem.innerHTML = `${mins}:${sec}`;

  // This is the case when user's run out of time
  if (time === 300) {
    clearInterval(setIntID);
    // This is when timer runs out
    alert('Unfortunately, you ran out of time. The game will now restart.');
    location.reload();
    recordedTime = time;
  } else {
    time++;
    // Minus one because its delayed by 1 second
    recordedTime = time - 1;
  }

  return time;
}

// This function removes the Start and opens Grid1
function startLevel1() {
  const btn1 = document.querySelector('#btn1');
  const grid1 = document.querySelector('#grid1');
  btn1.addEventListener('click', () => {
    // Replace text on buddy
    document.querySelector('#buddy_text_id').textContent = 'Match the shapes.';

    // Hide play button or delete
    btn1.classList.toggle('hidden');
    // Show Grid1
    grid1.classList.toggle('grid1_hidden');
    // Show timer and counter
    document.querySelector('.div_level_id').classList.toggle('div_level_id');
    document.querySelector('.div_time_id').classList.toggle('div_time_id');
    document.querySelector('.div_move_id').classList.toggle('div_move_id');

    const levelSpan = document.querySelector('#level_span');
    levelSpan.textContent = 1;

    timeToggler();
  });
}

function startLevel2() {
  const btn2 = document.querySelector('#btn2');
  const grid2 = document.querySelector('#grid2');
  btn2.addEventListener('click', () => {
    // Remove text from buddy
    document.querySelector('#buddy_text_id').textContent = 'Match the symbols.';

    // Remove Grid1
    document.querySelector('#grid1').remove();

    // Hide Button Level 2 when level starts
    btn2.classList.toggle('hidden');
    // Show Grid2
    grid2.classList.toggle('grid2_hidden');

    const levelSpan = document.querySelector('#level_span');
    levelSpan.textContent = 2;

    // Reset timer textContent to 0:00
    document.querySelector('#time_counter').textContent = '0:00';

    // Reset PlayerMoves textContent to 0:
    document.querySelector('#move_counter').textContent = 0;

    playerMovesCounter = 0;

    timeToggler();
  });
}

function startLeve13() {
  const btn3 = document.querySelector('#btn3');
  const grid3 = document.querySelector('#grid3');

  btn3.addEventListener('click', () => {
    // Remove text from buddy
    document.querySelector('#buddy_text_id').textContent = 'Match equation with answer.';

    // Remove Grid2
    document.querySelector('#grid2').remove();

    // This will Hide Button Level 3 when level starts
    btn3.classList.toggle('hidden');
    // Show grid3
    grid3.classList.toggle('grid3_hidden');

    const levelSpan = document.querySelector('#level_span');
    levelSpan.textContent = 3;

    // Reset timer textContent to 0:00
    document.querySelector('#time_counter').textContent = '0:00';

    // Reset PlayerMoves textContent to 0:
    document.querySelector('#move_counter').textContent = 0;

    playerMovesCounter = 0;

    timeToggler();
  });
}

function startLevel4() {
  const cstmBtn = document.querySelector('#btn_cstm');

  cstmBtn.addEventListener('click', () => {
    alert('This is a future feature for the game! The game will now return to the homepage.');
    location.reload();
  });
}

function initIndex() {
  const parent1 = document.querySelector('#grid1');
  const parent2 = document.querySelector('#grid2');
  const parent3 = document.querySelector('#grid3');
  createCardDivs(level1Arr, parent1);
  createCardDivs(level2Arr, parent2);
  createCardDivs(level3Arr, parent3);


  clickListener();
  startLevel1();
  startLevel2();
  startLeve13();
  startLevel4();
  createBuddyElem();
}

initIndex();
