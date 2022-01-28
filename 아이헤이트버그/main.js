const stageSetting = {
  1 : { time: 50, bugNum: 4 },
  2 : { time: 50, bugNum: 4 },
  3 : { time: 50, bugNum: 4 }
}
let stage = 1;
let time = stageSetting[stage].time;
let timeId = undefined;
let bugNum = stageSetting[stage].bugNum;
let lifeNum = 3;
const audioBgm = new Audio('./sound/bgm.mp3');
const audioBug = new Audio('./sound/bug2.mp3');
const audioFile = new Audio('./sound/file.mp3');

const header = document.querySelector('.header');
const stageDisplay = document.querySelector('.status__stage');
const timeDisplay = document.querySelector('.status__time');
const lifePoints = document.querySelectorAll('.status__life-point');
const content = document.querySelector('.content');
const bugImgs = document.querySelectorAll('.bug__img');
const fileImgs = document.querySelectorAll('.file__img');
const btnPause = document.querySelector('.header__btn--pause');
const btnPauseIcon = document.querySelector('.header__btn--pause i');
const screen = document.querySelector('.screen');
const screenTextBtn = document.querySelector('.screen__text-btn');
const screenMain = document.querySelector('.screen__main-img');
const screenSub = document.querySelector('.screen__sub-img');

audioSetting();
startGame();
addEvent();

function startGame() {
  screenTextBtn.addEventListener('click', () => {
    startStage();
  });
}

function startStage() {
  time = stageSetting[stage].time;
  bugNum = stageSetting[stage].bugNum;

  updateStageText(stage);
  updateTimeText(time);
  timeId = reduceTime();

  showBugImgs(); showFileImgs();
  screenHide();
  audioBgm.play();
}

function updateStageText(stage) {
  stageDisplay.textContent = `Stage ${stage}`;
}

function showBugImgs() {
  bugImgs.forEach(bugImg => {
    bugImg.classList.remove('hidden');

    // 부모 영역(.bugs)을 기준으로 0 ~ 85% 위치에 표시
    const randomXPos = Math.floor(Math.random() * 86);
    const randomYPos = Math.floor(Math.random() * 86);
    bugImg.style.left = `${randomXPos}%`;
    bugImg.style.top = `${randomYPos}%`;
  });
}

function showFileImgs() {
  fileImgs.forEach(fileImg => {
    fileImg.classList.remove('hidden');

    // 부모 영역(.files)을 기준으로 0 ~ 85% 위치에 표시
    const randomXPos = Math.floor(Math.random() * 86);
    const randomYPos = Math.floor(Math.random() * 86);
    fileImg.style.left = `${randomXPos}%`;
    fileImg.style.top = `${randomYPos}%`;
  });
}

function gameOver() {
  screenShow();

  screenMain.setAttribute('src', './img/game-over_main.png')
  screenSub.setAttribute('src', './img/cry.png');
  screenTextBtn.textContent = 'Replay?';

  lifePoints.forEach(lifePoint => {
    lifePoint.classList.remove('hidden');
  });

  stage = 1;
  time = stageSetting[stage].time;
  bugNum = stageSetting[stage].bugNum;
  lifeNum = 3;
  clearInterval(timeId);
}

function win() {
  screenMain.setAttribute('src', './img/game-clear_main.png');
};

function screenShow() {
  screen.classList.add('show');
  header.classList.remove('show');
  content.classList.remove('show');
}

function screenHide() {
  screen.classList.remove('show'); 
  header.classList.add('show');
  content.classList.add('show');
}

function reduceTime() {
  return setInterval(() => {
    time--;
    updateTimeText(time);
    if (time <= 0) {
      gameOver();
      return;
    }
  }, 1000);
}

function updateTimeText(time) {
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

function addEvent() {
  btnPauseAddEvent();
}

content.addEventListener('click', e => {
  const target = e.target;
  if (target.className.includes('bug__img')) {
    startBugImgEvent(target);
  } else if (target.className.includes('file__img')) {
    startFileImgEvent(target);
  }
});

function startBugImgEvent(bugImg) {
  audioBugPlay();
  bugImg.classList.add('hidden');
  bugNum--;
  if (bugNum <= 0) {
    stage++;
    clearInterval(timeId); 
    screenShow();

    if (stage === 2) {
      screenSub.setAttribute('src', './img/bug2.png');
    } else if (stage === 3) {
      screenSub.setAttribute('src', './img/bug3.png');
    } else if (stage > 3) {
      win();
      return;
    }
    screenMain.setAttribute('src', './img/stage-clear_main.png')
    screenTextBtn.textContent = 'Next Stage';
  }
}

function startFileImgEvent(fileImg) {
  fileImg.classList.add('hidden');
  lifeNum--;
  lifePoints[lifeNum].classList.add('hidden');
  if (lifeNum <= 0) {
    gameOver();
  }
  audioFilePlay();
}

function btnPauseAddEvent() {
  btnPause.addEventListener('click', () => {
    if (btnPauseIcon.className === 'fas fa-pause') {
      // Time pause
      clearInterval(timeId);
      btnPauseIcon.classList.remove('fa-pause');
      btnPauseIcon.classList.add('fa-play');
    } else {
      // Time play (reduce)
      timeId = reduceTime();
      btnPauseIcon.classList.remove('fa-play');
      btnPauseIcon.classList.add('fa-pause');
    }
  });
}