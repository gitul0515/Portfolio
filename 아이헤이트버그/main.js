const timeNode = document.querySelector('.header__time');
let time = 0;
const btnPause = document.querySelector('.header__btn--pause');
const btnPauseIcon = document.querySelector('.header__btn--pause i');

let intervalID = setInterval(() => {
  timeNode.textContent = `0:${String(30 - (++time))}`;
}, 1000);

btnPause.addEventListener('click', () => {
  if (btnPauseIcon.className === 'fas fa-pause') {
    clearInterval(intervalID);
    btnPauseIcon.className = 'fas fa-play';
  } else {
    intervalID = setInterval(() => {
      timeNode.textContent = `0:${String(30 - (++time))}`;
    }, 1000);
    btnPauseIcon.className = 'fas fa-pause';
  }
});