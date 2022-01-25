// 스테이지 설정
const stageSetting = {
  1 : {
    bugNum: 4,
    time: 50
  },
  2 : {
    bugNum: 4,
    time: 45
  },
  3 : {
    bugNum: 4,
    time: 40
  }
}
let curStage = 1;

// 남은 시간
let time = 30;
const timeNode = document.querySelector('.header__time');

// 남은 시간이 1초마다 감소
let intervalID = setInterval(() => {
  timeNode.textContent = String(--time);
}, 1000);

// btnPause 이벤트 설정
const btnPause = document.querySelector('.header__btn--pause');
const btnPauseIcon = document.querySelector('.header__btn--pause i');
btnPause.addEventListener('click', () => {
  if (btnPauseIcon.className === 'fas fa-pause') {
    clearInterval(intervalID);
    btnPauseIcon.className = 'fas fa-play';
  } else {
    intervalID = setInterval(() => {
      timeNode.textContent = String(--time);
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

// overlayBtn 이벤트 설정
const overlay = document.querySelector('.overlay');
const overlayBtn = document.querySelector('.overlay__btn');
const header = document.querySelector('.header');
const content = document.querySelector('.content');
const bugs = document.querySelectorAll('.bug__img');
const files = document.querySelectorAll('.file__img');

overlayBtn.addEventListener('click', () => {
  header.classList.add('show');
  content.classList.add('show');
  overlay.classList.remove('show');

  createBugs();
  createFiles();
});

// bugs를 생성하고 랜덤으로 배치한다
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

// files를 생성하고 랜덤으로 배치한다
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

// bugs & files 이벤트 설정
const overlayMain = document.querySelector('.overlay__main-title');
const overlaySub = document.querySelector('.overlay__sub-title');

bugs.forEach(bug => {
  bug.addEventListener('click', () => {
    bug.classList.add('hidden');
    stageSetting[curStage].bugNum--;
    if (!stageSetting[curStage].bugNum) {
      header.classList.remove('show');
      content.classList.remove('show');
      overlay.classList.add('show');

      overlayMain.setAttribute('src', './img/title_clear.png')
      overlayBtn.textContent = 'Next Stage';
      if (curStage === 1) {
        overlaySub.setAttribute('src', './img/bug2.png');
      } else if (curStage === 2) {
        overlaySub.setAttribute('src', './img/bug3.png');
      }
      curStage++;
    }
  });
});
files.forEach(file => {
  file.addEventListener('click', () => {
    file.classList.add('hidden');
  });
});