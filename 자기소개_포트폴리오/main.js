// navBar의 toggle-btn을 클릭하면 navbar__menu가 보여짐
const navbarBtn = document.querySelector('.navbar__toggle-btn');
const navbarMenu = document.querySelector('.navbar__menu');

navbarBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('show');
  navBar.classList.add('opaque');
})

// 스크롤이 내려가면 navBar의 배경색을 green로 변경
const navBar = document.querySelector('#navbar');
const navBarHeight = navBar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  if (scrollY > navBarHeight) {
    navBar.classList.add('bg-green');
  } else {
    navBar.classList.remove('bg-green');
  }
})

// navbar__menu를 클릭하면 해당 위치로 스크롤 이동
navbarMenu.addEventListener('click', event => {
  const target = event.target;
  const link = target.dataset.link;
  if (!link) return;
  
  scrollToElem(link);
})

// home__contact을 클릭하면 contact 섹션으로 스크롤 이동
const homeContact = document.querySelector('.home__contact');
homeContact.addEventListener('click', () => {
  scrollToElem('#contact');
})

function scrollToElem(selector) {
  const element = document.querySelector(selector);
  element.scrollIntoView({behavior: 'smooth'});
}