// 오디오
const audioBgm = new Audio('./sound/bgm.mp3');
const audioBug = new Audio('./sound/bug2.mp3');
const audioFile = new Audio('./sound/file.mp3');
audioSetting();

// 스테이지
let stage = 1;
const stageSetting = {
  1 : {
    bugNum: 4,
    time: 5
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

// 남은 시간
let time;
let timeID;
const timeBox = document.querySelector('.header__time');

// overlayBtn 이벤트 설정
const overlay = document.querySelector('.overlay');
const overlayBtn = document.querySelector('.overlay__btn');
const header = document.querySelector('.header');
const stageBox = document.querySelector('.header__stage');
const content = document.querySelector('.content');
const bugs = document.querySelectorAll('.bug__img');
const files = document.querySelectorAll('.file__img');

overlayBtn.addEventListener('click', () => {
  stageBox.textContent = `Stage ${stage}`;
  time = stageSetting[stage].time;
  timeBox.textContent = `${time}`;
  
  // 남은 시간을 1초마다 감소
  timeID = setInterval(() => {
    timeBox.textContent = `${--time}`;
  if (!time) {
    gameOver();
    return;
  }
}, 1000);
  createBugs(); createFiles();
  overlayHide();
  audioBgm.play();
});

// bugs를 생성하고 랜덤하게 배치
function createBugs() {
  bugs.forEach(bug => {
    bug.classList.remove('hidden');

    // 0 ~ 85의 난수 생성
    const bugRndX = Math.floor(Math.random() * 86);
    const bugRndY = Math.floor(Math.random() * 86);
    bug.style.left = `${bugRndX}%`;
    bug.style.top = `${bugRndY}%`;
  });
}

// files를 생성하고 랜덤하게 배치
function createFiles() {
  files.forEach(file => {
    file.classList.remove('hidden');

    // 0 ~ 85의 난수 생성
    const fileRndX = Math.floor(Math.random() * 86);
    const fileRndY = Math.floor(Math.random() * 86);
    file.style.left = `${fileRndX}%`;
    file.style.top = `${fileRndY}%`;
  });
}

// bugs 이벤트 설정
const overlayMain = document.querySelector('.overlay__main-title');
const overlaySub = document.querySelector('.overlay__sub-title');

bugs.forEach(bug => {
  bug.addEventListener('click', () => {
    audioBug.pause();
    audioBug.currentTime = 0;
    audioBug.play();
    bug.classList.add('hidden');
    stageSetting[stage].bugNum--;
    if (!stageSetting[stage].bugNum) {
      clearInterval(timeID);

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

// files 이벤트 설정
const hearts = [...document.querySelectorAll('.header__heart')];
let heart = 3;
files.forEach(file => {
  file.addEventListener('click', () => {
    audioFile.pause();
    audioFile.currentTime = 0;
    audioFile.play();
    file.classList.add('hidden');
    heart--;
    hearts[heart].classList.add('hidden');
    if (!heart) {
      gameOver();
    }
  });
});

// btnPause 이벤트 설정
const btnPause = document.querySelector('.header__btn--pause');
const btnPauseIcon = document.querySelector('.header__btn--pause i');
btnPause.addEventListener('click', () => {
  if (btnPauseIcon.className === 'fas fa-pause') {
    clearInterval(timeID);
    btnPauseIcon.classList.remove('fa-pause');
    btnPauseIcon.classList.add('fa-play');
  } else {
    timeID = setInterval(() => {
      timeBox.textContent = `${--time}`;
      if (!time) {
        gameOver();
      }
    }, 1000);
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

function gameOver() {
  overlayShow();

  overlayMain.setAttribute('src', './img/title_end.png')
  overlaySub.setAttribute('src', './img/cry.png');
  overlayBtn.textContent = 'Replay?';

  hearts.forEach(heart => {
    heart.classList.remove('hidden');
  });

  clearInterval(timeID);
  stage = 1;
  heart = 3;
}

function win() {
  overlayMain.setAttribute('src', './img/title_win.png');
};

function audioSetting() {
  audioBgm.loop = true;
  audioBgm.volume = 0.5;
  audioBug.volume = 0.7;
  audioFile.volume = 0.7;
}

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