const audioBgm = new Audio('./sound/bgm.mp3');
const audioBug = new Audio('./sound/bug2.mp3');
const audioFile = new Audio('./sound/file.mp3');
audioSetting();

const stageSetting = {
  1 : { time: 50, bugNum: 4 },
  2 : { time: 50, bugNum: 4 },
  3 : { time: 50, bugNum: 4 }
}

let stage = 1;
let time = stageSetting[stage].time;
let timeId = undefined;
let bugNum = stageSetting[stage].bugNum;
let heart = 3;

const header = document.querySelector('.header');
const stageDisplay = document.querySelector('.status__stage');
const timeDisplay = document.querySelector('.status__time');
const hearts = document.querySelectorAll('.status__heart');
const content = document.querySelector('.content');
const bugImgs = document.querySelectorAll('.bug__img');
const fileImgs = document.querySelectorAll('.file__img');
const btnPause = document.querySelector('.header__btn--pause');
const btnPauseIcon = document.querySelector('.header__btn--pause i');
const overlay = document.querySelector('.overlay');
const overlayBtn = document.querySelector('.overlay__btn');
const overlayMain = document.querySelector('.overlay__main-title');
const overlaySub = document.querySelector('.overlay__sub-title');

// main
overlayBtn.addEventListener('click', () => {
  gameStart();
});

bugImgAddEvent();
fileImgAddEvent();



btnPause.addEventListener('click', () => {
  if (btnPauseIcon.className === 'fas fa-pause') {
    clearInterval(timeId);
    btnPauseIcon.classList.remove('fa-pause');
    btnPauseIcon.classList.add('fa-play');
  } else {
    timeId = reduceTime();
    btnPauseIcon.classList.remove('fa-play');
    btnPauseIcon.classList.add('fa-pause');
  }
});
/*
  btnPauseIcon이 'fas fa-pause'인 경우, 
  시간을 중지하고 icon을 'fas fa-play'로 변경한다.
  btnPauseIcon이 'fas fa-play'인 경우,
  시간을 흐르게하고 icon을 'fas fa-pause'로 변경한다.
*/

function gameStart() {
  stageDisplay.textContent = `Stage ${stage}`;
  time = stageSetting[stage].time;
  updateTimeText();
  timeId = reduceTime(); // reduce every 1 second
  bugNum = stageSetting[stage].bugNum;

  showBugs(); showFiles();
  overlayHide();
  audioBgm.play();
}

function showBugs() {
  bugImgs.forEach(bugImg => {
    bugImg.classList.remove('hidden');

    // 부모 영역(.bugs)을 기준으로 0% ~ 85% 위치에 표시
    const randomXPos = Math.floor(Math.random() * 86);
    const randomYPos = Math.floor(Math.random() * 86);
    bugImg.style.left = `${randomXPos}%`;
    bugImg.style.top = `${randomYPos}%`;
  });
}

function showFiles() {
  fileImgs.forEach(fileImg => {
    fileImg.classList.remove('hidden');

    // 부모 영역(.files)을 기준으로 0% ~ 85% 위치에 표시
    const randomXPos = Math.floor(Math.random() * 86);
    const randomYPos = Math.floor(Math.random() * 86);
    fileImg.style.left = `${randomXPos}%`;
    fileImg.style.top = `${randomYPos}%`;
  });
}

function gameOver() {
  overlayShow();

  overlayMain.setAttribute('src', './img/title_end.png')
  overlaySub.setAttribute('src', './img/cry.png');
  overlayBtn.textContent = 'Replay?';

  hearts.forEach(heart => {
    heart.classList.remove('hidden');
  });

  stage = 1;
  time = stageSetting[stage].time;
  bugNum = stageSetting[stage].bugNum;
  heart = 3;
  clearInterval(timeId);
}

function win() {
  overlayMain.setAttribute('src', './img/title_win.png');
};

function overlayShow() {
  overlay.classList.add('show');
  header.classList.remove('show');
  content.classList.remove('show');
}

function overlayHide() {
  overlay.classList.remove('show'); 
  header.classList.add('show');
  content.classList.add('show');
}

function reduceTime() {
  return setInterval(() => {
    time--;
    updateTimeText();
    if (time === 0) {
      gameOver();
      return;
    }
  }, 1000);
}

function updateTimeText() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  timeDisplay.textContent = `${minutes} : ${seconds}`;
}

function audioSetting() {
  audioBgm.loop = true;
  audioBgm.volume = 0.5;
  audioBug.volume = 0.7;
  audioFile.volume = 0.7;
}

function audioBugPlay() {
  audioBug.pause();
  audioBug.currentTime = 0;
  audioBug.play();
}

function audioFilePlay() {
  audioFile.pause();
  audioFile.currentTime = 0;
  audioFile.play();
}

function bugImgAddEvent() {
  bugImgs.forEach(bugImg => {
    bugImg.addEventListener('click', () => {
      audioBugPlay();
      bugImg.classList.add('hidden');
      bugNum--;
      if (!bugNum) {
        clearInterval(timeId);
  
        overlayShow();
  
        stage++;
        if (stage === 2) {
          overlaySub.setAttribute('src', './img/bug2.png');
        } else if (stage === 3) {
          overlaySub.setAttribute('src', './img/bug3.png');
        } else if (stage > 3) {
          win();
          return;
        }
        overlayMain.setAttribute('src', './img/title_clear.png')
        overlayBtn.textContent = 'Next Stage';
      }
    });
  });
}

function fileImgAddEvent() {
  fileImgs.forEach(fileImg => {
    fileImg.addEventListener('click', () => {
      fileImg.classList.add('hidden');
      heart--;
      hearts[heart].classList.add('hidden');
      if (heart === 0) {
        gameOver();
      }
      audioFilePlay();
    });
  });
}
