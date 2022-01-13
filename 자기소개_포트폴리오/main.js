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
const MenuSkills = document.querySelector('.navbar__menu__items:nth-child(3)');
const skills = document.querySelector('#skills');
const skillsYPos = skills.getBoundingClientRect().top;

MenuSkills.addEventListener('click', () => {
  scrollTo({top: skillsYPos, behavior: 'smooth'});
})