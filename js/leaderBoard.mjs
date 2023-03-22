import { leaderboardArr } from './dataArrays.mjs';

const scoreArr = [];
const userStatsObj = {};

function updateLeaderboard(dataArray) {
  dataArray.sort((a, b) => b.score - a.score);
  const dataArray5 = dataArray.slice(0, 5);

  const tableBodyElem = document.createElement('tbody');
  tableBodyElem.id = 'table_body';

  // Create a new row for each item in the sorted array and append it to the table
  dataArray5.forEach((item, index) => {
    const rowNew = document.createElement('tr');
    const cellRank = document.createElement('td');
    const cellName = document.createElement('td');
    const cellScore = document.createElement('td');
    if (item.name === 'User') {
      cellRank.textContent = index + 1;
      cellName.textContent = item.name;
      cellScore.textContent = item.score;
      rowNew.id = 'new_achievement';
      rowNew.appendChild(cellRank);
      rowNew.appendChild(cellName);
      rowNew.appendChild(cellScore);
      tableBodyElem.appendChild(rowNew);
    }
    cellRank.textContent = index + 1;
    cellName.textContent = item.name;
    cellScore.textContent = item.score;
    rowNew.appendChild(cellRank);
    rowNew.appendChild(cellName);
    rowNew.appendChild(cellScore);
    tableBodyElem.appendChild(rowNew);

    document.querySelector('.table_class').append(tableBodyElem);
  });
}

export function createScoreLevelDisplay(level) {
  const userScoreElem1 = document.createElement('div');
  userScoreElem1.className = `l${level}_score_class`;
  // userScoreElem1.textContent = `User Level ${level} score: 0`;
  document.querySelector('.lb_parent_class').append(userScoreElem1);
}

export function scoreCalculator(level, time, moves) {
  const userScore = parseInt(((1 / ((time + moves) + 1)) * 10000).toFixed(2));

  scoreArr.push(userScore);

  const scoreSelector = document.querySelector(`.l${level}_score_class`);

  let total = 0;
  for (let i = 0; i < scoreArr.length; i++) {
    total += scoreArr[i];
  }

  document.querySelector('#user_money_value').textContent = total;

  scoreSelector.textContent = `Level ${level} score: ${userScore}`;
}


export function scoreChecker() {
  console.log(scoreArr);

  let total = 0;

  for (let i = 0; i < scoreArr.length; i++) {
    total += scoreArr[i];
  }
  console.log(total);

  // Push this new total to the current Leaderboard Array
  userStatsObj.name = 'User';
  userStatsObj.score = total;

  // Push new user to array of objects
  leaderboardArr.push(userStatsObj);

  // Remove current leaderboard body
  document.querySelector('#table_body').remove();

  // create new leaderboard body
  updateLeaderboard(leaderboardArr);

  // This will create element for total score
  const userScoreElem1 = document.createElement('div');
  userScoreElem1.className = 'total_score_class';
  userScoreElem1.textContent = `Your total score: ${total}`;
  document.querySelector('.lb_parent_class').append(userScoreElem1);
}

function initLb() {
  updateLeaderboard(leaderboardArr);
}

initLb();
