// 제한시간 설정
let time = 0;
const timeNode = document.querySelector('.header__time');

// 1초마다 시간을 감소시킨다
let intervalID = setInterval(() => {
  timeNode.textContent = String(30 - (++time));
}, 1000);

// btnPause 이벤트
const btnPause = document.querySelector('.header__btn--pause');
const btnPauseIcon = document.querySelector('.header__btn--pause i');
btnPause.addEventListener('click', () => {
  if (btnPauseIcon.className === 'fas fa-pause') {
    clearInterval(intervalID);
    btnPauseIcon.className = 'fas fa-play';
  } else {
    intervalID = setInterval(() => {
      timeNode.textContent = String(30 - (++time));
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


const header = document.querySelector('.header');
const content = document.querySelector('.content');
const status = document.querySelector('.status');
const bugs = document.querySelectorAll('.bug__img');
const files = document.querySelectorAll('.file__img');

const statusBtn = document.querySelector('.status__btn');
statusBtn.addEventListener('click', () => {
  header.classList.add('show');
  content.classList.add('show');
  status.classList.remove('show');

  bugs.forEach(bug => {
    // 10 ~ 80의 난수 생성
    const bugRndX = Math.floor(Math.random() * 71) + 10;
    const bugRndY = Math.floor(Math.random() * 71) + 10;
    bug.style.left = `${bugRndX}%`;
    bug.style.top = `${bugRndY}%`;
  });

  files.forEach(file => {
    // 10 ~ 80의 난수 생성
    const fileRndX = Math.floor(Math.random() * 71) + 10;
    const fileRndY = Math.floor(Math.random() * 71) + 10;
    file.style.left = `${fileRndX}%`;
    file.style.top = `${fileRndY}%`;
  });
});

bugs.forEach(bug => {
  bug.addEventListener('click', () => {
    bug.classList.add('hidden');
  });
});

files.forEach(file => {
  file.addEventListener('click', () => {
    file.classList.add('hidden');
  });
});