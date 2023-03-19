import { consolationMessages, congratulatoryMessages } from './dataArrays.mjs';

export function createBuddyElem() {
  const parentDiv = document.querySelector('.buddy_div');

  const textDiv = document.createElement('div');
  textDiv.classList.add('buddy_text');
  textDiv.id = 'buddy_text_id';
  textDiv.textContent = 'Press Play to start the game';

  const buddyImg = document.createElement('img');
  buddyImg.src = './resources/assistant.jpg';
  buddyImg.alt = 'This is a cartoon of a buddy';
  buddyImg.classList = 'buddy_img_class';
  buddyImg.id = 'budddy_img_id';

  parentDiv.append(textDiv, buddyImg);
}

export function showConsolationMsg() {
  const textElem = document.querySelector('#buddy_text_id');
  textElem.textContent = `${consolationMessages[Math.floor(Math.random() * consolationMessages.length)].text}`;
}

export function showCongratulatoryMsg() {
  const textElem = document.querySelector('#buddy_text_id');
  textElem.textContent = `${congratulatoryMessages[Math.floor(Math.random() * congratulatoryMessages.length)].text}`;
}

// Sound for completing the game
export function playCompletedSound() {
  const beat = new Audio('./resources/upbeat.mp3');
  beat.volume = 0.1;
  beat.play();
}

// Sound for completing level
export function playSound2() {
  const beat = new Audio('./resources/success.mp3');
  beat.volume = 0.1;
  beat.play();
}

export function playFlipCardSound() {
  const beat = new Audio('./resources/flipcard.mp3');
  beat.volume = 0.1;
  beat.playbackRate = 3;
  beat.play();
}

// Sounds when cards match
export function playCorrectSound() {
  const beat = new Audio('./resources/correct.mp3');
  beat.volume = 0.05;
  beat.play();
}
