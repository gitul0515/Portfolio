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

if (scrollY > navBarHeight) {
  navBar.classList.add('bg-green');
} else {
  navBar.classList.remove('bg-green');
}

document.addEventListener('scroll', () => {
  if (scrollY > navBarHeight) {
    navBar.classList.add('bg-green');
  } else {
    navBar.classList.remove('bg-green');
  }
})

// navbar__menu를 클릭하면 해당 위치로 스크롤 이동
let curMenu = navbarMenu.firstElementChild;
navbarMenu.addEventListener('click', event => {
  const target = event.target;
  const link = target.dataset.link;
  if (!link) return;
  
  scrollToElem(link);

  curMenu.classList.remove('active');
  curMenu = target;
  curMenu.classList.add('active');
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

// 스크롤이 내려가면 home 섹션이 투명해짐
const homeHeight = document.querySelector('#home').getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  const homeOpacity = document.querySelector('.home__container');
  homeOpacity.style.opacity = `${1 - scrollY / homeHeight}`;
})

// 버튼을 클릭하면 스크롤이 맨 위로 올라감
const backToTop = document.querySelector('#back-to-top');

document.addEventListener('scroll', () => {
  if (scrollY > homeHeight / 2) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
})

backToTop.addEventListener('click', () => {
  scrollTo({top: 0, behavior: 'smooth'});
})

// 카테고리로 분류하여 프로젝트를 보여주기
const projectBtns = document.querySelector('.projects__categories');
const projectContainer = document.querySelector('.projects__work');
const projects = [...document.querySelectorAll('.project')];

// let current = categories.firstElementChild;

projectBtns.addEventListener('click', e => {
  const target = e.target;
  const filter = target.dataset.filter;
  if (!filter) return;
  
  projectContainer.classList.add('fade-out');
  setTimeout(() => {
    projects.forEach(project => {
      if(filter === '*' || filter === project.dataset.filter) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    })
    projectContainer.classList.remove('fade-out');
  }, 300);
})

