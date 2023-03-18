// Atm this file is not in use.


const startMinutes = 0;
let time = startMinutes * 60;
let setIntID;

export function timeToggler() {
    setIntID = setInterval(updateTimer, 1000);
}

function updateTimer() {

  const Elem = document.querySelector('#time_counter');
  const mins = Math.floor(time / 60);
  let sec = time % 60;

  sec = sec < 10 ? '0' + sec : sec;
  Elem.innerHTML = `${mins}:${sec}`;
  console.log(time);

  // Time limit up to 5 minutes then the game shows an alert message, perhaps continue to next level or something, make elements unclickable and show Level2 btn
  if (time == 120) {
    clearInterval(setIntID);
    // Stuff here
  } else {
    time++;
  }

  // return time;
}


// clickListner();


// function clickListner() {
//   const btn1 = document.getElementById('btn1');

//   btn1.addEventListener('click', () => {
//     setIntID = setInterval(timerUp, 1000);
//   });
// }


// Set an interval to update the timer every 1 second


// function timerUp() {
//     time++;
//     document.getElementById('time_counter').innerHTML = time;

//     // Stop the interval and store the final time when it reaches 30 seconds
//     if (time == 30) {
//       clearInterval(interval);
//       var finalTime = time;
//       console.log('Final Time: ' + finalTime);
//     }
// }

// clickListner();