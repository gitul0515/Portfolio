// Music 설정
const musicBackgroud = new Audio('./sound/bgm.mp3');
musicBackgroud.volume = 0.5;
musicBackgroud.loop = true;
const musicBug = new Audio('./sound/bug2.mp3');
musicBug.volume = 0.7;
const musicFile = new Audio('./sound/file.mp3');
musicFile.volume = 0.7;

// 스테이지 설정
const stageSetting = {
  1 : {
    bugNum: 4,
    time: 50
  },
  2 : {
    bugNum: 4,
    time: 50
  },
  3 : {
    bugNum: 4,
    time: 50
  }
}
let curStage = 1;

// 남은 시간
let time;
let intervalID;
const timeNode = document.querySelector('.header__time');

// overlayBtn 이벤트 설정
const overlay = document.querySelector('.overlay');
const overlayBtn = document.querySelector('.overlay__btn');
const header = document.querySelector('.header');
const headerStage = document.querySelector('.header__stage');
const content = document.querySelector('.content');
const bugs = document.querySelectorAll('.bug__img');
const files = document.querySelectorAll('.file__img');

overlayBtn.addEventListener('click', () => {
  musicBackgroud.play();
  header.classList.add('show');
  content.classList.add('show');
  overlay.classList.remove('show');  

  headerStage.textContent = `Stage ${curStage}`;
  time = stageSetting[curStage].time;
  timeNode.textContent = `${time}`;
  
  // 남은 시간을 1초마다 감소
  intervalID = setInterval(() => {
  timeNode.textContent = `${--time}`;
  if (!time) {
    gameOver();
  }
}, 1000);

  createBugs();
  createFiles();
});

// bugs를 생성하고 랜덤하게 배치
function createBugs() {
  bugs.forEach(bug => {
    bug.classList.remove('hidden');

    // 10 ~ 80의 난수 생성
    const bugRndX = Math.floor(Math.random() * 71) + 10;
    const bugRndY = Math.floor(Math.random() * 71) + 10;
    bug.style.left = `${bugRndX}%`;
    bug.style.top = `${bugRndY}%`;
  });
}

// files를 생성하고 랜덤하게 배치
function createFiles() {
  files.forEach(file => {
    file.classList.remove('hidden');

    // 10 ~ 80의 난수 생성
    const fileRndX = Math.floor(Math.random() * 71) + 10;
    const fileRndY = Math.floor(Math.random() * 71) + 10;
    file.style.left = `${fileRndX}%`;
    file.style.top = `${fileRndY}%`;
  });
}

// bugs 이벤트 설정
const overlayMain = document.querySelector('.overlay__main-title');
const overlaySub = document.querySelector('.overlay__sub-title');

bugs.forEach(bug => {
  bug.addEventListener('click', () => {
    musicBug.pause();
    musicBug.currentTime = 0;
    musicBug.play();
    bug.classList.add('hidden');
    stageSetting[curStage].bugNum--;
    if (!stageSetting[curStage].bugNum) {
      clearInterval(intervalID);

      header.classList.remove('show');
      content.classList.remove('show');
      overlay.classList.add('show');

      curStage++;
      if (curStage === 2) {
        overlaySub.setAttribute('src', './img/bug2.png');
      } else if (curStage === 3) {
        overlaySub.setAttribute('src', './img/bug3.png');
      } else if (curStage > 3) {
        win();
        return;
      }
      overlayMain.setAttribute('src', './img/title_clear.png')
      overlayBtn.textContent = 'Next Stage';
    }
  });
});

// files 이벤트 설정
const lives = [...document.querySelectorAll('.header__life')];
let curLives = 3;
files.forEach(file => {
  file.addEventListener('click', () => {
    musicFile.pause();
    musicFile.currentTime = 0;
    musicFile.play();
    file.classList.add('hidden');
    curLives--;
    lives[curLives].classList.add('hidden');
    if (!curLives) {
      gameOver();
    }
  });
});

// btnPause 이벤트 설정
const btnPause = document.querySelector('.header__btn--pause');
const btnPauseIcon = document.querySelector('.header__btn--pause i');
btnPause.addEventListener('click', () => {
  if (btnPauseIcon.className === 'fas fa-pause') {
    clearInterval(intervalID);
    btnPauseIcon.className = 'fas fa-play';
  } else {
    intervalID = setInterval(() => {
      timeNode.textContent = `${--time}`;
      if (!time) {
        gameOver();
      }
    }, 1000);
    btnPauseIcon.className = 'fas fa-pause';
  }
});
/*
  btnPauseIcon이 'fas fa-pause'인 경우, 
  시간을 중지하고 icon을 'fas fa-play'로 변경한다.
  btnPauseIcon이 'fas fa-play'인 경우,
  시간을 흐르게하고 icon을 'fas fa-pause'로 변경한다.
*/

function gameOver() {
  header.classList.remove('show');
  content.classList.remove('show');
  overlay.classList.add('show');

  overlayMain.setAttribute('src', './img/title_end.png')
  overlaySub.setAttribute('src', './img/cry.png');
  overlayBtn.textContent = 'Replay?';

  lives.forEach(life => {
    life.classList.remove('hidden');
  });

  clearInterval(intervalID);
  curStage = 1;
  curLives = 3;
}

function win() {
  overlayMain.setAttribute('src', './img/title_win.png');
};